// Gallery data module (design D3). Empty in v1 — no real artwork data
// exists yet (deck section 4.3 has no filled-in artwork entries). The shape
// is frozen now so `/galeria/[obra]` can add `generateStaticParams()` in a
// later version as `artworks.map((a) => ({ obra: a.slug }))` with zero data
// migration, and so `/galeria` can tell whether to render its placeholder
// grid (`artworks.length === 0`) versus real tiles once this fills in.

import type { ImageSlot } from "./images";

export type ArtworkTechnique = "grafito" | "color" | "mixta";

/**
 * Ships now, unused in v1 (design D3): a later gallery-filter version
 * (`/galeria/grafito`) needs no data migration once these tags are already
 * on every artwork.
 */
export type ArtworkTag = "clasicos" | "deportivos" | "camionetas" | "recientes";

export type ArtworkAvailability =
  | "disponible"
  | "coleccion-privada"
  | "no-a-la-venta";

export interface Artwork {
  /** Accent-free, hyphenated, frozen once published (deck section 2). */
  slug: string;
  title: string;
  technique: ArtworkTechnique;
  /** Deck's plantilla label, e.g. "Grafito y lápices de color sobre papel". */
  techniqueLabel: string;
  /** e.g. "21 × 29,7 cm" — null until Pedro/Diego record a size. */
  sizeCm: string | null;
  year: number | null;
  /** Pedro's line on why he chose this car; family-interpretation note applies. */
  note: string | null;
  availability: ArtworkAvailability;
  tags: ArtworkTag[];
  image: ImageSlot | null;
  /** Selects the six home-page featured tiles once real artwork exists. */
  featured: boolean;
}

// Empty in v1. `/galeria` renders the deck's empty-state line above a
// twelve-tile placeholder grid whenever this array has no entries (spec:
// marketing-pages "Gallery placeholder grid with empty-state lead-in").
export const artworks: Artwork[] = [];
