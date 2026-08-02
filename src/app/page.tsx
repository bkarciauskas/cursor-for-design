import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  MessageSquare,
  Puzzle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrendChart } from "@/components/ui/trend-chart";
import { activity, libraryComponents, reviews, statusMeta, throughput } from "@/lib/data";

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function DashboardPage() {
  const openReviews = reviews.filter((review) => review.status !== "approved");

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Payments · Core · Growth"
        title="Good morning, Mara"
        description="Six reviews are open across three projects. Two have been waiting on you for more than a day."
        actions={
          <>
            <Button variant="secondary" size="md">
              Export
            </Button>
            <Button variant="primary" size="md" iconTrailing={<ArrowRight className="size-4" />}>
              Start review
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open reviews"
          value="6"
          delta="+2"
          direction="up"
          sentiment="negative"
          hint="vs. last week"
          icon={<MessageSquare className="size-4" />}
        />
        <StatCard
          label="Median time to approve"
          value="9.4h"
          delta="31% faster"
          direction="down"
          sentiment="positive"
          hint="Fastest quarter so far"
          icon={<Clock className="size-4" />}
        />
        <StatCard
          label="Library adoption"
          value="84%"
          delta="+6pt"
          direction="up"
          sentiment="positive"
          hint="Across 1,455 instances"
          icon={<Puzzle className="size-4" />}
        />
        <StatCard
          label="Approved this week"
          value="17"
          delta="-3"
          direction="down"
          sentiment="negative"
          hint="Two blocked on legal"
          icon={<CircleCheck className="size-4" />}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader
            title="Review throughput"
            description="Reviews closed per month across all projects."
            action={<Badge tone="accent">2026</Badge>}
          />
          <CardBody className="flex flex-1 flex-col justify-end">
            <TrendChart data={throughput} labels={months} className="h-full min-h-44" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Activity" description="Live from the team." />
          <CardBody className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="flex gap-3">
                <Avatar name={item.person} size="xs" className="mt-0.5" />
                <div className="min-w-0 flex-1 text-xs leading-relaxed">
                  <span className="font-medium">{item.person}</span>{" "}
                  <span className="text-muted">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                  <p className="text-subtle mt-0.5">{item.time} ago</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Needs your attention"
            description="Open reviews where you are a required reviewer."
            action={
              <Link href="/reviews">
                <Button variant="ghost" size="sm" iconTrailing={<ArrowRight className="size-3.5" />}>
                  All reviews
                </Button>
              </Link>
            }
          />
          <ul className="divide-border divide-y">
            {openReviews.map((review) => (
              <li
                key={review.id}
                className="hover:bg-card-01 flex items-center gap-4 px-5 py-3.5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-subtle font-mono text-[11px]">{review.id}</span>
                    <span className="truncate text-sm font-medium">{review.title}</span>
                  </div>
                  <p className="text-subtle mt-1 text-xs">
                    {review.project} · {review.comments} comments · {review.updated}
                  </p>
                </div>
                <AvatarStack names={review.reviewers} max={3} />
                <Badge tone={statusMeta[review.status].tone} dot>
                  {statusMeta[review.status].label}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Library health"
            description="Adoption of the Loop component library."
          />
          <CardBody className="space-y-4">
            {libraryComponents.slice(0, 5).map((component) => (
              <div key={component.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2">
                  <span className="text-xs font-medium">{component.name}</span>
                  <span className="text-subtle font-mono text-[11px] tabular-nums">
                    {component.adoption}%
                  </span>
                </div>
                <Progress
                  value={component.adoption}
                  tone={component.adoption > 80 ? "success" : "warning"}
                  label={`${component.name} adoption`}
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
