// Placeholder scaffold page for work unit 1 (repo scaffold + design tokens).
// The real home route copy and layout ship in a later work unit; this page
// exists only to prove the token layer renders correctly.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink">
        Pedro Dibuja — scaffold
      </h1>
      <p className="max-w-prose text-ink-muted">
        Design token layer online: paper background, ink text, accent link
        color, and a highlight-filled badge below.
      </p>
      <span className="inline-flex min-h-[2.75rem] items-center rounded-md bg-highlight px-4 text-ink">
        Token check
      </span>
      <a href="#" className="text-accent underline">
        Accent-colored link
      </a>
    </main>
  );
}
