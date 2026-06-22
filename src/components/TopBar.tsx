import ThemeToggle from './ThemeToggle';

interface Props {
  liveCount: number;
}

export default function TopBar({ liveCount }: Props) {
  return (
    <div className="sticky top-0 z-20 border-b border-emerald-500/15 bg-black/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-400/80">
              Hub de Projetos
            </p>
            <p className="text-sm text-slate-400">Sergio Bernardo</p>
          </div>
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
            {liveCount} online
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#projects"
            className="rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Projetos
          </a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
