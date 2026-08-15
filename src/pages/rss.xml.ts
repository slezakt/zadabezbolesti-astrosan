import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { fetchSanity } from '../utils/sanity';
import { allPostsQuery, siteSettingsQuery } from '../utils/queries';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  let posts: any[] = [];
  let siteSettings = null;

  try {
    siteSettings = await fetchSanity(siteSettingsQuery);
    posts = await fetchSanity(allPostsQuery);
  } catch (e) {
    posts = [];
  }

  return rss({
    title: siteSettings?.title || 'Astro & Sanity Blog',
    description: siteSettings?.description || 'Nejnovější příspěvky z našeho webu',
    site: site ? site.href : 'https://example.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      description: post.excerpt || '',
      link: `/clanky/${post.slug}`,
    })),
  });
};
