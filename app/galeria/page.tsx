import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { galeria } from "@/content/copy/galeria";
import { IMAGE_SLOTS, GALLERY_PLACEHOLDER_IMAGE_IDS } from "@/content/images";
import { artworks } from "@/content/artworks";

// Deck section 4.3 — "Galería" page. Resolved product decision (proposal
// question 3): v1 ships the empty-state line together with the placeholder
// grid, never either alone, and with no filter row (a control that filters
// nothing is worse than no control).
export default function GaleriaPage() {
  // `content/artworks.ts` is empty in v1 (design D3), so this always renders
  // the deck's empty-state lead-in above the twelve-tile placeholder grid.
  const hasArtworks = artworks.length > 0;
  const placeholderSlots = GALLERY_PLACEHOLDER_IMAGE_IDS.map((id) => IMAGE_SLOTS[id]);

  return (
    <>
      {/* Encabezado */}
      <Section surface="paper" className="pt-12 md:pt-20">
        <h1 className="font-[family-name:var(--font-display)] text-display text-ink">
          {galeria.encabezado.heading}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink-muted">
          {galeria.encabezado.bajada}
        </p>
      </Section>

      {/* Estado vacío + cuadrícula de doce placeholders */}
      <Section surface="sunk">
        {!hasArtworks ? (
          <p className="max-w-prose text-ink">{galeria.emptyState}</p>
        ) : null}
        <GalleryGrid slots={placeholderSlots} className="mt-8" />
      </Section>

      {/* Cierre */}
      <Section surface="highlight">
        <SectionHeading title={galeria.cierre.heading} />
        <Prose className="mt-6">
          <p>{galeria.cierre.paragraph}</p>
        </Prose>
        <div className="mt-8">
          <Button href={galeria.cierre.cta.href} variant="primary">
            {galeria.cierre.cta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
