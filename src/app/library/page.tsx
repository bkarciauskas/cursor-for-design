import { Link2, Link2Off } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/ui/section";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToastButton } from "@/components/ui/action-button";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { libraryComponents, teamMembers } from "@/lib/data";

const colorTokens = [
  { name: "bg", className: "bg-bg" },
  { name: "card", className: "bg-card" },
  { name: "card-02", className: "bg-card-02" },
  { name: "card-04", className: "bg-card-04" },
  { name: "border-strong", className: "bg-border-strong" },
  { name: "fg", className: "bg-fg" },
  { name: "accent", className: "bg-accent" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "danger", className: "bg-danger" },
  { name: "info", className: "bg-info" },
];

const radiusTokens = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
];

const typeTokens = [
  { name: "display", className: "text-display font-semibold", sample: "Design reviews" },
  { name: "title", className: "text-title font-semibold", sample: "Review throughput" },
  { name: "body", className: "text-sm", sample: "Six reviews are open across three projects." },
  { name: "caption", className: "text-xs text-muted", sample: "Updated 12 minutes ago" },
];

export default function LibraryPage() {
  const linked = libraryComponents.filter((component) => component.linked).length;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Loop design system"
        title="Library"
        description="Tokens and components shared between the Figma library and this codebase. Every token below has a matching Figma variable."
        actions={
          <ToastButton
            variant="primary"
            size="md"
            toast={{
              title: "Publish queued",
              description:
                "In a real setup this would push Library components to the Loop Figma file.",
              tone: "success",
            }}
          >
            Publish to Figma
          </ToastButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Components" value={String(libraryComponents.length)} hint="In the published library" />
        <StatCard
          label="Code Connect linked"
          value={`${linked}/${libraryComponents.length}`}
          delta="+2"
          direction="up"
          sentiment="positive"
          hint="Figma components mapped to code"
        />
        <StatCard
          label="Total instances"
          value="1,455"
          delta="+124"
          direction="up"
          sentiment="positive"
          hint="Across all projects"
        />
      </section>

      <Card>
        <CardHeader
          title="Color tokens"
          description="Defined once in globals.css and mirrored as Figma variables."
        />
        <CardBody>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {colorTokens.map((token) => (
              <div key={token.name} className="space-y-2">
                <div
                  className={`border-border h-14 w-full rounded-md border ${token.className}`}
                />
                <p className="font-mono text-[11px]">{token.name}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Radius" description="Four steps, no in-between values." />
          <CardBody>
            <div className="flex flex-wrap items-end gap-5">
              {radiusTokens.map((token) => (
                <div key={token.name} className="space-y-2">
                  <div
                    className={`bg-card-03 border-border-strong size-16 border ${token.className}`}
                  />
                  <p className="font-mono text-[11px]">{token.name}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Type scale" description="Geist Sans, four roles." />
          <CardBody className="space-y-4">
            {typeTokens.map((token) => (
              <div key={token.name} className="flex items-baseline gap-4">
                <span className="text-subtle w-16 shrink-0 font-mono text-[11px]">
                  {token.name}
                </span>
                <span className={`truncate ${token.className}`}>{token.sample}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Components"
          description="Live rendering of every primitive, next to its adoption in production."
        />
        <CardBody className="space-y-7">
          <div className="space-y-3">
            <SectionLabel>Button</SectionLabel>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <SectionLabel>Badge</SectionLabel>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="accent" dot>
                Accent
              </Badge>
              <Badge tone="success" dot>
                Approved
              </Badge>
              <Badge tone="warning" dot>
                Changes requested
              </Badge>
              <Badge tone="danger" dot>
                Blocked
              </Badge>
              <Badge tone="info" dot>
                In review
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <SectionLabel>Avatar</SectionLabel>
            <div className="flex flex-wrap items-center gap-5">
              <Avatar name="Mara Ellis" size="xs" />
              <Avatar name="Dev Shah" size="sm" />
              <Avatar name="Ines Kova" size="md" />
              <AvatarStack names={teamMembers} />
            </div>
          </div>

          <div className="space-y-3">
            <SectionLabel>Progress</SectionLabel>
            <div className="max-w-md space-y-3">
              <Progress value={92} tone="success" label="Success example" />
              <Progress value={58} tone="warning" label="Warning example" />
              <Progress value={31} tone="accent" label="Accent example" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Code Connect status"
          description="Which Figma components resolve to a real component in this repo."
        />
        <ul className="divide-border divide-y">
          {libraryComponents.map((component) => (
            <li key={component.name} className="flex items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Loop / {component.name}</p>
                <p className="text-subtle mt-0.5 text-xs">
                  {component.variants} variants · {component.instances} instances
                </p>
              </div>
              <div className="w-28">
                <Progress
                  value={component.adoption}
                  tone={component.adoption > 80 ? "success" : "warning"}
                  label={`${component.name} adoption`}
                />
              </div>
              {component.linked ? (
                <Badge tone="success">
                  <Link2 className="size-3" />
                  Linked
                </Badge>
              ) : (
                <Badge tone="neutral">
                  <Link2Off className="size-3" />
                  Not linked
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
