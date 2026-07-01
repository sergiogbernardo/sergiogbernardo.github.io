import type { Locale, ProjectSignal, ProjectStatus } from '../data/types';

export const DEFAULT_LOCALE: Locale = 'en';

export const messages = {
  en: {
    nav: {
      labs: 'Labs',
      security: 'Security',
      about: 'About',
      privacy: 'Privacy',
      github: 'GitHub',
      home: 'Home',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
    },
    language: {
      english: 'Switch language to English',
      portuguese: 'Switch language to Portuguese',
    },
    hero: {
      eyebrow: 'Sabion Labs',
      title: 'Browser-based security tools and technical utilities.',
      body: 'Analyze files, inspect headers, build scan commands, decode certificates, explore vulnerabilities, and more without sending your data away.',
      primaryAction: 'Explore labs',
      secondaryAction: 'Privacy model',
      builtBy: 'Built by Sergio Bernardo',
      stats: {
        liveTools: 'live tools',
        localFirst: 'local-first utilities',
        noTracking: 'no tracking cookies',
      },
    },
    filters: {
      title: 'Find a tool',
      searchLabel: 'Search tools',
      searchPlaceholder: 'Search tools, stacks, CVE, JWT, headers, scan...',
      all: 'All',
      clear: 'Clear search',
      areaTitle: 'Security domains',
      resultCount: (count: number) => `${count} ${count === 1 ? 'tool' : 'tools'}`,
      noResults: 'No tools match this selection.',
      noResultsBody: 'Try a different term or clear the current filters to browse all labs again.',
      clearAll: 'Clear filters',
    },
    sections: {
      featured: 'Featured',
      allProjects: 'All labs',
      buildingNext: 'Building next',
      about: 'About Sabion Labs',
      privacy: 'Privacy and cookies',
      principles: 'Principles',
    },
    cards: {
      open: 'View details',
      live: 'Open tool',
      soon: 'Coming soon',
    },
    status: {
      live: 'Live',
      wip: 'WIP',
    } satisfies Record<ProjectStatus, string>,
    signals: {
      clientSide: 'Client-side only',
      local: 'Local processing',
      noUpload: 'No upload',
      browserStorage: 'Browser storage',
      publicData: 'Public data',
      externalApi: 'External API',
      noAccount: 'No account',
      experimental: 'Experimental',
    } satisfies Record<ProjectSignal, string>,
    detail: {
      back: 'Back to labs',
      open: 'Open live tool',
      privacyModel: 'Privacy model',
      technicalStack: 'Technical stack',
      collection: 'Collection',
    },
    collections: {
      title: 'Tool collections',
      body: 'Browse the labs by the job you need to do: analyze, build, learn, or use a general utility.',
    },
    about: {
      body: 'Sabion Labs is a public collection of security-focused tools, browser utilities, and experiments. The goal is practical: small tools that help with analysis, learning, and daily technical work.',
      author: 'The labs are built and maintained by Sergio Bernardo, with a strong preference for transparent, client-side tools.',
    },
    principles: {
      items: [
        'Privacy-first by default',
        'Useful before decorative',
        'Transparent technical experiments',
        'Built for learning and daily analysis',
      ],
    },
    privacy: {
      body: 'Most tools run directly in your browser. Unless a tool clearly says it uses an external API, the content you paste or inspect is not uploaded by Sabion Labs.',
      analytics:
        'This site uses Cloudflare Web Analytics and Real User Measurements for privacy-first traffic and performance metrics. The setup does not rely on tracking cookies.',
      cookies:
        'We do not use advertising cookies or session replay. Browser preferences such as theme and language may be stored locally on your device.',
    },
    next: {
      body: 'Sabion is in constant evolution: new tools, experiments, and improvements are shaped from real technical needs and public usage signals.',
      status: 'Continuous evolution',
    },
    footer: {
      rights: 'Sabion Labs',
      privacy: 'Privacy-first analytics. No tracking cookies.',
      linkedin: 'LinkedIn',
    },
  },
  'pt-BR': {
    nav: {
      labs: 'Labs',
      security: 'Segurança',
      about: 'Sobre',
      privacy: 'Privacidade',
      github: 'GitHub',
      home: 'Início',
      themeLight: 'Ativar modo claro',
      themeDark: 'Ativar modo escuro',
    },
    language: {
      english: 'Trocar idioma para inglês',
      portuguese: 'Trocar idioma para português',
    },
    hero: {
      eyebrow: 'Sabion Labs',
      title: 'Ferramentas de segurança e utilidades técnicas direto no navegador.',
      body: 'Analise arquivos, inspecione headers, monte comandos de scan, decodifique certificados, explore vulnerabilidades e mais sem enviar seus dados.',
      primaryAction: 'Explorar labs',
      secondaryAction: 'Modelo de privacidade',
      builtBy: 'Criado por Sergio Bernardo',
      stats: {
        liveTools: 'ferramentas online',
        localFirst: 'utilitários local-first',
        noTracking: 'sem cookies de rastreamento',
      },
    },
    filters: {
      title: 'Encontre uma ferramenta',
      searchLabel: 'Buscar ferramentas',
      searchPlaceholder: 'Buscar ferramentas, stacks, CVE, JWT, headers, scan...',
      all: 'Todos',
      clear: 'Limpar busca',
      areaTitle: 'Domínios de segurança',
      resultCount: (count: number) => `${count} ${count === 1 ? 'ferramenta' : 'ferramentas'}`,
      noResults: 'Nenhuma ferramenta corresponde a esta seleção.',
      noResultsBody: 'Tente outro termo ou limpe os filtros atuais para navegar por todos os labs novamente.',
      clearAll: 'Limpar filtros',
    },
    sections: {
      featured: 'Em destaque',
      allProjects: 'Todos os labs',
      buildingNext: 'Construindo agora',
      about: 'Sobre o Sabion Labs',
      privacy: 'Privacidade e cookies',
      principles: 'Princípios',
    },
    cards: {
      open: 'Ver detalhes',
      live: 'Abrir ferramenta',
      soon: 'Em breve',
    },
    status: {
      live: 'Online',
      wip: 'WIP',
    } satisfies Record<ProjectStatus, string>,
    signals: {
      clientSide: 'Client-side only',
      local: 'Processamento local',
      noUpload: 'Sem upload',
      browserStorage: 'Armazenamento local',
      publicData: 'Dados públicos',
      externalApi: 'API externa',
      noAccount: 'Sem conta',
      experimental: 'Experimental',
    } satisfies Record<ProjectSignal, string>,
    detail: {
      back: 'Voltar aos labs',
      open: 'Abrir ferramenta',
      privacyModel: 'Modelo de privacidade',
      technicalStack: 'Stack técnica',
      collection: 'Coleção',
    },
    collections: {
      title: 'Coleções de ferramentas',
      body: 'Navegue pelos labs de acordo com o trabalho que você precisa fazer: analisar, construir, aprender ou usar uma utilidade geral.',
    },
    about: {
      body: 'Sabion Labs é uma coleção pública de ferramentas de segurança, utilidades de navegador e experimentos. A ideia é ser prático: ferramentas pequenas para análise, aprendizado e trabalho técnico diário.',
      author: 'Os labs são criados e mantidos por Sergio Bernardo, com preferência por ferramentas transparentes e client-side.',
    },
    principles: {
      items: [
        'Privacidade como padrão',
        'Útil antes de decorativo',
        'Experimentos técnicos transparentes',
        'Feito para aprendizado e análise diária',
      ],
    },
    privacy: {
      body: 'A maioria das ferramentas roda diretamente no seu navegador. A menos que a ferramenta indique claramente uso de API externa, o conteúdo colado ou inspecionado não é enviado pelo Sabion Labs.',
      analytics:
        'Este site usa Cloudflare Web Analytics e Real User Measurements para métricas de tráfego e performance com foco em privacidade. A configuração não depende de cookies de rastreamento.',
      cookies:
        'Não usamos cookies de publicidade nem gravação de sessão. Preferências como tema e idioma podem ser salvas localmente no seu dispositivo.',
    },
    next: {
      body: 'Sabion está em evolução constante: novas ferramentas, experimentos e melhorias nascem de necessidades técnicas reais e dos sinais de uso público.',
      status: 'Evolução contínua',
    },
    footer: {
      rights: 'Sabion Labs',
      privacy: 'Analytics privacy-first. Sem cookies de rastreamento.',
      linkedin: 'LinkedIn',
    },
  },
} satisfies Record<Locale, object>;

export type Messages = (typeof messages)[Locale];
