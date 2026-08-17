import { filtersToSearchParams } from '@/lib/listing-filter-params';
import { absoluteUrl } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import type { ListingFilters } from '@/types';

function statusLabelId(status: ListingFilters['status']): string {
  switch (status) {
    case 'For Sale':
      return 'Dijual';
    case 'For Rent':
      return 'Disewa';
    case 'Off Plan':
      return 'Off Plan';
    case 'Sold':
      return 'Terjual';
    default:
      return '';
  }
}

export function buildListingsSeo(filters: ListingFilters): {
  title: string;
  description: string;
  canonical: string;
} {
  const typePart = filters.propertyType || 'Properti';
  const statusPart = statusLabelId(filters.status);
  const locationPart = filters.location.trim();
  const keywordPart = filters.keyword.trim();

  const headline = [typePart, statusPart, locationPart ? `di ${locationPart}` : '']
    .filter(Boolean)
    .join(' ');

  const title = `${headline || 'Properti'} | Homzen`;

  const intentBits = [
    statusPart ? statusPart.toLowerCase() : 'dijual & disewa',
    filters.propertyType ? filters.propertyType.toLowerCase() : 'rumah, villa, dan apartemen',
    locationPart ? `di ${locationPart}` : '',
    keywordPart ? `untuk “${keywordPart}”` : '',
  ].filter(Boolean);

  const description = `Temukan ${intentBits.join(' ')} di Homzen. Filter berdasarkan tipe, harga, kamar, dan lokasi.`;

  const qs = filtersToSearchParams(filters).toString();
  const path = qs ? `${routes.listings}?${qs}` : routes.listings;
  const canonical = absoluteUrl(path) || path;

  return { title, description, canonical };
}
