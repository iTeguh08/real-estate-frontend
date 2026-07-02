export function DetailSpec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-hz border border-hz-border bg-[#F8F8F8] px-3 py-2">
      <span className="text-hz-dark/80" aria-hidden="true">
        {icon}
      </span>
      <span className="font-poppins text-sm text-hz-dark">
        <span className="font-medium">{value}</span>
        <span className="text-hz-muted">{label}</span>
      </span>
    </div>
  );
}
