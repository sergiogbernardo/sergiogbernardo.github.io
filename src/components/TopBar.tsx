const HUB_URL = 'https://sergiogbernardo.github.io/';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-500/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 lg:px-8">
        <div />

        <div className="justify-self-center">
          <h1 className="font-display text-lg font-bold uppercase tracking-wide text-emerald-300">
            Hub de Projetos
          </h1>
        </div>

        <div className="justify-self-end">
          <a
            href={HUB_URL}
            aria-label="Hub de Projetos"
            title="Hub de Projetos"
            className="flex shrink-0 items-center transition hover:scale-105"
          >
            <img
              src={`${import.meta.env.BASE_URL}hub-icon.png`}
              alt="Hub de Projetos"
              className="h-8 w-8"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
