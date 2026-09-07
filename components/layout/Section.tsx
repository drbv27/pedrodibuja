import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export type SectionSurface = "paper" | "sunk" | "ink" | "highlight";

interface SectionProps {
  children: ReactNode;
  /**
   * Background/text pairing (design D6). `ink` flips the focus ring to
   * paper via the global `.surface-ink` rule so keyboard focus stays
   * visible on a dark section.
   */
  surface?: SectionSurface;
  className?: string;
  containerClassName?: string;
  as?: ElementType;
}

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  paper: "bg-paper text-ink",
  sunk: "bg-paper-sunk text-ink",
  ink: "surface-ink bg-ink text-paper",
  highlight: "bg-highlight text-ink",
};

/**
 * Full-width section wrapper: owns the surface color pairing and the
 * `--space-section` vertical rhythm, and composes `Container` internally so
 * every page section shares one horizontal measure (design D1/D6). Pages
 * never reach for `Container` directly next to page copy — only `Section`
 * does, so a new surface variant only has to be taught here once.
 */
export function Section({
  children,
  surface = "paper",
  className,
  containerClassName,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      className={[SURFACE_CLASSES[surface], "py-[var(--space-section)]", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
