import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Container } from "@/components/layout/Container";
import { site } from "@/content/site";

/**
 * Deck section 5 footer. `site.city` and `site.social` are nullable, so
 * both branches read as grammatical Spanish sentences with or without the
 * datum (content-source: sentence variants) instead of ever rendering an
 * empty or half-filled line.
 */
export function SiteFooter() {
  const fullName = `${site.artist.firstName} ${site.artist.lastName}`;
  const currentYear = new Date().getFullYear();
  const madeInLine = site.city
    ? `Sitio hecho por su familia, en ${site.city}, Colombia.`
    : "Sitio hecho por su familia, en Colombia.";

  return (
    <footer className="surface-ink border-t border-rule bg-ink text-paper">
      <Container className="flex flex-col gap-6 py-10">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Pedro Dibuja
          </p>
          <p className="text-paper/80">Carros a lápiz y a color, hechos a mano.</p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {ROUTES.map((route) => (
              <li key={route.id}>
                <Link href={route.path} className="hover:text-accent-bright">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {site.social.length > 0 ? (
          <ul className="flex flex-wrap gap-4 text-sm">
            {site.social.map((link) => (
              <li key={link.platform}>
                <a href={link.url} className="hover:text-accent-bright">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="max-w-prose text-xs text-paper/80">
          Todos los dibujos de este sitio son obra original de {fullName}. Por
          favor no los uses sin permiso: escríbenos y casi seguro te decimos
          que sí.
        </p>

        <p className="text-xs text-paper/70">
          © {currentYear} Pedro Dibuja · {madeInLine}
        </p>
      </Container>
    </footer>
  );
}
