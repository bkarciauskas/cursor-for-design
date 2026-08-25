import { copyFile, access } from "node:fs/promises";
import path from "node:path";
import { figmaResetPrompt } from "@/lib/demo-config";

export const runtime = "nodejs";

/**
 * Local-only: restore Insights to the pre-demo placeholder.
 * Figma still needs the returned prompt pasted into Cursor.
 */
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { ok: false, error: "demo:reset is local-only" },
      { status: 403 },
    );
  }

  const from = path.join(process.cwd(), "figma/insights-placeholder.tsx");
  const to = path.join(process.cwd(), "src/app/insights/page.tsx");

  try {
    await access(from);
    await copyFile(from, to);
  } catch (error) {
    const message = error instanceof Error ? error.message : "copy failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }

  return Response.json({
    ok: true,
    restored: "src/app/insights/page.tsx",
    figmaPrompt: figmaResetPrompt,
  });
}
