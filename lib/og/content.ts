// Pure per-route content for the shared OG image renderer (WU10 layout,
// Engram id 514: logo centred, one supporting line below it, safe zone).
//
// Every route reuses its own H1 (`content/copy/*.ts`) as the supporting
// line below the logo, so a shared inner-page image cannot drift from
// what the page itself already says — with one explicit, reported
// exception: home. Home's supporting line is the deck's own dedicated
// section 5 "Textos para compartir (Open Graph)" line, distinct from both
// the page's merged H1 and the SEO description, and its `alt` keeps
// referencing Diego's poetic hero line ("Pedro no habla. Pedro dibuja."),
// unchanged from the pre-WU10 renderer.

import type { RouteId } from "@/lib/routes";
import { suHistoria } from "@/content/copy/su-historia";
import { galeria } from "@/content/copy/galeria";
import { comoDibuja } from "@/content/copy/como-dibuja";
import { apoya } from "@/content/copy/apoya";
import { contacto } from "@/content/copy/contacto";

export interface OgContent {
  /** Supporting line rendered below the logo. Home's dedicated deck line;
   * every other route's own H1 heading. */
  supportingLine: string;
  /** `"home"` renders the larger logo with the line in the body font
   * (Inter), muted ink. `"inner"` renders a smaller logo — to leave room
   * for a longer headline — with the line in the display font (Bricolage
   * Grotesque), full ink, so it still reads as a heading. */
  variant: "home" | "inner";
  /** `alt` export value for the route's `opengraph-image.tsx`. */
  alt: string;
}

const BRAND_KICKER = "Pedro Dibuja";
const HOME_HERO_LINE = "Pedro no habla. Pedro dibuja.";

function altFor(headline: string): string {
  return `${BRAND_KICKER} — ${headline}`;
}

export const OG_CONTENT: Record<RouteId, OgContent> = {
  home: {
    supportingLine: "Tiene 37 años y dibuja carros todos los días.",
    variant: "home",
    alt: altFor(HOME_HERO_LINE),
  },
  "su-historia": {
    supportingLine: suHistoria.encabezado.heading,
    variant: "inner",
    alt: altFor(suHistoria.encabezado.heading),
  },
  galeria: {
    supportingLine: galeria.encabezado.heading,
    variant: "inner",
    alt: altFor(galeria.encabezado.heading),
  },
  "como-dibuja": {
    supportingLine: comoDibuja.encabezado.heading,
    variant: "inner",
    alt: altFor(comoDibuja.encabezado.heading),
  },
  apoya: {
    supportingLine: apoya.encabezado.heading,
    variant: "inner",
    alt: altFor(apoya.encabezado.heading),
  },
  contacto: {
    supportingLine: contacto.encabezado.heading,
    variant: "inner",
    alt: altFor(contacto.encabezado.heading),
  },
};
