import config from './smoke.config.js';
import { check } from './http-health.js';

let ok = await check('/', 'html', config.siteTitle);
ok = await check(config.criticalPath, 'html', config.criticalTitle) && ok;
ok = await check('/sitemap-index.xml', 'xml') && ok;
ok = await check('/rss.xml', 'xml') && ok;
const fingerprint = await fetch(`${config.baseUrl}/build-info.json?${Date.now()}`).then((response) => response.ok ? response.json() : null).catch(() => null);
if (!fingerprint?.commit || (process.env.GITHUB_SHA && fingerprint.commit !== process.env.GITHUB_SHA)) { console.error('[postdeploy] deployment fingerprint mismatch.'); ok = false; }
if (!ok) process.exit(1);
console.log('[postdeploy] PASS');
