import { cn } from '@/lib/utils';
import { MediaImage } from '@/components/ui/media-image';

interface PropertyMediaSlotFieldProps {
  id: string;
  label: string;
  help: string;
  previewUrl: string | null;
  disabled?: boolean;
  busy?: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
}

const ACCEPT = '.jpg,.jpeg,.png,.webp';
const MAX_BYTES = 5 * 1024 * 1024;

export function PropertyMediaSlotField({
  id,
  label,
  help,
  previewUrl,
  disabled,
  busy,
  onUpload,
  onClear,
}: PropertyMediaSlotFieldProps) {
  return (
    <div className="space-y-2 rounded-hz border border-hz-border p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-poppins text-sm font-medium text-hz-dark">{label}</p>
          <p className="mt-0.5 font-poppins text-xs text-hz-muted">{help}</p>
        </div>
        {previewUrl && !disabled ? (
          <button
            type="button"
            disabled={busy}
            onClick={onClear}
            className="font-poppins text-xs font-semibold text-red-700 hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        ) : null}
      </div>

      {previewUrl ? (
        <div className="relative h-36 overflow-hidden rounded-hz ring-1 ring-hz-border">
          <MediaImage
            src={previewUrl}
            alt={label}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-36 items-center justify-center rounded-hz bg-hz-bg-soft ring-1 ring-dashed ring-hz-border">
          <p className="px-3 text-center font-poppins text-xs text-hz-muted">
            No upload yet — public site may show Unsplash fallback until you upload.
          </p>
        </div>
      )}

      {!disabled ? (
        <input
          id={id}
          type="file"
          accept={ACCEPT}
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            e.target.value = '';
            if (!file) return;
            if (file.size > MAX_BYTES) {
              window.alert('Image must be 5MB or smaller.');
              return;
            }
            onUpload(file);
          }}
          className={cn(
            'block w-full font-poppins text-sm text-hz-dark',
            'file:mr-3 file:rounded-hz file:border-0 file:bg-hz-primary/10',
            'file:px-3 file:py-2 file:font-poppins file:text-sm file:font-medium file:text-hz-primary',
            busy && 'opacity-50'
          )}
        />
      ) : null}
    </div>
  );
}
