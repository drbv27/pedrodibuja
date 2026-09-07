import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
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
  const { variant = "primary", className, children } = props;
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(" ");

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
