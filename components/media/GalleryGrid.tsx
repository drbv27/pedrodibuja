import { MediaSlot } from "./MediaSlot";
import type { ImageSlot } from "@/content/images";

interface GalleryGridProps {
  slots: ImageSlot[];
  className?: string;
}

/**
 * Responsive tile grid where every tile shares one uniform aspect ratio
 * (design D8 / deck tip 9: a gallery grid only looks professional when
 * every tile shares the same ratio). Each tile is a `MediaSlot`, so its
 * height is a pure function of column width — no fixed heights, no JS, and
 * the grid reflows at any viewport while keeping that ratio.
 */
export function GalleryGrid({ slots, className }: GalleryGridProps) {
  return (
    <div
      className={["grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      {slots.map((slot) => (
        <MediaSlot key={slot.id} slot={slot} />
      ))}
    </div>
  );
}
