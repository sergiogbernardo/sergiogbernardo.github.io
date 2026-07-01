type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  const detail = { name, ...payload };
  window.dispatchEvent(new CustomEvent('sabion:analytics', { detail }));
  window.dataLayer?.push({ event: name, ...payload });
}
