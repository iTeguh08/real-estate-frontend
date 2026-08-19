import { describe, expect, it } from 'vitest';
import { navItemHref } from './navigation';

describe('navItemHref', () => {
  it('keeps real paths for prefetchable AppLink', () => {
    expect(navItemHref('/listings?propertyType=Villa')).toBe('/listings?propertyType=Villa');
    expect(navItemHref('#location')).toBe('/#location');
  });
});
