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
  // Mobile: full viewport. md+: landscape 16:10, height capped ~85vh.
  const desktopW =
    size === 'gallery'
      ? 'md:w-[min(96vw,1200px,calc(85vh*1.6))]'
      : 'md:w-[min(96vw,1280px,calc(85vh*1.6))]';
  const frameClass = cnMobileFrame(desktopW);

  if (size === 'gallery') {
    return {
      boxW: GALLERY_LIGHTBOX_WIDTH,
      boxH: GALLERY_LIGHTBOX_HEIGHT,
      frameClass,
    };
  }
  return {
    boxW: MODAL_LIGHTBOX_WIDTH,
    boxH: MODAL_LIGHTBOX_HEIGHT,
    frameClass,
  };
}

function cnMobileFrame(desktopW: string) {
  return `h-[100dvh] w-screen max-w-none rounded-none md:aspect-[16/10] md:h-auto md:max-w-none md:rounded-hz ${desktopW}`;
}
