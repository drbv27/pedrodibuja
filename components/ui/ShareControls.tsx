"use client";

import { useSyncExternalStore } from "react";

// Deck section 4.5, Bloque 1 — "Compartir la galería". Proposal question 2
// (confirmed): native Web Share API when available, WhatsApp/X/Facebook
// intent-link fallbacks otherwise, no third-party share SDK — a tracker
// would directly contradict the site's own informational-only cookie
// notice. This is the one client leaf on `/apoya`; the rest of the route
// stays a server component so it still prerenders static.

type ShareMethod = "native" | "whatsapp" | "x" | "facebook";

/**
 * WU9 wires the real GA4 event call here. Every share path below — native
 * and all three fallback links — calls this one function first, so adding
 * the analytics call later touches exactly this one place.
 */
function reportShareEvent(method: ShareMethod) {
  // Intentionally empty in this work unit; WU9 wires the real GA4 event
  // call here, keyed on `method`.
  void method;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pedrodibuja.vercel.app";
const GALLERY_URL = `${SITE_URL}/galeria`;
const SHARE_TITLE = "Pedro Dibuja";
const SHARE_TEXT =
  "Mira los dibujos de carros que hace Pedro, a mano, a lápiz y color.";

// Same visual treatment as `Button`'s primary/secondary variants, kept local
// rather than extending that component's props: `Button`'s link branch
// renders `next/link`, which is the wrong tool for an external share-intent
// URL opened in a new tab, and its button branch exposes no click handler.
const NATIVE_BUTTON_CLASSES =
  "inline-flex min-h-[var(--tap-target)] min-w-[var(--tap-target)] items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-paper transition-colors duration-150 hover:bg-ink";
const FALLBACK_LINK_CLASSES =
  "inline-flex min-h-[var(--tap-target)] min-w-[var(--tap-target)] items-center justify-center gap-2 rounded-md border border-ink bg-transparent px-4 text-sm font-medium text-ink transition-colors duration-150 hover:bg-paper-sunk";

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
    reportShareEvent("native");
    try {
      await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: GALLERY_URL });
    } catch {
      // The visitor cancelled the native share sheet, or it failed after
      // already presenting its own UI — no additional fallback is shown.
    }
  }

  if (hasNativeShare) {
    return (
      <button type="button" onClick={handleNativeShare} className={NATIVE_BUTTON_CLASSES}>
        Compartir la galería
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-4" role="group" aria-label="Compartir la galería">
      {FALLBACK_LINKS.map((link) => (
        <a
          key={link.method}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => reportShareEvent(link.method)}
          className={FALLBACK_LINK_CLASSES}
        >
          Compartir por {link.label}
        </a>
      ))}
    </div>
  );
}
