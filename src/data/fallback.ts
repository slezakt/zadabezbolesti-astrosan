import type { CategorySummary, ContentPage, ContentPost, PageSummary, PostSummary, SiteSettings } from '../domain/models';

export const fallbackSiteSettings: SiteSettings = {
  title: 'ZádaBezBolesti.cz – Praktický magazín o ergonomii a pohybu',
  description: 'Praktické informace o ergonomii, pohybu, spánku a bezpečné orientaci při bolesti zad.',
  seo: {
    metaTitle: 'ZádaBezBolesti.cz – Ergonomie, pohyb a zdravější návyky',
    metaDescription: 'Praktické návody k ergonomii, pohybu a spánku pro lidi se sedavým zaměstnáním. Informace nenahrazují vyšetření.',
  },
};

export const fallbackCategories: CategorySummary[] = [
  {
    title: 'Ergonomie',
    slug: 'ergonomie',
    description: 'Nastavení židle, stolu a monitoru pro zdravé sezení a práci bez bolesti.',
  },
  {
    title: 'Cviky a úleva',
    slug: 'cviky-a-uleva',
    description: 'Bezpečné protahovací a posilovací sestavy k židli i na doma.',
  },
  {
    title: 'Životní styl a regenerace',
    slug: 'zivotni-styl',
    description: 'Spánek, matrace, polštáře a návyky pro zdravou páteř.',
  },
  {
    title: 'Bolesti zad',
    slug: 'bolesti-zad',
    description: 'Příčiny, diagnostika a první kroky při bolesti beder, šíje a lopatek.',
  },
];

import fallbackPagesData from './fallbackPages.json';
import fallbackPostsData from './fallbackPosts.json';

export const fallbackPages: ContentPage[] = fallbackPagesData as ContentPage[];
const rawPosts: ContentPost[] = fallbackPostsData as ContentPost[];
const now = Date.now();

export const fallbackPosts: ContentPost[] = rawPosts.filter((post) => {
  if (!post || !post.slug || post.slug === 'test' || post.slug.startsWith('test-')) return false;
  if (post.publishedAt && new Date(post.publishedAt).getTime() > now) return false;
  return true;
});

export const fallbackPageSummaries: PageSummary[] = fallbackPages.map(({ title, slug, updatedAt }) => ({ title, slug, updatedAt }));
export const fallbackPostSummaries: PostSummary[] = fallbackPosts.map(({ body: _body, faq: _faq, takeaways: _takeaways, seo: _seo, ...post }) => post);
