import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

/** Twin of `/wishlist` — back link, title, property grid. */
export function WishlistPageSkeleton() {
  return (
    <main
      id="main-content"
      className="bg-hz-elevated py-10 md:py-16 animate-in fade-in duration-300"
    >
      <div className="section-container">
        <Skeleton className="mb-6 h-4 w-32 rounded-hz" delayMs={0} />
        <Skeleton className="h-8 w-56 rounded-hz md:h-9" delayMs={40} />
        <Skeleton className="mt-2 h-4 w-40 rounded-hz" delayMs={80} />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
