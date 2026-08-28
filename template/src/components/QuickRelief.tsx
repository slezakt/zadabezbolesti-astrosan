import React from 'react';
import { Play, ArrowRight, AlertTriangle, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PainCategory } from '../types';

interface QuickReliefProps {
  onStartStretchTimer: () => void;
  onSelectPain: (id: PainCategory) => void;
  onOpenRedFlagsModal: () => void;
}

export const QuickRelief: React.FC<QuickReliefProps> = ({
  onStartStretchTimer,
  onSelectPain,
  onOpenRedFlagsModal
}) => {
  return (
    <section id="quick-relief" className="w-full py-16 sm:py-24 bg-[#F7F5EF] border-t border-[#DDE5DD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941] block mb-2">
              Okamžitá intervence
            </span>
            <h2 className="font-serif-editorial text-[32px] sm:text-[40px] leading-[1.15] font-semibold text-[#18211C]">
              Potřebujete úlevu hned?
            </h2>
          </div>
          <p className="text-[15px] text-[#66736A] max-w-md mt-3 md:mt-0">
            Tři rychlé cesty: dvě okamžitá cvičení k židli a zásadní filtr varovných příznaků, kdy cvičení odložit.
          </p>
        </div>

        {/* 3 Content Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Block 1: 3-min Desk Stretch (Mint background) */}
          <div className="bg-[#EAF4EE] rounded-[20px] p-8 flex flex-col justify-between transition-colors hover:bg-[#dfeee5]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2F5941] bg-[#F7F5EF] px-2.5 py-1 rounded-full border border-[#DDE5DD]">
                  <Clock className="w-3.5 h-3.5" />
                  3 minuty u stolu
                </span>
                <span className="text-xs font-mono text-[#66736A]">Kancelářský set</span>
              </div>

              <h3 className="font-serif-editorial text-2xl font-semibold text-[#18211C] mb-3">
                3minutové protažení u stolu
              </h3>

              <p className="text-[15px] leading-relaxed text-[#18211C]/80 mb-6">
                Rychlá dechová a mobilizační sekvence přímo na židli. Otevře zkrácený hrudník, prokrví šíji a uvolní sevření bránice.
              </p>

              {/* Visual Stroke Step Guide */}
              <div className="space-y-2.5 mb-6 text-xs text-[#18211C]/90">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#173326] text-[#F7F5EF] flex items-center justify-center font-mono text-[10px]">1</span>
                  <span>Otevření hrudníku s výdechem do stran (60 s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#173326] text-[#F7F5EF] flex items-center justify-center font-mono text-[10px]">2</span>
                  <span>Kroužení rameny dozadu a dolů (60 s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#173326] text-[#F7F5EF] flex items-center justify-center font-mono text-[10px]">3</span>
                  <span>Jemný úklon šíje s volnou paží (60 s)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onStartStretchTimer}
              className="btn-press w-full py-3 px-4 rounded-xl bg-[#173326] text-[#F7F5EF] font-medium text-[15px] hover:bg-[#2F5941] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Spustit 3minutového průvodce
            </button>
          </div>

          {/* Block 2: Relief from Scapula pain (Mint background) */}
          <div className="bg-[#EAF4EE] rounded-[20px] p-8 flex flex-col justify-between transition-colors hover:bg-[#dfeee5]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2F5941] bg-[#F7F5EF] px-2.5 py-1 rounded-full border border-[#DDE5DD]">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Cílená úleva
                </span>
                <span className="text-xs font-mono text-[#66736A]">Hrudní páteř</span>
              </div>

              <h3 className="font-serif-editorial text-2xl font-semibold text-[#18211C] mb-3">
                Rychlá úleva od bolesti mezi lopatkami
              </h3>

              <p className="text-[15px] leading-relaxed text-[#18211C]/80 mb-6">
                Izometrická relaxace a dechová technika, která uvolní pálivý tlak v mezižeberních svalech bez trhavých pohybů.
              </p>

              <div className="border-l-2 border-[#2F5941] pl-3.5 py-1 mb-6 text-[13px] text-[#18211C]/80 italic">
                „Netlačte tělo do prudkých záklonů. Propojte výdech s uvolněním spodních žeber.“
              </div>
            </div>

            <button
              onClick={() => onSelectPain('scapula')}
              className="btn-press w-full py-3 px-4 rounded-xl bg-[#2F5941] text-[#F7F5EF] font-medium text-[15px] hover:bg-[#173326] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Zobrazit postup krok za krokem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Block 3: Red Flags "Kdy raději nečekat" (Soft Warning background with Coral left border) */}
          <div className="bg-[#FFF1E8] rounded-[20px] p-8 flex flex-col justify-between border-l-4 border-[#F2644B]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F2644B] bg-[#FFF1E8] px-2 py-0.5">
                  <AlertTriangle className="w-4 h-4" />
                  Bezpečnostní filtr
                </span>
                <span className="text-xs font-mono text-[#F2644B]">Červené vlajky</span>
              </div>

              <h3 className="font-serif-editorial text-2xl font-semibold text-[#18211C] mb-3">
                Kdy raději nečekat
              </h3>

              <p className="text-[15px] leading-relaxed text-[#18211C]/90 mb-4">
                Při těchto příznacích nezkoušejte domácí cviky a vyhledejte lékaře nebo volejte 155:
              </p>

              <ul className="space-y-2.5 mb-6 text-[13.5px] text-[#18211C]/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#F2644B] font-bold">•</span>
                  <span>Ostrá bolest vystřelující do nohy či ruky s brněním.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F2644B] font-bold">•</span>
                  <span>Noční klidové bolesti budící ze spánku.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F2644B] font-bold">•</span>
                  <span>Tlak na hrudi, dušnost nebo necitlivost v končetině.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenRedFlagsModal}
              className="btn-press w-full py-3 px-4 rounded-xl border border-[#F2644B] text-[#F2644B] hover:bg-[#F2644B] hover:text-white font-medium text-[15px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Podrobný přehled varovných signálů</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
