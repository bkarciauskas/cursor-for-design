import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Which way the number moved. Drives the arrow only. */
export type TrendDirection = "up" | "down" | "flat";
/** Whether that move is good news. Drives the colour only. */
export type TrendSentiment = "positive" | "negative" | "neutral";

const arrows: Record<TrendDirection, typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight,
};

const sentiments: Record<TrendSentiment, string> = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-muted",
};

export function StatCard({
  label,
  value,
  delta,
  direction = "flat",
  sentiment = "neutral",
  hint,
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  direction?: TrendDirection;
  sentiment?: TrendSentiment;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  const Arrow = arrows[direction];

  return (
    <div
      className={cn(
        "border-border bg-card rounded-lg border px-5 py-4",
        "hover:border-border-strong transition-colors duration-150",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted text-xs font-medium">{label}</span>
        {icon && <span className="text-subtle">{icon}</span>}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              sentiments[sentiment],
            )}
          >
            <Arrow className="size-3.5" />
            {delta}
          </span>
        )}
      </div>

      {hint && <p className="text-subtle mt-1.5 text-xs">{hint}</p>}
    </div>
  );
}
