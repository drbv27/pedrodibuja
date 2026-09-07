import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/media/MediaSlot";
import { suHistoria } from "@/content/copy/su-historia";
import { IMAGE_SLOTS } from "@/content/images";
import { FAMILY_INTERPRETATION_NOTE } from "@/content/copy/shared";

// Deck section 4.2 — "Su historia" page. Narrated in the first person by
// Yamile, Pedro's sister (Engram id 510): Diego builds and maintains the
// site but is not its editorial voice, so every "mi hermano"/"mi mamá" in
// `content/copy/su-historia.ts` is literally true as written.
export default function SuHistoriaPage() {
  return (
    <>
      {/* Bloque 1 — Encabezado */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
              {suHistoria.encabezado.heading}
            </h1>
            <p className="max-w-prose text-lg text-ink-muted">
              {suHistoria.encabezado.bajada}
            </p>
          </div>
          <MediaSlot slot={IMAGE_SLOTS["historia-portrait"]} />
        </div>
      </Section>

      {/* Bloque 2 — El principio */}
      <Section surface="sunk">
        <SectionHeading title={suHistoria.principio.heading} />
        <Prose className="mt-6">
          {suHistoria.principio.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Bloque 3 — Cómo se comunica */}
      <Section surface="paper">
        <SectionHeading title={suHistoria.comoSeComunica.heading} />
        <Prose className="mt-6">
          {suHistoria.comoSeComunica.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        {/* Deck 4.2 "Nota editorial fija" — site copy, not an editorial
            aside; renders in small type below the block it governs. */}
        <p className="mt-6 max-w-prose text-xs text-ink-muted">
          {FAMILY_INTERPRETATION_NOTE}
        </p>
      </Section>

      {/* Bloque 4 — La boccia */}
      <Section surface="sunk">
        <SectionHeading title={suHistoria.boccia.heading} />
        <Prose className="mt-6">
          {suHistoria.boccia.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <MediaSlot slot={IMAGE_SLOTS["historia-boccia"]} className="mt-8 max-w-2xl" />
      </Section>

      {/* Bloque 5 — Quién es cuando no dibuja */}
      <Section surface="paper">
        <SectionHeading title={suHistoria.quienEsCuandoNoDibuja.heading} />
        <Prose className="mt-6">
          {suHistoria.quienEsCuandoNoDibuja.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Bloque 6 — Cierre */}
      <Section surface="highlight">
        <SectionHeading title={suHistoria.cierre.heading} />
        <Prose className="mt-6">
          {suHistoria.cierre.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <div className="mt-8">
          <Button href={suHistoria.cierre.cta.href} variant="primary">
            {suHistoria.cierre.cta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
