// Deck-verbatim Spanish copy for "/" (deck section 4.1), with one explicit
// override: the hero H1 and subtitle follow Diego's in-conversation merge
// decision, which supersedes the deck's un-merged "Directa"/"Poética" draft
// (see spec `marketing-pages: Home H1 is the merged hero decision`).
//
// Stat values that are still unresolved in `content/site.ts` stay `null`
// here too, so `StatGrid` can drop those cards instead of ever rendering a
// visible placeholder (content-source: sentence variants / no sentinel).

import { site } from "@/content/site";

export interface CtaContent {
  label: string;
  href: string;
}

export interface HomeStat {
  id: "drawingCount" | "yearsDrawing" | "carShare";
  value: string | null;
  label: string;
}

export interface HomeCopy {
  hero: {
    /** Diego's merged two-line hero decision — one `<h1>`, two visual lines. */
    headingLines: [string, string];
    subtitle: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
  };
  presentation: {
    heading: string;
    paragraphs: string[];
  };
  stats: HomeStat[];
  featuredGallery: {
    heading: string;
    support: string;
    cta: CtaContent;
  };
  howHeDraws: {
    heading: string;
    paragraphs: string[];
    cta: CtaContent;
  };
  quote: {
    text: string;
    attribution: string;
  };
  whyThisSite: {
    heading: string;
    paragraphs: string[];
  };
  closing: {
    heading: string;
    paragraph: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
  };
}

export const home: HomeCopy = {
  hero: {
    headingLines: ["Pedro no habla.", "Pedro dibuja carros."],
    subtitle:
      "Tiene 37 años, es sordo y usa silla de ruedas. Nada de eso aparece en sus dibujos: ahí solo hay carros, líneas firmes y una paciencia que ya quisiéramos los demás.",
    primaryCta: { label: "Ver sus dibujos", href: "/galeria" },
    secondaryCta: { label: "Conocer su historia", href: "/su-historia" },
  },
  presentation: {
    heading: "Un artista, no una historia triste",
    paragraphs: [
      "Pedro dibuja todos los días. No como pasatiempo, no como terapia: como oficio. Se sienta, elige una hoja, observa un carro —en la calle, en una revista, en su cabeza— y empieza. Puede pasar horas en una sola llanta.",
      "No usa palabras. Usa líneas. Y cuando termina un dibujo y lo levanta para mostrarlo, entiende uno perfectamente lo que está diciendo.",
    ],
  },
  stats: [
    {
      id: "drawingCount",
      value: site.stats.drawingCount !== null ? `${site.stats.drawingCount}+` : null,
      label: "dibujos hechos a mano",
    },
    {
      id: "yearsDrawing",
      value: site.stats.yearsDrawing !== null ? `${site.stats.yearsDrawing}` : null,
      label: "años dibujando",
    },
    {
      id: "carShare",
      value: "100%",
      label: "carros. Es su obsesión y es su firma.",
    },
  ],
  featuredGallery: {
    heading: "Lo último que salió de su lápiz",
    support: "Seis dibujos recientes. Hay muchos más.",
    cta: { label: "Ver la galería completa", href: "/galeria" },
  },
  howHeDraws: {
    heading: "Lápiz, papel y una calma que no se enseña",
    paragraphs: [
      "Empieza por el contorno. Después las ruedas, siempre las ruedas antes que el resto. Luego se va a los detalles: el retrovisor, la parrilla, el reflejo en el vidrio. Sombrea con la punta inclinada del lápiz, en capas, sin apurarse.",
      "Trabaja en grafito cuando quiere volumen y luz, y se pasa al color cuando el carro se lo pide.",
    ],
    cta: { label: "Ver su proceso paso a paso", href: "/como-dibuja" },
  },
  quote: {
    text: "Cuando termina un dibujo, lo levanta y busca tus ojos. Ahí está diciendo: mira lo que hice.",
    attribution: "Yamile, hermana de Pedro",
  },
  whyThisSite: {
    heading: "Por qué hicimos este sitio",
    paragraphs: [
      "Porque la obra de Pedro llevaba años apilada en carpetas, en cajones y en las paredes de la casa. Porque cada vez que alguien la veía, preguntaba lo mismo: ¿y esto quién lo hizo?",
      `Y porque en internet hay muy poco espacio para artistas como él. Cuando se busca "discapacidad" aparecen diagnósticos, campañas y estadísticas. Casi nunca aparece un portafolio.`,
      "Este es un portafolio.",
    ],
  },
  closing: {
    heading: "La mejor forma de apoyarlo es mirarlo",
    paragraph:
      "Compartir un dibujo, escribirle un mensaje, encargarle el retrato de tu carro o simplemente detenerte tres minutos a ver su trabajo. Todo eso llega. Se lo contamos, y lo entiende.",
    primaryCta: { label: "Escríbele a Pedro", href: "/contacto" },
    secondaryCta: { label: "Cómo apoyarlo", href: "/apoya" },
  },
};
