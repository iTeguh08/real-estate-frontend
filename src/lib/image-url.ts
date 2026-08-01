/**
 * Requests a right-sized remote image so the browser doesn't decode a much
 * larger bitmap than what's actually displayed (wastes decoded-image memory
 * and adds raster cost on every scroll/composite pass).
 *
 * No-op for hosts that don't support width query params.
 */
export function sizedImage(url: string, displayWidth: number): string {
  if (!url) return url;

  try {
    const u = new URL(url, window.location.origin);
    if (!/(^|\.)unsplash\.com$/.test(u.hostname)) return url;

    const dpr = typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 2 : 1;
    u.searchParams.set('w', String(Math.round(displayWidth * dpr)));
    u.searchParams.set('q', '70');
    return u.toString();
  } catch {
    return url;
  }
}
