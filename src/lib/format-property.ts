import type { Property } from '@/types';

type PriceFields = Pick<Property, 'price' | 'currency' | 'status'>;
type LocationFields = Pick<Property, 'location' | 'street' | 'city' | 'countryCode'>;

/** Prefer structured parts when present; fall back to composed `location` string. */
export function formatPropertyLocation({
  location,
  street,
  city,
  countryCode,
}: LocationFields): string {
  const parts = [street, city].map((part) => part?.trim()).filter(Boolean) as string[];
  const base = parts.join(', ');
  const code = countryCode?.trim();

  if (base && code) return `${base} (${code})`;
  if (base) return base;
  if (code) return `(${code})`;
  return location;
}

export function formatPropertyPrice({ price, currency, status }: PriceFields): string {
  const amount = `${currency}${price.toLocaleString('en-US')}`;
  return status === 'For Rent' ? `${amount} /month` : amount;
}

export function formatPerSqftPrice(property: Property): string {
  const { price, currency, status, specs } = property;

  if (status === 'For Rent') {
    return `${currency}${price.toLocaleString('en-US')} /month`;
  }

  const perSqft = price / specs.sqft;
  return `${currency}${perSqft.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} /sqft`;
}

export function statusLabel(status: Property['status']): string {
  return status.toUpperCase();
}
