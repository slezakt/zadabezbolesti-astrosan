import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název kategorie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Identifikátor (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis kategorie',
      type: 'text',
      rows: 3,
    }),
  ],
});
