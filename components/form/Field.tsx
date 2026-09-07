export interface FieldOption {
  value: string;
  label: string;
}

interface FieldCommonProps {
  id: string;
  name: string;
  label: string;
  /** Rendered as visible "(obligatorio)" text, never only an asterisk
   * (accessibility-baseline: "required fields marked in text"). */
  required?: boolean;
  error?: string;
  className?: string;
}

interface FieldAsInput extends FieldCommonProps {
  as?: "input";
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  defaultValue?: string;
}

interface FieldAsTextarea extends FieldCommonProps {
  as: "textarea";
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  defaultValue?: string;
}

interface FieldAsSelect extends FieldCommonProps {
  as: "select";
  options: FieldOption[];
  defaultValue?: string;
}

export type FieldProps = FieldAsInput | FieldAsTextarea | FieldAsSelect;

const CONTROL_CLASSES =
  "mt-2 block w-full min-h-[var(--tap-target)] rounded-md border bg-paper px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none";

/**
 * Discriminated `input | textarea | select` form control (design D6). Every
 * instance carries a real `<label for>` association, and an error is
 * always described in text (never only by the border color change) and
 * wired through `aria-invalid`/`aria-describedby` (accessibility-baseline
 * "Form label association").
 */
export function Field(props: FieldProps) {
  const { id, name, label, required, error, className } = props;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const controlClasses = [CONTROL_CLASSES, error ? "border-accent" : "border-rule"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-ink-muted"> (obligatorio)</span> : null}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={props.placeholder}
          rows={props.rows ?? 5}
          maxLength={props.maxLength}
          defaultValue={props.defaultValue}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          name={name}
          defaultValue={props.defaultValue ?? ""}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses}
        >
          <option value="" disabled>
            Elige una opción
          </option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          maxLength={props.maxLength}
          defaultValue={props.defaultValue}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses}
        />
      )}

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
