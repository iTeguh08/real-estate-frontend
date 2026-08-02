import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <main id="main-content" className="section-container py-16 md:py-20">
      <Skeleton className="mb-2 h-3 w-32 rounded-hz" />
      <Skeleton className="h-9 w-64 rounded-hz" />
      <Skeleton className="mt-2 h-4 w-full max-w-xl rounded-hz" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-hz border border-hz-border bg-hz-elevated p-5 shadow-sm"
          >
            <Skeleton className="h-4 w-28 rounded-hz" />
            <Skeleton className="mt-2 h-3 w-full rounded-hz" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-10 h-10 w-28 rounded-hz" />
    </main>
  );
}
