import type { Project } from './types';

// Curated project catalog.
//
// Only published projects should live here. If a project is not meant to be
// public yet, keep it out of this list.

export const projects: Project[] = [
  {
    slug: 'solucoes-cyber',
    name: {
      en: 'Cyber Solutions — Solution catalog',
      'pt-BR': 'Soluções Cyber — Catálogo de soluções',
    },
    description: {
      en: 'A browser-based catalog for exploring security solutions by category, comparing options side by side, and matching tools to your scenario.',
      'pt-BR':
        'Catálogo de soluções de segurança: explore por categoria, compare soluções lado a lado e descubra o que se encaixa no seu cenário.',
    },
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/solucoes-cyber/',
    repoUrl: 'https://github.com/sergiogbernardo/solucoes-cyber',
    featured: true,
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'learn',
  },
  {
    slug: 'copa-2026',
    name: {
      en: 'World Cup 2026 — Live tracker',
      'pt-BR': 'Copa 2026 — Ao vivo',
    },
    description: {
      en: 'Follow World Cup 2026 fixtures, scores, groups, and insights with a Cloudflare Worker API proxy.',
      'pt-BR':
        'Acompanhe a Copa do Mundo 2026 em tempo real: jogos, placares, grupos e insights com proxy em Cloudflare Worker.',
    },
    track: 'other',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Cloudflare Workers'],
    liveUrl: '/copa-2026/',
    repoUrl: 'https://github.com/sergiogbernardo/copa-2026',
    signals: ['externalApi', 'publicData', 'noAccount'],
    collection: 'utilities',
  },
  {
    slug: 'certification-roadmap',
    name: {
      en: 'Certification Roadmap',
      'pt-BR': 'Certification Roadmap — Trilhas de certificações',
    },
    description: {
      en: 'An interactive cybersecurity certification map by domain and seniority, with profile guidance and learning paths.',
      'pt-BR':
        'Mapa interativo de certificações de cibersegurança por domínio e senioridade, com trilhas e avaliação de perfil.',
    },
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Certification-Roadmap/',
    repoUrl: 'https://github.com/sergiogbernardo/Certification-Roadmap',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'learn',
  },
  {
    slug: 'translatorvg',
    name: { en: 'Translatorvg', 'pt-BR': 'Translatorvg' },
    description: {
      en: 'A GitHub Pages translator with configurable endpoint, favorites, and local history.',
      'pt-BR':
        'Versão GitHub Pages do tradutor, com endpoint configurável, favoritos e histórico local.',
    },
    track: 'ai',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://sabion.io/Translatorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Translatorvg',
    signals: ['externalApi', 'browserStorage', 'noAccount'],
    collection: 'utilities',
  },
  {
    slug: 'bytevg',
    name: { en: 'Bytevg — Byte toolkit', 'pt-BR': 'Bytevg — Canivete de bytes' },
    description: {
      en: 'Developer and security utilities for encode/decode, hashing, AES, entropy, subnets, passwords, and UUIDs.',
      'pt-BR':
        'Ferramentas de dev e segurança no navegador: encode/decode, hash, AES, entropia, subnet, senha e UUID.',
    },
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sabion.io/Bytevg/',
    repoUrl: 'https://github.com/sergiogbernardo/Bytevg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'build',
  },
  {
    slug: 'scanvg',
    name: {
      en: 'Scanvg — Scan command builder',
      'pt-BR': 'Scanvg — Gerador de comandos de scan',
    },
    description: {
      en: 'Build nmap, masscan, rustscan, and host discovery commands with port references and browser-side network context.',
      'pt-BR':
        'Monte comandos de nmap, masscan, rustscan e descoberta de rede, com referência de portas e contexto da conexão.',
    },
    track: 'security',
    area: 'offensive',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Scanvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Scanvg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'build',
  },
  {
    slug: 'inspectorvg',
    name: { en: 'Inspectorvg — File inspector', 'pt-BR': 'Inspectorvg — Inspetor de arquivos' },
    description: {
      en: 'Inspect files locally: hashes, entropy, magic bytes, strings, IOCs, secrets, hex dump, and metadata. No bytes are uploaded.',
      'pt-BR':
        'Inspecione arquivos localmente: hashes, entropia, magic bytes, strings, IOCs, segredos, hex dump e metadados.',
    },
    track: 'security',
    area: 'forensics',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sabion.io/Inspectorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Inspectorvg',
    featured: true,
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'analyze',
  },
  {
    slug: 'loghivevg',
    name: { en: 'Loghivevg — Log and text analysis', 'pt-BR': 'Loghivevg — Análise de logs e texto' },
    description: {
      en: 'Parse logs and text in the browser, test regex, extract IOCs, and encode/decode common formats.',
      'pt-BR':
        'Analise logs e texto no navegador: parsers, laboratório de regex, extração de IOCs e encode/decode.',
    },
    track: 'security',
    area: 'forensics',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Loghivevg/',
    repoUrl: 'https://github.com/sergiogbernardo/Loghivevg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'analyze',
  },
  {
    slug: 'cryptovg',
    name: { en: 'Cryptovg — Password and secret vault', 'pt-BR': 'Cryptovg — Cofre de senhas e segredos' },
    description: {
      en: 'Generate and analyze passwords, passphrases, and TOTP locally, with HIBP breach checks that do not expose the password.',
      'pt-BR':
        'Gere e analise senhas, passphrases e TOTP localmente, com checagem HIBP sem expor a senha.',
    },
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Web Crypto', 'zxcvbn'],
    liveUrl: 'https://sabion.io/Cryptovg/',
    repoUrl: 'https://github.com/sergiogbernardo/Cryptovg',
    signals: ['clientSide', 'local', 'externalApi', 'noAccount'],
    collection: 'build',
  },
  {
    slug: 'certvg',
    name: {
      en: 'Certvg — Certificate and token inspector',
      'pt-BR': 'Certvg — Inspetor de certificados e tokens',
    },
    description: {
      en: 'Decode X.509 certificates, chains, CSRs, and JWTs locally: validity, SANs, algorithms, and claims.',
      'pt-BR':
        'Decodifique certificados X.509, cadeias, CSRs e JWTs localmente: validade, SAN, algoritmos e claims.',
    },
    track: 'security',
    area: 'crypto',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', '@peculiar/x509', 'jose'],
    liveUrl: 'https://sabion.io/Certvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Certvg',
    featured: true,
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'analyze',
  },
  {
    slug: 'headersvg',
    name: {
      en: 'Headersvg — Security headers auditor',
      'pt-BR': 'Headersvg — Auditor de headers de segurança',
    },
    description: {
      en: 'Analyze HTTP security headers and CSP, grade the posture, and identify missing controls such as HSTS and X-Frame-Options.',
      'pt-BR':
        'Analise headers HTTP e CSP, receba uma nota e veja controles ausentes como HSTS, CSP e X-Frame.',
    },
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Headersvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Headersvg',
    signals: ['externalApi', 'noAccount'],
    collection: 'analyze',
  },
  {
    slug: 'payloadvg',
    name: { en: 'Payloadvg — Payload library', 'pt-BR': 'Payloadvg — Biblioteca de payloads' },
    description: {
      en: 'Parameterized reverse shells, payload catalog, and encoders for authorized pentest labs and CTF practice.',
      'pt-BR':
        'Reverse shells parametrizáveis, catálogo de payloads e encoders para pentest autorizado e CTF.',
    },
    track: 'security',
    area: 'offensive',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Payloadvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Payloadvg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'build',
  },
  {
    slug: 'threatvg',
    name: {
      en: 'Threatvg — Risk matrix and MITRE ATT&CK',
      'pt-BR': 'Threatvg — Matriz de risco e MITRE ATT&CK',
    },
    description: {
      en: 'Build risk matrices, STRIDE threat models, and MITRE ATT&CK mappings with local export.',
      'pt-BR':
        'Monte matriz de risco, modelagem STRIDE e seleção de técnicas MITRE ATT&CK com exportação local.',
    },
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sabion.io/Threatvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Threatvg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'learn',
  },
  {
    slug: 'exvul',
    name: { en: 'Exvul — Exposures & Vulnerabilities', 'pt-BR': 'Exvul — Exposições & Vulnerabilidades' },
    description: {
      en: 'Explore recent high and critical CVEs plus the CISA KEV catalog with CWE mapping, severity filters, and exploitation context.',
      'pt-BR':
        'Explore CVEs recentes e o catálogo KEV da CISA com mapeamento CWE, filtros por severidade e exploração ativa.',
    },
    track: 'security',
    area: 'appsec',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'NVD API', 'CISA KEV'],
    liveUrl: 'https://sabion.io/exvul/',
    repoUrl: 'https://github.com/sergiogbernardo/exvul',
    signals: ['local', 'publicData', 'externalApi', 'noAccount'],
    collection: 'analyze',
  },
  {
    slug: 'calculadoravg',
    name: { en: 'Calculadoravg — Notepad calculator', 'pt-BR': 'Calculadoravg — Calculadora notepad' },
    description: {
      en: 'A notepad-style calculator with variables, units, functions, symbolic algebra, charts, and financial mode.',
      'pt-BR':
        'Calculadora estilo notepad com variáveis, unidades, funções, álgebra simbólica, gráficos e modo financeiro.',
    },
    track: 'other',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'math.js'],
    liveUrl: 'https://sabion.io/Calculadoravg/',
    repoUrl: 'https://github.com/sergiogbernardo/Calculadoravg',
    signals: ['clientSide', 'local', 'noUpload', 'noAccount'],
    collection: 'utilities',
  },
];
