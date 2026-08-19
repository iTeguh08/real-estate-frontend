import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BestValueCardSkeletonProps {
  className?: string;
}

function SkeletonBadge({ className, delayMs }: { className?: string; delayMs?: number }) {
  return <Skeleton className={cn('rounded-hz', className)} delayMs={delayMs} />;
}

/**
 * Structural twin of `BestValuePropertyCard` — horizontal row used in 1-column listings grid.
 */
export function BestValueCardSkeleton({ className }: BestValueCardSkeletonProps) {
  return (
    <article
      className={cn(
        'group flex h-full overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-hz-sm',
        className,
      )}
      role="status"
      aria-label="Loading property"
    >
      <div className="relative aspect-square w-[168px] shrink-0 overflow-hidden bg-hz-bg-soft sm:w-[200px]">
        <Skeleton className="absolute inset-0 rounded-none" delayMs={0} />

        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          <SkeletonBadge className="h-[18px] w-[60px]" delayMs={40} />
        </div>

        <div className="absolute top-14 right-2.5 z-10 flex flex-col items-center gap-1">
          <Skeleton className="size-7 rounded-full" delayMs={70} />
          <Skeleton className="size-7 rounded-full" delayMs={90} />
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10">
          <SkeletonBadge className="h-[18px] w-[48px]" delayMs={110} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-[18px] w-full rounded-hz sm:h-4" delayMs={130} />
          <Skeleton className="h-[18px] w-[90%] rounded-hz sm:h-4" delayMs={150} />
          <div className="flex items-start gap-1">
            <Skeleton className="mt-0.5 size-3 shrink-0 rounded-full" delayMs={170} />
            <Skeleton className="h-3 flex-1 rounded-hz" delayMs={180} />
          </div>
        </div>

        <div className="my-3.5 h-[0.5px] w-full bg-hz-line/50" aria-hidden="true" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {([200, 230, 260] as const).map((delayMs) => (
            <div key={delayMs} className="flex items-center gap-1.5">
              <Skeleton className="size-4 rounded-sm" delayMs={delayMs} />
              <Skeleton className="h-3 w-8 rounded-hz" delayMs={delayMs + 20} />
            </div>
          ))}
        </div>

        <div className="my-3.5 h-[0.5px] w-full bg-hz-line/50" aria-hidden="true" />

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Skeleton className="size-8 shrink-0 rounded-full" delayMs={300} />
            <Skeleton className="h-3.5 w-24 rounded-hz" delayMs={320} />
          </div>
          <Skeleton className="h-4 w-[72px] rounded-hz" delayMs={340} />
        </div>
      </div>
    </article>
  );
}
