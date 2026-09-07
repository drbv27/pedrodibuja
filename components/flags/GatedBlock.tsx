import type { ReactNode } from "react";
import { site } from "@/content/site";

// `site.flags.commerce` is typed as the literal `false` (`content/site.ts`),
// so this alias carries that exact literal type too. Flipping the four
// `/apoya` blocks on later means changing that one literal to `true` — this
// component needs no edit, and while it stays `false`, TypeScript itself
// documents that the block below can only ever be reached once the flag's
// declared type changes, not by any runtime path in this file.
const COMMERCE_ENABLED: typeof site.flags.commerce = site.flags.commerce;

interface GatedBlockProps {
  children: ReactNode;
}

/**
 * Wraps content that must stay entirely absent from the DOM — not rendered
 * empty, not a placeholder — while `flags.commerce` is `false` (design D6,
 * spec `marketing-pages` "Commerce blocks gated behind a disabled flag").
 * Callers wrap the whole `<Section>` per block, not just its inner content,
 * so a gated block never leaves an empty padded section in the layout.
 */
export function GatedBlock({ children }: GatedBlockProps) {
  if (COMMERCE_ENABLED) {
    return <>{children}</>;
  }
  return null;
}
