import { useEffect } from 'react';
import type { Locale, Project } from '../data/types';
import type { Messages } from '../i18n/messages';
import type { Route } from '../lib/router';

export function useDocumentMeta({
  route,
  locale,
  t,
  project,
}: {
  route: Route;
  locale: Locale;
  t: Messages;
  project?: Project;
}) {
  useEffect(() => {
    const title =
      route.name === 'lab' && project
        ? `${project.name[locale]} | Sabion Labs`
        : route.name === 'privacy'
          ? `${t.sections.privacy} | Sabion Labs`
          : 'Sabion Labs — Security Tools and Technical Utilities';

    const description =
      route.name === 'lab' && project
        ? project.description[locale]
        : route.name === 'privacy'
          ? t.privacy.analytics
          : t.hero.body;

    document.title = title;
    document.documentElement.lang = locale;
    setCanonical(window.location.href);
    setMeta('description', description);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', window.location.href);
  }, [locale, project, route, t]);
}

function setMeta(name: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (element) element.content = content;
}

function setCanonical(href: string) {
  const element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (element) element.href = href;
}

function setProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}
