import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './certifications.css';

type Area = 'ambiente' | 'resposta' | 'caca';
type Question = {
  area: Area;
  prompt: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
  source: string;
};

const areaNames: Record<Area, string> = {
  ambiente: 'Ambiente e detecção',
  resposta: 'Resposta a incidentes',
  caca: 'Caça a ameaças e KQL',
};

const questions: Question[] = [
  {
    area: 'ambiente',
    prompt:
      'Em qual tabela do Sentinel aparecem os eventos coletados pelo conector Windows Security Events via AMA?',
    options: ['WindowsEvent', 'SecurityEvent', 'SigninLogs', 'DeviceEvents'],
    answer: 1,
    explanation:
      'Esse conector grava os eventos na tabela SecurityEvent. O conector Windows Forwarded Events usa WindowsEvent.',
    source: 'https://learn.microsoft.com/en-us/azure/sentinel/windows-security-event-id-reference',
  },
  {
    area: 'ambiente',
    prompt:
      'Uma consulta KQL precisa rodar em intervalos definidos e gerar alertas conforme seus resultados. Que recurso usar?',
    options: ['Workbook', 'Regra analítica agendada', 'Conector de dados', 'Playbook manual'],
    answer: 1,
    explanation:
      'Uma regra analítica agendada executa a consulta periodicamente e produz alertas quando o resultado atende às condições configuradas.',
    source: 'https://learn.microsoft.com/en-us/azure/sentinel/scheduled-rules-overview',
  },
  {
    area: 'ambiente',
    prompt:
      'No Defender XDR, a partir de qual recurso é possível criar uma detecção personalizada baseada em eventos?',
    options: [
      'Política de acesso condicional',
      'Workbook do Sentinel',
      'Caça avançada',
      'Regra de coleta AMA',
    ],
    answer: 2,
    explanation:
      'Detecções personalizadas usam consultas de caça avançada para gerar alertas e, quando configuradas, ações de resposta.',
    source: 'https://learn.microsoft.com/en-us/defender-xdr/custom-detections-overview',
  },
  {
    area: 'ambiente',
    prompt:
      'Um incidente novo deve abrir um ticket externo automaticamente. Qual combinação atende a esse fluxo no Sentinel?',
    options: [
      'Workbook e consulta salva',
      'Conector AMA e regra de coleta',
      'Regra de automação e playbook',
      'Tabela personalizada e notebook',
    ],
    answer: 2,
    explanation:
      'A regra de automação pode reagir à criação do incidente e chamar um playbook baseado em Azure Logic Apps para executar o fluxo.',
    source: 'https://learn.microsoft.com/en-us/azure/sentinel/automation/run-playbooks',
  },
  {
    area: 'resposta',
    prompt:
      'Uma regra analítica gera alertas, mas a equipe não quer criar incidentes automaticamente. Que configuração revisar?',
    options: [
      'Retenção dos logs',
      'Criação de incidentes na regra',
      'Frequência do workbook',
      'Nome do conector',
    ],
    answer: 1,
    explanation:
      'A criação de incidentes a partir dos alertas pode ser habilitada ou desabilitada nas configurações da regra analítica.',
    source: 'https://learn.microsoft.com/en-us/azure/sentinel/scheduled-rules-overview',
  },
  {
    area: 'resposta',
    prompt:
      'A equipe quer reunir alertas relacionados em um único incidente. Que opção da regra analítica deve considerar?',
    options: [
      'Tabela personalizada',
      'Regra de coleta',
      'Playbook manual',
      'Agrupamento de alertas',
    ],
    answer: 3,
    explanation:
      'O agrupamento de alertas permite reunir alertas produzidos pela regra em um único incidente, conforme os critérios configurados.',
    source: 'https://learn.microsoft.com/en-us/azure/sentinel/scheduled-rules-overview',
  },
  {
    area: 'caca',
    prompt: 'Qual operador KQL mantém somente as linhas que satisfazem uma condição?',
    options: ['summarize', 'join', 'where', 'project-away'],
    answer: 2,
    explanation:
      'where filtra a entrada e retorna somente as linhas para as quais o predicado é verdadeiro.',
    source: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/whereoperator',
  },
  {
    area: 'caca',
    prompt:
      'Você quer contar eventos por dispositivo. Qual operador KQL agrupa as linhas e calcula essa contagem?',
    options: ['sort', 'summarize', 'take', 'where'],
    answer: 1,
    explanation:
      'summarize combina registros por campos indicados em by e calcula agregações como count().',
    source: 'https://learn.microsoft.com/en-us/azure/kusto/query/summarizeoperator',
  },
];

