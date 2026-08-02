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
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (!/(^|\.)unsplash\.com$/i.test(u.hostname)) return url;

    const dpr =
      typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 2 : 1;
    // Cap remote request — above ~1600px is rarely worth the decode cost for this UI.
    const width = Math.min(1600, Math.max(64, Math.round(displayWidth * dpr)));
    u.searchParams.set('w', String(width));
    u.searchParams.set('q', '70');
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}
