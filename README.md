# sergiogbernardo.github.io — Live Demos Hub

Personal portfolio built as a **hub of live demos**: the home page showcases
running projects (open, click, see them work) rather than a plain list of repos.

- React + Vite + TypeScript + Tailwind, served from the user site root.
- Dark mode by default, filter by track (Security, Fintech, AI, Other).
- Project catalog curated in `src/data/projects.ts` — edit names, descriptions,
  stack, status and `liveUrl`/`repoUrl` as projects get published.

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
