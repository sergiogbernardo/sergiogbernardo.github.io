import type { ProjectStatus } from '../data/types';

export default function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-live" />
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-xs font-semibold text-amber-500">
      {label}
    </span>
  );
}
