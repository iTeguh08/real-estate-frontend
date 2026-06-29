import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ApartmentIllustration,
  CommercialIllustration,
  OfficeIllustration,
  StudioIllustration,
  TownhouseIllustration,
  VillaIllustration,
} from '@/components/icons/PropertyTypeIllustrations';
import type { PropertyType } from '@/types';

interface PropertyTypeItem {
  type: PropertyType;
  count: number;
  Illustration: React.ComponentType<{ className?: string; iconClassName?: string }>;
}

const PROPERTY_TYPES: PropertyTypeItem[] = [
  { type: 'Apartment', count: 234, Illustration: ApartmentIllustration },
  { type: 'Villa', count: 234, Illustration: VillaIllustration },
  { type: 'Studio', count: 234, Illustration: StudioIllustration },
  { type: 'Office', count: 234, Illustration: OfficeIllustration },
  { type: 'Townhouse', count: 234, Illustration: TownhouseIllustration },
  { type: 'Commercial', count: 234, Illustration: CommercialIllustration },
];

interface PropertyTypeCardProps {
  item: PropertyTypeItem;
  isActive?: boolean;
  onClick?: (type: PropertyType) => void;
}

function PropertyTypeCard({ item, isActive = false, onClick }: PropertyTypeCardProps) {
  const { type, count, Illustration } = item;

  return (
    <button
      type="button"
      onClick={() => onClick?.(type)}
      aria-pressed={isActive}
      aria-label={`${type}: ${count} properties`}
      className={cn(
        'group flex w-full flex-col items-center justify-center gap-14 h-[220px]',
        'rounded-[4px] border-none px-4 py-4',
        'transition-all duration-300 cursor-pointer',
        isActive
          ? 'bg-hz-primary text-white shadow-sm'
          : 'bg-[#F8F8F8] text-hz-dark hover:bg-[#F0F0F0]'
      )}
    >
      <div className="flex h-14 w-full items-center justify-center overflow-visible" aria-hidden="true">
        <Illustration
          className="flex h-[88px] w-[80px] items-center justify-center"
          iconClassName={cn(
            '!h-[88px] !w-[80px] !max-w-none !translate-y-7',
            isActive ? 'text-white' : 'text-hz-dark'
          )}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3 pt-2 text-center">
        <span className="font-poppins text-lg font-medium leading-none">
          {type}
        </span>
        <span
          className={cn(
            'font-poppins text-[12px] leading-none',
            isActive ? 'text-white/80' : 'text-[#9A9A9A]'
          )}
        >
          {count.toLocaleString()} Property
        </span>
      </div>
    </button>
  );
}

interface PropertyTypeGridProps {
  activeType?: PropertyType;
  onTypeChange?: (type: PropertyType) => void;
}

export function PropertyTypeGrid({ activeType, onTypeChange }: PropertyTypeGridProps) {
  const selectedType = activeType ?? 'Studio';

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

          <a
            href="#listings"
            className="hidden shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1 md:inline-flex"
          >
            See All Types
            <ArrowRight size={14} strokeWidth={1.6} />
          </a>
        </div>

        <div className="relative mt-7">
          <button
            type="button"
            aria-label="Previous property type"
            className="absolute -left-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[3px] border border-hz-primary bg-hz-primary text-white transition-colors duration-200 hover:bg-hz-primary/90 md:flex"
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>

          <div
            className={cn(
              'flex items-stretch gap-3',
              'max-md:-mx-5 max-md:overflow-x-auto max-md:px-5',
              'max-md:snap-x max-md:snap-mandatory max-md:scroll-pl-5 max-md:scroll-pr-5',
              'max-md:[&::-webkit-scrollbar]:hidden max-md:scrollbar-none'
            )}
            role="list"
            aria-label="Property type filter"
          >
            {PROPERTY_TYPES.map((item) => (
              <div
                key={item.type}
                role="listitem"
                className="max-md:w-[calc((100%-12px)/2)] max-md:min-w-[172px] max-md:max-w-[190px] max-md:shrink-0 max-md:snap-start md:flex-1"
              >
                <PropertyTypeCard
                  item={item}
                  isActive={selectedType === item.type}
                  onClick={onTypeChange}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next property type"
            className="absolute -right-11 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[3px] border border-[#EEEEEE] bg-white text-[#CCCCCC] transition-colors duration-200 hover:bg-[#FAFAFA] md:flex"
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
