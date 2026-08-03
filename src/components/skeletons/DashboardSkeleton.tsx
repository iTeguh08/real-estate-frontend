import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <main id="main-content" className="section-container py-16 md:py-20">
      <Skeleton className="mb-2 h-3 w-32 rounded-hz" delayMs={0} />
      <Skeleton className="h-9 w-64 rounded-hz" delayMs={60} />
      <Skeleton className="mt-2 h-4 w-full max-w-xl rounded-hz" delayMs={110} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-hz border border-hz-border bg-hz-elevated p-5 shadow-hz-sm"
          >
            <Skeleton className="h-4 w-28 rounded-hz" delayMs={140 + i * 50} />
            <Skeleton className="mt-2 h-3 w-full rounded-hz" delayMs={180 + i * 50} />
          </div>
        ))}
      </div>

      <Skeleton className="mt-10 h-10 w-28 rounded-hz" delayMs={360} />
    </main>
  );
}
