import { useState } from 'react';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { PropertyDetailDialog } from '@/components/cards/PropertyDetailDialog';
import { cn } from '@/lib/utils';
import type { Property } from '@/types';

const STUB_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Casa Lomas De Machali',
    location: '12 Willow Street, New York, NY',
    price: 7500,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 3, baths: 2, sqft: 600 },
    imageUrl: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p2',
    title: 'Villa One Hyde Park',
    location: '72 Willow Street, New York, NY',
    price: 8200,
    currency: '$',
    status: 'For Sale',
    type: 'Studio',
    specs: { beds: 2, baths: 2, sqft: 480 },
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p3',
    title: 'House Hollywood Hills',
    location: '44 Willow Street, New York, NY',
    price: 6900,
    currency: '$',
    status: 'For Sale',
    type: 'Apartment',
    specs: { beds: 4, baths: 3, sqft: 820 },
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p4',
    title: 'Office Downtown LA',
    location: '88 Willow Street, New York, NY',
    price: 5500,
    currency: '$',
    status: 'For Rent',
    type: 'Office',
    specs: { beds: 2, baths: 1, sqft: 520 },
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p5',
    title: 'Casa Lomas De Machali',
    location: '12 Willow Street, New York, NY',
    price: 7500,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 3, baths: 2, sqft: 600 },
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p6',
    title: 'Villa One Hyde Park',
    location: '72 Willow Street, New York, NY',
    price: 8200,
    currency: '$',
    status: 'For Sale',
    type: 'Studio',
    specs: { beds: 2, baths: 2, sqft: 480 },
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p7',
    title: 'House Hollywood Hills',
    location: '44 Willow Street, New York, NY',
    price: 6900,
    currency: '$',
    status: 'For Sale',
    type: 'Apartment',
    specs: { beds: 4, baths: 3, sqft: 820 },
    imageUrl: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p8',
    title: 'Office Downtown LA',
    location: '88 Willow Street, New York, NY',
    price: 5500,
    currency: '$',
    status: 'For Rent',
    type: 'Office',
    specs: { beds: 2, baths: 1, sqft: 520 },
    imageUrl: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
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
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="featured-properties-heading"
    >
      <div className="section-container">

        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Featured Listings
            </p>
            <h2
              id="featured-properties-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Discover Homeya&apos;s Finest Properties
              <br className="hidden sm:inline" />
              For Your Dream Home
            </h2>
          </div>
        </div>

        <div
          className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4"
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
                className="rounded-[3px]"
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

        <div className="mt-12 flex justify-center">
          <a
            href="#listings"
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-[3px] border-none bg-hz-primary px-8 py-3',
              'font-poppins text-sm font-semibold text-white no-underline outline-none',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
            aria-label="View all properties"
          >
            View All Properties
          </a>
        </div>

      </div>
    </section>
  );
}
