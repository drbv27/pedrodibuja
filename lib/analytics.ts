// Typed GA4 event dispatch (spec `analytics-and-cookie-notice`, Engram id
// 508 — the professor's slide 10 lists "Eventos / Conversiones" as a metric
// students must interpret; a Google Sites build only gets automatic events,
// so this is the deliberate extra scope that makes a custom-built site show
// something a Google Sites build cannot).
//
// Every helper below is safe to call whether or not GA4 ever mounted:
// `<GoogleAnalytics>` (root layout) renders only when `publicEnv.gaId` is
// set (Engram id 509 — kept unset in local dev on purpose), so
// `window.gtag` may simply not exist. No call here ever throws for that
// reason — each one checks `typeof window.gtag === "function"` first.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

function dispatchEvent(eventName: string, params: EventParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/**
 * Site's primary conversion (deck slide 10 / proposal success criteria).
 * Callers MUST only invoke this on a real contact-form success — never on
 * a validation failure, a Resend delivery error, or the honeypot's spoofed
 * success. `motivo` is the form's own "¿De qué se trata?" selection, so
 * the family can see *why* people write, not just that they did.
 */
export function reportGenerateLead(motivo: string): void {
  dispatchEvent("generate_lead", { motivo });
}

export type ShareMethod = "native" | "whatsapp" | "x" | "facebook";

/**
 * Fired by every path through `ShareControls` — the native Web Share sheet
 * and all three intent-link fallbacks — keyed on which one the visitor
 * used, matching GA4's recommended `share` event shape.
 */
export function reportShare(method: ShareMethod): void {
  dispatchEvent("share", { method, content_type: "gallery", item_id: "galeria" });
}

/**
 * Fired on the home page's primary CTAs so the landing → gallery funnel is
 * visible in GA4 (deck slide 10). `itemId` is a stable identifier for the
 * CTA's position on the page, not its visible label — the label can change
 * without breaking historical event data.
 */
export function reportSelectContent(itemId: string, contentType = "cta"): void {
  dispatchEvent("select_content", { content_type: contentType, item_id: itemId });
}
