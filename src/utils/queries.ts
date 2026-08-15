import { defineQuery } from 'groq';

// Fragment pro dereferencování PortableText internalLinks
const portableTextFragment = `
  ...,
  _type == "block" => {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        "reference": reference->{
          _type,
          title,
          "slug": slug.current
        }
      }
    }
  }
`;

// Dotaz na globální nastavení webu
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    description,
    seo
  }
`);

// Dotaz na seznam všech stránek (pro sitemap a routing)
export const allPagesQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    title,
    "slug": slug.current,
    _updatedAt
  }
`);

// Dotaz na detail jedné stránky podle slug
export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    content[] {
      ${portableTextFragment}
    },
    seo
  }
`);

// Dotaz na seznam článků
export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      "slug": slug.current,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`);

// Dotaz na detail článku podle slug
export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      "slug": slug.current,
      image,
      bio
    },
    categories[]->{
      title,
      "slug": slug.current
    },
    body[] {
      ${portableTextFragment}
    },
    seo
  }
`);
