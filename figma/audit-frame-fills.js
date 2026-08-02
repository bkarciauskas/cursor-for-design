// Audit (and optionally fix) frames whose fills are not bound to a Loop variable.
//
// An unbound solid fill cannot respond to a mode switch. Frames are created
// opaque white by default, so layout-only frames left untouched stay white in
// Dark mode and swallow any light text drawn on top of them.
//
// Run via the Figma MCP `use_figma` tool, pasting this as `code`.
// Set FIX to true to clear the offending fills in place.

const TARGET_ID = "3:27"; // Insights. Use "10:2" for the Dashboard.
const FIX = false;

// Avatars are deliberately raw in both modes, matching the app.
const ALLOW_UNBOUND = (node) => node.name.startsWith("Avatar");

const root = await figma.getNodeByIdAsync(TARGET_ID);
if (!root) throw new Error(`No node with id ${TARGET_ID}`);

const toHex = (c) => {
  const p = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
  return `#${p(c.r)}${p(c.g)}${p(c.b)}`;
};

const offenders = [];

(function walk(node) {
  const isUnboundSolid =
    node.type === "FRAME" &&
    Array.isArray(node.fills) &&
    node.fills.length > 0 &&
    node.fills[0].type === "SOLID" &&
    !node.fills[0].boundVariables?.color;

  if (isUnboundSolid && !ALLOW_UNBOUND(node)) {
    offenders.push({ id: node.id, name: node.name, hex: toHex(node.fills[0].color) });
    if (FIX) node.fills = [];
  }

  if (node.children) node.children.forEach(walk);
})(root);

return {
  frame: root.name,
  fixed: FIX,
  offenderCount: offenders.length,
  offenders: offenders.slice(0, 40),
};
