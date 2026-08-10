/**
 * Product image URL policy:
 * - No display path uses original /storage max-res.
 * - Every product MediaImage goes through wrapper sizing (+ buffer, ≤150px over).
 * - object-cover / modal / lightbox: MediaImage `fitCover` → w×h crop/cover
 *   (portrait vs landscape sources still fill the box).
 * - Width-only helpers remain for tiny chips / non-cover fallbacks only.
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

/** Hard cap: each box edge request stays within edge + this many px. */
export const PREVIEW_OVERFETCH_MAX_PX = 150;

/**
 * CSS wrapper width → request width (no devicePixelRatio).
 * Example: wrapper 300 → ~375.
 */
export function previewRequestWidth(displayWidth: number, maxWidth?: number): number {
  const w = Math.round(displayWidth + PREVIEW_BUFFER_PX);
  return Math.min(maxWidth ?? 2400, Math.max(192, w));
}

/**
 * object-fit: cover — logical CSS size before buffer.
 *
 * - Known sourceAspect (width/height): max(boxW, boxH × aspect)
 * - Unknown: longer box edge
 */
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

/**
 * Final request `w` for object-cover. Applies +buffer then clamps so
 * result ≤ max(boxW, boxH) + {@link PREVIEW_OVERFETCH_MAX_PX} (never >150px over).
 */
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

/** Quantize measured box edges to limit ResizeObserver URL thrash. */
export function quantizeBoxEdge(px: number, step = 16): number {
  return Math.max(step, Math.round(px / step) * step);
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
  url.searchParams.delete('h');
  url.searchParams.delete('fit');
  return url.toString();
}

function clampBoxEdge(px: number, maxEdge?: number): number {
  const buffered = Math.round(px + PREVIEW_BUFFER_PX);
  const capped = Math.min(buffered, Math.round(px + PREVIEW_OVERFETCH_MAX_PX));
  return Math.min(maxEdge ?? 2400, Math.max(192, capped));
}

/**
 * object-fit: cover URL sized to the wrapper box (best practice).
 * Requests w×h ≈ box + buffer and crops to that aspect so landscape sources
 * still fill a portrait frame (bitmap height ≥ wrapper height).
 */
export function withCoverBox(
  url: string,
  boxWidth: number,
  boxHeight: number,
  options?: Pick<SizedImageOptions, 'quality'> & { maxEdge?: number },
): string {
  if (!url) return url;

  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const quality = options?.quality ?? 100;
    const w = clampBoxEdge(boxWidth, options?.maxEdge);
    const h = clampBoxEdge(boxHeight, options?.maxEdge);

    if (isApiImagesUrl(u)) {
      u.searchParams.set('w', String(w));
      u.searchParams.set('h', String(h));
      u.searchParams.set('q', String(quality));
      u.searchParams.set('fit', 'cover');
      return u.toString();
    }

    if (!isUnsplashHost(u.hostname)) return url;

    u.searchParams.set('w', String(w));
    u.searchParams.set('h', String(h));
    u.searchParams.set('q', String(quality));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

/** Set an exact request width (no extra buffer) on Unsplash /api/images URLs. */
export function withImageWidth(
  url: string,
  width: number,
  options?: Pick<SizedImageOptions, 'quality'>,
): string {
  if (!url) return url;
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const quality = options?.quality ?? 100;
    const w = Math.min(2400, Math.max(192, Math.round(width)));

    if (isApiImagesUrl(u)) {
      return applyWidthToApiImages(u, w, quality);
    }

    if (!isUnsplashHost(u.hostname)) return url;

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
 * Clean resizable base for cover sizing — strips soft `w`/`h` so lightbox
 * is never stuck on a card/modal thumbnail derivative.
 */
export function resizableMediaBase(url: string): string {
  if (!url) return url;

  try {
    const u = new URL(
      url,
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
    );

    if (u.pathname.includes('/storage/')) {
      const api = url.replace(/\/storage\//, '/api/images/').replace(/\?.*$/, '');
      return api;
    }

    if (isApiImagesUrl(u)) {
      u.searchParams.delete('w');
      u.searchParams.delete('h');
      u.searchParams.delete('q');
      u.searchParams.delete('fit');
      return u.toString();
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

/** Cover URL locked to the lightbox frame (no ResizeObserver downsize). */
export function lightboxCoverUrl(
  previewUrl: string,
  originalUrl: string | null | undefined,
  size: 'modal' | 'gallery' = 'modal',
): string {
  const boxW = size === 'gallery' ? GALLERY_LIGHTBOX_WIDTH : MODAL_LIGHTBOX_WIDTH;
  const boxH = size === 'gallery' ? GALLERY_LIGHTBOX_HEIGHT : MODAL_LIGHTBOX_HEIGHT;
  return withCoverBox(lightboxMediaUrl(previewUrl, originalUrl), boxW, boxH, {
    maxEdge: LIGHTBOX_COVER_MAX_EDGE,
  });
}

/** Preview URL for property cover — prefers API `imageUrl`, soft-sizes previews. */
export function propertyPreviewUrl(
  property: { imageUrl: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  return sizedImage(property.imageUrl, displayWidth);
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

/** Gallery tile preview (width-only fallback). */
export function galleryPreviewUrl(
  image: { url: string },
  displayWidth = GRID_CARD_PREVIEW_WIDTH,
): string {
  return sizedImage(image.url, displayWidth);
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
