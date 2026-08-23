import { sanityClient } from 'sanity:client';
import type { ContentPage, ContentPost, PageSummary, PortableContent, PostSummary, SeoData, SiteSettings } from '../domain/models';
import { ContentValidationError, SanityConnectivityError } from '../domain/errors';
import { executeContentSourcePolicy, isSanityConfigured, resolveContentSourceMode } from '../domain/sourcePolicy';
import {
  fallbackPageSummaries,
  fallbackPages,
  fallbackPostSummaries,
  fallbackPosts,
  fallbackSiteSettings,
} from '../data/fallback';
import { allPagesQuery, allPostsQuery, pageQuery, postQuery, siteSettingsQuery } from './queries';
import type {
  AllPagesQueryResult,
  AllPostsQueryResult,
  PageQueryResult,
  PostQueryResult,
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

function mapPage(value: unknown): ContentPage | null {
  if (value === null) return null;
  const item = record(value);
  const id = required(item._id, '_id');
  return { id, title: required(item.title, 'title', id), slug: technicalId(item.slug, 'slug', id), content: (Array.isArray(item.content) ? item.content : []) as PortableContent, seo: seo(item.seo) };
}

function mapPost(value: unknown, detail = false): ContentPost {
  const item = record(value);
  const id = required(item._id, '_id');
  const authorSource = record(item.author);
  const categories = Array.isArray(item.categories) ? item.categories.map((category) => {
    const source = record(category);
    return { title: required(source.title, 'category.title', id), slug: technicalId(source.slug, 'category.slug', id) };
  }) : [];
  return {
    id,
    title: required(item.title, 'title', id),
    slug: technicalId(item.slug, 'slug', id),
    publishedAt: required(item.publishedAt, 'publishedAt', id),
    excerpt: required(item.excerpt, 'excerpt', id),
    mainImage: item.mainImage || undefined,
    author: authorSource.name ? { name: required(authorSource.name, 'author.name', id), image: authorSource.image || undefined } : undefined,
    categories,
    body: (detail && Array.isArray(item.body) ? item.body : []) as PortableContent,
    seo: detail ? seo(item.seo) : undefined,
  };
}

export const getSiteSettings = () => executeContentSourcePolicy({ mode: mode(), getSanityData: async () => mapSiteSettings(await fetchCms<SiteSettingsQueryResult>(siteSettingsQuery)), getFallbackData: () => mapSiteSettings(fallbackSiteSettings) });

export const getAllPages = () => executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
  const data = await fetchCms<AllPagesQueryResult>(allPagesQuery);
  if (!Array.isArray(data)) throw new ContentValidationError('Page query must return an array.');
  return data.map(mapPageSummary);
}, getFallbackData: () => fallbackPageSummaries.map(mapPageSummary) });

export async function getPage(slug: string): Promise<ContentPage | null> {
  const fallback = () => fallbackPages.find((page) => page.slug === slug) ?? null;
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => mapPage(await fetchCms<PageQueryResult>(pageQuery, { slug })), getFallbackData: fallback });
}

export const getAllPosts = () => executeContentSourcePolicy<PostSummary[]>({ mode: mode(), getSanityData: async () => {
  const data = await fetchCms<AllPostsQueryResult>(allPostsQuery);
  if (!Array.isArray(data)) throw new ContentValidationError('Post query must return an array.');
  return data.map((item) => mapPost(item));
}, getFallbackData: () => fallbackPostSummaries.map((post) => mapPost({ ...post, _id: post.id })) });

export async function getPost(slug: string): Promise<ContentPost | null> {
  const fallback = () => fallbackPosts.find((post) => post.slug === slug) ?? null;
  return executeContentSourcePolicy({ mode: mode(), getSanityData: async () => {
    const data = await fetchCms<PostQueryResult>(postQuery, { slug });
    return data === null ? null : mapPost(data, true);
  }, getFallbackData: fallback });
}
