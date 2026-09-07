#!/usr/bin/env node
// scripts/launch-guard.mjs
//
// Fails the build closed on three unrelated launch-blocking mistakes
// (design D5, spec `content-source`/`deployment-and-environment`, this
// work unit's explicit scope):
//
//   1. An unresolved sentinel (`TODO_` prefix or `[[COMPLETAR` bracket)
//      reachable in shipped source.
//   2. Any word from the deck's *complete* section 1.5 editorial
//      blacklist appearing in shipped Spanish copy.
//   3. A hex colour literal anywhere outside the two files design D1
//      allows one (`app/globals.css`, `lib/og/colors.ts`).
//
// Scope, stated exactly: `app/`, `components/`, `content/`, `lib/` — every
// `.ts`/`.tsx`/`.css` file under those four directories, which is the
// site's actual shipped source. Deliberately EXCLUDED:
//   - `scripts/` (this file and `check-og.mjs` themselves — build tooling,
//     never shipped to the browser; this file's own blacklist array would
//     otherwise trip check #2 on itself).
//   - `contenido-pedro-dibuja.md` (the copy deck) — not shipped source at
//     all, and it legitimately quotes every blacklisted word by name to
//     document the rule.
// A `// launch-guard-allow: <word>` comment anywhere in a file exempts
// that exact word/phrase from check #2 for that file only (design D5's
// named escape hatch) — for a future comment that must legitimately name a
// blacklisted word (e.g. quoting this same rule), not for shipped copy.

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const SCAN_DIRS = ["app", "components", "content", "lib"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".css"]);

// The two files design D1 allows a hex colour literal in.
const HEX_ALLOWED_FILES = new Set([
  path.join(REPO_ROOT, "app", "globals.css"),
  path.join(REPO_ROOT, "lib", "og", "colors.ts"),
]);

// Deck section 1.5's complete list, verbatim — not a paraphrase, not a
// narrowed subset — with one evidenced exception below. `ayudémoslo` is
// scoped to the home page by the deck itself, but this scan checks it
// everywhere: a phrase this specific appearing on any other page would
// still be a blacklist violation, just one the deck did not anticipate
// needing to call out by route.
//
// `normal` is deliberately excluded, matching design D5's own call: the
// deck's entry reads "normal (como opuesto a él)" — only the contrastive
// editorial sense is blacklisted, and a substring scan cannot tell that
// sense apart from the unrelated CSS `font-style: "normal"` keyword this
// codebase legitimately uses in `app/icon.tsx` and `lib/og/template.tsx`
// (verified: those are the only two hits, and zero shipped Spanish copy
// module uses "normal" in any sense — checked by hand before excluding
// it). It stays a human review item, per design D5.
const BLACKLIST = [
  "sufre",
  "padece",
  "postrado",
  "confinado",
  "a pesar de",
  "pese a su",
  "angelito",
  "ser de luz",
  "capacidades diferentes",
  "superación",
  "lucha diaria",
  "guerrero",
  "inspiración para todos",
  "ejemplo de vida",
  "pobrecito",
  "ayudémoslo",
];

