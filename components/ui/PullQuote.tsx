import { FAMILY_INTERPRETATION_NOTE } from "@/content/copy/shared";

interface PullQuoteProps {
  quote: string;
  attribution: string;
  className?: string;
}

/**
 * Full-width pull quote at display type. Always renders the family
 * interpretation note (design D6) — never optional, never caller-supplied.
 * The note itself lives in `content/copy/shared.ts`, not inline here, so
 * `/su-historia` Bloque 3 can render the identical string without drift.
 */
export function PullQuote({ quote, attribution, className }: PullQuoteProps) {
  return (
    <figure className={["mx-auto max-w-prose text-center", className].filter(Boolean).join(" ")}>
      <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
        «&nbsp;{quote}&nbsp;»
      </blockquote>
      <figcaption className="mt-4 text-sm">— {attribution}</figcaption>
      <p className="mt-6 text-xs opacity-80">{FAMILY_INTERPRETATION_NOTE}</p>
    </figure>
  );
}
