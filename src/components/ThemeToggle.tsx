import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm transition hover:border-accent hover:text-accent dark:border-slate-700"
    >
      {isDark ? '☀️ Claro' : '🌙 Escuro'}
    </button>
  );
}
