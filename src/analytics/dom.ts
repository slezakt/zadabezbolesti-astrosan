import { VALID_EVENT_NAMES, type AnalyticsEventName, type AnalyticsEvents } from './events';
import { trackEvent } from './track';

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const isTechnicalId = (value: unknown): value is string => typeof value === 'string' && value.length <= 64 && ID.test(value);
export const isAnalyticsEventName = (value: unknown): value is AnalyticsEventName => typeof value === 'string' && (VALID_EVENT_NAMES as readonly string[]).includes(value);

export function parseAnalyticsDataset<K extends AnalyticsEventName>(event: string, data: Readonly<Record<string, string | undefined>>): AnalyticsEvents[K] | null {
  if (!isAnalyticsEventName(event)) return null;
  const location = data.analyticsLocation;
  if (event === 'navigation_click' && isTechnicalId(data.analyticsTargetId) && ['header', 'menu', 'footer'].includes(location || '')) return { target_id: data.analyticsTargetId, location } as AnalyticsEvents[K];
  if (event === 'cta_click' && isTechnicalId(data.analyticsCtaId) && ['hero', 'content', 'footer'].includes(location || '')) return { cta_id: data.analyticsCtaId, location } as AnalyticsEvents[K];
  if (event === 'content_open' && isTechnicalId(data.analyticsContentId) && (data.analyticsContentType === 'page' || data.analyticsContentType === 'post')) return { content_id: data.analyticsContentId, content_type: data.analyticsContentType } as AnalyticsEvents[K];
  if ((event === 'contact_email_click' || event === 'contact_phone_click') && ['header', 'contact', 'footer'].includes(location || '')) return { location } as AnalyticsEvents[K];
  if (event === 'contact_form_success' && isTechnicalId(data.analyticsFormId)) return { form_id: data.analyticsFormId } as AnalyticsEvents[K];
  return null;
}

export function initDOMAnalyticsDelegation() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', (event) => {
    const element = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-analytics-event]');
    if (!element) return;
    const name = element.dataset.analyticsEvent;
    const props = name ? parseAnalyticsDataset(name, element.dataset) : null;
    if (name && props && isAnalyticsEventName(name)) trackEvent(name, props);
  });
}
