import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

HTMLCanvasElement.prototype.getContext = () => null;

describe('App', () => {
  it('renders the hero and the featured live demo', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hub de Projetos', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Copa 2026 — Ao vivo')).toBeInTheDocument();
    // The featured live project exposes a "Ver ao vivo" link.
    expect(screen.getAllByRole('link', { name: /Ver ao vivo/i }).length).toBeGreaterThan(0);
  });

  it('filters projects by track', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /Segurança/i })[0]);

    expect(screen.queryByText('Copa 2026 — Ao vivo')).not.toBeInTheDocument();
  });
});
