import { sanityClient } from 'sanity:client';
import type { CategorySummary, ContentPage, ContentPost, FaqItem, PageSummary, PortableContent, PostSummary, SeoData, SiteSettings } from '../domain/models';
import { ContentValidationError, SanityConnectivityError } from '../domain/errors';
import { executeContentSourcePolicy, isSanityConfigured, resolveContentSourceMode } from '../domain/sourcePolicy';
import {
  fallbackCategories,
  fallbackPageSummaries,
  fallbackPages,
  fallbackPostSummaries,
  fallbackPosts,
  fallbackSiteSettings,
} from '../data/fallback';
import {
  allCategoriesQuery,
  allPagesQuery,
  allPostsQuery,
  categoryQuery,
  pageQuery,
  postQuery,
  postsByCategoryQuery,
  siteSettingsQuery,
} from './queries';
import type {
  AllCategoriesQueryResult,
  AllPagesQueryResult,
  AllPostsQueryResult,
  CategoryQueryResult,
  PageQueryResult,
  PostQueryResult,
  PostsByCategoryQueryResult,
  SiteSettingsQueryResult,
} from '../../sanity.types';

const mode = () => resolveContentSourceMode(import.meta.env.CONTENT_SOURCE, import.meta.env.DEV);
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' ? value as Record<string, unknown> : {};
const required = (value: unknown, field: string, id?: string) => {
  if (typeof value !== 'string' || !value.trim()) throw new ContentValidationError(`Missing required field "${field}"${id ? ` in ${id}` : ''}.`, id);
  return value.trim();
};
const optional = (value: unknown) => typeof value === 'string' && value.trim() ? value.trim() : undefined;
const technicalId = (value: unknown, field: string, id?: string) => {
  const result = required(value, field, id);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)) throw new ContentValidationError(`Invalid technical identifier "${field}" in ${id || 'document'}.`, id);
  return result;
};
const seo = (value: unknown): SeoData | undefined => {
  const source = record(value);
  const mapped = { metaTitle: optional(source.metaTitle), metaDescription: optional(source.metaDescription), noIndex: source.noIndex === true };
  return mapped.metaTitle || mapped.metaDescription || mapped.noIndex ? mapped : undefined;
};

const mapFaq = (value: unknown): FaqItem[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => {
      const rec = record(item);
      const q = optional(rec.question);
      const a = optional(rec.answer);
      if (q && a) return { question: q, answer: a };
      return null;
    })
    .filter((item): item is FaqItem => item !== null);
  return items.length > 0 ? items : undefined;
};

const mapTakeaways = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => typeof item === 'string' && item.trim() ? item.trim() : null)
    .filter((item): item is string => item !== null);
  return items.length > 0 ? items : undefined;
};

async function fetchCms<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!isSanityConfigured(import.meta.env.PUBLIC_SANITY_PROJECT_ID)) {
    throw new SanityConnectivityError('Sanity is not configured (missing or placeholder PUBLIC_SANITY_PROJECT_ID).');
  }
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    if (error instanceof ContentValidationError) throw error;
    throw new SanityConnectivityError(error instanceof Error ? error.message : 'Sanity request failed.', { cause: error });
  }
}

function mapSiteSettings(value: unknown): SiteSettings {
  const item = record(value);
  return { title: required(item.title, 'title', 'siteSettings'), description: required(item.description, 'description', 'siteSettings'), seo: seo(item.seo) };
}

function mapPageSummary(value: unknown): PageSummary {
  const item = record(value);
  return { title: required(item.title, 'title'), slug: technicalId(item.slug, 'slug'), updatedAt: optional(item._updatedAt) };
}

function mapCategory(value: unknown): CategorySummary {
  const item = record(value);
  return {
    title: required(item.title, 'title', 'category'),
    slug: technicalId(item.slug, 'slug', 'category'),
    description: optional(item.description),
  };
}