const studyAreas = [
  {
    number: '01',
    title: 'Gerenciar o ambiente',
    weight: '40–45%',
    description:
      'Ingestão de dados, detecção, automação e configuração do Defender XDR e Sentinel.',
  },
  {
    number: '02',
    title: 'Responder a incidentes',
    weight: '35–40%',
    description:
      'Triagem, investigação, contenção e resposta nas ferramentas de segurança Microsoft.',
  },
  {
    number: '03',
    title: 'Caçar ameaças',
    weight: '20–25%',
    description: 'KQL, caça avançada, hipóteses, consultas e relações entre entidades.',
  },
];

function CertLink({
  href,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <a href={href} onClick={navigate} {...props}>
      {children}
    </a>
  );
}

export function CertificationsPage() {
  return (
    <main className="cert-page">
      <section className="cert-hero shell">
        <p className="eyebrow">Aprender · praticar · revisar</p>
        <h1>Certificações com contexto e prática.</h1>
        <p>
          Guias de estudo e perguntas comentadas para transformar o conteúdo do exame em decisões
          técnicas. Começamos pela Microsoft SC-200.
        </p>
      </section>
      <section className="cert-section shell" aria-labelledby="cert-list-title">
        <div className="cert-section-heading">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 id="cert-list-title">Escolha uma certificação</h2>
          </div>
          <span>01 trilha disponível</span>
        </div>
        <article className="cert-feature-card">
          <div>
            <span className="cert-pill">Microsoft · Segurança</span>
            <h3>SC-200</h3>
            <p className="cert-feature-subtitle">Security Operations Analyst Associate</p>
            <p>Defender XDR, Sentinel, resposta a incidentes e caça a ameaças com KQL.</p>
          </div>
          <div className="cert-feature-action">
            <span>Guia + 8 perguntas comentadas</span>
            <CertLink className="button button-primary" href="/certificacoes/sc-200">
              Começar a estudar <span aria-hidden="true">→</span>
            </CertLink>
          </div>
        </article>
      </section>
    </main>
  );
}

