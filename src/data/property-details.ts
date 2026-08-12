import { resolveListingAgent } from '@/lib/listing-agent';
import type { Property, PropertyDetail, PropertyGalleryImage } from '@/types';
import { PROPERTY_GALLERY_COUNT } from '@/lib/property-gallery';
import { originalImage, sizedImage } from '@/lib/image-url';

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&auto=format&fit=crop&q=75',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=75',
];

/** Exactly {@link PROPERTY_GALLERY_COUNT} tiles for two identical 4-image bento pages. */
function galleryFromSeed(seed: number, title: string): PropertyGalleryImage[] {
  return Array.from({ length: PROPERTY_GALLERY_COUNT }, (_, offset) => {
    const idx = (seed + offset) % GALLERY_POOL.length;
    const source = GALLERY_POOL[idx]!;
    return {
      id: `g-${seed}-${offset}`,
      url: sizedImage(source, 800),
      originalUrl: originalImage(source),
      alt: `${title} — gallery view ${offset + 1}`,
    };
  });
}

const DETAIL_COPY: Record<
  string,
  Pick<
    PropertyDetail,
    'description' | 'tagline' | 'features' | 'amenities' | 'relatedPropertyIds'
  >
> = {
  p1: {
    tagline: 'Architectural Living in Machali',
    description:
      'Casa Lomas De Machali blends indoor-outdoor living with panoramic views, refined finishes, and generous entertaining spaces designed for modern family life.',
    features: [
      'Floor-to-ceiling glazing with mountain views',
      'Chef-grade kitchen with stone island',
      'Primary suite with walk-in wardrobe',
      'Landscaped terrace and pool deck',
    ],
    amenities: ['Central air', 'Smart home', 'Security system', 'Two-car garage', 'Pool'],
    relatedPropertyIds: ['p7', 'p5', 'p3'],
  },
  p2: {
    tagline: 'Knightsbridge Elegance',
    description:
      'A meticulously appointed studio in one of London\'s most prestigious addresses, offering hotel-style services and immediate access to Hyde Park.',
    features: [
      'Concierge and 24-hour security',
      'Custom built-ins maximizing space',
      'Marble bathroom with rain shower',
      'Premium appliance package',
    ],
    amenities: ['Concierge', 'Gym access', 'Underground parking', 'Climate control'],
    relatedPropertyIds: ['p8', 'p3', 'p4'],
  },
  p3: {
    tagline: 'Sunset Strip Views',
    description:
      'Hollywood Hills Residence captures golden-hour light across an open-plan layout, private balconies, and designer interiors throughout.',
    features: [
      'Open-plan living with city views',
      'Wraparound balcony',
      'Designer kitchen and dining zone',
      'Dedicated home office nook',
    ],
    amenities: ['Doorman', 'Rooftop access', 'In-unit laundry', 'EV charging'],
    relatedPropertyIds: ['p7', 'p1', 'p5'],
  },
  p4: {
    tagline: 'Downtown Professional Hub',
    description:
      'A light-filled office suite in the heart of downtown LA with flexible floor plates, conference facilities, and premium building amenities.',
    features: [
      'Corner suite with natural light',
      'Private conference room',
      'Fiber-ready infrastructure',
      'Shared lounge and kitchen',
    ],
    amenities: ['24/7 access', 'On-site parking', 'High-speed internet', 'Building security'],
    relatedPropertyIds: ['p6', 'p8', 'p2'],
  },
  p5: {
    tagline: 'Brooklyn Brownstone Charm',
    description:
      'A restored townhouse pairing original details with contemporary upgrades, steps from parks, dining, and transit.',
    features: [
      'Original millwork and fireplaces',
      'Garden-level family room',
      'Renovated chef\'s kitchen',
      'Private rear garden',
    ],
    amenities: ['Radiant heat', 'Wine cellar', 'Laundry room', 'Storage'],
    relatedPropertyIds: ['p1', 'p3', 'p7'],
  },
  p6: {
    tagline: 'Harbor District Commercial',
    description:
      'Marina Commercial Loft offers soaring ceilings, exposed structure, and flexible zoning ideal for creative studios or flagship retail.',
    features: [
      'Double-height main floor',
      'Loading access',
      'Exposed brick and timber',
      'Optional mezzanine build-out',
    ],
    amenities: ['Freight elevator', 'Sprinkler system', 'ADA access', 'Signage rights'],
    relatedPropertyIds: ['p4', 'p8', 'p2'],
  },
  p7: {
    tagline: 'Bel Air Contemporary Estate',
    description:
      'An architectural estate with resort-style grounds, infinity pool, and seamless transitions between entertaining and private wings.',
    features: [
      'Infinity-edge pool and spa',
      'Home theater and wine room',
      'Guest casita',
      'Smart climate zones',
    ],
    amenities: ['Pool & spa', 'Smart home', 'Gated entry', 'Four-car garage', 'Landscaping'],
    relatedPropertyIds: ['p1', 'p3', 'p5'],
  },
  p8: {
    tagline: 'Market Street Urban Living',
    description:
      'A bright downtown studio with efficient layout, building amenities, and walkable access to transit, cafes, and tech corridors.',
    features: [
      'Murphy bed with integrated storage',
      'Quartz kitchenette',
      'Floor-to-ceiling windows',
      'Building rooftop deck',
    ],
    amenities: ['Fitness center', 'Package room', 'Bike storage', 'Pet friendly'],
    relatedPropertyIds: ['p2', 'p4', 'p6'],
  },
  bv1: {
    tagline: 'Value Meets Character',
    description:
      'An approachable villa offering strong square-footage value, updated systems, and a layout ready for personalization.',
    features: ['Updated electrical and plumbing', 'Large rear yard', 'Open living plan'],
    amenities: ['Central air', 'Driveway parking', 'Patio'],
    relatedPropertyIds: ['p1', 'p5', 'bv3'],
  },
  bv2: {
    tagline: 'International Investment',
    description:
      'A well-positioned villa near Knightsbridge with rental upside and classic proportions throughout.',
    features: ['High ceilings', 'Period facade', 'Separate utility room'],
    amenities: ['Gas heating', 'Storage', 'Near transit'],
    relatedPropertyIds: ['p2', 'p7', 'bv4'],
  },
  bv3: {
    tagline: 'Modern Townhouse Living',
    description:
      'Residence Bel Air Modern pairs contemporary lines with a family-friendly floor plan and abundant natural light.',
    features: ['Skylit stairwell', 'Primary balcony', 'Built-in workstations'],
    amenities: ['Solar panels', 'Smart locks', 'Two-car garage'],
    relatedPropertyIds: ['p7', 'p3', 'bv1'],
  },
  bv4: {
    tagline: 'Coastal Rental Gem',
    description:
      'Penthouse Azure Coast delivers sea breezes, an open terrace, and premium finishes along the French Riviera.',
    features: ['Sea-view terrace', 'Marble baths', 'Open kitchen-living'],
    amenities: ['Concierge', 'Pool access', 'Underground parking'],
    relatedPropertyIds: ['p8', 'p2', 'bv2'],
  },
};

