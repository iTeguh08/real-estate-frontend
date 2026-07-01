import type { PropertyType } from '@/types';
import { FEATURED_PROPERTIES } from '@/data/properties';

export interface PropertyTypeItem {
  type: PropertyType;
  count: number;
}

function countByType(type: PropertyType): number {
  return FEATURED_PROPERTIES.filter((p) => p.type === type).length;
}

export const PROPERTY_TYPE_ITEMS: PropertyTypeItem[] = (
  ['Apartment', 'Villa', 'Studio', 'Office', 'Townhouse', 'Commercial'] as const
).map((type) => ({
  type,
  count: countByType(type),
}));
