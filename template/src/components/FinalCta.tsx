import React from 'react';
import { Compass, CheckSquare, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onFindHelp: () => void;
  onOpenChecklist: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onFindHelp, onOpenChecklist }) => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#F7F5EF] border-t border-[#DDE5DD]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        
        {/* Subtle decorative dot & tag */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#F2644B]"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941]">
            První krok bez odkládání
          </span>
        </div>

        {/* Massive Centered Editorial Heading */}
        <h2 className="font-serif-editorial text-[36px] sm:text-[46px] lg:text-[50px] leading-[1.12] font-semibold text-[#18211C] tracking-tight mb-6">
          Začněte jednou malou úpravou dnes
        </h2>

        {/* Subtitle */}
        <p className="text-[17px] sm:text-[18px] leading-[1.6] text-[#66736A] max-w-2xl mb-10">
          Změna výšky monitoru o 3 centimetry nebo 3minutové prodýchání bránice 
          dokáže ulevit zádům víc než drahá bederní opěrka koupená naslepo.
        </p>

        {/* Dual Actions: Primary Coral & Outline Deep Forest */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          {/* Primary CTA (Coral) */}
          <button
            onClick={onFindHelp}
            className="btn-press w-full sm:w-auto px-8 py-4 rounded-[12px] bg-[#F2644B] text-white font-semibold text-[16px] hover:bg-[#e05138] transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-none"
          >
            <Compass className="w-5 h-5" />
            <span>Najít podle bolesti</span>
          </button>

          {/* Secondary CTA (Outline Deep Forest) */}
          <button
            onClick={onOpenChecklist}
            className="btn-press w-full sm:w-auto px-8 py-4 rounded-[12px] border-2 border-[#173326] text-[#173326] hover:bg-[#173326] hover:text-[#F7F5EF] font-semibold text-[16px] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <CheckSquare className="w-5 h-5" />
            <span>Otevřít ergonomický checklist</span>
          </button>

        </div>

        {/* Micro reassurance */}
        <p className="text-xs text-[#66736A] mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2F5941]" />
          <span>Zdarma, bez registrace, založeno na lékařských standardech.</span>
        </p>

      </div>
    </section>
  );
};
