// ─── Property ──────────────────────────────────────────────────────────────

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Off Plan' | 'Sold';
export type PropertyType = 'Townhouse' | 'Villa' | 'Studio' | 'Apartment' | 'Office' | 'Commercial';

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
  location: string;
  price: number;
  currency: string;
  status: PropertyStatus;
  type: PropertyType;
  specs: PropertySpecs;
  imageUrl: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

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
}

export const DEFAULT_LISTING_FILTERS: ListingFilters = {
  keyword: '',
  location: '',
  propertyType: '',
  status: '',
  beds: '',
  minPrice: '',
  maxPrice: '',
};

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
  sort?: PropertySort;
  page?: number;
  perPage?: number;
}

// ─── Article ───────────────────────────────────────────────────────────────

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
}
