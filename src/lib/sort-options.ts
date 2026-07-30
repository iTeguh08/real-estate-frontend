import type { PropertySort } from '@/types';

export const SORT_OPTIONS: { value: PropertySort | ''; label: string }[] = [
  { value: '', label: 'Featured first' },
  { value: 'NEWEST', label: 'Newest' },
  { value: 'PRICE_ASC', label: 'Price: Low to High' },
  { value: 'PRICE_DESC', label: 'Price: High to Low' },
];

export function sortLabel(sort: PropertySort | ''): string {
  return SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Featured first';
}
