import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

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

/**
 * Content image with luxury shimmer until decoded — use inside a `relative` box
 * with explicit aspect ratio or fixed height on the parent.
 */
export function MediaImage({
  className,
  wrapperClassName,
  skeletonClassName,
  skeletonDelayMs,
  noSkeleton = false,
  src,
  alt = '',
  onLoad,
  onError,
  ...props
}: MediaImageProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!src || typeof src !== 'string') return;

    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) setReady(true);
    };
    probe.onerror = () => {
      if (!cancelled) setReady(true);
    };
    probe.src = src;
    if (probe.complete && probe.naturalWidth > 0) {
      setReady(true);
    }

    return () => {
      cancelled = true;
    };
  }, [src]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setReady(true);
      onLoad?.(event);
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setReady(true);
      onError?.(event);
    },
    [onError]
  );

  const showSkeleton = !noSkeleton && !ready;

  return (
    <div className={cn('relative h-full w-full overflow-hidden', wrapperClassName)}>
      {showSkeleton ? (
        <Skeleton
          className={cn('absolute inset-0 z-0 h-full w-full rounded-none', skeletonClassName)}
          delayMs={skeletonDelayMs}
          aria-hidden="true"
        />
      ) : null}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'absolute inset-0 z-[1] block h-full w-full transition-opacity duration-500 ease-out',
          ready ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
}
