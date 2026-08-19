import { Skeleton } from '@/components/ui/skeleton';
import { AgentCardSkeleton } from '@/components/skeletons/AgentCardSkeleton';
import { ArticleCardSkeleton } from '@/components/skeletons/ArticleCardSkeleton';
import { BestValueCardSkeleton } from '@/components/skeletons/BestValueCardSkeleton';
import { PropertyCardSkeleton } from '@/components/skeletons/PropertyCardSkeleton';
import { cn } from '@/lib/utils';

function SectionEyebrowTitle({
  delayMs = 0,
  centered = false,
}: {
  delayMs?: number;
  centered?: boolean;
}) {
  return (
    <div className={cn(centered && 'mx-auto text-center')}>
      <Skeleton
        className={cn('mb-2 h-3 w-28 rounded-hz', centered && 'mx-auto')}
        delayMs={delayMs}
      />
      <Skeleton
        className={cn(
          'h-8 w-64 max-w-full rounded-hz md:h-9',
          centered && 'mx-auto md:w-80',
        )}
        delayMs={delayMs + 40}
      />
    </div>
  );
}

function CarouselControlsSkeleton({ className, delayMs = 0 }: { className?: string; delayMs?: number }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)} aria-hidden="true">
      <Skeleton className="size-9 shrink-0 rounded-hz" delayMs={delayMs} />
      <div className="flex items-center gap-2 px-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('rounded-full', i === 0 ? 'size-2.5' : 'size-2')}
            delayMs={delayMs + 20 + i * 15}
          />
        ))}
      </div>
      <Skeleton className="size-9 shrink-0 rounded-hz" delayMs={delayMs + 80} />
    </div>
  );
}

/** Twin of homepage hero — copy, search tabs/form, footer hint, right image panel. */
export function HeroSectionSkeleton() {
  return (
    <section className="relative overflow-hidden bg-hz-page font-poppins" aria-hidden="true">
      <div className="relative z-10 flex flex-col lg:aspect-[2560/1103] lg:min-h-0">
        <div className="hero-container relative z-10 order-1 flex flex-col justify-center py-8 md:py-12 lg:order-none lg:h-full lg:min-h-0 lg:py-10">
          <div className="max-w-[620px] 3xl:max-w-[720px]">
            <Skeleton className="mb-4 h-3 w-36 rounded-hz" delayMs={0} />
            <Skeleton className="h-11 w-full max-w-[500px] rounded-hz md:h-[52px]" delayMs={40} />
            <Skeleton className="mt-2 h-11 w-full max-w-[420px] rounded-hz md:h-[52px]" delayMs={70} />
            <Skeleton className="mb-6 mt-4 h-4 w-full max-w-[460px] rounded-hz" delayMs={100} />
            <Skeleton className="mb-6 h-4 w-[88%] max-w-[460px] rounded-hz" delayMs={120} />
          </div>

          <div
            className={cn(
              'relative z-30 mt-0 w-full max-w-[560px]',
              'lg:max-w-[900px] lg:w-[min(900px,max(100%,calc(80vw-7.5rem)))]',
            )}
          >
            <div className="flex">
              <Skeleton className="h-[41px] w-[108px] rounded-t-hz rounded-b-none" delayMs={150} />
              <Skeleton className="h-[41px] w-[108px] rounded-t-hz rounded-b-none" delayMs={170} />
            </div>
            <div className="rounded-b-hz rounded-tr-hz bg-hz-elevated p-3 shadow-hz-elevated">
              <div className="hidden min-w-0 gap-0 lg:grid lg:grid-cols-[minmax(140px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)_auto_auto] lg:items-stretch">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-r border-hz-border px-4 py-3">
                    <Skeleton className="mb-1 h-2.5 w-14 rounded-hz" delayMs={200 + i * 30} />
                    <Skeleton className="h-4 w-full rounded-hz" delayMs={220 + i * 30} />
                  </div>
                ))}
                <Skeleton className="mx-3 h-9 w-[72px] self-center rounded-hz" delayMs={290} />
                <Skeleton className="h-[46px] w-[148px] self-center rounded-hz" delayMs={310} />
              </div>
              <div className="space-y-0 lg:hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-b border-hz-border px-3 py-3 last:border-b-0">
                    <Skeleton className="mb-1 h-2.5 w-14 rounded-hz" delayMs={200 + i * 30} />
                    <Skeleton className="h-4 w-full rounded-hz" delayMs={220 + i * 30} />
                  </div>
                ))}
                <div className="px-3 pt-3">
                  <Skeleton className="mx-auto h-10 w-32 rounded-hz" delayMs={320} />
                </div>
                <div className="px-3 pt-3">
                  <Skeleton className="h-11 w-full rounded-hz" delayMs={340} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 max-w-[520px] max-md:hidden">
            <Skeleton className="h-3 w-full rounded-hz" delayMs={360} />
            <Skeleton className="mt-1.5 h-3 w-[92%] rounded-hz" delayMs={380} />
          </div>
        </div>

        <div
          className={cn(
            'relative order-2 aspect-[16/10] max-h-[240px] w-full overflow-hidden bg-hz-sunken md:max-h-[280px]',
            'lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:aspect-auto lg:h-full lg:max-h-none lg:w-1/2',
          )}
        >
          <Skeleton className="absolute inset-0 rounded-none" delayMs={400} />
        </div>
      </div>
    </section>
  );
}

