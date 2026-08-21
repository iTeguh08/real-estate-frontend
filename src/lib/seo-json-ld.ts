import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import { SITE_CONFIG } from '@/data/site-config';
import type { PropertyDetail } from '@/types';

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  const url = absoluteUrl(routes.home) || 'https://baliestate.web.id/';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'RealEstateAgent'],
    name: SITE_CONFIG.brand,
    url,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phone,
    logo: absoluteUrl('/favicon.svg') || `${url}favicon.svg`,
    sameAs: [
      'https://facebook.com/homzen',
      'https://instagram.com/homzen',
    ],
  };
}

export function localBusinessJsonLd(): JsonLdObject {
  const url = absoluteUrl(routes.contact) || absoluteUrl(routes.home) || 'https://baliestate.web.id/';
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_CONFIG.brand,
    url,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address,
    },
    image: absoluteUrl('/apple-touch-icon.png') || undefined,
  };
}

export function propertyListingJsonLd(property: PropertyDetail): JsonLdObject {
  const url = absoluteUrl(routes.property(property.slug)) || routes.property(property.slug);
  const description = (property.tagline || property.description || property.title)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    url,
    description,
    image: absoluteUrl(property.imageUrl) || property.imageUrl || undefined,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency || 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.street || undefined,
      addressLocality: property.city || property.location || undefined,
      addressCountry: property.countryCode || undefined,
    },
  };
}

/** Serialize for next/head script tag (safe JSON, no `</script>` breakouts). */
export function jsonLdScriptContent(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
