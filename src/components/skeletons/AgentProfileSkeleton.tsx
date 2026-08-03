import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';

export function AgentProfileSkeleton() {
  return (
    <main id="main-content" className="section-container py-16">
      <Skeleton className="h-4 w-36 rounded-hz" delayMs={0} />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        <Skeleton className="aspect-[4/5] w-full max-w-md rounded-hz" delayMs={60} />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 rounded-hz" delayMs={100} />
          <Skeleton className="h-4 w-32 rounded-hz" delayMs={140} />
          <Skeleton className="h-20 w-full rounded-hz" delayMs={180} />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-hz" delayMs={220} />
            <Skeleton className="h-10 w-32 rounded-hz" delayMs={260} />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <Skeleton className="h-6 w-48 rounded-hz" delayMs={300} />
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
