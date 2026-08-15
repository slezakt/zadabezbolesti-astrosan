import { sanityClient } from 'sanity:client';

export interface SanityFetchOptions {
  preview?: boolean;
}

/**
 * Vrátí nakonfigurovaného Sanity klienta podle toho, zda je aktivní režim náhledu (Draft Mode).
 */
export function getSanityClient(options: SanityFetchOptions = {}) {
  const { preview = false } = options;

  if (preview) {
    const token = import.meta.env.SANITY_API_READ_TOKEN;
    return sanityClient.withConfig({
      useCdn: false,
      token: token || undefined,
      perspective: 'previewDrafts',
      stega: {
        enabled: true,
        studioUrl: import.meta.env.PUBLIC_SANITY_STUDIO_URL || '/admin',
      },
    });
  }

  return sanityClient;
}

/**
 * Spustí GROQ dotaz nad Sanity databází.
 */
export async function fetchSanity<T = any>(
  query: string,
  params: Record<string, any> = {},
  options: SanityFetchOptions = {}
): Promise<T> {
  const client = getSanityClient(options);
  return await client.fetch<T>(query, params);
}
