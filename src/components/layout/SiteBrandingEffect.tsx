import { useEffect } from 'react';
import { SITE_CONFIG } from '@/data/site-config';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export function SiteBrandingEffect() {
  const { data: siteConfig } = useSiteConfig();

  useEffect(() => {
    const brand = siteConfig?.brand ?? SITE_CONFIG.brand;
    const tagline = siteConfig?.tagline ?? SITE_CONFIG.tagline;
    document.title = `${brand} — ${tagline}`;
  }, [siteConfig?.brand, siteConfig?.tagline]);

  return null;
}
