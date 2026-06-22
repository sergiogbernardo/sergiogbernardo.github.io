import ThemeToggle from './ThemeToggle';

interface Props {
  liveCount: number;
}

export default function TopBar({ liveCount }: Props) {
  return (
    <div className="sticky top-0 z-20 border-b border-emerald-500/15 bg-black/75 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 lg:px-8">
        <div />

        <div className="justify-self-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-400/80">
            Hub de Projetos
          </p>
        </div>

        <div className="flex items-center justify-self-end gap-3">
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
            {liveCount} online
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
