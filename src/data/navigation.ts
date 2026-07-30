import type { ListingFilters, PropertyStatus, PropertyType } from '@/types';
import { DEFAULT_LISTING_FILTERS } from '@/types';
import { filtersToSearchParams } from '@/lib/listing-filter-params';
import { routes } from '@/lib/routes';

export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavLinkGroup {
  title: string;
  items: NavLinkItem[];
}

export const SIMPLE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Listings', href: '/listings' },
  { label: 'Blog', href: '/blog' },
] as const;

export type TopNavKey = 'home' | 'listings' | 'properties' | 'pages' | 'blog';

export const HOME_SCROLL_SECTIONS = [
  'properties',
  'listings',
  'expertise',
  'location',
  'agents',
  'testimonials',
  'contact',
] as const;

export type HomeScrollSection = (typeof HOME_SCROLL_SECTIONS)[number] | 'home';

const PAGE_SECTION_HASHES = new Set([
  '#expertise',
  '#agents',
  '#contact',
  '#location',
  '#testimonials',
]);

const PAGE_ROUTES = new Set(['/login', '/register', '/submit-property', '/about', '/contact', '/agents']);

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

/** Build a listings URL from a filter partial (type and/or status). */
export function listingsHref(partial: {
  propertyType?: PropertyType | '';
  status?: PropertyStatus | '';
}): string {
  const filters: ListingFilters = {
    ...DEFAULT_LISTING_FILTERS,
    propertyType: partial.propertyType ?? '',
    status: partial.status ?? '',
  };
  const params = filtersToSearchParams(filters);
  const search = params.toString();
  return search ? `${routes.listings}?${search}` : routes.listings;
}

/** Which top-level nav item should appear active for the current route (exclusive). */
export function resolveActiveNav(pathname: string, hash: string): TopNavKey | null {
  const path = normalizePath(pathname);
  const h = hash.toLowerCase();

  if (path === '/') {
    if (!h) return 'home';
    if (h === '#listings') return 'listings';
    if (h === '#properties') return 'properties';
    if (PAGE_SECTION_HASHES.has(h)) return 'pages';
    return 'home';
  }

  if (path === '/listings') return 'listings';
  if (path.startsWith('/properties')) return 'properties';
  if (path.startsWith('/blog')) return 'blog';
  if (path.startsWith('/news') || PAGE_ROUTES.has(path) || path.startsWith('/agents')) return 'pages';

  return null;
}

const PAGE_SCROLL_SECTIONS = new Set<HomeScrollSection>([
  'expertise',
  'location',
  'agents',
  'testimonials',
  'contact',
]);

/** Map visible home section → single active top nav key (scroll spy). */
export function sectionToNavKey(section: HomeScrollSection): TopNavKey | null {
  if (section === 'home') return 'home';
  if (section === 'properties') return 'properties';
  if (section === 'listings') return 'listings';
  if (PAGE_SCROLL_SECTIONS.has(section)) return 'pages';
  return null;
}

/** Maps nav label → listing filter side-effect */
export const PROPERTY_NAV_FILTER_MAP: Record<
  string,
  { propertyType?: PropertyType; status?: PropertyStatus }
> = {
  Apartments: { propertyType: 'Apartment' },
  Villas: { propertyType: 'Villa' },
  Townhouses: { propertyType: 'Townhouse' },
  Studios: { propertyType: 'Studio' },
  Offices: { propertyType: 'Office' },
  'Retail & Commercial': { propertyType: 'Commercial' },
  'For Sale': { status: 'For Sale' },
  'For Rent': { status: 'For Rent' },
  'Off Plan': { status: 'Off Plan' },
};

