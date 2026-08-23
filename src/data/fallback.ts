import type { ContentPage, ContentPost, PageSummary, PostSummary, SiteSettings } from '../domain/models';

export const fallbackSiteSettings: SiteSettings = {
  title: 'Astro + Sanity Starter',
  description: 'Praktický statický starter pro malé a střední klientské weby.',
};

export const fallbackPages: ContentPage[] = [{
  id: 'fallback-page-about',
  title: 'O starteru',
  slug: 'o-starteru',
  content: [],
}];

export const fallbackPosts: ContentPost[] = [{
  id: 'fallback-post-first',
  title: 'První ukázkový článek',
  slug: 'prvni-clanek',
  publishedAt: '2026-01-01T10:00:00.000Z',
  excerpt: 'Ověřený fallback zajišťuje deterministický build bez připojení k CMS.',
  categories: [],
  body: [],
}];

export const fallbackPageSummaries: PageSummary[] = fallbackPages.map(({ title, slug, updatedAt }) => ({ title, slug, updatedAt }));
export const fallbackPostSummaries: PostSummary[] = fallbackPosts.map(({ body: _body, seo: _seo, ...post }) => post);
