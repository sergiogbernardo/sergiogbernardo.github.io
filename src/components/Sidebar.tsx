import { TRACKS, type Track } from '../data/types';
import type { Filter } from './FilterBar';
import FilterBar from './FilterBar';

interface Props {
  activeFilter: Filter;
  counts: Record<Filter, number>;
  liveCount: number;
  onChange: (filter: Filter) => void;
}

const TRACK_ORDER: Track[] = ['security', 'fintech', 'ai', 'other'];

export default function Sidebar({ activeFilter, counts, liveCount, onChange }: Props) {
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-2xl border border-emerald-500/15 bg-black/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400/80">Navegação</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-100">Hub de Projetos</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Seleção curta de projetos publicados. A pasta <span className="text-emerald-300">Github</span> é
          a fonte pública; <span className="text-slate-300">Local</span> fica fora do catálogo.
        </p>

        <div className="mt-5 grid gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">{liveCount} online</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Trilhas</p>
            <div className="mt-3 space-y-2">
              {TRACK_ORDER.map((track) => (
                <div key={track} className="flex items-center justify-between text-sm text-slate-300">
                  <span>
                    {TRACKS[track].emoji} {TRACKS[track].label}
                  </span>
                  <span className="text-slate-500">{counts[track]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Filtros</p>
          <FilterBar active={activeFilter} counts={counts} onChange={onChange} />
        </div>
      </div>
    </aside>
  );
}