const SENTINEL_PATTERNS = [
  { name: "TODO_ sentinel", pattern: /\bTODO_[A-Za-z0-9_]*/ },
  { name: "[[COMPLETAR bracket", pattern: /\[\[COMPLETAR/ },
];

// Longest-first alternation so a run of hex digits is matched at its full
// length before a shorter form could partially match it.
const HEX_LITERAL_PATTERN = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g;

const ALLOW_COMMENT_PATTERN = /launch-guard-allow:\s*([^\n]+)/gi;

/**
 * Strips `/* ... *\/` block comments (this also covers CSS comments and
 * JSX `{/* ... *\/}`, since both use the same delimiters) and `// ...`
 * line comments before any check runs. This matches the spec's own
 * wording for the sentinel check — "reachable in the *compiled output*" —
 * and TypeScript/JS comments never survive compilation, so a design
 * rationale comment that quotes `[[COMPLETAR` or a blacklisted phrase to
 * explain *why* a field is still null must not fail a build that a real
 * shipped string in the same position would rightly fail. Good enough for
 * this codebase's actual content, not a full parser: a `//` inside a
 * string literal (e.g. a `https://` URL) truncates the rest of that line
 * for scanning purposes only, which is safe here because no sentinel,
 * blacklisted phrase, or hex literal in this repo ever follows one on the
 * same line as real code (checked by hand for every file this script
 * flagged before comment-stripping was added).
 */
function stripComments(source) {
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, "");
  return withoutBlockComments.replace(/\/\/.*$/gm, "");
}

let failed = false;

function fail(message) {
  console.error(`✖ launch-guard: ${message}`);
  failed = true;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Recursively lists every scannable file under the given directories. */
function findScannableFiles(dirs) {
  const files = [];
  for (const dir of dirs) {
    const absoluteDir = path.join(REPO_ROOT, dir);
    let entries;
    try {
      entries = readdirSync(absoluteDir, { recursive: true });
    } catch {
      continue; // Directory does not exist in this checkout — nothing to scan.
    }
    for (const entry of entries) {
      const fullPath = path.join(absoluteDir, entry);
      const stats = statSync(fullPath, { throwIfNoEntry: false });
      if (stats?.isFile() && SCAN_EXTENSIONS.has(path.extname(fullPath))) {
        files.push(fullPath);
      }
    }
  }
  return files.sort();
}

/** Extracts this file's own `launch-guard-allow:` exemptions, lower-cased. */
function extractAllowedWords(source) {
  const allowed = new Set();
  for (const match of source.matchAll(ALLOW_COMMENT_PATTERN)) {
    for (const word of match[1].split(",")) {
      const trimmed = word.trim().toLowerCase();
      if (trimmed.length > 0) allowed.add(trimmed);
    }
  }
  return allowed;
}

function checkSentinels(file, source, relativePath) {
  for (const { name, pattern } of SENTINEL_PATTERNS) {
    const match = source.match(pattern);
    if (match) {
      fail(`${relativePath} contains an unresolved ${name}: "${match[0]}".`);
    }
  }
}

function checkBlacklist(file, source, relativePath, allowedWords) {
  for (const word of BLACKLIST) {
    if (allowedWords.has(word.toLowerCase())) continue;
    // Unicode-aware word boundaries so accented Spanish letters on either
    // side of the match still count as "inside a word" (a plain `\b` does
    // not understand `á`/`í`/`ñ`/etc. and would under-match).
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(word)}(?![\\p{L}\\p{N}])`, "iu");
    const match = source.match(pattern);
    if (match) {
      fail(
        `${relativePath} contains blacklisted phrase "${word}" (deck section 1.5). ` +
          `If this is a comment legitimately quoting the rule, add "// launch-guard-allow: ${word}" to this file.`,
      );
    }
  }
}

function checkHexLiterals(file, source, relativePath) {
  if (HEX_ALLOWED_FILES.has(file)) return;
  const matches = source.match(HEX_LITERAL_PATTERN);
  if (matches) {
    fail(`${relativePath} contains a hex colour literal (${matches[0]}) outside the two allowed files.`);
  }
}

const files = findScannableFiles(SCAN_DIRS);
console.log(
  `launch-guard: scanning ${files.length} file(s) under ${SCAN_DIRS.join(", ")}/ ` +
    `(extensions: ${[...SCAN_EXTENSIONS].join(", ")}) — scripts/ and the copy deck are out of scope.`,
);

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const relativePath = path.relative(REPO_ROOT, file);
  // Allow-hatch markers live inside comments by definition, so they must
  // be read from the raw source before comments are stripped for the
  // actual checks below.
  const allowedWords = extractAllowedWords(source);
  const scannable = stripComments(source);
  checkSentinels(file, scannable, relativePath);
  checkBlacklist(file, scannable, relativePath, allowedWords);
  checkHexLiterals(file, scannable, relativePath);
}

if (failed) {
  console.error("✖ launch-guard: FAILED");
  process.exitCode = 1;
} else {
  console.log(
    `✓ launch-guard: all checks passed — no sentinels, no blacklisted words, no stray hex literals in ${files.length} file(s).`,
  );
}
