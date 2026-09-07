// Centralized, typed content module. Every value Diego has not yet provided
// is `null` at the type level (not a sentinel string), so a component that
// forgets to guard a missing value fails `strictNullChecks`, not silently
// rendering `[[COMPLETAR]]` in production. See design D5 and
// `scripts/launch-guard.mjs` (a later work unit) for the build-time backstop.

export interface SocialLink {
  platform: "instagram" | "whatsapp" | "facebook" | "x";
  url: string;
}

export interface SiteContent {
  artist: {
    firstName: "Pedro";
    lastName: "Agudelo";
    age: 37;
  };
  /** Deck section 0, item 2 — city of residence. */
  city: string | null;
  contact: {
    /** Deck section 0, item 5. */
    email: string | null;
    /** Deck section 0, item 5. */
    whatsapp: string | null;
    /** Deck section 0, item 6. */
    instagram: string | null;
  };
  stats: {
    /** Deck section 0, item 3. */
    yearsDrawing: number | null;
    /** Deck section 0, item 4. */
    drawingCount: number | null;
  };
  family: {
    /**
     * Deck section 4.2, Bloque 5 — family members Pedro is especially
     * tender with. Unresolved (`[[COMPLETAR: nombres]]` in the deck); stays
     * `null` so the sentence that names them degrades to a natural reading
     * without them instead of ever rendering a visible placeholder.
     */
    tenderNames: string[] | null;
  };
  /** Deck section 0, item 6 — empty until at least one link exists. */
  social: SocialLink[];
  flags: {
    /**
     * Explicit v1 decision (proposal + design D5): `/apoya` ships in a
     * soft-launch state. Bloques 2-4 and the transparency block stay in
     * source but render nothing while this is `false`.
     */
    commerce: false;
  };
}

export const site: SiteContent = {
  artist: { firstName: "Pedro", lastName: "Agudelo", age: 37 },
  city: "Medellín",
  contact: {
    email: "pedro.a.dibuja@gmail.com",
    /**
     * Stored in E.164 so it can be used directly as a `wa.me` target
     * (`https://wa.me/573217915232`). Render a formatted version for display;
     * never print this raw string to the page.
     */
    whatsapp: "+573217915232",
    /** No Instagram account exists yet, so every link to it stays hidden. */
    instagram: null,
  },
  stats: {
    /** Approximate, confirmed by the family: drawing since about age 12. */
    yearsDrawing: 25,
    /** Approximate, confirmed by the family. */
    drawingCount: 300,
  },
  family: {
    // TODO: Diego to provide the family members' names Pedro is especially
    // tender with (deck section 4.2, Bloque 5: "[[COMPLETAR: nombres]]").
    tenderNames: null,
  },
  // TODO: Diego to provide social links (deck section 0, item 6).
  social: [],
  flags: {
    commerce: false,
  },
};
