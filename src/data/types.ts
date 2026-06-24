export type Track = 'security' | 'fintech' | 'ai' | 'games' | 'other';

export type ProjectStatus = 'live' | 'wip';

/** Sub-track inside the security track, to group the catalogue by intent. */
export type SecurityArea = 'offensive' | 'forensics' | 'crypto' | 'appsec';

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
  /** Optional sub-track, used to group security projects. */
  area?: SecurityArea;
}

export const SECURITY_AREAS: Record<SecurityArea, { label: string }> = {
  offensive: { label: 'Ofensivo / Pentest' },
  forensics: { label: 'Forense / DFIR' },
  crypto: { label: 'Cripto / Utilitários' },
  appsec: { label: 'AppSec / GRC' },
};

export const TRACKS: Record<Track, { label: string; emoji: string }> = {
  security: { label: 'Segurança & Risco', emoji: '🔐' },
  fintech: { label: 'Fintech', emoji: '💰' },
  ai: { label: 'IA & Ferramentas', emoji: '🤖' },
  games: { label: 'Games', emoji: '🎮' },
  other: { label: 'Outros', emoji: '📦' },
};
