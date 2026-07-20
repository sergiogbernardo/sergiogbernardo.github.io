import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

HTMLCanvasElement.prototype.getContext = () => null;
window.scrollTo = () => undefined;

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('renders the editorial home and its featured labs', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /Artigos, Soluções e Laboratórios/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Inspectorvg — Inspetor de arquivos')).toBeInTheDocument();
    expect(screen.getByText('Scanvg — Gerador de comandos de scan')).toBeInTheDocument();
    expect(screen.getByText('Biblioteca de Comandos')).toBeInTheDocument();
  });

  it('navigates to the article library without reloading the page', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: /Ler os artigos/i }));

    expect(
      screen.getByRole('heading', {
        name: 'Artigos para decidir, não apenas acompanhar.',
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/artigos');
  });

  it('opens the complete lab catalog', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: 'Explorar os Labs' }));

    expect(screen.getByText('Soluções Cyber — Catálogo de soluções')).toBeInTheDocument();
    expect(screen.getByText('Cryptovg — Cofre de senhas e segredos')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Abrir ferramenta/i }).length).toBeGreaterThan(10);
  });

  it('switches between dark and light themes', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
