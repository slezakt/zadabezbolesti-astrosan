import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO a Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Titulek',
      type: 'string',
      description: 'Optimální délka je 50-60 znaků.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Popis',
      type: 'text',
      rows: 3,
      description: 'Stručné shrnutí obsahu stránky pro vyhledávače (cca 150-160 znaků).',
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'ogImage',
      title: 'Náhledový obrázek (Open Graph)',
      type: 'image',
      description: 'Obrázek zobrazovaný při sdílení na sociálních sítích.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noindex',
      title: 'Skrýt před vyhledávači (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
