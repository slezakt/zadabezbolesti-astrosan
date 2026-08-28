import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenChecklist: () => void;
  onOpenRedFlags: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenChecklist,
  onOpenRedFlags
}) => {
  return (
    <footer className="w-full bg-[#EAF4EE] border-t border-[#DDE5DD] py-14 text-[#18211C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DDE5DD]">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#18211C] mb-3">
              ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
            </span>
            <p className="text-[14px] leading-relaxed text-[#66736A] max-w-sm mb-4">
              Prémiový digitální zdravotní průvodce a ergonomický kalkulátor. 
              Pomáháme lidem se sedavým zaměstnáním udělat bezpečný první krok k úlevě od bolesti zad.
            </p>
            <div className="text-xs text-[#66736A]">
              Obsah je koncipován podle doporučení České fyzioterapeutické společnosti a standardů ISO 9241.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#173326] mb-4">
              Sekce a témata
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#18211C]">
              <li>
                <button 
                  onClick={() => onNavigateSection('diagnostic')}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer"
                >
                  Diagnostický rozcestník
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('quick-relief')}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer"
                >
                  Rychlá pomoc u stolu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer"
                >
                  Ergonomická kalkulačka
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('guides')}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer"
                >
                  Hlavní průvodce (01–04)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('articles')}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer"
                >
                  Nejčtenější návody
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Disclaimer */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#173326] mb-4">
              Nástroje a bezpečí
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#18211C] mb-6">
              <li>
                <button 
                  onClick={onOpenChecklist}
                  className="hover:text-[#2F5941] link-underline text-left cursor-pointer font-medium"
                >
                  Ergonomický checklist pracoviště (8 bodů)
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenRedFlags}
                  className="text-[#F2644B] hover:text-[#173326] link-underline text-left cursor-pointer font-medium"
                >
                  Varovné signály a kdy volat lékaře
                </button>
              </li>
            </ul>

            <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#DDE5DD] text-xs text-[#66736A] leading-relaxed">
              <strong>Upozornění:</strong> Informace na tomto webu mají výhradně edukativní charakter a v žádném případě nenahrazují odborné lékařské vyšetření ani individuální fyzioterapii.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#66736A] gap-4">
          <div>
            © {new Date().getFullYear()} ZádaBezBolesti.cz. Všechna práva vyhrazena.
          </div>
          <div className="flex items-center gap-1">
            <span>Vytvořeno s důrazem na čistou typografii a lidské zdraví</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
