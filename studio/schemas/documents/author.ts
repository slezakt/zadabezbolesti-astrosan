import { defineType, defineField } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno a příjmení',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Identifikátor (Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Fotografie / Portrét',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biografie / O autorovi',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
