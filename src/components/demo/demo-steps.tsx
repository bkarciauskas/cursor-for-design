"use client";

import { useState } from "react";
import { Check, ChevronDown, Clock, Eye, Lightbulb, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/client-store";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PromptBlock } from "@/components/demo/prompt-block";
import { demoSteps, directionMeta, totalMinutes } from "@/lib/demo-script";

const STORAGE_KEY = "loop-demo-progress";
const NO_STEPS: string[] = [];

export function DemoSteps() {
  const [done, setDone] = usePersistentState<string[]>(STORAGE_KEY, NO_STEPS);
  const [open, setOpen] = useState<string | null>(demoSteps[0].id);

  function toggleDone(id: string) {
    setDone(done.includes(id) ? done.filter((item) => item !== id) : [...done, id]);
  }

  const completion = Math.round((done.length / demoSteps.length) * 100);

  return (
    <div className="space-y-4">
      <div className="border-border bg-card flex flex-wrap items-center gap-4 rounded-lg border px-5 py-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-xs font-medium">
              {done.length} of {demoSteps.length} acts complete
            </span>
            <span className="text-subtle font-mono text-[11px] tabular-nums">
              ~{totalMinutes} min total
            </span>
          </div>
          <Progress value={completion} tone="accent" label="Demo progress" />
        </div>
        <button
          type="button"
          onClick={() => setDone(NO_STEPS)}
          className="text-muted hover:text-fg border-border hover:bg-card-02 rounded-md border px-3 py-1.5 text-xs transition-colors"
        >
          Reset
        </button>
      </div>

      <ol className="space-y-3">
        {demoSteps.map((step) => {
          const isDone = done.includes(step.id);
          const isOpen = open === step.id;
          const meta = directionMeta[step.direction];

          return (
            <li
              key={step.id}
              className={cn(
                "border-border bg-card overflow-hidden rounded-lg border transition-colors",
                isOpen && "border-border-strong",
              )}
            >
              <div className="flex items-start gap-3 px-5 py-4">
                <button
                  type="button"
                  onClick={() => toggleDone(step.id)}
                  aria-pressed={isDone}
                  aria-label={`Mark ${step.title} as done`}
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isDone
                      ? "border-success bg-success text-bg"
                      : "border-border-strong hover:border-accent",
                  )}
                >
                  {isDone && <Check className="size-3" strokeWidth={3} />}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : step.id)}
                  aria-expanded={isOpen}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-subtle font-mono text-[11px]">{step.act}</span>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isDone && "text-muted line-through",
                      )}
                    >
                      {step.title}
                    </span>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <span className="text-subtle inline-flex items-center gap-1 text-[11px]">
                      <Clock className="size-3" />
                      {step.minutes}m
                    </span>
                  </div>
                  <p className="text-muted mt-1.5 text-xs leading-relaxed">{step.premise}</p>
                </button>

                <ChevronDown
                  className={cn(
                    "text-subtle mt-1 size-4 shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </div>

              {isOpen && (
                <div className="border-border space-y-5 border-t px-5 py-5">
                  <blockquote className="border-accent text-muted border-l-2 pl-3 text-sm italic">
                    “{step.say}”
                  </blockquote>

                  <div className="space-y-2">
                    <SubLabel icon={<Play className="size-3" />}>On screen</SubLabel>
                    <ol className="space-y-1.5">
                      {step.actions.map((action, index) => (
                        <li key={action} className="flex gap-2.5 text-xs leading-relaxed">
                          <span className="text-subtle font-mono">{index + 1}.</span>
                          <span className="text-muted">{action}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {step.prompt && <PromptBlock prompt={step.prompt} />}

                  <div className="space-y-2">
                    <SubLabel icon={<Eye className="size-3" />}>What they should see</SubLabel>
                    <p className="text-muted text-xs leading-relaxed">{step.outcome}</p>
                  </div>

                  {step.tip && (
                    <div className="bg-accent-soft rounded-md px-3 py-2.5">
                      <p className="text-accent flex gap-2 text-xs leading-relaxed">
                        <Lightbulb className="mt-0.5 size-3.5 shrink-0" />
                        {step.tip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SubLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="text-subtle inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase">
      {icon}
      {children}
    </span>
  );
}
