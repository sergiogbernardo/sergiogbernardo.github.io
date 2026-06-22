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
              ? 'bg-emerald-400 text-black'
              : 'border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300'
          }`}
        >
          {label}
          <span className="ml-1.5 opacity-60">{counts[value]}</span>
        </button>
      ))}
    </div>
  );
}
