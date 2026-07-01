export const routes = {
  home: '/',
  listings: '/#listings',
  blog: '/blog',
  blogArticle: (slug: string) => `/blog/${slug}`,
  property: (slug: string) => `/properties/${slug}`,
  agent: (slug: string) => `/agents/${slug}`,
  compare: '/compare',
  wishlist: '/wishlist',
  login: '/login',
  register: '/register',
  submitProperty: '/submit-property',
  dashboard: '/dashboard',
} as const;
