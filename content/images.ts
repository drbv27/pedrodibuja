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
  | "como-dibuja-hands";

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
    caption: "Pedro.",
    src: null,
  },
  "historia-boccia": {
    id: "historia-boccia",
    ratio: "16/9",
    tip: 6,
    alt: "Pedro en plena jugada de boccia, concentrado en el momento del lanzamiento.",
    caption: "Pedro jugando boccia, un martes cualquiera.",
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
};

export const HOME_FEATURED_IMAGE_IDS: ImageSlotId[] = [
  "home-featured-1",
  "home-featured-2",
  "home-featured-3",
  "home-featured-4",
  "home-featured-5",
  "home-featured-6",
];
