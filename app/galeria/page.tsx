import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/layout/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { galeria } from "@/content/copy/galeria";
import type { ImageSlot } from "@/content/images";
import { artworks } from "@/content/artworks";
import { buildRouteMetadata } from "@/lib/seo";

export const metadata = buildRouteMetadata("galeria");

function hasImage(slot: ImageSlot | null): slot is ImageSlot {
  return slot !== null;
}

// Deck section 4.3 — "Galería" page. Resolved product decision (proposal
// question 3): the empty-state line and the tile grid were built to never
// render either alone — that guard now does double duty. This work unit
// wired six real artworks, so `hasArtworks` is `true`, the empty-state line
// stays out of the DOM (it would no longer read honestly next to real
// work), and the grid renders those six photographs instead of placeholders.
// The guard itself is untouched: a future artwork-free state would still
// show the honest empty-state line.
export default function GaleriaPage() {
  const hasArtworks = artworks.length > 0;
  const gallerySlots = artworks.map((artwork) => artwork.image).filter(hasImage);

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
        <GalleryGrid slots={gallerySlots} className="mt-8" />
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
