import type { Property, PropertyWithAgent } from '@/types';

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: 'p1',
    slug: 'casa-lomas-de-machali',
    title: 'Casa Lomas De Machali',
    location: '12 Willow Street, New York, NY',
    price: 750_000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 3, baths: 2, sqft: 2400 },
    imageUrl:
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p2',
    slug: 'villa-one-hyde-park',
    title: 'Villa One Hyde Park',
    location: '72 Knightsbridge, London, UK',
    price: 4200,
    currency: '$',
    status: 'For Rent',
    type: 'Studio',
    specs: { beds: 1, baths: 1, sqft: 480 },
    imageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p3',
    slug: 'hollywood-hills-residence',
    title: 'Hollywood Hills Residence',
    location: '44 Sunset Blvd, Los Angeles, CA',
    price: 1_250_000,
    currency: '$',
    status: 'For Sale',
    type: 'Apartment',
    specs: { beds: 4, baths: 3, sqft: 1820 },
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p4',
    slug: 'office-downtown-la',
    title: 'Office Downtown LA',
    location: '88 Grand Ave, Los Angeles, CA',
    price: 5500,
    currency: '$',
    status: 'For Rent',
    type: 'Office',
    specs: { beds: 0, baths: 2, sqft: 1520 },
    imageUrl:
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p5',
    slug: 'brooklyn-townhouse',
    title: 'Brooklyn Townhouse',
    location: '142 Brooklyn Ave, New York, NY',
    price: 890_000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 4, baths: 3, sqft: 2100 },
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p6',
    slug: 'marina-commercial-loft',
    title: 'Marina Commercial Loft',
    location: '15 Harbor Way, Miami, FL',
    price: 12_500,
    currency: '$',
    status: 'For Rent',
    type: 'Commercial',
    specs: { beds: 0, baths: 1, sqft: 3200 },
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p7',
    slug: 'bel-air-modern-estate',
    title: 'Bel Air Modern Estate',
    location: 'Bel Air, Los Angeles, CA',
    price: 2_100_000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 5, baths: 4, sqft: 4200 },
    imageUrl:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
  {
    id: 'p8',
    slug: 'downtown-studio-suite',
    title: 'Downtown Studio Suite',
    location: '200 Market St, San Francisco, CA',
    price: 2800,
    currency: '$',
    status: 'For Rent',
    type: 'Studio',
    specs: { beds: 1, baths: 1, sqft: 520 },
    imageUrl:
      'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&auto=format&fit=crop&q=70',
    isFeatured: true,
  },
];

export const BEST_VALUE_PROPERTIES: PropertyWithAgent[] = [
  {
    id: 'bv1',
    slug: 'casa-lomas-brooklyn',
    title: 'Casa Lomas De Machali',
    location: '142 Brooklyn Ave, California, New York',
    price: 180_000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 4, baths: 2, sqft: 1200 },
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a1',
      name: 'Jacob Jones',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv2',
    slug: 'villa-hyde-park-london',
    title: 'Villa One Hyde Park',
    location: 'Knightsbridge, London, United Kingdom',
    price: 425_000,
    currency: '$',
    status: 'For Sale',
    type: 'Villa',
    specs: { beds: 3, baths: 2, sqft: 1850 },
    imageUrl:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a2',
      name: 'James Whitfield',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv3',
    slug: 'bel-air-modern-residence',
    title: 'Residence Bel Air Modern',
    location: 'Bel Air, Los Angeles, California',
    price: 310_000,
    currency: '$',
    status: 'For Sale',
    type: 'Townhouse',
    specs: { beds: 5, baths: 4, sqft: 3200 },
    imageUrl:
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&auto=format&fit=crop&q=80',
    agent: {
      id: 'a3',
      name: 'Elena Rodriguez',
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'bv4',
    slug: 'penthouse-azure-coast',
    title: 'Penthouse Azure Coast',
    location: 'Promenade des Anglais, Nice, France',
    price: 2650,
    currency: '$',
    status: 'For Rent',
    type: 'Apartment',
    specs: { beds: 2, baths: 2, sqft: 1450 },
    imageUrl:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    agent: {
      id: 'a4',
      name: 'Marcus Chen',
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  },
];
