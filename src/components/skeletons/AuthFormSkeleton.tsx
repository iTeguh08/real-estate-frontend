import { Skeleton } from '@/components/ui/skeleton';

/** Twin of `AuthFormShell` — luxury panel + form card, no photo fetch. */
export function AuthFormSkeleton() {
  return (
    <main
      id="main-content"
      className="relative grid min-h-[calc(100dvh-76px)] overflow-hidden bg-hz-elevated lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] animate-in fade-in duration-300"
    >
      <aside className="relative h-44 overflow-hidden bg-hz-sunken sm:h-56 lg:h-auto lg:min-h-[calc(100dvh-76px)]">
        <Skeleton className="absolute inset-0 rounded-none" delayMs={0} />
        <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 sm:p-8 lg:p-10 xl:p-14">
          <Skeleton className="h-3 w-16 rounded-hz bg-hz-line/60" delayMs={40} />
          <Skeleton className="h-6 w-64 max-w-full rounded-hz bg-hz-line/60 sm:h-7 lg:h-8" delayMs={80} />
          <Skeleton className="h-5 w-48 max-w-full rounded-hz bg-hz-line/60 lg:hidden" delayMs={100} />
        </div>
      </aside>

      <div className="relative flex items-center justify-center bg-hz-page px-5 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-16 xl:px-20">
        <div className="relative z-10 w-full max-w-xl">
          <div className="rounded-2xl border border-hz-border bg-hz-elevated p-7 shadow-hz-md sm:p-9 md:p-10 lg:p-11">
            <Skeleton className="mb-2 h-3 w-20 rounded-hz" delayMs={120} />
            <Skeleton className="h-8 w-56 max-w-full rounded-hz sm:h-9" delayMs={160} />
            <Skeleton className="mt-3 h-4 w-full rounded-hz" delayMs={200} />
            <Skeleton className="mt-2 h-4 w-[88%] rounded-hz" delayMs={220} />

            <div className="mt-8 space-y-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-4 w-24 rounded-hz" delayMs={260 + i * 50} />
                  <Skeleton className="h-11 w-full rounded-hz" delayMs={280 + i * 50} />
                </div>
              ))}
              <Skeleton className="mt-6 h-11 w-full rounded-hz" delayMs={420} />
            </div>

            <div className="mt-7 border-t border-hz-border pt-6">
              <Skeleton className="mx-auto h-4 w-48 rounded-hz" delayMs={460} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
