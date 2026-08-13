import { Check } from 'lucide-react';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { MediaImage } from '@/components/ui/media-image';
import type { PropertyDetail } from '@/types';

export interface PropertyFeaturesBlockProps {
  property: Pick<PropertyDetail, 'title' | 'features' | 'layout1Media' | 'imageUrl' | 'imageUrlOriginal'>;
}

export function PropertyFeaturesBlock({ property }: PropertyFeaturesBlockProps) {
  const { title, features, layout1Media } = property;
  const bannerMedia = layout1Media.bannerUrl || property.imageUrl;

  return (
    <section
      aria-labelledby="property-features-heading"
      className="relative overflow-hidden bg-hz-footer py-16 md:py-20"
    >
      <SectionAtmosphere
        tone="dark"
        surface="footer"
        intensity="default"
        variant="edge"
        side="left"
        image="interior-dark"
        className="max-md:hidden"
      />
      <div className="section-container relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
        <div className="lg:pr-6">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-footer-fg/65">
            Key Highlights
          </p>
          <h2
            id="property-features-heading"
            className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-footer-fg text-balance md:text-[36px]"
          >
            What makes this home stand out
          </h2>
          <div className="mt-4 h-px w-16 bg-hz-elevated/35" aria-hidden="true" />
          <p className="mt-5 max-w-lg font-poppins text-sm leading-[1.65] text-hz-footer-fg/75 text-pretty md:text-base">
            Curated finishes and practical upgrades across {title}.
          </p>
          <ul className="mt-10 space-y-4" role="list">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 border-b border-hz-footer-fg/10 pb-4 last:border-0"
              >
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-hz-primary text-white"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span className="font-poppins text-sm leading-relaxed text-hz-footer-fg/92 md:text-[15px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden border-hz-elevated/90 shadow-2xl lg:aspect-[4/3]">
            <MediaImage
              mediaUrl={bannerMedia}
              fitCover
              coverEstimate={{ width: 640, height: 480 }}
              coverMaxWidth={1200}
              alt={`${title} — featured interior`}
              loading="lazy"
              decoding="async"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
