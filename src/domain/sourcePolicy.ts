import { ContentSourceConfigError, SanityConnectivityError } from './errors';

export type ContentSourceMode = 'auto' | 'sanity' | 'fallback';

export function isSanityConfigured(projectId?: string): boolean {
  if (!projectId) return false;
  const trimmed = projectId.trim();
  return trimmed !== '' && trimmed !== 'your-project-id' && trimmed !== 'placeholder';
}

export function resolveContentSourceMode(raw?: string, isDev = false): ContentSourceMode {
  const value = raw?.trim().toLowerCase();
  if (!value) return isDev ? 'auto' : 'sanity';
  if (value === 'auto' || value === 'sanity' || value === 'fallback') return value;
  throw new ContentSourceConfigError(`Invalid CONTENT_SOURCE "${raw}". Use auto, sanity or fallback.`);
}

export async function executeContentSourcePolicy<T>({
  mode,
  getSanityData,
  getFallbackData,
}: {
  mode: ContentSourceMode;
  getSanityData: () => Promise<T>;
  getFallbackData: () => T;
}): Promise<T> {
  if (mode === 'fallback') return getFallbackData();
  try {
    return await getSanityData();
  } catch (error) {
    if (mode === 'auto' && error instanceof SanityConnectivityError) {
      console.warn(`[content] Sanity is unavailable, using validated fallback: ${error.message}`);
      return getFallbackData();
    }
    throw error;
  }
}
