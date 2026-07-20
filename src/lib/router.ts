export type Route =
  | { name: 'home' }
  | { name: 'articles' }
  | { name: 'article' }
  | { name: 'labs' }
  | { name: 'lab'; slug: string };

export function parseRoute(pathname = window.location.pathname): Route {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/artigos/sol-terra-luna') return { name: 'article' };
  if (normalized === '/artigos') return { name: 'articles' };
  if (normalized === '/labs') return { name: 'labs' };
  if (normalized.startsWith('/labs/')) {
    return { name: 'lab', slug: decodeURIComponent(normalized.slice('/labs/'.length)) };
  }

  return { name: 'home' };
}

export function routePath(route: Route) {
  if (route.name === 'article') return '/artigos/sol-terra-luna';
  if (route.name === 'articles') return '/artigos';
  if (route.name === 'labs') return '/labs';
  if (route.name === 'lab') return `/labs/${encodeURIComponent(route.slug)}`;
  return '/';
}
