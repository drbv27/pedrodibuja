// Satori (the renderer behind `ImageResponse`) cannot resolve CSS custom
// properties — `var(--color-*)` from `app/globals.css`'s `@theme` block is
// invisible to it. These are the same WCAG-verified palette values
// (design's palette table) duplicated as literal hex constants for OG
// image rendering only. This file and `app/globals.css` are the only two
// places a hex literal is allowed to live (design D1's guard rule,
// enforced later by `scripts/launch-guard.mjs`).
export const OG_COLORS = {
  paper: "#FAF7F2",
  paperSunk: "#F2EDE4",
  ink: "#1C1B1A",
  inkMuted: "#5A5652",
  accent: "#C0301F",
  accentBright: "#D93A2B",
  highlight: "#F2B705",
} as const;
