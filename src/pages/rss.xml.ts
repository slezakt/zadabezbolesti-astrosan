import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getAllPosts, getSiteSettings } from '../utils/content';

export const GET: APIRoute = async ({ site }) => {
  const envSite = import.meta.env.PUBLIC_SITE_URL?.trim();
  const siteUrl = site ? site.href : (envSite ? (envSite.endsWith('/') ? envSite : `${envSite}/`) : 'https://www.zadabezbolesti.cz/');

  const [siteSettings, posts] = await Promise.all([getSiteSettings(), getAllPosts()]);

  return rss({
    title: siteSettings?.title || 'ZádaBezBolesti.cz Magazín',
    description: siteSettings?.description || 'Praktický průvodce ergonomií, pohybem a úlevou od bolesti zad',
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      description: post.excerpt || '',
      link: `/blog/${post.slug}/`,
    })),
  });
};
