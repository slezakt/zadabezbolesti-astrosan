import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název webu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hlavní popis webu',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seo',
      title: 'Výchozí SEO a Metadata',
      type: 'seo',
    }),
  ],
});
