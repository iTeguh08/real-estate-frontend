import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { DotCarouselSlide, DotCarouselTrack } from '@/components/ui/DotCarouselTrack';
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

  return (
    <section
      id="testimonials"
      className="section-defer relative w-full bg-hz-sunken"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-0 isolate overflow-hidden bg-hz-footer pb-44 pt-16 text-center md:pb-56 md:pt-20">
        <SectionAtmosphere
          tone="dark"
          intensity="strong"
          variant="ambient"
          side="right"
          image="interior-dark"
          className="max-md:hidden"
        />
        <div className="section-container relative z-10">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            {eyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="font-poppins hz-h2 font-semibold leading-[1.2] tracking-[-0.3px] text-hz-footer-fg"
          >
            {title}
          </h2>
        </div>
      </div>

      <div className="section-container relative z-20">
        <DotCarouselTrack
          activeIndex={activeIndex}
          swipeHandlers={swipeHandlers}
          className="-mt-28 md:-mt-40"
        >
          {testimonials.map((start, slideIndex) => {
            const pair = [
              start,
              testimonials[(slideIndex + 1) % testimonials.length],
            ];
            return (
              <DotCarouselSlide key={start.id}>
                <div
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                  role="list"
                  aria-label="Client testimonials"
                  aria-hidden={slideIndex !== activeIndex}
                >
                  {pair.map((testimonial) => (
                    <div key={`${start.id}-${testimonial.id}`} role="listitem" className="h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </DotCarouselSlide>
            );
          })}
        </DotCarouselTrack>

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
