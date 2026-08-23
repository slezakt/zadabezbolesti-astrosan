import config from './smoke.config.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function check(pathname, kind = 'html', title) {
  const url = `${config.baseUrl}${pathname}`;
  let reason = '';
  for (let attempt = 1; attempt <= config.attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
      const body = await response.text();
      if (!response.ok) reason = `HTTP ${response.status}`;
      else if (kind === 'html' && (!/<main[\s>]/i.test(body) || (title && !body.includes(title)))) reason = 'invalid HTML';
      else if (kind === 'xml' && !body.trim().startsWith('<?xml')) reason = 'invalid XML';
      else { clearTimeout(timer); console.log(`[health] PASS ${url}`); return true; }
    } catch (error) { reason = error instanceof Error ? error.message : String(error); }
    finally { clearTimeout(timer); }
    if (attempt < config.attempts) await wait(config.retryMs);
  }
  console.error(`[health] FAIL ${url}: ${reason}`);
  return false;
}
