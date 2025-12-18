import React from 'react';
import { ArrowRight, Brain, Lightbulb, Sparkles } from 'lucide-react';
import { GRADIENT_TEXT_CLASS } from '../constants';

export const Hero: React.FC = () => {
  const MODULE_START_LABEL = 'Início previsto do Módulo 1: 01/02/2026';
  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mediaBlue/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mediaPink/20 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-mediaPurple/20 bg-white/50 mb-4 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-mediaGreen animate-pulse"></span>
          <span className="text-sm font-medium text-slate-600">80h de Imersão: Presencial + Online 4K</span>
        </div>

        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white/70 mb-8 backdrop-blur-sm shadow-sm text-sm font-semibold text-slate-700"
          aria-label={MODULE_START_LABEL}
        >
          <span aria-hidden="true">📅</span>
          <span>{MODULE_START_LABEL}</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900">
          Descubra o aprendizado da Medicina <br />
          <span className={GRADIENT_TEXT_CLASS}>com o auxílio da IA</span>
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Uma metodologia <strong>inédita</strong>. Não é apenas um curso de tecnologia, mas uma imersão na qual revisitamos temas cruciais em 
          <strong> Urgências e Terapia Intensiva</strong> usando a Inteligência Artificial como ferramenta de ensino e potencializadora do raciocínio clínico.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToPricing}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl shadow-slate-200"
          >
            Garantir Minha Vaga
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-slate-300 text-slate-600 rounded-full font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all hover:border-slate-400 bg-white/50"
          >
            Entenda a Metodologia
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-100 hover:border-mediaBlue/50 transition-colors">
            <Brain className="w-10 h-10 text-mediaBlue mb-4 mx-auto" />
            <h3 className="text-lg font-bold mb-2 text-slate-900">Aprendizado Paralelo</h3>
            <p className="text-slate-500 text-sm">Aprenda temas médicos complexos e domine a IA simultaneamente. A IA ensina a Medicina, e a Medicina contextualiza a IA.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-100 hover:border-mediaPurple/50 transition-colors">
            <Lightbulb className="w-10 h-10 text-mediaPurple mb-4 mx-auto" />
            <h3 className="text-lg font-bold mb-2 text-slate-900">Didática Inovadora</h3>
            <p className="text-slate-500 text-sm">Use a IA como tutora 24h, criadora de simulados e "co-professora" para acelerar sua absorção de conhecimento.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-100 hover:border-mediaPink/50 transition-colors">
            <Sparkles className="w-10 h-10 text-mediaPink mb-4 mx-auto" />
            <h3 className="text-lg font-bold mb-2 text-slate-900">Foco na Prática</h3>
            <p className="text-slate-500 text-sm">De Sepse a Ventilação Mecânica: veja como algoritmos resolvem problemas reais que enfrentamos no plantão.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
