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
];
