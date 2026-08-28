import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Activity, Laptop, Moon, Smile, Sparkles } from 'lucide-react';
import { DIAGNOSTIC_ITEMS } from '../../data/healthData';
import type { PainCategory } from '../../types/health';

interface HeroDiagnosticProps {
  onSelectPain?: (id: PainCategory) => void;
}

export const HeroDiagnostic: React.FC<HeroDiagnosticProps> = () => {
  // Map icons
  const getIcon = (id: PainCategory) => {
    switch (id) {
      case 'scapula': return <Activity className="w-5 h-5 text-[#2F5941]" />;
      case 'lumbar': return <ShieldCheck className="w-5 h-5 text-[#2F5941]" />;
      case 'neck': return <Compass className="w-5 h-5 text-[#2F5941]" />;
      case 'sleep': return <Moon className="w-5 h-5 text-[#2F5941]" />;
      case 'computer': return <Laptop className="w-5 h-5 text-[#2F5941]" />;
      case 'stress': return <Smile className="w-5 h-5 text-[#2F5941]" />;
      default: return <Activity className="w-5 h-5 text-[#2F5941]" />;
    }
  };

  return (
    <section id="diagnostic" className="w-full pt-6 pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Asymmetric Split 60/40 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (60% -> 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Editorial Category Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F2644B]"></span>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941]">
                Bezpečný první krok • Zdravotní rozcestník
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-serif-editorial text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.1] font-semibold text-[#18211C] tracking-tight mb-6">
              Najděte, proč vás bolí záda, <br className="hidden sm:inline" />
              a co s tím udělat <span className="italic font-normal">jako první</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[18px] leading-[1.6] text-[#66736A] max-w-2xl mb-12">
              Praktické návody, cviky a ergonomické tipy pro lidi, kteří sedí u počítače, 
              budí se s bolestí zad nebo cítí napětí v krku, bedrech a mezi lopatkami.
            </p>

            {/* Diagnostic Selection Panel - "Co vás trápí nejvíc?" */}
            <div className="mt-2">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DDE5DD]">
                <h2 className="text-[15px] font-semibold uppercase tracking-wider text-[#18211C]">
                  Co vás trápí nejvíc?
                </h2>
                <span className="text-xs text-[#66736A]">
                  Vyberte oblast pro okamžitý návod
                </span>
              </div>

              {/* 2x3 Grid on Desktop, 1 Col on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {DIAGNOSTIC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="editorial-row group w-full min-h-[56px] py-3.5 px-3 -mx-3 flex items-center justify-between border-b border-[#DDE5DD] text-left hover:bg-[#EAF4EE] rounded-md transition-all cursor-pointer focus:outline-none"
                    aria-label={`Zobrazit průvodce pro: ${item.title}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-1.5 rounded bg-[#EAF4EE] group-hover:bg-[#C9DCCF] transition-colors">
                        {getIcon(item.id)}
                      </div>
                      <div>
                        <span className="text-[16px] font-semibold text-[#18211C] group-hover:text-[#173326] transition-colors block">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    
                    <div className="row-arrow text-[#66736A] group-hover:text-[#F2644B] transition-transform duration-150 pr-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[#66736A]">
                <Sparkles className="w-3.5 h-3.5 text-[#2F5941]" />
                <span>Obsahuje okamžité bezpečné cviky, doporučené pozice a varovné červené vlajky.</span>
              </div>
            </div>

          </div>

          {/* Right Column (40% -> 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Visual Workspace Canvas */}
            <div className="relative w-full rounded-[24px] overflow-hidden bg-[#EAF4EE] border border-[#DDE5DD]">
              
              {/* Ergonomic Lifestyle Photography */}
              <img
                src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80"
                alt="Správné ergonomické držení těla u stolu s monitorem"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
              />

              {/* Floating UI Elements */}
              <div className="absolute top-8 left-6 sm:left-8 bg-[#F7F5EF] border border-[#DDE5DD] rounded-xl px-4 py-2.5 max-w-[210px] shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2F5941]"></span>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#2F5941]">
                    Výška monitoru
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#18211C] mt-0.5">
                  V horizontální rovině očí
                </p>
                <div className="text-[11px] text-[#66736A] mt-0.5">
                  Šíje zůstává v neutrální ose
                </div>
              </div>

              <div className="absolute bottom-8 right-6 sm:right-8 bg-[#F7F5EF] border border-[#DDE5DD] rounded-xl px-4 py-2.5 max-w-[210px] shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2644B]"></span>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#F2644B]">
                    Správný úhel: 90°
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#18211C] mt-0.5">
                  Předloktí opřená na stole
                </p>
                <div className="text-[11px] text-[#66736A] mt-0.5">
                  Trapézy jsou zcela uvolněné
                </div>
              </div>

            </div>

            {/* Micro Caption */}
            <p className="text-xs text-[#66736A] mt-3.5 text-center sm:text-left">
              Ergonomický standard ISO 9241 pro prevenci statického svalového přetížení.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
