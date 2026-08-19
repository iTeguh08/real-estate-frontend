import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';

/**
 * Structural placeholder for property detail — hero, title, price, specs, gallery.
 * Matches Custom Layout 1 (classic showcase) to minimize CLS on reveal.
 */
export function PropertyDetailSkeleton() {
  return (
    <div
      className="relative overflow-hidden bg-hz-elevated animate-in fade-in duration-300"
      role="status"
      aria-label="Loading property"
    >
      {/* Hero gallery strip */}
      <div className="relative border-b border-hz-border/60 bg-hz-sunken">
        <Skeleton className="aspect-[16/9] w-full max-h-[min(72vh,640px)] rounded-none md:aspect-[21/9]" delayMs={0} />
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4 md:p-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="size-14 rounded-hz md:size-16" delayMs={80 + i * 50} />
          ))}
        </div>
      </div>

      {/* Title, location, price, spec pills */}
      <div className="section-container py-10 md:py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Skeleton className="mb-4 h-4 w-36 rounded-hz" delayMs={120} />
          <Skeleton className="h-9 w-full max-w-xl rounded-hz md:h-10" delayMs={160} />
          <Skeleton className="mt-3 h-4 w-48 rounded-hz" delayMs={200} />
          <Skeleton className="mt-6 h-8 w-40 rounded-hz" delayMs={240} />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" delayMs={280 + i * 40} />
            ))}
          </div>
        </div>
      </div>

      {/* Overview + features blocks */}
      <div className="border-t border-hz-border/60 bg-hz-page">
        <div className="section-container grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40 rounded-hz" delayMs={360} />
            <Skeleton className="h-4 w-full rounded-hz" delayMs={400} />
            <Skeleton className="h-4 w-full rounded-hz" delayMs={430} />
            <Skeleton className="h-4 w-4/5 rounded-hz" delayMs={460} />
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-hz" delayMs={500} />
        </div>
      </div>

      {/* Gallery grid */}
      <div className="section-container py-14 md:py-16">
        <Skeleton className="mx-auto mb-8 h-7 w-48 rounded-hz" delayMs={540} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-hz" delayMs={580 + i * 35} />
          ))}
        </div>
      </div>

      {/* Specs table */}
      <div className="border-t border-hz-border/60 bg-hz-sunken/50">
        <div className="section-container py-14 md:py-16">
          <Skeleton className="mx-auto mb-8 h-7 w-56 rounded-hz" delayMs={720} />
          <div className="mx-auto grid max-w-3xl gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 border-b border-hz-border/50 pb-3">
                <Skeleton className="h-4 w-32 rounded-hz" delayMs={760 + i * 30} />
                <Skeleton className="h-4 w-24 rounded-hz" delayMs={780 + i * 30} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related listings row */}
      <div className="section-container border-t border-hz-border/60 py-14 md:py-16">
        <Skeleton className="mb-8 h-7 w-52 rounded-hz" delayMs={900} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
