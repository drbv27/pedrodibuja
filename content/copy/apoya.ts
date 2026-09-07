// Deck-verbatim Spanish copy for "/apoya" (deck section 4.5).
//
// Resolved product decision (proposal question 1 / design D5): the
// transparency block ships gated behind the same `flags.commerce` as the
// deck's own 🔒 Bloques 2-4, even though the deck itself leaves it
// unmarked — it explains where incoming money goes while v1 offers no way
// to send any, and it still carries an unresolved `[[COMPLETAR]]`.
//
// Numeric heading prefixes ("1.", "2." … "6.") are dropped from every
// rendered heading below. With Bloques 2-4 hidden while `flags.commerce`
// is `false`, the deck's own numbering would read 1, 2, 6 — a visible gap
// that looks broken. The heading *text* stays deck-verbatim; only the
// leading "N. " is stripped.

import { site } from "@/content/site";
import type { InfoListItem } from "@/components/ui/InfoList";

export interface CtaContent {
  label: string;
  href: string;
}

export interface ApoyaCopy {
  encabezado: {
    heading: string;
    bajada: string;
  };
  compartir: {
    heading: string;
    paragraph: string;
  };
  escribele: {
    heading: string;
    paragraph: string;
    cta: CtaContent;
  };
  encargos: {
    heading: string;
    paragraph: string;
    items: InfoListItem[];
    cta: CtaContent;
  };
  obraDisponible: {
    heading: string;
    paragraph: string;
    cta: CtaContent;
  };
  apoyoDirecto: {
    heading: string;
    paragraph: string;
    cta: CtaContent;
  };
  prensa: {
    heading: string;
    paragraph: string;
    cta: CtaContent;
  };
  transparencia: {
    heading: string;
    paragraph: string;
  };
}

// Deck: "Tamaño `[[COMPLETAR]]`." / "Tiempo de entrega aproximado:
// `[[COMPLETAR]]`." / "Valor: `[[COMPLETAR]]`." / "Envíos a
// `[[COMPLETAR: cobertura]]`." All four degrade to a still-true, still
// natural sentence while unresolved — this block never reaches the DOM in
// v1 regardless (gated), but the source itself carries no bracket sentinel.
const commissionSizeText = site.commerce.commissionSize
  ? `Tamaño: ${site.commerce.commissionSize}.`
  : "Tamaño: a definir contigo.";
const commissionLeadTimeText = site.commerce.commissionLeadTime
  ? `Tiempo de entrega aproximado: ${site.commerce.commissionLeadTime}.`
  : "Tiempo de entrega: a coordinar contigo.";
const commissionPriceText = site.commerce.commissionPrice
  ? `Valor: ${site.commerce.commissionPrice}.`
  : "Valor: a definir contigo.";
const commissionShippingText = site.commerce.commissionShipping
  ? `Envíos a ${site.commerce.commissionShipping}.`
  : "Envíos: a coordinar contigo.";

// Deck: "Apoyar" → `[[COMPLETAR: enlace de pago]]`. Degrades to `/contacto`
// so the CTA stays a working link if the flag ever flips before a payment
// link exists.
const supportCtaHref = site.commerce.supportPaymentLink ?? "/contacto";

// Deck: "Todo lo que se recibe por la obra de Pedro se destina a
// `[[COMPLETAR: materiales, participación en boccia, transporte, etc.]]`."
const transparencyParagraph = site.commerce.transparencyUse
  ? `Todo lo que se recibe por la obra de Pedro se destina a ${site.commerce.transparencyUse}. Si quieres saber el detalle, pregúntanos: lo contamos sin problema.`
  : "Todo lo que se recibe por la obra de Pedro se destina a sus materiales y a su trabajo. Si quieres saber el detalle, pregúntanos: lo contamos sin problema.";

export const apoya: ApoyaCopy = {
  encabezado: {
    heading: "Cómo acompañar el trabajo de Pedro",
    bajada:
      "No pedimos lástima. Pedimos atención, que es una cosa muy distinta y muy escasa.",
  },
  compartir: {
    heading: "Mira su obra y compártela",
    paragraph:
      "Suena poco. No lo es. Cada persona que comparte un dibujo de Pedro amplía el círculo de gente que sabe que existe un artista aquí. Así es como llega una invitación a exponer, un encargo o una entrevista.",
  },
  escribele: {
    heading: "Escríbele",
    paragraph:
      "Los mensajes se los leemos y se los mostramos. Se ríe, señala la pantalla, se emociona. Es de las cosas que más le gustan.",
    cta: { label: "Dejar un mensaje", href: "/contacto" },
  },
  // Gated behind `flags.commerce` (design D6 `GatedBlock`).
  encargos: {
    heading: "Encárgale el retrato de tu carro",
    paragraph:
      "Pedro puede dibujar tu carro. El tuyo, el de tu papá, el que tuviste a los veinte años y vendiste con dolor. Nos mandas dos o tres fotos y él trabaja a partir de ahí.",
    items: [
      { id: "tecnica", text: "Grafito o color, tú eliges." },
      { id: "tamano", text: commissionSizeText },
      { id: "tiempo", text: commissionLeadTimeText },
      { id: "valor", text: commissionPriceText },
      { id: "envios", text: commissionShippingText },
    ],
    cta: { label: "Quiero encargar un dibujo", href: "/contacto" },
  },
  // Gated behind `flags.commerce`.
  obraDisponible: {
    heading: "Adquiere un original",
    paragraph:
      "Varios dibujos de la galería están disponibles. Son originales, hechos a mano, únicos y firmados. Al comprarlos, el dinero va directo a los materiales de Pedro y a su trabajo.",
    cta: { label: "Ver obra disponible", href: "/galeria" },
  },
  // Gated behind `flags.commerce`.
  apoyoDirecto: {
    heading: "Aporta a sus materiales",
    paragraph:
      "Lápices, papel, colores, marcadores. Un aporte pequeño le da semanas de trabajo. Si prefieres regalar materiales en vez de dinero, también: escríbenos y te decimos exactamente qué necesita.",
    cta: { label: "Apoyar", href: supportCtaHref },
  },
  prensa: {
    heading: "¿Eres medio, marca, galería o fundación?",
    paragraph:
      "Nos interesa muchísimo hablar contigo. Pedro tiene obra suficiente para una exposición, y su historia se cuenta sola. Tenemos fotografías en alta resolución, obra digitalizada y toda la disposición del mundo.",
    cta: { label: "Escríbenos", href: "/contacto" },
  },
  // Gated behind `flags.commerce` (proposal question 1's resolved decision —
  // this block is unflagged in the deck itself, but ships gated anyway).
  transparencia: {
    heading: "En qué se usa lo que llega",
    paragraph: transparencyParagraph,
  },
};
