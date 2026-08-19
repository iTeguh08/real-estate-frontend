import {
  GALLERY_LIGHTBOX_HEIGHT,
  GALLERY_LIGHTBOX_WIDTH,
  lightboxCoverUrl,
  MODAL_LIGHTBOX_HEIGHT,
  MODAL_LIGHTBOX_WIDTH,
} from '@/lib/image-url';

export type LightboxSize = 'modal' | 'gallery';

/** Preload the locked cover URL before the overlay paints. */
export function preloadLightboxCover(
  previewUrl: string,
  originalUrl: string | null | undefined,
  size: LightboxSize = 'modal',
): string {
  const src = lightboxCoverUrl(previewUrl, originalUrl, size);
  if (typeof window !== 'undefined' && src) {
    const probe = new Image();
    probe.decoding = 'async';
    probe.src = src;
  }
  return src;
}

export function lightboxFrame(size: LightboxSize) {
  if (size === 'gallery') {
    return {
      boxW: GALLERY_LIGHTBOX_WIDTH,
      boxH: GALLERY_LIGHTBOX_HEIGHT,
      frameClass: 'h-[min(90vh,780px)] w-[min(96vw,1200px)]',
    };
  }
  return {
    boxW: MODAL_LIGHTBOX_WIDTH,
    boxH: MODAL_LIGHTBOX_HEIGHT,
    frameClass: 'h-[min(90vh,800px)] w-[min(96vw,1280px)]',
  };
}
