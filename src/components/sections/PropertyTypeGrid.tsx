import { useCallback, useEffect, useRef, useState } from 'react';
import { AppLink } from '@/lib/app-link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { PROPERTY_TYPE_ITEMS } from '@/data/property-types';
import { usePropertyTypeCountsQuery } from '@/hooks/queries';
import { useListingFilters } from '@/hooks/useListingFilters';
import { formatCount } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import {
  ApartmentIllustration,
  CommercialIllustration,
  OfficeIllustration,
  StudioIllustration,
  TownhouseIllustration,
  VillaIllustration,
} from '@/components/icons/PropertyTypeIllustrations';
import type { PropertyType } from '@/types';

const DEFAULT_HIGHLIGHT_TYPE = 'Apartment' satisfies PropertyType;
/** Desktop shows up to this many cards without overflow; arrows only when more. */
const VISIBLE_DESKTOP_COUNT = 6;

const ILLUSTRATIONS: Record<
  PropertyType,
  React.ComponentType<{ className?: string; iconClassName?: string }>
> = {
  Apartment: ApartmentIllustration,
  Villa: VillaIllustration,
  Studio: StudioIllustration,
  Office: OfficeIllustration,
  Townhouse: TownhouseIllustration,
  Commercial: CommercialIllustration,
};

interface PropertyTypeCardProps {
  type: PropertyType;
  count: number;
  isActive: boolean;
  ringOffsetClass: string;
  onClick: () => void;
}

function PropertyTypeCard({
  type,
  count,
  isActive,
  ringOffsetClass,
  onClick,
}: PropertyTypeCardProps) {
  const Illustration = ILLUSTRATIONS[type];
  const countLabel = count === 1 ? 'Property' : 'Properties';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${type}: ${count} ${countLabel.toLowerCase()}`}
      className={cn(
        'group flex h-auto min-h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-2.5',
        'rounded-hz px-3 py-4 focus-visible:outline-none md:h-[220px] md:gap-6 md:px-4 md:py-4',
        isActive
          ? 'border border-hz-primary bg-hz-primary text-white shadow-hz-sm'
          : cn(
              'border border-hz-border bg-hz-elevated text-hz-ink shadow-hz-sm',
              'hover:border-hz-primary/35',
              'focus-visible:ring-2 focus-visible:ring-hz-primary/20 focus-visible:ring-offset-2',
              ringOffsetClass
            )
      )}
    >
      <div
        className="flex h-11 w-full items-center justify-center md:h-[88px]"
        aria-hidden="true"
      >
        <Illustration
          className="flex h-full w-full items-center justify-center"
          iconClassName={cn(
            'h-10 w-10 max-w-none translate-y-0 object-contain md:h-[80px] md:w-[80px]',
            isActive ? 'hz-raster-icon-on-primary' : 'hz-raster-icon-on-surface'
          )}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-1.5 text-center md:gap-3">
        <span className="font-poppins text-[15px] font-semibold leading-none md:text-lg">{type}</span>
        <span
          className={cn(
            'font-poppins text-[12px] leading-none',
            isActive ? 'text-white/80' : 'text-hz-body'
          )}
        >
          {count > 0 ? `${formatCount(count)} ${countLabel}` : 'Explore'}
        </span>
      </div>
    </button>
  );
}

export function PropertyTypeGrid() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { filters, setPropertyType } = useListingFilters();
  const { data: typeItems = PROPERTY_TYPE_ITEMS } = usePropertyTypeCountsQuery();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const needsDesktopScroll = typeItems.length > VISIBLE_DESKTOP_COUNT;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 1);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !needsDesktopScroll) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [needsDesktopScroll, typeItems.length, updateScrollState]);

  const isCardActive = (type: PropertyType) =>
    filters.propertyType ? filters.propertyType === type : type === DEFAULT_HIGHLIGHT_TYPE;

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-type-card]');
    const gap = 12; // gap-3
    const amount = (card?.offsetWidth ?? 200) + gap;
    el.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="properties"
      className={cn(
        'relative w-full py-16 md:py-20',
        isLight ? 'border-t border-hz-line bg-hz-sunken' : 'border-t border-hz-line/55 bg-hz-page'
      )}
      aria-labelledby="property-type-heading"
    >
      <div className="section-container">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Property Type
            </p>
            <h2
              id="property-type-heading"
              className="font-poppins hz-h2 font-semibold leading-[1.2] tracking-[-0.3px] text-hz-ink"
            >
              Try Searching For
            </h2>
          </div>

          <AppLink
            to={routes.listings}
            className="hidden shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1 md:inline-flex"
          >
            See All Types
            <ArrowRight size={14} strokeWidth={1.6} />
          </AppLink>
        </div>

        <div className="relative mt-7">
          {needsDesktopScroll && (
            <button
              type="button"
              onClick={() => scrollByAmount('prev')}
              disabled={!canScrollPrev}
              aria-label="Scroll property types left"
              className={cn(
                'absolute -left-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-hz border transition-colors duration-200 md:flex',
                canScrollPrev
                  ? 'cursor-pointer border-hz-primary bg-hz-primary text-white hover:bg-hz-primary/90'
                  : 'cursor-not-allowed border-hz-border bg-hz-elevated text-hz-muted'
              )}
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
          )}

          <div
            ref={scrollRef}
            className={cn(
              'flex items-stretch gap-3 overflow-x-auto scroll-smooth',
              'max-md:section-bleed-x',
              'max-md:snap-x max-md:snap-proximity',
              'max-md:[&::-webkit-scrollbar]:hidden max-md:scrollbar-none',
              needsDesktopScroll && 'md:[&::-webkit-scrollbar]:hidden md:scrollbar-none'
            )}
            role="list"
            aria-label="Property types to explore"
          >
            {typeItems.map((item) => (
              <div
                key={item.type}
                data-type-card
                role="listitem"
                className={cn(
                  // Mobile: 2 cards + ~20% peek of the next (swipe affordance)
                  'max-md:w-[calc((100%-0.75rem)/2.2)] max-md:min-w-[132px] max-md:shrink-0 max-md:snap-start',
                  needsDesktopScroll
                    ? 'md:w-[calc((100%-60px)/6)] md:min-w-[140px] md:shrink-0'
                    : 'md:flex-1'
                )}
              >
                <PropertyTypeCard
                  type={item.type}
                  count={item.count}
                  isActive={isCardActive(item.type)}
                  ringOffsetClass={isLight ? 'focus-visible:ring-offset-hz-sunken' : 'focus-visible:ring-offset-hz-page'}
                  onClick={() =>
                    setPropertyType(filters.propertyType === item.type ? '' : item.type)
                  }
                />
              </div>
            ))}
          </div>

          {needsDesktopScroll && (
            <button
              type="button"
              onClick={() => scrollByAmount('next')}
              disabled={!canScrollNext}
              aria-label="Scroll property types right"
              className={cn(
                'absolute -right-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-hz border transition-colors duration-200 md:flex',
                canScrollNext
                  ? 'cursor-pointer border-hz-primary bg-hz-primary text-white hover:bg-hz-primary/90'
                  : 'cursor-not-allowed border-hz-border bg-hz-elevated text-hz-muted'
              )}
            >
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
