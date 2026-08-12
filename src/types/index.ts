// ─── Property ──────────────────────────────────────────────────────────────

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Off Plan' | 'Sold';
export type PropertyType = 'Townhouse' | 'Villa' | 'Studio' | 'Apartment' | 'Office' | 'Commercial';

/**
 * Mirrors the upcoming CMS "Custom Layout" radio field on the property record:
 * - `layout-1` (default) — the current property detail template.
 * - `layout-2` — the alternate editorial/villa-style template.
 */
export type PropertyCustomLayout = 'layout-1' | 'layout-2';

export interface PropertySpecs {
  beds: number;
  baths: number;
  sqft: number;
  garage?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  /** Composed display string from street, city, countryCode — e.g. "12 Willow St, New York (US)". */
  location: string;
  street?: string | null;
  city?: string | null;
  countryCode?: string | null;
  price: number;
  currency: string;
  status: PropertyStatus;
  type: PropertyType;
  specs: PropertySpecs;
  /** Soft-resized preview for cards / thumbs. */
  imageUrl: string;
  /** Full-resolution source for modal / detail / lightbox. */
  imageUrlOriginal?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  /** Not yet wired to the backend — see `resolvePropertyCustomLayout`. */
  customLayout?: PropertyCustomLayout;
}

export interface PropertyGalleryImage {
  id: string;
  /** Soft-resized preview for gallery tiles. */
  url: string;
  /** Full-resolution source for lightbox enlarge. */
  originalUrl?: string;
  alt: string;
}

/** Custom Layout 1 named media slots — see `lib/property-layout.ts` for placement/ratio docs. */
export interface PropertyLayout1Media {
  showcaseOneUrl: string | null;
  showcaseOneUrlOriginal?: string | null;
  showcaseTwoUrl: string | null;
  showcaseTwoUrlOriginal?: string | null;
  showcaseThreeUrl: string | null;
  showcaseThreeUrlOriginal?: string | null;
  featureVerticalUrl: string | null;
  featureVerticalUrlOriginal?: string | null;
  featureSquareUrl: string | null;
  featureSquareUrlOriginal?: string | null;
  bannerUrl: string | null;
  bannerUrlOriginal?: string | null;
}

/** Custom Layout 2 named media slots — see `lib/property-layout.ts` for placement/ratio docs. */
export interface PropertyLayout2Media {
  splitVerticalUrl: string | null;
  splitVerticalUrlOriginal?: string | null;
  splitLandscapeUrl: string | null;
  splitLandscapeUrlOriginal?: string | null;
  bannerUrl: string | null;
  bannerUrlOriginal?: string | null;
}

export interface PropertyDetail extends Property {
  description: string;
  tagline: string;
  /** Shared "Explore every angle" gallery — exactly 8 images (2×4-tile bento pages). */
  gallery: PropertyGalleryImage[];
  features: string[];
  amenities: string[];
  /** Always present; only the slots matching `customLayout` are expected to be filled in. */
  layout1Media: PropertyLayout1Media;
  layout2Media: PropertyLayout2Media;
  relatedPropertyIds?: string[];
  /** Primary listing agent — one per property. */
  agent?: ListingAgent;
}

/** Assigned listing agent embedded on property detail and inquiry flows. */
export type ListingAgent = Pick<Agent, 'id' | 'slug' | 'name' | 'role' | 'avatarUrl'>;

/** Property listing with assigned agent — used in Best Property Value rows */
export interface PropertyWithAgent extends Property {
  agent: Pick<Agent, 'id' | 'name' | 'avatarUrl'>;
}

// ─── Agent ─────────────────────────────────────────────────────────────────

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatarUrl: string;
  /** CSS object-position for avatar crop, e.g. "center 28%" */
  avatarObjectPosition?: string;
  listingsCount: number;
  phone?: string;
  email?: string;
  bio?: string;
}

// ─── Testimonial ───────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  rating?: number;
}

// ─── Location ──────────────────────────────────────────────────────────────

export interface Location {
  id: string;
  city: string;
  country: string;
  propertiesCount: number;
  imageUrl: string;
}

// ─── PropertyTypeFilter ────────────────────────────────────────────────────

export interface PropertyTypeFilter {
  id: string;
  label: PropertyType;
  count: number;
  icon: string;
}

export interface PropertyTypeCount {
  type: PropertyType;
  count: number;
}

// ─── SearchFilter ──────────────────────────────────────────────────────────

export type SearchMode = 'Buy' | 'Rent' | 'Off Plan';

export interface SearchFilters {
  mode: SearchMode;
  location: string;
  propertyType: PropertyType | '';
  beds: string;
  minPrice: string;
  maxPrice: string;
}

/** URL-synced search intent — persisted for shareable links; filtering happens on the backend. */
export interface ListingFilters {
  keyword: string;
  location: string;
  propertyType: PropertyType | '';
  status: PropertyStatus | '';
  beds: string;
  minPrice: string;
  maxPrice: string;
  /** Optional agent profile slug — filters listings by assigned agent. */
  agentSlug: string;
  sort: PropertySort | '';
  page: number;
  perPage: number;
}

export const DEFAULT_LISTING_FILTERS: ListingFilters = {
  keyword: '',
  location: '',
  propertyType: '',
  status: '',
  beds: '',
  minPrice: '',
  maxPrice: '',
  agentSlug: '',
  sort: '',
  page: 1,
  perPage: 12,
};

export const DEFAULT_LISTINGS_PER_PAGE = 12;

/** Future GraphQL query variables (Laravel + MySQL). */
export type PropertySort = 'PRICE_ASC' | 'PRICE_DESC' | 'NEWEST' | 'FEATURED';

export interface PropertySearchVariables {
  keyword?: string;
  location?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  minBeds?: number;
  minPrice?: number;
  maxPrice?: number;
  agentSlug?: string;
  sort?: PropertySort;
  page?: number;
  perPage?: number;
}

export interface PropertySearchResult {
  items: Property[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

// ─── Article ───────────────────────────────────────────────────────────────

export type ArticleCategory = 'news' | 'blog';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  category: ArticleCategory;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
}
