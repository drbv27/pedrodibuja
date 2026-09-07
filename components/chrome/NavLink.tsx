import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  /** Fired on click, in addition to navigation — lets `MobileNav` close the
   * disclosure menu when a link is activated without duplicating this
   * component's classes. */
  onClick?: () => void;
  /** Appended after the base classes, e.g. `MobileNav`'s `w-full` so each
   * menu link's tap target spans the full-width list item. */
  className?: string;
}

export function NavLink({ href, children, onClick, className }: NavLinkProps) {
  const classes = [
    "inline-flex min-h-[var(--tap-target)] items-center px-2 text-sm font-medium text-ink transition-colors duration-150 hover:text-accent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
