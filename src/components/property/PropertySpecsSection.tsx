import {
  Car,
  CheckCircle,
  Dog,
  Elevator,
  Lightning,
  Package,
  ShieldCheck,
  Snowflake,
  WifiHigh,
  type Icon,
} from '@phosphor-icons/react';
import type { PropertyDetail } from '@/types';

export interface PropertySpecsSectionProps {
  property: PropertyDetail;
}

interface AmenityItem {
  key: string;
  label: string;
  Icon: Icon;
}

function iconForAmenity(label: string): Icon {
  const n = label.toLowerCase();
  if (n.includes('garage') || n.includes('parking')) return Car;
  if (n.includes('climate') || n.includes('air') || n.includes('hvac') || n.includes('heat')) return Snowflake;
  if (n.includes('storage') || n.includes('package')) return Package;
  if (n.includes('security') || n.includes('gated') || n.includes('doorman')) return ShieldCheck;
  if (n.includes('internet') || n.includes('wifi') || n.includes('smart')) return WifiHigh;
  if (n.includes('elevator') || n.includes('lift')) return Elevator;
  if (n.includes('pet')) return Dog;
  if (n.includes('charg') || n.includes('electric')) return Lightning;
  return CheckCircle;
}

function buildAmenityItems(amenities: string[], garage: number | null | undefined): AmenityItem[] {
  const items: AmenityItem[] = amenities.map((label) => ({
    key: label,
    label,
    Icon: iconForAmenity(label),
  }));

  if (typeof garage === 'number' && garage > 0) {
    const garageLabel = garage === 1 ? 'Garage' : `${garage}-car garage`;
    if (!items.some((item) => item.label.toLowerCase().includes('garage'))) {
      items.push({ key: '__garage__', label: garageLabel, Icon: Car });
    }
  }

  return items;
}

/**
 * Amenities & extras — inline, minimal row. Core specs live once in Overview.
 */
export function PropertySpecsSection({ property }: PropertySpecsSectionProps) {
  const { specs, amenities } = property;
  const items = buildAmenityItems(amenities, specs.garage);

  if (items.length === 0) {
    return null;
  }

  if (items.length === 1 && items[0].key === '__garage__' && amenities.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="property-specs-heading" className="bg-hz-sunken pt-10 pb-5 md:pt-12 md:pb-6">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="hz-eyebrow mb-2 text-hz-primary">
            Property Details
          </p>
          <h2
            id="property-specs-heading"
            className="hz-section-title text-hz-dark"
          >
            Amenities &amp; extras
          </h2>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" role="list">
            {items.map((item) => (
              <li key={item.key} className="inline-flex items-center gap-2">
                <item.Icon size={17} weight="fill" className="shrink-0 text-hz-primary" aria-hidden="true" />
                <span className="font-poppins text-sm text-hz-body">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
