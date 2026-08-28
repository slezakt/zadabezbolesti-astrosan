import type { CategorySummary, ContentPage, ContentPost, PageSummary, PostSummary, SiteSettings } from '../domain/models';

export const fallbackSiteSettings: SiteSettings = {
  title: 'ZádaBezBolesti.cz – Zdravotní magazín a ergonomický nástroj',
  description: 'Praktický průvodce ergonomií, zdravým spánkem a bezpečnou úlevou od bolesti zad.',
  seo: {
    metaTitle: 'ZádaBezBolesti.cz – Zdravotní magazín a ergonomický nástroj',
    metaDescription: 'Bezpečný první krok při bolesti zad. Praktické návody, ergonomická kalkulačka a ověřené cviky pro lidi se sedavým zaměstnáním.',
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
export const fallbackPosts: ContentPost[] = fallbackPostsData as ContentPost[];

export const fallbackPageSummaries: PageSummary[] = fallbackPages.map(({ title, slug, updatedAt }) => ({ title, slug, updatedAt }));
export const fallbackPostSummaries: PostSummary[] = fallbackPosts.map(({ body: _body, faq: _faq, takeaways: _takeaways, seo: _seo, ...post }) => post);
