// Placeholder image registry (design D2). Every entry describes a named
// image slot the site needs; `src` stays `null` until a real photograph
// replaces the editorial placeholder frame rendered by `MediaSlot`. `alt` is
// the FINAL text, written now per the deck 3.6 formula
// ([Qué es] + [de qué] + [técnica] + [autor]), so nothing changes when the
// photograph itself is later dropped in.

export type ImageAspectRatio = "16/9" | "4/3" | "1/1" | "3/4";

export type ImageSlotId =
  | "home-hero"
  | "home-featured-1"
  | "home-featured-2"
  | "home-featured-3"
  | "home-featured-4"
  | "home-featured-5"
  | "home-featured-6"
  | "historia-portrait"
  | "historia-boccia"
  | "como-dibuja-hands"
  | "galeria-placeholder-1"
  | "galeria-placeholder-2"
  | "galeria-placeholder-3"
  | "galeria-placeholder-4"
  | "galeria-placeholder-5"
  | "galeria-placeholder-6"
  | "galeria-placeholder-7"
  | "galeria-placeholder-8"
  | "galeria-placeholder-9"
  | "galeria-placeholder-10"
  | "galeria-placeholder-11"
  | "galeria-placeholder-12";

export interface ImageSlot {
  id: ImageSlotId;
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
    alt: "Pedro dibujando un carro a lápiz, visto desde arriba: se ven sus manos, el lápiz y el dibujo en progreso.",
    caption: "Pedro, trabajando en uno de sus dibujos.",
    priority: true,
    src: null,
  },
  "home-featured-1": {
    id: "home-featured-1",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a grafito de un carro clásico, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a grafito.",
    src: null,
  },
  "home-featured-2": {
    id: "home-featured-2",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a lápices de color de un carro deportivo, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a color.",
    src: null,
  },
  "home-featured-3": {
    id: "home-featured-3",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a grafito de una camioneta, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a grafito.",
    src: null,
  },
  "home-featured-4": {
    id: "home-featured-4",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a lápices de color de un carro clásico, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a color.",
    src: null,
  },
  "home-featured-5": {
    id: "home-featured-5",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a grafito de un carro deportivo, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a grafito.",
    src: null,
  },
  "home-featured-6": {
    id: "home-featured-6",
    ratio: "1/1",
    tip: 5,
    alt: "Dibujo a lápices de color de una camioneta, hecho a mano por Pedro.",
    caption: "Uno de los últimos dibujos de Pedro, a color.",
    src: null,
  },
  "historia-portrait": {
    id: "historia-portrait",
    ratio: "3/4",
    tip: 3,
    alt: "Retrato de Pedro sonriendo, con la cámara a la altura de sus ojos, en un espacio luminoso.",
    caption:
      "Pedro, mirando a cámara a la altura de sus ojos — nunca en contrapicado, nunca centrando la silla de ruedas.",
    src: null,
  },
  "historia-boccia": {
    id: "historia-boccia",
    ratio: "16/9",
    tip: 6,
    alt: "Pedro en plena jugada de boccia, concentrado en el momento del lanzamiento.",
    caption:
      "El lanzamiento o la concentración: acción, no la foto posada con la medalla.",
    src: null,
  },
  "como-dibuja-hands": {
    id: "como-dibuja-hands",
    ratio: "16/9",
    tip: 2,
    alt: "Primer plano de las manos de Pedro sombreando con lápiz sobre el papel.",
    caption: "Las manos de Pedro, en pleno proceso.",
    src: null,
  },
  // Deck tip 9: a gallery grid only looks professional when every tile
  // shares one aspect ratio (design D3/D8 — /galeria ships this 12-tile
  // placeholder grid alongside the deck's empty-state line while
  // `content/artworks.ts` stays empty). Each caption names its own position
  // so the twelve tiles don't read as one identical line repeated to a
  // screen reader.
  "galeria-placeholder-1": {
    id: "galeria-placeholder-1",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 1 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-2": {
    id: "galeria-placeholder-2",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 2 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-3": {
    id: "galeria-placeholder-3",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 3 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-4": {
    id: "galeria-placeholder-4",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 4 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-5": {
    id: "galeria-placeholder-5",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 5 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-6": {
    id: "galeria-placeholder-6",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 6 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-7": {
    id: "galeria-placeholder-7",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 7 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-8": {
    id: "galeria-placeholder-8",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 8 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-9": {
    id: "galeria-placeholder-9",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 9 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-10": {
    id: "galeria-placeholder-10",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 10 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-11": {
    id: "galeria-placeholder-11",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 11 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
  "galeria-placeholder-12": {
    id: "galeria-placeholder-12",
    ratio: "1/1",
    tip: 9,
    alt: "Dibujo de un carro hecho a mano por Pedro, pendiente de publicar.",
    caption: "Espacio 12 de 12 — pronto, un nuevo dibujo de Pedro.",
    src: null,
  },
};

export const HOME_FEATURED_IMAGE_IDS: ImageSlotId[] = [
  "home-featured-1",
  "home-featured-2",
  "home-featured-3",
  "home-featured-4",
  "home-featured-5",
  "home-featured-6",
];

export const GALLERY_PLACEHOLDER_IMAGE_IDS: ImageSlotId[] = [
  "galeria-placeholder-1",
  "galeria-placeholder-2",
  "galeria-placeholder-3",
  "galeria-placeholder-4",
  "galeria-placeholder-5",
  "galeria-placeholder-6",
  "galeria-placeholder-7",
  "galeria-placeholder-8",
  "galeria-placeholder-9",
  "galeria-placeholder-10",
  "galeria-placeholder-11",
  "galeria-placeholder-12",
];
