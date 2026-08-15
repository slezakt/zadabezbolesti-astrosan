import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './studio/schemas';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Správa obsahu (Sanity CMS)',

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
              (item) => item.getId() !== 'siteSettings'
            ),
          ]),
    }),
    presentationTool({
      title: 'Vizuální Náhled',
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4321',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
