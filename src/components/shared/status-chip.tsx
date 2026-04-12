import { cn } from "@/lib/utils";

interface StatusChipProps {
  label: string;
  value?: string;
  className?: string;
}

export function StatusChip({ label, value, className }: StatusChipProps) {
  return (
    <span className={cn("status-chip", className)}>
      <span aria-hidden className="status-chip-dot" />
      <span className="status-chip-label">{label}</span>
      {value ? <span className="status-chip-value">{value}</span> : null}
    </span>
  );
}
