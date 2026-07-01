import type { Locale } from '../data/types';
import type { Messages } from '../i18n/messages';
import type { Route } from '../lib/router';
import ThemeToggle from './ThemeToggle';

interface Props {
  locale: Locale;
  theme: 'light' | 'dark';
  t: Messages;
  onLocaleChange: (locale: Locale) => void;
  onThemeToggle: () => void;
  onNavigate: (route: Route) => void;
}

export default function TopBar({ locale, theme, t, onLocaleChange, onThemeToggle, onNavigate }: Props) {
  const goHomeSection = (sectionId?: string) => {
    onNavigate({ name: 'home' });
    if (!sectionId) return;
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView(), 0);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-emerald-500/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button type="button" onClick={() => goHomeSection()} className="flex min-w-0 items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}hub-icon.png`}
            alt=""
            className="h-8 w-8 shrink-0"
          />
          <span className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
            Sabion Labs
          </span>
        </button>

        <nav className="ml-3 hidden items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <NavButton onClick={() => goHomeSection('labs')}>
            {t.nav.labs}
          </NavButton>
          <NavButton onClick={() => goHomeSection('security')}>
            {t.nav.security}
          </NavButton>
          <NavButton onClick={() => goHomeSection('about')}>
            {t.nav.about}
          </NavButton>
          <NavButton onClick={() => onNavigate({ name: 'privacy' })}>
            {t.nav.privacy}
          </NavButton>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageButton
            active={locale === 'en'}
            label="🇺🇸 EN"
            ariaLabel={t.language.english}
            onClick={() => onLocaleChange('en')}
          />
          <LanguageButton
            active={locale === 'pt-BR'}
            label="🇧🇷 PT"
            ariaLabel={t.language.portuguese}
            onClick={() => onLocaleChange('pt-BR')}
          />
          <ThemeToggle locale={locale} theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md px-2.5 py-1.5 transition hover:bg-slate-100 dark:hover:bg-white/10"
    >
      {children}
    </button>
  );
}

interface LanguageButtonProps {
  active: boolean;
  label: string;
  ariaLabel: string;
  onClick: () => void;
}

function LanguageButton({ active, label, ariaLabel, onClick }: LanguageButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={onClick}
      className={`h-9 rounded-md border px-2.5 font-mono text-xs font-semibold transition ${
        active
          ? 'border-emerald-500 bg-emerald-500 text-black'
          : 'border-slate-300 bg-white/80 text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:border-emerald-400'
      }`}
    >
      {label}
    </button>
  );
}
