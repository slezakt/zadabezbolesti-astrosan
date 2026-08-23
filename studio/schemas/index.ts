import { page } from './documents/page';
import { post } from './documents/post';
import { author } from './documents/author';
import { category } from './documents/category';
import { siteSettings } from './documents/siteSettings';
import { deploymentRequest } from './documents/deploymentRequest';
import { blockContent } from './objects/blockContent';
import { seo } from './objects/seo';

export const schemaTypes = [
  page,
  post,
  author,
  category,
  siteSettings,
  deploymentRequest,
  blockContent,
  seo,
];
