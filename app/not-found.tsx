import { Button } from "@/components/ui/Button";

// Deck-verbatim 404 copy ("Página 404" in the copy deck), rendered instead
// of the framework default whenever Next.js resolves no matching route.
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink">
        Esta página no existe
      </h1>
      <p className="max-w-prose text-ink-muted">
        Como el carro que Pedro dibujó una vez y que nadie ha visto en la
        calle jamás.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary">
          Volver al inicio
        </Button>
        <Button href="/galeria" variant="secondary">
          Ir a la galería
        </Button>
      </div>
    </div>
  );
}
