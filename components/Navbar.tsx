import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onHomeClick: () => void;
  currentView: 'home' | 'register';
}

export const Navbar: React.FC<NavbarProps> = ({ onHomeClick, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ementa', target: 'syllabus' },
    { label: 'Investimento', target: 'pricing' },
    { label: 'Contato', target: 'contato' },
    { label: 'Área do Aluno', target: 'area-aluno' },
    { label: 'FAQ', target: 'faq' },
  ];

  const handleScrollTo = (id: string) => {
      if (currentView !== 'home') {
        onHomeClick();
        // Allow time for state update before scrolling
        setTimeout(() => {
            const el = document.getElementById(id);
            if(el) el.scrollIntoView({behavior: 'smooth'});
        }, 100);
      } else {
        const el = document.getElementById(id);
        if(el) el.scrollIntoView({behavior: 'smooth'});
      }
      setMobileMenuOpen(false);
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || currentView === 'register' ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-slate-100' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
          <div onClick={onHomeClick} className="cursor-pointer">
            <Logo />
          </div>
          
          {/* Desktop Menu */}
          {currentView === 'home' && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button 
                    key={link.target} 
                    onClick={() => handleScrollTo(link.target)}
                    className="text-sm font-medium text-slate-600 hover:text-mediaBlue hover:underline decoration-mediaPink underline-offset-4 transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => handleScrollTo('pricing')} className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg">
                Inscreva-se
              </button>
            </div>
          )}

          {currentView === 'register' && (
            <button onClick={onHomeClick} className="hidden md:block text-sm font-bold text-slate-500 hover:text-slate-900">
              Cancelar Inscrição
            </button>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-700 p-2 hover:bg-slate-100 rounded-full transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-visibility duration-300 ${mobileMenuOpen ? 'visible' : 'invisible delay-300'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col pt-28 px-8 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col gap-2">
            <button 
                onClick={onHomeClick}
                className="text-left text-xl font-medium text-slate-600 hover:text-mediaBlue py-4 border-b border-slate-100 transition-colors"
            >
              Início
            </button>
            {currentView === 'home' && navLinks.map((link) => (
                <button 
                    key={link.target} 
                    onClick={() => handleScrollTo(link.target)}
                    className="text-left text-xl font-medium text-slate-600 hover:text-mediaBlue py-4 border-b border-slate-100 transition-colors"
                >
                  {link.label}
                </button>
              ))}
           </div>
            
            {currentView === 'home' && (
              <button onClick={() => handleScrollTo('pricing')} className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                Inscreva-se Agora
              </button>
            )}
            
            <div className="mt-auto mb-8 text-center text-slate-400 text-xs">
              <p>MedIA - Medicina & IA</p>
            </div>
        </div>
      </div>
    </>
  );
};