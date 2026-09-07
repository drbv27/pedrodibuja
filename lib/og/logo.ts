// Static logo loading for the shared OG image renderer (WU10, Engram id 514).
//
// Satori (the renderer behind `ImageResponse`) needs a `data:` URI, not a
// file path, so the logo is read once and base64-encoded — the same
// module-scope-memoized pattern `lib/og/fonts.ts` already uses for the two
// committed TTFs. This is a plain local file read, not a request-time API,
// so it does not affect the static prerender invariant `scripts/check-og.mjs`
// verifies.
//
// The source file is `lib/og/logo-paper.jpg`: the logo with its paper
// background already baked in, no alpha channel. The logo only ever
// renders on the paper background (measured contrast, Engram id 514 —
// "Pedro" on ink is 1.20:1, invisible), so baking that background in ahead
// of time avoids shipping a transparent PNG. A 1024px-wide transparent PNG
// of this same logo is 449KB, which becomes ~600KB as base64 and blows the
// `ImageResponse` bundle's ~500KB cap; this JPEG is 86.7KB on disk, ~116KB
// as base64 — comfortably inside it.

import { readFile } from "node:fs/promises";
import path from "node:path";

const LOGO_PATH = path.join(process.cwd(), "lib/og/logo-paper.jpg");

/** Intrinsic pixel dimensions of `logo-paper.jpg` — used to derive a
 * render height from a target width without distorting the logo. */
export const LOGO_NATURAL_WIDTH = 1024;
export const LOGO_NATURAL_HEIGHT = 663;

let cache: Promise<string> | null = null;

/** Pure, memoized: the file system is read once per build, ever. */
export function loadOgLogo(): Promise<string> {
  if (!cache) {
    cache = readFile(LOGO_PATH).then(
      (buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`,
    );
  }
  return cache;
}
