import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { section, luxuryButton, sectionEyebrow } from '@/lib/cva';
import { BestValuePropertyCard } from '@/components/cards/BestValuePropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import type { PropertyWithAgent } from '@/types';

const STUB_BEST_VALUE: PropertyWithAgent[] = [
  {
    id: 'bv1',
    title: 'Casa Lomas De Machali Machali',
    location: '142 Brooklyn Ave, California, New York',
    price: 180000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 4, baths: 2, sqft: 1200 },
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a1',
      name: 'Jacob Jones',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv2',
    title: 'Villa One Hyde Park',
    location: 'Knightsbridge, London, United Kingdom',
    price: 425000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 3, baths: 2, sqft: 1850 },
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a2',
      name: 'James Whitfield',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv3',
    title: 'Residence Bel Air Modern',
    location: 'Bel Air, Los Angeles, California',
    price: 310000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 5, baths: 4, sqft: 3200 },
    imageUrl: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&auto=format&fit=crop&q=80',
    agent: {
      id: 'a3',
      name: 'Elena Rodriguez',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv4',
    title: 'Penthouse Azure Coast',
    location: 'Promenade des Anglais, Nice, France',
    price: 265000,
    currency: '$',
    status: 'For Rent',
    type: 'Apartment',
    specs: { beds: 2, baths: 2, sqft: 1450 },
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a4',
      name: 'Marcus Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  },
];

interface BestPropertyValueSectionProps {
  properties?: PropertyWithAgent[];
}

export function BestPropertyValueSection({
  properties = STUB_BEST_VALUE,
}: BestPropertyValueSectionProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithAgent | null>(null);

  return (
    <section
      className={cn(section({ spacing: 'md', bg: 'white' }))}
      aria-labelledby="best-value-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={cn(sectionEyebrow(), 'mb-2')}>
              Top Picks
            </p>
            <h2
              id="best-value-heading"
              className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight tracking-[-0.02em] text-luxury-dark"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Best Property Value
            </h2>
          </div>
          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'outline', size: 'md' }), 'shrink-0 gap-1.5')}
            aria-label="View all best value properties"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>

        <div
          className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-8"
          role="list"
          aria-label="Best property value listings"
        >
          {properties.map((property) => (
            <div key={property.id} className="h-full" role="listitem">
              <BestValuePropertyCard
                property={property}
                onSelect={setSelectedProperty}
              />
            </div>
          ))}
        </div>

        <PropertyDetailDialog
          property={selectedProperty}
          open={selectedProperty !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProperty(null);
          }}
        />

      </div>
    </section>
  );
}
