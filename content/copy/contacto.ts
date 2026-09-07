// Deck-verbatim Spanish copy for "/contacto" (deck section 4.6), plus the
// contact form's field configuration and the fixed error/success microcopy
// design D7 pins to `ContactState`.
//
// Voice correction (Engram id 510): the closing line names Yamile, hermana
// de Pedro — never Diego. Contact data confirmed per Engram id 511:
// `site.contact.whatsapp` stores E.164 (`+573217915232`) so it can be used
// directly as a `wa.me` link target; only a formatted version is ever
// rendered, never that raw string. `site.contact.instagram` now holds the
// confirmed handle, so its row below renders like `correo`/`whatsapp` —
// present only when the underlying value is set.

import { site } from "@/content/site";

export const HONEYPOT_FIELD = "sitio_web";

export interface ContactFieldCopy {
  label: string;
  placeholder: string;
}

export interface DirectContactRow {
  id: "correo" | "whatsapp" | "ciudad" | "instagram";
  label: string;
  display: string;
  href?: string;
  /**
   * Set only for a row whose `href` leaves this site entirely (a social
   * profile, not `mailto:`/`wa.me`) — the page opens it in a new tab with
   * `rel="noopener noreferrer"`, the same rule `Button`'s `external` prop
   * already enforces elsewhere.
   */
  external?: boolean;
}

export interface ContactCopy {
  encabezado: {
    heading: string;
    bajada: string;
  };
  form: {
    nombre: ContactFieldCopy;
    correo: ContactFieldCopy;
    motivo: { label: string };
    mensaje: ContactFieldCopy;
    submitLabel: string;
  };
  successMessage: string;
  invalidSummary: string;
  directContact: {
    heading: string;
    rows: DirectContactRow[];
    closingLine: string;
  };
}

// Colombia-specific display formatting: 2-digit country code + 10-digit
// local number, grouped 3-3-4. Used only to produce the *visible* text —
// the raw E.164 string must never reach the rendered page.
function formatWhatsAppDisplay(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const countryCode = digits.slice(0, 2);
  const local = digits.slice(2);
  const grouped =
    local.length === 10
      ? `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
      : local;
  return `+${countryCode} ${grouped}`;
}

const cityDisplay = site.city ? `${site.city}, Colombia` : "Colombia";

const directContactRows: Array<DirectContactRow | null> = [
  site.contact.email
    ? {
        id: "correo" as const,
        label: "Correo",
        display: site.contact.email,
        href: `mailto:${site.contact.email}`,
      }
    : null,
  site.contact.whatsapp
    ? {
        id: "whatsapp" as const,
        label: "WhatsApp",
        display: formatWhatsAppDisplay(site.contact.whatsapp),
        href: `https://wa.me/${site.contact.whatsapp.replace(/^\+/, "")}`,
      }
    : null,
  // Ciudad has no "unresolved" state worth hiding a row for — it always
  // renders, via `cityDisplay`'s own sentence-variant fallback.
  { id: "ciudad" as const, label: "Ciudad", display: cityDisplay },
  site.contact.instagram
    ? {
        id: "instagram" as const,
        label: "Instagram",
        display: `@${site.contact.instagram}`,
        href: `https://www.instagram.com/${site.contact.instagram}/`,
        external: true,
      }
    : null,
];

// Fixed error microcopy (spec `contact-messaging`: "Errors never surfaced
// verbatim"). Composed from `site.contact.email` rather than hardcoded, per
// this work unit's instruction — but typed as a template literal type, not
// `string`, so `app/contacto/actions.ts` cannot assign an arbitrary (e.g.
// Resend-provider) string to `ContactState`'s `error.message` field without
// a visible, deliberate type assertion. That is the compile-time
// enforcement design D7 describes: leaking a provider error becomes a type
// error, not a discipline.
export type ContactErrorMessage =
  | `Algo falló al enviar. Escríbenos directo a ${string} y lo resolvemos.`
  | "Algo falló al enviar. Escríbenos directo y lo resolvemos.";

export const CONTACT_ERROR_COPY: ContactErrorMessage = site.contact.email
  ? `Algo falló al enviar. Escríbenos directo a ${site.contact.email} y lo resolvemos.`
  : "Algo falló al enviar. Escríbenos directo y lo resolvemos.";

export const contacto: ContactCopy = {
  encabezado: {
    heading: "Escríbenos",
    bajada:
      "Para encargos, exposiciones, prensa, alianzas o simplemente para dejarle un mensaje a Pedro. Contestamos todo.",
  },
  form: {
    nombre: { label: "Tu nombre", placeholder: "¿Cómo te llamas?" },
    correo: { label: "Tu correo", placeholder: "para poder responderte" },
    motivo: { label: "¿De qué se trata?" },
    mensaje: { label: "Cuéntanos", placeholder: "Escribe con confianza." },
    submitLabel: "Enviar mensaje",
  },
  successMessage:
    "¡Listo! Nos llegó tu mensaje. Te respondemos pronto — y si era para Pedro, se lo mostramos hoy mismo.",
  invalidSummary: "Revisa los campos marcados abajo antes de enviar.",
  directContact: {
    heading: "Contacto directo",
    rows: directContactRows.filter((row): row is DirectContactRow => row !== null),
    closingLine: "Quien responde es Yamile, hermana de Pedro.",
  },
};
