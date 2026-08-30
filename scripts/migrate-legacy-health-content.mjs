import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const slugs = [
  'bolest-mezi-lopatkami',
  'cviky-na-uvolneni-bederni-patere',
  'cviky-na-bederni-pater-uvolneni-posileni',
];
const shouldApply = process.argv.includes('--apply');
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.PUBLIC_SANITY_DATASET?.trim();
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !dataset) {
  throw new Error('Chybí PUBLIC_SANITY_PROJECT_ID nebo PUBLIC_SANITY_DATASET.');
}

if (shouldApply && !token) {
  throw new Error('Pro zápis použijte SANITY_API_WRITE_TOKEN s oprávněním write. Bez --apply skript provede pouze dry run.');
}

const fallbackPosts = JSON.parse(
  await readFile(resolve(process.cwd(), 'src/data/fallbackPosts.json'), 'utf8'),
);

const replacementFields = (post) => ({
  title: post.title,
  excerpt: post.excerpt,
  body: post.body,
  ...(Array.isArray(post.faq) ? { faq: post.faq } : {}),
  ...(Array.isArray(post.takeaways) ? { takeaways: post.takeaways } : {}),
  ...(Array.isArray(post.sources) ? { sources: post.sources } : {}),
  ...(post.seo ? { seo: post.seo } : {}),
});

const replacements = new Map(
  fallbackPosts
    .filter((post) => slugs.includes(post.slug))
    .map((post) => [post.slug, replacementFields(post)]),
);
const sourcePosts = new Map(
  fallbackPosts
    .filter((post) => slugs.includes(post.slug))
    .map((post) => [post.slug, post]),
);

if (replacements.size !== slugs.length) {
  throw new Error('Ve fallback datech chybí jeden z připravených článků.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-30',
  token,
  useCdn: false,
});

const remotePosts = await client.fetch(
  '*[_type in ["post", "article"] && slug.current in $slugs]{_id, _type, "slug": slug.current, _updatedAt}',
  { slugs },
);

const foundSlugs = new Set(remotePosts.map((post) => post.slug));
const missing = slugs.filter((slug) => !foundSlugs.has(slug));

for (const post of remotePosts) {
  console.log(`${shouldApply ? 'Přepisuji' : 'Připraveno k přepisu'}: ${post.slug} [${post._type}] (${post._id}, změněno ${post._updatedAt})`);
}
for (const slug of missing) {
  console.log(`${shouldApply ? 'Vytvářím' : 'Připraveno k vytvoření'}: ${slug} [post]`);
}

if (!shouldApply) {
  console.log('Dry run dokončen. Pro zápis spusťte: npm run migrate:legacy-health-content -- --apply');
  process.exit(0);
}

const transaction = client.transaction();
for (const post of remotePosts) {
  transaction.patch(post._id, { set: replacements.get(post.slug) });
}
for (const slug of missing) {
  const source = sourcePosts.get(slug);
  transaction.create({
    _type: 'post',
    title: source.title,
    slug: { _type: 'slug', current: slug },
    publishedAt: source.publishedAt,
    ...replacements.get(slug),
  });
}

await transaction.commit({ visibility: 'sync' });
console.log('Sanity dokumenty byly přepsány. Následně spusťte produkční build a predeploy kontrolu.');
