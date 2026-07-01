const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sergio-bernardo/' },
];

export default function Hero({ liveCount }: { liveCount: number }) {
  return (
    <header className="bg-grid-glow border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-5 py-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-accent">~/sergiogbernardo</span>
        </div>

        <div className="py-16 sm:py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-live" />
            {liveCount} demo{liveCount === 1 ? '' : 's'} ao vivo agora
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            Sergio Bernardo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Cibersegurança & desenvolvimento. Aqui não tem só repositório parado —{' '}
            <span className="text-slate-900 dark:text-slate-100">tem projeto rodando</span>. Abra,
            clique e veja funcionando.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-slate-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
