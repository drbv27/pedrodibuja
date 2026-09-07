// Server-side `Person` JSON-LD (deck section 3.5, spec `seo-metadata`:
// "JSON-LD Person validates"). Rendered once in the root layout so it
// applies to every route.

import { site } from "@/content/site";
import { publicEnv } from "@/lib/env";

export interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  knowsAbout: string[];
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  /**
   * Omitted entirely (not `null`, not `[]`) while no social link exists —
   * see the deliberate conditional spread in `buildPersonJsonLd` below.
   */
  sameAs?: string[];
}

// Deck section 3.5 schema block, verbatim description line.
const PERSON_DESCRIPTION =
  "Artista colombiano que dibuja automóviles a lápiz y color.";

export function buildPersonJsonLd(): PersonJsonLd {
  const sameAs = site.social.map((link) => link.url);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${site.artist.firstName} ${site.artist.lastName}`,
    jobTitle: "Artista visual",
    description: PERSON_DESCRIPTION,
    url: publicEnv.siteUrl,
    knowsAbout: ["dibujo", "automóviles", "arte inclusivo"],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city ?? "Medellín",
      addressCountry: "CO",
    },
    // `sameAs` must be omitted entirely, never an empty array and never
    // `null`, while `site.social` is empty — spreading a conditional object
    // literal is what makes the key structurally absent from the result,
    // not merely falsy.
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * Serializes the `Person` object for a `dangerouslySetInnerHTML` JSON-LD
 * `<script>` block. Every literal `<` in the serialized JSON is replaced
 * with its `<` escape so an interpolated string value (e.g. a future
 * social URL) can never prematurely close the surrounding `<script>` tag
 * or inject markup into the page.
 */
export function serializePersonJsonLd(person: PersonJsonLd): string {
  return JSON.stringify(person).replace(/</g, "\\u003c");
}
