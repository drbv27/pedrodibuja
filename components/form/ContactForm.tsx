"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Field } from "./Field";
import { FormStatus, type FormStatusTone } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { sendContactMessage, type ContactState } from "@/app/contacto/actions";
import { CONTACT_MOTIVOS, CONTACT_MAX_LENGTHS, type ContactField } from "@/lib/validation";
import { contacto, HONEYPOT_FIELD } from "@/content/copy/contacto";
import { reportGenerateLead } from "@/lib/analytics";

const INITIAL_STATE: ContactState = { status: "idle" };

const MOTIVO_OPTIONS = CONTACT_MOTIVOS.map((motivo) => ({ value: motivo, label: motivo }));

// Visual/DOM order of the fields — walked in order to find the first
// invalid one after a failed submission (WU13).
const FIELD_ORDER: readonly ContactField[] = ["nombre", "correo", "motivo", "mensaje"];

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

  // `<select>`-only remount key (WU13). Verified against this project's
  // react-dom 19.2.8 (`updateProperties`'s "select" case): an uncontrolled
  // `<select>` only re-applies a changed `defaultValue` prop on mount, or
  // on a same-instance update when its `multiple` prop's truthiness
  // flips — never on a `defaultValue`-only change. `<input>`/`<textarea>`
  // do not have this limitation (`updateInput`/`updateTextarea` apply a
  // changed `defaultValue` unconditionally on every update), which is why
  // only `motivo` needs this fallback and the other three fields rely on
  // `defaultValue` alone.
  //
  // This is React's documented "adjust state during render" pattern
  // (comparing against a previous value captured in `useState`, not a
  // ref — a ref mutated mid-render trips this project's `react-hooks/refs`
  // lint rule and is unsafe under concurrent rendering). Deriving the key
  // during render, rather than inside an effect one render later, is
  // required so the remount lands in the same commit as the action's
  // result — an effect would run only after the native `<form>` reset
  // that same commit already triggered.
  const [previousState, setPreviousState] = useState(state);
  const [motivoRemountKey, setMotivoRemountKey] = useState(0);
  if (previousState !== state) {
    setPreviousState(state);
    setMotivoRemountKey((key) => key + 1);
  }

  useEffect(() => {
    if (state.status === "idle") return;

    if (state.status === "invalid") {
      // Focus the visitor's first mistake, not the summary above it: the
      // summary already exists as a persistent live region, and each
      // field's error text is already tied to it via `aria-describedby`
      // (Field.tsx) — the missing piece was moving focus there (WU13).
      const firstInvalidField = FIELD_ORDER.find((field) => state.fieldErrors[field]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      } else {
        statusRef.current?.focus();
      }
      return;
    }

    if (state.status === "success") {
      // Site's primary conversion (deck slide 10). `state.motivo` is
      // `null` only on the honeypot's spoofed success
      // (`app/contacto/actions.ts`) — that path never reaches GA4 as a
      // real lead. Deliberately no focus move here (WU13): the
      // always-mounted live region already announces success, and
      // stealing focus after a successful send is disorienting.
      if (state.motivo !== null) {
        reportGenerateLead(state.motivo);
      }
      return;
    }

    // "error" — a Resend/env failure with no single field to blame, so the
    // status region remains the right focus target.
    statusRef.current?.focus();
  }, [state]);

  const fieldErrors: Partial<Record<ContactField, string>> =
    state.status === "invalid" ? state.fieldErrors : {};

  // Echoed submission (WU13): populates each field's `defaultValue` so a
  // failed send never discards what the visitor typed. React 19 resets an
  // uncontrolled `<form>` to each field's *current* `defaultValue` after a
  // form action settles (verified against this project's react-dom
  // 19.2.8 — `requestFormReset` marks the form fiber during the action's
  // transition, and the native `HTMLFormElement.reset()` call that
  // follows commit reads whatever `defaultValue` the same commit just
  // wrote). Setting these values here is therefore sufficient on its
  // own — no controlled inputs, no remount `key` needed. Deliberately
  // absent on `success`, where the fields unmount entirely, and the
  // honeypot is never included here (its type is `ContactField`, which
  // excludes it — see `actions.ts`).
  const submittedValues: Partial<Record<ContactField, string>> =
    state.status === "invalid" || state.status === "error" ? state.values : {};

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
            defaultValue={submittedValues.nombre}
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
            defaultValue={submittedValues.correo}
          />
          <Field
            key={motivoRemountKey}
            as="select"
            id="motivo"
            name="motivo"
            label={contacto.form.motivo.label}
            options={MOTIVO_OPTIONS}
            required
            error={fieldErrors.motivo}
            defaultValue={submittedValues.motivo}
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
            defaultValue={submittedValues.mensaje}
          />

          <Button type="submit" variant="primary">
            {isPending ? "Enviando…" : contacto.form.submitLabel}
          </Button>
        </>
      )}
    </form>
  );
}
