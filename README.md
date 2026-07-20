# sabion.io — Sabion Labs

Editorial and technical hub for Sabion Labs: articles, practical explanations,
and a catalog of browser-based labs.

- React + Vite + TypeScript, served from the user site root.
- Light and dark themes with the Sabion matrix visual language.
- Editorial routes for articles plus the complete project catalog from
  `src/data/projects.ts`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Quality

```bash
npm run lint
npm run format
npm test
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
publishes to GitHub Pages. Enable Pages with "GitHub Actions" as the source.

Live project demos live under their own slug (e.g. `/copa-2026/`) from their own
repositories' Pages.

## Rollback

The hub that was live before the editorial redesign is preserved remotely in:

- Branch: `backup/hub-before-editorial-2026-07-20`
- Tag: `hub-before-editorial-2026-07-20`

Reverting the redesign commit on `main` republishes that previous version through
the same GitHub Pages workflow and keeps `sabion.io` unchanged.
