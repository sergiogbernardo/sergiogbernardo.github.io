import type { Project } from './types';

// Curated project catalog.
//
// Only published projects should live here. If a project is not meant to be
// public yet, keep it out of this list.

export const projects: Project[] = [
  {
    slug: 'solucoes-cyber',
    name: 'Soluções Cyber — Catálogo de soluções',
    description:
      'Catálogo de soluções de segurança de mercado: explore por categoria, compare soluções lado a lado e responda algumas perguntas para descobrir o que se encaixa no seu cenário. Tudo no navegador.',
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/solucoes-cyber/',
    repoUrl: 'https://github.com/sergiogbernardo/solucoes-cyber',
  },
  {
    slug: 'copa-2026',
    name: 'Copa 2026 — Ao vivo',
    description:
      'Acompanhe a Copa do Mundo 2026 em tempo real: jogos, placares, grupos e insights.',
    track: 'other',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Cloudflare Workers'],
    liveUrl: '/copa-2026/',
    repoUrl: 'https://github.com/sergiogbernardo/copa-2026',
    featured: true,
  },
  {
    slug: 'certification-roadmap',
    name: 'Certification Roadmap — Trilhas de certificações',
    description:
      'Mapa interativo de certificações de cibersegurança: explore por domínio e senioridade, monte sua trilha a partir de uma cert e avalie seu perfil. Tudo no navegador.',
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Certification-Roadmap/',
    repoUrl: 'https://github.com/sergiogbernardo/Certification-Roadmap',
    featured: true,
  },
  {
    slug: 'translatorvg',
    name: 'Translatorvg',
    description:
      'Versão GitHub Pages do tradutor, com endpoint configurável, favoritos e histórico local.',
    track: 'ai',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://sabion.io/Translatorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Translatorvg',
  },
  {
    slug: 'bytevg',
    name: 'Bytevg — Canivete de bytes',
    description:
      'Ferramentas de dev e segurança no navegador: encode/decode, hash, AES e análise (entropia, subnet, senha, UUID).',
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sabion.io/Bytevg/',
    repoUrl: 'https://github.com/sergiogbernardo/Bytevg',
  },
  {
    slug: 'scanvg',
    name: 'Scanvg — Gerador de comandos de scan',
    description:
      'Monta comandos de nmap, masscan, rustscan e descoberta de rede, com referência de portas e recon da sua conexão — tudo no navegador.',
    track: 'security',
    area: 'offensive',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Scanvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Scanvg',
  },
  {
    slug: 'inspectorvg',
    name: 'Inspectorvg — Inspetor de arquivos',
    description:
      'Inspeciona qualquer arquivo no navegador: hashes, entropia, magic bytes, strings, IOCs/segredos, hex dump e metadados. Nenhum byte é enviado.',
    track: 'security',
    area: 'forensics',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sabion.io/Inspectorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Inspectorvg',
  },
  {
    slug: 'loghivevg',
    name: 'Loghivevg — Análise de logs e texto',
    description:
      'Kit de análise de logs e texto no navegador: parser (Apache, Nginx, syslog, SSH, iptables…), laboratório de regex, extração de IOCs e encode/decode.',
    track: 'security',
    area: 'forensics',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Loghivevg/',
    repoUrl: 'https://github.com/sergiogbernardo/Loghivevg',
  },
  {
    slug: 'cryptovg',
    name: 'Cryptovg — Cofre de senhas e segredos',
    description:
      'Gera e analisa senhas, passphrases e TOTP no navegador e checa vazamentos (HIBP) sem expor a senha. Tudo local.',
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Web Crypto', 'zxcvbn'],
    liveUrl: 'https://sabion.io/Cryptovg/',
    repoUrl: 'https://github.com/sergiogbernardo/Cryptovg',
  },
  {
    slug: 'certvg',
    name: 'Certvg — Inspetor de certificados e tokens',
    description:
      'Decodifica certificados X.509, cadeias, CSRs e JWTs no navegador: validade, SAN, algoritmos e claims. Nada é enviado.',
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', '@peculiar/x509', 'jose'],
    liveUrl: 'https://sabion.io/Certvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Certvg',
  },
  {
    slug: 'headersvg',
    name: 'Headersvg — Auditor de headers de segurança',
    description:
      'Analisa headers HTTP e CSP no navegador, dá uma nota (A+..F) e aponta o que falta (HSTS, CSP, X-Frame e mais).',
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Headersvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Headersvg',
  },
  {
    slug: 'payloadvg',
    name: 'Payloadvg — Biblioteca de payloads',
    description:
      'Reverse shells parametrizáveis, catálogo de payloads (XSS, SQLi, LFI, SSTI, SSRF) e encoders no navegador. Para pentest autorizado e CTF.',
    track: 'security',
    area: 'offensive',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Payloadvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Payloadvg',
  },
  {
    slug: 'threatvg',
    name: 'Threatvg — Matriz de risco e MITRE ATT&CK',
    description:
      'Monta matriz de risco (probabilidade × impacto), modelagem STRIDE e seleção de técnicas do MITRE ATT&CK, com exportação. Tudo local.',
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Threatvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Threatvg',
  },
  {
    slug: 'exvul',
    name: 'Exvul — Exposições & Vulnerabilidades',
    description:
      'Navegue CVEs recentes (alta/crítica) e o catálogo KEV da CISA com suas fraquezas CWE: filtre por severidade, CWE e exploração ativa. Dados de NVD/CISA atualizados via GitHub Actions, tudo no navegador.',
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'NVD API', 'CISA KEV'],
    liveUrl: 'https://sabion.io/exvul/',
    repoUrl: 'https://github.com/sergiogbernardo/exvul',
  },
  {
    slug: 'calculadoravg',
    name: 'Calculadoravg — Calculadora notepad',
    description:
      'Calculadora estilo notepad: várias linhas com variáveis, unidades, funções, álgebra simbólica e gráficos. Mais teclado clássico e modo financeiro.',
    track: 'other',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'math.js'],
    liveUrl: 'https://sabion.io/Calculadoravg/',
    repoUrl: 'https://github.com/sergiogbernardo/Calculadoravg',
  },
];
