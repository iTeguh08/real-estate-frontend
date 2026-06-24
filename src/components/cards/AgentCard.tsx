import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const { name, role, avatarUrl, phone, avatarObjectPosition = 'center 30%' } = agent;

  return (
    <article className={cn('group', className)}>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
          style={{ objectPosition: avatarObjectPosition }}
          loading="lazy"
        />
      </div>

      <div className="flex items-end justify-between gap-4 pt-4">
        <div className="min-w-0">
          <h3 className="truncate font-sans text-base font-semibold text-luxury-dark">
            {name}
          </h3>
          <p className="mt-0.5 font-sans text-sm text-luxury-muted">{role}</p>
        </div>

        {phone ? (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center',
              'text-luxury-dark transition-colors duration-200',
              'hover:text-luxury-crimson'
            )}
            aria-label={`Call ${name}`}
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center text-luxury-muted/50"
            aria-hidden="true"
          >
            <Phone size={20} strokeWidth={1.5} />
          </span>
        )}
      </div>
    </article>
  );
}
