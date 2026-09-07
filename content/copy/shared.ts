// Copy constants shared across more than one page/component. Anything that
// must read byte-identical everywhere it appears belongs here, not
// duplicated at each call site.

// Deck section 1.5, rule 7 / section 4.2 Bloque 3 "Nota editorial fija":
// since Pedro does not use oral language, any quoted line attributed to him
// must be presented as his family's interpretation. `PullQuote` and
// `/su-historia` Bloque 3 both render this exact string, so it lives once
// here rather than risking two different wordings drifting apart.
export const FAMILY_INTERPRETATION_NOTE =
  "Pedro se comunica con gestos, miradas y dibujos. Las frases que aparecen en este sitio entre comillas son la interpretación de su familia.";
