"use client";

import { useMemo, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { AvatarStack } from "@/components/ui/avatar";
import { NavigateButton } from "@/components/ui/action-button";
import { useToast } from "@/components/ui/toast";
import { reviews, teamMembers } from "@/lib/data";

export function Topbar() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return reviews.filter(
      (review) =>
        review.id.toLowerCase().includes(q) ||
        review.title.toLowerCase().includes(q) ||
        review.project.toLowerCase().includes(q) ||
        review.author.toLowerCase().includes(q),
    );
  }, [query]);

  const waiting = reviews.filter((r) => r.status !== "approved").length;

  return (
    <header className="border-border bg-bg/80 sticky top-0 z-10 flex h-14 items-center gap-3 border-b px-6 backdrop-blur">
      <div className="relative w-full max-w-xs">
        <Search className="text-subtle pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              toast({
                title: query.trim()
                  ? `${matches.length} match${matches.length === 1 ? "" : "es"}`
                  : "Search reviews",
                description: query.trim()
                  ? matches
                      .slice(0, 3)
                      .map((r) => r.title)
                      .join(" · ") || "Nothing matched that query."
                  : "Type a review id, title, or project.",
              });
            }
          }}
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
          onClick={() =>
            toast({
              title: `${waiting} reviews need you`,
              description: "Two have been waiting for more than a day.",
              tone: waiting > 0 ? "warning" : "success",
            })
          }
        >
          <Bell className="size-4" />
          <span className="bg-accent ring-bg absolute top-2 right-2 size-1.5 rounded-full ring-2" />
        </Button>
        <NavigateButton
          href="/reviews"
          variant="primary"
          size="sm"
          toast={{
            title: "Opening reviews",
            description: "Start a new review from the Reviews page.",
          }}
        >
          New review
        </NavigateButton>
      </div>
    </header>
  );
}
