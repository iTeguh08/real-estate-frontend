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
import { useTheme } from '@/hooks/useTheme';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
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

function FooterNavLink({
  href,
  label,
  isLight,
}: {
  href: string;
  label: string;
  isLight: boolean;
}) {
  const className = cn(
    'inline-block font-poppins text-[14px] font-medium leading-snug no-underline transition-colors duration-200',
    isLight
      ? 'text-hz-ink/80 hover:text-hz-primary'
      : 'text-hz-footer-fg/85 hover:text-hz-primary'
  );

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
  isLight,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
  isLight: boolean;
}) {
  return (
    <div>
      <h3
        className={cn(
          'mb-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.14em]',
          isLight ? 'text-hz-ink' : 'text-hz-footer-fg'
        )}
      >
        {heading}
      </h3>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterNavLink href={link.href} label={link.label} isLight={isLight} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
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

  const headingClass = isLight ? 'text-hz-ink' : 'text-hz-footer-fg';
  const bodyClass = isLight
    ? 'text-hz-ink/75'
    : 'text-hz-footer-fg/85';
  const bodyHoverClass = isLight
    ? 'text-hz-ink/80 transition-colors duration-200 hover:text-hz-primary'
    : 'text-hz-footer-fg/85 transition-colors duration-200 hover:text-hz-primary';
  const iconClass = 'text-hz-primary';
  const legalClass = isLight
    ? 'text-hz-body transition-colors duration-200 hover:text-hz-primary'
    : 'text-hz-footer-fg/70 transition-colors duration-200 hover:text-hz-primary';

  return (
    <footer
      id="contact"
      className={cn(
        'relative z-20 w-full overflow-hidden',
        isLight
          ? 'bg-hz-elevated text-hz-ink shadow-[0_-12px_40px_rgb(26_26_46/0.06)]'
          : 'bg-hz-footer text-hz-footer-fg shadow-[0_-12px_40px_rgb(0_0_0/0.25)]'
      )}
      aria-label="Site footer"
    >
      {/* Edge-weighted photo — objects on sides, center clear for copy */}
      <SectionAtmosphere
        tone={isLight ? 'light' : 'dark'}
        surface={isLight ? 'elevated' : 'footer'}
        intensity={isLight ? 'strong' : 'quiet'}
        variant="dual"
        side="left"
        image={isLight ? 'footer-edge' : 'architecture-city'}
        photoOpacity={isLight ? 0.92 : 0.35}
        photoScrimMix={isLight ? 40 : undefined}
        photoFade="hold"
      />

      <div className="relative z-10 section-container">
        {/* Tier 1 — brand bar */}
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link to={routes.home} className="inline-flex items-center gap-3 no-underline">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-hz bg-hz-primary shadow-hz-sm">
              <Building2 size={18} strokeWidth={2} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <span
                className={cn(
                  'block font-poppins text-[24px] font-bold leading-none tracking-[-0.5px]',
                  headingClass
                )}
              >
                {brand}
              </span>
              <span
                className={cn(
                  'mt-1.5 block font-poppins text-[12px] font-medium tracking-[0.04em]',
                  isLight ? 'text-hz-body' : 'text-hz-footer-fg/70'
                )}
              >
                Luxury real estate
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-3 sm:items-end">
            <p
              className={cn(
                'font-poppins text-[12px] font-semibold uppercase tracking-[0.14em]',
                headingClass
              )}
            >
              Follow Us
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-hz-primary hover:text-white hover:shadow-hz-sm',
                      isLight
                        ? 'bg-hz-sunken text-hz-ink ring-1 ring-hz-border'
                        : 'bg-hz-footer-fg/12 text-hz-footer-fg ring-1 ring-hz-footer-fg/20'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tier 2 — columns */}
        <div className="grid grid-cols-1 gap-11 pt-2 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <h3
              className={cn(
                'mb-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.14em]',
                headingClass
              )}
            >
              About
            </h3>
            <p
              className={cn(
                'mb-7 max-w-[300px] font-poppins text-[14px] font-medium leading-[1.65]',
                bodyClass
              )}
            >
              {footer?.description ??
                'Your trusted partner in luxury real estate — connecting buyers, sellers, and renters with exceptional properties.'}
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className={cn(
                    'group flex items-start gap-3 font-poppins text-[14px] font-medium',
                    bodyHoverClass
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-hz',
                      isLight ? 'bg-hz-sunken' : 'bg-hz-footer-fg/10'
                    )}
                  >
                    <MapPin size={15} strokeWidth={2} className={iconClass} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5 leading-snug">{contact.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className={cn(
                    'group flex items-center gap-3 font-poppins text-[14px] font-medium',
                    bodyHoverClass
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-hz',
                      isLight ? 'bg-hz-sunken' : 'bg-hz-footer-fg/10'
                    )}
                  >
                    <Phone size={15} strokeWidth={2} className={iconClass} aria-hidden="true" />
                  </span>
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className={cn(
                    'group flex items-center gap-3 font-poppins text-[14px] font-medium',
                    bodyHoverClass
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-hz',
                      isLight ? 'bg-hz-sunken' : 'bg-hz-footer-fg/10'
                    )}
                  >
                    <Mail size={15} strokeWidth={2} className={iconClass} aria-hidden="true" />
                  </span>
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <FooterLinkList heading="Categories" links={CATEGORIES_LINKS} isLight={isLight} />
          <FooterLinkList heading="Our Company" links={COMPANY_LINKS} isLight={isLight} />

          <div>
            <h3
              className={cn(
                'mb-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.14em]',
                headingClass
              )}
            >
              Newsletter
            </h3>
            <p className={cn('mb-5 font-poppins text-[14px] font-medium leading-[1.65]', bodyClass)}>
              Your weekly dose of market insight and inspiration.
            </p>
            <NewsletterForm tone={isLight ? 'light' : 'dark'} />
          </div>
        </div>
      </div>

      {/* Tier 3 — legal bar sits above atmosphere, soft translucent fill */}
      <div
        className={cn(
          'relative z-10 border-t',
          isLight
            ? 'border-hz-border/50 bg-hz-elevated/55'
            : 'border-hz-footer-fg/15 bg-hz-footer/55'
        )}
      >
        <div className="section-container relative py-7">
          <div className="flex flex-col items-start justify-between gap-4 pr-14 md:flex-row md:items-center">
            <p
              className={cn(
                'font-poppins text-[13px] font-medium',
                isLight ? 'text-hz-body' : 'text-hz-footer-fg/75'
              )}
            >
              {copyright}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn('font-poppins text-[13px] font-medium', legalClass)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn('font-poppins text-[13px] font-medium', legalClass)}
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
            className={cn(
              'absolute top-1/2 right-5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:bg-hz-primary hover:text-white hover:shadow-hz-md md:right-10 2xl:right-12 3xl:right-16',
              isLight
                ? 'bg-hz-elevated/80 text-hz-ink shadow-hz-sm ring-1 ring-hz-border'
                : 'bg-hz-footer-fg/12 text-hz-footer-fg ring-1 ring-hz-footer-fg/20'
            )}
          >
            <ArrowUp size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </footer>
  );
}
