const criticalPath = process.env.SMOKE_CRITICAL_PATH?.trim() || '/clanky/';
export default {
  baseUrl: (process.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, ''),
  criticalPath,
  siteTitle: process.env.SMOKE_SITE_TITLE?.trim(),
  criticalTitle: process.env.SMOKE_CRITICAL_TITLE?.trim(),
  attempts: 3,
  timeoutMs: 8000,
  retryMs: 2000,
};
