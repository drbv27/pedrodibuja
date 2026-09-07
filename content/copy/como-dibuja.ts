// Deck-verbatim Spanish copy for "/como-dibuja" (deck section 4.4) — the
// page the deck itself calls the smartest SEO play on the site, and the
// only one that is content-complete without a single photograph.
//
// `content/site.ts`'s `materials.paperType` / `materials.drawingDuration`
// are still unresolved (deck's `[[COMPLETAR: tipo y tamaño habitual]]` and
// `[[COMPLETAR: horas/días]]`, per Engram id 511). Both list items below
// degrade to a natural reading with no visible placeholder while they stay
// `null` (content-source: sentence variants for missing data points).

import { site } from "@/content/site";
import type { InfoListItem } from "@/components/ui/InfoList";
import type { Step } from "@/components/ui/StepList";

export interface CtaContent {
  label: string;
  href: string;
}

export interface ComoDibujaCopy {
  encabezado: {
    heading: string;
    bajada: string;
  };
  materiales: {
    heading: string;
    items: InfoListItem[];
    closingNote: string;
  };
  proceso: {
    heading: string;
    steps: Step[];
  };
  porQueCarros: {
    heading: string;
    paragraphs: string[];
  };
  cierre: {
    heading: string;
    before: string;
    bold: string;
    after: string;
    cta: CtaContent;
  };
}

// Deck: "**Papel blanco** [[COMPLETAR: tipo y tamaño habitual]]." Resolved,
// it reads as a comma-joined descriptor; unresolved, the sentence still
// reads naturally as the bare noun phrase.
const paperText = site.materials.paperType
  ? `, ${site.materials.paperType}.`
  : ".";

// Deck: "**Tiempo.** Mucho. Un dibujo completo puede tomarle
// [[COMPLETAR: horas/días]]." Unresolved, the specific duration drops for a
// still-true, still-complete sentence rather than a visible placeholder.
const drawingTimeText = site.materials.drawingDuration
  ? ` Mucho. Un dibujo completo puede tomarle ${site.materials.drawingDuration}.`
  : " Mucho. Un dibujo completo puede tomarle su tiempo.";

export const comoDibuja: ComoDibujaCopy = {
  encabezado: {
    heading: "Cómo dibuja Pedro un carro",
    bajada:
      "Nadie le enseñó. Aprendió mirando. Este es el método que se inventó solo, paso a paso, por si te sirve para el tuyo.",
  },
  materiales: {
    heading: "Con qué trabaja",
    items: [
      {
        id: "grafito",
        lead: "Lápices de grafito",
        text: " para el volumen, las sombras y los reflejos. Es su técnica base.",
      },
      {
        id: "color",
        lead: "Lápices de color y marcadores",
        text: " cuando el carro le pide color: rojos, azules eléctricos, amarillos de taxi.",
      },
      {
        id: "papel",
        lead: "Papel blanco",
        text: paperText,
      },
      {
        id: "tiempo",
        lead: "Tiempo.",
        text: drawingTimeText,
      },
    ],
    closingNote:
      "Nada sofisticado. El material es simple; lo demás es ojo y paciencia.",
  },
  proceso: {
    heading: "Paso a paso",
    steps: [
      {
        id: "elige-el-carro",
        title: "1. Elige el carro",
        text: "Puede ser uno que vio en la calle, uno de una revista, o uno que armó en su cabeza. Siempre sabe cuál quiere antes de tocar el papel.",
      },
      {
        id: "el-contorno-primero",
        title: "2. El contorno primero",
        text: "Traza la silueta completa con línea suave. Nada de detalles todavía. Si el contorno queda torcido, empieza otra vez: no lo negocia.",
      },
      {
        id: "las-ruedas",
        title: "3. Las ruedas",
        text: "Antes que el resto. Son lo más difícil de un carro —dos elipses que tienen que verse redondas desde un ángulo— y él las resuelve al principio, cuando todavía tiene toda la paciencia.",
      },
      {
        id: "los-detalles",
        title: "4. Los detalles",
        text: "Parrilla, faros, retrovisores, manijas, el reflejo del vidrio. Aquí es donde se va la mayor parte del tiempo y donde el dibujo empieza a parecer un carro de verdad.",
      },
      {
        id: "sombra-y-color",
        title: "5. Sombra y color",
        text: "Sombrea en capas, con el lápiz inclinado, oscureciendo de a poco. Cuando el dibujo va a color, el color entra al final, sobre la base ya construida.",
      },
    ],
  },
  porQueCarros: {
    heading: "Por qué siempre carros",
    paragraphs: [
      "Le preguntamos muchas veces, a nuestra manera. La respuesta siempre fue la misma: se ríe y sigue dibujando carros.",
      "Nuestra teoría: un carro es una máquina llena de líneas, curvas, reflejos y simetrías. Es un reto de dibujo enorme. Y además se mueve, hace ruido que él no oye pero sí siente, y todos los días pasa uno nuevo por la ventana. Es un tema infinito.",
    ],
  },
  cierre: {
    heading: "Si estás aprendiendo a dibujar",
    before:
      "El consejo que daría Pedro si pudiera decirlo en voz alta es el que se ve en su forma de trabajar: ",
    bold: "no borres tanto y no te apures.",
    after: " Dibuja el mismo carro veinte veces. En la veinte va a salir.",
    cta: { label: "Ver sus dibujos", href: "/galeria" },
  },
};
