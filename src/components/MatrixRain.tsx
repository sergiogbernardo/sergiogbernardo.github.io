import { useEffect, useRef } from 'react';
import type { Theme } from '../hooks/useTheme';

const MATRIX_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@*+-'.split('');

export default function MatrixRain({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    let animationFrame = 0;
    let previousFrame = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      columns = Math.max(1, Math.floor(width / 20));
      drops = Array.from({ length: columns }, () => Math.random() * height - height);
    };

    const drawFrame = () => {
      context.fillStyle =
        theme === 'dark' ? 'rgba(2, 6, 4, 0.13)' : 'rgba(248, 251, 248, 0.16)';
      context.fillRect(0, 0, width, height);

      context.fillStyle =
        theme === 'dark' ? 'rgba(84, 255, 120, 0.72)' : 'rgba(6, 125, 76, 0.42)';
      context.font = '15px ui-monospace, SFMono-Regular, Menlo, monospace';

      for (let column = 0; column < columns; column += 1) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = column * 20;
        const y = drops[column];

        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.976) {
          drops[column] = Math.random() * -120;
        } else {
          drops[column] += 20;
        }
      }
    };

    const animate = (time: number) => {
      if (time - previousFrame > 48) {
        drawFrame();
        previousFrame = time;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    drawFrame();
    window.addEventListener('resize', resize);

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
