import { useState } from 'react';
import { cn } from '@/lib/utils';
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
  {
    id: 't4',
    quote:
      'The entire experience felt personal and professional. They guided us through every detail with patience and expertise we have rarely seen elsewhere.',
    author: 'Leon McKenzie',
    role: 'CEO, Apple',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

interface WhatPeopleSaySectionProps {
  testimonials?: Testimonial[];
}

export function WhatPeopleSaySection({
  testimonials = STUB_TESTIMONIALS,
}: WhatPeopleSaySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ];

  return (
    <section
      className="w-full bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="bg-hz-dark px-5 pb-44 pt-16 text-center md:px-10 md:pb-56 md:pt-20">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-white">
          Client Stories
        </p>
        <h2
          id="testimonials-heading"
          className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-white md:text-[36px]"
        >
          What People Say
        </h2>
      </div>

      <div className="section-container">
        <div
          className="-mt-32 grid grid-cols-1 gap-3 sm:grid-cols-2 md:-mt-40"
          role="list"
          aria-label="Client testimonials"
        >
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} role="listitem" className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 pb-16 md:pb-20">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-200',
                activeIndex === index
                  ? 'bg-hz-primary'
                  : 'bg-hz-border hover:bg-hz-muted'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
