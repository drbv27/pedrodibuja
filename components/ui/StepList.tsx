export interface Step {
  id: string;
  title: string;
  text: string;
}

interface StepListProps {
  steps: Step[];
  className?: string;
}

/**
 * An ordered sequence of steps, each its own `<h3>` + paragraph (design
 * D6). Always rendered directly under a page's `SectionHeading` `<h2>`, so
 * the heading hierarchy stays valid — e.g. `/como-dibuja`'s five steps sit
 * under one `<h2>`, never skipping a level.
 */
export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={["space-y-8", className].filter(Boolean).join(" ")}>
      {steps.map((step) => (
        <li key={step.id}>
          <h3 className="text-xl text-ink">{step.title}</h3>
          <p className="mt-2 max-w-prose text-ink-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
