import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://example.com';
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap-index.xml
LLMs-Txt: ${siteUrl}/llms.txt
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
