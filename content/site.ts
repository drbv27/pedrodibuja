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
  materials: {
    /**
     * Deck section 4.4 "Los materiales" — the usual paper type and size
     * (e.g. "tipo carta, 21,5 × 28 cm"). Still unresolved per Engram id 511;
     * stays `null` so the materials list degrades to "Papel blanco." instead
     * of ever rendering the deck's `[[COMPLETAR: tipo y tamaño habitual]]`.
     */
    paperType: string | null;
    /**
     * Deck section 4.4 — how long a full drawing takes (e.g. "unas tres
     * semanas"). Still unresolved per Engram id 511; stays `null` so the
     * sentence degrades to a natural reading without a specific duration.
     */
    drawingDuration: string | null;
  };
  /** Deck section 0, item 6 — empty until at least one link exists. */
  social: SocialLink[];
  /**
   * Deck section 4.5, Bloques 2 and 4 — commission/support details behind
   * the still-unresolved `flags.commerce` blocks. Kept nullable so those
   * blocks compile and render a natural degraded sentence today, and light
   * up with real values the moment Diego resolves them — no code change
   * either way, only this data.
   */
  commerce: {
    /** Bloque 2 `[[COMPLETAR]]` — usual commission size. */
    commissionSize: string | null;
    /** Bloque 2 `[[COMPLETAR]]` — approximate lead time. */
    commissionLeadTime: string | null;
    /** Bloque 2 `[[COMPLETAR]]` — price. */
    commissionPrice: string | null;
    /** Bloque 2 `[[COMPLETAR: cobertura]]` — shipping coverage. */
    commissionShipping: string | null;
    /**
     * Bloque 4 `[[COMPLETAR: enlace de pago]]`. While unresolved, the
     * "Apoyar" CTA degrades to `/contacto` instead of a dead link.
     */
    supportPaymentLink: string | null;
    /**
     * Transparency block `[[COMPLETAR: materiales, participación en boccia,
     * transporte, etc.]]`. While unresolved, the sentence degrades to a
     * still-true general reading rather than a visible placeholder.
     */
    transparencyUse: string | null;
  };
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
    /** Confirmed by Diego for this work unit — the account exists and links now render. */
    instagram: "pedroagudelo0612",
  },
  stats: {
    /** Approximate, confirmed by the family: drawing since about age 12. */
    yearsDrawing: 25,
    /** Approximate, confirmed by the family. */
    drawingCount: 300,
  },
  family: {
    /**
     * Written from Yamile's first person, because she narrates
     * `/su-historia` — she cannot refer to herself in the third person, and
     * Lucelly and Laura are her mother and sister too, not only Pedro's.
     *
     * The niece is deliberately unnamed. She is Yamile's daughter, a minor,
     * and this is a public page built to rank: "mi hija" is warmer than her
     * name and does not attach it to an indexed page for good.
     */
    tenderNames: [
      "nuestra mamá Lucelly",
      "nuestra hermana Laura",
      "mi hija",
      "conmigo",
    ],
  },
  materials: {
    /**
     * Type only, no dimensions. The family knows he works on drawing-block
     * paper but is not sure of the size, and a page about someone's
     * technique is the worst place to publish a guessed measurement — the
     * one audience that would notice is other people who draw. Append the
     * size here once somebody measures a sheet.
     */
    paperType: "de los blocks de dibujo",
    drawingDuration: "entre uno y dos días, según el detalle",
  },
  social: [{ platform: "instagram", url: "https://www.instagram.com/pedroagudelo0612/" }],
  commerce: {
    // TODO: Diego to provide commission size, lead time, price and shipping
    // coverage (deck section 4.5, Bloque 2) before activating `flags.commerce`.
    commissionSize: null,
    commissionLeadTime: null,
    commissionPrice: null,
    commissionShipping: null,
    // TODO: Diego to provide a payment link (deck section 4.5, Bloque 4)
    // before activating `flags.commerce`.
    supportPaymentLink: null,
    // TODO: Diego to provide the transparency detail (deck section 4.5,
    // transparency block) before activating `flags.commerce`.
    transparencyUse: null,
  },
  flags: {
    commerce: false,
  },
};
