import type { AnalyticsProvider } from './config';
import { isAnalyticsAllowed } from './consent';
import type { AnalyticsEventName, AnalyticsEvents } from './events';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    umami?: { track: (event: string, props?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __ANALYTICS_ACTIVE_PROVIDER__?: AnalyticsProvider;
    __ANALYTICS_DEBUG__?: boolean;
  }
}

export function trackEvent<K extends AnalyticsEventName>(event: K, props: AnalyticsEvents[K]) {
  if (typeof window === 'undefined') return;
  const provider = window.__ANALYTICS_ACTIVE_PROVIDER__ || 'none';
  if (window.__ANALYTICS_DEBUG__) console.info('[analytics debug]', event, props, provider);
  if (!isAnalyticsAllowed(provider)) return;
  if (provider === 'plausible') window.plausible?.(event, { props: props as Record<string, unknown> });
  if (provider === 'umami') window.umami?.track(event, props as Record<string, unknown>);
  if (provider === 'ga4') window.gtag?.('event', event, props as Record<string, unknown>);
}
