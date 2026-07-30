import {
  ArrowUp,
  Building2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { SITE_CONFIG } from '@/data/site-config';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { routes } from '@/lib/routes';
import type { SiteConfig } from '@/services/site.service';

type SocialIconProps = { className?: string };

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const CATEGORIES_LINKS = [
  { label: 'List Your Property', href: '/submit-property' },
  { label: 'Our Services', href: '/about' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const COMPANY_LINKS = [
  { label: 'Property For Sale', href: '#listings' },
  { label: 'Property For Rent', href: '#listings' },
  { label: 'Saved Listings', href: '/wishlist' },
  { label: 'Compare Properties', href: '/compare' },
  { label: 'Our Agents', href: routes.agents },
] as const;

const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '#' },
] as const;

function buildSocialLinks(footer: SiteConfig['footer']) {
  const entries = [
    { label: 'Facebook', href: footer.social.facebook, icon: FacebookIcon },
    { label: 'Instagram', href: footer.social.instagram, icon: InstagramIcon },
    { label: 'YouTube', href: footer.social.youtube, icon: YoutubeIcon },
  ] as const;

  return entries.filter((entry) => entry.href);
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const className =
    'font-poppins text-sm text-hz-footer-fg/65 transition-colors duration-200 hover:text-hz-footer-fg no-underline';

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <Link to={{ pathname: routes.home, hash: href.slice(1) }} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

function FooterLinkList({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 font-poppins text-base font-semibold text-hz-footer-fg">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterNavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? SITE_CONFIG.brand;
  const contact = siteConfig?.contact ?? SITE_CONFIG.contact;
  const footer = siteConfig?.footer;
  const socialLinks = footer ? buildSocialLinks(footer) : [];
  const copyright =
    footer?.copyright.replace('© 2026', `© ${new Date().getFullYear()}`) ??
    `© ${new Date().getFullYear()} ${brand}. All Rights Reserved.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative z-20 w-full overflow-hidden bg-hz-footer text-hz-footer-fg"
      aria-label="Site footer"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, var(--hz-footer-fg) 0px, var(--hz-footer-fg) 0.5px, transparent 0.5px, transparent 48px)',
        }}
      />
      <SectionAtmosphere
        tone="dark"
        intensity="quiet"
        variant="edge"
        side="left"
        image="architecture-city"
      />

      <div className="relative z-10 section-container">

        {/* Tier 1 — logo & social */}
        <div className="flex flex-col gap-6 border-b border-hz-footer-fg/10 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link to={routes.home} className="inline-flex items-center gap-2 no-underline">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-hz bg-hz-primary">
              <Building2 size={15} strokeWidth={2} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-poppins text-[22px] font-bold tracking-tight text-hz-footer-fg">
              {brand}
            </span>
          </Link>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="font-poppins text-sm font-medium text-hz-footer-fg">Follow Us</p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-hz-footer-fg/10 text-hz-footer-fg transition-colors duration-200 hover:bg-hz-primary"
                  >
                    <Icon className="h-[15px] w-[15px] shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tier 2 — four columns */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="mb-6 max-w-[280px] font-poppins text-sm leading-relaxed text-hz-footer-fg/65">
              {footer?.description ??
                'Your trusted partner in luxury real estate — connecting buyers, sellers, and renters with exceptional properties.'}
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="group flex items-start gap-3 font-poppins text-sm text-hz-footer-fg/65 transition-colors duration-200 hover:text-hz-footer-fg"
                >
                  <MapPin
                    size={16}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-hz-footer-fg/80"
                    aria-hidden="true"
                  />
                  <span>{contact.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="group flex items-center gap-3 font-poppins text-sm text-hz-footer-fg/65 transition-colors duration-200 hover:text-hz-footer-fg"
                >
                  <Phone size={16} strokeWidth={1.75} className="shrink-0 text-hz-footer-fg/80" aria-hidden="true" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 font-poppins text-sm text-hz-footer-fg/65 transition-colors duration-200 hover:text-hz-footer-fg"
                >
                  <Mail size={16} strokeWidth={1.75} className="shrink-0 text-hz-footer-fg/80" aria-hidden="true" />
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <FooterLinkList heading="Categories" links={CATEGORIES_LINKS} />
          <FooterLinkList heading="Our Company" links={COMPANY_LINKS} />

          <div>
            <h3 className="mb-5 font-poppins text-base font-semibold text-hz-footer-fg">Newsletter</h3>
            <p className="mb-5 font-poppins text-sm leading-relaxed text-hz-footer-fg/65">
              Your Weekly/Monthly Dose of Knowledge and Inspiration
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Tier 3 — copyright & legal */}
        <div className="relative border-t border-hz-footer-fg/10 py-6">
          <div className="flex flex-col items-start justify-between gap-4 pr-14 md:flex-row md:items-center">
            <p className="font-poppins text-xs text-hz-footer-fg/50">{copyright}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-poppins text-xs text-hz-footer-fg/50 transition-colors duration-200 hover:text-hz-footer-fg"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-poppins text-xs text-hz-footer-fg/50 transition-colors duration-200 hover:text-hz-footer-fg"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-hz-footer-fg/10 text-hz-footer-fg transition-colors duration-200 hover:bg-hz-primary hover:text-white"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        </div>

      </div>
    </footer>
  );
}
