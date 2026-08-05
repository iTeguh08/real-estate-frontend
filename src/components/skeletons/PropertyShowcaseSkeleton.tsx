import { Skeleton } from '@/components/ui/skeleton';

export function PropertyShowcaseSkeleton() {
  return (
    <div className="relative overflow-hidden bg-hz-page" role="status" aria-label="Loading property">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, color-mix(in oklch, var(--hz-line) 45%, transparent), transparent 55%)',
        }}
      />
      <Skeleton className="min-h-[70vh] w-full rounded-none" delayMs={0} />
      <div className="section-container relative z-10 space-y-5 py-16 md:py-24">
        <Skeleton className="mx-auto h-3 w-28 rounded-full" delayMs={80} />
        <Skeleton className="mx-auto h-8 w-64 max-w-full rounded-hz md:h-9 md:w-80" delayMs={140} />
        <Skeleton className="mx-auto h-4 w-full max-w-lg rounded-hz" delayMs={200} />
        <Skeleton className="mx-auto h-4 w-full max-w-md rounded-hz" delayMs={260} />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-hz" delayMs={300 + i * 70} />
          ))}
        </div>
      </div>
    </div>
  );
}
