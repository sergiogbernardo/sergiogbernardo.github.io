import type { Track } from '../data/types';
import { TRACKS } from '../data/types';

export type Filter = Track | 'all';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  ...(Object.entries(TRACKS) as [Track, (typeof TRACKS)[Track]][]).map(([value, meta]) => ({
    value,
    label: `${meta.emoji} ${meta.label}`,
  })),
];

interface Props {
  active: Filter;
  counts: Record<Filter, number>;
  onChange: (filter: Filter) => void;
}

export default function FilterBar({ active, counts, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            active === value
              ? 'bg-accent text-slate-950'
              : 'border border-slate-300 text-slate-600 hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400'
          }`}
        >
          {label}
          <span className="ml-1.5 opacity-60">{counts[value]}</span>
        </button>
      ))}
    </div>
  );
}
