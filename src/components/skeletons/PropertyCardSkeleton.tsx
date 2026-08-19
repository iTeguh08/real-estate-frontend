import { Skeleton } from '@/components/ui/skeleton';
import { propertyCard } from '@/lib/cva';
import { cn } from '@/lib/utils';

interface PropertyCardSkeletonProps {
  className?: string;
  /** Matches grid cards on /listings with equal row heights. */
  uniformHeight?: boolean;
}

function SkeletonBadge({ className, delayMs }: { className?: string; delayMs?: number }) {
  return <Skeleton className={cn('h-[22px] rounded-hz', className)} delayMs={delayMs} />;
}

function SkeletonIconChip({ delayMs }: { delayMs?: number }) {
  return <Skeleton className="size-8 rounded-full" delayMs={delayMs} />;
}

function SkeletonSpecPill({ delayMs }: { delayMs?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Skeleton className="size-[18px] shrink-0 rounded-sm" delayMs={delayMs} />
      <Skeleton className="h-3 w-9 rounded-hz" delayMs={(delayMs ?? 0) + 25} />
    </div>
  );
}

/**
 * Structural twin of `PropertyCard` (grid / full / uniformHeight) — same regions & spacing.
 */
export function PropertyCardSkeleton({ className, uniformHeight = true }: PropertyCardSkeletonProps) {
  return (
    <article
      className={cn(
        propertyCard({ variant: 'grid', size: 'full' }),
        uniformHeight && 'flex h-full flex-col',
        className,
      )}
      role="status"
      aria-label="Loading property"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-t-hz bg-hz-bg-soft max-lg:rounded-t-xl">
        <Skeleton className="absolute inset-0 rounded-none" delayMs={0} />

        <div className="absolute top-3 left-3 z-10">
          <SkeletonBadge className="w-[72px]" delayMs={40} />
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-row items-center gap-1.5">
          <SkeletonIconChip delayMs={60} />
          <SkeletonIconChip delayMs={90} />
          <SkeletonIconChip delayMs={120} />
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <SkeletonBadge className="w-[56px]" delayMs={150} />
        </div>
      </div>

      <div className={cn('flex flex-col gap-3 p-4', uniformHeight && 'min-h-[156px] flex-1')}>
        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-[18px] w-full rounded-hz" delayMs={180} />
          <Skeleton className="h-[18px] w-[88%] rounded-hz" delayMs={200} />
          <div className="flex items-start gap-1 pt-0.5">
            <Skeleton className="mt-0.5 size-3 shrink-0 rounded-full" delayMs={220} />
            <Skeleton className="h-3 flex-1 rounded-hz" delayMs={230} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <SkeletonSpecPill delayMs={250} />
          <SkeletonSpecPill delayMs={280} />
          <SkeletonSpecPill delayMs={310} />
        </div>

        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t border-hz-border pt-3',
            uniformHeight && 'mt-auto',
          )}
        >
          <Skeleton className="h-3.5 w-[92px] rounded-hz" delayMs={340} />
          <Skeleton className="h-4 w-[76px] rounded-hz" delayMs={360} />
        </div>
      </div>
    </article>
  );
}
