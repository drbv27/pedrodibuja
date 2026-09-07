import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { InfoList } from "@/components/ui/InfoList";
import { StepList } from "@/components/ui/StepList";
import { comoDibuja } from "@/content/copy/como-dibuja";
import { IMAGE_SLOTS } from "@/content/images";

// Deck section 4.4 — "Cómo dibuja" page. The deck itself calls this the
// smartest SEO play on the site: it is content-complete without a single
// photograph and targets people searching "cómo dibujar carros".
export default function ComoDibujaPage() {
  return (
    <>
      {/* Encabezado */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
              {comoDibuja.encabezado.heading}
            </h1>
            <p className="max-w-prose text-lg text-ink-muted">
              {comoDibuja.encabezado.bajada}
            </p>
          </div>
          <MediaSlot slot={IMAGE_SLOTS["como-dibuja-hands"]} />
        </div>
      </Section>

      {/* Los materiales */}
      <Section surface="sunk">
        <SectionHeading title={comoDibuja.materiales.heading} />
        <InfoList items={comoDibuja.materiales.items} className="mt-6" />
        <p className="mt-6 max-w-prose text-ink-muted">
          {comoDibuja.materiales.closingNote}
        </p>
      </Section>

      {/* El proceso en 5 pasos */}
      <Section surface="paper">
        <SectionHeading title={comoDibuja.proceso.heading} />
        <StepList steps={comoDibuja.proceso.steps} className="mt-8" />
      </Section>

      {/* Por qué carros */}
      <Section surface="sunk">
        <SectionHeading title={comoDibuja.porQueCarros.heading} />
        <Prose className="mt-6">
          {comoDibuja.porQueCarros.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Cierre */}
      <Section surface="highlight">
        <SectionHeading title={comoDibuja.cierre.heading} />
        <Prose className="mt-6">
          <p>
            {comoDibuja.cierre.before}
            <strong>{comoDibuja.cierre.bold}</strong>
            {comoDibuja.cierre.after}
          </p>
        </Prose>
        <div className="mt-8">
          <Button href={comoDibuja.cierre.cta.href} variant="primary">
            {comoDibuja.cierre.cta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