function normalizeMarkDefs(blocks: Array<Record<string, unknown>>): void {
  for (const block of blocks) {
    if (Array.isArray(block.markDefs)) {
      for (const mark of block.markDefs) {
        const m = record(mark);
        if (typeof m.href === 'string') {
          if (!/^(?:https?:|mailto:|tel:|#|\/)/.test(m.href)) {
            m.href = `/${m.href.replace(/^\/+|\/+$/g, '')}/`;
          } else if (m.href.startsWith('/') && !m.href.endsWith('/') && !m.href.includes('#') && !m.href.includes('.')) {
            m.href = `${m.href}/`;
          }
        }
      }
    }
  }
}

function sectionsToBlocks(sections: unknown): PortableContent {
  if (!Array.isArray(sections)) return [];
  const blocks: Array<Record<string, unknown>> = [];
  for (const section of sections) {
    const s = record(section);
    const key = optional(s._key) || Math.random().toString(36).substring(2, 9);
    if (s._type === 'textSection' || s._type === 'textWithImageSection') {
      const heading = optional(s.heading);
      if (heading) {
        blocks.push({
          _key: `${key}-h2`,
          _type: 'block',
          style: 'h2',
          children: [{ _key: `${key}-span`, _type: 'span', marks: [], text: heading }],
          markDefs: [],
        });
      }
      if (Array.isArray(s.text)) {
        blocks.push(...s.text.filter((b): b is Record<string, unknown> => typeof b === 'object' && b !== null));
      }
    } else if (s._type === 'infoBoxSection') {
      const title = optional(s.title);
      if (title) {
        blocks.push({
          _key: `${key}-h3`,
          _type: 'block',
          style: 'h3',
          children: [{ _key: `${key}-span`, _type: 'span', marks: [], text: `💡 ${title}` }],
          markDefs: [],
        });
      }
      if (Array.isArray(s.content)) {
        blocks.push(...s.content.filter((b): b is Record<string, unknown> => typeof b === 'object' && b !== null));
      }
    } else if (s._type === 'featuresSection') {
      const title = optional(s.title);
      if (title) {
        blocks.push({
          _key: `${key}-h3`,
          _type: 'block',
          style: 'h3',
          children: [{ _key: `${key}-span`, _type: 'span', marks: [], text: title }],
          markDefs: [],
        });
      }
      if (Array.isArray(s.items)) {
        for (const item of s.items) {
          const it = record(item);
          const t = optional(it.title);
          const d = optional(it.description);
          if (t || d) {
            blocks.push({
              _key: `${key}-${Math.random().toString(36).substring(2, 7)}`,
              _type: 'block',
              style: 'normal',
              listItem: 'bullet',
              children: [
                ...(t ? [{ _key: 't', _type: 'span', marks: ['strong'], text: `${t}: ` }] : []),
                ...(d ? [{ _key: 'd', _type: 'span', marks: [], text: d }] : []),
              ],
              markDefs: [],
            });
          }
        }
      }
    }
  }
  normalizeMarkDefs(blocks);
  return blocks as PortableContent;
}

function mapPage(value: unknown): ContentPage | null {
  if (value === null) return null;
  const item = record(value);
  const id = required(item._id, '_id');
  let contentBlocks: PortableContent = [];
  if (Array.isArray(item.content) && item.content.length > 0) {
    contentBlocks = item.content as PortableContent;
  } else if (Array.isArray(item.sections) && item.sections.length > 0) {
    contentBlocks = sectionsToBlocks(item.sections);
  }
  return {
    id,
    title: required(item.title, 'title', id),
    slug: technicalId(item.slug, 'slug', id),
    content: contentBlocks,
    faq: mapFaq(item.faq),
    seo: seo(item.seo),
  };
}

function mapPost(value: unknown, detail = false): ContentPost {
  const item = record(value);
  const id = required(item._id, '_id');
  const authorSource = record(item.author);
  const categories = Array.isArray(item.categories) ? item.categories.map((category) => {
    const source = record(category);
    return { title: required(source.title, 'category.title', id), slug: technicalId(source.slug, 'category.slug', id) };
  }) : [];
  
  let bodyBlocks: PortableContent = [];
  if (detail) {
    if (Array.isArray(item.body) && item.body.length > 0) {
      bodyBlocks = item.body as PortableContent;
    } else if (Array.isArray(item.sections) && item.sections.length > 0) {
      bodyBlocks = sectionsToBlocks(item.sections);
    }
  }

  return {
    id,
    title: required(item.title, 'title', id),
    slug: technicalId(item.slug, 'slug', id),
    publishedAt: required(item.publishedAt, 'publishedAt', id),
    excerpt: typeof item.excerpt === 'string' ? item.excerpt.trim() : '',
    mainImage: item.mainImage || undefined,
    author: authorSource.name ? { name: required(authorSource.name, 'author.name', id), image: authorSource.image || undefined, bio: (authorSource.bio as PortableContent) || undefined } : undefined,
    categories,
    body: bodyBlocks,
    faq: detail ? mapFaq(item.faq) : undefined,
    takeaways: detail ? mapTakeaways(item.takeaways) : undefined,
    seo: detail ? seo(item.seo) : undefined,
  };
}

export const getSiteSettings = () => executeContentSourcePolicy({ mode: mode(), getSanityData: async () => mapSiteSettings(await fetchCms<SiteSettingsQueryResult>(siteSettingsQuery)), getFallbackData: () => mapSiteSettings(fallbackSiteSettings) });

export const getAllPages = () => executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
  const data = await fetchCms<AllPagesQueryResult>(allPagesQuery);
  if (!Array.isArray(data)) throw new ContentValidationError('Page query must return an array.');
  const sanityPages = data.map(mapPageSummary);
  const sanitySlugs = new Set(sanityPages.map((p) => p.slug));
  const supplementary = fallbackPageSummaries.filter((p) => !sanitySlugs.has(p.slug));
  return [...sanityPages, ...supplementary];
}, getFallbackData: () => fallbackPageSummaries.map(mapPageSummary) });

