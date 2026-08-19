export type TransitionKind =
  | 'home'
  | 'listings'
  | 'property'
  | 'agents'
  | 'blog'
  | 'news'
  | 'blog-article'
  | 'news-article'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'agent-profile'
  | 'auth'
  | 'dashboard'
  | 'submit-property'
  | 'edit-listing'
  | 'my-property'
  | 'compare'
  | 'wishlist'
  | 'generic';

export function resolveTransitionKind(url: string): TransitionKind {
  const path = url.split('?')[0] ?? url;
  if (path === '/' || path === '') return 'home';
  if (/^\/properties\/[^/]+/.test(path) || /^\/property\/[^/]+/.test(path)) return 'property';
  if (path === '/listings' || path.startsWith('/listings/')) return 'listings';
  if (path === '/agents' || path.startsWith('/agents/')) {
    return path === '/agents' ? 'agents' : 'agent-profile';
  }
  if (path === '/blog') return 'blog';
  if (path.startsWith('/blog/')) return 'blog-article';
  if (path === '/news') return 'news';
  if (path.startsWith('/news/')) return 'news-article';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/privacy') return 'privacy';
  if (path === '/login' || path === '/register') return 'auth';
  if (path === '/dashboard') return 'dashboard';
  if (path === '/submit-property') return 'submit-property';
  if (/^\/dashboard\/my-property\/[^/]+/.test(path)) return 'edit-listing';
  if (
    path === '/dashboard/my-property' ||
    path === '/dashboard/my-listings' ||
    path.startsWith('/dashboard/my-listings/')
  ) {
    return 'my-property';
  }
  if (path === '/compare') return 'compare';
  if (path === '/wishlist') return 'wishlist';
  return 'generic';
}

export function transitionKindHasSpinner(kind: TransitionKind): boolean {
  return kind !== 'generic';
}
