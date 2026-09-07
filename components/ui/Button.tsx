"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { reportSelectContent } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface SelectContentTracking {
  /** GA4 `select_content` `item_id` — a stable identifier for this CTA's
   * position on the page, never its visible label (spec
   * `analytics-and-cookie-notice`, deck slide 10). */
  itemId: string;
  contentType?: string;
}

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /**
   * Optional GA4 `select_content` event, fired on click/activation before
   * navigation. Deliberately data-only, never a function prop: the actual
   * `window.gtag` call lives inside this file, which is why `Button` is a
   * client component — the same reason `ShareControls` and `ContactForm`
   * already are one.
   */
  trackSelectContent?: SelectContentTracking;
  /**
   * Plain click handler, independent of `trackSelectContent`. Both a
   * caller-supplied `onClick` and the analytics tracker (when present) run
   * on the same click — this is what lets `CookieNotice` reuse this
   * component for its "Entendido" action instead of hand-rolling its own
   * button classes (and its own contrast decisions).
   */
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-paper hover:bg-ink",
  secondary: "border border-ink bg-transparent text-ink hover:bg-paper-sunk",
  ghost: "text-ink hover:bg-paper-sunk",
};

// Minimum 44x44 hit area (accessibility-baseline: touch target), regardless
// of variant or whether this renders as a link or a native button.
const BASE_CLASSES =
  "inline-flex min-h-[var(--tap-target)] min-w-[var(--tap-target)] items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-150";

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, trackSelectContent, onClick } = props;
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(" ");

  const handleClick =
    trackSelectContent || onClick
      ? () => {
          if (trackSelectContent) {
            reportSelectContent(trackSelectContent.itemId, trackSelectContent.contentType);
          }
          onClick?.();
        }
      : undefined;

  if (props.href) {
    return (
      <Link href={props.href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes} onClick={handleClick}>
      {children}
    </button>
  );
}
