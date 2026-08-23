export type AnalyticsProvider = 'plausible' | 'umami' | 'ga4' | 'none';
export type RumProvider = 'cloudflare' | 'none';
export interface AnalyticsConfig {
  activeProvider: AnalyticsProvider;
  plausibleDomain?: string;
  plausibleScriptUrl?: string;
  umamiWebsiteId?: string;
  umamiScriptUrl: string;
  gaMeasurementId?: string;
  rumProvider: RumProvider;
  cloudflareBeaconToken?: string;
  debug: boolean;
}

const text = (value: unknown) => typeof value === 'string' && value.trim() ? value.trim() : undefined;

export function parseAnalyticsConfig(env: Record<string, unknown>, production = false): AnalyticsConfig {
  const activeProvider = String(env.PUBLIC_ANALYTICS_PROVIDER || 'none').trim().toLowerCase() as AnalyticsProvider;
  if (!['plausible', 'umami', 'ga4', 'none'].includes(activeProvider)) throw new Error(`Invalid PUBLIC_ANALYTICS_PROVIDER "${activeProvider}".`);
  const rumProvider = String(env.PUBLIC_RUM_PROVIDER || 'none').trim().toLowerCase() as RumProvider;
  if (!['cloudflare', 'none'].includes(rumProvider)) throw new Error(`Invalid PUBLIC_RUM_PROVIDER "${rumProvider}".`);
  const config: AnalyticsConfig = {
    activeProvider,
    plausibleDomain: text(env.PUBLIC_PLAUSIBLE_DOMAIN),
    plausibleScriptUrl: text(env.PUBLIC_PLAUSIBLE_SCRIPT_URL),
    umamiWebsiteId: text(env.PUBLIC_UMAMI_WEBSITE_ID),
    umamiScriptUrl: text(env.PUBLIC_UMAMI_SCRIPT_URL) || 'https://cloud.umami.is/script.js',
    gaMeasurementId: text(env.PUBLIC_GA_MEASUREMENT_ID),
    rumProvider,
    cloudflareBeaconToken: text(env.PUBLIC_CLOUDFLARE_BEACON_TOKEN),
    debug: env.PUBLIC_ANALYTICS_DEBUG === true || env.PUBLIC_ANALYTICS_DEBUG === 'true',
  };
  if (production && activeProvider === 'plausible') {
    if (!config.plausibleDomain || !config.plausibleScriptUrl) throw new Error('Plausible requires PUBLIC_PLAUSIBLE_DOMAIN and the site-specific PUBLIC_PLAUSIBLE_SCRIPT_URL.');
    if (config.plausibleScriptUrl.endsWith('/js/script.js')) throw new Error('Legacy Plausible script.js is not allowed; use the current site-specific pa-*.js URL.');
  }
  if (production && activeProvider === 'umami' && !config.umamiWebsiteId) throw new Error('Umami requires PUBLIC_UMAMI_WEBSITE_ID.');
  if (production && activeProvider === 'ga4' && !config.gaMeasurementId) throw new Error('GA4 requires PUBLIC_GA_MEASUREMENT_ID.');
  if (production && rumProvider === 'cloudflare' && !config.cloudflareBeaconToken) throw new Error('Cloudflare RUM requires PUBLIC_CLOUDFLARE_BEACON_TOKEN.');
  return config;
}

export const getAnalyticsConfig = () => parseAnalyticsConfig(import.meta.env, import.meta.env.PROD);
export const requiresConsent = (provider: AnalyticsProvider) => provider === 'ga4';
