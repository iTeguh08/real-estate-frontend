import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { lightboxCoverUrl, PRODUCT_HERO_NARROW_MEDIA } from '@/lib/image-url';
import { lightboxFrame, type LightboxSize } from '@/lib/lightbox-preload';
import { cn } from '@/lib/utils';

function subscribeNarrowViewport(onStoreChange: () => void) {
  const mq = window.matchMedia(PRODUCT_HERO_NARROW_MEDIA);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getNarrowViewport() {
  return window.matchMedia(PRODUCT_HERO_NARROW_MEDIA).matches;
}

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

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const DOUBLE_TAP_MS = 280;

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function clampPan(scale: number, x: number, y: number, w: number, h: number) {
  if (scale <= 1) return { x: 0, y: 0 };
  const maxX = ((scale - 1) * w) / 2;
  const maxY = ((scale - 1) * h) / 2;
  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
}

/**
 * Mobile gallery gestures: pinch zoom + one-finger pan when zoomed; double-tap 1↔2.
 * Desktop stays contain/fit (no forced portrait crop).
 */
function LightboxZoomSurface({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch0 = useRef<{ dist: number; scale: number } | null>(null);
  const pan0 = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const lastTap = useRef(0);

  const apply = useCallback((next: { scale: number; x: number; y: number }) => {
    const el = viewportRef.current;
    const w = el?.clientWidth ?? 0;
    const h = el?.clientHeight ?? 0;
    const scale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next.scale));
    const pan = clampPan(scale, next.x, next.y, w, h);
    setTransform({ scale, ...pan });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        const [a, b] = [...pointers.current.values()];
        pinch0.current = { dist: dist(a, b), scale: transformRef.current.scale };
        pan0.current = null;
        return;
      }

      if (pointers.current.size === 1 && transformRef.current.scale > 1) {
        pan0.current = {
          x: e.clientX,
          y: e.clientY,
          tx: transformRef.current.x,
          ty: transformRef.current.y,
        };
      }
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2 && pinch0.current) {
        const [a, b] = [...pointers.current.values()];
        const d = dist(a, b);
        if (pinch0.current.dist < 1) return;
        const nextScale = (pinch0.current.scale * d) / pinch0.current.dist;
        apply({
          scale: nextScale,
          x: transformRef.current.x,
          y: transformRef.current.y,
        });
        return;
      }

      if (pointers.current.size === 1 && pan0.current && transformRef.current.scale > 1) {
        const dx = e.clientX - pan0.current.x;
        const dy = e.clientY - pan0.current.y;
        apply({
          scale: transformRef.current.scale,
          x: pan0.current.tx + dx,
          y: pan0.current.ty + dy,
        });
      }
    },
    [apply],
  );

  const endPointer = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch0.current = null;
    if (pointers.current.size === 0) pan0.current = null;
    if (pointers.current.size === 1 && transformRef.current.scale > 1) {
      const only = [...pointers.current.entries()][0];
      if (only) {
        pan0.current = {
          x: only[1].x,
          y: only[1].y,
          tx: transformRef.current.x,
          ty: transformRef.current.y,
        };
      }
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const wasSingle = pointers.current.size === 1;
      endPointer(e);

      if (!wasSingle || e.pointerType === 'mouse') return;
      if (pinch0.current) return;

      const now = Date.now();
      if (now - lastTap.current < DOUBLE_TAP_MS) {
        lastTap.current = 0;
        const cur = transformRef.current;
        if (cur.scale > 1.05) apply({ scale: 1, x: 0, y: 0 });
        else apply({ scale: 2, x: 0, y: 0 });
      } else {
        lastTap.current = now;
      }
    },
    [apply, endPointer],
  );

  // ZoomSurface remounts with LightboxImage via key={coverSrc} upstream — no reset effect.

  const zoomed = transform.scale > 1.01;

  return (
    <div
      ref={viewportRef}
      className={cn(
        'absolute inset-0 touch-none select-none overflow-hidden',
        zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={endPointer}
      onDoubleClick={(e) => {
        e.preventDefault();
        const cur = transformRef.current;
        if (cur.scale > 1.05) apply({ scale: 1, x: 0, y: 0 });
        else apply({ scale: 2, x: 0, y: 0 });
      }}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Dedicated lightbox image — never uses fitCover / ResizeObserver.
 * `src` must already be the locked high-res cover URL from lightboxCoverUrl().
 * Uses object-contain so landscape photos are not cropped into a portrait frame.
 */
function LightboxImage({ src, alt }: LightboxImageProps) {
  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const tokenRef = useRef(0);

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

  const bindImgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setImageReady(true);
  }, []);

  const revealed = imageReady && minElapsed;

  return (
    <LightboxZoomSurface>
      <div className="absolute inset-0 overflow-hidden">
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
            draggable={false}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'absolute inset-0 z-[1] block h-full w-full object-contain transition-opacity duration-300',
              revealed ? 'opacity-100' : 'opacity-0'
            )}
          />
        ) : null}
      </div>
    </LightboxZoomSurface>
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
 * Maximize / gallery lightbox panel — landscape frame + contain + mobile zoom/pan.
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
  const isNarrow = useSyncExternalStore(
    subscribeNarrowViewport,
    getNarrowViewport,
    () => true,
  );

  const coverSrc = useMemo(
    () => lightboxCoverUrl(previewUrl, originalUrl, size),
    // isNarrow forces re-resolve when crossing lg (lightboxCoverUrl reads matchMedia).
    [previewUrl, originalUrl, size, isNarrow],
  );

  return (
    <figure
      className={cn(
        'relative m-0 shrink-0 overflow-hidden bg-black/40',
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
        style={{ zIndex: 310 }}
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
