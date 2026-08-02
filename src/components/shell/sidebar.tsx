"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChartNoAxesColumn,
  LayoutDashboard,
  MessageSquareDot,
  Presentation,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/avatar";

const primaryNav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reviews", label: "Reviews", icon: MessageSquareDot, count: 6 },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/insights", label: "Insights", icon: ChartNoAxesColumn },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-card-01 border-border flex w-60 shrink-0 flex-col border-r">
      <div className="border-border flex h-14 items-center gap-2.5 border-b px-5">
        <span className="bg-accent text-accent-fg flex size-6 items-center justify-center rounded-md text-xs font-bold">
          L
        </span>
        <span className="text-sm font-semibold tracking-tight">Loop</span>
        <span className="text-subtle ml-auto font-mono text-[10px]">v2.4</span>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {primaryNav.map(({ href, label, icon: Icon, ...rest }) => {
          const active = pathname === href;
          const count = "count" in rest ? rest.count : undefined;

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-card-03 text-fg font-medium"
                  : "text-muted hover:text-fg hover:bg-card-02",
              )}
            >
              <Icon className={cn("size-4", active && "text-accent")} />
              {label}
              {count !== undefined && (
                <span className="text-subtle ml-auto font-mono text-[11px]">{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/demo"
          className={cn(
            "flex items-center gap-2.5 rounded-md border border-dashed px-2.5 py-2 text-sm transition-colors",
            pathname === "/demo"
              ? "border-accent bg-accent-soft text-accent font-medium"
              : "border-border-strong text-muted hover:text-accent hover:border-accent",
          )}
        >
          <Presentation className="size-4" />
          Demo script
        </Link>
      </div>

      <div className="border-border flex items-center gap-2.5 border-t px-4 py-3">
        <Avatar name="Mara Ellis" size="sm" />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-medium">Mara Ellis</p>
          <p className="text-subtle truncate text-[11px]">Design systems</p>
        </div>
      </div>
    </aside>
  );
}
