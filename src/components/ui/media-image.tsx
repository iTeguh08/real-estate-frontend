import { useCallback, useEffect, useRef, useState } from 'react';
import { Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * Content image with neutral shimmer until the `<img>` finishes loading.
 * Product images use static backend variants (thumb/medium/large) — no on-the-fly resize.
 * `fitCover` only means CSS object-cover fill; it does not call /api/images.
 */
const MIN_SKELETON_MS = 450;

/** Priority images reveal as soon as decoded — no artificial delay. */
const MIN_SKELETON_PRIORITY_MS = 0;

export interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Classes on the positioning wrapper (usually fill the parent aspect box). */
  wrapperClassName?: string;
  /** Extra classes on the shimmer layer. */
  skeletonClassName?: string;
  /** Stagger shimmer start (ms). */
  skeletonDelayMs?: number;
  /** Skip shimmer for decorative / tiny assets. */
  noSkeleton?: boolean;
  /**
   * Preferred product media URL (already sized by backend).
   * When set, used instead of `src`.
   */
  mediaUrl?: string;
  /**
   * Fill the wrapper with object-cover CSS. Does not resize via /api/images.
   */
  fitCover?: boolean;
  /** Secondary URL tried once when the primary source fails. */
  fallbackSrc?: string;
  /** @deprecated Unused — variants come from the backend. Kept for call-site compatibility. */
  coverEstimate?: { width: number; height: number };
  /** @deprecated Unused — variants come from the backend. Kept for call-site compatibility. */
  coverMaxWidth?: number;
}

function resolveMinSkeletonMs(
  noSkeleton: boolean,
  loading: MediaImageProps['loading'],
  fetchPriority: MediaImageProps['fetchPriority']
): number {
  if (noSkeleton) return 0;
  if (fetchPriority === 'high') return MIN_SKELETON_PRIORITY_MS;
  if (loading === 'eager') return MIN_SKELETON_PRIORITY_MS;
  return MIN_SKELETON_MS;
}

function MediaImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-2 bg-hz-sunken"
      role="img"
      aria-label={alt ? `${alt} (unavailable)` : 'Image unavailable'}
    >
      <Building2 size={28} strokeWidth={1.75} className="text-hz-muted/70" aria-hidden="true" />
    </div>
  );
}

export function MediaImage({
  className,
  wrapperClassName,
  skeletonClassName,
  skeletonDelayMs,
  noSkeleton = false,
  src,
  mediaUrl,
  fitCover = false,
  fallbackSrc,
  coverEstimate: _coverEstimate,
  coverMaxWidth: _coverMaxWidth,
  alt = '',
  loading,
  fetchPriority,
  onLoad,
  onError,
  ...props
}: MediaImageProps) {
  void _coverEstimate;
  void _coverMaxWidth;

  const primarySrc =
    (mediaUrl && mediaUrl.length > 0 ? mediaUrl : typeof src === 'string' ? src : '') || '';
  const fallbackKey = fallbackSrc?.trim() || '';

  const minSkeletonMs = resolveMinSkeletonMs(noSkeleton, loading, fetchPriority);

  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(minSkeletonMs === 0);
  const [usingFallback, setUsingFallback] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const mountRef = useRef(0);

  const activeSrc = usingFallback && fallbackKey ? fallbackKey : primarySrc;

  // A new source means a new reveal cycle. Adjusting the state during render keeps
  // the shimmer from flashing the previous image's "ready" frame first.
  const revealKey = `${primarySrc}|${fallbackKey}|${minSkeletonMs}`;
  const [renderedRevealKey, setRenderedRevealKey] = useState(revealKey);
  if (renderedRevealKey !== revealKey) {
    setRenderedRevealKey(revealKey);
    setImageReady(false);
    setMinElapsed(minSkeletonMs === 0);
    setUsingFallback(false);
    setLoadFailed(false);
  }

  useEffect(() => {
    if (minSkeletonMs === 0) return;
    const token = ++mountRef.current;

    const timer = window.setTimeout(() => {
      if (mountRef.current === token) setMinElapsed(true);
    }, minSkeletonMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeSrc, minSkeletonMs]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageReady(true);
      setLoadFailed(false);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (!usingFallback && fallbackKey) {
        setUsingFallback(true);
        setImageReady(false);
        setMinElapsed(minSkeletonMs === 0);
        return;
      }

      setLoadFailed(true);
      setImageReady(true);
      onError?.(event);
    },
    [fallbackKey, minSkeletonMs, onError, usingFallback]
  );

  const bindImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !activeSrc || loadFailed) return;
      if (node.complete && node.naturalWidth > 0) {
        setImageReady(true);
      }
    },
    [activeSrc, loadFailed]
  );

  const revealed = imageReady && minElapsed;
  const showSkeleton = !noSkeleton && !revealed && !loadFailed;
  const fadeInReveal = true;
  const showPlaceholder = loadFailed || (!activeSrc && !showSkeleton);

  useEffect(() => {
    if (noSkeleton || imageReady || !activeSrc || loadFailed) return;
    const timer = window.setTimeout(() => setImageReady(true), 8000);
    return () => window.clearTimeout(timer);
  }, [noSkeleton, imageReady, activeSrc, loadFailed]);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', wrapperClassName)}>
      {showSkeleton ? (
        <Skeleton
          className={cn('absolute inset-0 z-0 h-full w-full rounded-none', skeletonClassName)}
          delayMs={skeletonDelayMs}
          aria-hidden="true"
        />
      ) : null}
      {showPlaceholder ? <MediaImagePlaceholder alt={alt} /> : null}
      {activeSrc && !loadFailed ? (
        <img
          key={activeSrc}
          ref={bindImgRef}
          src={activeSrc}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'absolute inset-0 z-[1] block h-full w-full transition-opacity duration-500 ease-out',
            fitCover && 'object-cover object-center',
            fadeInReveal ? (revealed ? 'opacity-100' : 'opacity-0') : 'opacity-100',
            className
          )}
          {...props}
        />
      ) : null}
    </div>
  );
}
