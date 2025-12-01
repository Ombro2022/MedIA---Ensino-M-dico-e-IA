import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import { GRADIENT_TEXT_CLASS } from '../constants';

export const Secretary: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const whatsappNumber = '5583981656212'; // Número formatado para WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-mediaGreen/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-mediaBlue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Fale com nosso <span className={GRADIENT_TEXT_CLASS}>Secretário</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tire suas dúvidas e receba atendimento personalizado com nosso secretário
          </p>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Photo Column */}
              <div className="lg:w-2/5 relative bg-gradient-to-br from-mediaBlue/5 to-mediaPurple/5 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                    {!imageError ? (
                      <img 
                        src="/Siileudo.jpg" 
                        alt="Sisleudo Cândido - Secretário" 
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <Phone className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl border border-slate-200">
                    <p className="text-slate-900 font-bold text-lg">Sisleudo Cândido</p>
                  </div>
                </div>
              </div>

              {/* Contact Info Column */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Atendimento Personalizado
                  </h3>
                  <p className="text-slate-600">
                    Entre em contato para esclarecer dúvidas sobre o curso, inscrições e formas de pagamento.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4 mb-8">
                  {/* WhatsApp - Primary */}
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-mediaGreen to-mediaGreen/90 text-white rounded-2xl hover:shadow-xl hover:shadow-mediaGreen/20 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm mb-1 opacity-90">WhatsApp</p>
                      <p className="text-lg font-bold">+55 83 98165-6212</p>
                    </div>
                    <div className="text-white/70 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+5583981656212"
                    className="flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl hover:border-mediaBlue hover:bg-slate-100 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-mediaBlue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7 text-mediaBlue" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-600 mb-1">Telefone</p>
                      <p className="text-lg font-bold text-slate-900">+55 83 98165-6212</p>
                    </div>
                  </a>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Clock className="w-5 h-5 text-mediaPurple mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Horário de Atendimento</p>
                    <p className="text-sm text-slate-600">
                      Segunda a Sexta: 9h às 18h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
