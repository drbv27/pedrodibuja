// Named image-slot registry (design D2). Every entry describes an image slot
// that is not tied to a specific artwork — the six artwork photographs live
// as `image` literals directly on their `Artwork` record in
// `content/artworks.ts` instead, since design D3 models a photograph as part
// of the artwork it depicts, not a lookup by a generic id.
//
// `alt` follows the deck 3.6 formula ([Qué es] + [de qué] + [técnica] +
// [autor]) and is verbatim per this work unit's asset handoff. `caption`
// mirrors `alt` for every slot that now carries a real photograph — the
// deck's own alts already read as prose, so a caption is not a paraphrase,
// it is the same accessible description rendered visibly (design D2).

export type ImageAspectRatio = "16/9" | "4/3" | "1/1" | "3/4" | "3/2" | "4/7";

export type ImageSlotId =
  | "home-hero"
  | "historia-portrait"
  | "historia-boccia"
  | "como-dibuja-hands"
  | "apoya-portrait";

export interface ImageSlot {
  id: ImageSlotId | string;
  ratio: ImageAspectRatio;
  /** Deck section 6 tip number this slot's photo-selection guidance comes from. */
  tip: number;
  alt: string;
  caption: string;
  /** Only the hero image should load eagerly. */
  priority?: boolean;
  src: string | null;
}

export const IMAGE_SLOTS: Record<ImageSlotId, ImageSlot> = {
  "home-hero": {
    id: "home-hero",
    ratio: "16/9",
    tip: 1,
    alt: "Pedro traza a lápiz el contorno de un carro sobre una hoja, con su estuche de colores al lado",
    caption: "Pedro traza a lápiz el contorno de un carro sobre una hoja, con su estuche de colores al lado.",
    priority: true,
    src: "/fotos/hero-dibujando.jpg",
  },
  "historia-portrait": {
    id: "historia-portrait",
    ratio: "3/4",
    tip: 3,
    alt: "Pedro mira a la cámara con expresión tranquila, en su casa",
    caption: "Pedro mira a la cámara con expresión tranquila, en su casa.",
    src: "/fotos/retrato-pedro.jpg",
  },
  "historia-boccia": {
    id: "historia-boccia",
    // Real dimensions (1000×1333) measure ≈3:4, not the 16:9 this slot
    // assumed before a photograph existed — updated to match the actual
    // asset so `object-cover` crops as little as possible (design D2's
    // ratio is content data, not a component constraint).
    ratio: "3/4",
    tip: 6,
    alt: "Pedro con la camiseta del INDER en la cancha donde entrena boccia",
    caption: "Pedro con la camiseta del INDER en la cancha donde entrena boccia.",
    src: "/fotos/boccia-inder.jpg",
  },
  "como-dibuja-hands": {
    id: "como-dibuja-hands",
    // Real dimensions (1200×800) are 3:2, not the 16:9 placeholder guess.
    ratio: "3/2",
    tip: 2,
    alt: "Manos de Pedro trazando con lápiz la silueta de un carro sobre papel blanco",
    caption: "Manos de Pedro trazando con lápiz la silueta de un carro sobre papel blanco.",
    src: "/fotos/manos-lapiz.jpg",
  },
  "apoya-portrait": {
    id: "apoya-portrait",
    // Real dimensions (900×1575) reduce exactly to 4:7 — a tall portrait,
    // not the deck table's "ideal" horizontal, but this is the real asset
    // this work unit was handed, used as delivered.
    ratio: "4/7",
    tip: 3,
    alt: "Pedro sostiene y muestra uno de sus dibujos terminados sobre la mesa donde trabaja",
    caption: "Pedro sostiene y muestra uno de sus dibujos terminados sobre la mesa donde trabaja.",
    src: "/fotos/pedro-muestra-dibujo.jpg",
  },
};