function seedFromId(id: string): number {
  return id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

/** Wraps around gallery so every mock slot resolves to a real image. */
function pickGallery(gallery: PropertyGalleryImage[], index: number): PropertyGalleryImage {
  return gallery[index % gallery.length]!;
}

export function enrichPropertyDetail(property: Property): PropertyDetail {
  const seed = seedFromId(property.id);
  const copy = DETAIL_COPY[property.id];
  const gallery = galleryFromSeed(seed, property.title);
  const g1 = pickGallery(gallery, 1);
  const g2 = pickGallery(gallery, 2);
  const g3 = pickGallery(gallery, 3);

  return {
    ...property,
    tagline: copy?.tagline ?? `Discover ${property.title}`,
    description:
      copy?.description ??
      `Explore ${property.title} in ${property.location}. A ${property.type.toLowerCase()} offering ${property.specs.beds} bedrooms and ${property.specs.sqft.toLocaleString()} sq ft of living space.`,
    gallery,
    layout1Media: {
      showcaseOneUrl: g1.url,
      showcaseOneUrlOriginal: g1.originalUrl ?? null,
      showcaseTwoUrl: g2.url,
      showcaseTwoUrlOriginal: g2.originalUrl ?? null,
      showcaseThreeUrl: g3.url,
      showcaseThreeUrlOriginal: g3.originalUrl ?? null,
      featureVerticalUrl: g1.url,
      featureVerticalUrlOriginal: g1.originalUrl ?? null,
      featureSquareUrl: g2.url,
      featureSquareUrlOriginal: g2.originalUrl ?? null,
      bannerUrl: g3.url,
      bannerUrlOriginal: g3.originalUrl ?? null,
    },
    layout2Media: {
      splitVerticalUrl: g1.url,
      splitVerticalUrlOriginal: g1.originalUrl ?? null,
      splitLandscapeUrl: g2.url,
      splitLandscapeUrlOriginal: g2.originalUrl ?? null,
      bannerUrl: g3.url,
      bannerUrlOriginal: g3.originalUrl ?? null,
    },
    features: copy?.features ?? [
      'Thoughtfully planned layout',
      'Quality finishes throughout',
      'Convenient location',
      'Move-in ready',
    ],
    amenities: copy?.amenities ?? ['Climate control', 'Storage', 'Parking'],
    relatedPropertyIds: copy?.relatedPropertyIds,
    agent: resolveListingAgent(property),
  };
}
