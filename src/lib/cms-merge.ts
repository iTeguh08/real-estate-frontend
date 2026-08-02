import { AGENTS } from '@/data/agents';
import { ARTICLES } from '@/data/articles';
import { enrichPropertyDetail } from '@/data/property-details';
import { BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES } from '@/data/properties';
import { PROPERTY_GALLERY_COUNT } from '@/lib/property-gallery';
import type {
  Agent,
  Article,
  Property,
  PropertyDetail,
  PropertyGalleryImage,
  PropertyLayout1Media,
  PropertyLayout2Media,
  PropertyWithAgent,
} from '@/types';

const ALL_PROPERTIES: Property[] = [
  ...FEATURED_PROPERTIES,
  ...BEST_VALUE_PROPERTIES.filter(
    (p) => !FEATURED_PROPERTIES.some((f) => f.slug === p.slug)
  ),
];

function isBlank(value: unknown): value is null | undefined | '' {
  return value == null || value === '';
}

function coalesce<T>(cms: T | null | undefined, fallback: T): T {
  return isBlank(cms) ? fallback : cms;
}

function hasGalleryImages(items: PropertyGalleryImage[] | undefined): boolean {
  const filled = items?.filter((item) => !isBlank(item.url)) ?? [];
  return filled.length >= PROPERTY_GALLERY_COUNT;
}

/** Field-by-field coalesce for the flat layout media objects — keeps whichever slots the CMS filled in, falls back per-slot otherwise. */
function coalesceMediaObject<T extends object>(cms: T | undefined, fallback: T): T {
  const result = { ...fallback };
  (Object.keys(fallback) as Array<keyof T>).forEach((key) => {
    const cmsValue = cms?.[key];
    result[key] = (isBlank(cmsValue) ? fallback[key] : cmsValue) as T[keyof T];
  });
  return result;
}

export function findFallbackProperty(slug: string): Property | undefined {
  return ALL_PROPERTIES.find((property) => property.slug === slug);
}

export function mergePropertyWithFallback(cms: Property): Property {
  const fallback = findFallbackProperty(cms.slug);
  if (!fallback) {
    return cms;
  }

  return {
    ...fallback,
    ...cms,
    imageUrl: coalesce(cms.imageUrl, fallback.imageUrl),
    title: coalesce(cms.title, fallback.title),
    location: coalesce(cms.location, fallback.location),
    street: coalesce(cms.street, fallback.street),
    city: coalesce(cms.city, fallback.city),
    countryCode: coalesce(cms.countryCode, fallback.countryCode),
    price: cms.price || fallback.price,
    currency: coalesce(cms.currency, fallback.currency),
    status: coalesce(cms.status, fallback.status),
    type: coalesce(cms.type, fallback.type),
    specs: {
      beds: cms.specs.beds || fallback.specs.beds,
      baths: cms.specs.baths || fallback.specs.baths,
      sqft: cms.specs.sqft || fallback.specs.sqft,
      garage: cms.specs.garage ?? fallback.specs.garage,
    },
    isFeatured: cms.isFeatured ?? fallback.isFeatured,
    isNew: cms.isNew ?? fallback.isNew,
    customLayout: cms.customLayout ?? fallback.customLayout,
  };
}

export function mergePropertyWithAgentFallback(cms: PropertyWithAgent): PropertyWithAgent {
  const merged = mergePropertyWithFallback(cms) as PropertyWithAgent;
  const fallback = BEST_VALUE_PROPERTIES.find((property) => property.slug === cms.slug);

  if (!fallback?.agent) {
    return merged;
  }

  return {
    ...merged,
    agent: {
      ...fallback.agent,
      ...cms.agent,
      avatarUrl: coalesce(cms.agent?.avatarUrl, fallback.agent.avatarUrl),
      name: coalesce(cms.agent?.name, fallback.agent.name),
    },
  };
}

export function mergePropertyDetailWithFallback(cms: PropertyDetail): PropertyDetail {
  const fallbackProperty = findFallbackProperty(cms.slug);
  const mergedBase = mergePropertyWithFallback(cms);
  const fallbackDetail = fallbackProperty
    ? enrichPropertyDetail(fallbackProperty)
    : enrichPropertyDetail(mergedBase);

  return {
    ...fallbackDetail,
    ...cms,
    ...mergedBase,
    imageUrl: coalesce(cms.imageUrl, fallbackDetail.imageUrl),
    description: coalesce(cms.description, fallbackDetail.description),
    tagline: coalesce(cms.tagline, fallbackDetail.tagline),
    features: cms.features?.length ? cms.features : fallbackDetail.features,
    amenities: cms.amenities?.length ? cms.amenities : fallbackDetail.amenities,
    gallery: hasGalleryImages(cms.gallery) ? cms.gallery : fallbackDetail.gallery,
    layout1Media: coalesceMediaObject<PropertyLayout1Media>(cms.layout1Media, fallbackDetail.layout1Media),
    layout2Media: coalesceMediaObject<PropertyLayout2Media>(cms.layout2Media, fallbackDetail.layout2Media),
    relatedPropertyIds: cms.relatedPropertyIds?.length
      ? cms.relatedPropertyIds
      : fallbackDetail.relatedPropertyIds,
  };
}

export function mergeArticleWithFallback(cms: Article): Article {
  const fallback = ARTICLES.find((article) => article.slug === cms.slug);
  if (!fallback) {
    return {
      ...cms,
      tags: cms.tags ?? [],
    };
  }

  return {
    ...fallback,
    ...cms,
    imageUrl: coalesce(cms.imageUrl, fallback.imageUrl),
    title: coalesce(cms.title, fallback.title),
    excerpt: coalesce(cms.excerpt, fallback.excerpt),
    body: coalesce(cms.body, fallback.body),
    category: coalesce(cms.category, fallback.category),
    publishedAt: coalesce(cms.publishedAt, fallback.publishedAt),
    tags: cms.tags?.length ? cms.tags : fallback.tags,
  };
}

export function mergeAgentWithFallback(cms: Agent): Agent {
  const fallback = AGENTS.find((agent) => agent.slug === cms.slug);
  if (!fallback) {
    return cms;
  }

  return {
    ...fallback,
    ...cms,
    avatarUrl: coalesce(cms.avatarUrl, fallback.avatarUrl),
    name: coalesce(cms.name, fallback.name),
    role: coalesce(cms.role, fallback.role),
    bio: coalesce(cms.bio, fallback.bio),
    phone: coalesce(cms.phone, fallback.phone),
    email: coalesce(cms.email, fallback.email),
    listingsCount: cms.listingsCount || fallback.listingsCount,
    avatarObjectPosition: coalesce(cms.avatarObjectPosition, fallback.avatarObjectPosition),
  };
}

export function mergePropertiesWithFallback(items: Property[]): Property[] {
  return items.map(mergePropertyWithFallback);
}

export function mergeArticlesWithFallback(items: Article[]): Article[] {
  return items.map(mergeArticleWithFallback);
}

export function mergeAgentsWithFallback(items: Agent[]): Agent[] {
  return items.map(mergeAgentWithFallback);
}
