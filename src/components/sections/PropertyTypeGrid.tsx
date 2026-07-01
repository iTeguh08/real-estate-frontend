import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROPERTY_TYPE_ITEMS } from '@/data/property-types';
import { useListingFilters } from '@/hooks/useListingFilters';
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
  onClick: () => void;
}

function PropertyTypeCard({ type, count, isActive, onClick }: PropertyTypeCardProps) {
  const Illustration = ILLUSTRATIONS[type];
  const countLabel = count === 1 ? 'Property' : 'Properties';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${type}: ${count} ${countLabel.toLowerCase()}`}
      className={cn(
        'group flex w-full flex-col items-center justify-center gap-6 h-[220px]',
        'rounded-hz border-none px-4 py-4',
        'transition-all duration-300 cursor-pointer focus-visible:outline-none',
        isActive
          ? 'bg-hz-primary text-white shadow-sm'
          : cn(
              'bg-[#F8F8F8] text-hz-dark',
              'hover:bg-hz-primary/[0.07]',
              'focus-visible:bg-[#F0F0F0] focus-visible:ring-2 focus-visible:ring-hz-primary/20'
            )
      )}
    >
      <div className="flex h-[88px] w-full items-center justify-center" aria-hidden="true">
        <Illustration
          className="flex h-full w-full items-center justify-center"
          iconClassName={cn(
            'h-[80px] w-[80px] max-w-none translate-y-0 object-contain transition-[filter,opacity] duration-300',
            isActive ? 'brightness-0 invert' : 'brightness-75 contrast-150'
          )}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3 text-center">
        <span className="font-poppins text-lg font-medium leading-none">{type}</span>
        <span
          className={cn(
            'font-poppins text-[12px] leading-none',
            isActive ? 'text-white/80' : 'text-[#9A9A9A]'
          )}
        >
          {count > 0 ? `${count.toLocaleString()} ${countLabel}` : 'Explore'}
        </span>
      </div>
    </button>
  );
}

export function PropertyTypeGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { filters, setPropertyType } = useListingFilters();

  const scrollByCard = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-type-card]')?.clientWidth ?? 200;
    el.scrollBy({ left: direction === 'next' ? cardWidth + 12 : -(cardWidth + 12), behavior: 'smooth' });
  };

  return (
    <section
      id="properties"
      className="w-full bg-white py-14 md:py-16"
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
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Try Searching For
            </h2>
          </div>

          <Link
            to={{ pathname: routes.home, hash: '#listings' }}
            className="hidden shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1 md:inline-flex"
          >
            See All Types
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
        </div>

        <div className="relative mt-7">
          <button
            type="button"
            onClick={() => scrollByCard('prev')}
            aria-label="Previous property type"
            className="absolute -left-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-hz border border-hz-primary bg-hz-primary text-white transition-colors duration-200 hover:bg-hz-primary/90 md:flex"
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>

          <div
            ref={scrollRef}
            className={cn(
              'flex items-stretch gap-3 overflow-x-auto scroll-smooth',
              'max-md:-mx-5 max-md:px-5',
              'max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-5 max-md:scroll-pr-5',
              'max-md:[&::-webkit-scrollbar]:hidden max-md:scrollbar-none'
            )}
            role="list"
            aria-label="Property types to explore"
          >
            {PROPERTY_TYPE_ITEMS.map((item) => (
              <div
                key={item.type}
                data-type-card
                role="listitem"
                className="max-md:w-[calc((100%-12px)/2)] max-md:min-w-[172px] max-md:max-w-[190px] max-md:shrink-0 max-md:snap-start md:flex-1"
              >
                <PropertyTypeCard
                  type={item.type}
                  count={item.count}
                  isActive={filters.propertyType === item.type}
                  onClick={() =>
                    setPropertyType(filters.propertyType === item.type ? '' : item.type)
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard('next')}
            aria-label="Next property type"
            className="absolute -right-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-hz border border-[#EEEEEE] bg-white text-[#CCCCCC] transition-colors duration-200 hover:bg-[#FAFAFA] md:flex"
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
