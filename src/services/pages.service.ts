import {
  ABOUT_PAGE_FALLBACK,
  CONTACT_PAGE_FALLBACK,
  HOMEPAGE_FALLBACK,
  COOKIE_PAGE_FALLBACK,
  PRIVACY_PAGE_FALLBACK,
  TERMS_PAGE_FALLBACK,
  type AboutPageContent,
  type CmsSeoMeta,
  type ContactPageContent,
  type HomepageContent,
  type HomepageExpertiseItem,
  type PrivacyPageContent,
} from '@/data/cms-fallbacks';
import { graphqlFetch, isMockDataEnabled } from '@/services/graphql-client';

type FlexibleItem = Record<string, unknown> | { attributes?: Record<string, unknown> };

const PAGE_SEO_SELECTION = `
  content
  seo {
    metaTitle
    metaDescription
    canonicalUrl
    ogImage
  }
`;

function normalizeItems(items: unknown): Record<string, string>[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item): item is FlexibleItem => typeof item === 'object' && item !== null)
    .map((item) => {
      const attrs = 'attributes' in item && item.attributes ? item.attributes : item;
      return Object.fromEntries(
        Object.entries(attrs).map(([key, value]) => [key, String(value ?? '')])
      );
    });
}

function nestedItems(parent: unknown, key: string): Record<string, string>[] {
  if (!parent || typeof parent !== 'object') {
    return [];
  }

  const section = (parent as Record<string, unknown>)[key];
  if (Array.isArray(section)) {
    return normalizeItems(section);
  }

  if (section && typeof section === 'object') {
    return normalizeItems((section as Record<string, unknown>).items);
  }

  return [];
}

function toPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:+${digits}` : '';
}

function parsePageContent(raw: unknown): Record<string, unknown> | null {
  if (raw == null) return null;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') {
    return raw as Record<string, unknown>;
  }
  return null;
}

function parseSeo(raw: Partial<CmsSeoMeta> | null | undefined, fallback: CmsSeoMeta): CmsSeoMeta {
  const metaTitle = raw?.metaTitle?.trim() || '';
  const metaDescription = raw?.metaDescription?.trim() || '';
  return {
    // SEOptimer: title 50–60, description 120–160 — keep CMS only when long enough.
    metaTitle: metaTitle.length >= 50 ? metaTitle : fallback.metaTitle,
    metaDescription: metaDescription.length >= 120 ? metaDescription : fallback.metaDescription,
    canonicalUrl: raw?.canonicalUrl?.trim() || fallback.canonicalUrl,
    ogImage: raw?.ogImage?.trim() || fallback.ogImage,
  };
}

function homepageSeoFallback(content: HomepageContent): CmsSeoMeta {
  const fromCmsFallback = HOMEPAGE_FALLBACK.seo;
  return {
    metaTitle: fromCmsFallback?.metaTitle || `Homzen — ${content.hero.headline.replace(/\n/g, ' ')}`,
    metaDescription: fromCmsFallback?.metaDescription || content.hero.subheadline,
    canonicalUrl: '',
    ogImage: content.hero.backgroundImage || fromCmsFallback?.ogImage || '',
  };
}

function parseAboutPage(raw: Record<string, unknown> | null): AboutPageContent {
  const hero = (raw?.hero as Record<string, string>) ?? {};
  const mission = (raw?.mission as Record<string, unknown>) ?? {};
  const services = (raw?.services as Record<string, unknown>) ?? {};
  const timeline = (raw?.timeline as Record<string, unknown>) ?? {};
  const cta = (raw?.cta as Record<string, string>) ?? {};

  return {
    hero: {
      eyebrow: hero.eyebrow ?? ABOUT_PAGE_FALLBACK.hero.eyebrow,
      headline: hero.headline ?? ABOUT_PAGE_FALLBACK.hero.headline,
      description: hero.description ?? ABOUT_PAGE_FALLBACK.hero.description,
      image: hero.image || ABOUT_PAGE_FALLBACK.hero.image,
    },
    stats: normalizeItems((raw?.stats as Record<string, unknown>)?.items ?? raw?.stats).map(
      (item) => ({
        value: item.value ?? '',
        label: item.label ?? '',
      })
    ).filter((item) => item.value && item.label).length
      ? normalizeItems((raw?.stats as Record<string, unknown>)?.items ?? raw?.stats).map((item) => ({
          value: item.value ?? '',
          label: item.label ?? '',
        }))
      : ABOUT_PAGE_FALLBACK.stats,
    mission: {
      eyebrow: String(mission.eyebrow ?? ABOUT_PAGE_FALLBACK.mission.eyebrow),
      title: String(mission.title ?? ABOUT_PAGE_FALLBACK.mission.title),
      description: String(mission.description ?? ABOUT_PAGE_FALLBACK.mission.description),
      values: nestedItems(mission, 'values').map((item) => ({
        icon: (item.icon as AboutPageContent['mission']['values'][0]['icon']) || 'target',
        title: item.title ?? '',
        description: item.description ?? '',
      })).filter((item) => item.title).length
        ? nestedItems(mission, 'values').map((item) => ({
            icon: (item.icon as AboutPageContent['mission']['values'][0]['icon']) || 'target',
            title: item.title ?? '',
            description: item.description ?? '',
          }))
        : ABOUT_PAGE_FALLBACK.mission.values,
    },
    services: {
      eyebrow: String(services.eyebrow ?? ABOUT_PAGE_FALLBACK.services.eyebrow),
      title: String(services.title ?? ABOUT_PAGE_FALLBACK.services.title),
      description: String(services.description ?? ABOUT_PAGE_FALLBACK.services.description),
      items: nestedItems(services, 'items').map((item) => ({
        id: (item.id as AboutPageContent['services']['items'][0]['id']) || 'buy',
        label: item.label ?? '',
        description: item.description ?? '',
      })).filter((item) => item.label).length
        ? nestedItems(services, 'items').map((item) => ({
            id: (item.id as AboutPageContent['services']['items'][0]['id']) || 'buy',
            label: item.label ?? '',
            description: item.description ?? '',
          }))
        : ABOUT_PAGE_FALLBACK.services.items,
    },
    timeline: {
      eyebrow: String(timeline.eyebrow ?? ABOUT_PAGE_FALLBACK.timeline.eyebrow),
      title: String(timeline.title ?? ABOUT_PAGE_FALLBACK.timeline.title),
      items: nestedItems(timeline, 'items').map((item) => ({
        year: item.year ?? '',
        event: item.event ?? '',
      })).filter((item) => item.year).length
        ? nestedItems(timeline, 'items').map((item) => ({
            year: item.year ?? '',
            event: item.event ?? '',
          }))
        : ABOUT_PAGE_FALLBACK.timeline.items,
    },
    cta: {
      title: cta.title ?? ABOUT_PAGE_FALLBACK.cta.title,
      description: cta.description ?? ABOUT_PAGE_FALLBACK.cta.description,
    },
  };
}

function parseHomepage(raw: Record<string, unknown> | null): HomepageContent {
  const hero = (raw?.hero as Record<string, string>) ?? {};
  const expertise = (raw?.expertise as Record<string, unknown>) ?? {};
  const testimonials = (raw?.testimonials as Record<string, unknown>) ?? {};
  const locations = (raw?.locations as Record<string, unknown>) ?? {};

  const expertiseItems = nestedItems(expertise, 'items')
    .map((item) => ({
      id: (item.id as HomepageExpertiseItem['id']) || 'buy',
      label: item.label ?? '',
      description: item.description ?? '',
    }))
    .filter((item) => item.label);

  const testimonialItems = nestedItems(testimonials, 'items')
    .map((item, index) => ({
      id: `t${index + 1}`,
      quote: item.quote ?? '',
      author: item.author ?? '',
      role: item.role ?? '',
      avatarUrl: item.avatar_url || item.avatarUrl || '',
      rating: Number(item.rating ?? 5),
    }))
    .filter((item) => item.quote && item.author);

  const parseLocations = (
    items: unknown,
    prefix: string,
    fallback: HomepageContent['locations']['wide'],
  ) => {
    const parsed = normalizeItems(items)
      .map((item, index) => ({
        id: `${prefix}${index + 1}`,
        city: item.city ?? '',
        country: item.country ?? '',
        propertiesCount: Number(item.properties_count ?? item.propertiesCount ?? 0),
        imageUrl: item.image_url || item.imageUrl || '',
      }))
      .filter((item) => item.city && item.imageUrl);

    return parsed.length ? parsed : fallback;
  };

  return {
    hero: {
      eyebrow: hero.eyebrow ?? HOMEPAGE_FALLBACK.hero.eyebrow,
      headline: hero.headline ?? HOMEPAGE_FALLBACK.hero.headline,
      subheadline: hero.subheadline ?? HOMEPAGE_FALLBACK.hero.subheadline,
      backgroundImage: hero.background_image || HOMEPAGE_FALLBACK.hero.backgroundImage,
    },
    expertise: {
      eyebrow: String(expertise.eyebrow ?? HOMEPAGE_FALLBACK.expertise.eyebrow),
      title: String(expertise.title ?? HOMEPAGE_FALLBACK.expertise.title),
      description: String(expertise.description ?? HOMEPAGE_FALLBACK.expertise.description),
      items: expertiseItems.length ? expertiseItems : HOMEPAGE_FALLBACK.expertise.items,
    },
    testimonials: {
      eyebrow: String(testimonials.eyebrow ?? HOMEPAGE_FALLBACK.testimonials.eyebrow),
      title: String(testimonials.title ?? HOMEPAGE_FALLBACK.testimonials.title),
      items: testimonialItems.length
        ? testimonialItems
        : HOMEPAGE_FALLBACK.testimonials.items,
    },
    locations: {
      eyebrow: String(locations.eyebrow ?? HOMEPAGE_FALLBACK.locations.eyebrow),
      title: String(locations.title ?? HOMEPAGE_FALLBACK.locations.title),
      wide: parseLocations(locations.wide, 'lw', HOMEPAGE_FALLBACK.locations.wide),
      square: parseLocations(locations.square, 'ls', HOMEPAGE_FALLBACK.locations.square),
    },
  };
}

type PagePayload = {
  content: unknown;
  seo?: Partial<CmsSeoMeta> | null;
};

export async function getAboutPage(): Promise<AboutPageContent> {
  if (isMockDataEnabled()) {
    return ABOUT_PAGE_FALLBACK;
  }

  const data = await graphqlFetch<{ page: PagePayload | null }>(`
    query {
      page(slug: "ABOUT") {
        ${PAGE_SEO_SELECTION}
      }
    }
  `);

  if (!data) {
    return ABOUT_PAGE_FALLBACK;
  }

  return parseAboutPage(parsePageContent(data.page?.content ?? null));
}

export async function getContactPage(): Promise<ContactPageContent> {
  if (isMockDataEnabled()) {
    return CONTACT_PAGE_FALLBACK;
  }

  const data = await graphqlFetch<{
    kontak: {
      eyebrow: string;
      hero: { headline: string; tagline: string };
      address: string;
      phone: string;
      email: string;
      daysOpen: string;
      timesOpen: string;
      mapEmbedUrl: string;
      mapDirectionUrl: string;
      officeHours: { day: string; hours: string }[];
    };
  }>(`
    query {
      kontak {
        eyebrow
        hero { headline tagline }
        address phone email daysOpen timesOpen mapEmbedUrl mapDirectionUrl
        officeHours { day hours }
      }
    }
  `);

  if (!data) {
    return CONTACT_PAGE_FALLBACK;
  }

  const { kontak } = data;

  return {
    eyebrow: kontak.eyebrow || CONTACT_PAGE_FALLBACK.eyebrow,
    headline: kontak.hero.headline || CONTACT_PAGE_FALLBACK.headline,
    tagline: kontak.hero.tagline || CONTACT_PAGE_FALLBACK.tagline,
    address: kontak.address || CONTACT_PAGE_FALLBACK.address,
    phone: kontak.phone || CONTACT_PAGE_FALLBACK.phone,
    phoneHref: toPhoneHref(kontak.phone) || CONTACT_PAGE_FALLBACK.phoneHref,
    email: kontak.email || CONTACT_PAGE_FALLBACK.email,
    daysOpen: kontak.daysOpen || CONTACT_PAGE_FALLBACK.daysOpen,
    timesOpen: kontak.timesOpen || CONTACT_PAGE_FALLBACK.timesOpen,
    mapEmbedUrl: kontak.mapEmbedUrl || CONTACT_PAGE_FALLBACK.mapEmbedUrl,
    mapDirectionUrl: kontak.mapDirectionUrl || CONTACT_PAGE_FALLBACK.mapDirectionUrl,
    officeHours: kontak.officeHours.length ? kontak.officeHours : CONTACT_PAGE_FALLBACK.officeHours,
  };
}

export async function getHomepage(): Promise<HomepageContent> {
  if (isMockDataEnabled()) {
    return HOMEPAGE_FALLBACK;
  }

  const data = await graphqlFetch<{ page: PagePayload | null }>(`
    query {
      page(slug: "HOMEPAGE") {
        ${PAGE_SEO_SELECTION}
      }
    }
  `);

  if (!data) {
    return HOMEPAGE_FALLBACK;
  }

  const parsed = parseHomepage(parsePageContent(data.page?.content ?? null));
  return {
    ...parsed,
    seo: parseSeo(data.page?.seo, homepageSeoFallback(parsed)),
  };
}

export async function getPrivacyPage(): Promise<PrivacyPageContent> {
  if (isMockDataEnabled()) {
    return PRIVACY_PAGE_FALLBACK;
  }

  const data = await graphqlFetch<{
    kebijakanPrivasi: { title: string; copy: string };
  }>(`
    query {
      kebijakanPrivasi {
        title
        copy
      }
    }
  `);

  if (!data) {
    return PRIVACY_PAGE_FALLBACK;
  }

  return {
    title: data.kebijakanPrivasi.title || PRIVACY_PAGE_FALLBACK.title,
    copy: data.kebijakanPrivasi.copy || PRIVACY_PAGE_FALLBACK.copy,
  };
}

/** ponytail: no CMS fields yet — local fallback until GraphQL adds them */
export async function getTermsPage(): Promise<PrivacyPageContent> {
  return TERMS_PAGE_FALLBACK;
}

/** ponytail: no CMS fields yet — local fallback until GraphQL adds them */
export async function getCookiePage(): Promise<PrivacyPageContent> {
  return COOKIE_PAGE_FALLBACK;
}
