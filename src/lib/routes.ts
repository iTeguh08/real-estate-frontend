/**
 * Canonical path map shared by Vite (`react-router-dom`) and Next.js Pages Router.
 * Values are href strings — do not import `next/link` or `react-router` here.
 */
export const routes = {
  home: '/',
  listings: '/listings',
  news: '/news',
  newsArticle: (slug: string) => `/news/${slug}`,
  blog: '/blog',
  blogArticle: (slug: string) => `/blog/${slug}`,
  property: (slug: string) => `/properties/${slug}`,
  propertyById: (id: string) => `/property/${id}`,
  agent: (slug: string) => `/agents/${slug}`,
  agents: '/agents',
  compare: '/compare',
  wishlist: '/wishlist',
  login: '/login',
  register: '/register',
  submitProperty: '/submit-property',
  dashboard: '/dashboard',
  myProperty: '/dashboard/my-property',
  myPropertyDetail: (id: string | number) => `/dashboard/my-property/${id}`,
  /** @deprecated use myProperty */
  myListings: '/dashboard/my-property',
  /** @deprecated use myPropertyDetail */
  myListingEdit: (id: string | number) => `/dashboard/my-property/${id}`,
  about: '/about',
  aboutServices: '/about#services',
  contact: '/contact',
  privacy: '/privacy',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

/** Build a path + query string that both `Link to` and `next/link href` accept. */
export function routeHref(
  path: string,
  query?: Record<string, string | number | undefined | null>,
): string {
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
