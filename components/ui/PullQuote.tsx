interface PullQuoteProps {
  quote: string;
  attribution: string;
  className?: string;
}

// Deck section 4.2 "Nota editorial fija" — mandatory in small print below
// any quote attributed to Pedro anywhere on the site (deck section 1.5,
// rule 7: as Pedro does not use oral language, any quoted line must be
// framed as his family's interpretation). This lives in the component, not
// in caller-supplied copy, so it cannot be forgotten at a call site.
const FAMILY_INTERPRETATION_NOTE =
  "Pedro se comunica con gestos, miradas y dibujos. Las frases que aparecen en este sitio entre comillas son la interpretación de su familia.";

/**
 * Full-width pull quote at display type. Always renders the family
 * interpretation note (design D6) — never optional, never caller-supplied.
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
