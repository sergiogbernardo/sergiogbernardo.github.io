import { useMemo, useState } from 'react';
import MatrixRain from './components/MatrixRain';
import ProjectCard from './components/ProjectCard';
import Filters, { type AreaFilter, type TrackFilter } from './components/Filters';
import { projects } from './data/projects';
import { SECURITY_AREAS, type SecurityArea, type Track } from './data/types';
import TopBar from './components/TopBar';

const TRACK_ORDER: Track[] = ['security', 'fintech', 'ai', 'other'];
const AREA_ORDER: SecurityArea[] = ['offensive', 'forensics', 'crypto', 'appsec'];

export default function App() {
  const [track, setTrack] = useState<TrackFilter>('all');
  const [area, setArea] = useState<AreaFilter>('all');

  // Leaving the security track clears the sub-domain filter.
  const handleTrackChange = (next: TrackFilter) => {
    setTrack(next);
    if (next !== 'security') setArea('all');
  };

  // Counts cover the whole catalog (both the featured hero and the list).
  const trackCounts = useMemo(() => {
    const base = { all: projects.length } as Record<TrackFilter, number>;
    TRACK_ORDER.forEach((t) => {
      base[t] = projects.filter((p) => p.track === t).length;
    });
    return base;
  }, []);

  const areaCounts = useMemo(() => {
    const security = projects.filter((p) => p.track === 'security');
    const base = { all: security.length } as Record<AreaFilter, number>;
    AREA_ORDER.forEach((a) => {
      base[a] = security.filter((p) => p.area === a).length;
    });
    return base;
  }, []);

  const featured = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.featured &&
          (track === 'all' || p.track === track) &&
          (area === 'all' || p.area === area),
      ),
    [track, area],
  );

  const listed = useMemo(
    () =>
      projects.filter(
        (p) =>
          !p.featured &&
          (track === 'all' || p.track === track) &&
          (area === 'all' || p.area === area),
      ),
    [track, area],
  );

  // Group the list by security domain only when browsing all of security.
  const groupByArea = track === 'security' && area === 'all';
  const empty = featured.length === 0 && listed.length === 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <MatrixRain />
      <div className="relative z-10">
        <TopBar />

        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <Filters
            track={track}
            area={area}
            trackCounts={trackCounts}
            areaCounts={areaCounts}
            onTrackChange={handleTrackChange}
            onAreaChange={setArea}
          />

          {featured.length > 0 && (
            <section className="rounded-2xl border border-emerald-500/15 bg-black/70 p-5 backdrop-blur-md">
              <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-emerald-300/80">
                Em destaque
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} featured />
                ))}
              </div>
            </section>
          )}

          {listed.length > 0 && (
            <section
              id="projects"
              className="rounded-2xl border border-emerald-500/15 bg-black/70 p-5 backdrop-blur-md"
            >
              <div className="mb-6">
                <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-emerald-300/80">
                  Todos os projetos
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {listed.length} projeto{listed.length === 1 ? '' : 's'}
                </p>
              </div>

              {groupByArea ? (
                <div className="space-y-6">
                  {AREA_ORDER.map((a) => {
                    const items = listed.filter((project) => project.area === a);
                    if (items.length === 0) return null;
                    return (
                      <div key={a}>
                        <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                          {SECURITY_AREAS[a].label}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {items.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {listed.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </section>
          )}

          {empty && (
            <p className="rounded-2xl border border-emerald-500/15 bg-black/70 p-8 text-center text-sm text-slate-400 backdrop-blur-md">
              Nenhum projeto nesta seleção.
            </p>
          )}
        </main>

        <footer className="border-t border-emerald-500/10 py-6 text-center text-sm text-slate-500">
          <p className="font-mono">© {new Date().getFullYear()} Sergio Bernardo</p>
        </footer>
      </div>
    </div>
  );
}
