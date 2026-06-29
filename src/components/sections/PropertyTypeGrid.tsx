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
        'group flex w-full flex-col items-center justify-center gap-14',
        'h-[160px] md:h-[200px] rounded-[4px] border-2 px-4 py-4',
        'transition-all duration-300 cursor-pointer',
        isActive
          ? 'bg-hz-primary border-hz-primary text-white shadow-sm'
          : 'bg-white border-hz-border text-hz-dark hover:border-hz-primary'
      )}
    >
      <div className="flex h-14 w-full items-center justify-center" aria-hidden="true">
        <Illustration
          className="h-full w-full"
          iconClassName={isActive ? 'text-white' : 'text-hz-dark'}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-3 text-center">
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
            className="hidden shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1 md:flex"
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

          <div className="flex items-stretch gap-3" role="list" aria-label="Property type filter">
            {PROPERTY_TYPES.map((item) => (
              <div key={item.type} role="listitem" className="flex-1">
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
