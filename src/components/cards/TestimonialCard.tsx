import { Star } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

const PAPER_TILTS = [
  {
    tilt: 'md:-rotate-[1.35deg] md:translate-y-3',
    tape: '-rotate-[2deg]',
    avatar: 'rotate-[2.5deg]',
  },
  {
    tilt: 'md:rotate-[1.05deg] md:-translate-y-1',
    tape: 'rotate-[1.5deg]',
    avatar: '-rotate-[1.5deg]',
  },
  {
    tilt: 'md:-rotate-[0.65deg] md:translate-y-5',
    tape: '-rotate-[1deg]',
    avatar: 'rotate-[1deg]',
  },
] as const;

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  index = 0,
  className,
}: TestimonialCardProps) {
  const { quote, author, role, avatarUrl, rating = 5 } = testimonial;
  const variant = PAPER_TILTS[index % PAPER_TILTS.length];

  return (
    <article
      className={cn(
        'paper-note-tilt paper-note-surface paper-note-grain relative flex h-full flex-col',
        'rounded-[3px_2px_4px_2px/2px_3px_2px_4px] border border-paper-edge/70',
        'px-6 pb-6 pt-9 sm:px-7 sm:pb-7 sm:pt-10',
        'shadow-[1px_2px_0_rgba(55,42,30,0.04),3px_5px_14px_rgba(55,42,30,0.07),8px_16px_32px_rgba(55,42,30,0.05)]',
        variant.tilt,
        className
      )}
    >
      {/* Washi tape — hand-placed strip */}
      <div
        className={cn(
          'pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-18 -translate-x-1/2 sm:w-20',
          variant.tape
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'h-full w-full rounded-[1px]',
            'bg-paper-tape/75 shadow-[0_1px_2px_rgba(55,42,30,0.08)]',
            'ring-1 ring-paper-edge/40',
            'bg-[linear-gradient(95deg,color-mix(in_oklch,var(--color-paper-tape)_70%,white)_0%,var(--color-paper-tape)_45%,color-mix(in_oklch,var(--color-paper-tape)_55%,var(--color-paper-fiber))_100%)]'
          )}
        />
        <div className="absolute inset-x-1 top-0 h-px bg-white/35" />
        <div className="absolute inset-x-2 bottom-0 h-px bg-paper-edge/25" />
      </div>

      <span
        className="relative z-1 mb-3 block font-display text-[2.75rem] font-light italic leading-none text-luxury-crimson/30 sm:text-5xl"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-1 flex-1">
        <p className="font-display text-[1.05rem] font-light italic leading-[1.72] text-luxury-dark/88 sm:text-[1.125rem]">
          {quote}
        </p>
      </blockquote>

      <div
        className="relative z-1 mt-5 flex gap-0.5"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            weight={i < rating ? 'fill' : 'regular'}
            className={cn(
              'translate-y-px',
              i < rating ? 'text-luxury-crimson/85' : 'text-paper-edge'
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      <footer className="relative z-1 mt-6 flex items-center gap-3 border-t border-dashed border-paper-edge/80 pt-5">
        <div
          className={cn(
            'shrink-0 rounded-[2px] bg-paper-fiber/40 p-[3px] shadow-[1px_2px_4px_rgba(55,42,30,0.06)]',
            variant.avatar
          )}
        >
          <div className="h-9 w-9 overflow-hidden rounded-[1px] sm:h-10 sm:w-10">
            <img
              src={avatarUrl}
              alt={author}
              className="size-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
        <div className="min-w-0">
          <cite className="not-italic">
            <p className="truncate font-sans text-sm font-semibold tracking-[0.01em] text-luxury-dark">
              {author}
            </p>
          </cite>
          <p className="truncate font-sans text-xs text-luxury-muted/90">{role}</p>
        </div>
      </footer>
    </article>
  );
}
