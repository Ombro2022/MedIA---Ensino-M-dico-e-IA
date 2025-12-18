import { Module, PricingTier, FaqItem, TransversalActivity } from './types';

// Based on the user's color palette PDF
export const GRADIENT_TEXT_CLASS = "bg-clip-text text-transparent bg-gradient-to-r from-mediaBlue via-mediaPurple to-mediaPink";
export const GRADIENT_BORDER_CLASS = "bg-gradient-to-r from-mediaBlue via-mediaPurple to-mediaPink";
export const MODULE_START_LABEL = "Início previsto do Módulo 1: 01/02/2026";

export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    title: "Aprendendo Eletrocardiografia com IA",
    description: "Do método de leitura ao raciocínio clínico automatizado e crítico. Produto final: Mini-simulado interativo de ECG criado com IA.",
    duration: "40h (Híbrido)",
    topics: [
      "1. Introdução, método de leitura e IA aplicada ao ECG",
      "2. Eletrofisiologia cardíaca básica e geração do ECG",
      "3. Derivações, vetores e eixo elétrico",
      "4. Ritmos básicos e bradiarritmias",
      "5. Taquicardias supraventriculares e QRS estreito",
      "6. Taquiarritmias ventriculares e QRS largo",
      "7. Isquemia, infarto e alterações de ST/T",
      "8. ECG em situações especiais + Síntese"
    ],
    medicalFocus: "Eletrofisiologia, Arritmias, Isquemia, Situações críticas e Provas de Residência.",
    aiFocus: "Mentor de raciocínio, gerador de casos, simulador de questões, sintetizador e avaliador reflexivo."
  },
  {
    id: 2,
    title: "Aprendendo Gasometria com IA",
    description: "Do método de leitura à integração gaso–ECG–hemodinâmica. Produto final: Simulado interativo de gasometria integrando casos de UTI.",
    duration: "40h (Híbrido)",
    topics: [
      "1. Introdução, método de leitura e IA aplicada à gasometria",
      "2. Fisiologia respiratória e fundamentos",
      "3. Distúrbios respiratórios simples",
      "4. Distúrbios metabólicos simples e Ânion Gap",
      "5. Distúrbios mistos e compensações (Fórmulas)",
      "6. Lactato, choque e perfusão tecidual",
      "7. Gasometria e ventilação mecânica",
      "8. Casos integrados (VM + Gaso) e Síntese"
    ],
    medicalFocus: "Fisiologia respiratória, distúrbios ácido-básicos, ventilação mecânica e choque.",
    aiFocus: "Instrutora (múltiplos níveis), calculadora clínica, assistente de titulação e coavaliadora."
  }
];

export const TRANSVERSAL_ACTIVITIES: TransversalActivity[] = [
  {
    title: "Laboratório de Prompting Clínico",
    description: "Os alunos aprendem a escrever prompts eficientes para ensino e diagnóstico clínico. Foco em clareza, precisão e ética.",
    icon: "terminal"
  },
  {
    title: "Casos Integrados",
    description: "Simulações combinando distúrbios elétricos e metabólicos. Ex: Fibrilação Atrial + Acidose Respiratória + Choque Séptico.",
    icon: "cpu"
  },
  {
    title: "Hackathon Educacional",
    description: "Competição onde times criam o melhor caso clínico interativo com IA. Critérios: realismo e inovação.",
    icon: "users"
  },
  {
    title: "Portfolio Reflexivo",
    description: "Relatório pessoal gerado com ajuda da IA: 'O que aprendi, o que ainda erro, e como a IA me ajudou'.",
    icon: "book"
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "unified",
    name: "Valor do Investimento",
    audience: "Módulo (40h)",
    modulePrice: 1610,
    registrationFee: 172.50,
    printFee: 287.50,
    recommended: true,
    features: [
      "Acesso Digital ao Módulo (40h)",
      "Material Digital (PDFs e Slides)",
      "Participação no Hackathon",
      "Certificado Digital",
      "Mentoria de Carreira (Grupo)",
      "Parcelamento em até 6x sem juros"
    ],
    color: "mediaPurple"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O curso exige conhecimento prévio de programação?",
    answer: "Zero. O curso é sobre Raciocínio Clínico e Prompting (como conversar com a IA). O professor traz a bagagem técnica de Data Science para garantir a solidez, mas você só precisa do seu conhecimento médico e curiosidade."
  },
  {
    question: "Qual a carga horária total?",
    answer: "O curso completo tem 80 horas (40h ECG + 40h Gasometria), divididas em atividades presenciais, aulas gravadas em 4K e exercícios práticos com IA."
  },
  {
    question: "A IA vai substituir meu laudo?",
    answer: "Não, e o curso foca exatamente na 'Crítica'. Ensinamos onde a IA erra (alucinações) e como você deve usar seu julgamento clínico para validar o que a máquina diz. É sobre competência, não substituição."
  },
  {
    question: "Serve para provas de Residência?",
    answer: "Com certeza. Os módulos cobrem temas fundamentais de provas: leitura sistemática de ECG, arritmias, distúrbios mistos na gasometria e ventilação mecânica."
  }
];

export const SOCIAL_STORAGE_KEYS = {
  posts: 'mediaSocialPosts',
  assets: 'mediaSocialAssets'
};

// API URL must be explicitly set in production - no localhost fallback
export const SOCIAL_API_BASE_URL = import.meta.env.VITE_SOCIAL_API_URL || '';
export const SOCIAL_AUTH_STORAGE_KEY = 'mediaSocialAuthToken';

// Check if Social Studio backend is available
export const IS_SOCIAL_STUDIO_AVAILABLE = 
  !!SOCIAL_API_BASE_URL && 
  !SOCIAL_API_BASE_URL.includes('localhost') &&
  SOCIAL_API_BASE_URL.startsWith('http');
