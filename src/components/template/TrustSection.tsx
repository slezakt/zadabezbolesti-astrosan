import React from 'react';
import { ShieldCheck, AlertCircle, FileCheck, Stethoscope, ArrowUpRight } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#173326] text-[#F7F5EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Asymmetric Breaker Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Poster Heading */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2644B]"></span>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C9DCCF]">
                  Lékařský disclaimer & Manifest
                </span>
              </div>

              <h2 className="font-serif-editorial text-[38px] sm:text-[48px] lg:text-[54px] leading-[1.08] font-bold text-[#F7F5EF] tracking-tight mb-8">
                Praktické rady, <br />
                <span className="text-[#C9DCCF] font-normal italic">ale ne náhrada</span> <br />
                lékaře
              </h2>
            </div>

            {/* Emergency badge */}
            <div className="p-5 rounded-2xl bg-[#2F5941]/50 border border-[#C9DCCF]/20 text-[#F7F5EF] max-w-md">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-[#F2644B] flex-shrink-0" />
                <p className="text-[14px] leading-snug">
                  Akutní nesnesitelná bolest, poruchy citlivosti nebo ztráta hybnosti vyžadují neodkladnou péči (volejte linku <strong>155</strong>).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Two-segment editorial manifest & 3 Principles */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            
            {/* Manifest Quote Block */}
            <div className="border-l-2 border-[#F2644B] pl-6 sm:pl-8 py-2">
              <p className="font-serif-editorial text-[20px] sm:text-[23px] leading-[1.5] text-[#F7F5EF] mb-4">
                „ZádaBezBolesti.cz pomáhá s orientací, prevencí a bezpečnými prvními kroky. 
                Náhlá, silná nebo dlouhodobá bolest patří vždy k odborníkovi.“
              </p>
              <p className="text-[15px] leading-relaxed text-[#C9DCCF]">
                Naším posláním není diagnostikovat nemoci na dálku ani prodávat zázračné pomůcky. 
                Dáváme vám srozumitelnou mapu k uvolnění těla a přesným návykům, které chrání vaši páteř před degenerací.
              </p>
            </div>

            {/* 3 Core Editorial Principles */}
            <div className="space-y-6 pt-4 border-t border-[#2F5941]">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#C9DCCF]">
                Naše tři etické zásady
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Principle 1 */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-[#F2644B]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[15px] font-semibold text-[#F7F5EF]">
                      Bezpečnost před sliby
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#C9DCCF]/90">
                    Netvrdíme, že 3 cviky vyřeší vyhřezlou ploténku. Učíme bezpečný pohyb bez rizika.
                  </p>
                </div>

                {/* Principle 2 */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-[#F2644B]">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[15px] font-semibold text-[#F7F5EF]">
                      Varovné příznaky
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#C9DCCF]/90">
                    Červené vlajky jsou v každém návodu na prvním místě. Včasné rozpoznání zachraňuje zdraví.
                  </p>
                </div>

                {/* Principle 3 */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2 text-[#F2644B]">
                    <FileCheck className="w-4 h-4" />
                    <span className="text-[15px] font-semibold text-[#F7F5EF]">
                      Odborné revize
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#C9DCCF]/90">
                    Všechny postupy vycházejí z fyzioterapeutických a ergonomických standardů ISO.
                  </p>
                </div>

              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2">
              <a
                href="/rizikove-faktory/"
                className="text-xs font-semibold text-[#F7F5EF] hover:text-[#F2644B] inline-flex items-center gap-1.5 link-underline cursor-pointer"
              >
                <span>Prohlédnout kompletní lékařské standardy a červené vlajky</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
