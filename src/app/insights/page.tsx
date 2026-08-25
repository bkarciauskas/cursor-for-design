import Link from "next/link";
import { ArrowUpRight, ChartNoAxesColumn, Frame } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PromptBlock } from "@/components/demo/prompt-block";
import { demoConfig } from "@/lib/demo-config";

export const metadata = {
  title: "Insights — Loop",
};

const prompt = `Implement the "Insights" screen from Figma at ${demoConfig.insightsNodeUrl || "<paste the Figma node URL>"}.

Build it at src/app/insights/page.tsx, replacing the placeholder.
Reuse the existing primitives in src/components/ui and the tokens in
src/app/globals.css — do not introduce new hex values or one-off spacing.`;

export default function InsightsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Analytics"
        title="Insights"
        description="Design-system health and review velocity over time."
      />

      <Card className="border-dashed">
        <CardBody className="flex flex-col items-center gap-5 px-6 py-14 text-center">
          <span className="bg-accent-soft text-accent flex size-12 items-center justify-center rounded-xl">
            <ChartNoAxesColumn className="size-6" />
          </span>

          <div className="max-w-md space-y-2">
            <div className="flex justify-center">
              <Badge tone="accent" dot>
                Designed, not built
              </Badge>
            </div>
            <h2 className="text-title font-semibold">This screen only exists in Figma</h2>
            <p className="text-muted text-sm leading-relaxed">
              The Insights screen is finished in the Loop design file but has never been
              implemented. This is the starting point for the Figma to Cursor half of the
              demo — hand Cursor the design and let it build the page using the tokens and
              components already in this repo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {demoConfig.insightsNodeUrl ? (
              <a href={demoConfig.insightsNodeUrl} target="_blank" rel="noreferrer">
                <Button
                  variant="primary"
                  size="md"
                  iconLeading={<Frame className="size-4" />}
                  iconTrailing={<ArrowUpRight className="size-4" />}
                >
                  Open the design
                </Button>
              </a>
            ) : (
              <Button variant="primary" size="md" disabled iconLeading={<Frame className="size-4" />}>
                Add a Figma link in demo-config.ts
              </Button>
            )}
            <Link href="/demo">
              <Button variant="secondary" size="md">
                Demo script
              </Button>
            </Link>
          </div>

          <PromptBlock prompt={prompt} className="mt-2 w-full max-w-2xl text-left" />
        </CardBody>
      </Card>
    </div>
  );
}
