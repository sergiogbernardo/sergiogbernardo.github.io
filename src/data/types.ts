export type Track = 'security' | 'fintech' | 'ai' | 'other';

export type ProjectStatus = 'live' | 'wip';

export interface Project {
  slug: string;
  name: string;
  description: string;
  track: Track;
  status: ProjectStatus;
  stack: string[];
  /** Live deploy URL. Present for projects that run in the browser. */
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const TRACKS: Record<Track, { label: string; emoji: string }> = {
  security: { label: 'Segurança & Risco', emoji: '🔐' },
  fintech: { label: 'Fintech', emoji: '💰' },
  ai: { label: 'IA & Ferramentas', emoji: '🤖' },
  other: { label: 'Outros', emoji: '🎮' },
};
