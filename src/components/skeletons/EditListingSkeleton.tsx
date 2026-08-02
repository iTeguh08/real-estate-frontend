import { Skeleton } from '@/components/ui/skeleton';

export function EditListingSkeleton() {
  return (
    <main id="main-content" className="section-container py-10 md:py-14">
      <Skeleton className="h-4 w-36 rounded-hz" />
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-72 max-w-full rounded-hz" />
          <Skeleton className="h-4 w-48 rounded-hz" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-hz" />
          <Skeleton className="h-10 w-24 rounded-hz" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-24 rounded-hz" />
            <Skeleton className="h-11 w-full rounded-hz" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-8 aspect-[16/9] w-full rounded-hz" />

      <div className="mt-8 space-y-2">
        <Skeleton className="h-3 w-28 rounded-hz" />
        <Skeleton className="h-32 w-full rounded-hz" />
      </div>
    </main>
  );
}
