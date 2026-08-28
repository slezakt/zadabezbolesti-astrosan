import React from 'react';
import { X, AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface RedFlagsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RedFlagsModal: React.FC<RedFlagsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18211C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAF4EE] text-[#66736A] hover:text-[#18211C] transition-colors cursor-pointer"
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F2644B]"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#F2644B]">
            Bezpečnostní protokol • Červené vlajky
          </span>
        </div>

        <h2 className="font-serif-editorial text-[26px] sm:text-[30px] font-semibold text-[#18211C] mb-2 pr-8">
          Kdy necvičit a okamžitě vyhledat lékaře
        </h2>

        <p className="text-[14.5px] text-[#66736A] mb-6">
          Většina bolestí zad pramení ze svalového přetížení. Pokud se však objeví níže uvedené příznaky, 
          může jít o závažnější neurologický či vnitřní problém.
        </p>

        {/* Emergency Call Box */}
        <div className="bg-[#FFF1E8] border-l-4 border-[#F2644B] rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <PhoneCall className="w-5 h-5 text-[#F2644B]" />
            <h3 className="font-bold text-[15px] text-[#18211C]">
              Okamžitá pohotovost / Linka 155
            </h3>
          </div>
          <p className="text-xs text-[#18211C]/90 leading-relaxed">
            Při náhlé ztrátě citlivosti v oblasti genitálií/konečníku, poruše kontroly močení nebo stolice (syndrom cauda equina), nebo při bolesti zad provázené tlakem na hrudi a dušností neprodleně volejte záchrannou službu.
          </p>
        </div>

        {/* Categories of Red Flags */}
        <div className="space-y-4 mb-6">
          
          <div className="p-4 rounded-xl bg-white border border-[#DDE5DD]">
            <h4 className="font-semibold text-[15px] text-[#18211C] mb-1.5 flex items-center gap-2">
              <span className="text-[#F2644B] font-bold">1.</span>
              Neurologické varovné signály
            </h4>
            <ul className="text-xs text-[#66736A] space-y-1.5 pl-4 list-disc">
              <li>Ostrá, vystřelující bolest pod koleno nebo do prstů nohy (ischias) se ztrátou síly.</li>
              <li>Propadávání špičky při chůzi (zakopávání o koberec).</li>
              <li>Trvalé brnění či necitlivost paží, které se nezlepší po změně polohy.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE5DD]">
            <h4 className="font-semibold text-[15px] text-[#18211C] mb-1.5 flex items-center gap-2">
              <span className="text-[#F2644B] font-bold">2.</span>
              Zánětlivé a noční bolesti
            </h4>
            <ul className="text-xs text-[#66736A] space-y-1.5 pl-4 list-disc">
              <li>Bolest, která vás budí pravidelně v noci a v klidu se zhoršuje.</li>
              <li>Ranní ztuhlost zad trvající déle než 60 minut provázená únavou.</li>
              <li>Bolest zad doprovázená nevysvětlitelnou horečkou nebo úbytkem váhy.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DDE5DD]">
            <h4 className="font-semibold text-[15px] text-[#18211C] mb-1.5 flex items-center gap-2">
              <span className="text-[#F2644B] font-bold">3.</span>
              Bolest po úrazu
            </h4>
            <ul className="text-xs text-[#66736A] space-y-1.5 pl-4 list-disc">
              <li>Bolest zad po pádu, autonehodě či nárazu (zejména u osob s osteoporózou).</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-[#DDE5DD]">
          <button
            onClick={onClose}
            className="btn-press px-6 py-2.5 rounded-xl bg-[#173326] text-[#F7F5EF] text-sm font-medium hover:bg-[#2F5941] transition-colors cursor-pointer"
          >
            Rozumím, zavřít
          </button>
        </div>

      </div>
    </div>
  );
};
