"use client";

import { useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ToastButton } from "@/components/ui/action-button";
import { useToast } from "@/components/ui/toast";
import { reviews, statusMeta, type ReviewStatus } from "@/lib/data";
import { cn } from "@/lib/cn";

const columns = ["Review", "Author", "Reviewers", "Design coverage", "Status"];

export default function ReviewsPage() {
  const { toast } = useToast();
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState<ReviewStatus | "all">("all");

  const visible = useMemo(
    () => (status === "all" ? reviews : reviews.filter((review) => review.status === status)),
    [status],
  );

  return (
    <div className="space-y-7">
      <PageHeader
        title="Reviews"
        description="Every design review across Payments, Core, Analytics and Growth."
        actions={
          <>
            <Button
              variant={filterOpen ? "primary" : "secondary"}
              size="md"
              iconLeading={<Filter className="size-4" />}
              aria-pressed={filterOpen}
              onClick={() => {
                const next = !filterOpen;
                setFilterOpen(next);
                toast({
                  title: next ? "Filters shown" : "Filters hidden",
                  description: next
                    ? "Click a status chip to narrow the table."
                    : "Showing every review again.",
                });
                if (!next) setStatus("all");
              }}
            >
              Filter
            </Button>
            <ToastButton
              variant="primary"
              size="md"
              iconLeading={<Plus className="size-4" />}
              toast={{
                title: "New review drafted",
                description: "LP-420 · Untitled review — assigned to you.",
                tone: "success",
              }}
            >
              New review
            </ToastButton>
          </>
        }
      />

      <div className={cn("flex flex-wrap items-center gap-2", !filterOpen && "opacity-70")}>
        <button type="button" onClick={() => setStatus("all")} className="rounded-full">
          <Badge tone={status === "all" ? "accent" : "neutral"} dot={status === "all"}>
            All · {reviews.length}
          </Badge>
        </button>
        {Object.entries(statusMeta).map(([key, meta]) => {
          const count = reviews.filter((review) => review.status === key).length;
          const active = status === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setFilterOpen(true);
                setStatus(key as ReviewStatus);
              }}
              className="rounded-full"
            >
              <Badge tone={active ? meta.tone : "neutral"} dot={active}>
                {meta.label} · {count}
              </Badge>
            </button>
          );
        })}
      </div>

      <Card>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-card-01 border-b">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="text-subtle px-5 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {visible.map((review) => (
              <tr key={review.id} className="hover:bg-card-01 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-subtle font-mono text-[11px]">{review.id}</span>
                    <span className="font-medium">{review.title}</span>
                  </div>
                  <p className="text-subtle mt-1 text-xs">
                    {review.project} · {review.comments} comments · {review.updated}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={review.author} size="xs" />
                    <span className="text-muted text-xs">{review.author}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <AvatarStack names={review.reviewers} max={3} />
                </td>
                <td className="px-5 py-4">
                  <div className="w-32">
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-subtle font-mono text-[11px] tabular-nums">
                        {review.coverage}%
                      </span>
                    </div>
                    <Progress
                      value={review.coverage}
                      tone={
                        review.coverage > 75
                          ? "success"
                          : review.coverage > 45
                            ? "warning"
                            : "accent"
                      }
                      label={`${review.title} design coverage`}
                    />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge tone={statusMeta[review.status].tone} dot>
                    {statusMeta[review.status].label}
                  </Badge>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="text-muted px-5 py-10 text-center text-sm">
                  No reviews match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
