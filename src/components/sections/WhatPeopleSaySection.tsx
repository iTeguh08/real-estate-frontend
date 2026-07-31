import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import { TESTIMONIALS } from '@/data/testimonials';
import { useHomepageQuery } from '@/hooks/queries';
import type { Testimonial } from '@/types';

interface WhatPeopleSaySectionProps {
  testimonials?: Testimonial[];
  eyebrow?: string;
  title?: string;
}

export function WhatPeopleSaySection({
  testimonials: testimonialsProp,
  eyebrow: eyebrowProp,
  title: titleProp,
}: WhatPeopleSaySectionProps) {
  const { data: homepage } = useHomepageQuery();
  const cmsTestimonials = homepage?.testimonials;

  const testimonials: Testimonial[] =
    testimonialsProp ??
    cmsTestimonials?.items.map((item) => ({
      id: item.id,
      quote: item.quote,
      author: item.author,
      role: item.role,
      avatarUrl: item.avatarUrl,
      rating: item.rating,
    })) ??
    TESTIMONIALS;

  const eyebrow = eyebrowProp ?? cmsTestimonials?.eyebrow ?? 'Client Stories';
  const title = titleProp ?? cmsTestimonials?.title ?? 'What People Say';

  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(
    testimonials.length
  );

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-hz-sunken"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-0 isolate overflow-hidden bg-hz-footer px-5 pb-44 pt-16 text-center md:px-10 md:pb-56 md:pt-20">
        <SectionAtmosphere
          tone="dark"
          intensity="strong"
          variant="ambient"
          side="right"
          image="interior-dark"
        />
        <p className="relative z-10 mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          {eyebrow}
        </p>
        <h2
          id="testimonials-heading"
          className="relative z-10 font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-footer-fg md:text-[36px]"
        >
          {title}
        </h2>
      </div>

      <div className="section-container relative z-20">
        <div
          className="-mt-32 touch-pan-y md:-mt-40"
          {...swipeHandlers}
        >
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            role="list"
            aria-label="Client testimonials"
          >
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} role="listitem" className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <CarouselControls
          count={testimonials.length}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          onPrev={goPrev}
          onNext={goNext}
          itemLabel="testimonial"
          tone="light"
          className="mt-8 pb-16 md:pb-20"
        />
      </div>
    </section>
  );
}
