import React, { useState, useCallback } from 'react';
import { Activity, Heart, Thermometer, Wind, AlertCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { SEPSIS_SCENARIO } from './sepsisScenario';
import { VitalSigns, Intervention, SimulationResult } from './types';

interface SimulatorMVPProps {
  onBack?: () => void;
}

export const SimulatorMVP: React.FC<SimulatorMVPProps> = ({ onBack }) => {
  const [vitals, setVitals] = useState<VitalSigns>(SEPSIS_SCENARIO.initialVitals);
  const [interventions, setInterventions] = useState<Intervention[]>(SEPSIS_SCENARIO.availableInterventions);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const handleIntervention = useCallback((interventionId: string) => {
    setInterventions(prev => 
      prev.map(int => 
        int.id === interventionId ? { ...int, done: true } : int
      )
    );

    const intervention = interventions.find(i => i.id === interventionId);
    if (intervention) {
      setTimeline(prev => [...prev, `✓ ${intervention.name}`]);
      setTimeElapsed(prev => prev + 5); // cada ação = 5 min
    }
  }, [interventions]);

  const handleFinish = useCallback(() => {
    const doneInterventions = interventions.filter(i => i.done).map(i => i.id);
    
    // Calcula score baseado em ações críticas
    const criticalDone = SEPSIS_SCENARIO.criticalActions.filter(id => doneInterventions.includes(id));
    const criticalScore = (criticalDone.length / SEPSIS_SCENARIO.criticalActions.length) * 70;
    
    // Bonus por ações opcionais
    const optionalDone = SEPSIS_SCENARIO.optimalActions.filter(id => 
      doneInterventions.includes(id) && !SEPSIS_SCENARIO.criticalActions.includes(id)
    );
    const optionalScore = (optionalDone.length / (SEPSIS_SCENARIO.optimalActions.length - SEPSIS_SCENARIO.criticalActions.length)) * 30;
    
    const totalScore = Math.round(criticalScore + optionalScore);

    // Determina outcome
    let outcome: 'success' | 'partial' | 'failure';
    let finalVitals: VitalSigns;
    let outcomeDescription: string;

    if (SEPSIS_SCENARIO.outcomes.excellent.condition(totalScore)) {
      outcome = 'success';
      finalVitals = SEPSIS_SCENARIO.outcomes.excellent.vitals;
      outcomeDescription = SEPSIS_SCENARIO.outcomes.excellent.description;
    } else if (SEPSIS_SCENARIO.outcomes.good.condition(totalScore)) {
      outcome = 'partial';
      finalVitals = SEPSIS_SCENARIO.outcomes.good.vitals;
      outcomeDescription = SEPSIS_SCENARIO.outcomes.good.description;
    } else {
      outcome = 'failure';
      finalVitals = SEPSIS_SCENARIO.outcomes.poor.vitals;
      outcomeDescription = SEPSIS_SCENARIO.outcomes.poor.description;
    }

    // Gera feedback específico
    const feedback: string[] = [outcomeDescription];
    
    SEPSIS_SCENARIO.criticalActions.forEach(actionId => {
      if (doneInterventions.includes(actionId)) {
        const fbKey = actionId as keyof typeof SEPSIS_SCENARIO.feedback;
        feedback.push(`✓ ${SEPSIS_SCENARIO.feedback[fbKey].correct}`);
      } else {
        const fbKey = actionId as keyof typeof SEPSIS_SCENARIO.feedback;
        feedback.push(`✗ ${SEPSIS_SCENARIO.feedback[fbKey].missing || 'Ação não realizada'}`);
      }
    });

    setVitals(finalVitals);
    setResult({ score: totalScore, outcome, feedback });
    setIsFinished(true);
  }, [interventions]);

  const handleRestart = () => {
    setVitals(SEPSIS_SCENARIO.initialVitals);
    setInterventions(SEPSIS_SCENARIO.availableInterventions);
    setTimeline([]);
    setIsFinished(false);
    setResult(null);
    setTimeElapsed(0);
  };

  return (
    <section className="bg-slate-950 min-h-screen text-white">
      <div className="container mx-auto px-6 py-16">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portal
          </button>
        )}

        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#111724] border border-white/5 p-10 shadow-[0_0_60px_rgba(13,16,45,0.45)]">
          
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-mediaPink">
              <Activity className="w-4 h-4" />
              Simulador Clínico MVP
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">
              {SEPSIS_SCENARIO.title}
            </h1>
            <p className="text-slate-300 text-lg">
              Tempo decorrido: {timeElapsed} minutos
            </p>
          </div>

          {/* Patient Info & Vitals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 text-white">Caso Clínico</h2>
              <div className="space-y-3 text-slate-300">
                <p><strong>Paciente:</strong> {SEPSIS_SCENARIO.patientInfo.name}, {SEPSIS_SCENARIO.patientInfo.age} anos, {SEPSIS_SCENARIO.patientInfo.gender}</p>
                <p><strong>História:</strong> {SEPSIS_SCENARIO.patientInfo.clinicalHistory}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Sinais Vitais
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">FC:</span>
                  <span className="font-semibold text-white">{vitals.heartRate} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PA:</span>
                  <span className="font-semibold text-white">{vitals.bloodPressure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Temp:</span>
                  <span className="font-semibold text-white">{vitals.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SatO2:</span>
                  <span className="font-semibold text-white">{vitals.oxygenSaturation}%</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-400">Consciência:</span>
                  <span className="font-semibold text-white text-right">{vitals.consciousness}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interventions */}
          {!isFinished && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">Condutas Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interventions.map(intervention => (
                  <button
                    key={intervention.id}
                    onClick={() => handleIntervention(intervention.id)}
                    disabled={intervention.done}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      intervention.done
                        ? 'bg-green-900/20 border-green-600/30 cursor-not-allowed'
                        : 'bg-slate-800/50 border-white/10 hover:border-mediaPink hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-white">{intervention.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{intervention.category}</p>
                      </div>
                      {intervention.done && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleFinish}
                className="mt-6 w-full bg-mediaPink text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                Finalizar Atendimento
              </button>
            </div>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-400" />
                Linha do Tempo
              </h2>
              <div className="space-y-2 text-sm text-slate-300 max-h-48 overflow-y-auto">
                {timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500">{idx * 5}min:</span>
                    <span>{event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {isFinished && result && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.outcome === 'success' ? 'bg-green-900/30 text-green-400' :
                  result.outcome === 'partial' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {result.outcome === 'success' ? <CheckCircle className="w-10 h-10" /> :
                   result.outcome === 'partial' ? <AlertCircle className="w-10 h-10" /> :
                   <XCircle className="w-10 h-10" />}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Score: {result.score}/100
                </h2>
                <p className={`text-lg font-semibold ${
                  result.outcome === 'success' ? 'text-green-400' :
                  result.outcome === 'partial' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {result.outcome === 'success' ? 'Excelente!' :
                   result.outcome === 'partial' ? 'Bom, mas pode melhorar' :
                   'Necessita revisão'}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-white mb-3">Feedback Clínico:</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {result.feedback.map((fb, idx) => (
                    <li key={idx} className={fb.startsWith('✓') ? 'text-green-300' : fb.startsWith('✗') ? 'text-red-300' : ''}>
                      {fb}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleRestart}
                  className="flex-1 bg-mediaBlue text-white font-bold py-3 px-6 rounded-xl hover:opacity-90"
                >
                  Tentar Novamente
                </button>
                {onBack && (
                  <button
                    onClick={onBack}
                    className="flex-1 bg-slate-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-600"
                  >
                    Voltar ao Portal
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
