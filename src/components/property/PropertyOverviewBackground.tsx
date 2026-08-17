import { MediaImage } from '@/components/ui/media-image';

export interface PropertyOverviewBackgroundProps {
  imageUrl: string;
}

export function PropertyOverviewBackground({ imageUrl }: PropertyOverviewBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 max-md:hidden" aria-hidden="true">
      <MediaImage
        mediaUrl={imageUrl}
        fitCover
        coverEstimate={{ width: 720, height: 900 }}
        coverMaxWidth={1200}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover object-[center_35%] opacity-[0.08] md:opacity-[0.10] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)]"
        wrapperClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-hz-elevated from-0% via-hz-elevated/90 via-[16%] via-hz-elevated/45 via-[32%] to-transparent to-[52%]" />
    </div>
  );
}