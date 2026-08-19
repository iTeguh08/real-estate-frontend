import { Skeleton } from '@/components/ui/skeleton';
import { BestValueCardSkeleton } from '@/components/skeletons/BestValueCardSkeleton';
import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';
import { cn } from '@/lib/utils';

interface ListingsGridSkeletonProps {
  gridColumns?: 1 | 2 | 3;
  count?: number;
  className?: string;
}

export function ListingsGridSkeleton({
  gridColumns = 3,
  count = 12,
  className,
}: ListingsGridSkeletonProps) {
  const gridClass =
    gridColumns === 1
      ? 'grid grid-cols-1 gap-5'
      : gridColumns === 2
        ? 'grid grid-cols-1 gap-5 md:grid-cols-2'
        : 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3';

  return (
    <div className={cn(gridClass, className)}>
      {Array.from({ length: count }).map((_, index) =>
        gridColumns === 1 ? (
          <BestValueCardSkeleton key={index} />
        ) : (
          <PropertyCardSkeleton key={index} />
        ),
      )}
    </div>
  );
}

function ListingsSidebarSkeleton() {
  return (
    <aside className="hidden flex-col gap-6 lg:flex">
      <section className="rounded-hz bg-hz-listings-sidebar/75 p-5 shadow-hz-sm ring-1 ring-hz-listings-sidebar/30">
        <Skeleton className="mb-5 h-5 w-20 rounded-hz" delayMs={0} />

        <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-hz border border-hz-border">
          <Skeleton className="h-11 rounded-none" delayMs={30} />
          <Skeleton className="h-11 rounded-none" delayMs={50} />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="mb-1.5 h-3 w-16 rounded-hz" delayMs={70 + i * 25} />
              <Skeleton className="h-11 w-full rounded-hz" delayMs={85 + i * 25} />
            </div>
          ))}

          <div className="space-y-3 pt-1">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-10 rounded-hz" delayMs={240} />
              <Skeleton className="h-3 w-10 rounded-hz" delayMs={260} />
            </div>
            <Skeleton className="h-2 w-full rounded-full" delayMs={280} />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 rounded-hz" delayMs={300} />
              <Skeleton className="h-10 rounded-hz" delayMs={320} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Skeleton className="h-11 rounded-hz" delayMs={340} />
            <Skeleton className="h-11 rounded-hz" delayMs={360} />
          </div>
        </div>
      </section>

      <section className="rounded-hz bg-hz-sunken p-5 shadow-hz-sm">
        <Skeleton className="mb-4 h-5 w-36 rounded-hz" delayMs={380} />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-hz p-2">
              <Skeleton className="size-[74px] shrink-0 rounded-hz" delayMs={400 + i * 40} />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3.5 w-full rounded-hz" delayMs={420 + i * 40} />
                <Skeleton className="h-3 w-2/3 rounded-hz" delayMs={440 + i * 40} />
                <Skeleton className="h-3.5 w-16 rounded-hz" delayMs={460 + i * 40} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function ListingsToolbarSkeleton() {
  return (
    <>
      {/* Mobile toolbar */}
      <div className="mb-6 space-y-4 lg:hidden">
        <Skeleton className="h-8 w-48 rounded-hz" delayMs={0} />
        <div className="grid grid-cols-2 overflow-hidden rounded-hz border border-hz-border">
          <Skeleton className="h-10 rounded-none" delayMs={20} />
          <Skeleton className="h-10 rounded-none" delayMs={40} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-11 rounded-hz" delayMs={60} />
          <Skeleton className="h-11 rounded-hz" delayMs={80} />
        </div>
      </div>

      {/* Desktop toolbar */}
      <div className="mb-6 hidden flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-9 w-52 rounded-hz" delayMs={0} />
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-hz" delayMs={20} />
            <Skeleton className="size-11 rounded-hz" delayMs={35} />
            <Skeleton className="size-11 rounded-hz" delayMs={50} />
          </div>
          <Skeleton className="h-11 w-[130px] rounded-hz" delayMs={65} />
          <Skeleton className="h-11 w-[170px] rounded-hz" delayMs={80} />
        </div>
      </div>
    </>
  );
}

interface ListingsPageSkeletonProps {
  gridColumns?: 1 | 2 | 3;
  count?: number;
}

/**
 * Full /listings chrome — sidebar, toolbar, and card grid — for route transitions.
 */
export function ListingsPageSkeleton({ gridColumns = 3, count = 12 }: ListingsPageSkeletonProps) {
  return (
    <main id="main-content" className="relative z-[1] grid grid-cols-1 bg-hz-elevated">
      <div className="section-container relative z-10 col-start-1 row-start-1 py-8 md:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <ListingsSidebarSkeleton />

          <section>
            <ListingsToolbarSkeleton />
            <ListingsGridSkeleton gridColumns={gridColumns} count={count} />
          </section>
        </div>
      </div>
    </main>
  );
}
