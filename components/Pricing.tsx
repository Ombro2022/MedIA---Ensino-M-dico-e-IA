import React, { useState } from 'react';
import { Check, Zap, BookOpen, Monitor } from 'lucide-react';
import { PRICING_TIERS, GRADIENT_TEXT_CLASS } from '../constants';
import { PricingTier, SelectedPlan } from '../types';

interface PricingProps {
  onPlanSelect: (plan: SelectedPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  const [includePrinted, setIncludePrinted] = useState(false);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative gradient blob */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mediaPurple/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Investimento por <span className={GRADIENT_TEXT_CLASS}>Módulo (40h)</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Valores referentes a um módulo (ECG ou Gasometria). <br/>
            Parcelamento em até <strong>3x sem juros</strong> no cartão.
          </p>
        </div>

        {/* Material Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-full flex relative cursor-pointer shadow-inner" onClick={() => setIncludePrinted(!includePrinted)}>
             <div className={`absolute top-1.5 bottom-1.5 w-[50%] bg-white rounded-full shadow-md transition-all duration-300 ease-out ${includePrinted ? 'left-[49%]' : 'left-1.5'}`}></div>
             
             <button 
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors duration-300 ${!includePrinted ? 'text-slate-900' : 'text-slate-500'}`}
                onClick={(e) => { e.stopPropagation(); setIncludePrinted(false); }}
             >
                <Monitor className="w-4 h-4" />
                Apenas Digital
             </button>
             
             <button 
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors duration-300 ${includePrinted ? 'text-mediaPurple' : 'text-slate-500'}`}
                onClick={(e) => { e.stopPropagation(); setIncludePrinted(true); }}
             >
                <BookOpen className="w-4 h-4" />
                Com Apostila Impressa (+R$ 250)
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            const isRecommended = tier.recommended;
            
            // Calculations
            const totalBase = tier.modulePrice + tier.registrationFee;
            const extra = includePrinted ? tier.printFee : 0;
            const finalTotal = totalBase + extra;
            const installmentValue = finalTotal / 3;

            return (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 flex flex-col h-full
                  ${isRecommended 
                    ? 'bg-slate-900 border-2 border-mediaPurple shadow-2xl shadow-purple-200 scale-105 z-20 text-white' 
                    : 'bg-white border border-slate-200 hover:border-mediaBlue/50 hover:shadow-xl hover:shadow-slate-100 z-10 text-slate-900'
                  }
                `}
              >
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-mediaPurple to-mediaPink text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Zap className="w-3 h-3 fill-current" />
                    Mais Escolhido
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${isRecommended ? 'text-white' : 'text-slate-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-6 ${isRecommended ? 'text-slate-400' : 'text-slate-500'}`}>{tier.audience}</p>
                  
                  {/* Price Display */}
                  <div className="flex flex-col gap-1 mb-2">
                    <span className={`text-4xl font-extrabold ${isRecommended ? 'text-mediaPurple' : 'text-slate-900'}`}>
                       3x {formatCurrency(installmentValue)}
                    </span>
                    <span className={`text-sm font-medium ${isRecommended ? 'text-slate-400' : 'text-slate-500'}`}>
                      Total à vista: {formatCurrency(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className={`mb-6 p-4 rounded-xl text-xs font-mono space-y-1 ${isRecommended ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                    <div className="flex justify-between">
                        <span>Módulo Digital:</span>
                        <span>{formatCurrency(tier.modulePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Matrícula:</span>
                        <span>{formatCurrency(tier.registrationFee)}</span>
                    </div>
                    {includePrinted && (
                        <div className="flex justify-between text-mediaPink font-bold">
                            <span>Material Impresso:</span>
                            <span>+ {formatCurrency(tier.printFee)}</span>
                        </div>
                    )}
                    <div className="border-t border-slate-600/20 pt-1 mt-1 flex justify-between font-bold">
                        <span>TOTAL:</span>
                        <span>{formatCurrency(finalTotal)}</span>
                    </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className={`flex items-start gap-3 text-sm ${isRecommended ? 'text-slate-300' : 'text-slate-600'}`}>
                      <div className={`mt-0.5 p-0.5 rounded-full ${isRecommended ? 'bg-mediaPurple/20 text-mediaPurple' : 'bg-slate-100 text-slate-600'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                   {includePrinted && (
                    <li className={`flex items-start gap-3 text-sm font-bold ${isRecommended ? 'text-mediaPink' : 'text-mediaPurple'}`}>
                      <div className={`mt-0.5 p-0.5 rounded-full ${isRecommended ? 'bg-mediaPink/20 text-mediaPink' : 'bg-purple-100 text-mediaPurple'}`}>
                        <BookOpen className="w-3 h-3" />
                      </div>
                      Apostila Impressa Inclusa
                    </li>
                  )}
                </ul>

                <button 
                  onClick={() => onPlanSelect({ tier, includePrinted })}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300
                    ${isRecommended 
                      ? 'bg-gradient-to-r from-mediaPurple to-mediaPink text-white hover:opacity-90 shadow-lg' 
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }
                  `}
                >
                  Matricular Agora
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-xs text-slate-400">
              *Valores incluem taxa de matrícula única por módulo. O parcelamento em até 3x é sem juros.
            </p>
        </div>
      </div>
    </section>
  );
};