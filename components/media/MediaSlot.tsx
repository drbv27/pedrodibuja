import Image from "next/image";
import type { ImageSlot } from "@/content/images";

interface MediaSlotProps {
  slot: ImageSlot;
  className?: string;
}

/**
 * One component, never two (design D2). Callers never branch between a
 * placeholder and a real image: `MediaSlot` owns the `<figure>` and the
 * aspect-ratio box, and only the box's interior swaps once `slot.src` is
 * set. Because the box is always the same element at the same declared
 * ratio, and the `<figcaption>` always sits outside it, both states render
 * at an identical height — swapping in a real photo later causes zero
 * layout shift.
 */
export function MediaSlot({ slot, className }: MediaSlotProps) {
  const hasImage = slot.src !== null;

  return (
    <figure className={className}>
      {/*
       * Inline `aspectRatio` because Tailwind v4 cannot generate a class
       * from a runtime value. The box carries no information of its own
       * (the caption below already describes it in the accessibility
       * tree), so it stays `aria-hidden` until a real photo lands — at
       * which point the `<Image>`'s own `alt` takes over and the box must
       * no longer be hidden from assistive tech.
       */}
      <div
        className="relative overflow-hidden rounded-md border border-ink-muted bg-paper-sunk"
        style={{ aspectRatio: slot.ratio }}
        aria-hidden={hasImage ? undefined : "true"}
      >
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={slot.priority}
            loading={slot.priority ? undefined : "lazy"}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <span className="inline-flex items-center rounded-sm bg-highlight px-2 py-1 text-2xs font-medium text-ink">
              Tip {slot.tip}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-xs text-ink">{slot.caption}</figcaption>
    </figure>
  );
}