/** Twin of PropertyTypeGrid horizontal scroll row (6 type cards). */
export function PropertyTypeGridSkeleton() {
  return (
    <div
      className="flex items-stretch gap-3 overflow-hidden"
      role="status"
      aria-label="Loading property types"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'max-md:w-[calc((100%-0.75rem)/2.2)] max-md:min-w-[132px] max-md:shrink-0',
            'md:min-w-[140px] md:flex-1 md:shrink-0',
          )}
        >
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2.5 rounded-hz border border-hz-border bg-hz-elevated px-3 py-4 shadow-hz-sm md:h-[220px] md:gap-6">
            <Skeleton className="h-10 w-10 rounded-md md:h-20 md:w-20" delayMs={i * 40} />
            <Skeleton className="h-4 w-20 rounded-hz" delayMs={i * 40 + 20} />
            <Skeleton className="h-3 w-16 rounded-hz" delayMs={i * 40 + 35} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationCardSkeleton({ variant, delayMs = 0 }: { variant: 'wide' | 'square'; delayMs?: number }) {
  return (
    <div aria-hidden="true">
      <Skeleton
        className={cn(
          'w-full rounded-hz',
          'h-[calc((100cqw-1.25rem)/2)] lg:h-[calc((100cqw-3.75rem)/4)]',
          variant === 'wide' && 'lg:min-h-[180px]',
        )}
        delayMs={delayMs}
      />
      <div className="mt-4 space-y-1.5">
        <Skeleton className="h-6 w-36 rounded-hz md:h-7 md:w-40" delayMs={delayMs + 30} />
        <Skeleton className="h-4 w-24 rounded-hz" delayMs={delayMs + 50} />
      </div>
    </div>
  );
}

function ExpertiseServiceCardSkeleton({ delayMs = 0 }: { delayMs?: number }) {
  return (
    <div
      className="flex w-full items-center gap-5 overflow-hidden rounded-hz border border-hz-border bg-hz-elevated p-5 shadow-hz-sm md:gap-6 md:p-6"
      aria-hidden="true"
    >
      <Skeleton className="hidden h-[88px] w-20 shrink-0 rounded-md md:block" delayMs={delayMs} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-6 w-40 rounded-hz" delayMs={delayMs + 30} />
        <Skeleton className="h-4 w-full rounded-hz" delayMs={delayMs + 50} />
        <Skeleton className="h-4 w-[88%] rounded-hz" delayMs={delayMs + 65} />
        <Skeleton className="mt-1 h-4 w-36 rounded-hz" delayMs={delayMs + 80} />
      </div>
    </div>
  );
}

