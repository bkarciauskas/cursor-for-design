import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { reviews, statusMeta } from "@/lib/data";

const columns = ["Review", "Author", "Reviewers", "Design coverage", "Status"];

export default function ReviewsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Reviews"
        description="Every design review across Payments, Core, Analytics and Growth."
        actions={
          <>
            <Button variant="secondary" size="md" iconLeading={<Filter className="size-4" />}>
              Filter
            </Button>
            <Button variant="primary" size="md" iconLeading={<Plus className="size-4" />}>
              New review
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent" dot>
          All · {reviews.length}
        </Badge>
        {Object.entries(statusMeta).map(([key, meta]) => (
          <Badge key={key} tone="neutral">
            {meta.label} · {reviews.filter((review) => review.status === key).length}
          </Badge>
        ))}
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
            {reviews.map((review) => (
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
                      tone={review.coverage > 75 ? "success" : review.coverage > 45 ? "warning" : "accent"}
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
          </tbody>
        </table>
      </Card>
    </div>
  );
}
