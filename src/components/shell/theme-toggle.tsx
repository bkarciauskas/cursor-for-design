"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useDarkMode } from "@/lib/client-store";

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "border-border inline-flex size-9 items-center justify-center rounded-md border",
        "bg-card-01 text-muted hover:text-fg hover:bg-card-03 transition-colors",
        "focus-visible:focus-ring focus-visible:outline-none",
        className,
      )}
    >
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
