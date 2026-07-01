import { Star } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { quote, author, role, avatarUrl, rating = 5 } = testimonial;

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-hz border border-hz-border bg-white p-6 shadow-sm sm:p-7',
        className
      )}
    >
      <div className="mb-4 flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            weight={i < rating ? 'fill' : 'regular'}
            className={i < rating ? 'text-amber-400' : 'text-hz-border'}
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="flex-1">
        <p className="font-poppins text-[13.5px] leading-[1.7] text-hz-body sm:text-sm">
          {quote}
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-hz-border pt-5">
        <img
          src={avatarUrl}
          alt={author}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-hz-border"
          loading="lazy"
        />
        <div className="min-w-0">
          <cite className="not-italic">
            <p className="truncate font-poppins text-sm font-semibold text-hz-dark sm:text-[15px]">
              {author}
            </p>
          </cite>
          <p className="truncate font-poppins text-xs text-hz-muted sm:text-[13px]">{role}</p>
        </div>
      </footer>
    </article>
  );
}
