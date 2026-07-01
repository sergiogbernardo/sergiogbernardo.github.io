import type { Locale, Project } from '../data/types';
import { TRACKS } from '../data/types';
import type { Messages } from '../i18n/messages';
import StatusBadge from './StatusBadge';

export default function ProjectCard({
  project,
  locale,
  t,
  onOpenDetails,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  t: Messages;
  onOpenDetails: (project: Project) => void;
  featured?: boolean;
}) {
  const track = TRACKS[project.track];

  return (
    <article
      className={`group flex flex-col rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 dark:bg-slate-950/90 ${
        featured
          ? 'border-emerald-400/40 shadow-md shadow-emerald-500/10'
          : 'border-slate-200 dark:border-emerald-500/10'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs text-emerald-700 dark:text-emerald-300/70">
          {track.emoji} {track.label[locale]}
        </span>
        <StatusBadge status={project.status} label={t.status[project.status]} />
      </div>

      <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-100">
        {project.name[locale]}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description[locale]}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.signals.map((signal) => (
          <li
            key={signal}
            className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-300"
          >
            {t.signals[signal]}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-100/80"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-5">
        {!project.liveUrl && !project.repoUrl && (
          <span className="text-sm text-slate-400 dark:text-slate-600">{t.cards.soon}</span>
        )}
        {project.liveUrl && (
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="flex-1 rounded-lg bg-emerald-400 px-3 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            {t.cards.open} →
          </button>
        )}
      </div>
    </article>
  );
}
