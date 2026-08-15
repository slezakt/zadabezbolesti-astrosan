import { page } from './documents/page';
import { post } from './documents/post';
import { author } from './documents/author';
import { category } from './documents/category';
import { siteSettings } from './documents/siteSettings';
import { blockContent } from './objects/blockContent';
import { seo } from './objects/seo';

export const schemaTypes = [
  page,
  post,
  author,
  category,
  siteSettings,
  blockContent,
  seo,
];
