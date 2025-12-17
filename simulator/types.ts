// Tipos mínimos para o Simulador Clínico MVP (apenas Sepse)

export interface VitalSigns {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  consciousness: string;
}

export interface Intervention {
  id: string;
  name: string;
  category: string;
  done: boolean;
}

export interface SimulationResult {
  score: number;
  outcome: 'success' | 'partial' | 'failure';
  feedback: string[];
}
