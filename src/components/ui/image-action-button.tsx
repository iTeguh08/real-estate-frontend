import { cn } from '@/lib/utils';

interface ImageActionButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  active?: boolean;
}

export function ImageActionButton({
  label,
  onClick,
  children,
  size = 'md',
  active = false,
}: ImageActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex items-center justify-center rounded-full text-white backdrop-blur-[2px] transition-colors duration-200',
        'bg-black/45 hover:bg-black/65',
        active && 'bg-hz-primary/90 hover:bg-hz-primary',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
      )}
    >
      {children}
    </button>
  );
}
