import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF]/95 backdrop-blur-md transition-all duration-200 border-b border-[#DDE5DD]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo - Pure Typography */}
        <a 
          href="/" 
          className="group flex items-baseline gap-1.5 focus:outline-none"
        >
          <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#18211C]">
            ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-[#66736A] font-medium border-l border-[#DDE5DD] pl-2.5 ml-1">
            Zdravotní editorial
          </span>
        </a>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#18211C]">
          <a 
            href="/typy-bolesti/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Bolesti zad
          </a>
          <a 
            href="/cviky-na-zada/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Cviky
          </a>
          <a 
            href="/ergonomie-pracoviste/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Ergonomie
          </a>
          <a 
            href="/zdravy-spanek/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Spánek
          </a>
          <a 
            href="/nastroje/kalkulacka/" 
            className="hover:text-[#2F5941] link-underline inline-flex items-center gap-1.5"
          >
            Kalkulačka
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C9DCCF] text-[#173326] font-semibold">ISO</span>
          </a>
          <a 
            href="/blog/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Magazín
          </a>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="/#diagnostic"
            className="btn-press inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-[#173326] text-[#F7F5EF] text-[15px] font-medium hover:bg-[#2F5941] transition-colors shadow-none"
          >
            Najít pomoc
          </a>
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
            <a 
              href="/typy-bolesti/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Bolesti zad
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </a>
            <a 
              href="/cviky-na-zada/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Cviky na záda
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </a>
            <a 
              href="/ergonomie-pracoviste/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Ergonomie pracoviště
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </a>
            <a 
              href="/zdravy-spanek/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Zdravý spánek
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </a>
            <a 
              href="/nastroje/kalkulacka/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              <span>Ergonomická kalkulačka</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#C9DCCF] text-[#173326]">ISO</span>
            </a>
            <a 
              href="/blog/" 
              className="text-left py-2 hover:text-[#2F5941] transition-colors flex items-center justify-between"
            >
              Magazín a články
              <ArrowUpRight className="w-4 h-4 text-[#66736A]" />
            </a>
            <div className="pt-4 border-t border-[#DDE5DD]">
              <a
                href="/#diagnostic"
                className="w-full btn-press py-3 rounded-[12px] bg-[#173326] text-[#F7F5EF] text-center font-medium hover:bg-[#2F5941] transition-colors block"
              >
                Najít pomoc podle bolesti
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
