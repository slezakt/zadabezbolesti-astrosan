import type { AnalyticsProvider } from './config';

export const CONSENT_STORAGE_KEY = 'privacy-consent';
export interface ConsentState { version: 1; analytics: boolean; updatedAt: string }

export function isDntEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  const value = navigator.doNotTrack || (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack;
  return value === '1' || value === 'yes';
}

export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    const value = raw ? JSON.parse(raw) : null;
    return value?.version === 1 && typeof value.analytics === 'boolean' && typeof value.updatedAt === 'string' ? value : null;
  } catch { return null; }
}

export function setAnalyticsConsent(analytics: boolean): ConsentState {
  const state: ConsentState = { version: 1, analytics, updatedAt: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    try { localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state)); } catch { /* storage can be blocked */ }
    window.dispatchEvent(new CustomEvent('privacy-consent-changed', { detail: state }));
  }
  return state;
}

export const hasUserDecided = () => getConsentState() !== null;
export const isAnalyticsAllowed = (provider: AnalyticsProvider) => {
  if (provider === 'none' || isDntEnabled()) return false;
  return provider === 'ga4' ? getConsentState()?.analytics === true : true;
};
