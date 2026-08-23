import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './studio/schemas';
import { deployTool } from './studio/tools/deploy';

const env = (key: string, fallback = '') => {
  const value = typeof process !== 'undefined' ? process.env[key] : undefined;
  return value || import.meta.env[key] || fallback;
};
const projectId = env('PUBLIC_SANITY_PROJECT_ID', 'placeholder').trim() || 'placeholder';
const dataset = env('PUBLIC_SANITY_DATASET', 'production').trim() || 'production';

export default defineConfig({
  name: 'default',
  title: env('PUBLIC_SANITY_STUDIO_TITLE', 'Správa obsahu'),

  projectId,
  dataset,

  plugins: [
    structureTool({
      title: 'Struktura obsahu',
      structure: (S) =>
        S.list()
          .title('Správa obsahu')
          .items([
            // Singleton pro Nastavení webu
            S.listItem()
              .title('Nastavení webu')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Běžné dokumentové typy
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'deploymentRequest'].includes(item.getId() || '')
            ),
          ]),
    }),
    presentationTool({ title: 'Náhled publikovaného webu', previewUrl: env('PUBLIC_SITE_URL', 'http://localhost:4321') }),
    media(),
  ],

  tools: (previous) => [...previous, deployTool({ actionsUrl: env('PUBLIC_GITHUB_ACTIONS_URL') })],

  document: {
    newDocumentOptions: (previous) => previous.filter((template) => template.templateId !== 'deploymentRequest'),
  },

  schema: {
    types: schemaTypes,
  },
});
