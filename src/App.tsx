import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import FilterBar, { type Filter } from './components/FilterBar';
import { projects } from './data/projects';
import type { Track } from './data/types';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);
  const liveCount = useMemo(() => projects.filter((p) => p.status === 'live').length, []);

  const counts = useMemo(() => {
    const base = { all: rest.length } as Record<Filter, number>;
    (['security', 'fintech', 'ai', 'other'] as Track[]).forEach((track) => {
      base[track] = rest.filter((p) => p.track === track).length;
    });
    return base;
  }, [rest]);

  const visible = filter === 'all' ? rest : rest.filter((p) => p.track === filter);

  return (
    <div className="min-h-screen">
      <Hero liveCount={liveCount} />

      <main className="mx-auto max-w-5xl px-5 py-12">
        {featured.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
              Em destaque
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
              Todos os projetos
            </h2>
            <FilterBar active={filter} counts={counts} onChange={setFilter} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-800">
        <p className="font-mono">© {new Date().getFullYear()} Sergio Bernardo</p>
      </footer>
    </div>
  );
}
