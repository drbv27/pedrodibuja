// Single source of truth for every route on the site. The header nav reads
// this array directly (this work unit); `sitemap.ts` and the per-route
// metadata builder (a later work unit) MUST consume this same array so nav,
// sitemap and metadata cannot drift apart from one another.
//
// Slugs are lowercase, hyphenated and accent-free per deck section 2, and
// MUST NOT change once published (it would break search-engine positioning).

export type RouteId =
  | "home"
  | "su-historia"
  | "galeria"
  | "como-dibuja"
  | "apoya"
  | "contacto";

export interface RouteDefinition {
  id: RouteId;
  path: string;
  /** Deck section 2 nav order. Lower renders first (left to right). */
  navOrder: number;
  /** Visible label in the nav and footer. */
  label: string;
  /** True only for the one route rendered as a highlighted CTA, not a plain link. */
  isPrimaryCta: boolean;
}

export const ROUTES: RouteDefinition[] = [
  { id: "home", path: "/", navOrder: 0, label: "Inicio", isPrimaryCta: false },
  {
    id: "su-historia",
    path: "/su-historia",
    navOrder: 1,
    label: "Su historia",
    isPrimaryCta: false,
  },
  {
    id: "galeria",
    path: "/galeria",
    navOrder: 2,
    label: "Galería",
    isPrimaryCta: false,
  },
  {
    id: "como-dibuja",
    path: "/como-dibuja",
    navOrder: 3,
    label: "Cómo dibuja",
    isPrimaryCta: false,
  },
  {
    id: "apoya",
    path: "/apoya",
    navOrder: 4,
    label: "Apoya",
    isPrimaryCta: false,
  },
  {
    id: "contacto",
    path: "/contacto",
    navOrder: 5,
    label: "Contacto",
    isPrimaryCta: true,
  },
];
