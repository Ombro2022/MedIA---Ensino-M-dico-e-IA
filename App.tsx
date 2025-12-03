import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Syllabus } from './components/Syllabus';
import { Instructor } from './components/Instructor';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Secretary } from './components/Secretary';
import { StudentArea } from './components/StudentArea';
import { Footer } from './components/Footer';
import { GeminiChat } from './components/GeminiChat';
import { Registration } from './components/Registration';
import { SelectedPlan } from './types';

type ViewState = 'home' | 'register';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);

  const handlePlanSelect = (plan: SelectedPlan) => {
    setSelectedPlan(plan);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-mediaPink selection:text-white">
      <Navbar onHomeClick={handleBackToHome} currentView={currentView} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
            <Instructor />
            <Syllabus />
            <Pricing onPlanSelect={handlePlanSelect} />
            <Secretary />
            <StudentArea />
            <Faq />
          </>
        ) : (
          selectedPlan && (
            <Registration 
              selectedPlan={selectedPlan} 
              onBack={handleBackToHome} 
            />
          )
        )}
      </main>

      <Footer />
      <GeminiChat />
    </div>
  );
}

export default App;