function TestimonialCardSkeleton({ delayMs = 0 }: { delayMs?: number }) {
  return (
    <article
      className="flex h-full flex-col rounded-hz border-hz-border bg-hz-elevated p-6 shadow-sm sm:p-7"
      aria-hidden="true"
    >
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="size-3.5 rounded-sm" delayMs={delayMs + i * 10} />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full rounded-hz" delayMs={delayMs + 60} />
        <Skeleton className="h-4 w-full rounded-hz" delayMs={delayMs + 75} />
        <Skeleton className="h-4 w-[92%] rounded-hz" delayMs={delayMs + 90} />
        <Skeleton className="h-4 w-[78%] rounded-hz" delayMs={delayMs + 105} />
      </div>
      <footer className="mt-6 flex items-center gap-3 border-t border-hz-border pt-5">
        <Skeleton className="size-10 shrink-0 rounded-full" delayMs={delayMs + 120} />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Skeleton className="h-4 w-28 rounded-hz" delayMs={delayMs + 140} />
          <Skeleton className="h-3 w-36 rounded-hz" delayMs={delayMs + 155} />
        </div>
      </footer>
    </article>
  );
}

export function HomePropertyTypeSectionSkeleton() {
  return (
    <section className="relative border-t border-hz-line bg-hz-sunken py-16 md:py-20" aria-hidden="true">
      <div className="section-container">
        <div className="flex items-end justify-between gap-6">
          <SectionEyebrowTitle />
          <Skeleton className="hidden h-4 w-28 rounded-hz md:block" delayMs={60} />
        </div>
        <div className="relative mt-7">
          <PropertyTypeGridSkeleton />
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturedSectionSkeleton() {
  return (
    <section className="relative grid grid-cols-1 bg-hz-elevated" aria-hidden="true">
      <div className="section-container relative z-10 col-start-1 row-start-1 py-16 md:py-20">
        <div className="mb-8 flex flex-col items-center justify-center text-center md:mb-12">
          <div className="max-w-3xl">
            <SectionEyebrowTitle centered delayMs={0} />
            <Skeleton className="mx-auto mt-4 h-8 w-full max-w-lg rounded-hz md:h-9" delayMs={80} />
            <Skeleton className="mx-auto mt-2 h-8 w-full max-w-md rounded-hz md:h-9" delayMs={100} />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-4 w-28 rounded-hz" delayMs={120} />
          <Skeleton className="h-10 w-40 rounded-hz" delayMs={140} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertiseSectionSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-hz-sunken py-16 md:py-20" aria-hidden="true">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-3 w-32 rounded-hz" delayMs={0} />
              <Skeleton className="h-9 w-full max-w-[420px] rounded-hz md:h-10" delayMs={30} />
              <Skeleton className="h-4 w-full max-w-[460px] rounded-hz" delayMs={60} />
              <Skeleton className="h-4 w-[92%] max-w-[460px] rounded-hz" delayMs={80} />
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-hz border border-hz-border bg-hz-elevated/95 p-5 sm:grid-cols-4 sm:gap-0 sm:p-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <Skeleton className="h-8 w-16 rounded-hz md:h-9" delayMs={100 + i * 25} />
                  <Skeleton className="h-3 w-20 rounded-hz" delayMs={120 + i * 25} />
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 size-5 shrink-0 rounded-full" delayMs={200 + i * 30} />
                  <Skeleton className="h-4 flex-1 rounded-hz" delayMs={215 + i * 30} />
                </li>
              ))}
            </ul>

            <Skeleton className="h-11 w-44 rounded-hz" delayMs={320} />
          </div>

          <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 lg:mx-0 lg:max-w-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <ExpertiseServiceCardSkeleton key={i} delayMs={i * 50} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationSectionSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-hz-page py-16 md:py-20" aria-hidden="true">
      <div className="section-container relative z-10">
        <div className="mb-8 flex flex-col items-center text-center md:mb-12">
          <SectionEyebrowTitle centered delayMs={0} />
        </div>

        <div className="flex flex-col gap-9">
          <div className="@container grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div className="col-span-2">
              <LocationCardSkeleton variant="wide" delayMs={0} />
            </div>
            <LocationCardSkeleton variant="square" delayMs={40} />
            <LocationCardSkeleton variant="square" delayMs={80} />
          </div>

          <div className="@container grid grid-cols-2 gap-5 lg:grid-cols-4">
            <LocationCardSkeleton variant="square" delayMs={120} />
            <LocationCardSkeleton variant="square" delayMs={160} />
            <div className="col-span-2">
              <LocationCardSkeleton variant="wide" delayMs={200} />
            </div>
          </div>
        </div>

        <CarouselControlsSkeleton className="mt-8" delayMs={240} />
      </div>
    </section>
  );
}

