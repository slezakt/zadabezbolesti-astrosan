import type { AnalyticsConfig } from './config';
import { isAnalyticsAllowed, isDntEnabled } from './consent';

type Plausible = ((event: string, options?: { props?: Record<string, unknown> }) => void) & {
  q?: IArguments[];
  init?: (options?: Record<string, unknown>) => void;
};

const loaded = new Set<string>();
function script(src: string, attributes: Record<string, string> = {}) {
  if (loaded.has(src)) return;
  const element = document.createElement('script');
  element.src = src;
  element.async = true;
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  document.head.append(element);
  loaded.add(src);
}

function loadGa4(id: string) {
  if (loaded.has(id)) return;
  window.dataLayer ||= [];
  window.gtag ||= function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', id);
  script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
  loaded.add(id);
}

export function initAnalytics(config: AnalyticsConfig) {
  if (typeof window === 'undefined') return;
  window.__ANALYTICS_ACTIVE_PROVIDER__ = config.activeProvider;
  window.__ANALYTICS_DEBUG__ = config.debug;
  if (isDntEnabled()) return;
  if (config.activeProvider === 'plausible' && config.plausibleScriptUrl && config.plausibleDomain) {
    const plausible: Plausible = window.plausible || function () { (plausible.q ||= []).push(arguments); };
    window.plausible = plausible;
    plausible.init ||= () => undefined;
    plausible.init();
    script(config.plausibleScriptUrl);
  }
  if (config.activeProvider === 'umami' && config.umamiWebsiteId) script(config.umamiScriptUrl, { defer: 'true', 'data-website-id': config.umamiWebsiteId, 'data-do-not-track': 'true' });
  if (config.activeProvider === 'ga4' && config.gaMeasurementId && isAnalyticsAllowed('ga4')) loadGa4(config.gaMeasurementId);
  window.addEventListener('privacy-consent-changed', (event) => {
    const allowed = (event as CustomEvent<{ analytics: boolean }>).detail?.analytics === true;
    if (config.activeProvider !== 'ga4' || !config.gaMeasurementId) return;
    if (allowed) loadGa4(config.gaMeasurementId);
    else window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  });
  if (config.rumProvider === 'cloudflare' && config.cloudflareBeaconToken) script('https://static.cloudflareinsights.com/beacon.min.js', { defer: 'true', 'data-cf-beacon': JSON.stringify({ token: config.cloudflareBeaconToken }) });
}
