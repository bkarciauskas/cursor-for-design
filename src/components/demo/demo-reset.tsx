"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptBlock } from "@/components/demo/prompt-block";
import { usePersistentState } from "@/lib/client-store";
import { figmaResetPrompt } from "@/lib/demo-config";

const STORAGE_KEY = "loop-demo-progress";
const NO_STEPS: string[] = [];

type Status = "idle" | "working" | "done" | "error";

export function DemoReset() {
  const [, setDone] = usePersistentState<string[]>(STORAGE_KEY, NO_STEPS);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function resetCode() {
    setStatus("working");
    setError(null);
    try {
      const res = await fetch("/api/demo-reset", { method: "POST" });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setDone(NO_STEPS);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Reset failed");
    }
  }

  async function copyFigmaPrompt() {
    await navigator.clipboard.writeText(figmaResetPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="md"
          iconLeading={<RotateCcw className="size-4" />}
          onClick={resetCode}
          disabled={status === "working"}
        >
          {status === "working" ? "Restoring…" : "Restore Insights placeholder"}
        </Button>
        <Button
          variant="secondary"
          size="md"
          iconLeading={copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          onClick={copyFigmaPrompt}
        >
          {copied ? "Copied Figma prompt" : "Copy Figma reset prompt"}
        </Button>
      </div>

      {status === "done" && (
        <p className="text-success text-xs leading-relaxed">
          Insights is the placeholder again, and demo checkboxes were cleared. Paste the
          Figma prompt into Cursor to finish the reset.
        </p>
      )}
      {status === "error" && (
        <p className="text-danger text-xs leading-relaxed">
          {error}. You can also run{" "}
          <code className="bg-card-03 rounded px-1 py-0.5 font-mono">npm run demo:reset</code>{" "}
          in the repo.
        </p>
      )}

      <PromptBlock prompt={figmaResetPrompt} label="Figma reset prompt" />
    </div>
  );
}
