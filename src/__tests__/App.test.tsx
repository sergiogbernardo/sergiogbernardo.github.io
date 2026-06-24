import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

HTMLCanvasElement.prototype.getContext = () => null;

describe('App', () => {
  it('renders the hero and the featured live demo', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hub de Projetos', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Copa 2026 — Ao vivo')).toBeInTheDocument();
    // The featured live project exposes a "Visualizar" link.
    expect(screen.getAllByRole('link', { name: /Visualizar/i }).length).toBeGreaterThan(0);
  });

  it('filters projects by track', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    const securityButton = screen.getByRole('button', { name: /Segurança & Risco/i });
    await user.click(securityButton);

    expect(securityButton).toHaveClass('bg-emerald-400');
  });
});
