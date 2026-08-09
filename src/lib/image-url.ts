/**
 * Product image URL policy (1B + 2C):
 * - Preview (cards, thumbs, tiles, mid-page, homepage hero): CSS wrapper width + buffer, no DPR.
 * - Enlarge (lightbox, quick-view modal): full original (/storage or unsized Unsplash).
 * - Property detail heroes (full-bleed / villa hero): full original.
 * Decorative SectionAtmosphere / public/bg are out of scope.
 */

export interface SizedImageOptions {
  /** Hard cap on requested pixel width. */
  maxWidth?: number;
  /** JPEG/WebP quality — default 100. */
  quality?: number;
}

/** Mid of the 50–100px “slightly larger than wrapper” buffer. */
export const PREVIEW_BUFFER_PX = 75;

/**
 * CSS wrapper width → request width (no devicePixelRatio).
 * Example: wrapper 300 → ~375.
 */
export function previewRequestWidth(displayWidth: number, maxWidth?: number): number {
  const w = Math.round(displayWidth + PREVIEW_BUFFER_PX);
  return Math.min(maxWidth ?? 2400, Math.max(192, w));
}

function isUnsplashHost(hostname: string): boolean {
  return /(^|\.)unsplash\.com$/i.test(hostname);
}

/** Backend on-demand resize endpoint — /api/images/{path}?w=&q= */
function isApiImagesUrl(url: URL): boolean {
  return /\/api\/images\//.test(url.pathname);
}

function applyWidthToApiImages(url: URL, width: number, quality: number): string {
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality));
  return url.toString();
}

/**
 * Soft-resized preview for cards / thumbs / tiles / mid-page / homepage hero.
 * Pass approximate CSS wrapper width — buffer is applied here (no DPR).
 * Supports Unsplash URLs and backend `/api/images/` resize endpoint.
 */
export function sizedImage(
  url: string,
  displayWidth: number,
  options?: SizedImageOptions
): string {
  if (!url) return url;

  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const quality = options?.quality ?? 100;
    const width = previewRequestWidth(displayWidth, options?.maxWidth);

    if (isApiImagesUrl(u)) {
      return applyWidthToApiImages(u, width, quality);
    }

    if (!isUnsplashHost(u.hostname)) return url;

    u.searchParams.set('w', String(width));
    u.searchParams.set('q', String(quality));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Full-resolution source for modal / detail hero / lightbox.
 * Strips downscale params from Unsplash; rewrites /api/images → /storage.
 */
export function originalImage(url: string): string {
  if (!url) return url;

  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

    if (isApiImagesUrl(u)) {
      return url.replace(/\/api\/images\//, '/storage/').replace(/\?.*$/, '');
    }

    if (!isUnsplashHost(u.hostname)) return url;

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

/** Grid card cover — CSS column ~300–340px at lg (buffer applied in sizedImage). */
export const GRID_CARD_PREVIEW_WIDTH = 320;

/** Homepage hero panel — CSS estimate for full-bleed right column (buffer + optional maxWidth). */
export const HERO_PREVIEW_WIDTH = 960;

/** Half-column mid-page media (~400–560 CSS px). */
export const MID_PAGE_MEDIA_WIDTH = 560;

/** Wide mid-page / landscape tile (~720 CSS px). */
export const MID_PAGE_WIDE_WIDTH = 720;

/** Portrait editorial column (~320 CSS px). */
export const MID_PAGE_PORTRAIT_WIDTH = 320;

/** Preview URL for property cover — prefers API `imageUrl`, soft-sizes previews. */
export function propertyPreviewUrl(
  property: { imageUrl: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  return sizedImage(property.imageUrl, displayWidth);
}

/** Original URL for enlarge / detail-hero surfaces — prefers API `imageUrlOriginal`. */
export function propertyOriginalUrl(property: {
  imageUrl: string;
  imageUrlOriginal?: string | null;
}): string {
  return property.imageUrlOriginal || originalImage(property.imageUrl);
}

/** Gallery tile preview. */
export function galleryPreviewUrl(
  image: { url: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  return sizedImage(image.url, displayWidth);
}

/** Gallery lightbox — always full original. */
export function galleryLightboxUrl(image: {
  url: string;
  originalUrl?: string | null;
}): string {
  return galleryOriginalUrl(image);
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

/**
 * Soft-resized layout/preview media for mid-page tiles (not enlarge surfaces).
 * Prefer the API preview URL; size to CSS wrapper width.
 */
export function mediaPreviewUrl(
  previewUrl: string | null | undefined,
  displayWidth: number,
  fallbackPreviewUrl?: string | null,
): string {
  const source = previewUrl || fallbackPreviewUrl;
  if (!source) return '';
  return sizedImage(source, displayWidth);
}
