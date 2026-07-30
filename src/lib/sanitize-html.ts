import isomorphicDomPurify from 'isomorphic-dompurify';

/**
 * Sanitize CMS/admin HTML before rendering (defense-in-depth vs stored XSS).
 */
export function sanitizeHtml(html: string): string {
  return isomorphicDomPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}
