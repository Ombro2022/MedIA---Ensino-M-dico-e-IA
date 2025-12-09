import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Syllabus } from './components/Syllabus';
import { Instructor } from './components/Instructor';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Secretary } from './components/Secretary';
import { StudentArea } from './components/StudentArea';
import { StudentPortal } from './components/StudentPortal';
import { SocialAccessGate } from './components/SocialAccessGate';
import { SocialStudio } from './components/SocialStudio';
import { Footer } from './components/Footer';
import { GeminiChat } from './components/GeminiChat';
import { Registration } from './components/Registration';
import { SelectedPlan } from './types';
import { SOCIAL_AUTH_STORAGE_KEY } from './constants';

type ViewState = 'home' | 'register' | 'portal' | 'social-gate' | 'social-studio';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [socialToken, setSocialToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem(SOCIAL_AUTH_STORAGE_KEY) : null
  );

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === '#/social') {
        setCurrentView((prev) => (prev === 'social-studio' ? prev : 'social-gate'));
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handlePlanSelect = (plan: SelectedPlan) => {
    setSelectedPlan(plan);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPlan(null);
    if (window.location.hash === '#/social') {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessPortal = () => {
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessSocial = () => {
    if (window.location.hash !== '#/social') {
      window.location.hash = '#/social';
    }
    setCurrentView('social-gate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialAuthorized = (token: string) => {
    setSocialToken(token);
    localStorage.setItem(SOCIAL_AUTH_STORAGE_KEY, token);
    setCurrentView('social-studio');
  };

  const handleSocialLogout = () => {
    setSocialToken(null);
    localStorage.removeItem(SOCIAL_AUTH_STORAGE_KEY);
    window.location.hash = '';
    handleBackToHome();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-mediaPink selection:text-white">
      <Navbar
        onHomeClick={handleBackToHome}
        onAccessPortal={handleAccessPortal}
        currentView={currentView}
        onAccessSocial={handleAccessSocial}
        onLogoutStaff={handleSocialLogout}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <Instructor />
            <Syllabus />
            <Pricing onPlanSelect={handlePlanSelect} />
            <Secretary />
            <StudentArea onAccessPortal={handleAccessPortal} />
            <Faq />
          </>
        )}

        {currentView === 'register' && selectedPlan && (
          <Registration 
            selectedPlan={selectedPlan} 
            onBack={handleBackToHome} 
          />
        )}

        {currentView === 'portal' && (
          <StudentPortal onBack={handleBackToHome} />
        )}

        {currentView === 'social-gate' && (
          <SocialAccessGate onSuccess={handleSocialAuthorized} onCancel={handleBackToHome} />
        )}

        {currentView === 'social-studio' && (
          <SocialStudio onExit={handleSocialLogout} />
        )}
      </main>

      <Footer />
      <GeminiChat />
    </div>
  );
}

export default App;