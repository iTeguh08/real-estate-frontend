import { Skeleton } from '@/components/ui/skeleton';

export function AgentCardSkeleton() {
  return (
    <div role="status" aria-label="Loading agent">
      <Skeleton className="aspect-[16/10] w-full rounded-hz" delayMs={0} />
      <Skeleton className="mt-4 h-5 w-1/2 rounded-hz" delayMs={80} />
      <Skeleton className="mt-2 h-4 w-1/3 rounded-hz" delayMs={140} />
    </div>
  );
}
