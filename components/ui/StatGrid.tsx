export interface Stat {
  id: string;
  /** `null` while the deck's underlying number is still unresolved. */
  value: string | null;
  label: string;
}

interface StatGridProps {
  stats: Stat[];
}

/**
 * Renders one card per resolved stat, and simply drops any stat whose
 * value is still `null` (design D5: a missing datum removes its card, it
 * never renders an empty or placeholder one). If every stat is unresolved
 * the whole grid renders nothing rather than an empty wrapper.
 */
export function StatGrid({ stats }: StatGridProps) {
  const resolved = stats.filter(
    (stat): stat is Stat & { value: string } => stat.value !== null,
  );

  if (resolved.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {resolved.map((stat) => (
        <StatCard key={stat.id} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-rule bg-paper p-6 text-center">
      <p className="font-[family-name:var(--font-display)] text-3xl text-accent">
        {value}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
