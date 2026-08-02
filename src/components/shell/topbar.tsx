import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { AvatarStack } from "@/components/ui/avatar";
import { teamMembers } from "@/lib/data";

export function Topbar() {
  return (
    <header className="border-border bg-bg/80 sticky top-0 z-10 flex h-14 items-center gap-3 border-b px-6 backdrop-blur">
      <div className="relative w-full max-w-xs">
        <Search className="text-subtle pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search reviews, components…"
          className="border-border bg-card-01 placeholder:text-subtle focus-visible:focus-ring h-9 w-full rounded-md border pr-3 pl-8.5 text-sm focus-visible:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <AvatarStack names={teamMembers} />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          aria-label="Notifications"
          className="relative size-9 px-0"
        >
          <Bell className="size-4" />
          <span className="bg-accent ring-bg absolute top-2 right-2 size-1.5 rounded-full ring-2" />
        </Button>
        <Button variant="primary" size="sm">
          New review
        </Button>
      </div>
    </header>
  );
}
