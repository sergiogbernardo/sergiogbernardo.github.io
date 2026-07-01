import { projects } from '../data/projects';

export type Route =
  | { name: 'home' }
  | { name: 'privacy' }
  | { name: 'lab'; slug: string };

export function parseRoute(pathname = window.location.pathname): Route {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/privacy') return { name: 'privacy' };

  const labMatch = normalized.match(/^\/labs\/([^/]+)$/);
  if (labMatch) {
    const slug = decodeURIComponent(labMatch[1]);
    if (projects.some((project) => project.slug === slug)) return { name: 'lab', slug };
  }

  return { name: 'home' };
}

export function routePath(route: Route) {
  if (route.name === 'privacy') return '/privacy';
  if (route.name === 'lab') return `/labs/${encodeURIComponent(route.slug)}`;
  return '/';
}
