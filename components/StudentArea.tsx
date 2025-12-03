import React, { useState } from 'react';
import { Users, Mail, Phone, BookOpen, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GRADIENT_TEXT_CLASS } from '../constants';

export const StudentArea: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    modulo: '',
    cidade: '',
    estado: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Aqui você vai configurar a URL do Google Apps Script
      const SCRIPT_URL = 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Importante para Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      // Com no-cors, sempre será sucesso se não houver erro de rede
      setStatus('success');
      setMessage('Cadastro realizado com sucesso! Você receberá comunicados sobre o curso.');
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        modulo: '',
        cidade: '',
        estado: ''
      });

    } catch (error) {
      setStatus('error');
      setMessage('Erro ao enviar cadastro. Tente novamente ou entre em contato pelo WhatsApp.');
      console.error('Erro:', error);
    }
  };

  return (
    <section id="area-aluno" className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-mediaPurple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-mediaBlue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mediaPurple/10 text-mediaPurple border border-mediaPurple/20 text-sm font-bold mb-6">
            <Users className="w-4 h-4" />
            Área do Aluno
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Mantenha-se <span className={GRADIENT_TEXT_CLASS}>Conectado</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Cadastre-se para receber comunicados importantes, materiais de apoio, lembretes de atividades e atualizações exclusivas sobre o curso.
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Info Column */}
              <div className="lg:w-2/5 bg-gradient-to-br from-mediaPurple to-mediaBlue p-8 lg:p-10 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Por que se cadastrar?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Comunicados Importantes</h4>
                      <p className="text-sm text-white/80">Receba avisos sobre aulas, mudanças de agenda e eventos especiais.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Material de Apoio</h4>
                      <p className="text-sm text-white/80">Acesse apostilas, slides e recursos complementares diretamente.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Lembretes por WhatsApp</h4>
                      <p className="text-sm text-white/80">Alertas sobre prazos, entregas e atividades práticas.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
                  <p className="text-xs text-white/90">
                    🔒 Seus dados são confidenciais e usados apenas para comunicação relacionada ao curso MedIA.
                  </p>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:w-3/5 p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Nome Completo */}
                  <div>
                    <label htmlFor="nome" className="block text-sm font-bold text-slate-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-bold text-slate-700 mb-2">
                      WhatsApp (com DDD) *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all"
                      placeholder="(83) 98765-4321"
                    />
                  </div>

                  {/* Módulo */}
                  <div>
                    <label htmlFor="modulo" className="block text-sm font-bold text-slate-700 mb-2">
                      Módulo Matriculado *
                    </label>
                    <select
                      id="modulo"
                      name="modulo"
                      value={formData.modulo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Selecione o módulo</option>
                      <option value="ECG">Eletrocardiografia com IA</option>
                      <option value="Gasometria">Gasometria com IA</option>
                      <option value="Ambos">Ambos os Módulos (80h)</option>
                    </select>
                  </div>

                  {/* Cidade e Estado */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cidade" className="block text-sm font-bold text-slate-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all"
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div>
                      <label htmlFor="estado" className="block text-sm font-bold text-slate-700 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        maxLength={2}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mediaPurple focus:border-transparent transition-all"
                        placeholder="UF"
                      />
                    </div>
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-green-800">{message}</p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{message}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-gradient-to-r from-mediaPurple to-mediaBlue text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Cadastrar Agora
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    * Campos obrigatórios
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
