import { forwardRef } from "react";

export type FormStatusTone = "success" | "error" | "invalid" | null;

interface FormStatusProps {
  message: string | null;
  tone: FormStatusTone;
  className?: string;
}

/**
 * Persistent `aria-live="polite"` region, always mounted (design D7) so
 * assistive tech has already registered it before the first submission —
 * a region only added to the DOM after the event it announces is
 * unreliable in several screen readers (accessibility-baseline: "result
 * message must be announced"). `tabIndex={-1}` lets `ContactForm` move
 * focus here on the JS-enhanced path without adding it to the normal tab
 * order.
 */
export const FormStatus = forwardRef<HTMLDivElement, FormStatusProps>(function FormStatus(
  { message, tone, className },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      tabIndex={-1}
      className={[
        "outline-none",
        tone === "error" ? "font-medium text-accent" : "",
        message ? "" : "sr-only",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {message}
    </div>
  );
});
