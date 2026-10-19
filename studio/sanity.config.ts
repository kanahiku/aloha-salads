import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemas';
import { structure } from './structure';

export default defineConfig({
  name: 'aloha-salads',
  title: 'Aloha Salads',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'sys9vj6r',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Catering sub-pages and simple pages are fixed documents listed in the sidebar — don't offer "create new".
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          ![
            'cateringSubpage',
            'interiorPage',
            'pressPage',
            'reviewsPage',
            'legalPage',
            'locationPage',
            'menuSubpage',
            'announcementBar',
            'siteNavigation',
            'siteFooter',
          ].includes(item.templateId)
      ),
  },
});
