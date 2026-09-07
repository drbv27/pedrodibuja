#!/usr/bin/env node
// scripts/check-og.mjs
//
// Two-layer, fail-closed proof that every `opengraph-image.tsx` stays
// statically prerendered (spec `social-preview-images`, design D4). A
// request-time OG image means a cold-start render on first request, and
// WhatsApp's link-preview scraper times out before the PNG exists — the
// link ships bare, with no thumbnail (Engram id 500).
//
// Layer 1 (fast, local, no build): grep every `app/**/opengraph-image.tsx`
// file for the request-time APIs that flip Next's static/dynamic decision.
//
// Layer 2 (the real proof): run `next build`, capture its stdout, and parse
// the printed Route table for the OG image entries. Asserts every one of
// them is found AND carries the static marker (○), never a dynamic one. If
// fewer than the expected count can be located at all — e.g. because a
// future Next.js release changes the table's output format — this exits 1
// rather than silently passing.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const APP_DIR = path.join(REPO_ROOT, "app");

// Design D4's exact list: any of these inside an `opengraph-image.tsx`
// forces Next.js to render it dynamically instead of prerendering it.
const FORBIDDEN_IDENTIFIERS = [
  "cookies",
  "headers",
  "draftMode",
  "searchParams",
  "unstable_noStore",
  "connection",
  "force-dynamic",
  "revalidate",
];

const STATIC_MARKER = "○";
// Every non-static marker Next's Route table can print for a page/route.
const DYNAMIC_MARKERS = ["ƒ", "λ", "●"];

function fail(message) {
  console.error(`✖ check-og: ${message}`);
  process.exitCode = 1;
}

/** Recursively lists every `opengraph-image.*` file under `app/`. */
function findOgImageFiles(dir) {
  const entries = readdirSync(dir, { recursive: true });
  return entries
    .map((entry) => path.join(dir, entry))
    .filter((fullPath) => {
      const stats = statSync(fullPath, { throwIfNoEntry: false });
      return stats?.isFile() && /^opengraph-image\.(tsx|ts|jsx|js)$/.test(path.basename(fullPath));
    })
    .sort();
}

function runLayer1(files) {
  console.log(`check-og: layer 1 — scanning ${files.length} opengraph-image file(s) for request-time APIs...`);

  if (files.length === 0) {
    fail("found zero opengraph-image.tsx files under app/ — expected six.");
    return;
  }

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const relativePath = path.relative(REPO_ROOT, file);

    for (const identifier of FORBIDDEN_IDENTIFIERS) {
      // Word-boundary match: catches `cookies()` / `export const revalidate`
      // etc. without false-positiving on an unrelated identifier substring.
      const pattern = new RegExp(`\\b${identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (pattern.test(source)) {
        fail(`${relativePath} contains the forbidden request-time identifier "${identifier}".`);
      }
    }
  }

  if (process.exitCode !== 1) {
    console.log("check-og: layer 1 passed — no request-time API found in any opengraph-image file.");
  }
}

function runLayer2(files) {
  console.log("check-og: layer 2 — running `next build` and inspecting the Route table...");

  let buildOutput;
  try {
    buildOutput = execFileSync("npx", ["next", "build"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const stdout = error.stdout ?? "";
    const stderr = error.stderr ?? "";
    console.error(stdout);
    console.error(stderr);
    fail("`next build` failed — see output above.");
    return;
  }

  console.log(buildOutput);

  const lines = buildOutput.split("\n");
  const ogImageLines = lines.filter((line) => line.includes("opengraph-image"));

  if (ogImageLines.length < files.length) {
    fail(
      `expected to find ${files.length} "opengraph-image" line(s) in the build's Route table, found ${ogImageLines.length}. ` +
        "This likely means Next.js changed its build output format — treat this as a failure, not a pass.",
    );
    return;
  }

  for (const line of ogImageLines) {
    const isStatic = line.includes(STATIC_MARKER);
    const isDynamic = DYNAMIC_MARKERS.some((marker) => line.includes(marker));

    if (isDynamic || !isStatic) {
      fail(`route table line is not statically prerendered: "${line.trim()}"`);
    }
  }

  if (process.exitCode !== 1) {
    console.log(
      `check-og: layer 2 passed — all ${ogImageLines.length} opengraph-image route(s) are statically prerendered (${STATIC_MARKER}).`,
    );
  }
}

const ogImageFiles = findOgImageFiles(APP_DIR);
runLayer1(ogImageFiles);

if (process.exitCode !== 1) {
  runLayer2(ogImageFiles);
}

if (process.exitCode === 1) {
  console.error("✖ check-og: FAILED");
} else {
  console.log("✓ check-og: all checks passed.");
}
