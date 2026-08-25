/**
 * Reset the Loop Figma file to the pre-demo starting state.
 *
 * Run via the Figma MCP `use_figma` tool (paste as `code`), or ask Cursor:
 * "Reset the Loop Figma file to pre-demo using figma/reset-pre-demo.js"
 *
 * Starting state:
 * - Loop collection has Light only (Dark deleted if present)
 * - Product page has Insights; Dashboard — from code is gone
 * - Insights has no explicit Loop mode override (sits on Light)
 */

const DASHBOARD_NAME = "Dashboard — from code";
const INSIGHTS_ID = "3:27";

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const loop = collections.find((c) => c.name === "Loop");
if (!loop) throw new Error('No "Loop" variable collection');

const light = loop.modes.find((m) => m.name === "Light");
if (!light) throw new Error('Loop has no "Light" mode');

const deletedModes = [];
for (const mode of [...loop.modes]) {
  if (mode.name !== "Light") {
    loop.removeMode(mode.modeId);
    deletedModes.push(mode.name);
  }
}

const deletedFrames = [];
for (const child of [...figma.currentPage.children]) {
  if (child.name === DASHBOARD_NAME) {
    deletedFrames.push(child.id);
    child.remove();
  }
}

const insights = await figma.getNodeByIdAsync(INSIGHTS_ID);
const clearedOverride = Boolean(
  insights &&
    "clearExplicitVariableModeForCollection" in insights &&
    insights.explicitVariableModes?.[loop.id],
);
if (insights && "clearExplicitVariableModeForCollection" in insights) {
  insights.clearExplicitVariableModeForCollection(loop);
}

return {
  ok: true,
  deletedModes,
  deletedFrames,
  clearedInsightsOverride: clearedOverride,
  modesNow: loop.modes.map((m) => m.name),
  framesNow: figma.currentPage.children.map((c) => c.name),
};
