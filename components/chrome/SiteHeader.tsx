import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/chrome/NavLink";

/**
 * Renders the deck section 2 nav order straight from the `ROUTES` registry,
 * so the nav and the sitemap (a later work unit) cannot drift apart. Every
 * route renders as a plain link except the one flagged `isPrimaryCta`
 * (Contacto), which renders as a highlighted button instead.
 */
export function SiteHeader() {
  const primaryRoutes = ROUTES.filter((route) => !route.isPrimaryCta);
  const ctaRoute = ROUTES.find((route) => route.isPrimaryCta);

  return (
    <header className="border-b border-rule bg-paper">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink"
        >
          Pedro Dibuja
        </Link>
        <nav aria-label="Principal" className="flex flex-1 items-center justify-end gap-4">
          <ul className="flex flex-wrap items-center gap-2">
            {primaryRoutes.map((route) => (
              <li key={route.id}>
                <NavLink href={route.path}>{route.label}</NavLink>
              </li>
            ))}
          </ul>
          {ctaRoute ? (
            <Button href={ctaRoute.path} variant="primary">
              {ctaRoute.label}
            </Button>
          ) : null}
        </nav>
      </Container>
    </header>
  );
}