/** Whether a dropdown nav item matches the current route (or active listing filter). */
export function isNavItemActive(
  href: string,
  label: string,
  pathname: string,
  hash: string,
  filters?: { propertyType?: string; status?: string },
  activeSection?: HomeScrollSection | null
): boolean {
  const mapping = PROPERTY_NAV_FILTER_MAP[label];
  const path = normalizePath(pathname);
  const onListings = path === '/listings';

  if (mapping && filters) {
    if (!onListings) return false;
    if (mapping.propertyType) {
      return filters.propertyType === mapping.propertyType && !filters.status;
    }
    if (mapping.status) {
      return filters.status === mapping.status && !filters.propertyType;
    }
    return false;
  }

  // "Browse All Types" — listings with no type/status filter
  if (label === 'Browse All Types' && onListings && filters) {
    return !filters.propertyType && !filters.status;
  }

  if (activeSection) {
    if (href.startsWith('#')) {
      const sectionId = href.slice(1) as HomeScrollSection;
      return sectionId === activeSection;
    }
    return false;
  }

  if (href.startsWith('#')) {
    if (href === '#agents' && path.startsWith('/agents')) return true;
    return path === '/' && hash.toLowerCase() === href.toLowerCase();
  }

  const targetPath = normalizePath(href.split('?')[0] ?? href);
  if (targetPath === '/blog') return path.startsWith('/blog');
  if (targetPath === '/news') return path.startsWith('/news');
  if (targetPath === '/about') return path === '/about';
  if (targetPath === '/contact') return path === '/contact';
  if (targetPath === '/agents') return path.startsWith('/agents');
  return path === targetPath;
}

export const PROPERTIES_NAV_GROUPS: NavLinkGroup[] = [
  {
    title: 'Residential',
    items: [
      {
        label: 'Apartments',
        href: listingsHref({ propertyType: 'Apartment' }),
        description: 'Urban flats & penthouses',
      },
      {
        label: 'Villas',
        href: listingsHref({ propertyType: 'Villa' }),
        description: 'Private estates & compounds',
      },
      {
        label: 'Townhouses',
        href: listingsHref({ propertyType: 'Townhouse' }),
        description: 'Multi-level family homes',
      },
      {
        label: 'Studios',
        href: listingsHref({ propertyType: 'Studio' }),
        description: 'Compact city living',
      },
    ],
  },
  {
    title: 'Commercial',
    items: [
      {
        label: 'Offices',
        href: listingsHref({ propertyType: 'Office' }),
        description: 'CBD & business districts',
      },
      {
        label: 'Retail & Commercial',
        href: listingsHref({ propertyType: 'Commercial' }),
        description: 'Shops, warehouses & mixed-use',
      },
    ],
  },
  {
    title: 'By Status',
    items: [
      {
        label: 'For Sale',
        href: listingsHref({ status: 'For Sale' }),
        description: 'Own your next property',
      },
      {
        label: 'For Rent',
        href: listingsHref({ status: 'For Rent' }),
        description: 'Monthly & long-term leases',
      },
      {
        label: 'Off Plan',
        href: listingsHref({ status: 'Off Plan' }),
        description: 'Pre-construction investments',
      },
      {
        label: 'Browse All Types',
        href: routes.listings,
        description: 'Explore by property type',
      },
    ],
  },
];

export const PAGES_NAV_GROUPS: NavLinkGroup[] = [
  {
    title: 'Company',
    items: [
      { label: 'About Us', href: '/about', description: 'Our story & expertise' },
      { label: 'Our Agents', href: '/agents', description: 'Meet the team' },
      { label: 'Contact', href: '/contact', description: 'Get in touch' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Latest News', href: '/news', description: 'Market updates & headlines' },
      { label: 'Blog & Guides', href: '/blog', description: 'Buyer guides & expert tips' },
      { label: 'Locations', href: '#location', description: 'Cities we serve' },
      { label: 'Testimonials', href: '#testimonials', description: 'Client stories' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Login', href: '/login', description: 'Access your account' },
      { label: 'Register', href: '/register', description: 'Create an account' },
      { label: 'Submit Property', href: '/submit-property', description: 'List with Homzen' },
    ],
  },
];
