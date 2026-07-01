import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { TESTIMONIALS } from '@/data/testimonials';
import type { Testimonial } from '@/types';

interface WhatPeopleSaySectionProps {
  testimonials?: Testimonial[];
}

export function WhatPeopleSaySection({
  testimonials = TESTIMONIALS,
}: WhatPeopleSaySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
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
