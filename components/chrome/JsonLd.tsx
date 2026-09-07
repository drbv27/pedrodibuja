// Renders one pre-serialized, pre-escaped JSON-LD `<script>` block. The
// caller (root layout) owns escaping via `lib/jsonld.ts`'s
// `serializePersonJsonLd` — this component never touches raw data, only an
// already-safe string, so it stays a one-line, reusable primitive for any
// future schema type (e.g. `VisualArtwork` in a later phase).

interface JsonLdProps {
  /** Already `<`-escaped, `JSON.stringify`-d structured data. */
  data: string;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
