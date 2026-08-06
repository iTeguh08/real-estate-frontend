export interface SizedImageOptions {
  /** Hard cap on requested pixel width (Unsplash `w` param). */
  maxWidth?: number;
  /** JPEG/WebP quality — default 80 (visually lossless for web). */
  quality?: number;
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
 * Soft-resized preview for cards / thumbs / tiles.
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

    if (isApiImagesUrl(u)) {
      const dpr =
        typeof window !== 'undefined'
          ? Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)))
          : 1;
      let width = Math.min(2400, Math.max(192, Math.round(displayWidth * dpr)));
      if (options?.maxWidth != null) {
        width = Math.min(width, options.maxWidth);
      }
      return applyWidthToApiImages(u, width, options?.quality ?? 80);
    }

    if (!isUnsplashHost(u.hostname)) return url;

    const dpr =
      typeof window !== 'undefined'
        ? Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)))
        : 1;

    const floor =
      displayWidth < 96
        ? 192
        : displayWidth < 160
          ? 320
          : displayWidth < 280
            ? 480
            : displayWidth < 520
              ? 640
              : 800;

    const quality = options?.quality ?? 80;
    let width = Math.min(2400, Math.max(floor, Math.round(displayWidth * dpr)));
    if (options?.maxWidth != null) {
      width = Math.min(width, options.maxWidth);
    }

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
 * Full-resolution source for modal / detail / lightbox.
 * Strips downscale params from Unsplash; passes through /api/images originals via /storage.
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

/** Grid card cover — ~300–340px column at lg; 380 keeps 2× DPR sharp without 1600px fetch. */
export const GRID_CARD_PREVIEW_WIDTH = 380;

/** Hero panel — capped at 1560px; visually identical at full-bleed hero sizes. */
export const HERO_PREVIEW_WIDTH = 960;

/** Preview URL for property cover — prefers API `imageUrl`, soft-sizes previews. */
export function propertyPreviewUrl(
  property: { imageUrl: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
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
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  return sizedImage(image.url, displayWidth);
}

/** Gallery lightbox — prefer CMS original; otherwise high-res API/Unsplash preview (not /storage rewrite). */
export function galleryLightboxUrl(image: {
  url: string;
  originalUrl?: string | null;
}): string {
  if (image.originalUrl) return image.originalUrl;
  return sizedImage(image.url, 1400, { maxWidth: 1920, quality: 85 });
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
