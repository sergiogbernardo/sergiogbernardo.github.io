import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';
import MatrixRain from './components/MatrixRain';
import { projects } from './data/projects';
import { SECURITY_AREAS, TRACKS, type SecurityArea } from './data/types';
import { useRoute } from './hooks/useRoute';
import { useTheme } from './hooks/useTheme';

const articles = [
  {
    title: 'Sol, Terra ou Luna: qual modelo usar no Codex?',
    description:
      'A OpenAI dividiu o GPT-5.6 em três perfis de trabalho. Entenda o que muda e escolha sem depender de jargão.',
    category: 'IA E AGENTES',
    readTime: '7 MIN',
    date: '18 JUL 2026',
    href: '/artigos/sol-terra-luna',
    status: 'NOVO',
    track: 'ai',
  },
];

type ArticleFilter = 'all' | 'ai' | 'cyber' | 'dev' | 'labs';
type LabFilter = 'all' | 'security' | 'dev' | 'utilities' | 'ai';
type SecurityFilter = 'all' | SecurityArea;

const articleFilters: { value: ArticleFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'ai', label: 'IA e agentes' },
  { value: 'cyber', label: 'Cyber' },
  { value: 'dev', label: 'Dev e ferramentas' },
  { value: 'labs', label: 'Labs' },
];

const labFilters: { value: LabFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'security', label: 'Segurança' },
  { value: 'dev', label: 'Dev' },
  { value: 'utilities', label: 'Utilidades' },
  { value: 'ai', label: 'IA' },
];

const securityFilters: { value: SecurityFilter; label: string }[] = [
  { value: 'all', label: 'Todos em Cyber' },
  ...Object.entries(SECURITY_AREAS).map(([value, area]) => ({
    value: value as SecurityArea,
    label: area.label['pt-BR'],
  })),
];

const tracks = [
  {
    code: 'IA',
    icon: '🤖',
    title: 'IA e agentes',
    description:
      'Codex, Claude, MCP, contexto e automações explicados pelo trabalho que realmente entregam.',
    topics: 'AGENTES · MCP · MODELOS',
  },
  {
    code: 'CY',
    icon: '🔐',
    title: 'Cibersegurança',
    description:
      'Riscos, controles e incidentes traduzidos em decisões que cabem no fluxo de trabalho.',
    topics: 'APPSEC · PRIVACIDADE · DEFESA',
  },
  {
    code: 'DV',
    icon: '🧰',
    title: 'Dev e ferramentas',
    description:
      'Construção real, bastidores, padrões e pequenas ferramentas que economizam tempo.',
    topics: 'CÓDIGO · AUTOMAÇÃO · LABS',
  },
];

const signalLabels: Record<string, string> = {
  clientSide: 'Client-side only',
  local: 'Processamento local',
  noUpload: 'Sem upload',
  noAccount: 'Sem conta',
  browserStorage: 'Dados no navegador',
  publicData: 'Dados públicos',
  externalApi: 'API externa',
  experimental: 'Experimental',
};

const labCatalog = projects.map((project) => ({
  project,
  name: project.name['pt-BR'],
  category: TRACKS[project.track].label['pt-BR'],
  categoryIcon: TRACKS[project.track].emoji,
  description: project.description['pt-BR'],
  signals: project.signals.map((signal) => signalLabels[signal]),
  stack: project.stack,
  liveUrl: project.liveUrl,
}));

const featuredLabSlugs = ['inspectorvg', 'scanvg', 'biblioteca-de-comandos'];
const featuredLabs = featuredLabSlugs
  .map((slug) => labCatalog.find((lab) => lab.project.slug === slug))
  .filter((lab): lab is (typeof labCatalog)[number] => Boolean(lab));

