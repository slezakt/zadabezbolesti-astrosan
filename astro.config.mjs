import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

const siteUrl = env.PUBLIC_SITE_URL?.trim() || 'http://localhost:4321';
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID?.trim() || 'placeholder';
const sanityDataset = env.PUBLIC_SANITY_DATASET?.trim() || 'production';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    alpinejs(),
    sitemap({
      filter(page) {
        const { pathname } = new URL(page);
        return pathname !== '/admin' && !pathname.startsWith('/admin/');
      },
    }),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      studioBasePath: '/admin',
      useCdn: false,
    }),
  ],
});
