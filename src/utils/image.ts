import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Vrací URL builder pro Sanity obrázek s automatickým formátováním (AVIF/WebP dle prohlížeče).
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format');
}

/**
 * Pomocná funkce pro vytažení rozměrů z Sanity obrázkové asset reference.
 */
export function getImageDimensions(image: unknown) {
  const source = image && typeof image === 'object' ? image as { asset?: { _ref?: string } } : {};
  if (!source.asset?._ref) {
    return { width: 800, height: 600, aspectRatio: 1.33 };
  }

  // Sanity asset ID format: image-tb92ph8zs71-2000x3000-jpg
  const dimensions = source.asset._ref.split('-')[2];
  if (!dimensions) {
    return { width: 800, height: 600, aspectRatio: 1.33 };
  }

  const [width, height] = dimensions.split('x').map(Number);
  return {
    width: width || 800,
    height: height || 600,
    aspectRatio: width && height ? width / height : 1.33,
  };
}
