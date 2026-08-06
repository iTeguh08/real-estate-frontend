import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import { listingsHref } from '@/data/navigation';
import { useHomepageQuery } from '@/hooks/queries';
import { useTheme } from '@/hooks/useTheme';
import type { HomepageExpertiseItem } from '@/data/cms-fallbacks';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import {
  VillaIllustration,
  ApartmentIllustration,
  CommercialIllustration,
} from '@/components/icons/PropertyTypeIllustrations';

const SERVICE_META = {
  buy: {
    Illustration: VillaIllustration,
    href: listingsHref({ status: 'For Sale' }),
    cta: 'Browse homes for sale',
  },
  rent: {
    Illustration: ApartmentIllustration,
    href: listingsHref({ status: 'For Rent' }),
    cta: 'Explore rentals',
  },
  sell: {
    Illustration: CommercialIllustration,
    href: routes.submitProperty,
    cta: 'List your property',
  },
} as const;

type ExpertiseItem = HomepageExpertiseItem & {
  Illustration: React.ComponentType<{ className?: string; iconClassName?: string }>;
  href: string;
  cta: string;
};

const KEY_DIFFERENTIATORS = [
  { value: '3,500+', label: 'Closings guided' },
  { value: '98%', label: 'Client recommend' },
  { value: '12+', label: 'Years in market' },
  { value: '40+', label: 'Local advisors' },
];

function ExpertiseMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 sm:px-4 sm:first:pl-0 sm:last:pr-0">
      <span className="font-poppins text-2xl font-semibold tracking-tight text-hz-dark md:text-[28px]">
        {value}
      </span>
      <span className="font-poppins text-[12px] leading-snug text-hz-muted">{label}</span>
    </div>
  );
}

function ExpertiseServiceCard({ item }: { item: ExpertiseItem }) {
  const { Illustration, label, description, href, cta } = item;

  return (
    <Link
      to={href}
      className={cn(
        'group relative flex w-full items-center gap-5 no-underline',
        'overflow-hidden rounded-hz border border-hz-border bg-hz-elevated p-5 md:gap-6 md:p-6',
        'shadow-hz-sm',
        'transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-hz-primary/40 hover:shadow-hz-elevated'
      )}
      aria-label={`${label} — ${cta}`}
    >
      <div
        className="hidden h-[88px] w-20 shrink-0 items-center justify-center md:flex"
        aria-hidden="true"
      >
        <Illustration
          className="flex h-full w-full items-center justify-center"
          iconClassName="!h-full !w-full !translate-y-0 hz-raster-icon-on-surface"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 pr-4 md:pr-8">
        <h3 className="font-poppins text-lg font-semibold leading-tight text-hz-dark transition-colors duration-200 group-hover:text-hz-primary">
          {label}
        </h3>
        <p className="hz-lead text-hz-body">{description}</p>
        <span className="mt-1 inline-flex w-fit items-center gap-1.5 font-poppins text-[13px] font-semibold text-hz-dark transition-colors duration-200 group-hover:text-hz-primary">
          {cta}
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function ExpertiseSection() {
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const { data: homepage } = useHomepageQuery();
  const expertise = homepage?.expertise;

  const items: ExpertiseItem[] = (expertise?.items ?? []).map((item) => {
    const meta = SERVICE_META[item.id] ?? SERVICE_META.buy;
    return { ...item, ...meta };
  });

  if (!expertise || items.length === 0) {
    return null;
  }

  return (
    <section
      id="expertise"
      className="relative w-full overflow-hidden bg-hz-sunken py-16 md:py-24"
      aria-labelledby="expertise-heading"
    >
      <SectionAtmosphere
        tone={isNavy ? 'dark' : 'light'}
        surface="sunken"
        intensity="quiet"
        variant="dual"
        side="left"
        image="none"
        className="max-md:hidden"
      />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="hz-eyebrow text-hz-primary">
                {expertise.eyebrow}
              </p>
              <h2
                id="expertise-heading"
                className="hz-section-title max-w-[420px] text-hz-dark"
              >
                {expertise.title}
              </h2>
              <p className="hz-lead max-w-[460px] text-hz-muted">
                {expertise.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-hz border border-hz-border bg-hz-elevated/95 p-5 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-hz-border sm:p-6">
              {KEY_DIFFERENTIATORS.map((item) => (
                <ExpertiseMetric key={item.label} value={item.value} label={item.label} />
              ))}
            </div>

            <ul className="flex flex-col gap-3" aria-label="Why clients choose Homzen">
              {[
                'End-to-end guidance from first viewing to closing',
                'Local advisors with live market insight',
                'Curated listings you will not find on mass portals',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hz-primary"
                    aria-hidden="true"
                  >
                    <Check size={11} strokeWidth={2.75} className="text-white" />
                  </span>
                  <span className="font-poppins text-sm leading-snug text-hz-body">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              to={routes.contact}
              className={cn(
                'inline-flex w-fit items-center gap-2 self-start rounded-hz',
                'bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white no-underline',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              Talk to an advisor
              <ArrowRight size={15} strokeWidth={1.75} />
            </Link>
          </div>

          <div
            className="mx-auto flex w-full max-w-[560px] flex-col gap-4 lg:mx-0 lg:max-w-none"
            role="list"
            aria-label="Our services"
          >
            {items.map((item) => (
              <div key={item.id} role="listitem">
                <ExpertiseServiceCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
