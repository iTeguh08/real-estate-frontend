import { useCallback, useEffect, useRef, useState } from 'react';
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

export function MediaImage({
  className,
  wrapperClassName,
  skeletonClassName,
  skeletonDelayMs,
  noSkeleton = false,
  src,
  mediaUrl,
  fitCover = false,
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

  const srcKey = (mediaUrl && mediaUrl.length > 0 ? mediaUrl : typeof src === 'string' ? src : '') || '';

  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const mountRef = useRef(0);
  const minSkeletonMs = resolveMinSkeletonMs(noSkeleton, loading, fetchPriority);

  useEffect(() => {
    setImageReady(false);
    setMinElapsed(minSkeletonMs === 0);
    const token = ++mountRef.current;

    if (minSkeletonMs === 0) return;

    const timer = window.setTimeout(() => {
      if (mountRef.current === token) setMinElapsed(true);
    }, minSkeletonMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [srcKey, minSkeletonMs]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageReady(true);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageReady(true);
      onError?.(event);
    },
    [onError]
  );

  const bindImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !srcKey) return;
      if (node.complete && node.naturalWidth > 0) {
        setImageReady(true);
      }
    },
    [srcKey]
  );

  const revealed = imageReady && minElapsed;
  const showSkeleton = !noSkeleton && !revealed;
  const fadeInReveal = loading !== 'lazy';

  useEffect(() => {
    if (noSkeleton || imageReady || !srcKey) return;
    const timer = window.setTimeout(() => setImageReady(true), 8000);
    return () => window.clearTimeout(timer);
  }, [noSkeleton, imageReady, srcKey]);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', wrapperClassName)}>
      {showSkeleton ? (
        <Skeleton
          className={cn('absolute inset-0 z-0 h-full w-full rounded-none', skeletonClassName)}
          delayMs={skeletonDelayMs}
          aria-hidden="true"
        />
      ) : null}
      {srcKey ? (
        <img
          key={srcKey}
          ref={bindImgRef}
          src={srcKey}
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
