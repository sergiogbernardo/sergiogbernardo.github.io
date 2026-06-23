import type { Project } from './types';

// Curated project catalog.
//
// Only published projects should live here. If a project is not meant to be
// public yet, keep it out of this list.

export const projects: Project[] = [
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
    slug: 'translatorvg',
    name: 'Translatorvg',
    description:
      'Versão GitHub Pages do tradutor, com endpoint configurável, favoritos e histórico local.',
    track: 'ai',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://sergiogbernardo.github.io/Translatorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Translatorvg',
  },
  {
    slug: 'bytevg',
    name: 'Bytevg — Canivete de bytes',
    description:
      'Ferramentas de dev e segurança no navegador: encode/decode, hash, AES e análise (entropia, subnet, senha, UUID).',
    track: 'security',
    status: 'live',
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sergiogbernardo.github.io/Bytevg/',
    repoUrl: 'https://github.com/sergiogbernardo/Bytevg',
  },
  {
    slug: 'scanvg',
    name: 'Scanvg — Gerador de comandos de scan',
    description:
      'Monta comandos de nmap, masscan, rustscan e descoberta de rede, com referência de portas e recon da sua conexão — tudo no navegador.',
    track: 'security',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://sergiogbernardo.github.io/Scanvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Scanvg',
  },
  {
    slug: 'inspectorvg',
    name: 'Inspectorvg — Inspetor de arquivos',
    description:
      'Inspeciona qualquer arquivo no navegador: hashes, entropia, magic bytes, strings, IOCs/segredos, hex dump e metadados. Nenhum byte é enviado.',
    track: 'security',
    status: 'live',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Web Crypto', 'hash-wasm'],
    liveUrl: 'https://sergiogbernardo.github.io/Inspectorvg/',
    repoUrl: 'https://github.com/sergiogbernardo/Inspectorvg',
  },
];
