import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BestValueCardSkeletonProps {
  className?: string;
}

export function BestValueCardSkeleton({ className }: BestValueCardSkeletonProps) {
  return (
    <div
      className={cn(
        'flex h-full overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-hz-sm',
        className
      )}
      role="status"
      aria-label="Loading property"
    >
      <Skeleton className="aspect-square w-[168px] shrink-0 rounded-none sm:w-[200px]" delayMs={0} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-4 w-3/4 rounded-hz" delayMs={70} />
        <Skeleton className="h-3 w-1/2 rounded-hz" delayMs={110} />
        <div className="h-px w-full bg-hz-border" />
        <Skeleton className="h-3 w-2/3 rounded-hz" delayMs={150} />
        <div className="mt-auto flex items-center justify-between gap-3">
          <Skeleton className="h-8 w-28 rounded-hz" delayMs={190} />
          <Skeleton className="h-4 w-20 rounded-hz" delayMs={220} />
        </div>
      </div>
    </div>
  );
}
