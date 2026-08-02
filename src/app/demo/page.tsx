import { AlertTriangle, Frame } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoopDiagram } from "@/components/demo/loop-diagram";
import { DemoSteps } from "@/components/demo/demo-steps";
import { demoConfig, hasInsightsDesign } from "@/lib/demo-config";

export const metadata = {
  title: "Demo script — Loop",
};

const recoveries = [
  {
    problem: "Figma tools are missing or error out",
    fix: "Reconnect the Figma MCP server in Cursor Settings → Tools & MCP, then retry the prompt. Keep the Figma desktop app open.",
  },
  {
    problem: "The generated Figma frame looks rough",
    fix: "Say so out loud and ask Cursor to fix it in follow-up — refining in place is a more honest demo than a perfect first shot.",
  },
  {
    problem: "The Insights build introduces new colours",
    fix: "Ask it to use only tokens from globals.css. This is a good moment to show that constraints in the prompt are respected.",
  },
  {
    problem: "You are running out of time",
    fix: "Cut Act 5, then Act 2. Acts 1, 3 and 4 are the complete story on their own.",
  },
];

export default function DemoPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Presenter notes"
        title="Cursor for Design — demo script"
        description="A run of show for demonstrating the Figma to Cursor to Figma workflow, using this repo as the working codebase."
        actions={
          demoConfig.figmaFileUrl ? (
            <a href={demoConfig.figmaFileUrl} target="_blank" rel="noreferrer">
              <Button variant="primary" size="md" iconLeading={<Frame className="size-4" />}>
                Open Figma file
              </Button>
            </a>
          ) : undefined
        }
      />

      {!hasInsightsDesign && (
        <Card className="border-warning/40">
          <CardHeader
            title="Pre-flight not finished"
            description="Two things must be true before this script will run end to end."
            action={<Badge tone="warning">Setup</Badge>}
          />
          <CardBody className="space-y-3 text-sm leading-relaxed">
            <p className="text-muted">
              <span className="text-fg font-medium">You need a Full or Dev Figma seat.</span>{" "}
              View and Collab seats are capped at six Figma MCP calls per month, which runs
              out partway through Act 1.
            </p>
            <p className="text-muted">
              <span className="text-fg font-medium">The Figma file is still empty.</span> Follow{" "}
              <code className="bg-card-03 rounded px-1 py-0.5 font-mono text-xs">
                figma/README.md
              </code>{" "}
              to create the Loop variables and the Insights design, then paste the Insights
              frame URL into{" "}
              <code className="bg-card-03 rounded px-1 py-0.5 font-mono text-xs">
                src/lib/demo-config.ts
              </code>
              . This banner disappears once that is set.
            </p>
          </CardBody>
        </Card>
      )}

      <LoopDiagram />

      <Card>
        <CardHeader
          title="The one thing to land"
          description="If the audience remembers a single sentence, make it this one."
        />
        <CardBody>
          <p className="text-title font-medium">
            The design file stops being a snapshot of a past handoff and becomes a live view
            of the codebase.
          </p>
        </CardBody>
      </Card>

      <DemoSteps />

      <Card>
        <CardHeader
          title="If it goes wrong"
          description="Live demos drift. These are the four failures worth rehearsing."
          action={<AlertTriangle className="text-warning size-4" />}
        />
        <ul className="divide-border divide-y">
          {recoveries.map((item) => (
            <li key={item.problem} className="px-5 py-3.5">
              <p className="text-sm font-medium">{item.problem}</p>
              <p className="text-muted mt-1 text-xs leading-relaxed">{item.fix}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
