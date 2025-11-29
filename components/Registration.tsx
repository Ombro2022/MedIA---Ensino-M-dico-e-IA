import React, { useState, useEffect } from 'react';
import { SelectedPlan } from '../types';
import { ArrowLeft, CheckCircle, Lock, User, Mail, Phone, FileText, CreditCard, School, Calendar, BookOpen, Layers } from 'lucide-react';
import { GRADIENT_TEXT_CLASS } from '../constants';

interface RegistrationProps {
  selectedPlan: SelectedPlan;
  onBack: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ selectedPlan, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
    medicalSchool: '',
    period: '',
    specialty: ''
  });
  
  const [selectedModule, setSelectedModule] = useState<'module1' | 'module2' | 'both'>('module1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate costs based on selection
  const multiplier = selectedModule === 'both' ? 2 : 1;
  const { tier, includePrinted } = selectedPlan;
  
  const moduleCost = tier.modulePrice * multiplier;
  const registrationCost = tier.registrationFee * multiplier;
  const printCost = includePrinted ? (tier.printFee * multiplier) : 0;
  const totalCost = moduleCost + registrationCost + printCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare payload for backend (Linux Server)
    const payload = {
      student: {
        ...formData,
        crm: formData.crm || "Não informado"
      },
      order: {
        planId: tier.id,
        planName: tier.name,
        modules: selectedModule,
        includePrintedMaterial: includePrinted,
        totalValue: totalCost,
        paymentInstallments: 3,
        installmentValue: totalCost / 3
      },
      meta: {
        createdAt: new Date().toISOString(),
        userAgent: navigator.userAgent
      }
    };

    // LOG FOR SERVER DEBUGGING
    console.log("📝 [Registration Payload]:", JSON.stringify(payload, null, 2));
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Inscrição Confirmada!</h2>
          <p className="text-slate-600 mb-8">
            Obrigado por se inscrever no plano <strong>{tier.name}</strong>. 
            Enviamos os dados de acesso e o link de pagamento para o seu e-mail (<strong>{formData.email}</strong>).
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 mb-6 text-left font-mono break-all border border-slate-200">
             <span className="font-bold block mb-1">Payload (Debug):</span>
             Abra o console do navegador (F12) para ver os dados que seriam enviados ao servidor.
          </div>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Voltar para o Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <button 
          onClick={onBack}
          className="group flex items-center text-slate-500 hover:text-mediaBlue transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para opções
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Column */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Finalize sua <span className={GRADIENT_TEXT_CLASS}>Inscrição</span>
              </h1>
              <p className="text-slate-500">Preencha seus dados para garantir sua vaga na próxima turma.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6">
              
              {/* Seleção do Módulo - NEW */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                 <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-mediaBlue" /> Selecione o Conteúdo
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center text-sm font-medium
                        ${selectedModule === 'module1' ? 'border-mediaBlue bg-blue-50 text-mediaBlue' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                        <input type="radio" name="module" value="module1" checked={selectedModule === 'module1'} onChange={() => setSelectedModule('module1')} className="hidden" />
                        Módulo 1: ECG
                    </label>
                    <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center text-sm font-medium
                        ${selectedModule === 'module2' ? 'border-mediaBlue bg-blue-50 text-mediaBlue' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                        <input type="radio" name="module" value="module2" checked={selectedModule === 'module2'} onChange={() => setSelectedModule('module2')} className="hidden" />
                        Módulo 2: Gasometria
                    </label>
                    <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center text-sm font-medium
                        ${selectedModule === 'both' ? 'border-mediaPurple bg-purple-50 text-mediaPurple' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                        <input type="radio" name="module" value="both" checked={selectedModule === 'both'} onChange={() => setSelectedModule('both')} className="hidden" />
                        COMBO: ECG + Gaso (80h)
                    </label>
                 </div>
              </div>

              {/* Dados Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-mediaPurple" /> Nome Completo
                  </label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all"
                    placeholder="Seu nome completo" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-mediaPurple" /> E-mail
                  </label>
                  <input 
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all"
                    placeholder="seu@email.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-mediaPurple" /> WhatsApp
                  </label>
                  <input 
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all"
                    placeholder="(83) 99999-9999" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> CRM / UF <span className="text-xs font-normal text-slate-400 ml-auto">(Opcional)</span>
                  </label>
                  <input 
                    name="crm"
                    value={formData.crm}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all"
                    placeholder="Ex: 12345-PB" 
                  />
                </div>
              </div>

              {/* Dados Acadêmicos */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Dados Acadêmicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <School className="w-4 h-4 text-mediaPurple" /> Faculdade de Medicina
                    </label>
                    <input 
                      required
                      name="medicalSchool"
                      value={formData.medicalSchool}
                      onChange={handleChange}
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all"
                      placeholder="Ex: UFPB, FCM, Unipê..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-mediaPurple" /> Período / Fase
                    </label>
                    <select 
                      required
                      name="period"
                      value={formData.period}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all text-slate-600"
                    >
                      <option value="">Selecione...</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={`${i + 1}º Período`}>{i + 1}º Período</option>
                      ))}
                      <option value="Internato">Internato</option>
                      <option value="Residente">Residente</option>
                      <option value="Formado">Médico Formado</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Área de Interesse Principal</label>
                <select 
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-mediaBlue focus:ring-2 focus:ring-mediaBlue/20 outline-none transition-all text-slate-600"
                >
                  <option value="">Selecione...</option>
                  <option value="intensive_care">Medicina Intensiva</option>
                  <option value="cardiology">Cardiologia</option>
                  <option value="emergency">Medicina de Emergência</option>
                  <option value="internal_medicine">Clínica Médica</option>
                  <option value="anesthesiology">Anestesiologia</option>
                  <option value="surgery">Cirurgia</option>
                  <option value="other">Outra</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-slate-300 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Processando...</>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Ir para Pagamento: {formatCurrency(totalCost)}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Seus dados estão protegidos e não serão compartilhados.
                </p>
              </div>

            </form>
          </div>

          {/* Summary Column */}
          <div className="w-full lg:w-96">
            <div className={`sticky top-28 p-6 rounded-3xl bg-white border shadow-xl ${tier.recommended ? 'border-mediaPurple shadow-purple-100' : 'border-slate-200 shadow-slate-100'}`}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Resumo do Pedido</h3>
              
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
                <div>
                  <h4 className={`text-xl font-bold ${tier.recommended ? 'text-mediaPurple' : 'text-slate-900'}`}>
                    {tier.name}
                  </h4>
                  <span className="text-xs text-slate-500">{tier.audience}</span>
                </div>
              </div>

              {/* Dynamic Items */}
              <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                      <span>Módulo(s):</span>
                      <span className="font-bold">
                        {selectedModule === 'both' ? 'ECG + Gaso (80h)' : selectedModule === 'module1' ? 'ECG (40h)' : 'Gasometria (40h)'}
                      </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                      <span>Valor Base:</span>
                      <span>{formatCurrency(moduleCost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                      <span>Matrícula ({multiplier}x):</span>
                      <span>{formatCurrency(registrationCost)}</span>
                  </div>
                  {includePrinted && (
                     <div className="flex justify-between text-mediaPink font-bold">
                        <span>Material Impresso:</span>
                        <span>{formatCurrency(printCost)}</span>
                    </div>
                  )}
              </div>

              <div className="bg-slate-900 p-4 rounded-xl text-white mb-6">
                 <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Total Final</span>
                    <span className="text-2xl font-bold">{formatCurrency(totalCost)}</span>
                 </div>
                 <div className="text-right text-xs text-slate-400">
                    ou 3x de {formatCurrency(totalCost / 3)}
                 </div>
              </div>

              <div className="space-y-2 mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Incluso no plano</div>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-mediaGreen shrink-0 mt-0.5" />
                        {feature}
                    </div>
                    ))}
                    {includePrinted && (
                        <div className="text-xs text-mediaPurple font-bold flex items-start gap-2">
                            <BookOpen className="w-3 h-3 shrink-0 mt-0.5" />
                            Apostila Impressa
                        </div>
                    )}
              </div>

              <div className="text-xs text-center text-slate-400 border-t border-slate-100 pt-4">
                Garantia de 7 dias ou seu dinheiro de volta.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};