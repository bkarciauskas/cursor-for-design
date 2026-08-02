import { ArrowRight, Frame, RotateCw, Sparkles } from "lucide-react";

const nodes = [
  {
    label: "Figma",
    detail: "Designs, variables, components",
    icon: Frame,
  },
  {
    label: "Cursor",
    detail: "Reads and writes both sides",
    icon: Sparkles,
    highlight: true,
  },
  {
    label: "Codebase",
    detail: "Tokens, primitives, screens",
    icon: RotateCw,
  },
];

export function LoopDiagram() {
  return (
    <div className="border-border bg-card rounded-lg border p-5">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex flex-1 items-center gap-3">
            <div
              className={`flex flex-1 items-center gap-3 rounded-md border px-4 py-3 ${
                node.highlight
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-card-02"
              }`}
            >
              <node.icon
                className={`size-4 shrink-0 ${node.highlight ? "text-accent" : "text-muted"}`}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold">{node.label}</p>
                <p className="text-subtle truncate text-[11px]">{node.detail}</p>
              </div>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight className="text-subtle hidden size-4 shrink-0 sm:block" />
            )}
          </div>
        ))}
      </div>
      <p className="text-muted mt-4 text-xs leading-relaxed">
        Both arrows run in both directions. Act 1 and 2 move right to left, Act 3 moves left
        to right, and Act 4 does both in a single turn.
      </p>
    </div>
  );
}
