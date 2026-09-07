import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/**
 * 68ch measure + paragraph rhythm for body copy (design D6). Deliberately
 * carries no text color of its own: it always renders inside a `Section`,
 * and inherits that surface's already-verified ink/paper pairing instead of
 * re-deciding contrast per block.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div className={["max-w-prose space-y-4", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
