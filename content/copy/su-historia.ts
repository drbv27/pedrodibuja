// Deck-verbatim Spanish copy for "/su-historia" (deck section 4.2).
//
// Voice: this page is narrated in the first person by Yamile, Pedro's
// sister — not by Diego, who builds the site but is not its editorial
// voice (Engram id 510). Every "mi hermano" / "mi mamá" below is therefore
// literally true as written and needed no rewriting, only the correct
// attribution elsewhere on the site (home pull quote, /contacto, footer).
//
// The deck's own 📝 "Para Diego" editorial notes and its ⚠️ aside about the
// "mi mamá" wording are instructions to Diego, not site copy — they are
// deliberately not transcribed here. Bloque 5's `[[COMPLETAR: nombres]]`
// stays unresolved via `site.family.tenderNames`, degrading to a natural
// sentence without it (content-source: sentence variants for missing data).

import { site } from "@/content/site";

export interface CtaContent {
  label: string;
  href: string;
}

export interface SuHistoriaCopy {
  encabezado: {
    heading: string;
    bajada: string;
  };
  principio: {
    heading: string;
    paragraphs: string[];
  };
  comoSeComunica: {
    heading: string;
    paragraphs: string[];
  };
  boccia: {
    heading: string;
    paragraphs: string[];
  };
  quienEsCuandoNoDibuja: {
    heading: string;
    paragraphs: string[];
  };
  cierre: {
    heading: string;
    paragraphs: string[];
    cta: CtaContent;
  };
}

/** "Ana", "Ana y Luis", "Ana, Luis y María" — natural Spanish list joining. */
function formatNameList(names: string[]): string {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} y ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

// Deck: "Es tierno con la familia, especialmente con [[COMPLETAR: nombres]]."
// Unresolved for now, so the middle clause drops entirely rather than ever
// rendering the sentinel — the sentence still reads naturally without it.
const tenderClause =
  site.family.tenderNames && site.family.tenderNames.length > 0
    ? `Es tierno con la familia, especialmente con ${formatNameList(site.family.tenderNames)}.`
    : "Es tierno con la familia.";

export const suHistoria: SuHistoriaCopy = {
  encabezado: {
    heading: "Quién es Pedro",
    bajada:
      "Mi hermano tiene 37 años, es sordo, no usa lenguaje oral y se mueve en silla de ruedas. También es la persona más alegre de esta casa y el mejor dibujante que conozco. Las dos cosas son ciertas al mismo tiempo, y esa es toda la historia.",
  },
  principio: {
    heading: "Todo empezó con un cuaderno y un lápiz",
    paragraphs: [
      "Mi mamá es maestra. Eso explica casi todo lo que vino después.",
      "En esta casa siempre hubo cuadernos, hojas sueltas y lápices al alcance de la mano. Y fue ella la que un día se sentó al lado de Pedro y le puso uno enfrente. No como terapia ni como ejercicio: como quien le enseña a un hijo a rayar una hoja, que es como empiezan todos.",
      "Pedro rayó. Después rayó mejor. Y después, un día que nadie tiene marcado en el calendario, dejó de rayar y empezó a dibujar. Las proporciones estaban bien. Las ruedas eran redondas de verdad. Y ya no quería que le ayudaran.",
    ],
  },
  comoSeComunica: {
    heading: "No habla. Se hace entender perfectamente.",
    paragraphs: [
      "Pedro se comunica con gestos, con la mirada, con la risa y, sobre todo, con sus dibujos. Cuando quiere algo, lo señala. Cuando algo le gusta, se le nota en toda la cara. Cuando algo no le gusta, también.",
      "Con el tiempo entendimos que dibujar no era solo su talento: era su conversación. Un dibujo terminado es una frase completa. Y cuando dibuja el carro de alguien de la familia, eso es un regalo, es un chiste y es un abrazo, todo junto.",
    ],
  },
  boccia: {
    heading: "Diez años lanzando bolas en el INDER",
    paragraphs: [
      "Pedro juega boccia hace unos diez años. Entrena en el INDER, en Medellín, y va siempre con nuestra mamá: ella ha sido su compañía fiel en esto, como en todo lo demás.",
      "La boccia es un deporte de precisión: se lanzan bolas de cuero buscando quedar lo más cerca posible de una bola blanca. Suena simple. No lo es. Exige cálculo, pulso y una cabeza fría.",
      "A Pedro se le da bien por la misma razón por la que dibuja bien: mide, observa, corrige y vuelve a intentar. Diez años haciendo eso, semana tras semana. Cuando lo veo en la cancha calculando un lanzamiento, le veo puesta la misma cara que pone frente a una hoja en blanco.",
    ],
  },
  quienEsCuandoNoDibuja: {
    heading: "Alegre, mamador de gallo, terco",
    paragraphs: [
      `Es simpático con todo el mundo y lo sabe. ${tenderClause} Es inteligente de una manera que sorprende a quien lo trata poco: entiende las conversaciones, capta las bromas y se ríe antes que los demás.`,
      "Y es terco. Si está dibujando, está dibujando. No se le interrumpe.",
    ],
  },
  cierre: {
    heading: "Lo que quisiéramos que pasara",
    paragraphs: [
      "Que alguien vea uno de sus dibujos y le escriba. Que una galería lo llame. Que un taller de carros le pida una serie. Que otra familia con un hijo como Pedro vea esta página y piense: entonces sí se puede.",
      "Y sobre todo, que Pedro siga dibujando, que es lo que quiere hacer.",
    ],
    cta: { label: "Ver sus dibujos", href: "/galeria" },
  },
};
