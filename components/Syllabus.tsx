import React from 'react';
import { COURSE_MODULES, TRANSVERSAL_ACTIVITIES, GRADIENT_TEXT_CLASS } from '../constants';
import { Clock, BookOpen, Stethoscope, Bot, Terminal, Users, Cpu } from 'lucide-react';

export const Syllabus: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'terminal': return <Terminal className="w-6 h-6 text-white" />;
      case 'users': return <Users className="w-6 h-6 text-white" />;
      case 'cpu': return <Cpu className="w-6 h-6 text-white" />;
      default: return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="syllabus" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Dois Mundos, <span className={GRADIENT_TEXT_CLASS}>Um Curso</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Uma imersão completa de 80 horas dividida em dois pilares fundamentais da medicina de urgência.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {COURSE_MODULES.map((module) => (
            <div 
              key={module.id}
              className="group relative p-8 rounded-[2rem] bg-white border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="absolute top-8 right-8 text-slate-200 group-hover:text-mediaBlue transition-colors font-mono text-4xl font-bold opacity-50">
                0{module.id}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 group-hover:text-mediaBlue transition-colors pr-12">
                {module.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm font-mono text-mediaGreen mb-6 bg-mediaGreen/10 w-fit px-3 py-1 rounded-full border border-mediaGreen/20">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{module.duration}</span>
              </div>

              <p className="text-slate-600 text-base mb-8 leading-relaxed">
                {module.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Medical Focus */}
                {module.medicalFocus && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 hover:border-mediaBlue/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2 text-mediaBlue text-xs font-bold uppercase tracking-wider">
                          <Stethoscope className="w-4 h-4" />
                          Foco Médico
                      </div>
                      <p className="text-slate-600 text-sm leading-snug">
                          {module.medicalFocus}
                      </p>
                  </div>
                )}

                {/* AI Focus */}
                {module.aiFocus && (
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 hover:border-mediaPurple/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2 text-mediaPurple text-xs font-bold uppercase tracking-wider">
                          <Bot className="w-4 h-4" />
                          Foco IA
                      </div>
                      <p className="text-slate-600 text-sm leading-snug">
                          {module.aiFocus}
                      </p>
                  </div>
                )}
              </div>

              <div className="mt-auto space-y-3 border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cronograma Detalhado</h4>
                {module.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mediaPink shrink-0"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mediaBlue via-mediaPurple to-mediaPink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-[2rem] origin-left"></div>
            </div>
          ))}
        </div>

        {/* Transversal Activities Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 text-slate-900 text-center">Atividades Transversais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRANSVERSAL_ACTIVITIES.map((activity, idx) => (
              <div key={idx} className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   {getIcon(activity.icon)}
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-mediaPink">
                   {getIcon(activity.icon)}
                </div>
                <h4 className="font-bold text-lg mb-2">{activity.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};