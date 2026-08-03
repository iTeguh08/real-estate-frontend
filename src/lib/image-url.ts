/**
 * Soft-resized Unsplash preview for cards / thumbs / tiles.
 * Floor keeps previews sharp (not aggressive 180–420 under-requests).
 * No-op for hosts that don't support width query params (e.g. /api/images).
 */
export function sizedImage(url: string, displayWidth: number): string {
  if (!url) return url;

  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (!/(^|\.)unsplash\.com$/i.test(u.hostname)) return url;

    const dpr =
      typeof window !== 'undefined'
        ? Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)))
        : 1;
    // Soft floor: tiny thumbs ≥640, cover cards ≥800. Cap for decode cost.
    const floor = displayWidth < 200 ? 640 : 800;
    const width = Math.min(2400, Math.max(floor, Math.round(displayWidth * dpr)));
    u.searchParams.set('w', String(width));
    u.searchParams.set('q', '80');
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Full-resolution Unsplash (or pass-through) for modal / detail / lightbox.
 * Strips downscale params; local /api/images and /storage URLs are unchanged.
 */
export function originalImage(url: string): string {
  if (!url) return url;

  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (!/(^|\.)unsplash\.com$/i.test(u.hostname)) return url;

    u.searchParams.delete('w');
    u.searchParams.delete('h');
    u.searchParams.delete('q');
    u.searchParams.delete('fit');
    u.searchParams.set('auto', 'format');
    return u.toString();
  } catch {
    return url;
  }
}

/** Preview URL for property cover — prefers API `imageUrl`, soft-sizes Unsplash mocks. */
export function propertyPreviewUrl(
  property: { imageUrl: string },
  displayWidth = 800,
): string {
  return sizedImage(property.imageUrl, displayWidth);
}

/** Original URL for enlarge surfaces — prefers API `imageUrlOriginal`. */
export function propertyOriginalUrl(property: {
  imageUrl: string;
  imageUrlOriginal?: string | null;
}): string {
  return property.imageUrlOriginal || originalImage(property.imageUrl);
}

/** Gallery tile preview. */
export function galleryPreviewUrl(
  image: { url: string },
  displayWidth = 800,
): string {
  return sizedImage(image.url, displayWidth);
}

/** Gallery lightbox / enlarge. */
export function galleryOriginalUrl(image: {
  url: string;
  originalUrl?: string | null;
}): string {
  return image.originalUrl || originalImage(image.url);
}

/** Layout media: enlarge prefers *Original companion field. */
export function mediaOriginalUrl(
  previewUrl: string | null | undefined,
  originalUrl?: string | null,
): string {
  if (originalUrl) return originalUrl;
  if (!previewUrl) return '';
  return originalImage(previewUrl);
}
