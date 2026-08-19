import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AgentCardSkeletonProps {
  className?: string;
}

/** Structural twin of `AgentCard` — portrait, name, role, phone action. */
export function AgentCardSkeleton({ className }: AgentCardSkeletonProps) {
  return (
    <article className={cn('group relative', className)} role="status" aria-label="Loading agent">
      <div className="relative aspect-[16/10] overflow-hidden rounded-hz border border-hz-border bg-hz-bg-soft">
        <Skeleton className="absolute inset-0 rounded-none" delayMs={0} />
      </div>

      <div className="flex items-end justify-between gap-4 pt-4">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4 rounded-hz md:h-7" delayMs={60} />
          <Skeleton className="h-4 w-1/2 rounded-hz" delayMs={90} />
        </div>
        <Skeleton className="size-11 shrink-0 rounded-hz" delayMs={120} />
      </div>
    </article>
  );
}
