import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getAllPosts, getSiteSettings } from '../utils/content';

export const GET: APIRoute = async ({ site }) => {
  const [siteSettings, posts] = await Promise.all([getSiteSettings(), getAllPosts()]);

  return rss({
    title: siteSettings?.title || 'Astro & Sanity Blog',
    description: siteSettings?.description || 'Nejnovější příspěvky z našeho webu',
    site: site ? site.href : 'https://example.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      description: post.excerpt || '',
      link: `/blog/${post.slug}/`,
    })),
  });
};
