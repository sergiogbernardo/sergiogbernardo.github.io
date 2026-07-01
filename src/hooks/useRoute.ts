import { useCallback, useEffect, useState } from 'react';
import { parseRoute, routePath, type Route } from '../lib/router';

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const handlePopState = () => setRoute(parseRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextRoute: Route) => {
    const nextPath = routePath(nextRoute);
    window.history.pushState({}, '', nextPath);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}
