import { Skeleton } from '@/components/ui/skeleton';
import { ArticleCardSkeleton } from '@/components/skeletons/ArticleCardSkeleton';

/** Twin of `/blog` — header + 3-column article grid. */
export function BlogPageSkeleton() {
  return (
    <main id="main-content" className="relative overflow-hidden bg-hz-elevated py-16 md:py-20 animate-in fade-in duration-300">
      <div className="section-container relative z-10">
        <header className="mb-12 max-w-2xl">
          <Skeleton className="mb-2 h-3 w-16 rounded-hz" delayMs={0} />
          <Skeleton className="h-9 w-80 max-w-full rounded-hz md:h-10" delayMs={40} />
          <Skeleton className="mt-4 h-4 w-full rounded-hz" delayMs={80} />
          <Skeleton className="mt-2 h-4 w-[90%] rounded-hz" delayMs={100} />
        </header>

        <div className="grid grid-cols-1 gap-x-6 gap-y-18 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
