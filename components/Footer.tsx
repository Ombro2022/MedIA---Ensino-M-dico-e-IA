import React from 'react';
import { Logo } from './Logo';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo className="mb-4" />
            <p className="text-slate-500 text-sm text-center md:text-left max-w-xs">
              Transformando médicos em líderes da era digital por meio da Inteligência Artificial.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-mediaPink transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-mediaBlue transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="text-slate-400 hover:text-mediaGreen transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
          © 2025 MedIA. Todos os direitos reservados. Medicina & Tecnologia.
        </div>
      </div>
    </footer>
  );
};