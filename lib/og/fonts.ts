// Static, latin-subset TTF loading for the shared OG image renderer.
//
// `next/font/google` (used by `app/layout.tsx` for on-page type) emits
// woff2 and never exposes a readable file path, and Satori — the renderer
// behind `ImageResponse` — only accepts ttf/otf/woff and cannot parse a
// variable font. So two static instances are committed to
// `lib/og/fonts/`: Bricolage Grotesque weight 700 and Inter weight 400,
// both subsetted to the Latin Google Fonts range (covers á é í ó ú ñ ü ¿ ¡),
// combined ~108KB — comfortably inside the `ImageResponse` bundle cap.
//
// Loaded through a module-scope memoized promise, not a top-level `await`:
// the module import stays synchronous, and the file read happens at most
// once per build no matter how many of the six `opengraph-image.tsx` files
// import this module or how many times each one renders. This is a plain
// local file read, not a request-time API — it does not affect the static
// prerender invariant `scripts/check-og.mjs` verifies.

import { readFile } from "node:fs/promises";
import path from "node:path";

export interface OgFonts {
  display: ArrayBuffer;
  body: ArrayBuffer;
}

const FONTS_DIR = path.join(process.cwd(), "lib/og/fonts");

async function readFontFile(fileName: string): Promise<ArrayBuffer> {
  const buffer = await readFile(path.join(FONTS_DIR, fileName));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

async function readFonts(): Promise<OgFonts> {
  const [display, body] = await Promise.all([
    readFontFile("bricolage-grotesque-700-latin.ttf"),
    readFontFile("inter-400-latin.ttf"),
  ]);
  return { display, body };
}

let cache: Promise<OgFonts> | null = null;

/** Pure, memoized: the file system is read once per build, ever. */
export function loadOgFonts(): Promise<OgFonts> {
  if (!cache) {
    cache = readFonts();
  }
  return cache;
}
