import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PropertyCardSkeletonProps {
  className?: string;
}

export function PropertyCardSkeleton({ className }: PropertyCardSkeletonProps) {
  return (
    <div
      className={cn(
        'h-full overflow-hidden rounded-hz border border-hz-border bg-hz-elevated',
        className
      )}
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4 rounded-hz" />
        <Skeleton className="h-3 w-1/2 rounded-hz" />
        <Skeleton className="h-3 w-full rounded-hz" />
      </div>
    </div>
  );
}
