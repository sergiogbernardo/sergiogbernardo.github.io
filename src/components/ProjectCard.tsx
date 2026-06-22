import type { Project } from '../data/types';
import { TRACKS } from '../data/types';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const track = TRACKS[project.track];

  return (
    <article
      className={`group flex flex-col rounded-xl border bg-slate-950/90 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 ${
        featured
          ? 'border-emerald-400/40 shadow-md shadow-emerald-500/10'
          : 'border-emerald-500/10'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs text-emerald-300/70">
          {track.emoji} {track.label}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="font-display text-lg font-semibold text-slate-100">{project.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-100/80"
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
            className="flex-1 rounded-lg bg-emerald-400 px-3 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            Ver ao vivo →
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={`rounded-lg border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-300 transition hover:border-emerald-400 hover:text-emerald-300 ${
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
