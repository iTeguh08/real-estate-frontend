export interface CmsStat {
  value: string;
  label: string;
}

export interface CmsValue {
  icon: 'target' | 'users' | 'award';
  title: string;
  description: string;
}

export interface CmsService {
  id: 'buy' | 'rent' | 'sell';
  label: string;
  description: string;
}

export interface CmsTimelineItem {
  year: string;
  event: string;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    image: string;
  };
  stats: CmsStat[];
  mission: {
    eyebrow: string;
    title: string;
    description: string;
    values: CmsValue[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: CmsService[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: CmsTimelineItem[];
  };
  cta: {
    title: string;
    description: string;
  };
}

export interface ContactPageContent {
  eyebrow: string;
  headline: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  phoneHref: string;
  daysOpen: string;
  timesOpen: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
  officeHours: { day: string; hours: string }[];
}

export interface HomepageExpertiseItem {
  id: 'buy' | 'rent' | 'sell';
  label: string;
  description: string;
}

export interface HomepageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    backgroundImage: string;
  };
  expertise: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageExpertiseItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: {
      id: string;
      quote: string;
      author: string;
      role: string;
      avatarUrl: string;
      rating: number;
    }[];
  };
  locations: {
    eyebrow: string;
    title: string;
    wide: {
      id: string;
      city: string;
      country: string;
      propertiesCount: number;
      imageUrl: string;
    }[];
    square: {
      id: string;
      city: string;
      country: string;
      propertiesCount: number;
      imageUrl: string;
    }[];
  };
}

export interface PrivacyPageContent {
  title: string;
  copy: string;
}

