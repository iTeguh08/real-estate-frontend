import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageActionButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  active?: boolean;
  loading?: boolean;
}

export function ImageActionButton({
  label,
  onClick,
  children,
  size = 'md',
  active = false,
  loading = false,
}: ImageActionButtonProps) {
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-label={label}
      aria-pressed={active}
      aria-busy={loading}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full text-white backdrop-blur-[2px] transition-colors duration-200',
        'bg-black/45 hover:bg-black/65',
        active && 'bg-hz-primary/90 hover:bg-hz-primary',
        loading && 'cursor-wait opacity-90',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
      )}
    >
      {loading ? (
        <Loader2 size={iconSize} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
}
