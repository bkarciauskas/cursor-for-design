import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const routes = [
  ["/", "dashboard"],
  ["/reviews", "reviews"],
  ["/library", "library"],
  ["/insights", "insights"],
  ["/demo", "demo"],
];

const outDir = "shots";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  await context.addInitScript(`localStorage.setItem("loop-theme", "${theme}")`);
  const page = await context.newPage();

  for (const [route, name] of routes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${outDir}/${name}-${theme}.png`, fullPage: true });
    console.log(`captured ${name}-${theme}`);
  }

  await context.close();
}

await browser.close();
