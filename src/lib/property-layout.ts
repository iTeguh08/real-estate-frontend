import type { Property, PropertyCustomLayout } from '@/types';

/**
 * Resolves which property detail template to render from CMS `customLayout`.
 * Defaults to layout-1; Villa type still falls back to layout-2 only when the
 * CMS field is empty (legacy rows).
 */
export function resolvePropertyCustomLayout(
  property: Pick<Property, 'type' | 'customLayout'>
): PropertyCustomLayout {
  return property.customLayout ?? (property.type === 'Villa' ? 'layout-2' : 'layout-1');
}

/** Horizontal gutters for property detail hero backgrounds (layout 1 & 2). */
export const VILLA_SECTION_GUTTERS =
  'px-5 md:px-10 lg:px-16 xl:px-20 2xl:px-24';
