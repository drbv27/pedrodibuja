"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "@/components/chrome/NavLink";
import { Button } from "@/components/ui/Button";
import type { RouteDefinition } from "@/lib/routes";

interface MobileNavProps {
  primaryRoutes: RouteDefinition[];
  ctaRoute: RouteDefinition | undefined;
}

/**
 * The narrow client island for `SiteHeader` (site-shell / accessibility-
 * baseline specs). `SiteHeader` itself stays a server component; only the
 * toggle + disclosure state lives here, wrapped in `md:hidden` so it never
 * renders interactive markup at the breakpoint where the desktop nav
 * (`SiteHeader`'s own `hidden md:flex` block) takes over.
 *
 * This is a disclosure widget, not a modal dialog: no focus trap, Tab can
 * leave it freely at any time. Two behaviors are still required and both
 * are implemented below: Escape closes the menu and returns focus to the
 * toggle button, and activating a link closes the menu. The closed menu is
 * not rendered at all (not merely hidden with CSS), so its links are never
 * in the accessibility tree while collapsed.
 */
export function MobileNav({ primaryRoutes, ctaRoute }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-[var(--tap-target)] min-w-[var(--tap-target)] items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-paper-sunk"
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <nav
          id={menuId}
          aria-label="Principal"
          className="absolute inset-x-0 top-full z-40 border-b border-rule bg-paper shadow-sm"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {primaryRoutes.map((route) => (
              <li key={route.id}>
                <NavLink href={route.path} onClick={closeMenu} className="w-full">
                  {route.label}
                </NavLink>
              </li>
            ))}
            {ctaRoute ? (
              <li className="pt-2">
                <Button href={ctaRoute.path} variant="primary" onClick={closeMenu} className="w-full">
                  {ctaRoute.label}
                </Button>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

/** Three-bar menu glyph / X-close glyph, swapped by `open` — no animation,
 * so there is nothing for `prefers-reduced-motion` to disable here (the
 * toggle button's own hover state already inherits the global reduced-
 * motion reset in `app/globals.css`). */
function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
