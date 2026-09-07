// Hand-rolled server-side contact form validation (design D7: no Zod — one
// fewer dependency inside a compressed deadline). This module is the real
// validation boundary; `app/contacto/actions.ts` calls it unconditionally,
// regardless of what the client already checked. Native HTML
// `required`/`type=email`/`maxlength` on the rendered fields stay on as a
// UX affordance only, never as the boundary (spec `contact-messaging`:
// "Server-side validation and honeypot").

export const CONTACT_MOTIVOS = [
  "Un mensaje para Pedro",
  "Encargar un dibujo",
  "Comprar obra",
  "Prensa o entrevista",
  "Exposición o alianza",
  "Otro",
] as const;

export type ContactMotivo = (typeof CONTACT_MOTIVOS)[number];

export type ContactField = "nombre" | "correo" | "motivo" | "mensaje";

export interface ContactInput {
  nombre: string;
  correo: string;
  motivo: string;
  mensaje: string;
}

// Deliberately excludes whitespace so a value that passes this check can
// never carry a CR/LF — the boundary that keeps `replyTo` (design D7 /
// threat matrix) safe from header injection.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_MAX_LENGTHS: Record<ContactField, number> = {
  nombre: 120,
  correo: 254,
  motivo: 40,
  mensaje: 4000,
};

export type ContactValidationResult =
  | { ok: true; value: ContactInput }
  | { ok: false; fieldErrors: Partial<Record<ContactField, string>> };

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

/**
 * Re-validates all four contact fields server-side. Called unconditionally
 * by the Server Action on every submission, whether or not JavaScript ran
 * any client-side check first.
 */
export function validateContact(input: ContactInput): ContactValidationResult {
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  const nombre = input.nombre.trim();
  const correo = input.correo.trim();
  const motivo = input.motivo.trim();
  const mensaje = input.mensaje.trim();

  if (isBlank(nombre)) {
    fieldErrors.nombre = "Escribe tu nombre.";
  } else if (nombre.length > CONTACT_MAX_LENGTHS.nombre) {
    fieldErrors.nombre = `Máximo ${CONTACT_MAX_LENGTHS.nombre} caracteres.`;
  }

  if (isBlank(correo)) {
    fieldErrors.correo = "Escribe tu correo.";
  } else if (!EMAIL_PATTERN.test(correo) || correo.length > CONTACT_MAX_LENGTHS.correo) {
    fieldErrors.correo = "Escribe un correo válido.";
  }

  if (isBlank(motivo)) {
    fieldErrors.motivo = "Elige de qué se trata.";
  } else if (!(CONTACT_MOTIVOS as readonly string[]).includes(motivo)) {
    fieldErrors.motivo = "Elige una opción de la lista.";
  }

  if (isBlank(mensaje)) {
    fieldErrors.mensaje = "Cuéntanos tu mensaje.";
  } else if (mensaje.length > CONTACT_MAX_LENGTHS.mensaje) {
    fieldErrors.mensaje = `Máximo ${CONTACT_MAX_LENGTHS.mensaje} caracteres.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, value: { nombre, correo, motivo, mensaje } };
}
