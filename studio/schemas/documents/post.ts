import { defineType, defineField, defineArrayMember } from 'sanity';

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text článku',
      type: 'blockContent',
    }),
    defineField({
      name: 'faq',
      title: 'Často kladené otázky (FAQ pro Google Rich Snippets)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Otázka',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              title: 'Odpověď',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'takeaways',
      title: 'Klíčová doporučení (Takeaways)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sources',
      title: 'Zdroje a doporučení',
      description: 'U zdravotních a ergonomických tvrzení uveďte podklady, ze kterých článek vychází.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Název zdroje',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Odkaz',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'note',
              title: 'Použito pro',
              description: 'Krátce popište, které tvrzení nebo část článku zdroj podkládá.',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'note' },
          },
        }),
      ],
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
