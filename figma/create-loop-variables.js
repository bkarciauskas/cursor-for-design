/**
 * Loop pre-flight — create the Light-mode variable collection.
 *
 * Your Figma View seat blocks MCP writes. Run this once in Figma instead:
 *
 * 1. Open https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26
 * 2. Plugins → Development → New plugin… → "Link existing plugin"
 *    Or use the Figma desktop console: Plugins → Development → Open Console,
 *    then paste this whole file into a one-off plugin's code.js and run it.
 * 3. Easiest path: in Figma, open Quick Actions (⌘/) → "Run plugin with API"
 *    if available, or create a throwaway plugin with this as code.js:
 *
 *    manifest.json:
 *    { "name": "Loop tokens", "id": "loop-tokens", "api": "1.0.0",
 *      "main": "code.js", "editorType": ["figma"] }
 *
 * After it runs you should have a "Loop" collection with one mode: Light.
 * Do NOT add Dark — the demo adds that live in Act 2.
 */

function hex(h) {
  const v = h.replace("#", "");
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255,
  };
}

(async () => {
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  if (existing.find((c) => c.name === "Loop")) {
    figma.notify("Loop collection already exists — skipped");
    figma.closePlugin();
    return;
  }

  const FILL = ["FRAME_FILL", "SHAPE_FILL"];
  const FILL_TEXT = ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"];
  const STROKE = ["STROKE_COLOR"];
  const CORNER = ["CORNER_RADIUS"];

  const colors = [
    ["color/bg", "#f7f7f4", FILL],
    ["color/fg", "#26251e", FILL_TEXT],
    ["color/accent", "#f54e00", FILL_TEXT],
    ["color/accent-fg", "#ffffff", FILL_TEXT],
    ["color/accent-soft", "#fdeae1", FILL],
    ["color/card", "#f2f1ed", FILL],
    ["color/card-01", "#f0efeb", FILL],
    ["color/card-02", "#ebeae5", FILL],
    ["color/card-03", "#e6e5e0", FILL],
    ["color/card-04", "#e1e0db", FILL],
    ["color/border", "#e1e0db", STROKE],
    ["color/border-strong", "#d3d2cb", STROKE],
    ["color/success", "#1f7a4d", FILL_TEXT],
    ["color/success-bg", "#e2efe6", FILL],
    ["color/warning", "#a06a00", FILL_TEXT],
    ["color/warning-bg", "#f6ecd9", FILL],
    ["color/danger", "#bd3b2b", FILL_TEXT],
    ["color/danger-bg", "#f8e5e2", FILL],
    ["color/info", "#2563a8", FILL_TEXT],
    ["color/info-bg", "#e3eaf6", FILL],
  ];

  const radii = [
    ["radius/sm", 6],
    ["radius/md", 10],
    ["radius/lg", 14],
    ["radius/xl", 20],
  ];

  const collection = figma.variables.createVariableCollection("Loop");
  const lightModeId = collection.modes[0].modeId;
  collection.renameMode(lightModeId, "Light");

  for (const [name, value, scopes] of colors) {
    const variable = figma.variables.createVariable(name, collection, "COLOR");
    variable.scopes = scopes;
    variable.setValueForMode(lightModeId, hex(value));
  }

  for (const [name, value] of radii) {
    const variable = figma.variables.createVariable(name, collection, "FLOAT");
    variable.scopes = CORNER;
    variable.setValueForMode(lightModeId, value);
  }

  figma.notify(`Created Loop · Light with ${colors.length + radii.length} tokens`);
  figma.closePlugin();
})();
