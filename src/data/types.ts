export type Track = 'security' | 'fintech' | 'ai' | 'games' | 'other';

export type ProjectStatus = 'live' | 'wip';
export type Locale = 'en' | 'pt-BR';
export type ProjectSignal =
  | 'clientSide'
  | 'local'
  | 'noUpload'
  | 'browserStorage'
  | 'publicData'
  | 'externalApi'
  | 'noAccount'
  | 'experimental';
export type ProjectCollection = 'analyze' | 'build' | 'learn' | 'utilities';

/** Sub-track inside the security track, to group the catalogue by intent. */
export type SecurityArea = 'offensive' | 'forensics' | 'crypto' | 'appsec';

export type LocalizedText = Record<Locale, string>;

export interface Project {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  track: Track;
  status: ProjectStatus;
  stack: string[];
  /** Live deploy URL. Present for projects that run in the browser. */
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  /** Optional sub-track, used to group security projects. */
  area?: SecurityArea;
  signals: ProjectSignal[];
  collection: ProjectCollection;
}

export const SECURITY_AREAS: Record<SecurityArea, { label: LocalizedText }> = {
  offensive: { label: { en: 'Offensive / Pentest', 'pt-BR': 'Ofensivo / Pentest' } },
  forensics: { label: { en: 'Forensics / DFIR', 'pt-BR': 'Forense / DFIR' } },
  crypto: { label: { en: 'Crypto / Utilities', 'pt-BR': 'Cripto / Utilitários' } },
  appsec: { label: { en: 'AppSec / GRC', 'pt-BR': 'AppSec / GRC' } },
};

export const TRACKS: Record<Track, { label: LocalizedText; emoji: string }> = {
  security: { label: { en: 'Security & Risk', 'pt-BR': 'Segurança & Risco' }, emoji: '🔐' },
  fintech: { label: { en: 'Fintech', 'pt-BR': 'Fintech' }, emoji: '💰' },
  ai: { label: { en: 'AI & Tools', 'pt-BR': 'IA & Ferramentas' }, emoji: '🤖' },
  games: { label: { en: 'Games', 'pt-BR': 'Games' }, emoji: '🎮' },
  other: { label: { en: 'Utilities', 'pt-BR': 'Utilitários' }, emoji: '📦' },
};

export const COLLECTIONS: Record<ProjectCollection, { label: LocalizedText; description: LocalizedText }> = {
  analyze: {
    label: { en: 'Analyze', 'pt-BR': 'Analisar' },
    description: {
      en: 'Inspect files, headers, certificates, logs, and exposure data.',
      'pt-BR': 'Inspecione arquivos, headers, certificados, logs e dados de exposição.',
    },
  },
  build: {
    label: { en: 'Build', 'pt-BR': 'Construir' },
    description: {
      en: 'Generate commands, payloads, encodings, and technical artifacts.',
      'pt-BR': 'Gere comandos, payloads, encodings e artefatos técnicos.',
    },
  },
  learn: {
    label: { en: 'Learn', 'pt-BR': 'Aprender' },
    description: {
      en: 'Explore roadmaps, threat models, risk context, and security concepts.',
      'pt-BR': 'Explore trilhas, threat modeling, contexto de risco e conceitos de segurança.',
    },
  },
  utilities: {
    label: { en: 'Utilities', 'pt-BR': 'Utilitários' },
    description: {
      en: 'General-purpose tools and experiments outside the security workflow.',
      'pt-BR': 'Ferramentas gerais e experimentos fora do fluxo principal de segurança.',
    },
  },
};
