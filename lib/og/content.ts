// Pure per-route content for the shared OG image renderer. Reuses each
// route's own H1 (from `content/copy/*.ts`) and SEO description
// (`lib/seo.ts` `ROUTE_METADATA`) so a route's shared-link headline and
// subtitle cannot drift from what the page itself already says — with one
// explicit, reported exception: home.
//
// Home's `title` is Diego's poetic hero line, "Pedro no habla. Pedro
// dibuja." — distinct from both the page's own merged H1 ("Pedro no habla.
// Pedro dibuja carros.") and the SEO title string. This is not deck 3.4
// copy; it is the deck's own dedicated section 5 "Textos para compartir
// (Open Graph)" line, which exists only for "/" — spec `social-preview-
// images`: "Home OG image renders the poetic line".

import type { RouteId } from "@/lib/routes";
import { ROUTE_METADATA } from "@/lib/seo";
import { suHistoria } from "@/content/copy/su-historia";
import { galeria } from "@/content/copy/galeria";
import { comoDibuja } from "@/content/copy/como-dibuja";
import { apoya } from "@/content/copy/apoya";
import { contacto } from "@/content/copy/contacto";

export interface OgContent {
  /** Small brand label rendered above the headline on every image. */
  kicker: string;
  /** The large headline — the route's own H1, except home (see above). */
  title: string;
  /** Supporting line — the route's SEO description, except home. */
  subtitle: string;
  /** `alt` export value for the route's `opengraph-image.tsx`. */
  alt: string;
}

const BRAND_KICKER = "Pedro Dibuja";

function altFor(title: string): string {
  return `${BRAND_KICKER} — ${title}`;
}

export const OG_CONTENT: Record<RouteId, OgContent> = {
  home: {
    kicker: BRAND_KICKER,
    title: "Pedro no habla. Pedro dibuja.",
    subtitle: "Tiene 37 años y dibuja carros todos los días. Mira su obra.",
    alt: altFor("Pedro no habla. Pedro dibuja."),
  },
  "su-historia": {
    kicker: BRAND_KICKER,
    title: suHistoria.encabezado.heading,
    subtitle: ROUTE_METADATA["su-historia"].description,
    alt: altFor(suHistoria.encabezado.heading),
  },
  galeria: {
    kicker: BRAND_KICKER,
    title: galeria.encabezado.heading,
    subtitle: ROUTE_METADATA.galeria.description,
    alt: altFor(galeria.encabezado.heading),
  },
  "como-dibuja": {
    kicker: BRAND_KICKER,
    title: comoDibuja.encabezado.heading,
    subtitle: ROUTE_METADATA["como-dibuja"].description,
    alt: altFor(comoDibuja.encabezado.heading),
  },
  apoya: {
    kicker: BRAND_KICKER,
    title: apoya.encabezado.heading,
    subtitle: ROUTE_METADATA.apoya.description,
    alt: altFor(apoya.encabezado.heading),
  },
  contacto: {
    kicker: BRAND_KICKER,
    title: contacto.encabezado.heading,
    subtitle: ROUTE_METADATA.contacto.description,
    alt: altFor(contacto.encabezado.heading),
  },
};
