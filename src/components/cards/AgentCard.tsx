import { AppLink } from '@/lib/app-link';
import { Phone } from 'lucide-react';
import { MediaImage } from '@/components/ui/media-image';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import { productThumbUrl } from '@/lib/image-url';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const { name, role, avatarUrl, phone, avatarObjectPosition = 'center 30%', slug } = agent;
  const profilePath = routes.agent(slug);

  return (
    <article className={cn('group relative', className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-hz border-hz-border">
        <MediaImage
          mediaUrl={productThumbUrl(avatarUrl)}
          fitCover
          coverEstimate={{ width: 340, height: 212 }}
          coverMaxWidth={680}
          alt={name}
          className="object-cover transition-transform duration-400 group-hover:scale-105"
          style={{ objectPosition: avatarObjectPosition }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex items-end justify-between gap-4 pt-4">
        <div className="min-w-0">
          <h3 className="truncate font-poppins text-lg font-semibold text-hz-dark transition-colors duration-200 group-hover:text-hz-primary md:text-xl">
            <AppLink to={profilePath} className="no-underline text-inherit" aria-label={`View profile for ${name}`}>
              {name}
              <span className="absolute inset-0" aria-hidden="true" />
            </AppLink>
          </h3>
          <p className="mt-0.5 font-poppins text-sm text-hz-muted">{role}</p>
        </div>

        {phone ? (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className={cn(
              'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center',
              'text-hz-dark transition-colors duration-200',
              'hover:text-hz-primary'
            )}
            aria-label={`Call ${name}`}
          >
            <Phone size={22} strokeWidth={2.25} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center text-hz-muted/50"
            aria-hidden="true"
          >
            <Phone size={22} strokeWidth={2.25} />
          </span>
        )}
      </div>
    </article>
  );
}
