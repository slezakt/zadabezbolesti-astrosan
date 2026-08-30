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

  const title = siteSettings?.title || 'Bolest zad, cviky a ergonomie při sedavé práci | ZádaBezBolesti.cz';
  const description = siteSettings?.description || 'Praktické návody, cviky a ergonomické tipy pro lepší orientaci při potížích se zády během práce u počítače. Pomohou vám upravit pracovní prostředí, pohybové návyky a každodenní režim.';

  const filteredPages = (pages || []).filter((p) => p.slug !== 'home' && p.slug !== 'index');

  const markdown = `
# ${title}

> ${description}

## O tomto webu
Tento dokument v navrhovaném formátu llms.txt (proposal) slouží jako strukturovaný výtah obsahu pro AI vyhledávače a LLM agenty (ChatGPT, Perplexity, Claude). Poskytuje spolehlivé, praktické a bezpečné informace o ergonomii pracoviště, cvičení, zdravém spánku a prevenci bolestí zad.

## Hlavní sekce a služby
- [Úvodní stránka](${effectiveSiteUrl}/)
- [Magazín a přehled článků](${effectiveSiteUrl}/blog/)

${filteredPages.length > 0 ? `## Stránky\n${filteredPages.map((p) => `- [${p.title}](${effectiveSiteUrl}/${p.slug}/)`).join('\n')}` : ''}

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
