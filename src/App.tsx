import { useMemo, useState } from 'react';
import MatrixRain from './components/MatrixRain';
import ProjectCard from './components/ProjectCard';
import Filters, { type AreaFilter, type TrackFilter } from './components/Filters';
import { projects } from './data/projects';
import {
  COLLECTIONS,
  SECURITY_AREAS,
  TRACKS,
  type Project,
  type ProjectCollection,
  type SecurityArea,
  type Track,
} from './data/types';
import TopBar from './components/TopBar';
import FeedbackWidget from './components/FeedbackWidget';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { useLocale } from './hooks/useLocale';
import { useRoute } from './hooks/useRoute';
import { useTheme } from './hooks/useTheme';
import { messages, type Messages } from './i18n/messages';
import type { Route } from './lib/router';
import { trackEvent } from './lib/analytics';

const TRACK_ORDER: Track[] = ['security', 'fintech', 'ai', 'games', 'other'];
const AREA_ORDER: SecurityArea[] = ['offensive', 'forensics', 'crypto', 'appsec'];
const COLLECTION_ORDER: ProjectCollection[] = ['analyze', 'build', 'learn', 'utilities'];

export default function App() {
  const [track, setTrack] = useState<TrackFilter>('all');
  const [area, setArea] = useState<AreaFilter>('all');
  const [query, setQuery] = useState('');
  const { locale, switchLocale } = useLocale();
  const { route, navigate } = useRoute();
  const { theme, toggle } = useTheme();
  const t = messages[locale];
  const activeProject = route.name === 'lab' ? projects.find((project) => project.slug === route.slug) : undefined;

  useDocumentMeta({ route, locale, t, project: activeProject });

  const handleLocaleChange = (nextLocale: typeof locale) => {
    switchLocale(nextLocale);
    trackEvent('language_change', { locale: nextLocale });
  };

  const handleThemeToggle = () => {
    toggle();
    trackEvent('theme_change', { theme: theme === 'dark' ? 'light' : 'dark' });
  };

  const handleNavigateLab = (project: Project) => {
    trackEvent('lab_detail_open', { slug: project.slug, collection: project.collection });
    navigate({ name: 'lab', slug: project.slug });
  };

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 dark:bg-black dark:text-slate-100"
    >
      <MatrixRain theme={theme} />
      <div className="relative z-10">
        <TopBar
          locale={locale}
          theme={theme}
          t={t}
          onLocaleChange={handleLocaleChange}
          onThemeToggle={handleThemeToggle}
          onNavigate={navigate}
        />
        <div className="h-[65px]" aria-hidden="true" />

        {route.name === 'lab' && activeProject ? (
          <LabDetail project={activeProject} locale={locale} t={t} onNavigate={navigate} />
        ) : route.name === 'privacy' ? (
          <PrivacyPage t={t} onNavigate={navigate} />
        ) : (
          <HomePage
            track={track}
            area={area}
            query={query}
            locale={locale}
            theme={theme}
            t={t}
            onQueryChange={(nextQuery) => {
              setQuery(nextQuery);
              if (nextQuery.trim()) trackEvent('search_used', { length: nextQuery.trim().length });
            }}
            onTrackChange={(nextTrack) => {
              setTrack(nextTrack);
              if (nextTrack !== 'security') setArea('all');
              trackEvent('filter_used', { filter: 'track', value: nextTrack });
            }}
            onAreaChange={(nextArea) => {
              setArea(nextArea);
              trackEvent('filter_used', { filter: 'area', value: nextArea });
            }}
            onNavigate={navigate}
            onNavigateLab={handleNavigateLab}
          />
        )}

        <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-mono">
            © {new Date().getFullYear()} {t.footer.rights} · {t.footer.privacy} ·{' '}
            <a
              href="https://www.linkedin.com/in/sergio-bernardo/"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('social_open', { target: 'linkedin' })}
              className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
            >
              {t.footer.linkedin}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function HomePage({
  track,
  area,
  query,
  locale,
  theme,
  t,
  onQueryChange,
  onTrackChange,
  onAreaChange,
  onNavigate,
  onNavigateLab,
}: {
  track: TrackFilter;
  area: AreaFilter;
  query: string;
  locale: 'en' | 'pt-BR';
  theme: 'light' | 'dark';
  t: Messages;
  onQueryChange: (query: string) => void;
  onTrackChange: (track: TrackFilter) => void;
  onAreaChange: (area: AreaFilter) => void;
  onNavigate: (route: Route) => void;
  onNavigateLab: (project: Project) => void;
}) {
  const searchedProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return projects;

    return projects.filter((project) => {
      const searchable = [
        project.slug,
        project.name.en,
        project.name['pt-BR'],
        project.description.en,
        project.description['pt-BR'],
        project.collection,
        COLLECTIONS[project.collection].label.en,
        COLLECTIONS[project.collection].label['pt-BR'],
        project.track,
        TRACKS[project.track].label.en,
        TRACKS[project.track].label['pt-BR'],
        project.area ? SECURITY_AREAS[project.area].label.en : '',
        project.area ? SECURITY_AREAS[project.area].label['pt-BR'] : '',
        project.status,
        ...project.signals,
        ...project.stack,
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [query]);

  const trackCounts = useMemo(() => {
    const base = { all: searchedProjects.length } as Record<TrackFilter, number>;
    TRACK_ORDER.forEach((currentTrack) => {
      base[currentTrack] = searchedProjects.filter((project) => project.track === currentTrack).length;
    });
    return base;
  }, [searchedProjects]);

  const areaCounts = useMemo(() => {
    const security = searchedProjects.filter((project) => project.track === 'security');
    const base = { all: security.length } as Record<AreaFilter, number>;
    AREA_ORDER.forEach((currentArea) => {
      base[currentArea] = security.filter((project) => project.area === currentArea).length;
    });
    return base;
  }, [searchedProjects]);

  const filteredProjects = searchedProjects.filter(
    (project) =>
      (track === 'all' || project.track === track) && (area === 'all' || project.area === area),
  );
  const featured = filteredProjects.filter((project) => project.featured);
  const listed = filteredProjects.filter((project) => !project.featured);
  const groupByArea = track === 'security' && area === 'all';
  const empty = filteredProjects.length === 0;
  const localFirstCount = projects.filter((project) => project.signals.includes('local')).length;

  return (
    <main>
      <section className="border-b border-emerald-500/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase text-emerald-700 dark:text-emerald-300">
              {t.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-slate-950 sm:text-6xl dark:text-slate-50">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t.hero.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#labs"
                className="rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                {t.hero.primaryAction}
              </a>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'privacy' })}
                className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              >
                {t.hero.secondaryAction}
              </button>
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-emerald-500/15 dark:bg-slate-950/80">
            <p className="font-mono text-xs uppercase text-slate-500 dark:text-slate-400">
              {t.hero.builtBy}
            </p>
            <dl className="mt-5 grid gap-4">
              <Metric value={projects.length} label={t.hero.stats.liveTools} />
              <Metric value={localFirstCount} label={t.hero.stats.localFirst} />
              <Metric value="No" label={t.hero.stats.noTracking} />
            </dl>
          </aside>
        </div>
      </section>

      <div id="labs" className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <CollectionsPanel locale={locale} t={t} />

        <Filters
          track={track}
          area={area}
          trackCounts={trackCounts}
          areaCounts={areaCounts}
          locale={locale}
          query={query}
          resultCount={filteredProjects.length}
          t={t}
          onQueryChange={onQueryChange}
          onTrackChange={onTrackChange}
          onAreaChange={onAreaChange}
        />

        {featured.length > 0 && (
          <ProjectSection title={t.sections.featured}>
            <div className="grid gap-4 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  t={t}
                  onOpenDetails={onNavigateLab}
                  featured
                />
              ))}
            </div>
          </ProjectSection>
        )}

        {!empty && (
          <ProjectSection title={t.sections.allProjects} subtitle={t.filters.resultCount(listed.length)}>
            {groupByArea ? (
              <div className="space-y-6">
                {AREA_ORDER.map((currentArea) => {
                  const items = listed.filter((project) => project.area === currentArea);
                  if (items.length === 0) return null;
                  return (
                    <div key={currentArea}>
                      <h3 className="mb-3 font-mono text-xs uppercase text-slate-500 dark:text-slate-400">
                        {SECURITY_AREAS[currentArea].label[locale]}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((project) => (
                          <ProjectCard
                            key={project.slug}
                            project={project}
                            locale={locale}
                            t={t}
                            onOpenDetails={onNavigateLab}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {listed.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    locale={locale}
                    t={t}
                    onOpenDetails={onNavigateLab}
                  />
                ))}
              </div>
            )}
          </ProjectSection>
        )}

        {empty && (
          <div className="rounded-lg border border-slate-200 bg-white/85 p-8 text-center shadow-sm backdrop-blur-md dark:border-emerald-500/15 dark:bg-black/70">
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              {t.filters.noResults}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {t.filters.noResultsBody}
            </p>
            <button
              type="button"
              onClick={() => {
                onQueryChange('');
                onTrackChange('all');
                onAreaChange('all');
                trackEvent('filters_clear_empty_state');
              }}
              className="mt-5 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              {t.filters.clearAll}
            </button>
          </div>
        )}

        <ProjectSection>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoPanel id="about" title={t.sections.about}>
              <p>{t.about.body}</p>
              <p>{t.about.author}</p>
            </InfoPanel>
            <InfoPanel title={t.sections.principles}>
              <ul className="space-y-2">
                {t.principles.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoPanel>
            <InfoPanel id="privacy" title={t.sections.privacy}>
              <p>{t.privacy.body}</p>
              <p>{t.privacy.analytics}</p>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'privacy' })}
                className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
              >
                {t.hero.secondaryAction}
              </button>
            </InfoPanel>
            <InfoPanel title={t.sections.buildingNext}>
              <p>{t.next.body}</p>
              <span className="inline-flex w-fit rounded bg-emerald-500/10 px-2 py-1 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                {t.next.status}
              </span>
            </InfoPanel>
          </div>
        </ProjectSection>

        <ProjectSection title={t.sections.feedback} subtitle={t.feedback.body}>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/sergiogbernardo/sergiogbernardo.github.io/issues/new?labels=feedback&title=Sabion%20Labs%20feedback"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('feedback_open', { target: 'github_issues' })}
                className="rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                {t.feedback.action}
              </a>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {t.feedback.note}
              </span>
            </div>
            <FeedbackWidget theme={theme} />
          </div>
        </ProjectSection>
      </div>
    </main>
  );
}

