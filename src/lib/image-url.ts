/**
 * Product image URL policy (Plan B):
 * - Backend stores static thumb (~450) / medium (~800) / large (~2000) max-edge WebP.
 * - Frontend picks a URL and uses CSS object-cover — no /api/images on-the-fly.
 * - Unsplash remote fallbacks may still use query params (their CDN, not our VPS).
 * Decorative SectionAtmosphere / public/bg are out of scope.
 */

export interface SizedImageOptions {
  /** Hard cap on requested pixel width (Unsplash only). */
  maxWidth?: number;
  /** JPEG/WebP quality — default 100 (Unsplash only). */
  quality?: number;
}

/** @deprecated Kept for call-site compatibility; no longer used for local product images. */
export const PREVIEW_BUFFER_PX = 75;

/** @deprecated Kept for call-site compatibility; no longer used for local product images. */
export const PREVIEW_OVERFETCH_MAX_PX = 150;

/**
 * CSS wrapper width → request width (Unsplash only).
 */
export function previewRequestWidth(displayWidth: number, maxWidth?: number): number {
  const w = Math.round(displayWidth + PREVIEW_BUFFER_PX);
  return Math.min(maxWidth ?? 2400, Math.max(192, w));
}

export function coverDisplaySize(
  boxWidth: number,
  boxHeight: number,
  sourceAspect?: number | null,
): number {
  const w = Math.max(1, boxWidth);
  const h = Math.max(1, boxHeight);
  if (sourceAspect && sourceAspect > 0) {
    return Math.max(w, h * sourceAspect);
  }
  return Math.max(w, h);
}

export function coverRequestWidth(
  boxWidth: number,
  boxHeight: number,
  sourceAspect?: number | null,
  maxWidth?: number,
): number {
  const edge = Math.max(boxWidth, boxHeight);
  const ideal = coverDisplaySize(boxWidth, boxHeight, sourceAspect) + PREVIEW_BUFFER_PX;
  const capped = Math.min(ideal, edge + PREVIEW_OVERFETCH_MAX_PX);
  return Math.min(maxWidth ?? 2400, Math.max(192, Math.round(capped)));
}

export function quantizeBoxEdge(px: number, step = 16): number {
  return Math.max(step, Math.round(px / step) * step);
}

function isUnsplashHost(hostname: string): boolean {
  return /(^|\.)unsplash\.com$/i.test(hostname);
}

function isApiImagesUrl(url: URL): boolean {
  return /\/api\/images\//.test(url.pathname);
}

/** Rewrite legacy /api/images/...?... → /storage/... (static file). */
function toStaticStorageUrl(url: string): string {
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (isApiImagesUrl(u)) {
      return url.replace(/\/api\/images\//, '/storage/').replace(/\?.*$/, '');
    }
    return url;
  } catch {
    return url;
  }
}

type ProductVariant = 'thumb' | 'medium' | 'large';

/**
 * Pick a static backend variant for /storage/ product URLs.
 * thumb (~450) | medium (~800) | large (~2000). Always rewrite — API may hand any sibling.
 */
