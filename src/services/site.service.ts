import { SITE_CONFIG } from '@/data/site-config';
import { SITE_FOOTER_FALLBACK, type SiteFooterContent } from '@/data/cms-fallbacks';
import { graphqlFetch, useMockData } from '@/services/graphql-client';

export interface SiteConfig {
  brand: string;
  tagline: string;
  contact: {
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
  };
  footer: SiteFooterContent;
}

interface GlobalContent {
  header?: {
    company_name?: string;
    tagline?: string;
    email?: string;
    phone?: string;
  };
  footer?: {
    description?: string;
    copyright?: string;
    address?: string;
    phone?: string;
    email?: string;
    business_hours?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

function toPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:+${digits}` : '';
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (useMockData()) {
    return {
      brand: SITE_CONFIG.brand,
      tagline: SITE_CONFIG.tagline,
      contact: { ...SITE_CONFIG.contact },
      footer: SITE_FOOTER_FALLBACK,
    };
  }

  const data = await graphqlFetch<{ global: GlobalContent | null }>(`
    query {
      global
    }
  `);

  const header = data.global?.header ?? {};
  const footer = data.global?.footer ?? {};
  const phone = header.phone ?? footer.phone ?? SITE_CONFIG.contact.phone;

  return {
    brand: header.company_name ?? SITE_CONFIG.brand,
    tagline: header.tagline ?? SITE_CONFIG.tagline,
    contact: {
      address: footer.address ?? SITE_CONFIG.contact.address,
      phone,
      phoneHref: toPhoneHref(phone) || SITE_CONFIG.contact.phoneHref,
      email: header.email ?? footer.email ?? SITE_CONFIG.contact.email,
    },
    footer: {
      description: footer.description || SITE_FOOTER_FALLBACK.description,
      copyright: footer.copyright || SITE_FOOTER_FALLBACK.copyright,
      businessHours: footer.business_hours || SITE_FOOTER_FALLBACK.businessHours,
      social: {
        facebook: footer.facebook || SITE_FOOTER_FALLBACK.social.facebook,
        instagram: footer.instagram || SITE_FOOTER_FALLBACK.social.instagram,
        youtube: footer.youtube || SITE_FOOTER_FALLBACK.social.youtube,
      },
    },
  };
}
