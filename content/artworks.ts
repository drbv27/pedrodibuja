// Gallery data module (design D3). Populated with the six real artwork
// photographs handed off for this work unit — the deck section 4.3 template
// per artwork, filled only with facts actually known. Diego was explicit:
// never invent a dimension, a year or a price. Every field the family has
// not confirmed stays `null` and renders nothing, exactly like the rest of
// this content layer's nullable-by-type convention (design D5).
//
// `title`, `sizeCm` and `availability` are unknown for all six, so all three
// are typed nullable here (a deliberate widening of this interface's
// original non-null `title`/`availability` — noted as a design deviation in
// this work unit's apply report, not a silent one). `tags` ships now, per
// design D3, for a future filter feature; this batch leaves every artwork's
// `tags` empty rather than guess a classification the deck never assigned.

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
  /** Unknown for all six in this batch — no invented title is shipped. */
  title: string | null;
  technique: ArtworkTechnique;
  /** Deck's plantilla label, e.g. "Grafito y lápices de color sobre papel". */
  techniqueLabel: string;
  /** e.g. "21 × 29,7 cm" — null until Pedro/Diego record a size. */
  sizeCm: string | null;
  year: number | null;
  /**
   * Exact date, when known (e.g. dedications), kept separate from `year`
   * because the deck's own template only asks for a year — this field is
   * additive, not a replacement.
   */
  dateLabel: string | null;
  /** A handwritten dedication on the piece itself, when one is known to exist. */
  dedicationNote: string | null;
  /** Pedro's line on why he chose this car; family-interpretation note applies. */
  note: string | null;
  /** Unknown for all six in this batch — no invented availability is shipped. */
  availability: ArtworkAvailability | null;
  tags: ArtworkTag[];
  image: ImageSlot | null;
  /** Selects the six home-page featured tiles once real artwork exists. */
  featured: boolean;
}

export const artworks: Artwork[] = [
  {
    slug: "obra-01",
    title: null,
    technique: "color",
    techniqueLabel: "Lápices de color sobre papel",
    sizeCm: null,
    year: 2026,
    dateLabel: "13 de julio de 2026",
    dedicationNote: "Lleva una dedicatoria escrita a mano por Pedro.",
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-01",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a color de un camión cisterna de Colanta visto de perfil, hecho a mano por Pedro",
      caption: "Dibujo a color de un camión cisterna de Colanta visto de perfil, hecho a mano por Pedro.",
      src: "/fotos/obra-01.jpg",
    },
  },
  {
    slug: "obra-02",
    title: null,
    technique: "color",
    techniqueLabel: "Lápices de color sobre papel",
    sizeCm: null,
    year: 2026,
    dateLabel: "9 de mayo de 2026",
    dedicationNote: null,
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-02",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a color de una camioneta verde oliva vista de perfil, hecha a mano por Pedro",
      caption: "Dibujo a color de una camioneta verde oliva vista de perfil, hecha a mano por Pedro.",
      src: "/fotos/obra-02.jpg",
    },
  },
  {
    slug: "obra-03",
    title: null,
    technique: "mixta",
    techniqueLabel: "Grafito y lápices de color sobre papel",
    sizeCm: null,
    year: null,
    dateLabel: null,
    dedicationNote: null,
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-03",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a lápiz y color de una motocicleta deportiva vista de perfil, hecha a mano por Pedro",
      caption: "Dibujo a lápiz y color de una motocicleta deportiva vista de perfil, hecha a mano por Pedro.",
      src: "/fotos/obra-03.jpg",
    },
  },
  {
    slug: "obra-04",
    title: null,
    technique: "grafito",
    techniqueLabel: "Grafito sobre papel",
    sizeCm: null,
    year: null,
    dateLabel: null,
    dedicationNote: null,
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-04",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a lápiz de una moto scooter vista de perfil, hecha a mano por Pedro",
      caption: "Dibujo a lápiz de una moto scooter vista de perfil, hecha a mano por Pedro.",
      src: "/fotos/obra-04.jpg",
    },
  },
  {
    slug: "obra-05",
    title: null,
    technique: "color",
    techniqueLabel: "Lápices de color sobre papel",
    sizeCm: null,
    year: null,
    dateLabel: null,
    dedicationNote: null,
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-05",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a color de un camión del INDER de Medellín visto de perfil, hecho a mano por Pedro",
      caption: "Dibujo a color de un camión del INDER de Medellín visto de perfil, hecho a mano por Pedro.",
      src: "/fotos/obra-05.jpg",
    },
  },
  {
    slug: "obra-06",
    title: null,
    technique: "color",
    techniqueLabel: "Lápices de color sobre papel",
    sizeCm: null,
    year: null,
    dateLabel: null,
    dedicationNote: null,
    note: null,
    availability: null,
    tags: [],
    featured: true,
    image: {
      id: "obra-06",
      ratio: "4/3",
      tip: 9,
      alt: "Dibujo a color de una camioneta familiar roja vista de perfil, hecha a mano por Pedro",
      caption: "Dibujo a color de una camioneta familiar roja vista de perfil, hecha a mano por Pedro.",
      src: "/fotos/obra-06.jpg",
    },
  },
];
