import { useEffect, useRef } from 'react';

export default function FeedbackWidget({ theme }: { theme: 'light' | 'dark' }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.setAttribute('repo', 'sergiogbernardo/sergiogbernardo.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'feedback');
    script.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light');

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [theme]);

  return <div ref={containerRef} className="min-h-[420px]" />;
}
