import React from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EF] border-b border-[#DDE5DD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        <a 
          href="/" 
          className="group flex items-baseline gap-1.5 focus:outline-none"
        >
          <span className="font-serif-editorial text-[25px] font-bold tracking-[-0.035em] text-[#18211C]">
            ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-[#66736A] font-medium border-l border-[#DDE5DD] pl-2.5 ml-1">
            Zdravotní magazín
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#18211C]">
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
            className="hover:text-[#2F5941] link-underline"
          >
            Kalkulačka
          </a>
          <a 
            href="/blog/" 
            className="hover:text-[#2F5941] link-underline"
          >
            Magazín
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <a
            href="/#diagnostic"
            className="text-[14px] font-semibold text-[#173326] link-underline hover:text-[#F2644B]"
          >
            Rychlý rozcestník
          </a>
        </div>

        <details className="group lg:hidden relative">
          <summary className="p-2 -mr-2 text-[#18211C] cursor-pointer focus:outline-none" aria-label="Přepnout menu">
            <Menu className="w-6 h-6 group-open:hidden" aria-hidden="true" />
            <X className="w-6 h-6 hidden group-open:block" aria-hidden="true" />
          </summary>

          <div className="fixed left-0 right-0 top-20 bg-[#F7F5EF] border-b border-[#DDE5DD] px-6 py-6">
            <nav className="max-w-7xl mx-auto flex flex-col text-[17px] font-medium text-[#18211C] divide-y divide-[#DDE5DD]">
              <a href="/typy-bolesti/" className="py-3.5 hover:text-[#2F5941]">Bolesti zad</a>
              <a href="/cviky-na-zada/" className="py-3.5 hover:text-[#2F5941]">Cviky na záda</a>
              <a href="/ergonomie-pracoviste/" className="py-3.5 hover:text-[#2F5941]">Ergonomie pracoviště</a>
              <a href="/zdravy-spanek/" className="py-3.5 hover:text-[#2F5941]">Zdravý spánek</a>
              <a href="/nastroje/kalkulacka/" className="py-3.5 hover:text-[#2F5941]">Ergonomická kalkulačka</a>
              <a href="/blog/" className="py-3.5 hover:text-[#2F5941]">Magazín a články</a>
              <a href="/#diagnostic" className="py-3.5 font-semibold text-[#2F5941]">Rychlý rozcestník podle bolesti</a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
};
