import { Skeleton } from '@/components/ui/skeleton';
import { AgentCardSkeleton } from '@/components/skeletons/AgentCardSkeleton';

/** Twin of `/agents` — header + 3-column agent grid. */
export function AgentsPageSkeleton() {
  return (
    <main id="main-content" className="relative overflow-hidden bg-hz-elevated py-16 md:py-20 animate-in fade-in duration-300">
      <div className="section-container relative z-10">
        <header className="mb-12 max-w-2xl">
          <Skeleton className="mb-2 h-3 w-24 rounded-hz" delayMs={0} />
          <Skeleton className="h-9 w-72 max-w-full rounded-hz md:h-10" delayMs={40} />
          <Skeleton className="mt-4 h-4 w-full rounded-hz" delayMs={80} />
          <Skeleton className="mt-2 h-4 w-[92%] rounded-hz" delayMs={100} />
        </header>

        <div className="grid grid-cols-1 gap-x-5 gap-y-15 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <AgentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
