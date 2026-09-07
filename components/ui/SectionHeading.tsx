interface SectionHeadingProps {
  title: string;
  support?: string;
  className?: string;
}

/**
 * One `<h2>` plus an optional one-line support paragraph. Every page-body
 * section below the hero uses this so heading level 2 stays consistent and
 * no section reaches for `<h3>`+ without a real subordinate structure.
 */
export function SectionHeading({ title, support, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl">{title}</h2>
      {support ? <p className="mt-2 max-w-prose">{support}</p> : null}
    </div>
  );
}
