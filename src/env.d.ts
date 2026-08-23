/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SITE_URL: string;
  readonly CONTENT_SOURCE?: 'auto' | 'sanity' | 'fallback' | string;
  readonly PUBLIC_SANITY_STUDIO_TITLE?: string;
  readonly PUBLIC_GITHUB_ACTIONS_URL?: string;
  readonly PUBLIC_WEB3FORMS_ACCESS_KEY?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: 'plausible' | 'umami' | 'ga4' | 'none' | string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_PLAUSIBLE_SCRIPT_URL?: string;
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
  readonly PUBLIC_UMAMI_SCRIPT_URL?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_ANALYTICS_DEBUG?: string | boolean;
  readonly PUBLIC_RUM_PROVIDER?: 'cloudflare' | 'none' | string;
  readonly PUBLIC_CLOUDFLARE_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
