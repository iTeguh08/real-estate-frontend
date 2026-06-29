import {
  ArrowUp,
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SocialIconProps = { className?: string };

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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

function PinterestIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.16 2.51 7.73 6.11 9.28-.08-.74-.02-1.63.2-2.44.22-.94 1.48-6.32 1.48-6.32s-.38-.76-.38-1.88c0-1.76 1.02-3.08 2.29-3.08 1.08 0 1.6.81 1.6 1.78 0 1.08-.69 2.7-1.05 4.2-.3 1.78.64 3.23 1.9 3.23 2.28 0 3.82-2.93 3.82-6.4 0-2.64-1.78-4.6-5.08-4.6-3.7 0-6 2.76-6 5.86 0 1.16.34 1.99.88 2.56.1.12.11.22.08.34-.09.36-.28 1.14-.32 1.3-.05.2-.17.25-.4.15-1.49-.6-2.42-2.48-2.42-4 0-3.25 2.74-7.15 8.18-7.15 4.34 0 7.2 3.17 7.2 6.58 0 4.5-2.5 7.87-6.18 7.87-1.21 0-2.34-.67-2.73-1.46l-.74 2.98c-.27 1.05-1 2.36-1.49 3.16C9.57 21.8 10.76 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
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
  { label: 'Pricing Plans', href: '#' },
  { label: 'Our Services', href: '#expertise' },
  { label: 'About Us', href: '#expertise' },
  { label: 'Contact Us', href: '#contact' },
] as const;

const COMPANY_LINKS = [
  { label: 'Property For Sale', href: '#listings' },
  { label: 'Property For Rent', href: '#listings' },
  { label: 'Property For Buy', href: '#listings' },
  { label: 'Our Agents', href: '#agents' },
] as const;

const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
] as const;

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Twitter', href: '#', icon: TwitterIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Pinterest', href: '#', icon: PinterestIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
] as const;

function FooterLinkList({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 font-poppins text-base font-semibold text-white">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-poppins text-sm text-white/65 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-hz-dark text-white"
      aria-label="Site footer"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div className="relative section-container">

        {/* Tier 1 — logo & social */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="inline-flex items-center gap-2 no-underline">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[3px] bg-hz-primary">
              <Building2 size={15} strokeWidth={2} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-poppins text-[22px] font-bold tracking-tight text-white">
              Homzen
            </span>
          </a>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="font-poppins text-sm font-medium text-white">Follow Us</p>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-hz-primary"
                >
                  <Icon className="h-[15px] w-[15px] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 2 — four columns */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="mb-6 max-w-[280px] font-poppins text-sm leading-relaxed text-white/65">
              Specializes in providing high-class tours for those in need. Contact us for
              all your luxury real estate needs.
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="group flex items-start gap-3 font-poppins text-sm text-white/65 transition-colors duration-200 hover:text-white"
                >
                  <MapPin
                    size={16}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-white/80"
                    aria-hidden="true"
                  />
                  <span>101 E 129th St, East Chicago, IN 46312, US</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+13125550123"
                  className="group flex items-center gap-3 font-poppins text-sm text-white/65 transition-colors duration-200 hover:text-white"
                >
                  <Phone size={16} strokeWidth={1.75} className="shrink-0 text-white/80" aria-hidden="true" />
                  <span>1-333-345-6868</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@homzen.com"
                  className="group flex items-center gap-3 font-poppins text-sm text-white/65 transition-colors duration-200 hover:text-white"
                >
                  <Mail size={16} strokeWidth={1.75} className="shrink-0 text-white/80" aria-hidden="true" />
                  <span>info@homzen.com</span>
                </a>
              </li>
            </ul>
          </div>

          <FooterLinkList heading="Categories" links={CATEGORIES_LINKS} />
          <FooterLinkList heading="Our Company" links={COMPANY_LINKS} />

          <div>
            <h3 className="mb-5 font-poppins text-base font-semibold text-white">Newsletter</h3>
            <p className="mb-5 font-poppins text-sm leading-relaxed text-white/65">
              Your Weekly/Monthly Dose of Knowledge and Inspiration
            </p>
            <form
              className="relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Your e-mail"
                className={cn(
                  'h-12 w-full rounded-[3px] border border-white/15 bg-white/5',
                  'pr-14 pl-4 font-poppins text-sm text-white placeholder:text-white/40',
                  'outline-none transition-colors duration-200',
                  'focus:border-hz-primary/60 focus:bg-white/8'
                )}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[3px] bg-hz-primary text-white transition-colors duration-200 hover:bg-hz-primary-hover"
              >
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>

        {/* Tier 3 — copyright & legal */}
        <div className="relative border-t border-white/10 py-6">
          <div className="flex flex-col items-start justify-between gap-4 pr-14 md:flex-row md:items-center">
            <p className="font-poppins text-xs text-white/50">
              © {year} Homzen. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-poppins text-xs text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hz-dark transition-colors duration-200 hover:bg-white/90"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        </div>

      </div>
    </footer>
  );
}
