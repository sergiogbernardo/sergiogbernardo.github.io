/// <reference types="vitest/config" />
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { projects } from './src/data/projects';

const SITE_URL = 'https://sabion.io';
const DEFAULT_TITLE = 'Sabion Labs — Security Tools and Technical Utilities';
const DEFAULT_DESCRIPTION =
  'Browser-based security tools, technical utilities, and experiments built by Sergio Bernardo.';

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

        mkdirSync(resolve('dist/privacy'), { recursive: true });
        writeFileSync(
          resolve('dist/privacy/index.html'),
          renderStaticPage(html, {
            title: 'Privacy and Cookies | Sabion Labs',
            description:
              'Privacy-first analytics, local browser preferences, and cookie model for Sabion Labs.',
            url: `${SITE_URL}/privacy`,
          }),
        );

        projects.forEach((project) => {
          const labDir = resolve(`dist/labs/${project.slug}`);
          mkdirSync(labDir, { recursive: true });
          writeFileSync(
            resolve(labDir, 'index.html'),
            renderStaticPage(html, {
              title: `${project.name.en} | Sabion Labs`,
              description: project.description.en,
              url: `${SITE_URL}/labs/${project.slug}`,
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
    .replace(/<html lang="[^"]*"/, '<html lang="en"')
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
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
