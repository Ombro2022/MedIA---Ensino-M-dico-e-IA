export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  medicalFocus?: string; // Foco Clínico (Ex: Sepse)
  aiFocus?: string;      // Foco na IA (Ex: Prompting)
}

export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  modulePrice: number;    // Valor do módulo (digital)
  registrationFee: number; // Taxa de matrícula
  printFee: number;       // Valor do material impresso (opcional)
  features: string[];
  recommended?: boolean;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TransversalActivity {
  title: string;
  description: string;
  icon: 'terminal' | 'users' | 'cpu' | 'book';
}

export interface SelectedPlan {
  tier: PricingTier;
  includePrinted: boolean;
}