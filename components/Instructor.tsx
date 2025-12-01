import React, { useState } from 'react';
import { Award, Code, GraduationCap, Users, Database, Terminal, Activity } from 'lucide-react';
import { GRADIENT_TEXT_CLASS } from '../constants';

export const Instructor: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-mediaBlue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Column 1: Image/Visuals */}
          <div className="w-full lg:w-1/3 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-slate-100 shadow-2xl shadow-slate-200 group bg-slate-50">
              {!imageError ? (
                <img 
                  src="/ciro_leite_mendes.jpg" 
                  alt="Professor do MedIA - Ex-Presidente da AMIB" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-slate-50 flex items-center justify-center flex-col gap-3 p-6 text-center">
                  <div className="p-4 rounded-full bg-slate-200 mb-2">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <span className="text-slate-500 font-medium">Não foi possível carregar a foto</span>
                  <p className="text-xs text-slate-400 max-w-[200px]">
                    Links de compartilhamento do Google Photos geralmente não funcionam diretamente em sites.
                    <br/><br/>
                    Recomendado: Salve a foto como <strong>professor.jpg</strong> na pasta do projeto.
                  </p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mediaGreen/20 text-mediaGreen border border-mediaGreen/30 text-xs font-bold mb-2 backdrop-blur-sm">
                  <Award className="w-3 h-3" />
                  Presidente AMIB (18-19)
                </div>
                <h3 className="text-2xl font-bold text-white">O Professor</h3>
                <p className="text-mediaBlue text-sm font-medium">Liderança & Inovação</p>
              </div>
            </div>

            {/* Tech Stack Floating Badges */}
            <div className="absolute -right-6 top-10 bg-white border border-slate-200 p-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce duration-[3000ms]">
              <Activity className="w-5 h-5 text-mediaPink" />
              <span className="text-xs font-mono text-slate-600">Comissão de Título</span>
            </div>
            <div className="absolute -left-6 bottom-20 bg-white border border-slate-200 p-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce duration-[4000ms]">
              <Database className="w-5 h-5 text-mediaPurple" />
              <span className="text-xs font-mono text-slate-600">Comitê de IA</span>
            </div>
          </div>

          {/* Column 2: Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
              A autoridade de quem participa e ajuda a definir os rumos da <br />
              <span className={GRADIENT_TEXT_CLASS}>Medicina Intensiva</span> no Brasil.
            </h2>
            
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Médico com formação consolidada em <strong>Medicina Intensiva e Cardiologia</strong>, foi Diretor Presidente da AMIB (2018-2019) e integra o Conselho Consultivo da associação. 
              <br /><br />
              Atualmente, exerce a <strong>Presidência da Comissão do Título de Especialista da AMIB</strong> (reconduzido para os biênios 2024-2027), cargo chave na certificação em Medicina Intensiva no país. Mestre em Medicina, une uma vasta experiência como educador médico na graduação e como preceptor de residência com o grande conhecimento e entusiasmo por inovação em saúde digital, atuando também como Instrutor do Curso de Inteligência Artificial da AMIB e, como hobby, também desenvolve aplicativos para protocolos clínicos e outras finalidades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                  <Award className="w-6 h-6 text-mediaBlue" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Liderança Nacional</h4>
                  <p className="text-slate-500 text-sm">Ex-Presidente da AMIB e atual Presidente da Comissão do Título de Especialista (TE-AMIB).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                  <Code className="w-6 h-6 text-mediaPink" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Inovação Digital</h4>
                  <p className="text-slate-500 text-sm">Membro do Comitê de IA da AMIB e desenvolvedor de apps para suporte à decisão clínica.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                  <Activity className="w-6 h-6 text-mediaPurple" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Expertise Técnica</h4>
                  <p className="text-slate-500 text-sm">Palestrante internacional em Ultrassonografia, Hemodinâmica e Choque Circulatório, além de editor de diversos livros e autor de inúmeros capítulos.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                  <GraduationCap className="w-6 h-6 text-mediaGreen" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold mb-1">Mestre e Mentor</h4>
                  <p className="text-slate-500 text-sm">Atuou como chefe de diversas UTIs e formador de gerações de residentes em João Pessoa (PB).</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-700 italic font-medium">
                  "Minha trajetória na AMIB e na beira do leito me ensinou que a tecnologia só tem valor se melhorar o desfecho do paciente. É isso que vamos fazer com a IA."
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};