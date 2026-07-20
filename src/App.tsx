import { useEffect, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa6';
import MatrixRain from './components/MatrixRain';
import { projects } from './data/projects';
import { TRACKS } from './data/types';
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
  },
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
    const metadata = {
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
    }[route.name];

    document.title = metadata.title;
    setMeta('description', metadata.description);
    setMeta('twitter:title', metadata.title);
    setMeta('twitter:description', metadata.description);
    setProperty('og:title', metadata.title);
    setProperty('og:description', metadata.description);
    setProperty('og:url', window.location.href);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = window.location.href;
  }, [route.name]);

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
  routeName: 'home' | 'articles' | 'article' | 'labs';
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}) {
  const navItems = [
    { href: '/', label: 'Início', active: routeName === 'home' },
    {
      href: '/artigos',
      label: 'Artigos',
      active: routeName === 'articles' || routeName === 'article',
    },
    { href: '/labs', label: 'Labs', active: routeName === 'labs' },
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <InternalLink className="brand" href="/" aria-label="Sabion Labs — início">
          <img src="/assets/sabion-icon.png" width="36" height="36" alt="" />
          <strong>Sabion Labs</strong>
        </InternalLink>

        <nav aria-label="Navegação principal">
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
          <a
            className="instagram-link"
            href="https://instagram.com/sabion_labs"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="brand-icon" size={16} aria-hidden="true" />
            @sabion_labs
          </a>
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
        </div>
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
                Não existe um melhor para tudo. Existe o modelo certo para cada tipo de
                trabalho.
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
          <p>
            Uma publicação de terceiro pode apontar o assunto. Nunca será a nossa única
            fonte.
          </p>
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
  return (
    <main>
      <section className="page-hero shell">
        <p className="eyebrow">
          <span className="status-dot" />
          Biblioteca editorial
        </p>
        <h1>Artigos para decidir, não apenas acompanhar.</h1>
        <p>
          Explicações claras, fontes primárias, testes e uma conclusão que você consegue
          aplicar.
        </p>
      </section>

      <section className="section shell article-index-section">
        <div className="article-filter" aria-label="Categorias">
          <span className="active">Todos</span>
          <span>IA e agentes</span>
          <span>Cyber</span>
          <span>Dev e ferramentas</span>
          <span>Labs</span>
        </div>
        <div className="article-list">
          {articles.map((article, index) => (
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
        </div>
      </section>
    </main>
  );
}

function LabsPage() {
  return (
    <main className="labs-page">
      <section className="labs-page-hero">
        <div className="shell">
          <h1>
            Ferramentas de segurança e utilidades técnicas{' '}
            <span>direto no navegador.</span>
          </h1>
        </div>
      </section>
      <section className="labs-catalog shell">
        <div className="labs-filter" aria-label="Categorias">
          <span className="active">Todos</span>
          <span>Segurança</span>
          <span>Dev</span>
          <span>Utilidades</span>
          <span>IA</span>
        </div>
        <div className="labs-catalog-grid">
          {labCatalog.map((lab) => (
            <LabCard lab={lab} key={lab.name} />
          ))}
        </div>
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
      {lab.liveUrl && (
        <a className="hub-lab-action" href={lab.liveUrl} target="_blank" rel="noreferrer">
          Abrir ferramenta <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
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
              A OpenAI dividiu o GPT-5.6 em três perfis de trabalho. A diferença não está
              apenas no nome: está no tipo de decisão que cada tarefa exige.
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
              Se você abriu o seletor do Codex e encontrou Sol, Terra e Luna, pode
              parecer que a decisão é entre “forte, médio e rápido”. Essa leitura é
              simples demais.
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
              O Codex é o agente: ele lê arquivos, modifica projetos, executa comandos e
              confere resultados dentro das permissões disponíveis. Sol, Terra e Luna
              são modelos GPT-5.6 que podem realizar esse trabalho com prioridades
              diferentes.
            </p>
            <blockquote>
              A tarefa não muda apenas de velocidade. Ela muda de profundidade, custo e
              quantidade de julgamento.
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
              Existe o modelo adequado ao formato da tarefa — e a menor opção que passa
              na sua régua de qualidade costuma ser a decisão mais eficiente.
            </p>
            <div className="decision-map">
              <DecisionItem number="01" question="Ainda precisa descobrir o caminho?" model="Sol" />
              <DecisionItem
                number="02"
                question="O caminho existe, mas exige julgamento?"
                model="Terra"
              />
              <DecisionItem
                number="03"
                question="É repetível e fácil de verificar?"
                model="Luna"
              />
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
            <a
              href="https://learn.chatgpt.com/docs/whats-new"
              target="_blank"
              rel="noreferrer"
            >
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
