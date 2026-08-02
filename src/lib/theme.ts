export const THEME_STORAGE_KEY = "loop-theme";

/* Runs before paint so the demo never flashes the wrong theme on stage. */
export const themeInitScript = `
try {
  var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;
