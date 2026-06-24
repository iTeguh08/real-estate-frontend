import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { section, luxuryButton, sectionEyebrow } from '@/lib/cva';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import type { Property } from '@/types';

// ── Stub data (replace with API/prop drilling in production) ───────────────
const STUB_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Casa Lemos By Marchall Homes',
    location: 'Cape Town, South Africa',
    price: 990000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 4, baths: 3, sqft: 3200, garage: 2 },
    imageUrl: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p2',
    title: 'Villa Fold Residence',
    location: 'Cape Town, South Africa',
    price: 810000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 5, baths: 4, sqft: 4100 },
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=70',
    isNew: true,
  },
  {
    id: 'p3',
    title: 'Smiths Fine Home',
    location: 'Cape Town, South Africa',
    price: 599000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 3, baths: 2, sqft: 2200, garage: 1 },
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=70',
  },
  {
    id: 'p4',
    title: 'Symonds Heights Derry',
    location: 'Cape Town, South Africa',
    price: 740000,
    currency: '$',
    status: 'For Rent',
    type: 'Apartment',
    specs: { beds: 2, baths: 2, sqft: 1450 },
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&auto=format&fit=crop&q=70',
  },
  {
    id: 'p5',
    title: 'Cameron Beverly Cottage',
    location: 'Cape Town, South Africa',
    price: 460000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 3, baths: 3, sqft: 1980, garage: 1 },
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=70',
  },
  {
    id: 'p6',
    title: 'Lake View Rooms, Lake Tahoe',
    location: 'Lake Tahoe, Nevada',
    price: 385000,
    currency: '$',
    status: 'For Sale',
    type: 'Apartment',
    specs: { beds: 2, baths: 1, sqft: 1100 },
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=70',
    isNew: true,
  },
  {
    id: 'p7',
    title: 'Alexandros Villa Retreat',
    location: 'Cape Town, South Africa',
    price: 1200000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 6, baths: 5, sqft: 5800, garage: 3 },
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p8',
    title: 'Seaview Hills Townhouse',
    location: 'Cape Town, South Africa',
    price: 680000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 4, baths: 3, sqft: 2900, garage: 2 },
    imageUrl: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=600&auto=format&fit=crop&q=70',
  },
];

interface FeaturedPropertiesProps {
  properties?: Property[];
}

export function FeaturedProperties({ properties = STUB_PROPERTIES }: FeaturedPropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <section
      id="listings"
      className={cn(section({ spacing: 'md', bg: 'cream' }))}
      aria-labelledby="featured-properties-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className={cn(sectionEyebrow(), 'mb-2')}>
              Featured Listings
            </p>
            <h2
              id="featured-properties-heading"
              className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight text-[--color-luxury-dark] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Discover Homeya's Finest<br className="hidden sm:inline" />
              Properties For Your Dream Home
            </h2>
          </div>
          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'outline', size: 'md' }), 'shrink-0 gap-1.5')}
            aria-label="View all properties"
          >
            All Properties
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Featured property listings"
        >
          {properties.map((property) => (
            <div key={property.id} role="listitem" className="h-full">
              <PropertyCard
                property={property}
                variant="grid"
                size="full"
                uniformHeight
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

        {/* Load More CTA */}
        <div className="flex justify-center mt-10">
          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'crimson', size: 'lg' }), 'gap-2')}
            aria-label="View all properties"
          >
            See All Properties
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <ArrowRight size={13} strokeWidth={2} />
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
}
