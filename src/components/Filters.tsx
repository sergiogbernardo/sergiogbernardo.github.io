import { SECURITY_AREAS, TRACKS, type Locale, type SecurityArea, type Track } from '../data/types';
import type { Messages } from '../i18n/messages';

export type TrackFilter = Track | 'all';
export type AreaFilter = SecurityArea | 'all';

const TRACK_ORDER: Track[] = ['security', 'fintech', 'ai', 'games', 'other'];
const AREA_ORDER: SecurityArea[] = ['offensive', 'forensics', 'crypto', 'appsec'];

interface Props {
  track: TrackFilter;
  area: AreaFilter;
  trackCounts: Record<TrackFilter, number>;
  areaCounts: Record<AreaFilter, number>;
  locale: Locale;
  query: string;
  resultCount: number;
  t: Messages;
  onQueryChange: (query: string) => void;
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
  locale,
  query,
  resultCount,
  t,
  onQueryChange,
  onTrackChange,
  onAreaChange,
}: Props) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-md dark:border-emerald-500/15 dark:bg-black/70">
      <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase text-emerald-700 dark:text-emerald-300">
            {t.filters.title}
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              aria-label={t.filters.searchLabel}
              placeholder={t.filters.searchPlaceholder}
              onChange={(event) => onQueryChange(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            {query && (
              <button
                type="button"
                aria-label={t.filters.clear}
                onClick={() => onQueryChange('')}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-slate-100"
              >
                ×
              </button>
            )}
          </div>
        </label>
        <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
          {t.filters.resultCount(resultCount)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip active={track === 'all'} count={trackCounts.all} onClick={() => onTrackChange('all')}>
          {t.filters.all}
        </Chip>
        {TRACK_ORDER.filter((t) => trackCounts[t] > 0).map((t) => (
          <Chip
            key={t}
            active={track === t}
            count={trackCounts[t]}
            onClick={() => onTrackChange(t)}
          >
            {TRACKS[t].emoji} {TRACKS[t].label[locale]}
          </Chip>
        ))}
      </div>

      {track === 'security' && (
        <div id="security" className="mt-3 flex flex-wrap gap-2 border-t border-slate-200 pt-3 dark:border-emerald-500/10">
          <Chip subtle active={area === 'all'} count={areaCounts.all} onClick={() => onAreaChange('all')}>
            {t.filters.all}
          </Chip>
          {AREA_ORDER.filter((a) => areaCounts[a] > 0).map((a) => (
            <Chip
              key={a}
              subtle
              active={area === a}
              count={areaCounts[a]}
              onClick={() => onAreaChange(a)}
            >
              {SECURITY_AREAS[a].label[locale]}
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
          : 'border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300'
      }`}
    >
      {children}
      <span className="ml-1.5 opacity-60">{count}</span>
    </button>
  );
}
