import { Link } from 'react-router-dom';
import { ArrowRight, Award, Check, Target, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sizedImage } from '@/lib/image-url';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { CmsPageSkeleton } from '@/components/skeletons';
import { useAboutPageQuery } from '@/hooks/queries';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { routes } from '@/lib/routes';
import type { CmsService, CmsValue } from '@/data/cms-fallbacks';
import {
  VillaIllustration,
  ApartmentIllustration,
  CommercialIllustration,
} from '@/components/icons/PropertyTypeIllustrations';

const VALUE_ICONS: Record<CmsValue['icon'], LucideIcon> = {
  target: Target,
  users: Users,
  award: Award,
};

const SERVICE_ILLUSTRATIONS = {
  buy: VillaIllustration,
  rent: ApartmentIllustration,
  sell: CommercialIllustration,
} as const;

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
  const { data: page, isLoading } = useAboutPageQuery();
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? 'Homzen';

  if (isLoading || !page) {
    return <CmsPageSkeleton variant="about" />;
  }

  const { hero, stats, mission, services, timeline, cta } = page;

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <SectionAtmosphere tone="soft" intensity="quiet" variant="ambient" side="left" image="interior-light" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                {hero.eyebrow.replace('Homzen', brand)}
              </p>
              <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[40px]">
                {hero.headline}
              </h1>
              <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">{hero.description}</p>
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
                    'inline-flex items-center gap-2 rounded-hz bg-hz-sunken px-6 py-3',
                    'font-poppins text-sm font-medium text-hz-dark no-underline',
                    'transition-colors duration-200 hover:bg-hz-sunken'
                  )}
                >
                  Browse Listings
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <img
                src={sizedImage(hero.image, 720)}
                alt="Modern luxury home exterior"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hz-inverse/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hz-border bg-hz-sunken py-12 md:py-16" aria-label="Company statistics">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20" aria-labelledby="mission-heading">
        <SectionAtmosphere tone="soft" intensity="quiet" variant="dual" side="right" image="aerial" />
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              {mission.eyebrow}
            </p>
            <h2
              id="mission-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              {mission.title}
            </h2>
            <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">{mission.description}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {mission.values.map(({ icon, title, description }) => {
              const Icon = VALUE_ICONS[icon] ?? Target;
              return (
                <article
                  key={title}
                  className="rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-hz bg-hz-sunken">
                    <Icon size={22} strokeWidth={1.75} className="text-hz-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-poppins text-lg font-semibold text-hz-dark">{title}</h3>
                  <p className="mt-2 font-poppins text-sm leading-relaxed text-hz-muted">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-hz-sunken py-16 md:py-20" aria-labelledby="services-heading">
        <SectionAtmosphere tone="light" intensity="quiet" variant="dual" side="left" image="interior-light" />
        <div className="section-container relative z-10">
          <header className="mb-12 max-w-2xl">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              {services.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              {services.title}
            </h2>
            <p className="mt-4 font-poppins text-sm leading-relaxed text-hz-muted">{services.description}</p>
          </header>

          <div className="flex flex-col gap-5">
            {services.items.map((service: CmsService) => {
              const Illustration = SERVICE_ILLUSTRATIONS[service.id] ?? VillaIllustration;
              return (
                <article
                  key={service.id}
                  className={cn(
                    'group flex w-full items-center gap-6',
                    'rounded-hz bg-hz-elevated p-6',
                    'shadow-hz-sm',
                    'transition-all duration-300 hover:shadow-hz-md'
                  )}
                >
                  <div className="flex h-[88px] w-20 shrink-0 items-center justify-center" aria-hidden="true">
                    <Illustration
                      className="flex h-full w-full items-center justify-center"
                      iconClassName="!h-full !w-full !translate-y-0 object-contain object-center hz-raster-icon-on-surface"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="font-poppins text-lg font-semibold text-hz-dark transition-colors duration-200 group-hover:text-hz-primary">
                      {service.label}
                    </h3>
                    <p className="font-poppins text-[13.5px] leading-[1.65] text-hz-body">{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20" aria-labelledby="timeline-heading">
        <SectionAtmosphere tone="soft" intensity="quiet" variant="ambient" side="left" image="interior-light" />
        <div className="section-container relative z-10">
          <header className="mb-12 text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              {timeline.eyebrow}
            </p>
            <h2
              id="timeline-heading"
              className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]"
            >
              {timeline.title}
            </h2>
          </header>

          <ol className="mx-auto max-w-2xl space-y-0">
            {timeline.items.map(({ year, event }, index) => (
              <li key={year} className="relative flex gap-6 pb-10 last:pb-0">
                {index < timeline.items.length - 1 && (
                  <span className="absolute left-[19px] top-10 h-full w-px bg-hz-border" aria-hidden="true" />
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

      <section
        className="relative overflow-hidden bg-hz-footer py-16 md:py-20"
        aria-labelledby="about-cta-heading"
      >
        <SectionAtmosphere tone="dark" intensity="strong" variant="ambient" side="left" image="architecture" />
        <div className="section-container relative z-10 text-center">
          <h2
            id="about-cta-heading"
            className="font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-footer-fg md:text-[34px]"
          >
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-poppins text-sm leading-relaxed text-hz-footer-fg/70">{cta.description}</p>
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
              to={routes.agents}
              className={cn(
                'inline-flex items-center gap-2 rounded-hz border border-hz-footer-fg/25 px-6 py-3',
                'font-poppins text-sm font-medium text-hz-footer-fg no-underline',
                'transition-colors duration-200 hover:border-hz-footer-fg/50 hover:bg-hz-footer-fg/10'
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
