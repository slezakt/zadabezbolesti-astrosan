import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroDiagnostic } from './components/HeroDiagnostic';
import { QuickRelief } from './components/QuickRelief';
import { ErgonomicCalculator } from './components/ErgonomicCalculator';
import { MainGuides } from './components/MainGuides';
import { TrustSection } from './components/TrustSection';
import { PopularArticles } from './components/PopularArticles';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

import { DiagnosticModal } from './components/DiagnosticModal';
import { ChecklistModal } from './components/ChecklistModal';
import { ArticleModal } from './components/ArticleModal';
import { StretchTimerModal } from './components/StretchTimerModal';
import { RedFlagsModal } from './components/RedFlagsModal';

import { DIAGNOSTIC_ITEMS, ARTICLES } from './data/healthData';
import { PainCategory, Article } from './types';

export default function App() {
  // Modal states
  const [selectedPainId, setSelectedPainId] = useState<PainCategory | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [isStretchTimerOpen, setIsStretchTimerOpen] = useState<boolean>(false);
  const [isRedFlagsOpen, setIsRedFlagsOpen] = useState<boolean>(false);

  // Handlers
  const handleSelectPain = (id: PainCategory) => {
    setSelectedPainId(id);
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeDiagnosticItem = DIAGNOSTIC_ITEMS.find((item) => item.id === selectedPainId) || null;
  const activeArticle: Article | null = ARTICLES.find((a) => a.id === selectedArticleId) || null;

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#18211C] flex flex-col font-sans">
      
      {/* 1. Header with fixed blur effect */}
      <Header
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onSelectCategory={handleSelectPain}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-grow">
        {/* 2. Hero Diagnostic Split 60/40 */}
        <HeroDiagnostic
          onSelectPain={handleSelectPain}
        />

        {/* 3. Quick Relief 3-block Section */}
        <QuickRelief
          onStartStretchTimer={() => setIsStretchTimerOpen(true)}
          onSelectPain={handleSelectPain}
          onOpenRedFlagsModal={() => setIsRedFlagsOpen(true)}
        />

        {/* 4. Ergonomic Calculator with Anatomical Diagram */}
        <ErgonomicCalculator
          onOpenChecklist={() => setIsChecklistOpen(true)}
        />

        {/* 5. Main Guides Thematic Pillars (01-04) */}
        <MainGuides
          onOpenArticle={handleOpenArticle}
        />

        {/* 6. Dark Trust Breaker Section */}
        <TrustSection
          onOpenRedFlags={() => setIsRedFlagsOpen(true)}
        />

        {/* 7. Most Read Editorial Articles Hub */}
        <PopularArticles
          onOpenArticle={handleOpenArticle}
        />

        {/* 8. Final Centered CTA */}
        <FinalCta
          onFindHelp={() => handleNavigateSection('diagnostic')}
          onOpenChecklist={() => setIsChecklistOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOpenRedFlags={() => setIsRedFlagsOpen(true)}
      />

      {/* Interactive Modals / Drawers */}
      <DiagnosticModal
        item={activeDiagnosticItem}
        onClose={() => setSelectedPainId(null)}
        onOpenArticle={handleOpenArticle}
      />

      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setSelectedArticleId(null)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      <StretchTimerModal
        isOpen={isStretchTimerOpen}
        onClose={() => setIsStretchTimerOpen(false)}
      />

      <RedFlagsModal
        isOpen={isRedFlagsOpen}
        onClose={() => setIsRedFlagsOpen(false)}
      />

    </div>
  );
}
