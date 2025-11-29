import React from 'react';
import { FAQ_ITEMS } from '../constants';
import { Plus } from 'lucide-react';

export const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Dúvidas Frequentes</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx} className="group bg-white rounded-2xl border border-slate-200 open:border-mediaBlue/30 shadow-sm transition-all">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <span className="font-semibold text-slate-700 group-hover:text-mediaBlue transition-colors">{item.question}</span>
                <span className="transition-transform group-open:rotate-45">
                  <Plus className="w-5 h-5 text-mediaBlue" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-transparent group-open:border-slate-100 pt-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};