const modelSections = [
  {
    name: 'Sol',
    role: 'O estrategista',
    title: 'Quando ainda é preciso descobrir o caminho.',
    body: 'Sol é a escolha para trabalho complexo, aberto ou ambíguo. Ele dedica mais profundidade quando o resultado exige análise, julgamento e acabamento.',
    examples: 'Arquitetura · bugs difíceis · pesquisa profunda · segurança',
    rule: 'Se o caminho ainda não está claro, comece com Sol.',
    image: '/assets/sabion-sol.png',
    accent: 'sol',
  },
  {
    name: 'Terra',
    role: 'O construtor',
    title: 'Quando o caminho existe, mas ainda há decisões.',
    body: 'Terra é o modelo pragmático para o trabalho cotidiano. Combina raciocínio forte e uso de ferramentas sem exigir toda a profundidade do Sol.',
    examples: 'Features · revisão de código · debug · automação',
    rule: 'Tarefa clara com decisões no meio? Terra.',
    image: '/assets/sabion-terra.png',
    accent: 'terra',
  },
  {
    name: 'Luna',
    role: 'O executor veloz',
    title: 'Quando o trabalho é claro e se repete.',
    body: 'Luna funciona melhor em tarefas específicas, verificáveis e em volume. Quando você já sabe como é uma boa resposta, ele prioriza velocidade e eficiência.',
    examples: 'Extração · classificação · transformação · resumos',
    rule: 'Se é repetível e fácil de conferir, use Luna.',
    image: '/assets/sabion-luna.png',
    accent: 'luna',
  },
];

export default function App() {
  const { route } = useRoute();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const lab =
      route.name === 'lab'
        ? labCatalog.find((item) => item.project.slug === route.slug)
        : undefined;
    const defaultMetadata = {
      home: {
        title: 'Sabion Labs — Artigos, Soluções e Laboratórios',
        description: 'Labs de cibersegurança, desenvolvimento e inteligência artificial.',
      },
      articles: {
        title: 'Artigos | Sabion Labs',
        description:
          'Análises, guias e testes sobre IA, agentes, cibersegurança e desenvolvimento.',
      },
      article: {
        title: 'Sol, Terra ou Luna: qual modelo usar no Codex? | Sabion Labs',
        description:
          'Entenda a diferença entre os modelos GPT-5.6 Sol, Terra e Luna e escolha pelo formato da tarefa.',
      },
      labs: {
        title: 'Labs | Sabion Labs',
        description:
          'Ferramentas técnicas da Sabion Labs para segurança, desenvolvimento e produtividade.',
      },
    };
    const metadata =
      route.name === 'lab'
        ? {
            title: lab ? `${lab.name} | Sabion Labs` : 'Lab não encontrado | Sabion Labs',
            description: lab?.description ?? 'Explore os Labs da Sabion.',
          }
        : defaultMetadata[route.name];

    document.title = metadata.title;
    setMeta('description', metadata.description);
    setMeta('twitter:title', metadata.title);
    setMeta('twitter:description', metadata.description);
    setProperty('og:title', metadata.title);
    setProperty('og:description', metadata.description);
    setProperty('og:url', window.location.href);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href;
  }, [route]);

  return (
    <>
      <MatrixRain theme={theme} />
      <SiteHeader routeName={route.name} theme={theme} onThemeToggle={toggle} />
      <div className="site-content">
        {route.name === 'articles' ? (
          <ArticlesPage />
        ) : route.name === 'article' ? (
          <ArticlePage />
        ) : route.name === 'labs' ? (
          <LabsPage />
        ) : route.name === 'lab' ? (
          <LabDetailPage slug={route.slug} />
        ) : (
          <HomePage />
        )}
        <SiteFooter />
      </div>
    </>
  );
}

