import { describe, expect, it, vi } from 'vitest';
import { executeContentSourcePolicy, isSanityConfigured, resolveContentSourceMode } from '../../src/domain/sourcePolicy';
import { ContentValidationError, SanityConnectivityError } from '../../src/domain/errors';

describe('isSanityConfigured', () => {
  it('returns false for undefined, empty, or placeholder values', () => {
    expect(isSanityConfigured(undefined)).toBe(false);
    expect(isSanityConfigured('')).toBe(false);
    expect(isSanityConfigured('   ')).toBe(false);
    expect(isSanityConfigured('your-project-id')).toBe(false);
    expect(isSanityConfigured('placeholder')).toBe(false);
  });

  it('returns true for real project IDs', () => {
    expect(isSanityConfigured('abc123xyz')).toBe(true);
    expect(isSanityConfigured('prj-prod-01')).toBe(true);
  });
});

describe('content source policy', () => {
  it('uses strict Sanity by default outside development', () => expect(resolveContentSourceMode(undefined, false)).toBe('sanity'));
  it('does not call Sanity in fallback mode', async () => {
    const sanity = vi.fn();
    expect(await executeContentSourcePolicy({ mode: 'fallback', getSanityData: sanity, getFallbackData: () => 'fallback' })).toBe('fallback');
    expect(sanity).not.toHaveBeenCalled();
  });
  it('uses fallback in auto only for connectivity failures', async () => {
    expect(await executeContentSourcePolicy({ mode: 'auto', getSanityData: async () => { throw new SanityConnectivityError('offline'); }, getFallbackData: () => 'fallback' })).toBe('fallback');
    await expect(executeContentSourcePolicy({ mode: 'auto', getSanityData: async () => { throw new ContentValidationError('invalid'); }, getFallbackData: () => 'fallback' })).rejects.toBeInstanceOf(ContentValidationError);
  });
});
