import type { PropertyDetail } from '@/types';

/**
 * Soft wash only when a distinct lifestyle vertical exists — never re-decode the cover.
 */
export function getPropertyOverviewBackgroundImage(
  property: Pick<PropertyDetail, 'imageUrl' | 'layout1Media'>
): string | null {
  const vertical = property.layout1Media.featureVerticalUrl;
  if (!vertical || vertical === property.imageUrl) return null;
  return vertical;
}
