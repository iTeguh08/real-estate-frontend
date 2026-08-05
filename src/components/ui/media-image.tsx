import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/** Minimum shimmer for lazy / below-fold images. */
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

/**
 * Content image with neutral shimmer until the `<img>` finishes loading.
 * Respects `loading="lazy"` — no eager probe that bypasses lazy or cache.
 */
export function MediaImage({
  className,
  wrapperClassName,
  skeletonClassName,
  skeletonDelayMs,
  noSkeleton = false,
  src,
  alt = '',
  loading,
  fetchPriority,
  onLoad,
  onError,
  ...props
}: MediaImageProps) {
  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const srcKey = typeof src === 'string' ? src : '';
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
  const showSkeleton = !noSkeleton && Boolean(srcKey) && !revealed;

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
            revealed ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      ) : null}
    </div>
  );
}
