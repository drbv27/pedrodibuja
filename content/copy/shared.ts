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

// Deck section 5, "Banner de aviso de cookies". Proposal question 2's
// resolved decision (Engram id 502): informational, not a consent gate —
// this notice acknowledges, it does not ask permission, so `CookieNotice`
// never gates `<GoogleAnalytics>` in the root layout.
export const COOKIE_NOTICE = {
  message:
    "Usamos cookies solo para saber cuánta gente está viendo la obra de Pedro. Nada más.",
  dismissLabel: "Entendido",
};
