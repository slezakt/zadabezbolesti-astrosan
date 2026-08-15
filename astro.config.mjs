import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://example.com',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    alpinejs(),
    sitemap(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      studioBasePath: '/admin',
      useCdn: false,
      stega: {
        studioUrl: env.PUBLIC_SANITY_STUDIO_URL || '/admin',
      },
    }),
  ],
});
