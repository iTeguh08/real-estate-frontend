import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PropertyCardSkeletonProps {
  className?: string;
}

export function PropertyCardSkeleton({ className }: PropertyCardSkeletonProps) {
  return (
    <div
      className={cn(
        'h-full overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-hz-sm',
        className
      )}
      role="status"
      aria-label="Loading property"
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none" delayMs={0} />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4 rounded-hz" delayMs={70} />
        <Skeleton className="h-3 w-1/2 rounded-hz" delayMs={120} />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-3 w-12 rounded-hz" delayMs={160} />
          <Skeleton className="h-3 w-12 rounded-hz" delayMs={190} />
          <Skeleton className="h-3 w-16 rounded-hz" delayMs={220} />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-hz-border/70 pt-3">
          <Skeleton className="h-3 w-20 rounded-hz" delayMs={250} />
          <Skeleton className="h-4 w-16 rounded-hz" delayMs={280} />
        </div>
      </div>
    </div>
  );
}
