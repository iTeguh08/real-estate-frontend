import { apiFetch, useMockData } from '@/services/api-client';

export interface GeoSuggestion {
  label: string;
  street: string;
  city: string;
  country_code: string | null;
  latitude: number;
  longitude: number;
}

interface GeoSearchResponse {
  success: boolean;
  data: GeoSuggestion[];
}

interface GeoReverseResponse {
  success: boolean;
  data: GeoSuggestion | null;
}

const MOCK_SUGGESTIONS: GeoSuggestion[] = [
  {
    label: 'Jakarta, Java, Indonesia',
    street: '',
    city: 'Jakarta',
    country_code: 'ID',
    latitude: -6.1754,
    longitude: 106.8272,
  },
  {
    label: 'Jalan Sudirman, Jakarta, Indonesia',
    street: 'Jalan Sudirman',
    city: 'Jakarta',
    country_code: 'ID',
    latitude: -6.2088,
    longitude: 106.8456,
  },
  {
    label: 'Surabaya, Jawa Timur, Indonesia',
    street: '',
    city: 'Surabaya',
    country_code: 'ID',
    latitude: -7.2575,
    longitude: 112.7521,
  },
  {
    label: 'Bali, Indonesia',
    street: '',
    city: 'Bali',
    country_code: 'ID',
    latitude: -8.4095,
    longitude: 115.1889,
  },
  {
    label: '1 Broadway, New York, United States',
    street: '1 Broadway',
    city: 'New York',
    country_code: 'US',
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    label: 'Orchard Road, Singapore',
    street: 'Orchard Road',
    city: 'Singapore',
    country_code: 'SG',
    latitude: 1.3048,
    longitude: 103.8318,
  },
];

export async function searchLocations(
  query: string,
  countryCode?: string
): Promise<GeoSuggestion[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 180));
    const needle = q.toLowerCase();
    return MOCK_SUGGESTIONS.filter(
      (item) =>
        item.label.toLowerCase().includes(needle) ||
        item.city.toLowerCase().includes(needle) ||
        item.street.toLowerCase().includes(needle)
    );
  }

  const params = new URLSearchParams({ q, limit: '8' });
  // Bias only — backend must not hard-filter by country (blocks ID results when default was US).
  if (countryCode) params.set('country_code', countryCode);

  const response = await apiFetch<GeoSearchResponse>(`/api/geo/search?${params}`);
  return response.data ?? [];
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeoSuggestion | null> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 150));
    return {
      label: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
      street: '',
      city: '',
      country_code: null,
      latitude,
      longitude,
    };
  }

  const params = new URLSearchParams({
    lat: String(latitude),
    lng: String(longitude),
  });

  const response = await apiFetch<GeoReverseResponse>(`/api/geo/reverse?${params}`);
  return response.data ?? null;
}
