import { Check } from 'lucide-react';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { MediaImage } from '@/components/ui/media-image';
import { mediaOriginalUrl, propertyOriginalUrl } from '@/lib/image-url';
import type { PropertyDetail } from '@/types';

export interface PropertyFeaturesBlockProps {
  property: Pick<PropertyDetail, 'title' | 'features' | 'layout1Media' | 'imageUrl' | 'imageUrlOriginal'>;
}

export function PropertyFeaturesBlock({ property }: PropertyFeaturesBlockProps) {
  const { title, features, layout1Media } = property;
  const bannerUrl = layout1Media.bannerUrl
    ? mediaOriginalUrl(layout1Media.bannerUrl, layout1Media.bannerUrlOriginal)
    : propertyOriginalUrl(property);

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
      <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
        <div className="lg:pr-6">
          <p className="hz-eyebrow mb-2 text-hz-footer-fg/65">
            Key Highlights
          </p>
          <h2
            id="property-features-heading"
            className="hz-section-title text-balance text-hz-footer-fg"
          >
            What makes this home stand out
          </h2>
          <div className="mt-4 h-px w-16 bg-hz-elevated/35" aria-hidden="true" />
          <p className="hz-lead mt-5 max-w-lg text-pretty text-hz-footer-fg/75">
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
              src={bannerUrl}
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
