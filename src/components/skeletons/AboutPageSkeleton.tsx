import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function SectionEyebrowTitle({
  delayMs = 0,
  centered = false,
  titleWidth = 'md:w-80',
}: {
  delayMs?: number;
  centered?: boolean;
  titleWidth?: string;
}) {
  return (
    <div className={cn(centered && 'mx-auto text-center', !centered && 'max-w-2xl')}>
      <Skeleton
        className={cn('mb-2 h-3 w-24 rounded-hz', centered && 'mx-auto')}
        delayMs={delayMs}
      />
      <Skeleton
        className={cn(
          'h-8 w-64 max-w-full rounded-hz md:h-9',
          centered && 'mx-auto',
          titleWidth,
        )}
        delayMs={delayMs + 40}
      />
    </div>
  );
}

function StatSkeleton({ delayMs }: { delayMs: number }) {
  return (
    <div className="text-center">
      <Skeleton className="mx-auto h-8 w-20 rounded-hz md:h-9" delayMs={delayMs} />
      <Skeleton className="mx-auto mt-2 h-4 w-28 max-w-full rounded-hz" delayMs={delayMs + 30} />
    </div>
  );
}

function ValueCardSkeleton({ delayMs }: { delayMs: number }) {
  return (
    <article className="rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm">
      <Skeleton className="mb-4 h-11 w-11 rounded-hz" delayMs={delayMs} />
      <Skeleton className="h-5 w-3/4 rounded-hz" delayMs={delayMs + 40} />
      <Skeleton className="mt-2 h-4 w-full rounded-hz" delayMs={delayMs + 70} />
      <Skeleton className="mt-2 h-4 w-[88%] rounded-hz" delayMs={delayMs + 90} />
    </article>
  );
}

function ServiceRowSkeleton({ delayMs }: { delayMs: number }) {
  return (
    <article className="flex w-full items-center gap-4 rounded-hz bg-hz-elevated p-5 shadow-hz-sm md:gap-6 md:p-6">
      <Skeleton className="hidden h-[88px] w-20 shrink-0 rounded-hz md:block" delayMs={delayMs} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-40 rounded-hz" delayMs={delayMs + 30} />
        <Skeleton className="h-4 w-full rounded-hz" delayMs={delayMs + 60} />
        <Skeleton className="h-4 w-[92%] rounded-hz" delayMs={delayMs + 80} />
      </div>
    </article>
  );
}

function TimelineItemSkeleton({ delayMs, isLast = false }: { delayMs: number; isLast?: boolean }) {
  return (
    <li className={cn('relative flex gap-6', !isLast && 'pb-10')}>
      {!isLast ? (
        <span className="absolute left-[19px] top-10 h-full w-px bg-hz-border" aria-hidden="true" />
      ) : null}
      <Skeleton className="size-10 shrink-0 rounded-full" delayMs={delayMs} />
      <div className="min-w-0 flex-1 pt-1.5">
        <Skeleton className="h-4 w-12 rounded-hz" delayMs={delayMs + 30} />
        <Skeleton className="mt-2 h-4 w-full rounded-hz" delayMs={delayMs + 50} />
        <Skeleton className="mt-1 h-4 w-[85%] rounded-hz" delayMs={delayMs + 70} />
      </div>
    </li>
  );
}

/** Twin of `/about` — hero, stats, mission cards, services, timeline, footer CTA. */
export function AboutPageSkeleton({ className }: { className?: string }) {
  return (
    <main
      id="main-content"
      className={cn('animate-in fade-in duration-300', className)}
      aria-hidden="true"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <Skeleton className="mb-2 h-3 w-24 rounded-hz" delayMs={0} />
              <Skeleton className="h-9 w-full max-w-[420px] rounded-hz md:h-10" delayMs={40} />
              <Skeleton className="mt-2 h-9 w-full max-w-[360px] rounded-hz md:h-10" delayMs={70} />
              <Skeleton className="mt-5 h-4 w-full rounded-hz" delayMs={100} />
              <Skeleton className="mt-2 h-4 w-[92%] rounded-hz" delayMs={120} />
              <div className="mt-8 flex flex-wrap gap-4">
                <Skeleton className="h-11 w-36 rounded-hz" delayMs={160} />
                <Skeleton className="h-11 w-40 rounded-hz" delayMs={180} />
              </div>
            </div>
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" delayMs={90} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hz-border bg-hz-sunken py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatSkeleton key={i} delayMs={220 + i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrowTitle delayMs={420} centered titleWidth="md:w-[28rem]" />
            <Skeleton className="mx-auto mt-5 h-4 w-full max-w-2xl rounded-hz" delayMs={480} />
            <Skeleton className="mx-auto mt-2 h-4 w-[90%] max-w-2xl rounded-hz" delayMs={500} />
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ValueCardSkeleton key={i} delayMs={540 + i * 70} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-hz-sunken py-16 md:py-20">
        <div className="section-container relative z-10">
          <header className="mb-12 max-w-2xl">
            <SectionEyebrowTitle delayMs={760} titleWidth="md:w-96" />
            <Skeleton className="mt-4 h-4 w-full rounded-hz" delayMs={820} />
            <Skeleton className="mt-2 h-4 w-[88%] rounded-hz" delayMs={840} />
          </header>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <ServiceRowSkeleton key={i} delayMs={880 + i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <div className="section-container relative z-10">
          <header className="mb-12 text-center">
            <SectionEyebrowTitle delayMs={1120} centered titleWidth="md:w-72" />
          </header>
          <ol className="mx-auto max-w-2xl space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <TimelineItemSkeleton key={i} delayMs={1180 + i * 70} isLast={i === 3} />
            ))}
          </ol>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden bg-hz-footer py-16 md:py-20">
        <div className="section-container relative z-10 text-center">
          <Skeleton className="mx-auto h-8 w-64 max-w-full rounded-hz md:h-9 md:w-80" delayMs={1480} />
          <Skeleton className="mx-auto mt-4 h-4 w-full max-w-lg rounded-hz" delayMs={1520} />
          <Skeleton className="mx-auto mt-2 h-4 w-[85%] max-w-lg rounded-hz" delayMs={1540} />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Skeleton className="h-11 w-36 rounded-hz" delayMs={1580} />
            <Skeleton className="h-11 w-44 rounded-hz" delayMs={1600} />
          </div>
        </div>
      </section>
    </main>
  );
}
