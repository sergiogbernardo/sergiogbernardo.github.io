export type Route =
  | { name: 'home' }
  | { name: 'articles' }
  | { name: 'article' }
  | { name: 'labs' };

export function parseRoute(pathname = window.location.pathname): Route {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/artigos/sol-terra-luna') return { name: 'article' };
  if (normalized === '/artigos') return { name: 'articles' };
  if (normalized === '/labs' || normalized.startsWith('/labs/')) return { name: 'labs' };

  return { name: 'home' };
}

export function routePath(route: Route) {
  if (route.name === 'article') return '/artigos/sol-terra-luna';
  if (route.name === 'articles') return '/artigos';
  if (route.name === 'labs') return '/labs';
  return '/';
}
