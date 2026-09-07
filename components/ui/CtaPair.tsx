import { Button } from "./Button";

interface CtaAction {
  label: string;
  href: string;
}

interface CtaPairProps {
  primary: CtaAction;
  secondary: CtaAction;
  /**
   * Optional GA4 `select_content` tracking for the primary CTA only (spec
   * `analytics-and-cookie-notice`, deck slide 10: "the home page's primary
   * CTAs", not every link on the page).
   */
  primaryTrackSelectContent?: { itemId: string };
}

/**
 * A primary + secondary CTA pair, the shape the deck uses at the top and
 * bottom of the home page. Stacks full-width on narrow viewports (design
 * D8 — the 360px hero scenario).
 */
export function CtaPair({ primary, secondary, primaryTrackSelectContent }: CtaPairProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button
        href={primary.href}
        variant="primary"
        className="w-full sm:w-auto"
        trackSelectContent={primaryTrackSelectContent}
      >
        {primary.label}
      </Button>
      <Button href={secondary.href} variant="secondary" className="w-full sm:w-auto">
        {secondary.label}
      </Button>
    </div>
  );
}