export function HomeBestValueSectionSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-hz-sunken pb-16 pt-16 md:pb-20 md:pt-20" aria-hidden="true">
      <div className="section-container relative z-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-10">
          <SectionEyebrowTitle delayMs={0} />
          <Skeleton className="h-10 w-[104px] shrink-0 rounded-hz" delayMs={60} />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <BestValueCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAgentsSectionSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-hz-sunken py-16 md:py-20" aria-hidden="true">
      <div className="section-container relative z-10">
        <header className="mb-8 text-center md:mb-12">
          <Skeleton className="mx-auto mb-2 h-3 w-24 rounded-hz" delayMs={0} />
          <Skeleton className="mx-auto h-9 w-56 max-w-full rounded-hz md:h-10" delayMs={30} />
          <Skeleton className="mx-auto mt-4 h-4 w-32 rounded-hz" delayMs={60} />
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <AgentCardSkeleton key={i} />
          ))}
        </div>

        <CarouselControlsSkeleton className="mt-8" delayMs={200} />
      </div>
    </section>
  );
}

export function WhatPeopleSaySectionSkeleton() {
  return (
    <section className="relative w-full bg-hz-sunken" aria-hidden="true">
      <div className="relative z-0 isolate overflow-hidden bg-hz-footer pb-44 pt-16 text-center md:pb-56 md:pt-20">
        <div className="section-container relative z-10">
          <Skeleton className="mx-auto mb-2 h-3 w-32 rounded-hz bg-hz-footer-fg/20" delayMs={0} />
          <Skeleton className="mx-auto h-9 w-72 max-w-full rounded-hz bg-hz-footer-fg/20 md:h-10" delayMs={30} />
        </div>
      </div>

      <div className="section-container relative z-20">
        <div className="-mt-28 md:-mt-40">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TestimonialCardSkeleton delayMs={60} />
            <TestimonialCardSkeleton delayMs={120} />
          </div>
        </div>

        <CarouselControlsSkeleton className="mt-8 pb-16 md:pb-20" delayMs={180} />
      </div>
    </section>
  );
}

export function HomeNewsSectionSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-hz-page py-16 md:py-20" aria-hidden="true">
      <div className="section-container relative z-10">
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <header className="text-center sm:text-left">
            <Skeleton className="mb-2 h-3 w-24 rounded-hz sm:mx-0 mx-auto" delayMs={0} />
            <Skeleton className="h-9 w-64 max-w-full rounded-hz sm:mx-0 mx-auto md:h-10" delayMs={30} />
          </header>
          <Skeleton className="h-4 w-32 shrink-0 rounded-hz" delayMs={60} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full homepage shell for route transitions & SPA cold load — mirrors HomeView section order. */
export function HomePageSkeleton() {
  return (
    <main id="main-content" className="animate-in fade-in duration-300">
      <HeroSectionSkeleton />
      <HomePropertyTypeSectionSkeleton />
      <HomeFeaturedSectionSkeleton />
      <ExpertiseSectionSkeleton />
      <LocationSectionSkeleton />
      <HomeBestValueSectionSkeleton />
      <HomeAgentsSectionSkeleton />
      <WhatPeopleSaySectionSkeleton />
      <HomeNewsSectionSkeleton />
    </main>
  );
}
