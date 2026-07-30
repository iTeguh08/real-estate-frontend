import type { PropertyType } from '@/types';
import { FEATURED_PROPERTIES } from '@/data/properties';

/** Canonical property types — keep in sync with backend Nova / GraphQL PROPERTY_TYPES. */
export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Studio',
  'Townhouse',
  'Office',
  'Commercial',
] as const satisfies readonly PropertyType[];

export const TYPE_SELECT_OPTIONS: Array<{ value: PropertyType | ''; label: string }> = [
  { value: '', label: 'All' },
  ...PROPERTY_TYPES.map((type) => ({ value: type, label: type })),
];

export interface PropertyTypeItem {
  type: PropertyType;
  count: number;
}

function countByType(type: PropertyType): number {
  return FEATURED_PROPERTIES.filter((p) => p.type === type).length;
}

export const PROPERTY_TYPE_ITEMS: PropertyTypeItem[] = PROPERTY_TYPES.map((type) => ({
  type,
  count: countByType(type),
}));
