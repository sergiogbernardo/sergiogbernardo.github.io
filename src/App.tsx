import { useMemo, useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';
import type { Filter } from './components/FilterBar';
import { projects } from './data/projects';
import type { Track } from './data/types';
import TopBar from './components/TopBar';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);
  const liveCount = useMemo(() => projects.filter((p) => p.status === 'live').length, []);
  const catalog = rest.length > 0 ? rest : projects;

  const counts = useMemo(() => {
    const base = { all: catalog.length } as Record<Filter, number>;
    (['security', 'fintech', 'ai', 'other'] as Track[]).forEach((track) => {
      base[track] = catalog.filter((p) => p.track === track).length;
    });
    return base;
  }, [catalog]);

  const visible = filter === 'all' ? catalog : catalog.filter((p) => p.track === filter);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <MatrixRain />
      <div className="relative z-10">
        <TopBar liveCount={liveCount} />

        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-6">
          <Sidebar activeFilter={filter} counts={counts} liveCount={liveCount} onChange={setFilter} />

          <div className="space-y-6">
            {featured.length > 0 && rest.length > 0 && (
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

            <section id="projects" className="rounded-2xl border border-emerald-500/15 bg-black/70 p-5 backdrop-blur-md">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-emerald-300/80">
                    Todos os projetos
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {visible.length} projeto{visible.length === 1 ? '' : 's'} visível
                    {visible.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-emerald-500/10 py-6 text-center text-sm text-slate-500">
          <p className="font-mono">© {new Date().getFullYear()} Sergio Bernardo</p>
        </footer>
      </div>
    </div>
  );
}
