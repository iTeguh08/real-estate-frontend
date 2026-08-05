/** Inject a one-shot `<link rel="preload">` for LCP / above-the-fold images. */
export function preloadImage(href: string): () => void {
  if (!href || typeof document === 'undefined') return () => {};

  const existing = document.querySelector<HTMLLinkElement>(
    `link[rel="preload"][as="image"][href="${CSS.escape(href)}"]`
  );
  if (existing) return () => {};

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  document.head.appendChild(link);

  return () => {
    link.remove();
  };
}
