/// <reference types="vitest/config" />
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { projects } from './src/data/projects';

const SITE_URL = 'https://sabion.io';
const DEFAULT_TITLE = 'Sabion Labs — Artigos, Soluções e Laboratórios';
const DEFAULT_DESCRIPTION = 'Labs de cibersegurança, desenvolvimento e inteligência artificial.';

// User site (https://sabion.io) is served from the root.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const index = resolve('dist/index.html');
        const html = readFileSync(index, 'utf8');

        writeFileSync(
          index,
          renderStaticPage(html, {
            title: DEFAULT_TITLE,
            description: DEFAULT_DESCRIPTION,
            url: `${SITE_URL}/`,
          }),
        );
        copyFileSync(index, resolve('dist/404.html'));

        const staticRoutes = [
          {
            path: 'artigos',
            title: 'Artigos | Sabion Labs',
            description:
              'Análises, guias e testes sobre IA, agentes, cibersegurança e desenvolvimento.',
          },
          {
            path: 'artigos/sol-terra-luna',
            title: 'Sol, Terra ou Luna: qual modelo usar no Codex? | Sabion Labs',
            description:
              'Entenda a diferença entre os modelos GPT-5.6 Sol, Terra e Luna e escolha pelo formato da tarefa.',
          },
          {
            path: 'labs',
            title: 'Labs | Sabion Labs',
            description:
              'Ferramentas técnicas da Sabion Labs para segurança, desenvolvimento e produtividade.',
          },
          ...projects.map((project) => ({
            path: `labs/${project.slug}`,
            title: `${project.name['pt-BR']} | Sabion Labs`,
            description: project.description['pt-BR'],
          })),
        ];

        staticRoutes.forEach((route) => {
          const routeDir = resolve(`dist/${route.path}`);
          mkdirSync(routeDir, { recursive: true });
          writeFileSync(
            resolve(routeDir, 'index.html'),
            renderStaticPage(html, {
              title: route.title,
              description: route.description,
              url: `${SITE_URL}/${route.path}`,
            }),
          );
        });
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});

function renderStaticPage(
  html: string,
  meta: {
    title: string;
    description: string;
    url: string;
  },
) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = escapeHtml(meta.url);

  return html
    .replace(/<html lang="[^"]*"/, '<html lang="pt-BR"')
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
