import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { section, luxuryButton, sectionEyebrow } from '@/lib/cva';
import {
  BuyHomeIllustration,
  RentHomeIllustration,
  SellHomeIllustration,
} from '@/components/icons/ExpertiseIllustrations';

interface ExpertiseItem {
  id: string;
  label: string;
  description: string;
  Illustration: React.ComponentType<{ className?: string; strokeClassName?: string }>;
}

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'buy',
    label: 'Buy A Home',
    description:
      'Find your place with an immersive photo experience and the most listings, including things you won\'t find anywhere else.',
    Illustration: BuyHomeIllustration,
  },
  {
    id: 'rent',
    label: 'Rent A Home',
    description:
      'We\'re creating a seamless online experience — from shopping on the largest rental network to applying, to paying rent.',
    Illustration: RentHomeIllustration,
  },
  {
    id: 'sell',
    label: 'Sell A Home',
    description:
      'No matter what path you take to sell your home, we can help you navigate a successful sale.',
    Illustration: SellHomeIllustration,
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
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-luxury-crimson/10 ring-1 ring-luxury-crimson/30"
        aria-hidden="true"
      >
        <Check size={11} strokeWidth={2.75} className="text-luxury-crimson" />
      </span>
      <div>
        <span className="font-sans text-sm font-semibold text-luxury-dark">{value}</span>
        <span className="ml-1.5 font-sans text-sm text-luxury-muted">{label}</span>
      </div>
    </div>
  );
}

export function ExpertiseSection() {
  return (
    <section
      className={cn(section({ spacing: 'md', bg: 'white' }))}
      aria-labelledby="expertise-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy block (layout unchanged — checklist icons only) ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className={cn(sectionEyebrow(), 'mb-2')}>
                Our Expertise
              </p>
              <h2
                id="expertise-heading"
                className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight tracking-[-0.02em] text-luxury-dark"
                style={{ fontFamily: 'var(--font-display)' }}
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

            <Button
              variant="ghost"
              className={cn(
                luxuryButton({ variant: 'crimson', size: 'md' }),
                'mt-2 gap-1.5 self-start'
              )}
              aria-label="Learn more about us"
            >
              Learn More
              <ArrowRight size={14} strokeWidth={1.5} />
            </Button>
          </div>

          {/* ── Right: Service cards with sketch illustrations ─────────── */}
          <div className="flex flex-col gap-0" role="list" aria-label="Our services">
            {EXPERTISE_ITEMS.map((item, index) => (
              <div key={item.id} role="listitem">
                <div className="group -mx-4 flex cursor-pointer items-start gap-5 rounded-xl px-4 py-6 transition-colors duration-200 hover:bg-luxury-cream">
                  <span
                    className="mt-0.5 flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl border border-luxury-border bg-luxury-cream transition-colors duration-300 group-hover:border-luxury-crimson/25 group-hover:bg-luxury-crimson/5 sm:h-20 sm:w-20"
                    aria-hidden="true"
                  >
                    <item.Illustration className="h-11 w-11 sm:h-12 sm:w-12" />
                  </span>
                  <div className="min-w-0 flex flex-col gap-1.5">
                    <h3 className="font-sans text-sm font-semibold text-luxury-dark transition-colors duration-200 group-hover:text-luxury-crimson">
                      {item.label}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-luxury-muted">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="mt-2 shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowRight size={15} strokeWidth={1.5} className="text-luxury-crimson" />
                  </span>
                </div>
                {index < EXPERTISE_ITEMS.length - 1 && (
                  <Separator className="bg-luxury-border" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
