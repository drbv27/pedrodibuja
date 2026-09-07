// Per-route SEO metadata, built entirely from `ROUTES` + `publicEnv.siteUrl`
// (spec `seo-metadata`, design D7/D4). No absolute URL literal exists
// anywhere else in the app — sitemap, robots, JSON-LD and every OG image's
// implicit `og:image` URL all resolve against this same `publicEnv.siteUrl`.

import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { ROUTES, type RouteId } from "@/lib/routes";

export interface RouteSeo {
  /** Deck section 3.4 — verbatim, ≤ 60 characters. */
  title: string;
  /** Deck section 3.4 — verbatim, ≤ 155 characters. */
  description: string;
}

// Deck section 3.4 "Metadatos por página" — verbatim per-route
// title/description. This table, not `content/copy/*`, is the single
// source both `buildRouteMetadata` and `lib/og/content.ts` read from, so a
// page's SEO copy and its shared-link subtitle can never drift apart.
export const ROUTE_METADATA: Record<RouteId, RouteSeo> = {
  home: {
    title: "Pedro Dibuja | Carros a lápiz y color, hechos a mano",
    description:
      "Pedro es un artista de 37 años que dibuja carros. No oye, no habla y usa silla de ruedas: dibuja. Conoce su obra y su historia.",
  },
  "su-historia": {
    title: "La historia de Pedro | Artista sordo que dibuja carros",
    description:
      "Quién es Pedro: 37 años, sordo, no habla, juega boccia y dibuja carros todos los días. Su historia contada por su hermana.",
  },
  galeria: {
    title: "Galería de dibujos de carros a lápiz y color | Pedro",
    description:
      "Colección de dibujos de carros hechos a mano por Pedro: grafito, color, clásicos y deportivos. Mira la obra completa.",
  },
  "como-dibuja": {
    title: "Cómo dibuja Pedro: técnica, materiales y proceso",
    description:
      "De la hoja en blanco al carro terminado. La técnica de Pedro paso a paso: grafito, color, encuadre y horas de observación.",
  },
  apoya: {
    title: "Apoya a Pedro | Adquiere un dibujo de carro original",
    description:
      "Comparte su obra, encarga un dibujo o apoya sus materiales. Formas concretas de acompañar el trabajo de Pedro.",
  },
  contacto: {
    title: "Contacto | Pedro Dibuja",
    description:
      "Escríbenos para encargos, exposiciones, prensa o simplemente para dejarle un mensaje a Pedro. Respondemos siempre.",
  },
};

const SITE_NAME = "Pedro Dibuja";

// Medellín, Colombia is the site's real, confirmed place (Engram id
// 511) — `es_CO` over the more generic `es_ES`.
const OPEN_GRAPH_LOCALE = "es_CO";

function findRoute(routeId: RouteId) {
  const route = ROUTES.find((candidate) => candidate.id === routeId);
  if (!route) {
    // Cannot happen for a valid `RouteId`, but fails loudly rather than
    // silently building a metadata object with an undefined path.
    throw new Error(`lib/seo.ts: no ROUTES entry for route id "${routeId}"`);
  }
  return route;
}

/**
 * Builds one route's static `Metadata` object: title, description,
 * canonical, `openGraph` and `twitter` — everything the spec
 * `seo-metadata` domain requires, and nothing route-specific hardcoded
 * outside `ROUTE_METADATA`/`ROUTES`. `metadataBase` itself is set once in
 * `app/layout.tsx`, so this only needs to build an absolute canonical URL,
 * not repeat the base.
 */
export function buildRouteMetadata(routeId: RouteId): Metadata {
  const { title, description } = ROUTE_METADATA[routeId];
  const { path } = findRoute(routeId);
  const canonicalUrl = new URL(path, publicEnv.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: OPEN_GRAPH_LOCALE,
      siteName: SITE_NAME,
      url: canonicalUrl,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
