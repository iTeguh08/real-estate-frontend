import type { Property } from '@/types';

type PriceFields = Pick<Property, 'price' | 'currency' | 'status'>;

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