function LabDetail({
  project,
  locale,
  t,
  onNavigate,
}: {
  project: Project;
  locale: 'en' | 'pt-BR';
  t: Messages;
  onNavigate: (route: Route) => void;
}) {
  const collection = COLLECTIONS[project.collection];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProjectSection>
        <button
          type="button"
          onClick={() => onNavigate({ name: 'home' })}
          className="mb-6 font-mono text-xs text-emerald-700 hover:underline dark:text-emerald-300"
        >
          ← {t.detail.back}
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-emerald-700 dark:text-emerald-300">
              {collection.label[locale]} · {TRACKS[project.track].label[locale]}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-slate-950 dark:text-slate-50">
              {project.name[locale]}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {project.description[locale]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  onClick={() => trackEvent('lab_open', { slug: project.slug })}
                  className="rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    {t.detail.open}
                  </a>
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-emerald-500/15 dark:bg-slate-950/80">
            <DetailList title={t.detail.privacyModel} items={project.signals.map((signal) => t.signals[signal])} />
            <DetailList title={t.detail.technicalStack} items={project.stack} />
            <DetailList title={t.detail.collection} items={[collection.label[locale]]} />
          </aside>
        </div>
      </ProjectSection>
    </main>
  );
}

function PrivacyPage({
  t,
  onNavigate,
}: {
  t: Messages;
  onNavigate: (route: Route) => void;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <ProjectSection title={t.sections.privacy}>
        <button
          type="button"
          onClick={() => onNavigate({ name: 'home' })}
          className="mb-6 font-mono text-xs text-emerald-700 hover:underline dark:text-emerald-300"
        >
          ← {t.detail.back}
        </button>
        <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p>{t.privacy.body}</p>
          <p>{t.privacy.analytics}</p>
          <p>{t.privacy.cookies}</p>
        </div>
      </ProjectSection>
    </main>
  );
}