function SiteHeader({
  routeName,
  theme,
  onThemeToggle,
}: {
  routeName: 'home' | 'articles' | 'article' | 'labs' | 'lab';
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [routeName]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '/', label: 'Início', active: routeName === 'home' },
    {
      href: '/artigos',
      label: 'Artigos',
      active: routeName === 'articles' || routeName === 'article',
    },
    { href: '/labs', label: 'Labs', active: routeName === 'labs' || routeName === 'lab' },
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <InternalLink className="brand" href="/" aria-label="Sabion Labs — início">
          <img src="/assets/sabion-icon.png" width="36" height="36" alt="" />
          <strong>Sabion Labs</strong>
        </InternalLink>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <InternalLink
              className={item.active ? 'is-active' : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </InternalLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? (
              <Sun size={17} aria-hidden="true" />
            ) : (
              <Moon size={17} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={19} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`mobile-navigation${mobileMenuOpen ? ' is-open' : ''}`}
        id="mobile-navigation"
        hidden={!mobileMenuOpen}
      >
        <nav className="shell" aria-label="Navegação mobile">
          {navItems.map((item) => (
            <InternalLink
              className={item.active ? 'is-active' : undefined}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              key={item.href}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">→</span>
            </InternalLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  const featured = articles[0];

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <h1>
            Artigos,
            <br />
            <span>Soluções e</span>
            <br />
            Laboratórios.
          </h1>
          <p className="hero-lead">
            Labs de Cibersegurança, Desenvolvimento e Inteligência Artificial.
          </p>
          <div className="button-row">
            <InternalLink className="button button-primary" href="/artigos">
              Ler os artigos <span aria-hidden="true">→</span>
            </InternalLink>
            <InternalLink className="button button-secondary" href="/labs">
              Explorar os Labs
            </InternalLink>
          </div>
        </div>

        <div className="hero-mascot-showcase" aria-label="Mascote da Sabion Labs">
          <img
            className="hero-mascot-standalone"
            src="/assets/sabion-sol.png"
            width="620"
            height="620"
            alt="Mascote da Sabion analisando uma rede de decisões"
          />
        </div>
      </section>

      <section className="section shell" aria-labelledby="destaque-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Leitura em destaque</p>
            <h2 id="destaque-title">Comece pelo que mudou agora.</h2>
          </div>
          <InternalLink className="text-link" href="/artigos">
            Todos os artigos <span aria-hidden="true">↗</span>
          </InternalLink>
        </div>

        <article className="featured-article">
          <div className="featured-copy">
            <div className="article-meta">
              <span>{featured.category}</span>
              <span>{featured.readTime}</span>
              <span>{featured.date}</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <div className="featured-rule">
              <span>REGRA SABION</span>
              <strong>
                Não existe um melhor para tudo. Existe o modelo certo para cada tipo de trabalho.
              </strong>
            </div>
            <InternalLink className="button button-dark" href={featured.href}>
              Entender a diferença <span aria-hidden="true">→</span>
            </InternalLink>
          </div>

          <div className="featured-visual" aria-hidden="true">
            <div className="visual-orbit visual-orbit-one" />
            <div className="visual-orbit visual-orbit-two" />
            <img src="/assets/sabion-presenter.png" width="580" height="580" alt="" />
            <div className="visual-card visual-card-sol">Sol</div>
            <div className="visual-card visual-card-terra">Terra</div>
            <div className="visual-card visual-card-luna">Luna</div>
          </div>
        </article>
      </section>

      <section className="manifesto-strip">
        <div className="shell manifesto-inner">
          <p>Menos lista de ferramenta.</p>
          <p>Mais contexto, prova e decisão.</p>
        </div>
      </section>

      <section className="section shell" aria-labelledby="tracks-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Escolha uma trilha</p>
            <h2 id="tracks-title">Acompanhe pelo problema.</h2>
          </div>
          <p className="section-note">
            Notícias passam. Princípios, testes e ferramentas continuam úteis.
          </p>
        </div>

        <div className="track-grid">
          {tracks.map((track, index) => (
            <article className="hub-track-card" key={track.title}>
              <div className="hub-track-card-top">
                <span className="hub-track-category">
                  <span aria-hidden="true">{track.icon}</span>
                  Trilha editorial
                </span>
                <span className="hub-track-code">
                  {track.code} · 0{index + 1}
                </span>
              </div>
              <div className="hub-track-copy">
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </div>
              <ul className="hub-track-topics" aria-label="Assuntos da trilha">
                {track.topics.split(' · ').map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <InternalLink className="hub-track-action" href="/artigos">
                Ver artigos <span aria-hidden="true">→</span>
              </InternalLink>
            </article>
          ))}
        </div>
      </section>

      <section className="labs-section" aria-labelledby="labs-title">
        <div className="shell">
          <div className="labs-heading labs-heading-simple">
            <h2 id="labs-title">Visualize os Labs</h2>
          </div>
          <div className="lab-grid">
            {featuredLabs.map((lab) => (
              <LabCard lab={lab} key={lab.name} />
            ))}
          </div>
          <div className="labs-footer">
            <span>{labCatalog.length} ferramentas no ecossistema</span>
            <InternalLink className="button button-neon" href="/labs">
              Ver todos os Labs <span aria-hidden="true">→</span>
            </InternalLink>
          </div>
        </div>
      </section>

      <section className="section shell process-section" aria-labelledby="process-title">
        <div className="process-intro">
          <p className="eyebrow">Método Sabion</p>
          <h2 id="process-title">Do sinal ao veredito.</h2>
          <p>Uma publicação de terceiro pode apontar o assunto. Nunca será a nossa única fonte.</p>
        </div>
        <ol className="process-list">
          <ProcessItem
            number="01"
            title="Encontramos o sinal"
            body="Releases, dúvidas, incidentes e tendências."
          />
          <ProcessItem
            number="02"
            title="Voltamos à fonte"
            body="Documentação, código, pesquisa e evidência original."
          />
          <ProcessItem
            number="03"
            title="Testamos a promessa"
            body="Exemplo real, limitação e consequência prática."
          />
          <ProcessItem
            number="04"
            title="Entregamos uma decisão"
            body="Use, teste, espere ou evite — e por quê."
          />
        </ol>
      </section>
    </main>
  );
}

function ProcessItem({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <li>
      <span>{number}</span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </li>
  );
}

function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState<ArticleFilter>('all');
  const filteredArticles =
    activeFilter === 'all'
      ? articles
      : articles.filter((article) => article.track === activeFilter);

  return (
    <main>
      <section className="page-hero shell">
        <p className="eyebrow">
          <span className="status-dot" />
          Biblioteca editorial
        </p>
        <h1>Artigos para decidir, não apenas acompanhar.</h1>
        <p>
          Explicações claras, fontes primárias, testes e uma conclusão que você consegue aplicar.
        </p>
      </section>

      <section className="section shell article-index-section">
        <div className="article-filter" aria-label="Filtrar artigos por categoria">
          {articleFilters.map((filter) => (
            <button
              type="button"
              className={activeFilter === filter.value ? 'active' : undefined}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
              key={filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="article-list">
          {filteredArticles.map((article, index) => (
            <InternalLink className="article-list-item" href={article.href} key={article.title}>
              <div className="article-list-number">0{index + 1}</div>
              <div className="article-list-content">
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
              <div className="article-list-action">
                <span>{article.status}</span>
                <strong aria-hidden="true">→</strong>
              </div>
            </InternalLink>
          ))}
          {filteredArticles.length === 0 && (
            <div className="filter-empty-state" role="status">
              <strong>Nenhum artigo publicado nesta trilha ainda.</strong>
              <p>Os próximos conteúdos aparecerão aqui automaticamente.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function LabsPage() {
  const [activeFilter, setActiveFilter] = useState<LabFilter>('all');
  const [securityFilter, setSecurityFilter] = useState<SecurityFilter>('all');
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeSearch(query);
  const filteredLabs = labCatalog.filter((lab) => {
    const matchesCategory = (() => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'security') {
        return (
          lab.project.track === 'security' &&
          (securityFilter === 'all' || lab.project.area === securityFilter)
        );
      }
      if (activeFilter === 'ai') return lab.project.track === 'ai';
      if (activeFilter === 'utilities') return lab.project.collection === 'utilities';
      return lab.project.collection === 'build';
    })();

    if (!matchesCategory || !normalizedQuery) return matchesCategory;

    const searchableContent = [
      lab.project.slug,
      lab.name,
      lab.description,
      lab.category,
      lab.project.area ? SECURITY_AREAS[lab.project.area].label['pt-BR'] : '',
      ...lab.signals,
      ...lab.stack,
    ].join(' ');

    return normalizeSearch(searchableContent).includes(normalizedQuery);
  });

  const resetFilters = () => {
    setActiveFilter('all');
    setSecurityFilter('all');
    setQuery('');
  };

  return (
    <main className="labs-page">
      <section className="labs-page-hero">
        <div className="shell">
          <h1>
            Ferramentas de segurança e utilidades técnicas <span>direto no navegador.</span>
          </h1>
        </div>
      </section>
      <section className="labs-catalog shell">
        <div className="labs-toolbar">
          <label className="labs-search">
            <Search size={19} aria-hidden="true" />
            <span className="sr-only">Buscar nos Labs</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, função ou tecnologia"
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca">
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </label>
          <p className="labs-result-count" aria-live="polite">
            <strong>{filteredLabs.length}</strong>{' '}
            {filteredLabs.length === 1 ? 'Lab encontrado' : 'Labs encontrados'}
          </p>
        </div>
        <div className="labs-filter-stack">
          <div className="labs-filter" aria-label="Filtrar Labs por categoria">
            {labFilters.map((filter) => (
              <button
                type="button"
                className={activeFilter === filter.value ? 'active' : undefined}
                aria-pressed={activeFilter === filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  if (filter.value !== 'security') setSecurityFilter('all');
                }}
                key={filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {activeFilter === 'security' && (
            <div className="security-filter" aria-label="Filtrar Cyber por especialidade">
              {securityFilters.map((filter) => (
                <button
                  type="button"
                  className={securityFilter === filter.value ? 'active' : undefined}
                  aria-pressed={securityFilter === filter.value}
                  onClick={() => setSecurityFilter(filter.value)}
                  key={filter.value}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {filteredLabs.length > 0 ? (
          <div className="labs-catalog-grid">
            {filteredLabs.map((lab) => (
              <LabCard lab={lab} key={lab.name} />
            ))}
          </div>
        ) : (
          <div className="labs-empty-state" role="status">
            <span>0 resultados</span>
            <h2>Nenhum Lab combina com essa busca.</h2>
            <p>Tente outro termo ou volte a visualizar todo o catálogo.</p>
            <button type="button" className="button button-primary" onClick={resetFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function LabCard({ lab }: { lab: (typeof labCatalog)[number] }) {
  return (
    <article className="hub-lab-card">
      <div className="hub-lab-card-top">
        <span className="hub-lab-category">
          <span aria-hidden="true">{lab.categoryIcon}</span>
          {lab.category}
        </span>
        <span className="hub-lab-status">
          <span aria-hidden="true" />
          Online
        </span>
      </div>
      <div className="hub-lab-copy">
        <h3>{lab.name}</h3>
        <p>{lab.description}</p>
      </div>
      <ul className="hub-lab-chips hub-lab-signals" aria-label="Características">
        {lab.signals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>
      <ul className="hub-lab-chips hub-lab-stack" aria-label="Stack técnica">
        {lab.stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className="hub-lab-actions">
        <InternalLink className="hub-lab-action" href={`/labs/${lab.project.slug}`}>
          Ver detalhes <span aria-hidden="true">→</span>
        </InternalLink>
        {lab.liveUrl && (
          <a className="hub-lab-direct-link" href={lab.liveUrl} target="_blank" rel="noreferrer">
            Abrir ferramenta <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function LabDetailPage({ slug }: { slug: string }) {
  const lab = labCatalog.find((item) => item.project.slug === slug);

  if (!lab) {
    return (
      <main className="lab-detail-page">
        <section className="lab-not-found shell">
          <p className="eyebrow">Lab não encontrado</p>
          <h1>Esse endereço não faz parte do catálogo.</h1>
          <p>O projeto pode ter mudado de nome ou ainda não foi publicado.</p>
          <InternalLink className="button button-primary" href="/labs">
            Voltar aos Labs <span aria-hidden="true">→</span>
          </InternalLink>
        </section>
      </main>
    );
  }

  const securityArea = lab.project.area ? SECURITY_AREAS[lab.project.area].label['pt-BR'] : null;

  return (
    <main className="lab-detail-page">
      <section className="lab-detail-hero">
        <div className="shell">
          <InternalLink className="back-link lab-back-link" href="/labs">
            ← Voltar para os Labs
          </InternalLink>
          <div className="lab-detail-hero-grid">
            <div className="lab-detail-intro">
              <div className="lab-detail-meta">
                <span>
                  {lab.categoryIcon} {lab.category}
                </span>
                {securityArea && <span>{securityArea}</span>}
                <span className="lab-detail-live">
                  <i aria-hidden="true" /> Online
                </span>
              </div>
              <h1>{lab.name}</h1>
              <p>{lab.description}</p>
              {lab.liveUrl && (
                <a
                  className="button button-primary lab-detail-primary-action"
                  href={lab.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir ferramenta <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
            <div className="lab-detail-mark" aria-hidden="true">
              <span>{lab.project.slug.slice(0, 2).toUpperCase()}</span>
              <strong>LAB</strong>
              <small>SABION / {lab.project.slug.toUpperCase()}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-detail-content shell">
        <div className="lab-detail-section lab-detail-about">
          <p className="eyebrow">Sobre o Lab</p>
          <h2>Uma ferramenta direta para o trabalho técnico.</h2>
          <p>{lab.description}</p>
        </div>

        <div className="lab-detail-panels">
          <section className="lab-detail-panel">
            <span>COMO OS DADOS SÃO TRATADOS</span>
            <h2>Características</h2>
            <ul className="lab-detail-list">
              {lab.signals.map((signal) => (
                <li key={signal}>
                  <i aria-hidden="true" /> {signal}
                </li>
              ))}
            </ul>
          </section>
          <section className="lab-detail-panel">
            <span>CONSTRUÍDO COM</span>
            <h2>Stack técnica</h2>
            <ul className="lab-detail-list lab-detail-stack">
              {lab.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
        </div>

        {lab.liveUrl && (
          <div className="lab-detail-cta">
            <div>
              <span>PRONTO PARA USAR</span>
              <h2>Abra o Lab direto no navegador.</h2>
            </div>
            <a className="button button-neon" href={lab.liveUrl} target="_blank" rel="noreferrer">
              Acessar {lab.name.split(' — ')[0]} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

function ArticlePage() {
  return (
    <main className="article-page">
      <section className="article-hero shell">
        <InternalLink className="back-link" href="/artigos">
          ← Voltar para artigos
        </InternalLink>
        <div className="article-hero-grid">
          <div>
            <div className="article-meta">
              <span>IA E AGENTES</span>
              <span>7 MIN</span>
              <span>18 JUL 2026</span>
            </div>
            <h1>Sol, Terra ou Luna: qual modelo usar no Codex?</h1>
            <p className="article-deck">
              A OpenAI dividiu o GPT-5.6 em três perfis de trabalho. A diferença não está apenas no
              nome: está no tipo de decisão que cada tarefa exige.
            </p>
            <div className="article-author">
              <img src="/assets/sabion-icon.png" width="42" height="42" alt="" />
              <div>
                <strong>Sabion Labs</strong>
                <span>Pesquisa e veredito técnico</span>
              </div>
            </div>
          </div>
          <div className="article-cover" aria-hidden="true">
            <span className="article-cover-kicker">GPT-5.6 / CODEX</span>
            <div className="article-cover-models">
              <span>SOL</span>
              <span>TERRA</span>
              <span>LUNA</span>
            </div>
            <img src="/assets/sabion-presenter.png" width="520" height="520" alt="" />
            <strong>QUAL A DIFERENÇA?</strong>
          </div>
        </div>
      </section>

      <div className="article-layout shell">
        <aside className="article-aside">
          <span>NESTE ARTIGO</span>
          <a href="#resumo">Em 1 minuto</a>
          <a href="#sol">Sol</a>
          <a href="#terra">Terra</a>
          <a href="#luna">Luna</a>
          <a href="#mapa">Mapa de decisão</a>
          <a href="#fontes">Fontes</a>
        </aside>

        <article className="article-body">
          <section id="resumo">
            <p className="article-opening">
              Se você abriu o seletor do Codex e encontrou Sol, Terra e Luna, pode parecer que a
              decisão é entre “forte, médio e rápido”. Essa leitura é simples demais.
            </p>
            <p>
              A escolha correta começa com outra pergunta:{' '}
              <strong>quanto da tarefa ainda precisa ser descoberto?</strong>
            </p>
            <div className="minute-box">
              <span>EM 1 MINUTO</span>
              <h2>Escolha pelo formato do trabalho.</h2>
              <div className="minute-grid">
                <MinuteItem name="Sol" body="Descobrir o caminho." />
                <MinuteItem name="Terra" body="Executar com julgamento." />
                <MinuteItem name="Luna" body="Repetir e verificar." />
              </div>
            </div>
          </section>

          <section>
            <p className="section-label">ANTES DOS MODELOS</p>
            <h2>O que exatamente mudou?</h2>
            <p>
              O Codex é o agente: ele lê arquivos, modifica projetos, executa comandos e confere
              resultados dentro das permissões disponíveis. Sol, Terra e Luna são modelos GPT-5.6
              que podem realizar esse trabalho com prioridades diferentes.
            </p>
            <blockquote>
              A tarefa não muda apenas de velocidade. Ela muda de profundidade, custo e quantidade
              de julgamento.
            </blockquote>
          </section>

          {modelSections.map((model) => (
            <section
              className={`model-section model-section-${model.accent}`}
              id={model.name.toLowerCase()}
              key={model.name}
            >
              <div className="model-copy">
                <p className="section-label">{model.role}</p>
                <h2>
                  {model.name}: {model.title}
                </h2>
                <p>{model.body}</p>
                <p className="model-examples">{model.examples}</p>
                <div className="rule-box">
                  <span>REGRA SABION</span>
                  <strong>{model.rule}</strong>
                </div>
              </div>
              <img
                src={model.image}
                width="440"
                height="440"
                alt={`Mascote representando o papel do modelo ${model.name}`}
              />
            </section>
          ))}

          <section id="mapa">
            <p className="section-label">MAPA FINAL</p>
            <h2>Não existe um melhor para tudo.</h2>
            <p>
              Existe o modelo adequado ao formato da tarefa — e a menor opção que passa na sua régua
              de qualidade costuma ser a decisão mais eficiente.
            </p>
            <div className="decision-map">
              <DecisionItem number="01" question="Ainda precisa descobrir o caminho?" model="Sol" />
              <DecisionItem
                number="02"
                question="O caminho existe, mas exige julgamento?"
                model="Terra"
              />
              <DecisionItem number="03" question="É repetível e fácil de verificar?" model="Luna" />
            </div>
            <div className="article-cta">
              <img src="/assets/sabion-approved.png" width="260" height="260" alt="" />
              <div>
                <span>NA DÚVIDA</span>
                <h3>Comece com Sol e reduza quando a tarefa ficar clara.</h3>
                <p>Salve este mapa antes de abrir a próxima tarefa.</p>
              </div>
            </div>
          </section>

          <section className="sources-section" id="fontes">
            <p className="section-label">FONTES PRIMÁRIAS</p>
            <h2>Continue na documentação.</h2>
            <a
              href="https://learn.chatgpt.com/docs/models#recommended-models"
              target="_blank"
              rel="noreferrer"
            >
              OpenAI — Choosing Sol, Terra, and Luna <span>↗</span>
            </a>
            <a href="https://learn.chatgpt.com/docs/whats-new" target="_blank" rel="noreferrer">
              OpenAI — What&apos;s new in Codex <span>↗</span>
            </a>
          </section>
        </article>
      </div>
    </main>
  );
}

function MinuteItem({ name, body }: { name: string; body: string }) {
  return (
    <div>
      <strong>{name}</strong>
      <p>{body}</p>
    </div>
  );
}

function DecisionItem({
  number,
  question,
  model,
}: {
  number: string;
  question: string;
  model: string;
}) {
  return (
    <div>
      <span>{number}</span>
      <p>{question}</p>
      <strong>{model}</strong>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="/assets/sabion-icon.png" width="48" height="48" alt="" />
          <div>
            <strong>Sabion Labs</strong>
            <p>Artigos, projetos e experimentos.</p>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORAR</span>
            <InternalLink href="/artigos">Artigos</InternalLink>
            <InternalLink href="/labs">Labs</InternalLink>
          </div>
          <div>
            <span>CONECTAR</span>
            <a href="https://instagram.com/sabion_labs" target="_blank" rel="noreferrer">
              <FaInstagram className="brand-icon" size={17} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Sabion Labs</span>
        <span>Conteúdo, código e experimentos.</span>
      </div>
    </footer>
  );
}

function InternalLink({
  href,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function setMeta(name: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (element) element.content = content;
}

function setProperty(property: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (element) element.content = content;
}
