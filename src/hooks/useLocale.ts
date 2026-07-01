import { useCallback, useEffect, useState } from 'react';
import type { Locale } from '../data/types';
import { DEFAULT_LOCALE } from '../i18n/messages';

const STORAGE_KEY = 'locale';

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'pt-BR') return stored;
  return DEFAULT_LOCALE;
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const switchLocale = useCallback((next: Locale) => {
    setLocale(next);
  }, []);

  return { locale, switchLocale };
}
