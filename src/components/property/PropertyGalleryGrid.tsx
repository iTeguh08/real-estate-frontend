import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { MediaImage } from '@/components/ui/media-image';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import {
  PROPERTY_GALLERY_COUNT,
  PROPERTY_GALLERY_PAGE_SIZE,
} from '@/lib/property-gallery';
import { galleryOriginalUrl, galleryPreviewUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import type { PropertyGalleryImage } from '@/types';

export interface PropertyGalleryGridProps {
  images: PropertyGalleryImage[];
  title: string;
}

/** Full pages of 4 only — matches the CMS requirement of exactly 8 gallery photos. */
function chunkFullPages(images: PropertyGalleryImage[], size: number) {
  const pages: PropertyGalleryImage[][] = [];
  const usable = images.slice(0, Math.floor(images.length / size) * size);
  for (let i = 0; i < usable.length; i += size) {
    pages.push(usable.slice(i, i + size));
  }
  return pages;
}

function GalleryTile({
  image,
  onOpen,
  className,
  imageSize = 720,
}: {
  image: PropertyGalleryImage;
  onOpen: () => void;
  className?: string;
  imageSize?: number;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group relative overflow-hidden rounded-hz bg-hz-sunken',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2',
        className
      )}
      aria-label={`Open gallery image: ${image.alt}`}
    >
      <MediaImage
        src={galleryPreviewUrl(image, imageSize)}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        wrapperClassName="absolute inset-0"
      />
    </button>
  );
}

/** Same filled bento on every carousel page (4 tiles — large left + 3 right). */
function GalleryBentoPage({
  pageImages,
  pageOffset,
  onOpen,
}: {
  pageImages: PropertyGalleryImage[];
  pageOffset: number;
  onOpen: (absoluteIndex: number) => void;
}) {
  const [a, b, c, d] = pageImages;
  if (!a || !b || !c || !d) return null;

  const openAt = (localIndex: number) => onOpen(pageOffset + localIndex);

  return (
    <div className="grid h-[min(120vw,560px)] grid-cols-2 grid-rows-2 gap-3 md:h-[min(42vw,500px)] md:grid-cols-12 md:gap-4">
      <GalleryTile
        image={a}
        onOpen={() => openAt(0)}
        className="min-h-0 md:col-span-7 md:row-span-2"
        imageSize={900}
      />
      <GalleryTile
        image={b}
        onOpen={() => openAt(1)}
        className="min-h-0 md:col-span-5"
        imageSize={560}
      />
      <GalleryTile
        image={c}
        onOpen={() => openAt(2)}
        className="min-h-0 md:col-span-5 md:hidden"
        imageSize={480}
      />
      <GalleryTile
        image={d}
        onOpen={() => openAt(3)}
        className="min-h-0 md:hidden"
        imageSize={480}
      />
      <div className="hidden min-h-0 grid-cols-2 gap-4 md:col-span-5 md:grid">
        <GalleryTile image={c} onOpen={() => openAt(2)} className="min-h-0" imageSize={480} />
        <GalleryTile image={d} onOpen={() => openAt(3)} className="min-h-0" imageSize={480} />
      </div>
    </div>
  );
}

export function PropertyGalleryGrid({ images, title }: PropertyGalleryGridProps) {
  const pages = useMemo(
    () => chunkFullPages(images, PROPERTY_GALLERY_PAGE_SIZE),
    [images]
  );
  const pageCount = pages.length;
  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(pageCount);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selected = lightboxIndex !== null ? images[lightboxIndex] : null;

  useEffect(() => {
    if (activeIndex >= pageCount && pageCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, pageCount, setActiveIndex]);

  if (images.length < PROPERTY_GALLERY_PAGE_SIZE || pageCount === 0) {
    return null;
  }

  const activePage = pages[activeIndex] ?? pages[0]!;
  const pageOffset = activeIndex * PROPERTY_GALLERY_PAGE_SIZE;

  const goLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const goLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  return (
    <>
      <section
        aria-labelledby="property-gallery-heading"
        className="relative bg-hz-elevated pt-8 pb-12 md:pt-10 md:pb-16"
      >
        <div className="section-container">
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                Gallery
              </p>
              <h2
                id="property-gallery-heading"
                className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
              >
                Explore every angle
              </h2>
            </div>
            <p className="max-w-sm font-poppins text-sm leading-relaxed text-hz-muted">
              {Math.min(images.length, PROPERTY_GALLERY_COUNT)} curated views of {title}
            </p>
          </div>

          <div className="touch-pan-y" {...swipeHandlers}>
            <GalleryBentoPage
              pageImages={activePage}
              pageOffset={pageOffset}
              onOpen={setLightboxIndex}
            />
          </div>

          {pageCount > 1 ? (
            <CarouselControls
              count={pageCount}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onPrev={goPrev}
              onNext={goNext}
              itemLabel="gallery page"
              className="mt-8"
            />
          ) : null}
        </div>
      </section>

      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null);
        }}
      >
        {selected && lightboxIndex !== null ? (
          <DialogContent className="top-[54%] w-fit max-w-[min(92vw,880px)] gap-0 overflow-visible bg-transparent p-0 ring-0 sm:max-w-[min(92vw,880px)]">
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.alt}</DialogTitle>
              <DialogDescription>Expanded gallery view for {title}</DialogDescription>
            </DialogHeader>
            <div className="relative overflow-hidden rounded-hz bg-hz-inverse shadow-hz-md">
              <MediaImage
                src={galleryOriginalUrl(selected)}
                alt={selected.alt}
                decoding="async"
                wrapperClassName="flex min-h-[200px] items-center justify-center"
                className="h-auto max-h-[min(70vh,620px)] w-auto max-w-[min(92vw,880px)] object-contain"
              />
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goLightboxPrev}
                    aria-label="Previous gallery image"
                    className="absolute top-1/2 left-2.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 md:left-3 md:size-10"
                  >
                    <ChevronLeft size={18} strokeWidth={1.85} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goLightboxNext}
                    aria-label="Next gallery image"
                    className="absolute top-1/2 right-2.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65 md:right-3 md:size-10"
                  >
                    <ChevronRight size={18} strokeWidth={1.85} aria-hidden="true" />
                  </button>
                  <p className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-poppins text-xs text-white">
                    {lightboxIndex + 1} / {images.length}
                  </p>
                </>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
