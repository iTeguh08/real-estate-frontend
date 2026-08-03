import { cn } from '@/lib/utils';

interface SkeletonProps extends React.ComponentProps<'div'> {
  /** Stagger shimmer start (ms) for sequenced luxury reveals. */
  delayMs?: number;
}

function Skeleton({ className, delayMs, style, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn('hz-skeleton rounded-md', className)}
      style={
        delayMs != null
          ? ({ ...style, '--hz-shimmer-delay': `${delayMs}ms` } as React.CSSProperties)
          : style
      }
      {...props}
    />
  );
}

export { Skeleton };
