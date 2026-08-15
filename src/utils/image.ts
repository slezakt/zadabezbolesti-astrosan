import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Vrací URL builder pro Sanity obrázek s automatickým formátováním (AVIF/WebP dle prohlížeče).
 */
export function urlForImage(source: Image | any) {
  return builder.image(source).auto('format');
}

/**
 * Pomocná funkce pro vytažení rozměrů z Sanity obrázkové asset reference.
 */
export function getImageDimensions(image: any) {
  if (!image?.asset?._ref) {
    return { width: 800, height: 600, aspectRatio: 1.33 };
  }

  // Sanity asset ID format: image-tb92ph8zs71-2000x3000-jpg
  const dimensions = image.asset._ref.split('-')[2];
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
