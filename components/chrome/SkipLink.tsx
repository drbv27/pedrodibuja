/**
 * First focusable element on every route (site-shell requirement). Hidden
 * off-screen until it receives keyboard focus, then it becomes visible with
 * the standard ink focus ring.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Saltar al contenido
    </a>
  );
}