function CollectionsPanel({ locale, t }: { locale: 'en' | 'pt-BR'; t: Messages }) {
  return (
    <ProjectSection title={t.collections.title} subtitle={t.collections.body}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {COLLECTION_ORDER.map((collectionId) => {
          const collection = COLLECTIONS[collectionId];
          const count = projects.filter((project) => project.collection === collectionId).length;
          return (
            <div
              key={collectionId}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-emerald-500/15 dark:bg-slate-950/80"
            >
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-slate-50">
                {collection.label[locale]} <span className="text-sm text-slate-400">{count}</span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {collection.description[locale]}
              </p>
            </div>
          );
        })}
      </div>
    </ProjectSection>
  );
}

function ProjectSection({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-md dark:border-emerald-500/15 dark:bg-black/70">
      {title && (
        <div className="mb-6">
          <h2 className="font-display text-sm font-semibold uppercase text-emerald-700 dark:text-emerald-300">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-5 last:mb-0">
      <h2 className="mb-2 font-mono text-xs uppercase text-slate-500 dark:text-slate-400">{title}</h2>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-100/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metric({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-xs text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-semibold text-slate-950 dark:text-slate-50">
        {value}
      </dd>
    </div>
  );
}

function InfoPanel({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm dark:border-emerald-500/15 dark:bg-slate-950/80 dark:text-slate-300"
    >
      <h2 className="mb-3 font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </article>
  );
}
