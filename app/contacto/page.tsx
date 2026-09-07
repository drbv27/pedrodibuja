import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { ContactForm } from "@/components/form/ContactForm";
import { contacto } from "@/content/copy/contacto";
import { buildRouteMetadata } from "@/lib/seo";

export const metadata = buildRouteMetadata("contacto");

// Deck section 4.6 — "Contacto" page. The deck itself defines only one page
// heading (the H1); "Contacto directo" adds one `<h2>` beyond the deck's
// own markup — a small, deliberate addition for screen-reader landmark
// navigation on the release's strictest-accessibility-bar page, and still a
// valid H1 -> H2 hierarchy with no skipped level.
export default function ContactoPage() {
  return (
    <>
      {/* Encabezado */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
          {contacto.encabezado.heading}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink-muted">
          {contacto.encabezado.bajada}
        </p>
      </Section>

      {/* Formulario */}
      <Section surface="sunk">
        <ContactForm />
      </Section>

      {/* Contacto directo — siempre visible */}
      <Section surface="paper">
        <h2 className="text-2xl text-ink">{contacto.directContact.heading}</h2>
        <dl className="mt-6 space-y-3">
          {contacto.directContact.rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-1 sm:flex-row sm:gap-2">
              <dt className="font-medium text-ink">{row.label}:</dt>
              <dd>
                {row.href ? (
                  <a href={row.href} className="text-accent underline hover:text-ink">
                    {row.display}
                  </a>
                ) : (
                  row.display
                )}
              </dd>
            </div>
          ))}
        </dl>
        <Prose className="mt-6">
          <p>{contacto.directContact.closingLine}</p>
        </Prose>
      </Section>
    </>
  );
}
