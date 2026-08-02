import { demoConfig } from "@/lib/demo-config";

export type Direction = "setup" | "code-to-figma" | "figma-to-code" | "loop";

export type DemoStep = {
  id: string;
  act: string;
  title: string;
  direction: Direction;
  minutes: number;
  /** The point of the step, in one line, for the presenter. */
  premise: string;
  /** Spoken framing — say this before running the prompt. */
  say: string;
  /** Physical actions on screen, in order. */
  actions: string[];
  prompt?: string;
  /** What the audience should see when it lands. */
  outcome: string;
  tip?: string;
};

export const directionMeta: Record<
  Direction,
  { label: string; tone: "neutral" | "accent" | "info" | "success" }
> = {
  setup: { label: "Setup", tone: "neutral" },
  "code-to-figma": { label: "Cursor → Figma", tone: "accent" },
  "figma-to-code": { label: "Figma → Cursor", tone: "info" },
  loop: { label: "Round trip", tone: "success" },
};

const figmaFile = demoConfig.figmaFileUrl || "<the Loop Figma file>";
const insightsNode = demoConfig.insightsNodeUrl || "<the Insights frame URL>";

export const demoSteps: DemoStep[] = [
  {
    id: "setup",
    act: "Act 0",
    title: "Get the room ready",
    direction: "setup",
    minutes: 3,
    premise:
      "A View or Collab Figma seat only gets six MCP calls a month — you will run dry in Act 1.",
    say: "Before we start — this is a normal Next.js repo. Nothing here is special except that Cursor can see my Figma file.",
    actions: [
      "Confirm you are on a Full or Dev Figma seat. A View seat is capped at six MCP calls per month.",
      "Open Cursor Settings → Tools & MCP and confirm the Figma server shows as connected.",
      "Complete the pre-flight in figma/README.md so the Loop file has its Light-mode variables and the Insights design.",
      "Open the Figma desktop app with the Loop file on a second screen.",
      "Run npm run dev and leave the app on the Dashboard.",
      "Make sure the Insights page is still the placeholder — that is the payoff later.",
    ],
    outcome:
      "Figma on one screen, Cursor and the running app on the other. The audience can see both sides of the loop at once.",
    tip: "Put Figma on the screen the audience sees best. The Figma side is where the surprise happens.",
  },
  {
    id: "push-dashboard",
    act: "Act 1",
    title: "Push a shipped screen into Figma",
    direction: "code-to-figma",
    minutes: 5,
    premise: "Design files drift from production. Cursor can close the gap in one prompt.",
    say: "Every design team I talk to has a file that no longer matches what shipped. Redrawing it is a day of work. Watch.",
    actions: [
      "Show the running Dashboard at / so people know what is about to be recreated.",
      "Open src/app/page.tsx briefly so they see it is real code, not a screenshot.",
      "Run the prompt and switch to Figma while it works.",
    ],
    prompt: `Push the Dashboard page at src/app/page.tsx into ${figmaFile} as a new frame called "Dashboard — from code".

Rebuild it with real Figma layers and auto-layout, not an image. Bind fills, strokes, and corner radii to the existing "Loop" variable collection wherever a token matches.`,
    outcome:
      "A fully layered frame appears in Figma — auto-layout, editable text, real components. Click into a stat card and drag it to prove it is not a screenshot.",
    tip: "Drag a layer out of the frame while you talk. That single gesture is what convinces designers it is real.",
  },
  {
    id: "tokens",
    act: "Act 2",
    title: "Add the missing dark mode",
    direction: "code-to-figma",
    minutes: 4,
    premise:
      "The Figma library only has a Light mode. The codebase has had dark mode for months.",
    say: "The colours in that frame are not guesses — they come from the token block in this repo. And notice our Figma library only has a Light mode, while the app has shipped dark mode for months.",
    actions: [
      "In Figma, show the Loop variable collection with its single Light mode.",
      "Open src/app/globals.css and show the .dark block right under @theme — same token names, different values.",
      "Run the prompt, then switch the frame to the new Dark mode in Figma.",
    ],
    prompt: `The "Loop" variable collection in ${figmaFile} only has a Light mode.

Add a second mode called "Dark" and populate every existing variable using the values from the .dark block in src/app/globals.css. Match variables to CSS custom properties by name — do not create any new variables.`,
    outcome:
      "The Loop collection gains a Dark mode. Switch the frame from Act 1 to Dark and it re-themes with no manual recolouring.",
    tip: "Flip the mode in Figma and the theme toggle in the running app back to back. Same tokens, both sides.",
  },
  {
    id: "build-insights",
    act: "Act 3",
    title: "Build a designed screen that was never coded",
    direction: "figma-to-code",
    minutes: 7,
    premise: "The direction designers actually care about — a finished design becomes a real page.",
    say: "Now the other direction. Our Insights screen has been designed for weeks and never built. This is the ticket that never gets picked up.",
    actions: [
      "Open /insights in the running app and show the placeholder.",
      "Switch to Figma and show the finished Insights design side by side.",
      "Copy the Figma link for the Insights frame, then run the prompt.",
      "While it builds, talk through what it is reusing — Card, StatCard, Badge, Progress.",
    ],
    prompt: `Implement the Insights screen from ${insightsNode}.

Build it at src/app/insights/page.tsx, replacing the placeholder. Reuse the existing primitives in src/components/ui and the tokens in src/app/globals.css — do not introduce new hex values or one-off spacing.`,
    outcome:
      "The placeholder is replaced by a working Insights page that matches the design and is built from the same components as the rest of the app.",
    tip: "Refresh the browser live rather than showing a screenshot. Toggle dark mode straight after — it works because the page used tokens.",
  },
  {
    id: "close-loop",
    act: "Act 4",
    title: "Change the code, update the design",
    direction: "loop",
    minutes: 5,
    premise: "The round trip is the actual product. One change, both surfaces.",
    say: "Here is where it stops being a party trick. Product asks for a change after handoff — normally the design file rots from that moment.",
    actions: [
      "Ask the room for a small change, or use the one in the prompt.",
      "Run the prompt and let it edit code and Figma in the same turn.",
      "Show the browser and the Figma frame side by side afterwards.",
    ],
    prompt: `Add a "Compare to last quarter" toggle to the Insights page header, using the existing Button component with the secondary variant.

Then update the Insights frame in ${figmaFile} so the design matches the implementation.`,
    outcome:
      "Code and design change together. The Figma frame is no longer a stale artefact of a past handoff.",
    tip: "This is the line to land: the design file stopped being a snapshot and started being a view of the codebase.",
  },
  {
    id: "code-connect",
    act: "Act 5",
    title: "Publish the library and wire Code Connect",
    direction: "loop",
    minutes: 4,
    premise: "Optional closer for teams that already run a design system.",
    say: "Our Figma file has tokens but no components — the library only exists in code. If you already run a design system, this is the piece that makes it stick.",
    actions: [
      "Open /library and scroll to the Code Connect status list.",
      "Run the prompt.",
      "Open Dev Mode in Figma and inspect a Button variant.",
    ],
    prompt: `Create Figma components in ${figmaFile} for the Button, Badge, and Card primitives in src/components/ui, on a page called "Library".

Build a variant set per component covering the variants defined in the code, bind fills to the Loop variables, then set up Code Connect mapping each Figma component back to its source file.`,
    outcome:
      "A component library appears in Figma, and selecting a Button in Dev Mode shows the real import and props from this repo instead of generic CSS.",
    tip: "Skip this act if the audience does not yet have a component library — it lands flat without one.",
  },
];

export const totalMinutes = demoSteps.reduce((sum, step) => sum + step.minutes, 0);
