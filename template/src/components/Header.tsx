import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenChecklist: () => void;
  onSelectCategory: (id: any) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenChecklist,
  onSelectCategory,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/90 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo - Pure Typography */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-baseline gap-1.5 focus:outline-none"
        >
          <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#18211C]">
            ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-[#66736A] font-medium border-l border-[#DDE5DD] pl-2.5 ml-1">
            Zdravotní editorial
          </span>
        </a>

        {/* Center Navigation - No borders, pure typography and underline hover */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#18211C]">
          <button 
            onClick={() => handleNavClick('diagnostic')} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer"
          >
            Bolesti zad
          </button>
          <button 
            onClick={() => handleNavClick('quick-relief')} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer"
          >
            Cviky
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer"
          >
            Ergonomie
          </button>
          <button 
            onClick={() => handleNavClick('guides')} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer"
          >
            Spánek
          </button>
          <button 
            onClick={onOpenChecklist} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer inline-flex items-center gap-1"
          >
            Nástroje
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C9DCCF] text-[#173326] font-semibold">Checklist</span>
          </button>
          <button 
            onClick={() => handleNavClick('articles')} 
            className="hover:text-[#2F5941] link-underline focus:outline-none cursor-pointer"
          >
            Články
          </button>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('diagnostic')}
            className="btn-press inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-[#173326] text-[#F7F5EF] text-[15px] font-medium hover:bg-[#2F5941] transition-colors focus:outline-none cursor-pointer"
          >
            Najít pomoc
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#18211C] hover:bg-[#EAF4EE] rounded-lg transition-colors cursor-pointer"
          aria-label="Přepnout menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5EF] border-b border-[#DDE5DD] px-6 py-6 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-4 text-lg font-medium text-[#18211C]">
            <button 
              onClick={() => handleNavClick('diagnostic')} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Bolesti zad
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </button>
            <button 
              onClick={() => handleNavClick('quick-relief')} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Cviky
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </button>
            <button 
              onClick={() => handleNavClick('calculator')} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Ergonomie a kalkulačka
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </button>
            <button 
              onClick={() => handleNavClick('guides')} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Spánek a regenerace
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </button>
            <button 
              onClick={() => { onOpenChecklist(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              <span>Ergonomický checklist</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#C9DCCF] text-[#173326]">8 kroků</span>
            </button>
            <button 
              onClick={() => handleNavClick('articles')} 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Články a návody
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </button>
            <div className="pt-4 border-t border-[#DDE5DD]">
              <button
                onClick={() => handleNavClick('diagnostic')}
                className="w-full btn-press py-3 rounded-[12px] bg-[#173326] text-[#F7F5EF] text-center font-medium hover:bg-[#2F5941] transition-colors"
              >
                Najít pomoc podle bolesti
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
