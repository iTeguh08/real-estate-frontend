import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { quantizeBoxEdge, withCoverBox } from '@/lib/image-url';
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
  /**
   * Raw/preview media URL. With `fitCover`, request w×h matches the measured
   * wrapper (+ buffer) and crops to that aspect (portrait-safe).
   */
  mediaUrl?: string;
  /**
   * Measure the wrapper and size for `object-cover` via w×h crop/cover.
   * Prefer over a hard-coded `src` width when the box aspect differs from the photo.
   */
  fitCover?: boolean;
  /** SSR / first-paint box estimate before ResizeObserver fires. */
  coverEstimate?: { width: number; height: number };
  /** Cap for each cover edge request. */
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

/**
 * Content image with neutral shimmer until the `<img>` finishes loading.
 * Respects `loading="lazy"` — no eager probe that bypasses lazy or cache.
 *
 * With `fitCover` + `mediaUrl`, request w×h follows the real wrapper box so
 * landscape sources still fill portrait frames without undersized height.
 */
export function MediaImage({
  className,
  wrapperClassName,
  skeletonClassName,
  skeletonDelayMs,
  noSkeleton = false,
  src,
  mediaUrl,
  fitCover = false,
  coverEstimate,
  coverMaxWidth,
  alt = '',
  loading,
  fetchPriority,
  onLoad,
  onError,
  ...props
}: MediaImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ width: number; height: number } | null>(
    coverEstimate ?? null
  );

  const useCover = Boolean(fitCover && mediaUrl);

  useEffect(() => {
    if (!useCover) return;
    const el = wrapRef.current;
    if (!el) return;

    const apply = (width: number, height: number) => {
      if (width < 8 || height < 8) return;
      setBox({
        width: quantizeBoxEdge(width),
        height: quantizeBoxEdge(height),
      });
    };

    apply(el.clientWidth, el.clientHeight);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      apply(width, height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [useCover]);

  const coverSrc = useMemo(() => {
    if (!useCover || !mediaUrl || !box) return '';
    return withCoverBox(mediaUrl, box.width, box.height, {
      maxEdge: coverMaxWidth,
    });
  }, [useCover, mediaUrl, box, coverMaxWidth]);

  const srcKey = useCover ? coverSrc : typeof src === 'string' ? src : '';

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
  // Show shimmer even while cover URL is still resolving (avoid flat soft-bg flash).
  const showSkeleton = !noSkeleton && !revealed;

  return (
    <div
      ref={wrapRef}
      className={cn('relative h-full w-full overflow-hidden', wrapperClassName)}
    >
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
