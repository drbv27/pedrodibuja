import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaPair } from "@/components/ui/CtaPair";
import { Button } from "@/components/ui/Button";
import { StatGrid } from "@/components/ui/StatGrid";
import { PullQuote } from "@/components/ui/PullQuote";
import { MediaSlot } from "@/components/media/MediaSlot";
import { home } from "@/content/copy/home";
import { IMAGE_SLOTS, HOME_FEATURED_IMAGE_IDS } from "@/content/images";

// Deck section 4.1 — home page. The hero H1 and subtitle are Diego's
// explicit merge decision, not the deck's un-merged draft; every other
// block below is deck-verbatim copy (see `content/copy/home.ts`).
export default function Home() {
  const [headingLine1, headingLine2] = home.hero.headingLines;

  return (
    <>
      {/* Bloque 1 — Héroe */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
              <span className="block">{headingLine1}</span>{" "}
              <span className="block">{headingLine2}</span>
            </h1>
            <p className="max-w-prose text-lg text-ink-muted">
              {home.hero.subtitle}
            </p>
            <CtaPair
              primary={home.hero.primaryCta}
              secondary={home.hero.secondaryCta}
            />
          </div>
          <MediaSlot slot={IMAGE_SLOTS["home-hero"]} />
        </div>
      </Section>

      {/* Bloque 2 — Presentación breve + cifras */}
      <Section surface="sunk">
        <SectionHeading title={home.presentation.heading} />
        <Prose className="mt-6">
          {home.presentation.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <div className="mt-10">
          <StatGrid stats={home.stats} />
        </div>
      </Section>

      {/* Bloque 3 — Galería destacada */}
      <Section surface="paper">
        <SectionHeading
          title={home.featuredGallery.heading}
          support={home.featuredGallery.support}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {HOME_FEATURED_IMAGE_IDS.map((slotId) => (
            <MediaSlot key={slotId} slot={IMAGE_SLOTS[slotId]} />
          ))}
        </div>
        <div className="mt-8">
          <Button href={home.featuredGallery.cta.href} variant="primary">
            {home.featuredGallery.cta.label}
          </Button>
        </div>
      </Section>

      {/* Bloque 4 — Cómo dibuja (teaser) */}
      <Section surface="sunk">
        <SectionHeading title={home.howHeDraws.heading} />
        <Prose className="mt-6">
          {home.howHeDraws.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <div className="mt-8">
          <Button href={home.howHeDraws.cta.href} variant="secondary">
            {home.howHeDraws.cta.label}
          </Button>
        </div>
      </Section>

      {/* Bloque 5 — Cita destacada */}
      <Section surface="ink">
        <PullQuote quote={home.quote.text} attribution={home.quote.attribution} />
      </Section>

      {/* Bloque 6 — Por qué existe esta página */}
      <Section surface="paper">
        <SectionHeading title={home.whyThisSite.heading} />
        <Prose className="mt-6">
          {home.whyThisSite.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Bloque 7 — Cierre y llamada a la acción */}
      <Section surface="highlight">
        <SectionHeading title={home.closing.heading} />
        <Prose className="mt-6">
          <p>{home.closing.paragraph}</p>
        </Prose>
        <div className="mt-8">
          <CtaPair
            primary={home.closing.primaryCta}
            secondary={home.closing.secondaryCta}
          />
        </div>
      </Section>
    </>
  );
}
