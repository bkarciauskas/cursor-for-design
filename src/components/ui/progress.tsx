import { cn } from "@/lib/cn";

export function Progress({
  value,
  tone = "accent",
  className,
  label,
}: {
  value: number;
  tone?: "accent" | "success" | "warning" | "info";
  className?: string;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fills = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
  } as const;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("bg-card-04 h-1.5 w-full overflow-hidden rounded-full", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", fills[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
