import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  VillaIllustration,
  ApartmentIllustration,
  CommercialIllustration,
} from '@/components/icons/PropertyTypeIllustrations';

interface ExpertiseItem {
  id: string;
  label: string;
  description: string;
  Illustration: React.ComponentType<{ className?: string; iconClassName?: string }>;
}

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'buy',
    label: 'Buy A Home',
    description:
      "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
    Illustration: VillaIllustration,
  },
  {
    id: 'rent',
    label: 'Rent A Home',
    description:
      "We're creating a seamless online experience — from shopping on the largest rental network to applying, to paying rent.",
    Illustration: ApartmentIllustration,
  },
  {
    id: 'sell',
    label: 'Sell A Home',
    description:
      'No matter what path you take to sell your home, we can help you navigate a successful sale.',
    Illustration: CommercialIllustration,
  },
];

const KEY_DIFFERENTIATORS = [
  { value: '3,500+', label: 'Transactions Completed' },
  { value: '5-Star', label: 'Client Satisfaction' },
  { value: 'Proven', label: 'Market Knowledge' },
  { value: 'Expert', label: 'Local Advisors' },
];

function ExpertiseCheckItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600"
        aria-hidden="true"
      >
        <Check size={11} strokeWidth={2.75} className="text-white" />
      </span>
      <div>
        <span className="font-sans text-sm font-semibold text-luxury-dark">{value}</span>
        <span className="ml-1.5 font-sans text-sm text-luxury-muted">{label}</span>
      </div>
    </div>
  );
}

function ExpertiseServiceCard({ item }: { item: ExpertiseItem }) {
  const { Illustration, label, description } = item;

  return (
    <article
      className={cn(
        'group flex w-full items-center gap-6',
        'rounded-[8px] border border-[#EEEEEE] bg-white p-6',
        'shadow-[0_4px_20px_rgba(0,0,0,0.02)]',
        'transition-all duration-300',
        'hover:border-hz-primary/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
      )}
    >
      <div
        className="flex h-[88px] w-20 shrink-0 items-center justify-center"
        aria-hidden="true"
      >
        <Illustration
          className="flex h-full w-full items-center justify-center"
          iconClassName="!h-full !w-full !translate-y-0 object-contain object-center !brightness-100 !contrast-100"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <h3 className="font-poppins text-lg font-semibold leading-tight text-hz-dark transition-colors duration-200 group-hover:text-hz-primary">
          {label}
        </h3>
        <p className="font-poppins text-[13.5px] leading-[1.65] text-hz-body">
          {description}
        </p>
        <a
          href="#"
          className="mt-1 inline-flex w-fit items-center gap-1 font-poppins text-[13px] font-semibold text-hz-dark transition-colors duration-200 hover:text-hz-primary"
        >
          Learn More
          <ArrowRight size={14} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

export function ExpertiseSection() {
  return (
    <section
      className="w-full bg-[#F8F8F8] py-14 md:py-20"
      aria-labelledby="expertise-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                Our Expertise
              </p>
              <h2
                id="expertise-heading"
                className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
              >
                Discover What Sets Our Real Estate Expertise Apart
              </h2>
            </div>

            <p className="max-w-[460px] font-sans text-sm leading-relaxed text-luxury-muted">
              We provide a full suite of real estate services — from first consultation to
              closing — supported by market-leading data and a team of dedicated professionals
              who put your goals first.
            </p>

            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4">
              {KEY_DIFFERENTIATORS.map((item) => (
                <ExpertiseCheckItem key={item.label} value={item.value} label={item.label} />
              ))}
            </div>

            <a
              href="#"
              className="mt-2 flex items-center gap-1.5 self-start font-poppins text-[13px] text-hz-body transition-all duration-200 hover:text-hz-primary hover:underline hover:decoration-hz-primary hover:decoration-1 hover:underline-offset-4"
              aria-label="Learn more about us"
            >
              Learn More
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
          </div>

          {/* ── Right Column: stacked service cards ── */}
          <div
            className="mx-auto flex w-full max-w-[540px] flex-col gap-5 lg:mx-0 lg:max-w-none"
            role="list"
            aria-label="Our services"
          >
            {EXPERTISE_ITEMS.map((item) => (
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
