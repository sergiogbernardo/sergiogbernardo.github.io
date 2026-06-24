import { SECURITY_AREAS, TRACKS, type SecurityArea, type Track } from '../data/types';

export type TrackFilter = Track | 'all';
export type AreaFilter = SecurityArea | 'all';

const TRACK_ORDER: Track[] = ['security', 'fintech', 'ai', 'other'];
const AREA_ORDER: SecurityArea[] = ['offensive', 'forensics', 'crypto', 'appsec'];

interface Props {
  track: TrackFilter;
  area: AreaFilter;
  trackCounts: Record<TrackFilter, number>;
  areaCounts: Record<AreaFilter, number>;
  onTrackChange: (track: TrackFilter) => void;
  onAreaChange: (area: AreaFilter) => void;
}

/**
 * Top filter bar. The first row filters by track ("trilha"); when the security
 * track is active, a second row filters by its sub-domain ("domínio"). Empty
 * buckets are hidden so the bar only shows what is actually available.
 */
export default function Filters({
  track,
  area,
  trackCounts,
  areaCounts,
  onTrackChange,
  onAreaChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-emerald-500/15 bg-black/70 p-5 backdrop-blur-md">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-emerald-400/80">Filtros</p>

      <div className="flex flex-wrap gap-2">
        <Chip active={track === 'all'} count={trackCounts.all} onClick={() => onTrackChange('all')}>
          Todos
        </Chip>
        {TRACK_ORDER.filter((t) => trackCounts[t] > 0).map((t) => (
          <Chip
            key={t}
            active={track === t}
            count={trackCounts[t]}
            onClick={() => onTrackChange(t)}
          >
            {TRACKS[t].emoji} {TRACKS[t].label}
          </Chip>
        ))}
      </div>

      {track === 'security' && (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-emerald-500/10 pt-3">
          <Chip subtle active={area === 'all'} count={areaCounts.all} onClick={() => onAreaChange('all')}>
            Todos
          </Chip>
          {AREA_ORDER.filter((a) => areaCounts[a] > 0).map((a) => (
            <Chip
              key={a}
              subtle
              active={area === a}
              count={areaCounts[a]}
              onClick={() => onAreaChange(a)}
            >
              {SECURITY_AREAS[a].label}
            </Chip>
          ))}
        </div>
      )}
    </section>
  );
}

interface ChipProps {
  active: boolean;
  count: number;
  subtle?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Chip({ active, count, subtle = false, onClick, children }: ChipProps) {
  const size = subtle ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full font-medium transition ${size} ${
        active
          ? 'bg-emerald-400 text-black'
          : 'border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300'
      }`}
    >
      {children}
      <span className="ml-1.5 opacity-60">{count}</span>
    </button>
  );
}
