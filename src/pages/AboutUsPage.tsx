import { Link } from 'react-router-dom';
import { ArrowRight, Check, Target, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';
import { routes } from '@/lib/routes';
import {
  VillaIllustration,
  ApartmentIllustration,
  CommercialIllustration,
} from '@/components/icons/PropertyTypeIllustrations';

const STATS = [
  { value: '3,500+', label: 'Transactions Completed' },
  { value: '15+', label: 'Years of Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Expert Agents' },
] as const;

const VALUES = [
  {
    icon: Target,
    title: 'Client-First Approach',
    description:
      'Every decision we make starts with your goals. We listen, advise honestly, and advocate for outcomes that serve your best interests.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description:
      'Our agents live and work in the communities they serve — giving you insider knowledge on neighborhoods, pricing, and market trends.',
  },
  {
    icon: Award,
    title: 'Trusted Excellence',
    description:
      'From first consultation to closing day, we uphold the highest standards of professionalism, transparency, and service.',
  },
] as const;

const SERVICES = [
  {
    id: 'buy',
    label: 'Buy A Home',
    description:
      'Find your place with immersive listings, virtual tours, and personalized guidance through every step of the purchase process.',
    Illustration: VillaIllustration,
  },
  {
    id: 'rent',
    label: 'Rent A Home',
    description:
      'Browse the largest rental network with seamless applications, lease support, and neighborhood insights tailored to your lifestyle.',
    Illustration: ApartmentIllustration,
  },
  {
    id: 'sell',
    label: 'Sell A Home',
    description:
      'Maximize your property value with strategic pricing, professional staging advice, and targeted marketing to qualified buyers.',
    Illustration: CommercialIllustration,
  },
] as const;

const TIMELINE = [
  { year: '2010', event: 'Founded with a vision to redefine luxury real estate service.' },
  { year: '2015', event: 'Expanded to 10 major metropolitan markets across the United States.' },
  { year: '2020', event: 'Launched digital-first property tours and virtual closing services.' },
  { year: 'Today', event: 'Serving thousands of clients with a team of 50+ dedicated professionals.' },
] as const;

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-poppins text-[28px] font-bold leading-none tracking-[-0.3px] text-hz-dark md:text-[32px]">
        {value}
      </p>
      <p className="mt-2 font-poppins text-sm text-hz-muted">{label}</p>
    </div>
  );
}

export function AboutUsPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                About {SITE_CONFIG.brand}
              </p>
              <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[40px]">
                Your Trusted Partner in Luxury Real Estate
              </h1>
              <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">
                For over 15 years, {SITE_CONFIG.brand} has connected discerning buyers, sellers, and
                renters with exceptional properties. We combine market-leading data with a team of
                dedicated professionals who put your goals first.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={routes.contact}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-hz bg-hz-primary px-6 py-3',
                    'font-poppins text-sm font-semibold text-white no-underline',
                    'transition-colors duration-200 hover:bg-hz-primary-hover'
                  )}
                >
                  Get in Touch
                  <ArrowRight size={16} strokeWidth={1.75} />
                </Link>
                <Link
                  to={{ pathname: routes.home, hash: '#listings' }}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-hz bg-[#F8F8F8] px-6 py-3',
                    'font-poppins text-sm font-medium text-hz-dark no-underline',
                    'transition-colors duration-200 hover:bg-[#E5E5E5]'
                  )}
                >
                  Browse Listings
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80"
                alt="Modern luxury home exterior"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hz-border bg-[#F8F8F8] py-12 md:py-16" aria-label="Company statistics">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {STATS.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Our Mission
            </p>
            <h2
              id="mission-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              Making Every Real Estate Journey Exceptional
            </h2>
            <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">
              We believe finding or selling a home should be inspiring, not overwhelming. Our mission
              is to deliver a seamless, transparent experience backed by deep market knowledge and
              genuine care for every client we serve.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-hz border border-hz-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-hz bg-[#F8F8F8]">
                  <Icon size={22} strokeWidth={1.75} className="text-hz-primary" aria-hidden="true" />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-hz-dark">{title}</h3>
                <p className="mt-2 font-poppins text-sm leading-relaxed text-hz-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#F8F8F8] py-16 md:py-20" aria-labelledby="services-heading">
        <div className="section-container">
          <header className="mb-12 max-w-2xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              Full-Service Real Estate Solutions
            </h2>
            <p className="mt-4 font-poppins text-sm leading-relaxed text-hz-muted">
              Whether you are buying, renting, or selling, we provide end-to-end support tailored to
              your unique needs.
            </p>
          </header>

          <div className="flex flex-col gap-5">
            {SERVICES.map(({ id, label, description, Illustration }) => (
              <article
                key={id}
                className={cn(
                  'group flex w-full items-center gap-6',
                  'rounded-hz bg-white p-6',
                  'shadow-[0_4px_20px_rgba(0,0,0,0.02)]',
                  'transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
                )}
              >
                <div
                  className="flex h-[88px] w-20 shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <Illustration
                    className="flex h-full w-full items-center justify-center"
                    iconClassName="!h-full !w-full !translate-y-0 object-contain object-center"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="font-poppins text-lg font-semibold text-hz-dark transition-colors duration-200 group-hover:text-hz-primary">
                    {label}
                  </h3>
                  <p className="font-poppins text-[13.5px] leading-[1.65] text-hz-body">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="timeline-heading">
        <div className="section-container">
          <header className="mb-12 text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Our Journey
            </p>
            <h2
              id="timeline-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              A Decade of Growth & Trust
            </h2>
          </header>

          <ol className="mx-auto max-w-2xl space-y-0">
            {TIMELINE.map(({ year, event }, index) => (
              <li key={year} className="relative flex gap-6 pb-10 last:pb-0">
                {index < TIMELINE.length - 1 && (
                  <span
                    className="absolute left-[19px] top-10 h-full w-px bg-hz-border"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hz-primary font-poppins text-xs font-semibold text-white"
                  aria-hidden="true"
                >
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <div className="pt-1.5">
                  <p className="font-poppins text-sm font-semibold text-hz-primary">{year}</p>
                  <p className="mt-1 font-poppins text-sm leading-relaxed text-hz-muted">{event}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hz-dark py-16 md:py-20" aria-labelledby="about-cta-heading">
        <div className="section-container text-center">
          <h2
            id="about-cta-heading"
            className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-white md:text-[34px]"
          >
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-poppins text-sm leading-relaxed text-white/70">
            Connect with our team of experts today. We are here to help you find, sell, or rent your
            perfect property.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={routes.contact}
              className={cn(
                'inline-flex items-center gap-2 rounded-hz bg-hz-primary px-6 py-3',
                'font-poppins text-sm font-semibold text-white no-underline',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              Contact Us
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
            <Link
              to={{ pathname: routes.home, hash: '#agents' }}
              className={cn(
                'inline-flex items-center gap-2 rounded-hz border border-white/25 px-6 py-3',
                'font-poppins text-sm font-medium text-white no-underline',
                'transition-colors duration-200 hover:border-white/50 hover:bg-white/10'
              )}
            >
              Meet Our Agents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
