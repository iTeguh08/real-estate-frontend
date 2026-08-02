import { Skeleton } from '@/components/ui/skeleton';

export function AgentCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[16/10] w-full rounded-hz" />
      <Skeleton className="mt-4 h-5 w-1/2 rounded-hz" />
      <Skeleton className="mt-2 h-4 w-1/3 rounded-hz" />
    </div>
  );
}
