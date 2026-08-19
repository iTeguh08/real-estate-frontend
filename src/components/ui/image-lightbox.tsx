import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { lightboxCoverUrl } from '@/lib/image-url';
import { lightboxFrame, type LightboxSize } from '@/lib/lightbox-preload';
import { cn } from '@/lib/utils';

/** Original maximize close chip — do not restyle. */
const closeButtonClassName =
  'absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75';

export const LightboxCloseButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function LightboxCloseButton({ 'aria-label': ariaLabel = 'Close', className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      className={cn(closeButtonClassName, className)}
      {...props}
    >
      <X size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
});

interface LightboxImageProps {
  src: string;
  alt: string;
}

/** Match MediaImage shimmer floor so preload does not skip the skeleton. */
const LIGHTBOX_MIN_SKELETON_MS = 450;

/**
 * Dedicated lightbox image — never uses fitCover / ResizeObserver.
 * `src` must already be the locked high-res cover URL from lightboxCoverUrl().
 */
function LightboxImage({ src, alt }: LightboxImageProps) {
  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const tokenRef = useRef(0);

  // Restart the reveal cycle for a new source during render, so a stale "ready"
  // frame of the previous image never shows.
  const [renderedSrc, setRenderedSrc] = useState(src);
  if (renderedSrc !== src) {
    setRenderedSrc(src);
    setImageReady(false);
    setMinElapsed(false);
  }

  useEffect(() => {
    const token = ++tokenRef.current;

    const timer = window.setTimeout(() => {
      if (tokenRef.current === token) setMinElapsed(true);
    }, LIGHTBOX_MIN_SKELETON_MS);

    if (!src) {
      return () => window.clearTimeout(timer);
    }

    const probe = new Image();
    probe.decoding = 'async';
    probe.onload = () => {
      if (tokenRef.current === token) setImageReady(true);
    };
    probe.onerror = () => {
      if (tokenRef.current === token) setImageReady(true);
    };
    probe.src = src;

    return () => {
      window.clearTimeout(timer);
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  const handleLoad = useCallback(() => setImageReady(true), []);
  const handleError = useCallback(() => setImageReady(true), []);

  /** Cache hits can be decoded before React attaches the load handler. */
  const bindImgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setImageReady(true);
  }, []);

  const revealed = imageReady && minElapsed;

  return (
    <div className="absolute -inset-[1px] overflow-hidden">
      {!revealed ? (
        <Skeleton className="absolute inset-0 z-0 h-full w-full rounded-none" delayMs={0} />
      ) : null}
      {src ? (
        <img
          ref={bindImgRef}
          src={src}
          alt={alt}
          decoding="async"
          fetchPriority="high"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'absolute inset-0 z-[1] block h-full w-full object-cover transition-opacity duration-300',
            revealed ? 'opacity-100' : 'opacity-0'
          )}
        />
      ) : null}
    </div>
  );
}

interface ImageLightboxPanelProps {
  previewUrl: string;
  originalUrl?: string | null;
  alt: string;
  size?: LightboxSize;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Maximize / gallery lightbox panel — fixed large frame + locked cover src.
 */
export function ImageLightboxPanel({
  previewUrl,
  originalUrl,
  alt,
  size = 'modal',
  className,
  children,
}: ImageLightboxPanelProps) {
  const { frameClass } = lightboxFrame(size);

  const coverSrc = useMemo(
    () => lightboxCoverUrl(previewUrl, originalUrl, size),
    [previewUrl, originalUrl, size]
  );

  return (
    <figure
      className={cn(
        'relative m-0 shrink-0 overflow-hidden rounded-hz bg-hz-sunken/30',
        frameClass,
        className
      )}
    >
      <LightboxImage key={coverSrc} src={coverSrc} alt={alt} />
      {children}
    </figure>
  );
}

interface ImageLightboxOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  'aria-label': string;
  children: React.ReactNode;
}

/** Fullscreen lightbox host backed by Radix Dialog to avoid focus-trap conflicts with other modals. */
export function ImageLightboxOverlay({
  open,
  onOpenChange,
  'aria-label': ariaLabel,
  children,
}: ImageLightboxOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="block w-auto max-w-none gap-0 overflow-visible border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-none"
        overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-sm z-[300]"
        style={{ zIndex: 310 }} // Dialog content z-index
        onInteractOutside={(e) => {
          e.preventDefault();
          onOpenChange(false);
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          onOpenChange(false);
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{ariaLabel}</DialogTitle>
          <DialogDescription>Expanded view</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
