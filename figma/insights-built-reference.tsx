import { PageHeader } from "@/components/ui/section";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrendChart } from "@/components/ui/trend-chart";

export const metadata = {
  title: "Insights — Loop",
};

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const velocity = [34, 31, 29, 30, 26, 24, 22, 19, 17, 14, 12, 9];

const coverage = [
  { project: "Core", value: 94, tone: "success" as const },
  { project: "Payments", value: 81, tone: "success" as const },
  { project: "Growth", value: 63, tone: "warning" as const },
  { project: "Analytics", value: 47, tone: "warning" as const },
];

const drift = [
  { name: "Button", instances: 486, detached: 4, drift: "0.8%", tone: "success" as const, status: "Healthy" },
  { name: "Badge", instances: 312, detached: 9, drift: "2.9%", tone: "success" as const, status: "Healthy" },
  { name: "Card", instances: 208, detached: 12, drift: "5.8%", tone: "warning" as const, status: "Watch" },
  { name: "Avatar", instances: 190, detached: 3, drift: "1.6%", tone: "success" as const, status: "Healthy" },
  { name: "Table row", instances: 154, detached: 21, drift: "13.6%", tone: "danger" as const, status: "Drifting" },
  { name: "StatCard", instances: 64, detached: 8, drift: "12.5%", tone: "danger" as const, status: "Drifting" },
];

const reviewers = [
  { name: "Mara Ellis", reviews: 64 },
  { name: "Dev Shah", reviews: 51 },
  { name: "Ines Kova", reviews: 47 },
  { name: "Tom Byrne", reviews: 38 },
];

export default function InsightsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Analytics"
        title="Insights"
        description="Design-system health and review velocity over time."
        actions={
          <>
            <Button variant="secondary" size="md">
              Last 90 days
            </Button>
            <Button variant="secondary" size="md">
              Export
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Design coverage"
          value="78%"
          delta="+9pt"
          direction="up"
          sentiment="positive"
          hint="Across 1,455 instances"
        />
        <StatCard
          label="Handoff to merge"
          value="3.2 days"
          delta="38% faster"
          direction="down"
          sentiment="positive"
          hint="Median across all projects"
        />
        <StatCard
          label="Detached instances"
          value="42"
          delta="+11"
          direction="up"
          sentiment="negative"
          hint="Highest in Payments"
        />
        <StatCard
          label="Token violations"
          value="7"
          delta="-15"
          direction="down"
          sentiment="positive"
          hint="Down from 22 last quarter"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader
            title="Review velocity"
            description="Median hours from first comment to approval."
            action={<Badge tone="accent">2026</Badge>}
          />
          <CardBody className="flex flex-1 flex-col justify-end">
            <TrendChart data={velocity} labels={months} className="h-full min-h-44" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Coverage by project"
            description="Share of screens built from the library."
          />
          <CardBody className="space-y-4">
            {coverage.map((row) => (
              <div key={row.project}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2">
                  <span className="text-xs font-medium">{row.project}</span>
                  <span className="text-subtle font-mono text-[11px] tabular-nums">
                    {row.value}%
                  </span>
                </div>
                <Progress
                  value={row.value}
                  tone={row.tone}
                  label={`${row.project} coverage`}
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </section>

      <Card>
        <CardHeader
          title="Design system drift"
          description="Components whose instances have diverged from the library."
        />
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-card-01 border-b">
              {["Component", "Instances", "Detached", "Drift", "Status"].map((column) => (
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
            {drift.map((row) => (
              <tr key={row.name} className="hover:bg-card-01 transition-colors">
                <td className="px-5 py-3.5">
                  <span className="text-subtle">Loop / </span>
                  <span className="font-medium">{row.name}</span>
                </td>
                <td className="text-muted px-5 py-3.5 font-mono text-xs tabular-nums">
                  {row.instances}
                </td>
                <td className="text-muted px-5 py-3.5 font-mono text-xs tabular-nums">
                  {row.detached}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs tabular-nums">{row.drift}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={row.tone} dot>
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader title="Most active reviewers" description="Last 90 days." />
        <CardBody>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {reviewers.map((person) => (
              <div key={person.name} className="flex items-center gap-3">
                <Avatar name={person.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{person.name}</p>
                  <p className="text-subtle font-mono text-xs tabular-nums">
                    {person.reviews} reviews
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
