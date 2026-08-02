import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();

page.on("console", (msg) => {
  if (["error", "warning"].includes(msg.type())) {
    console.log(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on("pageerror", (error) => console.log(`[pageerror] ${error.message}`));

for (const route of ["/", "/reviews", "/library", "/insights", "/demo"]) {
  console.log(`--- ${route}`);
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
}

await browser.close();
