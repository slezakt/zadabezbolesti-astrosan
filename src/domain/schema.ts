export interface StructuredDataProps {
  image?: string;
  publishedAt?: string;
  authorName?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: { latitude: number; longitude: number };
  telephone?: string;
  priceRange?: string;
  openingHours?: string[];
}
