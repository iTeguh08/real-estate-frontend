import { cn } from '@/lib/utils';
import { section, sectionEyebrow } from '@/lib/cva';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import type { Testimonial } from '@/types';

const STUB_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'From the first viewing to closing day, the team made everything effortless. They understood exactly what we were looking for and found us a home we still pinch ourselves over.',
    author: 'Emily Hartwell',
    role: 'Home Buyer, Cape Town',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'Professional, responsive, and genuinely invested in getting the best outcome. Our villa sold above asking within three weeks — I would not hesitate to recommend them.',
    author: 'David Okonkwo',
    role: 'Property Seller, Lisbon',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'As overseas investors, we needed an agency we could trust completely. Their market insight and transparent communication gave us confidence at every step of the purchase.',
    author: 'Priya Sharma',
    role: 'Investor, Dubai',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

interface WhatPeopleSaySectionProps {
  testimonials?: Testimonial[];
}

export function WhatPeopleSaySection({
  testimonials = STUB_TESTIMONIALS,
}: WhatPeopleSaySectionProps) {
  return (
    <section
      className={cn(section({ spacing: 'md', bg: 'cream' }))}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <header className="mb-12 text-center md:mb-14">
          <p className={cn(sectionEyebrow(), 'mb-2')}>
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-tight tracking-[-0.02em] text-luxury-dark"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What People Say
          </h2>
        </header>

        <div
          className="grid grid-cols-1 gap-8 px-1 pt-2 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12 lg:pt-4"
          role="list"
          aria-label="Client testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} role="listitem" className="h-full pt-3">
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
