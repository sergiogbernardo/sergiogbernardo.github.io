import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

HTMLCanvasElement.prototype.getContext = () => null;
window.scrollTo = () => undefined;

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Sabion Labs and the featured security tools', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Browser-based security tools and technical utilities.',
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Cyber Solutions — Solution catalog')).toBeInTheDocument();
    expect(screen.getByText('Inspectorvg — File inspector')).toBeInTheDocument();
    expect(screen.getByText('Certvg — Certificate and token inspector')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /View details/i }).length).toBeGreaterThan(0);
  });

  it('filters projects by track', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    const securityButton = screen.getByRole('button', { name: /Security & Risk/i });
    await user.click(securityButton);

    expect(securityButton).toHaveClass('bg-emerald-400');
  });

  it('switches to Portuguese and searches the catalog', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Switch language to Portuguese/i }));
    expect(screen.getByText('Copa 2026 — Ao vivo')).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: /Buscar ferramentas/i }), 'jwt');
    expect(screen.getByText('Certvg — Inspetor de certificados e tokens')).toBeInTheDocument();
  });

  it('opens a lab detail page', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /View details/i })[0]);

    expect(screen.getByRole('link', { name: /Open live tool/i })).toBeInTheDocument();
    expect(screen.getByText('Privacy model')).toBeInTheDocument();
  });
});
