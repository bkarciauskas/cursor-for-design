import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-accent mb-2 text-xs font-semibold tracking-[0.12em] uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-title font-semibold">{title}</h1>
        {description && (
          <p className="text-muted mt-1.5 max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-subtle text-[11px] font-semibold tracking-[0.12em] uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
