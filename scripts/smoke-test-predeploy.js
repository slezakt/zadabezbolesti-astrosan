import fs from 'node:fs';
import path from 'node:path';
import config from './smoke.config.js';

const root = path.resolve('dist');
if (!fs.existsSync(root)) throw new Error('dist/ is missing. Run npm run build first.');
const files = [];
const walk = (directory) => fs.readdirSync(directory).forEach((name) => {
  const file = path.join(directory, name);
  fs.statSync(file).isDirectory() ? walk(file) : files.push(file);
});
walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const exists = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\//, '');
  return [path.join(root, clean), path.join(root, clean, 'index.html'), path.join(root, `${clean}.html`)].some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
};
const resolveHtml = (pathname) => {
  const clean = pathname.replace(/^\//, '');
  const candidates = [path.join(root, clean), path.join(root, clean, 'index.html'), path.join(root, `${clean}.html`)];
  return candidates.find((candidate) => fs.existsSync(candidate) && candidate.endsWith('.html'));
};
let errors = 0;
const fail = (message) => { console.error(`[predeploy] ${message}`); errors += 1; };

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const pathname = relative === 'index.html' ? '/' : `/${relative.replace(/\/?index\.html$/, '')}/`;
  const html = fs.readFileSync(file, 'utf8');
  const isStudio = pathname === '/admin/' || pathname.startsWith('/admin/');
  const isRedirect = /http-equiv=["']refresh["']/i.test(html) || /<meta[^>]+content=["'][^"']*url=/i.test(html);

  // Content smoke check: no rendered [object Object] in production HTML
  if (html.includes('[object Object]')) {
    fail(`${relative}: contains rendered '[object Object]' error.`);
  }

  // Guard against forbidden test page
  if (pathname === '/blog/test/' || pathname === '/blog/test') {
    fail(`${relative}: test article /blog/test/ must not be present in build.`);
  }

  // Guard against leaked localhost links in static HTML
  if (html.includes('http://localhost:4321') || html.includes('http://localhost:3000')) {
    fail(`${relative}: contains localhost URL.`);
  }

  if (!isStudio && !isRedirect && pathname !== '/404.html' && !/<link[^>]+rel=["']canonical["']/i.test(html)) fail(`${relative}: missing canonical.`);
  if (!isStudio && !isRedirect && !/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) fail(`${relative}: missing JSON-LD.`);
  for (const match of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|#)/.test(href)) continue;
    const url = new URL(href, config.baseUrl + pathname);
    if (!exists(url.pathname)) { fail(`${relative}: broken internal link ${href}.`); continue; }
    if (url.hash) {
      const target = resolveHtml(url.pathname);
      const targetHtml = target ? fs.readFileSync(target, 'utf8') : '';
      const id = url.hash.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`(?:id|name)=["']${id}["']`, 'i').test(targetHtml)) fail(`${relative}: broken anchor ${href}.`);
    }
  }
  const assets = [
    ...[...html.matchAll(/<(?:img|source|script)[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]),
    ...[...html.matchAll(/<(?:img|source)[^>]+srcset=["']([^"']+)["']/gi)].flatMap((match) => match[1].split(',').map((item) => item.trim().split(/\s+/)[0])),
    ...[...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map((match) => match[1]),
  ];
  for (const asset of assets) {
    if (!asset || /^(?:https?:|data:|blob:)/.test(asset)) continue;
    const url = new URL(asset, config.baseUrl + pathname);
    if (!exists(url.pathname)) fail(`${relative}: missing asset ${asset}.`);
  }
}

for (const xml of ['sitemap-index.xml', 'rss.xml']) {
  const file = path.join(root, xml);
  if (!fs.existsSync(file)) fail(`missing ${xml}.`);
  else if (!fs.readFileSync(file, 'utf8').trim().startsWith('<?xml')) fail(`${xml}: invalid XML header.`);
}

// llms.txt validation
const llmsFile = path.join(root, 'llms.txt');
if (fs.existsSync(llmsFile)) {
  const llmsContent = fs.readFileSync(llmsFile, 'utf8');
  if (llmsContent.includes('/admin')) fail('llms.txt must not contain /admin links.');
  if (llmsContent.includes('localhost:4321')) fail('llms.txt contains localhost URL.');
  if (llmsContent.includes('/blog/test')) fail('llms.txt contains test article link.');
}

const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const provider = process.env.PUBLIC_ANALYTICS_PROVIDER?.trim();
if (provider && !homepage.includes(`"activeProvider":"${provider}"`)) fail(`analytics provider mismatch; expected ${provider}.`);
if (provider === 'plausible' && !homepage.includes(process.env.PUBLIC_PLAUSIBLE_SCRIPT_URL || '__missing__')) fail('Plausible script URL mismatch.');
if (errors) process.exit(1);
console.log(`[predeploy] PASS: ${htmlFiles.length} HTML files, links, assets, anchors, canonical, JSON-LD, RSS, llms.txt and sitemap.`);
