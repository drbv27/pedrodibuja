export interface InfoListItem {
  id: string;
  /** Bold lead term, e.g. "Lápices de grafito". Omit for a plain item. */
  lead?: string;
  /**
   * The rest of the sentence, including any leading space/punctuation the
   * caller needs. Baked in by the caller (not this component) so a
   * null-safe sentence variant can degrade an item without ever leaving a
   * stray space or an empty bold tag (design D5).
   */
  text: string;
}

interface InfoListProps {
  items: InfoListItem[];
  className?: string;
}

/**
 * A bulleted list where each item may open with a bold lead term (design
 * D6) — used by "Con qué trabaja" on `/como-dibuja`, where two of the four
 * items degrade gracefully while their underlying data stays unresolved.
 */
export function InfoList({ items, className }: InfoListProps) {
  return (
    <ul className={["list-disc space-y-3 pl-5", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <li key={item.id}>
          {item.lead ? <strong>{item.lead}</strong> : null}
          {item.text}
        </li>
      ))}
    </ul>
  );
}
