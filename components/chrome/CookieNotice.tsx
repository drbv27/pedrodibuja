"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { COOKIE_NOTICE } from "@/content/copy/shared";

const STORAGE_KEY = "pedrodibuja:cookie-notice-dismissed";

/**
 * Reads whether the visitor already dismissed the notice. Every branch that
 * cannot confirm "dismissed" — private-browsing storage exceptions, a
 * disabled/quota-exceeded `localStorage`, or a missing key — falls back to
 * "not dismissed" rather than throwing, so the notice degrades to simply
 * showing again instead of ever breaking the page.
 */
function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Dismissal simply does not persist this session; the button still
    // hides the notice for the current page view.
  }
}

function subscribeNever() {
  // Whether the notice was previously dismissed does not change from any
  // external source this component needs to react to during a page's
  // lifetime — the one thing that does change it is the dismiss button
  // below, handled with local state, not this store (same pattern as
  // `ShareControls`' `subscribeNever`).
  return () => {};
}

function getServerSnapshot(): boolean {
  // The server can never know a prior dismissal; it always renders "not
  // dismissed" so hydration starts from a fixed, predictable value.
  return false;
}

function getClientDismissedSnapshot(): boolean {
  return readDismissed();
}

/**
 * Deck section 5's cookie notice (spec `analytics-and-cookie-notice`).
 * Informational, not a consent gate — GA4 already loads unconditionally in
 * the root layout regardless of this component's state (proposal question
 * 2's resolved decision, Engram id 502).
 *
 * - Dismissal persists in `localStorage`, never a cookie.
 * - Keyboard-dismissible for free: the shared `Button` renders a plain
 *   `<button>`, already in the native tab order and activating on
 *   Enter/Space with no custom key handling.
 * - Not a focus trap: no focus management at all, nothing intercepts Tab.
 * - Reuses `Button`'s `primary` variant rather than hand-rolled classes so
 *   its hover state is the same verified-safe `hover:bg-ink` pairing every
 *   other primary button uses (16.09:1) instead of accidentally reaching
 *   for `--color-accent-bright`, which the token table in `app/globals.css`
 *   documents as failing 4.5:1 body text (4.28:1) — this component almost
 *   shipped that exact mistake before the accessibility pass caught it.
 * - `position: fixed` takes the banner out of normal document flow, so
 *   showing or hiding it never shifts any other element's layout — the
 *   page's flowed content occupies the exact same space either way.
 *
 * Visibility is read via `useSyncExternalStore` (the same pattern
 * `ShareControls` uses for `navigator.share` support), not an effect that
 * calls `setState` — the server snapshot is always "not dismissed" (a
 * fixed, predictable hydration start), and the client snapshot resolves to
 * the real `localStorage` value on the client's first paint, with no
 * render-then-effect-then-setState cascade.
 */
export function CookieNotice() {
  const previouslyDismissed = useSyncExternalStore(
    subscribeNever,
    getClientDismissedSnapshot,
    getServerSnapshot,
  );
  const [justDismissed, setJustDismissed] = useState(false);

  if (previouslyDismissed || justDismissed) return null;

  function handleDismiss() {
    writeDismissed();
    setJustDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-ink text-paper"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-prose text-sm text-paper/90">{COOKIE_NOTICE.message}</p>
        <Button type="button" variant="primary" onClick={handleDismiss} className="shrink-0">
          {COOKIE_NOTICE.dismissLabel}
        </Button>
      </div>
    </div>
  );
}