function getPortableTextLength(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0;
  let len = 0;
  for (const b of blocks) {
    if (b && Array.isArray(b.children)) {
      for (const c of b.children) {
        if (c && typeof c.text === 'string') len += c.text.length;
      }
    }
  }
  return len;
}

export async function getPage(slug: string): Promise<ContentPage | null> {
  const fallback = () => fallbackPages.find((page) => page.slug === slug) ?? null;
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
    const data = await fetchCms<PageQueryResult>(pageQuery, { slug });
    const mapped = data === null ? null : mapPage(data);
    const fb = fallback();
    if (mapped && fb && getPortableTextLength(mapped.content) < 500 && getPortableTextLength(fb.content) >= 500) {
      mapped.content = fb.content;
      if (fb.faq && fb.faq.length > 0 && (!mapped.faq || mapped.faq.length === 0)) {
        mapped.faq = fb.faq;
      }
      if (fb.title && (!mapped.title || mapped.title.length < 15)) {
        mapped.title = fb.title;
      }
    }
    return mapped || fb;
  }, getFallbackData: fallback });
}

export const getAllPosts = () => executeContentSourcePolicy<PostSummary[]>({ mode: mode(), getSanityData: async () => {
  const data = await fetchCms<AllPostsQueryResult>(allPostsQuery);
  if (!Array.isArray(data)) throw new ContentValidationError('Post query must return an array.');
  const sanityPosts = data.map((item) => mapPost(item));
  const sanitySlugs = new Set(sanityPosts.map((p) => p.slug));
  const supplementary = fallbackPostSummaries
    .filter((p) => !sanitySlugs.has(p.slug))
    .map((post) => mapPost({ ...post, _id: post.id }));
  return [...sanityPosts, ...supplementary];
}, getFallbackData: () => fallbackPostSummaries.map((post) => mapPost({ ...post, _id: post.id })) });

export async function getPost(slug: string): Promise<ContentPost | null> {
  const fallback = () => fallbackPosts.find((post) => post.slug === slug) ?? null;
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
    const data = await fetchCms<PostQueryResult>(postQuery, { slug });
    const mapped = data === null ? null : mapPost(data, true);
    const fb = fallback();
    if (mapped && fb && getPortableTextLength(mapped.body) < 500 && getPortableTextLength(fb.body) >= 500) {
      mapped.body = fb.body;
      if (fb.takeaways && (!mapped.takeaways || mapped.takeaways.length === 0)) {
        mapped.takeaways = fb.takeaways;
      }
      if (fb.faq && (!mapped.faq || mapped.faq.length === 0)) {
        mapped.faq = fb.faq;
      }
    }
    return mapped || fb;
  }, getFallbackData: fallback });
}

export const getAllCategories = () => executeContentSourcePolicy<CategorySummary[]>({ mode: mode(), getSanityData: async () => {
  const data = await fetchCms<AllCategoriesQueryResult>(allCategoriesQuery);
  const sanityCategories = Array.isArray(data) ? data.map(mapCategory) : [];
  const sanitySlugs = new Set(sanityCategories.map((c) => c.slug));
  const supplementary = fallbackCategories.filter((c) => !sanitySlugs.has(c.slug));
  return [...sanityCategories, ...supplementary];
}, getFallbackData: () => fallbackCategories.map(mapCategory) });

export async function getCategory(slug: string): Promise<CategorySummary | null> {
  const fallback = () => fallbackCategories.find((cat) => cat.slug === slug) ?? null;
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
    const data = await fetchCms<CategoryQueryResult>(categoryQuery, { slug });
    const mapped = data === null ? null : mapCategory(data);
    return mapped || fallback();
  }, getFallbackData: fallback });
}

export async function getPostsByCategory(categorySlug: string): Promise<PostSummary[]> {
  const fallback = () => fallbackPostSummaries
    .filter((post) => post.categories.some((c) => c.slug === categorySlug))
    .map((post) => mapPost({ ...post, _id: post.id }));
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
    const data = await fetchCms<PostsByCategoryQueryResult>(postsByCategoryQuery, { categorySlug });
    const sanityPosts = Array.isArray(data) ? data.map((item) => mapPost(item)) : [];
    const sanitySlugs = new Set(sanityPosts.map((p) => p.slug));
    const supplementary = fallback().filter((p) => !sanitySlugs.has(p.slug));
    return [...sanityPosts, ...supplementary];
  }, getFallbackData: fallback });
}
