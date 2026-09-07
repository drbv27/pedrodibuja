import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/chrome/NavLink";
import { MobileNav } from "@/components/chrome/MobileNav";

/**
 * Renders the deck section 2 nav order straight from the `ROUTES` registry,
 * so the nav and the sitemap (a later work unit) cannot drift apart. Every
 * route renders as a plain link except the one flagged `isPrimaryCta`
 * (Contacto), which renders as a highlighted button instead.
 *
 * Below `md` (768px) the six items no longer fit one row, so the inline nav
 * (`hidden md:flex`) is replaced by `MobileNav`'s toggle + disclosure menu
 * (`md:hidden`) — exactly one of the two is interactive at any viewport
 * width, and only `MobileNav` itself is a client component; this header and
 * the rest of the route still prerender static. `relative` on `<header>`
 * gives the disclosure panel (`absolute inset-x-0 top-full`) a positioning
 * root without pulling the header itself out of flow. `py-3 md:py-4` keeps
 * the closed mobile header to one compact row — see the 44px toggle/logo
 * tap targets plus this padding, not the desktop nav's own row height.
 */
export function SiteHeader() {
  const primaryRoutes = ROUTES.filter((route) => !route.isPrimaryCta);
  const ctaRoute = ROUTES.find((route) => route.isPrimaryCta);

  return (
    <header className="relative border-b border-rule bg-paper">
      <Container className="flex items-center justify-between gap-6 py-3 md:py-4">
        {/*
         * The home link's only content is the logo image, so its `alt`
         * carries the link's entire accessible name — no stacked
         * visually-hidden label. `min-h-[var(--tap-target)]` keeps the
         * link's own hit area at the site's 44x44px floor even though the
         * visible mark itself renders smaller (`h-9`, capped to keep the
         * header compact at a 360px viewport). Explicit `width`/`height`
         * (the source's own 720x466) reserve the image's box so it causes
         * no layout shift; `priority` because it is above the fold on
         * every route.
         */}
        <Link
          href="/"
          className="inline-flex min-h-[var(--tap-target)] shrink-0 items-center"
        >
          <Image
            src="/pedro-dibuja-logo.png"
            alt="Pedro Dibuja"
            width={720}
            height={466}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav aria-label="Principal" className="hidden flex-1 items-center justify-end gap-4 md:flex">
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
        <MobileNav primaryRoutes={primaryRoutes} ctaRoute={ctaRoute} />
      </Container>
    </header>
  );
}
