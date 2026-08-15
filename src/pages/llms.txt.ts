import type { APIRoute } from 'astro';
import { fetchSanity } from '../utils/sanity';
import { siteSettingsQuery, allPagesQuery, allPostsQuery } from '../utils/queries';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://example.com';

  let siteSettings = null;
  let pages: any[] = [];
  let posts: any[] = [];

  try {
    siteSettings = await fetchSanity(siteSettingsQuery);
    pages = await fetchSanity(allPagesQuery);
    posts = await fetchSanity(allPostsQuery);
  } catch (e) {
    // fallback pro vývoj bez zapojeného CMS
  }

  const title = siteSettings?.title || 'Astro & Sanity CMS Webová Prezentace';
  const description = siteSettings?.description || 'Univerzální produkční šablona v češtině';

  const markdown = `
# ${title}

> ${description}

## O tomto webu
Tento dokument v novém standardu llms.txt slouží jako strukturovaný výtah obsahu pro AI vyhledávače a LLM agenty (ChatGPT, Perplexity, Claude).

## Hlavní sekce a služby
- [Úvodní stránka](${siteUrl}/)
- [Přehled článků](${siteUrl}/clanky)

${pages && pages.length > 0 ? `## Stránky\n${pages.map((p) => `- [${p.title}](${siteUrl}/${p.slug})`).join('\n')}` : ''}

${posts && posts.length > 0 ? `## Nejnovější Články\n${posts.map((p) => `- [${p.title}](${siteUrl}/clanky/${p.slug})`).join('\n')}` : ''}

## Kontaktní informace
- Web: ${siteUrl}
- Administrace CMS: ${siteUrl}/admin
`.trim();

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
