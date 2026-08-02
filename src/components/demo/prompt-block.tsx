"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function PromptBlock({
  prompt,
  label = "Prompt",
  className,
}: {
  prompt: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      className={cn(
        "border-border bg-card-02 overflow-hidden rounded-md border",
        className,
      )}
    >
      <div className="border-border bg-card-03 flex items-center justify-between gap-3 border-b px-3 py-1.5">
        <span className="text-subtle font-mono text-[10px] tracking-[0.1em] uppercase">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
            copied ? "text-success" : "text-muted hover:text-fg",
          )}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 py-2.5 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {prompt}
      </pre>
    </div>
  );
}
