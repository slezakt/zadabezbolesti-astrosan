import config from './smoke.config.js';
import { check } from './http-health.js';

const results = await Promise.all([
  check('/', 'html', config.siteTitle),
  check(config.criticalPath, 'html', config.criticalTitle),
  check('/sitemap-index.xml', 'xml'),
]);
if (results.some((result) => !result)) process.exit(1);
console.log('[monitor] PASS');
