import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název článku',
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
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek článku',
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
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Stručný perex / Anotace',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Text článku',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO a Metadata',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('cs-CZ') : '';
      return {
        title,
        subtitle: [author, formattedDate].filter(Boolean).join(' | '),
        media,
      };
    },
  },
});
