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
    >
      <Skeleton className="aspect-square w-[168px] shrink-0 rounded-none sm:w-[200px]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-4 w-3/4 rounded-hz" />
        <Skeleton className="h-3 w-1/2 rounded-hz" />
        <div className="h-px w-full bg-hz-border" />
        <Skeleton className="h-3 w-2/3 rounded-hz" />
        <div className="mt-auto flex items-center justify-between gap-3">
          <Skeleton className="h-8 w-28 rounded-hz" />
          <Skeleton className="h-4 w-20 rounded-hz" />
        </div>
      </div>
    </div>
  );
}
