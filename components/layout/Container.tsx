import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared max-width + horizontal padding wrapper. `max-w-content` comes from
 * the `--container-content` token in `app/globals.css` (design D1) — one
 * width value, one place it is declared.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full max-w-content px-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
