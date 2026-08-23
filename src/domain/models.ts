export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
}

export interface SiteSettings {
  title: string;
  description: string;
  seo?: SeoData;
}

export interface PageSummary { title: string; slug: string; updatedAt?: string }
export interface ContentPage extends PageSummary { id: string; content: PortableContent; seo?: SeoData }

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage?: unknown;
  author?: { name: string; image?: unknown };
  categories: Array<{ title: string; slug: string }>;
}

export interface ContentPost extends PostSummary { body: PortableContent; seo?: SeoData }
import type { PageQueryResult, PostQueryResult } from '../../sanity.types';

export type PortableContent =
  | NonNullable<NonNullable<PageQueryResult>['content']>
  | NonNullable<NonNullable<PostQueryResult>['body']>;
