import type { Locale } from '../data/types';
import { messages } from '../i18n/messages';

interface Props {
  locale: Locale;
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ locale, theme, onToggle }: Props) {
  const t = messages[locale];
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white/80 text-sm text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
    >
      <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
