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
  // TODO: Diego to provide city of residence (deck section 0, item 2).
  city: null,
  contact: {
    // TODO: Diego to provide contact email (deck section 0, item 5).
    email: null,
    // TODO: Diego to provide WhatsApp number (deck section 0, item 5).
    whatsapp: null,
    // TODO: Diego to provide Instagram handle/link (deck section 0, item 6).
    instagram: null,
  },
  stats: {
    // TODO: Diego to provide years drawing (deck section 0, item 3).
    yearsDrawing: null,
    // TODO: Diego to provide approximate drawing count (deck section 0, item 4).
    drawingCount: null,
  },
  // TODO: Diego to provide social links (deck section 0, item 6).
  social: [],
  flags: {
    commerce: false,
  },
};
