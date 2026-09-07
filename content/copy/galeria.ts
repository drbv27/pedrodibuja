// Deck-verbatim Spanish copy for "/galeria" (deck section 4.3).
//
// Resolved product decision (proposal question 3): v1 ships the deck's
// empty-state microcopy together with a twelve-tile placeholder grid, never
// either alone. No filter row in v1 — a control that filters nothing is
// worse than no control (the deck's own "Filtros sugeridos" section is
// deliberately not implemented here).

export interface CtaContent {
  label: string;
  href: string;
}

export interface GaleriaCopy {
  encabezado: {
    heading: string;
    bajada: string;
  };
  /** Deck's "Estado vacío" microcopy — the honest lead-in above the grid. */
  emptyState: string;
  cierre: {
    heading: string;
    paragraph: string;
    cta: CtaContent;
  };
}

export const galeria: GaleriaCopy = {
  encabezado: {
    heading: "Dibujos de carros hechos a mano",
    bajada:
      "Toda la obra de Pedro en un solo lugar: grafito, lápices de color, clásicos, deportivos, camionetas y algún carro que solo existe en su cabeza. Hecho a mano, hoja por hoja.",
  },
  emptyState:
    "Pedro está dibujando. Vuelve pronto: aquí van a estar sus últimos trabajos.",
  cierre: {
    heading: "¿Te gustó alguno?",
    paragraph:
      "Varios de estos dibujos están disponibles, y Pedro también trabaja por encargo: si quieres el retrato de tu carro, se puede.",
    cta: { label: "Escríbenos", href: "/contacto" },
  },
};
