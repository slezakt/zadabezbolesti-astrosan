import React from 'react';

export const QuickRelief: React.FC = () => {
  const steps = [
    'Otevření hrudníku s výdechem do stran (60 s)',
    'Kroužení rameny dozadu a dolů (60 s)',
    'Jemný úklon šíje s volnou paží (60 s)',
  ];

  return (
    <section id="quick-relief" className="w-full py-16 sm:py-24 border-t border-[#DDE5DD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-end mb-9">
          <div className="md:col-span-7">
            <p className="eyebrow mb-2">Prakticky a bezpečně</p>
            <h2 className="font-serif-editorial text-[34px] sm:text-[44px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#18211C]">
              Co můžete udělat během několika minut
            </h2>
          </div>
          <p className="md:col-span-5 text-[15px] leading-relaxed text-[#66736A]">
            Dvě šetrné cesty k uvolnění a jasný bezpečnostní filtr pro situace, kdy domácí cvičení není správná volba.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-y border-[#18211C]">
          <article className="lg:col-span-7 py-9 lg:pr-12">
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="eyebrow">3 minuty u stolu</span>
              <span className="text-xs text-[#66736A]">Kancelářský set</span>
            </div>
            <h3 className="font-serif-editorial text-[29px] sm:text-[36px] leading-[1.12] font-semibold text-[#18211C] mb-4">
              Krátké protažení po dlouhém sezení
            </h3>
            <p className="text-[16px] leading-relaxed text-[#66736A] max-w-2xl mb-8">
              Jemná dechová a mobilizační sekvence přímo na židli. Bez prudkých záklonů a bez pomůcek.
            </p>

            <ol className="border-t border-[#DDE5DD] mb-7">
              {steps.map((step, index) => (
                <li key={step} className="flex items-baseline gap-4 py-3.5 border-b border-[#DDE5DD] text-[14px] sm:text-[15px]">
                  <span className="font-serif-editorial text-[#2F5941]">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <a href="/blog/strecink-v-kancelari/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F5941] link-underline hover:text-[#F2644B]">
              Kompletní postup krok za krokem <span aria-hidden="true">↗</span>
            </a>
          </article>

          <div className="lg:col-span-5 lg:border-l border-[#DDE5DD] lg:pl-10 divide-y divide-[#DDE5DD]">
            <article className="py-9">
              <p className="eyebrow mb-3">Cílená úleva · Hrudní páteř</p>
              <h3 className="font-serif-editorial text-[25px] sm:text-[29px] leading-[1.15] font-semibold text-[#18211C] mb-3">
                Bolest mezi lopatkami při práci u počítače
              </h3>
              <p className="text-[14px] leading-relaxed text-[#66736A] mb-5">
                Jak propojit výdech s uvolněním spodních žeber a nepřetěžovat citlivou oblast dalším tlakem.
              </p>
              <a href="/blog/bolest-mezi-lopatkami/" className="text-sm font-semibold text-[#2F5941] link-underline hover:text-[#F2644B]">
                Přečíst praktický návod
              </a>
            </article>

            <aside className="py-9" aria-labelledby="red-flags-heading">
              <p className="text-[11px] uppercase tracking-[0.13em] font-bold text-[#C94734] mb-3">Bezpečnostní upozornění</p>
              <h3 id="red-flags-heading" className="font-serif-editorial text-[25px] sm:text-[29px] leading-[1.15] font-semibold text-[#18211C] mb-3">
                Kdy raději necvičit a vyhledat pomoc
              </h3>
              <p className="text-[14px] leading-relaxed text-[#66736A] mb-5">
                Zpozorněte při náhlé silné bolesti, slabosti nebo necitlivosti končetiny, dušnosti či tlaku na hrudi.
              </p>
              <a href="/rizikove-faktory/" className="text-sm font-semibold text-[#C94734] link-underline hover:text-[#18211C]">
                Přehled varovných příznaků
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
