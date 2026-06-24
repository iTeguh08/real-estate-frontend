import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { section, sectionEyebrow } from '@/lib/cva';
import {
  TownhouseIllustration,
  VillaIllustration,
  ApartmentIllustration,
  OfficeIllustration,
  CommercialIllustration,
} from '@/components/icons/PropertyTypeIllustrations';
import type { PropertyType } from '@/types';

interface PropertyTypeItem {
  type: PropertyType;
  count: number;
  Illustration: React.ComponentType<{ className?: string; strokeClassName?: string }>;
}

const PROPERTY_TYPES: PropertyTypeItem[] = [
  { type: 'Townhouse', count: 204, Illustration: TownhouseIllustration },
  { type: 'Villa', count: 188, Illustration: VillaIllustration },
  { type: 'Apartment', count: 643, Illustration: ApartmentIllustration },
  { type: 'Office', count: 97, Illustration: OfficeIllustration },
  { type: 'Commercial', count: 73, Illustration: CommercialIllustration },
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
        'group flex w-full flex-col items-center justify-between gap-5',
        'rounded-xl border px-5 py-8 sm:px-6 sm:py-9 lg:px-7 lg:py-10',
        'min-h-[196px] sm:min-h-[220px] lg:min-h-[248px]',
        'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer',
        isActive
          ? 'bg-luxury-crimson border-luxury-crimson text-white shadow-md'
          : 'bg-white border-luxury-border text-luxury-dark hover:border-luxury-crimson/35 hover:shadow-sm'
      )}
    >
      {/* Illustration — dominant visual, ~45% of card height */}
      <div
        className="flex h-24 w-full items-center justify-center sm:h-28 lg:h-32"
        aria-hidden="true"
      >
        <Illustration
          className="h-full w-auto max-w-[108px] sm:max-w-[120px] lg:max-w-[132px]"
          strokeClassName={isActive ? 'stroke-white' : undefined}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-1.5 text-center">
        <span className="font-sans text-[15px] font-semibold tracking-[-0.01em] sm:text-base">
          {type}
        </span>
        <span
          className={cn(
            'font-sans text-[11px] uppercase tracking-[0.14em]',
            isActive ? 'text-white/75' : 'text-luxury-muted'
          )}
        >
          {count.toLocaleString()} Properties
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
  return (
    <section
      id="properties"
      className={cn(section({ spacing: 'md', bg: 'cream' }))}
      aria-labelledby="property-type-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header row */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className={cn(sectionEyebrow(), 'mb-2')}>
              Property Type
            </p>
            <h2
              id="property-type-heading"
              className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-light leading-tight tracking-[-0.02em] text-luxury-dark"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Try Searching For
            </h2>
          </div>

          <a
            href="#listings"
            className="hidden shrink-0 items-center gap-1.5 font-sans text-sm text-luxury-dark/60 transition-colors duration-200 hover:text-luxury-crimson md:flex"
          >
            See All Types
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>

        {/* Desktop: full-width fitted grid · Mobile: horizontal scroll */}
        <div
          className={cn(
            'gap-4 lg:gap-5',
            'flex overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory',
            'lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0'
          )}
          role="list"
          aria-label="Property type filter"
        >
          {PROPERTY_TYPES.map((item) => (
            <div
              key={item.type}
              role="listitem"
              className="w-[min(72vw,220px)] shrink-0 snap-start lg:w-full lg:shrink"
            >
              <PropertyTypeCard
                item={item}
                isActive={activeType === item.type}
                onClick={onTypeChange}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
