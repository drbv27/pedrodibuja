"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { reportShare, type ShareMethod } from "@/lib/analytics";

// Deck section 4.5, Bloque 1 — "Compartir la galería". Proposal question 2
// (confirmed): native Web Share API when available, WhatsApp/X/Facebook
// intent-link fallbacks otherwise, no third-party share SDK — a tracker
// would directly contradict the site's own informational-only cookie
// notice. This is the one client leaf on `/apoya`; the rest of the route
// stays a server component so it still prerenders static.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pedrodibuja.vercel.app";
const GALLERY_URL = `${SITE_URL}/galeria`;
const SHARE_TITLE = "Pedro Dibuja";
const SHARE_TEXT =
  "Mira los dibujos de carros que hace Pedro, a mano, a lápiz y color.";

// These controls used to carry their own copies of `Button`'s primary and
// secondary classes. That duplication is gone: this file now owns no styling
// decision at all, so contrast, focus ring and the 44px target come from one
// place. It had two stated reasons, and neither survives — `Button` grew an
// `external` prop for destinations this app does not own, and its button
// branch grew an `onClick`. Duplicating those classes had already cost this
// project one real contrast bug elsewhere (a hover state measured at 4.28:1
// against a 4.5:1 floor), which is why the copies are not worth keeping.

const FALLBACK_LINKS: Array<{
  method: Extract<ShareMethod, "whatsapp" | "x" | "facebook">;
  label: string;
  href: string;
}> = [
  {
    method: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${GALLERY_URL}`)}`,
  },
  {
    method: "x",
    label: "X",
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(GALLERY_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
  },
  {
    method: "facebook",
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(GALLERY_URL)}`,
  },
];

function subscribeNever() {
  // The Web Share API's availability does not change during a page's
  // lifetime, so there is nothing to subscribe to — this store only needs
  // to report a different value for the server vs. the client snapshot.
  return () => {};
}

function getNativeShareSnapshot() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

function getServerNativeShareSnapshot() {
  return false;
}

export function ShareControls() {
  // `useSyncExternalStore` reads the real client-side value without a
  // render-then-effect-then-setState cascade: the server snapshot is
  // always `false` (`navigator` does not exist server-side), so hydration
  // never mismatches, and the client snapshot resolves to the real
  // support check on the client's first render.
  const hasNativeShare = useSyncExternalStore(
    subscribeNever,
    getNativeShareSnapshot,
    getServerNativeShareSnapshot,
  );

  async function handleNativeShare() {
    reportShare("native");
    try {
      await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: GALLERY_URL });
    } catch {
      // The visitor cancelled the native share sheet, or it failed after
      // already presenting its own UI — no additional fallback is shown.
    }
  }

  if (hasNativeShare) {
    return (
      <Button type="button" onClick={handleNativeShare}>
        Compartir la galería
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-4" role="group" aria-label="Compartir la galería">
      {FALLBACK_LINKS.map((link) => (
        <Button
          key={link.method}
          href={link.href}
          external
          variant="secondary"
          onClick={() => reportShare(link.method)}
        >
          Compartir por {link.label}
        </Button>
      ))}
    </div>
  );
}