export function Sc200Page() {
  const [area, setArea] = useState<Area | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const list = questions.filter((question) => area === 'all' || question.area === area);
  const current = list[index];
  const complete = index >= list.length;

  function reset(nextArea: Area | 'all' = area) {
    setArea(nextArea);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
  }

  function advance() {
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  return (
    <main className="cert-page sc200-page">
      <section className="cert-hero shell">
        <CertLink className="cert-back" href="/certificacoes">
          ← Todas as certificações
        </CertLink>
        <p className="eyebrow">Microsoft · Segurança</p>
        <h1>SC-200: estude, responda, entenda.</h1>
        <p>
          Um roteiro pelos objetivos do exame e questões comentadas para testar o raciocínio. O
          conteúdo acompanha os objetivos em inglês publicados em 21 de outubro de 2026.
        </p>
        <div className="cert-hero-actions">
          <a className="button button-primary" href="#questoes">
            Praticar questões <span aria-hidden="true">↓</span>
          </a>
          <a
            className="button button-secondary"
            href="https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-200"
            target="_blank"
            rel="noreferrer"
          >
            Ver guia oficial ↗
          </a>
        </div>
      </section>

      <section className="cert-section shell" aria-labelledby="sc200-areas">
        <div className="cert-section-heading">
          <div>
            <p className="eyebrow">Mapa do exame</p>
            <h2 id="sc200-areas">Três áreas para dominar</h2>
          </div>
        </div>
        <div className="cert-area-grid">
          {studyAreas.map((item) => (
            <article className="cert-area-card" key={item.number}>
              <div>
                <span>{item.number}</span>
                <strong>{item.weight}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cert-section shell" id="questoes" aria-labelledby="sc200-questions">
        <div className="cert-section-heading">
          <div>
            <p className="eyebrow">Prática guiada</p>
            <h2 id="sc200-questions">Questões comentadas</h2>
          </div>
          <span>8 questões originais</span>
        </div>
        <p className="cert-intro">
          Escolha uma área, responda e consulte a documentação vinculada à explicação. O resultado é
          apenas um diagnóstico de estudo.
        </p>
        <div className="cert-quiz-toolbar">
          <label htmlFor="cert-area">Filtrar por área</label>
          <select
            id="cert-area"
            value={area}
            onChange={(event) => reset(event.target.value as Area | 'all')}
          >
            <option value="all">Todas as áreas</option>
            {Object.entries(areaNames).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <span aria-live="polite">
            {complete ? `Resultado: ${score}/${list.length}` : `Acertos: ${score}/${index}`}
          </span>
        </div>
        <div className="cert-progress" aria-hidden="true">
          <span style={{ width: `${(complete ? 1 : index / list.length) * 100}%` }} />
        </div>
        {complete ? (
          <div className="cert-question-card" role="status">
            <p className="cert-question-meta">Sessão concluída</p>
            <h3>
              {score} de {list.length} respostas corretas
            </h3>
            <p>
              Revise as explicações e tente novamente. O placar não equivale à pontuação oficial da
              prova.
            </p>
            <button type="button" className="button button-primary" onClick={() => reset()}>
              Recomeçar
            </button>
          </div>
        ) : (
          <div className="cert-question-card" key={`${area}-${index}`}>
            <p className="cert-question-meta">
              {areaNames[current.area]} · Pergunta {index + 1} de {list.length}
            </p>
            <h3>{current.prompt}</h3>
            <fieldset className="cert-options" disabled={checked}>
              <legend className="sr-only">Escolha uma resposta</legend>
              {current.options.map((option, choice) => (
                <label
                  key={option}
                  className={
                    checked && choice === current.answer
                      ? 'is-correct'
                      : checked && choice === selected
                        ? 'is-wrong'
                        : ''
                  }
                >
                  <input
                    type="radio"
                    name="sc200-answer"
                    checked={selected === choice}
                    onChange={() => setSelected(choice)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
            {!checked ? (
              <button
                type="button"
                className="button button-primary"
                disabled={selected === null}
                onClick={() => {
                  if (selected === current.answer) setScore((value) => value + 1);
                  setChecked(true);
                }}
              >
                Conferir resposta
              </button>
            ) : (
              <>
                <div
                  className={`cert-answer ${selected === current.answer ? 'is-correct' : 'is-wrong'}`}
                  role="status"
                >
                  <strong>
                    {selected === current.answer
                      ? 'Correto!'
                      : `Resposta: ${current.options[current.answer]}`}
                  </strong>
                  <p>{current.explanation}</p>
                  <a href={current.source} target="_blank" rel="noreferrer">
                    Conferir na documentação ↗
                  </a>
                </div>
                <button type="button" className="button button-primary" onClick={advance}>
                  {index === list.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}
                </button>
              </>
            )}
          </div>
        )}
      </section>

      <section className="cert-section cert-resources shell" aria-labelledby="sc200-resources">
        <div className="cert-section-heading">
          <div>
            <p className="eyebrow">Continuar estudando</p>
            <h2 id="sc200-resources">Fontes e prática adicional</h2>
          </div>
        </div>
        <a
          href="https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-200"
          target="_blank"
          rel="noreferrer"
        >
          Habilidades medidas no SC-200 <span>↗</span>
        </a>
        <a
          href="https://learn.microsoft.com/pt-br/credentials/certifications/security-operations-analyst/"
          target="_blank"
          rel="noreferrer"
        >
          Certificação e avaliação prática Microsoft <span>↗</span>
        </a>
        <p>
          As perguntas desta página são autorais. Cada explicação aponta para documentação técnica,
          que pode mudar com o produto.
        </p>
      </section>
    </main>
  );
}
