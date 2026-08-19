import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function ContactInfoCardSkeleton({
  delayMs,
  lines = 2,
}: {
  delayMs: number;
  lines?: number;
}) {
  return (
    <div className="rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm">
      <Skeleton className="mb-4 h-11 w-11 rounded-hz" delayMs={delayMs} />
      <Skeleton className="h-5 w-24 rounded-hz" delayMs={delayMs + 40} />
      <div className="mt-2 space-y-1.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('h-4 rounded-hz', i === lines - 1 ? 'w-[85%]' : 'w-full')}
            delayMs={delayMs + 70 + i * 30}
          />
        ))}
      </div>
    </div>
  );
}

function FormFieldSkeleton({ delayMs }: { delayMs: number }) {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-24 rounded-hz" delayMs={delayMs} />
      <Skeleton className="h-11 w-full rounded-hz" delayMs={delayMs + 30} />
    </div>
  );
}

/** Twin of `/contact` — hero, 4 info cards, form + map grid. */
export function ContactPageSkeleton() {
  return (
    <main id="main-content" className="animate-in fade-in duration-300">
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <div className="section-container relative z-10">
          <header className="mx-auto max-w-2xl text-center">
            <Skeleton className="mx-auto mb-2 h-3 w-28 rounded-hz" delayMs={0} />
            <Skeleton className="mx-auto h-9 w-72 max-w-full rounded-hz md:h-10 md:w-96" delayMs={40} />
            <Skeleton className="mx-auto mt-5 h-4 w-full rounded-hz" delayMs={80} />
            <Skeleton className="mx-auto mt-2 h-4 w-[88%] rounded-hz" delayMs={100} />
          </header>
        </div>
      </section>

      <section className="relative overflow-hidden bg-hz-sunken pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="section-container relative z-10">
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            aria-hidden="true"
          >
            <ContactInfoCardSkeleton delayMs={140} lines={2} />
            <ContactInfoCardSkeleton delayMs={200} lines={1} />
            <ContactInfoCardSkeleton delayMs={260} lines={1} />
            <ContactInfoCardSkeleton delayMs={320} lines={3} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-2 lg:gap-14">
            <div>
              <Skeleton className="mb-6 h-6 w-44 rounded-hz" delayMs={400} />
              <div className="space-y-5 rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormFieldSkeleton delayMs={440} />
                  <FormFieldSkeleton delayMs={480} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormFieldSkeleton delayMs={520} />
                  <FormFieldSkeleton delayMs={560} />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded-hz" delayMs={600} />
                  <Skeleton className="h-[130px] w-full rounded-hz" delayMs={630} />
                </div>
                <Skeleton className="h-[65px] w-full rounded-hz" delayMs={670} />
                <Skeleton className="h-11 w-full rounded-hz" delayMs={710} />
              </div>
            </div>

            <div className="flex flex-col">
              <Skeleton className="mb-6 h-6 w-40 rounded-hz" delayMs={420} />
              <div className="flex flex-1 flex-col overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-sm">
                <Skeleton className="min-h-[280px] w-full flex-1 rounded-none lg:min-h-[320px]" delayMs={450} />
                <div className="space-y-2 border-t border-hz-border p-5">
                  <Skeleton className="h-4 w-40 rounded-hz" delayMs={500} />
                  <Skeleton className="h-4 w-full rounded-hz" delayMs={530} />
                  <Skeleton className="mt-2 h-4 w-36 rounded-hz" delayMs={560} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Skeleton className="h-4 w-28 rounded-hz" delayMs={750} />
          </div>
        </div>
      </section>
    </main>
  );
}
