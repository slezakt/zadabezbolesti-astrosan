import React from 'react';
import { DIAGNOSTIC_ITEMS } from '../../data/healthData';
export const HeroDiagnostic: React.FC = () => {
  return (
    <section id="diagnostic" className="w-full pt-10 sm:pt-14 pb-20 sm:pb-28 scroll-mt-24">
      <span id="potize" className="sr-only"></span>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col">
            <p className="eyebrow mb-5">Bezpečný první krok · Informační rozcestník</p>

            <h1 className="font-serif-editorial text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.02] font-semibold text-[#18211C] tracking-[-0.04em] mb-7">
              Zorientujte se v potížích se zády
            </h1>

            <p className="text-[17px] sm:text-[19px] leading-[1.65] text-[#66736A] max-w-2xl mb-12">
              Srozumitelné informace pro chvíle, kdy vás bolí bedra, šíje nebo oblast mezi lopatkami — včetně situací, kdy domácí cvičení raději odložit a obrátit se na zdravotníka.
            </p>

            <div>
              <div className="flex items-end justify-between gap-5 pb-3 border-b-2 border-[#18211C]">
                <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#18211C]">
                  Co vás trápí nejvíc?
                </h2>
                <span className="hidden sm:block text-xs text-[#66736A]">Vyberte oblast</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {DIAGNOSTIC_ITEMS.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="group min-h-[58px] py-4 flex items-center gap-3 border-b border-[#DDE5DD] text-left hover:text-[#2F5941] focus:outline-none"
                    aria-label={`Zobrazit průvodce pro: ${item.title}`}
                  >
                    <span className="font-serif-editorial text-sm text-[#66736A]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[16px] font-semibold text-[#18211C] group-hover:text-[#2F5941] transition-colors flex-1">{item.title}</span>
                    <span className="text-[#66736A] group-hover:text-[#F2644B] transition-colors" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <article className="lg:col-span-5 lg:border-l lg:border-[#DDE5DD] lg:pl-10 group">
            <a href="/ergonomie-pracoviste/" className="block">
              <img
                src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80"
                alt="Pracovní stůl s monitorem a notebookem"
                className="w-full aspect-[4/3] object-cover object-center mb-5 saturate-[0.82] group-hover:saturate-100 transition-all duration-500"
                loading="eager"
              />
              <span className="eyebrow block mb-2">Doporučený průvodce</span>
              <h2 className="font-serif-editorial text-[27px] sm:text-[32px] leading-[1.12] font-semibold text-[#18211C] group-hover:text-[#2F5941] mb-3">
                Jak si nastavit pracovní místo bez drahých pomůcek
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#66736A]">
                Výška monitoru, poloha předloktí a jednoduché úpravy, které mají při dlouhém sezení největší smysl.
              </p>
              <span className="inline-block mt-5 text-sm font-semibold text-[#2F5941] link-underline">Otevřít průvodce</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
