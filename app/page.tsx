// Minimal placeholder home content. The layout shell (skip link, header,
// footer) now owns `<main>`, so this route only needs to render valid
// content inside it. The real home page copy and layout ship in a later
// work unit.
export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink">
        Pedro Dibuja
      </h1>
      <p className="max-w-prose text-ink-muted">
        El contenido real de esta página llega en un próximo lote de trabajo.
      </p>
    </div>
  );
}
