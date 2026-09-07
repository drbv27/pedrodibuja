import Link from "next/link";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[var(--tap-target)] items-center px-2 text-sm font-medium text-ink transition-colors duration-150 hover:text-accent"
    >
      {children}
    </Link>
  );
}
