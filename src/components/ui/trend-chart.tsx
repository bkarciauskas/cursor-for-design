import { cn } from "@/lib/cn";

/* Deliberately plain SVG rather than a charting library: it keeps the
   rendered markup legible when this screen is pushed into Figma. */
export function TrendChart({
  data,
  labels,
  className,
}: {
  data: number[];
  labels?: string[];
  className?: string;
}) {
  const max = Math.max(...data);

  return (
    <div className={cn("flex items-end gap-1.5", className)}>
      {data.map((value, index) => {
        const isLatest = index === data.length - 1;

        return (
          <div key={index} className="group flex h-full flex-1 flex-col justify-end gap-2">
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 rounded-t-sm transition-colors",
                  isLatest ? "bg-accent" : "bg-card-04 group-hover:bg-border-strong",
                )}
                style={{ height: `${(value / max) * 100}%` }}
              />
            </div>
            {labels?.[index] && (
              <span className="text-subtle text-center text-[10px]">{labels[index]}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
