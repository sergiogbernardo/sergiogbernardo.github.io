import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the hero and the featured live demo', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Sergio Bernardo', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Copa 2026 — Ao vivo')).toBeInTheDocument();
    // The featured live project exposes a "Ver ao vivo" link.
    expect(screen.getAllByRole('link', { name: /Ver ao vivo/i }).length).toBeGreaterThan(0);
  });

  it('filters projects by track', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Fintech/i }));

    expect(screen.getByText('Bank')).toBeInTheDocument();
    expect(screen.queryByText('PortScan')).not.toBeInTheDocument();
  });
});