export interface SiteFooterContent {
  description: string;
  copyright: string;
  businessHours: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export const ABOUT_PAGE_FALLBACK: AboutPageContent = {
  hero: {
    eyebrow: 'About Homzen',
    headline: 'Your Trusted Partner in Luxury Real Estate',
    description:
      'For over 15 years, Homzen has connected discerning buyers, sellers, and renters with exceptional properties.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
  },
  stats: [
    { value: '3,500+', label: 'Transactions Completed' },
    { value: '15+', label: 'Years of Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Expert Agents' },
  ],
  mission: {
    eyebrow: 'Our Mission',
    title: 'Making Every Real Estate Journey Exceptional',
    description:
      'We believe finding or selling a home should be inspiring, not overwhelming.',
    values: [
      {
        icon: 'target',
        title: 'Client-First Approach',
        description:
          'Every decision we make starts with your goals. We listen, advise honestly, and advocate for outcomes that serve your best interests.',
      },
      {
        icon: 'users',
        title: 'Local Expertise',
        description:
          'Our agents live and work in the communities they serve — giving you insider knowledge on neighborhoods, pricing, and market trends.',
      },
      {
        icon: 'award',
        title: 'Trusted Excellence',
        description:
          'From first consultation to closing day, we uphold the highest standards of professionalism, transparency, and service.',
      },
    ],
  },
  services: {
    eyebrow: 'What We Do',
    title: 'Full-Service Real Estate Solutions',
    description:
      'Whether you are buying, renting, or selling, we provide end-to-end support tailored to your unique needs.',
    items: [
      {
        id: 'buy',
        label: 'Buy A Home',
        description:
          'Find your place with immersive listings, virtual tours, and personalized guidance through every step of the purchase process.',
      },
      {
        id: 'rent',
        label: 'Rent A Home',
        description:
          'Browse the largest rental network with seamless applications, lease support, and neighborhood insights tailored to your lifestyle.',
      },
      {
        id: 'sell',
        label: 'Sell A Home',
        description:
          'Maximize your property value with strategic pricing, professional staging advice, and targeted marketing to qualified buyers.',
      },
    ],
  },
  timeline: {
    eyebrow: 'Our Journey',
    title: 'A Decade of Growth & Trust',
    items: [
      { year: '2010', event: 'Founded with a vision to redefine luxury real estate service.' },
      { year: '2015', event: 'Expanded to 10 major metropolitan markets across the United States.' },
      { year: '2020', event: 'Launched digital-first property tours and virtual closing services.' },
      { year: 'Today', event: 'Serving thousands of clients with a team of 50+ dedicated professionals.' },
    ],
  },
  cta: {
    title: 'Ready to Start Your Journey?',
    description:
      'Connect with our team of experts today. We are here to help you find, sell, or rent your perfect property.',
  },
};

export const CONTACT_PAGE_FALLBACK: ContactPageContent = {
  eyebrow: 'Contact Us',
  headline: "We'd Love to Hear From You",
  tagline:
    'Have a question about a property, need expert advice, or want to schedule a viewing? Reach out and our team will respond promptly.',
  address: '101 E 129th St, East Chicago, IN 46312, US',
  phone: '1-333-345-6868',
  phoneHref: 'tel:+13333456868',
  email: 'info@homzen.com',
  daysOpen: 'Monday – Friday',
  timesOpen: '9:00 AM – 6:00 PM',
  mapEmbedUrl: 'https://maps.google.com/maps?q=101+E+129th+St,+East+Chicago,+IN+46312&output=embed',
  mapDirectionUrl: 'https://maps.google.com/maps?q=101+E+129th+St,+East+Chicago,+IN+46312',
  officeHours: [
    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

export const HOMEPAGE_FALLBACK: HomepageContent = {
  hero: {
    eyebrow: 'Real Estate Agency',
    headline: "Find A Home That\nFits Your Dream",
    subheadline:
      'We are a real estate agency that will help you find the best residence for you at an affordable price.',
    backgroundImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
  },
  expertise: {
    eyebrow: 'Our Expertise',
    title: 'Guidance from search to closing',
    description:
      'Homzen pairs local market mastery with a calm, specialist process — so every buy, rent, or sale feels intentional.',
    items: [
      {
        id: 'buy',
        label: 'Buy A Home',
        description:
          'Private viewings, sharp pricing insight, and shortlists tailored to how you actually live.',
      },
      {
        id: 'rent',
        label: 'Rent A Home',
        description:
          'Quality rentals with clear terms, trusted landlords, and move-in support when you need it.',
      },
      {
        id: 'sell',
        label: 'Sell A Home',
        description:
          'Positioning, pricing, and buyer outreach that protect your timeline and your asking price.',
      },
    ],
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What People Say About Homzen',
    items: [
      {
        id: 't1',
        quote:
          'From the first viewing to closing day, the team made everything effortless. They understood exactly what we were looking for.',
        author: 'Emily Hartwell',
        role: 'Home Buyer, Cape Town',
        avatarUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
        rating: 5,
      },
      {
        id: 't2',
        quote:
          'Professional, responsive, and genuinely invested in getting the best outcome. Our villa sold above asking within three weeks.',
        author: 'David Okonkwo',
        role: 'Property Seller, Lisbon',
        avatarUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        rating: 5,
      },
      {
        id: 't3',
        quote:
          'As overseas investors, we needed an agency we could trust completely. Their market insight gave us confidence at every step.',
        author: 'Priya Sharma',
        role: 'Investor, Dubai',
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        rating: 5,
      },
      {
        id: 't4',
        quote:
          'The entire experience felt personal and professional throughout. They guided us through every detail with patience and expertise.',
        author: 'Leon McKenzie',
        role: 'Property Investor, New York',
        avatarUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        rating: 5,
      },
    ],
  },
  locations: {
    eyebrow: 'Explore Areas',
    title: 'Our Location For You',
    wide: [
      {
        id: 'l5',
        city: 'Maldives',
        country: 'South Asia',
        propertiesCount: 94,
        imageUrl:
          'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80',
      },
      {
        id: 'l6',
        city: 'Swiss Alps',
        country: 'Switzerland',
        propertiesCount: 131,
        imageUrl:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80',
      },
    ],
    square: [
      {
        id: 'l1',
        city: 'Cape Town',
        country: 'South Africa',
        propertiesCount: 324,
        imageUrl:
          'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&auto=format&fit=crop&q=80',
      },
      {
        id: 'l2',
        city: 'Bali',
        country: 'Indonesia',
        propertiesCount: 218,
        imageUrl:
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
      },
      {
        id: 'l3',
        city: 'Lisbon',
        country: 'Portugal',
        propertiesCount: 156,
        imageUrl:
          'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop&q=80',
      },
      {
        id: 'l4',
        city: 'Dubai',
        country: 'United Arab Emirates',
        propertiesCount: 287,
        imageUrl:
          'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
      },
    ],
  },
};

export const PRIVACY_PAGE_FALLBACK: PrivacyPageContent = {
  title: 'Privacy Policy',
  copy: '<p>Homzen respects your privacy. This policy explains how we collect, use, and protect your personal information when you use our website and services.</p>',
};

export const SITE_FOOTER_FALLBACK: SiteFooterContent = {
  description:
    'Your trusted partner in luxury real estate — connecting buyers, sellers, and renters with exceptional properties.',
  copyright: '© 2026 Homzen. All rights reserved.',
  businessHours: 'Mon – Fri, 9:00 AM – 6:00 PM',
  social: {
    facebook: 'https://facebook.com/homzen',
    instagram: 'https://instagram.com/homzen',
    youtube: '',
  },
};
