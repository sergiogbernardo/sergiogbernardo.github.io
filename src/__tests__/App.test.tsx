import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
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

    await user.click(screen.getByRole('button', { name: 'Cyber' }));
    expect(screen.getByText('Nenhum artigo publicado nesta trilha ainda.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'IA e agentes' }));
    expect(screen.getByText('Sol, Terra ou Luna: qual modelo usar no Codex?')).toBeInTheDocument();
  });

  it('opens the complete lab catalog', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('link', { name: 'Explorar os Labs' }));

    expect(screen.getByText('Soluções Cyber — Catálogo de soluções')).toBeInTheDocument();
    expect(screen.getByText('Cryptovg — Cofre de senhas e segredos')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Abrir ferramenta/i }).length).toBeGreaterThan(10);

    await user.click(screen.getByRole('button', { name: 'IA' }));
    expect(
      screen.getByText('Prompt Inspector — Matriz de qualidade de prompts'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Cryptovg — Cofre de senhas e segredos')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Segurança' }));
    expect(screen.getByText('Cryptovg — Cofre de senhas e segredos')).toBeInTheDocument();
    expect(screen.queryByText('Copa 2026 — Ao vivo')).not.toBeInTheDocument();
  });

  it('searches Labs and refines Cyber by specialty', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/labs');
    render(<App />);

    const search = screen.getByRole('searchbox', { name: 'Buscar nos Labs' });
    await user.type(search, 'hash-wasm');

    expect(screen.getByText('Inspectorvg — Inspetor de arquivos')).toBeInTheDocument();
    expect(screen.getByText('Bytevg — Canivete de bytes')).toBeInTheDocument();
    expect(screen.queryByText('Copa 2026 — Ao vivo')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpar busca' }));
    await user.click(screen.getByRole('button', { name: 'Segurança' }));
    await user.click(screen.getByRole('button', { name: 'Forense / DFIR' }));

    expect(screen.getByText('Inspectorvg — Inspetor de arquivos')).toBeInTheDocument();
    expect(screen.getByText('Loghivevg — Análise de logs e texto')).toBeInTheDocument();
    expect(screen.queryByText('Cryptovg — Cofre de senhas e segredos')).not.toBeInTheDocument();
  });

  it('opens a permanent Lab detail route', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/labs');
    render(<App />);

    const card = screen.getByText('Inspectorvg — Inspetor de arquivos').closest('article');
    expect(card).not.toBeNull();
    await user.click(within(card!).getByRole('link', { name: /Ver detalhes/i }));

    expect(window.location.pathname).toBe('/labs/inspectorvg');
    expect(
      screen.getByRole('heading', { name: 'Inspectorvg — Inspetor de arquivos', level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText('COMO OS DADOS SÃO TRATADOS')).toBeInTheDocument();
  });

  it('offers an accessible compact navigation menu', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole('button', { name: 'Abrir menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('navigation', { name: 'Navegação mobile' })).toBeInTheDocument();
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
