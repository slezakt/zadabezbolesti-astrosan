// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parseAnalyticsConfig } from '../../src/analytics/config';
import { getConsentState, isDntEnabled, setAnalyticsConsent } from '../../src/analytics/consent';
import { isTechnicalId, parseAnalyticsDataset } from '../../src/analytics/dom';

describe('typed analytics', () => {
  beforeEach(() => localStorage.clear());
  it('rejects malformed provider configuration', () => expect(() => parseAnalyticsConfig({ PUBLIC_ANALYTICS_PROVIDER: 'other' })).toThrow());
  it('requires the current Plausible site script in production', () => expect(() => parseAnalyticsConfig({ PUBLIC_ANALYTICS_PROVIDER: 'plausible', PUBLIC_PLAUSIBLE_DOMAIN: 'example.cz', PUBLIC_PLAUSIBLE_SCRIPT_URL: 'https://plausible.io/js/script.js' }, true)).toThrow());
  it('persists and dispatches consent changes', () => {
    const listener = vi.fn();
    window.addEventListener('privacy-consent-changed', listener);
    setAnalyticsConsent(true);
    expect(getConsentState()?.analytics).toBe(true);
    expect(listener).toHaveBeenCalledOnce();
  });
  it('rejects PII and accepts stable identifiers', () => {
    expect(isTechnicalId('main-contact')).toBe(true);
    expect(isTechnicalId('me@example.com')).toBe(false);
    expect(parseAnalyticsDataset('contact_form_success', { analyticsFormId: 'main-contact' })).toEqual({ form_id: 'main-contact' });
  });
  it('honours DNT', () => {
    Object.defineProperty(navigator, 'doNotTrack', { value: '1', configurable: true });
    expect(isDntEnabled()).toBe(true);
  });
});
