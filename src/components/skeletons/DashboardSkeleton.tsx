import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <main id="main-content" className="bg-hz-page py-16 md:py-20">
      <div className="section-container">
        <Skeleton className="mb-3 h-3 w-32 rounded-hz" delayMs={0} />
        <Skeleton className="h-10 w-72 rounded-hz" delayMs={60} />
        <Skeleton className="mt-3 h-3 w-48 rounded-hz" delayMs={110} />
        <Skeleton className="mt-1 h-4 w-full max-w-md rounded-hz" delayMs={140} />

        <div className="mt-12 overflow-hidden rounded-2xl bg-hz-elevated shadow-hz-md md:grid md:grid-cols-2">
          <Skeleton className="min-h-[220px] rounded-none md:min-h-[280px]" delayMs={180} />
          <div className="flex h-full flex-col justify-center p-6 md:p-10">
            <Skeleton className="h-8 w-56 rounded-hz" delayMs={220} />
            <Skeleton className="mt-3 h-4 w-full max-w-sm rounded-hz" delayMs={250} />
            <Skeleton className="mt-8 h-11 w-40 rounded-lg" delayMs={280} />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[4.75rem] rounded-xl" delayMs={320 + i * 40} />
          ))}
        </div>
      </div>
    </main>
  );
}
