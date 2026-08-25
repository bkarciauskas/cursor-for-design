/*
  Single source of truth for the Figma links used in the demo.

  Regenerating the Figma file only requires editing this file.
*/
export const demoConfig = {
  figmaFileUrl: "https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26",
  insightsNodeUrl:
    "https://www.figma.com/design/sS7qxQ4YCFUcsC4Anuyq26?node-id=3-27",
};

export const hasInsightsDesign = Boolean(demoConfig.insightsNodeUrl);

/** Paste into Cursor after a run — restores Figma to Light-only + Insights only. */
export const figmaResetPrompt = `Reset the Loop Figma file at ${demoConfig.figmaFileUrl} to the pre-demo starting state.

Run the script in figma/reset-pre-demo.js via use_figma (or apply the same steps):
1. Delete every mode on the Loop collection except Light (remove Dark if present).
2. Delete the top-level frame named "Dashboard — from code" if it exists.
3. Clear any explicit Loop mode override on the Insights frame (node 3:27) so it sits on Light.
Do not create variables, modes, pages, or frames.`;
