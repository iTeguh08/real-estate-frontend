import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { luxuryButton, sectionEyebrow } from '@/lib/cva';

const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#expertise' },
      { label: 'Our Agents', href: '#agents' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    heading: 'Properties',
    links: [
      { label: 'Buy', href: '#listings' },
      { label: 'Rent', href: '#listings' },
      { label: 'Off Plan', href: '#listings' },
      { label: 'Commercial', href: '#properties' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'FAQ', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
] as const;

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: '+1 (555) 012 3400',
    href: 'tel:+15550123400',
  },
  {
    icon: Mail,
    label: 'hello@homeya.com',
    href: 'mailto:hello@homeya.com',
  },
  {
    icon: MapPin,
    label: '88 Atlantic Avenue, Cape Town',
    href: '#',
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="w-full bg-white text-luxury-dark"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <a href="/" className="inline-flex w-fit">
              <span
                className="text-[1.65rem] font-light tracking-tight text-luxury-dark"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Homeya
              </span>
            </a>
            <p className="max-w-[300px] font-sans text-sm leading-relaxed text-luxury-muted">
              Curating exceptional residences worldwide — where refined living meets trusted
              guidance.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-luxury-muted transition-colors duration-200 hover:text-luxury-crimson"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_COLUMNS.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-4">
                <h3 className={sectionEyebrow()}>{heading}</h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-sans text-sm text-luxury-muted transition-colors duration-200 hover:text-luxury-dark"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className={sectionEyebrow()}>Get in Touch</h3>
            <ul className="flex flex-col gap-3.5">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-start gap-2.5 font-sans text-sm text-luxury-muted transition-colors duration-200 hover:text-luxury-dark"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-luxury-muted/70 group-hover:text-luxury-crimson"
                    />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-luxury-border pt-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-md">
              <p className={cn(sectionEyebrow(), 'mb-2')}>Newsletter</p>
              <p className="font-sans text-sm leading-relaxed text-luxury-muted">
                Receive curated listings and market insights — no noise, just properties worth your
                time.
              </p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="h-11 flex-1 rounded-sm border-luxury-border bg-luxury-cream/40 font-sans text-sm text-luxury-dark placeholder:text-luxury-muted/70 focus-visible:ring-luxury-crimson"
              />
              <Button
                type="submit"
                variant="ghost"
                className={cn(
                  luxuryButton({ variant: 'outline-crimson', size: 'md' }),
                  'shrink-0 gap-1.5'
                )}
              >
                Subscribe
                <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-luxury-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 font-sans text-xs text-luxury-muted/80 md:flex-row md:px-10">
          <p>© {year} Homeya. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href="#" className="transition-colors hover:text-luxury-dark">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-luxury-dark">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-luxury-dark">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
