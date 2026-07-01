import type { PropertyStatus, PropertyType } from '@/types';

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
  { label: 'Listings', href: '#listings' },
  { label: 'Blog', href: '/blog' },
  { label: 'Dashboard', href: '/dashboard' },
] as const;

export type TopNavKey = 'home' | 'listings' | 'properties' | 'pages' | 'blog' | 'dashboard';

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

const PAGE_ROUTES = new Set(['/login', '/register', '/submit-property']);

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
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

  if (path.startsWith('/properties')) return 'properties';
  if (path.startsWith('/blog')) return 'blog';
  if (path === '/dashboard') return 'dashboard';
  if (PAGE_ROUTES.has(path) || path.startsWith('/agents')) return 'pages';

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

  if (activeSection) {
    if (mapping && filters && activeSection === 'listings') {
      if (mapping.propertyType) return filters.propertyType === mapping.propertyType;
      if (mapping.status) return filters.status === mapping.status;
      return false;
    }

    if (href.startsWith('#')) {
      const sectionId = href.slice(1) as HomeScrollSection;
      return sectionId === activeSection;
    }

    return false;
  }

  if (mapping && filters) {
    const path = normalizePath(pathname);
    if (path !== '/' || hash.toLowerCase() !== '#listings') return false;
    if (mapping.propertyType) return filters.propertyType === mapping.propertyType;
    if (mapping.status) return filters.status === mapping.status;
    return false;
  }

  if (href.startsWith('#')) {
    const path = normalizePath(pathname);
    if (href === '#agents' && path.startsWith('/agents')) return true;
    return path === '/' && hash.toLowerCase() === href.toLowerCase();
  }

  const path = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === '/blog') return path.startsWith('/blog');
  return path === target;
}

export const PROPERTIES_NAV_GROUPS: NavLinkGroup[] = [
  {
    title: 'Residential',
    items: [
      { label: 'Apartments', href: '#listings', description: 'Urban flats & penthouses' },
      { label: 'Villas', href: '#listings', description: 'Private estates & compounds' },
      { label: 'Townhouses', href: '#listings', description: 'Multi-level family homes' },
      { label: 'Studios', href: '#listings', description: 'Compact city living' },
    ],
  },
  {
    title: 'Commercial',
    items: [
      { label: 'Offices', href: '#listings', description: 'CBD & business districts' },
      { label: 'Retail & Commercial', href: '#listings', description: 'Shops, warehouses & mixed-use' },
    ],
  },
  {
    title: 'By Status',
    items: [
      { label: 'For Sale', href: '#listings', description: 'Own your next property' },
      { label: 'For Rent', href: '#listings', description: 'Monthly & long-term leases' },
      { label: 'Off Plan', href: '#listings', description: 'Pre-construction investments' },
      { label: 'Browse All Types', href: '#properties', description: 'Explore by property type' },
    ],
  },
];

export const PAGES_NAV_GROUPS: NavLinkGroup[] = [
  {
    title: 'Company',
    items: [
      { label: 'About Us', href: '#expertise', description: 'Our story & expertise' },
      { label: 'Our Agents', href: '#agents', description: 'Meet the team' },
      { label: 'Contact', href: '#contact', description: 'Get in touch' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog & Guides', href: '/blog', description: 'Market insights & tips' },
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
