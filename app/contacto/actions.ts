"use server";

import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import { validateContact, type ContactField, type ContactMotivo } from "@/lib/validation";
import { CONTACT_ERROR_COPY, HONEYPOT_FIELD } from "@/content/copy/contacto";

// `ContactState`'s `error` branch carries `typeof CONTACT_ERROR_COPY`
// (design D7), a template-literal type — not `string` — so nothing below
// can assign a raw Resend/provider error string to a visitor-facing state
// without a visible, deliberate type assertion. Type-only export: erased
// before runtime, so it does not violate the "use server" file's
// async-function-only export rule.
//
// `success.motivo` (WU9, spec `analytics-and-cookie-notice`): `null` only
// on the honeypot's spoofed success below, so the GA4 `generate_lead`
// conversion (the site's primary one, deck slide 10) fires on a real
// delivered message only — never on the bot-fooling path, and never on a
// validation failure or a delivery error, both of which are different
// `ContactState` variants entirely.
//
// `ContactSubmittedValues` (WU13) deliberately excludes the honeypot field:
// its shape is exactly `ContactField` (`nombre | correo | motivo |
// mensaje`), so a leaked honeypot value would be a compile error here, not
// a review responsibility. It rides on the `invalid` and `error` branches
// only — never on `success`, where the form intentionally unmounts and
// shows an empty state — so a visitor's typed values survive a failed
// submission without ever widening `ContactState.error.message` away from
// its literal-type guarantee against a leaked provider string.
export type ContactSubmittedValues = Record<ContactField, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; motivo: ContactMotivo | null }
  | {
      status: "invalid";
      fieldErrors: Partial<Record<ContactField, string>>;
      values: ContactSubmittedValues;
    }
  | {
      status: "error";
      message: typeof CONTACT_ERROR_COPY;
      values: ContactSubmittedValues;
    };

const FROM_ADDRESS = "onboarding@resend.dev";

/**
 * Contact form Server Action (design D7, spec `contact-messaging`).
 * Re-validates every field server-side regardless of what the client did,
 * rejects honeypot-filled bot submissions silently, and never lets a
 * Resend error (or a misconfigured environment, the same failure shape to
 * the visitor) reach the UI as raw text — only the deck's fixed fallback
 * copy plus the direct-contact email.
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "");
  if (honeypot.trim().length > 0) {
    // Bot submission (spec scenario): no Resend call, no log — silently
    // drop and report success to the visitor exactly as a real one.
    // `motivo: null` keeps this indistinguishable from a real success to
    // the visitor while still telling the client not to fire the GA4
    // `generate_lead` conversion for it.
    return { status: "success", motivo: null };
  }

  // Raw, untrimmed strings exactly as the visitor typed them. Reused below
  // to echo the submission back on `invalid`/`error` (WU13) so a failed
  // send never discards a visitor's work — `validateContact` does its own
  // trimming internally for the authoritative check.
  const values: ContactSubmittedValues = {
    nombre: String(formData.get("nombre") ?? ""),
    correo: String(formData.get("correo") ?? ""),
    motivo: String(formData.get("motivo") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
  };

  const result = validateContact(values);

  if (!result.ok) {
    return { status: "invalid", fieldErrors: result.fieldErrors, values };
  }

  const apiKey = serverEnv.resendApiKey;
  const to = serverEnv.contactTo;

  if (!apiKey || !to) {
    // A missing env var is the same failure shape to the visitor as a
    // Resend error — never surface which one, or that one is missing.
    console.error(
      "[contacto] RESEND_API_KEY or CONTACT_TO is not configured; message not sent",
    );
    return { status: "error", message: CONTACT_ERROR_COPY, values };
  }

  const { nombre, correo, motivo, mensaje } = result.value;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      // Visitor's address, so replies go straight back to them (deck
      // section 4.6 / design D7). Validated as a plain email pattern with
      // no whitespace in `validateContact`, so this can never carry a
      // header-injection payload.
      replyTo: correo,
      subject: `Nuevo mensaje de ${nombre} — ${motivo}`,
      text: `De: ${nombre} <${correo}>\nMotivo: ${motivo}\n\n${mensaje}`,
    });

    if (error) {
      console.error("[contacto] Resend returned an error", error);
      return { status: "error", message: CONTACT_ERROR_COPY, values };
    }

    return { status: "success", motivo: motivo as ContactMotivo };
  } catch (error) {
    console.error("[contacto] Resend send threw", error);
    return { status: "error", message: CONTACT_ERROR_COPY, values };
  }
}
