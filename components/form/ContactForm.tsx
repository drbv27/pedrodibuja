"use client";

import { useActionState, useEffect, useRef } from "react";
import { Field } from "./Field";
import { FormStatus, type FormStatusTone } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { sendContactMessage, type ContactState } from "@/app/contacto/actions";
import { CONTACT_MOTIVOS, CONTACT_MAX_LENGTHS, type ContactField } from "@/lib/validation";
import { contacto, HONEYPOT_FIELD } from "@/content/copy/contacto";
import { reportGenerateLead } from "@/lib/analytics";

const INITIAL_STATE: ContactState = { status: "idle" };

const MOTIVO_OPTIONS = CONTACT_MOTIVOS.map((motivo) => ({ value: motivo, label: motivo }));

/**
 * Progressive-enhancement contact form (design D7, spec `contact-messaging`).
 * `action={formAction}` is a real Server Action endpoint: with JavaScript
 * disabled, the browser performs an ordinary POST and the page re-renders
 * from the returned `ContactState` — no `onSubmit`/`preventDefault`, no
 * client-side gate on submit, every branch below rendered straight from
 * `state`. `useActionState` only adds pending UI and moves focus to the
 * result on the JS-enhanced path.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, INITIAL_STATE);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    // Site's primary conversion (deck slide 10). `state.motivo` is `null`
    // only on the honeypot's spoofed success (`app/contacto/actions.ts`) —
    // that path never reaches GA4 as a real lead.
    if (state.status === "success" && state.motivo !== null) {
      reportGenerateLead(state.motivo);
    }
  }, [state]);

  const fieldErrors: Partial<Record<ContactField, string>> =
    state.status === "invalid" ? state.fieldErrors : {};

  const statusMessage: string | null =
    state.status === "success"
      ? contacto.successMessage
      : state.status === "error"
        ? state.message
        : state.status === "invalid"
          ? contacto.invalidSummary
          : null;

  const statusTone: FormStatusTone =
    state.status === "success"
      ? "success"
      : state.status === "error"
        ? "error"
        : state.status === "invalid"
          ? "invalid"
          : null;

  return (
    <form action={formAction} className="space-y-6">
      <FormStatus ref={statusRef} message={statusMessage} tone={statusTone} />

      {state.status === "success" ? null : (
        <>
          {/* Honeypot: hidden from sighted users and from assistive tech
              alike (design D7 / spec `contact-messaging`). Deliberately no
              timestamp field alongside it — a server-rendered timestamp
              would make this route request-time dynamic and break its
              static prerender. */}
          <div aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor={HONEYPOT_FIELD}>No llenar este campo</label>
            <input
              id={HONEYPOT_FIELD}
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field
            id="nombre"
            name="nombre"
            label={contacto.form.nombre.label}
            placeholder={contacto.form.nombre.placeholder}
            autoComplete="name"
            maxLength={CONTACT_MAX_LENGTHS.nombre}
            required
            error={fieldErrors.nombre}
          />
          <Field
            id="correo"
            name="correo"
            type="email"
            label={contacto.form.correo.label}
            placeholder={contacto.form.correo.placeholder}
            autoComplete="email"
            maxLength={CONTACT_MAX_LENGTHS.correo}
            required
            error={fieldErrors.correo}
          />
          <Field
            as="select"
            id="motivo"
            name="motivo"
            label={contacto.form.motivo.label}
            options={MOTIVO_OPTIONS}
            required
            error={fieldErrors.motivo}
          />
          <Field
            as="textarea"
            id="mensaje"
            name="mensaje"
            label={contacto.form.mensaje.label}
            placeholder={contacto.form.mensaje.placeholder}
            maxLength={CONTACT_MAX_LENGTHS.mensaje}
            required
            error={fieldErrors.mensaje}
          />

          <Button type="submit" variant="primary">
            {isPending ? "Enviando…" : contacto.form.submitLabel}
          </Button>
        </>
      )}
    </form>
  );
}
