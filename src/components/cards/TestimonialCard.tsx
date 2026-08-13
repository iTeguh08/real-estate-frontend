import { Star } from '@phosphor-icons/react';
import { MediaImage } from '@/components/ui/media-image';
import { productThumbUrl } from '@/lib/image-url';
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
        'flex h-full flex-col rounded-hz border-hz-border bg-hz-elevated p-6 shadow-sm sm:p-7',
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
        <p className="font-poppins text-sm leading-[1.7] text-hz-body">
          {quote}
        </p>
      </blockquote>

      <footer className="mt-6 flex items-center gap-3 border-t border-hz-border pt-5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-hz-border">
          <MediaImage
            mediaUrl={productThumbUrl(avatarUrl)}
            fitCover
            coverEstimate={{ width: 40, height: 40 }}
            coverMaxWidth={128}
            alt={author}
            loading="lazy"
            decoding="async"
            className="object-cover"
          />
        </div>
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
