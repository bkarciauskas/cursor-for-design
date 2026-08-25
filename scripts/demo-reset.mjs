#!/usr/bin/env node
/**
 * Restore the app to the pre-demo starting state (code only).
 * Figma still needs the Cursor prompt — printed below, also on /demo.
 */
import { copyFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const from = path.join(root, "figma/insights-placeholder.tsx");
const to = path.join(root, "src/app/insights/page.tsx");

const figmaPrompt = `Reset the Loop Figma file at https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26 to the pre-demo starting state.

Run the script in figma/reset-pre-demo.js via use_figma (or apply the same steps):
1. Delete every mode on the Loop collection except Light (remove Dark if present).
2. Delete the top-level frame named "Dashboard — from code" if it exists.
3. Clear any explicit Loop mode override on the Insights frame (node 3:27) so it sits on Light.
Do not create variables, modes, pages, or frames.`;

try {
  await access(from);
} catch {
  console.error(`Missing placeholder: ${from}`);
  process.exit(1);
}

await copyFile(from, to);
console.log("Restored src/app/insights/page.tsx from figma/insights-placeholder.tsx");
console.log("");
console.log("Figma still needs a Cursor pass. Paste this prompt:");
console.log("---");
console.log(figmaPrompt);
console.log("---");
