import type { APIRoute } from 'astro';
import { getAllPages, getAllPosts, getSiteSettings } from '../utils/content';

export const GET: APIRoute = async ({ site }) => {
  const envSite = import.meta.env.PUBLIC_SITE_URL?.trim();
  const siteUrl = site ? site.href.replace(/\/$/, '') : (envSite ? envSite.replace(/\/$/, '') : '');

  if (!siteUrl && import.meta.env.PROD) {
    throw new Error('Astro.site or PUBLIC_SITE_URL is required in production for llms.txt generator');
  }

  const effectiveSiteUrl = siteUrl || 'https://www.zadabezbolesti.cz';
  const [siteSettings, pages, posts] = await Promise.all([getSiteSettings(), getAllPages(), getAllPosts()]);

  const title = siteSettings?.title || 'ZádaBezBolesti.cz';
  const description = siteSettings?.description || 'Praktický průvodce ergonomií, pohybem a úlevou od bolesti zad';

  const markdown = `
# ${title}

> ${description}

## O tomto webu
Tento dokument v navrhovaném formátu llms.txt (proposal) slouží jako strukturovaný výtah obsahu pro AI vyhledávače a LLM agenty (ChatGPT, Perplexity, Claude).

## Hlavní sekce a služby
- [Úvodní stránka](${effectiveSiteUrl}/)
- [Magazín a přehled článků](${effectiveSiteUrl}/blog/)

${pages && pages.length > 0 ? `## Stránky\n${pages.map((p) => `- [${p.title}](${effectiveSiteUrl}/${p.slug}/)`).join('\n')}` : ''}

${posts && posts.length > 0 ? `## Nejnovější Články\n${posts.map((p) => `- [${p.title}](${effectiveSiteUrl}/blog/${p.slug}/)`).join('\n')}` : ''}

## Kontaktní informace
- Web: ${effectiveSiteUrl}/
`.trim();

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
