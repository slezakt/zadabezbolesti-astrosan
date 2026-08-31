import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const slug = 'rizikove-faktory';
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

const fallbackPages = JSON.parse(
  await readFile(resolve(process.cwd(), 'src/data/fallbackPages.json'), 'utf8'),
);
const page = fallbackPages.find((item) => item.slug === slug);

if (!page) {
  throw new Error(`Ve fallback datech chybí stránka /${slug}.`);
}

const replacementFields = {
  title: page.title,
  content: page.content,
  faq: page.faq,
  sources: page.sources,
  seo: page.seo,
};

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-30',
  token,
  useCdn: false,
});

const remotePage = await client.fetch(
  '*[_type == "page" && slug.current == $slug][0]{_id, title, _updatedAt}',
  { slug },
);

if (!remotePage) {
  console.log(`${shouldApply ? 'Vytvářím' : 'Připraveno k vytvoření'}: /${slug} [page]`);
} else {
  console.log(`${shouldApply ? 'Přepisuji' : 'Připraveno k přepisu'}: /${slug} (${remotePage._id}, změněno ${remotePage._updatedAt})`);
}

if (!shouldApply) {
  console.log('Dry run dokončen. Pro zápis spusťte: npm run migrate:risk-factors-page -- --apply');
  process.exit(0);
}

if (remotePage) {
  await client.patch(remotePage._id).set(replacementFields).commit({ visibility: 'sync' });
} else {
  await client.create({
    _type: 'page',
    slug: { _type: 'slug', current: slug },
    ...replacementFields,
  });
}

console.log('Sanity stránka byla přepsána. Následně spusťte produkční build a predeploy kontrolu.');