export function productVariantUrl(url: string, variant: ProductVariant): string {
  if (!url) return url;

  const staticUrl = toStaticStorageUrl(url);

  try {
    const u = new URL(staticUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

    if (!u.pathname.includes('/storage/')) {
      if (isUnsplashHost(u.hostname)) {
        const edge =
          variant === 'thumb' ? 450 : variant === 'medium' ? 800 : 2000;
        return withImageWidth(staticUrl, edge);
      }

      return staticUrl;
    }

    const largeUrl = staticUrl.replace(/\.(thumb|medium)\.webp(?=($|\?))/i, '.webp');
    if (variant === 'large') return largeUrl;
    if (variant === 'medium') {
      return largeUrl.replace(/\.webp(?=($|\?))/i, '.medium.webp');
    }
    return largeUrl.replace(/\.webp(?=($|\?))/i, '.thumb.webp');
  } catch {
    return url;
  }
}

/** Listing / card / hero strip — ~450px. */
export function productThumbUrl(url: string | null | undefined): string {
  if (!url) return '';
  return productVariantUrl(url, 'thumb');
}

/** Mid-size gallery / dialog media / narrow viewport hero — ~800px. */
export function productMediumUrl(url: string | null | undefined): string {
  if (!url) return '';
  return productVariantUrl(url, 'medium');
}

/** Wide viewport hero / lightbox — ~2000px. */
export function productLargeUrl(url: string | null | undefined): string {
  if (!url) return '';
  return productVariantUrl(url, 'large');
}

/** Tailwind `lg` — phone + narrow iPad stay medium; wide iPad / desktop get large. */
export const PRODUCT_HERO_LARGE_MEDIA = '(min-width: 1024px)';

/** Inverse of {@link PRODUCT_HERO_LARGE_MEDIA} — for LCP preload on narrow viewports. */
export const PRODUCT_HERO_NARROW_MEDIA = '(max-width: 1023px)';

/** Gallery bento tile — thumb for tiny slots; medium for the rest (never large/original). */
export function galleryTileMediaUrl(
  url: string | null | undefined,
  coverEstimate: { width: number; height: number },
  _originalUrl?: string | null,
): string {
  if (!url) return '';
  void _originalUrl;
  const displayEdge = Math.max(coverEstimate.width, coverEstimate.height);
  if (displayEdge <= 260) return productThumbUrl(url);
  return productMediumUrl(url);
}

/**
 * @deprecated No local on-the-fly cover. Returns static URL (storage) or Unsplash crop params.
 */
export function withCoverBox(
  url: string,
  boxWidth: number,
  boxHeight: number,
  options?: Pick<SizedImageOptions, 'quality'> & { maxEdge?: number },
): string {
  if (!url) return url;
  void boxWidth;
  void boxHeight;
  void options;

  try {
    const staticUrl = toStaticStorageUrl(url);
    const u = new URL(staticUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (!isUnsplashHost(u.hostname)) return staticUrl;

    const quality = options?.quality ?? 100;
    const edge = Math.max(1, Math.round(options?.maxEdge ?? Math.max(boxWidth, boxHeight)));
    u.searchParams.set('w', String(edge));
    u.searchParams.delete('h');
    u.searchParams.set('q', String(quality));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

/** Width hint for Unsplash only; local product URLs returned as static storage. */
export function withImageWidth(
  url: string,
  width: number,
  options?: Pick<SizedImageOptions, 'quality'>,
): string {
  if (!url) return url;
  try {
    const staticUrl = toStaticStorageUrl(url);
    const u = new URL(staticUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const quality = options?.quality ?? 100;
    const w = Math.min(2400, Math.max(192, Math.round(width)));

    if (!isUnsplashHost(u.hostname)) return staticUrl;

    u.searchParams.set('w', String(w));
    u.searchParams.delete('h');
    u.searchParams.set('q', String(quality));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Soft size hint — local product URLs stay static; Unsplash may use w=.
 */
export function sizedImage(
  url: string,
  displayWidth: number,
  options?: SizedImageOptions
): string {
  if (!url) return url;

  try {
    const staticUrl = toStaticStorageUrl(url);
    const u = new URL(staticUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const quality = options?.quality ?? 100;
    const width = previewRequestWidth(displayWidth, options?.maxWidth);

    if (!isUnsplashHost(u.hostname)) return staticUrl;

    u.searchParams.set('w', String(width));
    u.searchParams.delete('h');
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

/**
 * Layout 1 Interior & Lifestyle collage — left column ~55% of section-container;
 * vertical frame is `w-[62%]` (~400–480 CSS px on desktop).
 */
export const SHOWCASE_VERTICAL_WIDTH = 480;

/** Collage overlay frame — `w-[52%]` of the same left column. */
export const SHOWCASE_OVERLAY_WIDTH = 420;

/** Property quick-view dialog cover — `sm:max-w-lg` ≈ 512px CSS. */
export const MODAL_COVER_WIDTH = 512;

/** Property quick-view / gallery lightbox frame (CSS max) + request box. */
export const MODAL_LIGHTBOX_WIDTH = 1280;
export const MODAL_LIGHTBOX_HEIGHT = 800;
export const GALLERY_LIGHTBOX_WIDTH = 1200;
export const GALLERY_LIGHTBOX_HEIGHT = 780;
/** Long-edge cap for lightbox cover requests (avoid soft upscales). */
export const LIGHTBOX_COVER_MAX_EDGE = 1920;

/**
 * Clean media base — prefer static /storage (no /api/images on-the-fly).
 */
export function resizableMediaBase(url: string): string {
  if (!url) return url;

  try {
    const u = new URL(
      url,
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
    );

    if (isApiImagesUrl(u) || u.pathname.includes('/storage/')) {
      return toStaticStorageUrl(url);
    }

    if (isUnsplashHost(u.hostname)) {
      return originalImage(url);
    }

    return url;
  } catch {
    return url;
  }
}

/**
 * Base URL for lightbox maximize — prefers full-res field, always cleaned.
 */
export function lightboxMediaUrl(
  previewUrl: string,
  originalUrl?: string | null,
): string {
  return resizableMediaBase(originalUrl || previewUrl);
}

/**
 * Lightbox cover URL — medium (~800) on narrow viewports, large (~2000) from lg up.
 * Matches {@link PRODUCT_HERO_NARROW_MEDIA} / {@link PRODUCT_HERO_LARGE_MEDIA}.
 */
export function lightboxCoverUrl(
  previewUrl: string,
  originalUrl: string | null | undefined,
  size: 'modal' | 'gallery' = 'modal',
): string {
  void size;
  const base = originalUrl || previewUrl;
  if (typeof window === 'undefined') return productMediumUrl(base);
  if (window.matchMedia(PRODUCT_HERO_NARROW_MEDIA).matches) {
    return productMediumUrl(base);
  }
  return productLargeUrl(base);
}

/** Preview URL for property cover — card grids use thumb variant. */
export function propertyPreviewUrl(
  property: { imageUrl: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  if (displayWidth <= 480) return productThumbUrl(property.imageUrl);
  if (displayWidth <= 1200) return productMediumUrl(property.imageUrl);
  return productLargeUrl(property.imageUrl);
}

/**
 * @deprecated Display must not use originals — prefer fitCover / withCoverBox.
 * Kept for offline demo data helpers only.
 */
export function propertyOriginalUrl(property: {
  imageUrl: string;
  imageUrlOriginal?: string | null;
}): string {
  return property.imageUrlOriginal || originalImage(property.imageUrl);
}

/** Gallery tile preview — thumb for small slots, medium for bento hero/landscape. */
export function galleryPreviewUrl(
  image: { url: string; originalUrl?: string | null },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
  displayHeight?: number,
): string {
  return galleryTileMediaUrl(image.url, {
    width: displayWidth,
    height: displayHeight ?? displayWidth,
  }, image.originalUrl);
}

/** Gallery lightbox — sized to lightbox frame (never original). */
export function galleryLightboxUrl(image: { url: string; originalUrl?: string | null }): string {
  return lightboxCoverUrl(image.url, image.originalUrl, 'gallery');
}

/**
 * @deprecated Prefer galleryLightboxUrl / fitCover — no display originals.
 */
export function galleryOriginalUrl(image: {
  url: string;
  originalUrl?: string | null;
}): string {
  return image.originalUrl || originalImage(image.url);
}

/**
 * @deprecated Prefer mediaPreviewUrl / fitCover — no display originals.
 */
export function mediaOriginalUrl(
  previewUrl: string | null | undefined,
  originalUrl?: string | null,
): string {
  if (originalUrl) return originalUrl;
  if (!previewUrl) return '';
  return originalImage(previewUrl);
}

/**
 * Soft-resized layout/preview media (width-only fallback).
 * Prefer MediaImage fitCover for object-cover frames.
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
