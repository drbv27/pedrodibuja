import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InfoList } from "@/components/ui/InfoList";
import { ShareControls } from "@/components/ui/ShareControls";
import { GatedBlock } from "@/components/flags/GatedBlock";
import { apoya } from "@/content/copy/apoya";

// Deck section 4.5 — "Apoya" page. Ships from day one in a soft-launch
// state (deck's own strategic note): Bloques 2-4 and the transparency
// block stay fully authored in source, wrapped in `GatedBlock`, and light
// up together the moment `flags.commerce` flips to `true` with no further
// code change here.
//
// Heading numbers: the deck numbers its blocks 1 through 6. With Bloques
// 2-4 hidden while the flag is off, a visible "1, 2, 6" sequence would look
// broken, so every rendered heading below drops its numeric prefix and
// keeps the deck's heading text.
export default function ApoyaPage() {
  return (
    <>
      {/* Encabezado */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
          {apoya.encabezado.heading}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink-muted">
          {apoya.encabezado.bajada}
        </p>
      </Section>

      {/* Bloque 1a · Mira su obra y compártela */}
      <Section surface="sunk">
        <SectionHeading title={apoya.compartir.heading} />
        <Prose className="mt-6">
          <p>{apoya.compartir.paragraph}</p>
        </Prose>
        <div className="mt-8">
          <ShareControls />
        </div>
      </Section>

      {/* Bloque 1b · Escríbele */}
      <Section surface="paper">
        <SectionHeading title={apoya.escribele.heading} />
        <Prose className="mt-6">
          <p>{apoya.escribele.paragraph}</p>
        </Prose>
        <div className="mt-8">
          <Button href={apoya.escribele.cta.href} variant="primary">
            {apoya.escribele.cta.label}
          </Button>
        </div>
      </Section>

      {/* Bloque 2 · 🔒 Encargos — absent from the DOM while flags.commerce is false */}
      <GatedBlock>
        <Section surface="sunk">
          <SectionHeading title={apoya.encargos.heading} />
          <Prose className="mt-6">
            <p>{apoya.encargos.paragraph}</p>
          </Prose>
          <InfoList items={apoya.encargos.items} className="mt-6" />
          <div className="mt-8">
            <Button href={apoya.encargos.cta.href} variant="primary">
              {apoya.encargos.cta.label}
            </Button>
          </div>
        </Section>
      </GatedBlock>

      {/* Bloque 3 · 🔒 Obra disponible — absent from the DOM while flags.commerce is false */}
      <GatedBlock>
        <Section surface="paper">
          <SectionHeading title={apoya.obraDisponible.heading} />
          <Prose className="mt-6">
            <p>{apoya.obraDisponible.paragraph}</p>
          </Prose>
          <div className="mt-8">
            <Button href={apoya.obraDisponible.cta.href} variant="primary">
              {apoya.obraDisponible.cta.label}
            </Button>
          </div>
        </Section>
      </GatedBlock>

      {/* Bloque 4 · 🔒 Apoyo directo — absent from the DOM while flags.commerce is false */}
      <GatedBlock>
        <Section surface="sunk">
          <SectionHeading title={apoya.apoyoDirecto.heading} />
          <Prose className="mt-6">
            <p>{apoya.apoyoDirecto.paragraph}</p>
          </Prose>
          <div className="mt-8">
            <Button href={apoya.apoyoDirecto.cta.href} variant="primary">
              {apoya.apoyoDirecto.cta.label}
            </Button>
          </div>
        </Section>
      </GatedBlock>

      {/* Bloque 5 · Para prensa, marcas y fundaciones — not gated, useful now */}
      <Section surface="highlight">
        <SectionHeading title={apoya.prensa.heading} />
        <Prose className="mt-6">
          <p>{apoya.prensa.paragraph}</p>
        </Prose>
        <div className="mt-8">
          <Button href={apoya.prensa.cta.href} variant="primary">
            {apoya.prensa.cta.label}
          </Button>
        </div>
      </Section>

      {/*
        Bloque de transparencia — absent from the DOM while flags.commerce
        is false (proposal question 1's resolved decision: gated even
        though the deck itself leaves this block unmarked). Deck-verbatim
        as an <h3>: it follows this route's last <h2> ("Bloque 5") with no
        skipped level, and stays the route's final heading either way.
      */}
      <GatedBlock>
        <Section surface="paper">
          <h3 className="text-xl text-ink">{apoya.transparencia.heading}</h3>
          <Prose className="mt-4">
            <p>{apoya.transparencia.paragraph}</p>
          </Prose>
        </Section>
      </GatedBlock>
    </>
  );
}
