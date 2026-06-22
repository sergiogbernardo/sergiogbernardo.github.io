import type { Project } from '../data/types';
import { TRACKS } from '../data/types';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const track = TRACKS[project.track];

  return (
    <article
      className={`group flex flex-col rounded-xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg dark:bg-slate-900 ${
        featured
          ? 'border-accent/40 shadow-md'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {track.emoji} {track.label}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display text-lg font-semibold">{project.name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 pt-1">
        {!project.liveUrl && !project.repoUrl && (
          <span className="text-sm text-slate-400 dark:text-slate-600">Em breve</span>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="flex-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
          >
            Ver ao vivo →
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={`rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium transition hover:border-accent hover:text-accent dark:border-slate-700 ${
              project.liveUrl ? '' : 'flex-1'
            }`}
          >
            Código
          </a>
        )}
      </div>
    </article>
  );
}
