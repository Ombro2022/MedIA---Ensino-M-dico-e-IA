// Cenário único: Sepse inicial

export const SEPSIS_SCENARIO = {
  title: 'Sepse de Foco Urinário - Atendimento Inicial',
  
  patientInfo: {
    name: 'Maria Silva',
    age: 68,
    gender: 'Feminino',
    clinicalHistory: 'Paciente com história de ITU de repetição, diabética tipo 2, procura PS com febre e confusão mental há 12h.'
  },

  initialVitals: {
    heartRate: 118,
    bloodPressure: '85/50 mmHg',
    temperature: 38.9,
    oxygenSaturation: 92,
    consciousness: 'Confusa, Glasgow 13'
  },

  availableInterventions: [
    { id: 'hemocultura', name: 'Colher 2 hemoculturas', category: 'Exame', done: false },
    { id: 'urina', name: 'Colher urina tipo 1 + urocultura', category: 'Exame', done: false },
    { id: 'lactato', name: 'Solicitar lactato sérico', category: 'Exame', done: false },
    { id: 'cristaloide', name: 'Infundir 30 ml/kg de cristaloide (1h)', category: 'Conduta', done: false },
    { id: 'antibiotico', name: 'Iniciar antibiótico de amplo espectro EV', category: 'Medicação', done: false },
    { id: 'oxigenio', name: 'Instalar O2 suplementar (máscara)', category: 'Suporte', done: false },
    { id: 'noradrenalina', name: 'Iniciar noradrenalina', category: 'Medicação', done: false },
    { id: 'acesso-central', name: 'Puncionar acesso venoso central', category: 'Procedimento', done: false }
  ],

  criticalActions: ['hemocultura', 'cristaloide', 'antibiotico', 'lactato'],
  
  optimalActions: ['hemocultura', 'urina', 'lactato', 'cristaloide', 'antibiotico', 'oxigenio'],

  feedback: {
    hemocultura: {
      correct: 'Excelente! Hemocultura antes do ATB é essencial para identificar o agente.',
      late: 'Hemocultura deveria ter sido colhida antes do ATB.'
    },
    urina: {
      correct: 'Boa! Suspeita de foco urinário justifica a coleta.',
      missing: 'Urocultura ajudaria a identificar o patógeno.'
    },
    lactato: {
      correct: 'Correto! Lactato >2 indica hipoperfusão tecidual e pior prognóstico.',
      missing: 'Lactato é marcador importante na sepse.'
    },
    cristaloide: {
      correct: 'Perfeito! Reposição volêmica agressiva na 1ª hora é mandatória.',
      late: 'Cristaloide deveria ter sido iniciado imediatamente.',
      missing: 'Reposição volêmica é obrigatória na sepse!'
    },
    antibiotico: {
      correct: 'Ótimo! ATB na 1ª hora reduz mortalidade em ~10% por hora de atraso.',
      late: 'Cada hora de atraso no ATB aumenta a mortalidade.',
      missing: 'Antibiótico é CRÍTICO nas primeiras horas!'
    },
    oxigenio: {
      correct: 'Bom suporte! SatO2 92% indica hipoxemia leve.',
      unnecessary: 'O2 seria útil, mas não é prioridade crítica agora.'
    },
    noradrenalina: {
      early: 'Ainda não! Tente primeiro ressuscitação volêmica adequada.',
      correct: 'Indicado se após cristaloide PAM < 65 mmHg.'
    },
    'acesso-central': {
      unnecessary: 'Não é prioritário agora. Acesso periférico calibroso basta inicialmente.',
      later: 'Pode ser necessário se precisar drogas vasoativas prolongadas.'
    }
  },

  outcomes: {
    excellent: {
      condition: (score: number) => score >= 90,
      description: 'Paciente estabilizada! Ótimo manejo das primeiras horas da sepse.',
      vitals: { heartRate: 88, bloodPressure: '110/70 mmHg', temperature: 37.8, oxygenSaturation: 97, consciousness: 'Alerta, orientada' }
    },
    good: {
      condition: (score: number) => score >= 70,
      description: 'Paciente melhorando, mas ainda instável. Necessita reavaliação frequente.',
      vitals: { heartRate: 102, bloodPressure: '95/60 mmHg', temperature: 38.2, oxygenSaturation: 94, consciousness: 'Sonolenta, mas responsiva' }
    },
    poor: {
      condition: (score: number) => score < 70,
      description: 'Evolução desfavorável. Paciente mantém sinais de choque séptico.',
      vitals: { heartRate: 128, bloodPressure: '75/45 mmHg', temperature: 39.2, oxygenSaturation: 89, consciousness: 'Confusa, Glasgow 11' }
    }
  }
};
