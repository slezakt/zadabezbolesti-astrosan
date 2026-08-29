import React from 'react';

const NEXT_STEPS = [
  { title: 'Vybrat průvodce podle místa bolesti', href: '#diagnostic', meta: 'Rychlý rozcestník' },
  { title: 'Nastavit stůl, židli a monitor', href: '/ergonomie-pracoviste/', meta: 'Ergonomie' },
  { title: 'Projít všechny odborné návody', href: '/blog/', meta: 'Magazín' },
];

export const FinalCta: React.FC = () => (
  <section className="w-full py-16 sm:py-20 bg-[#F7F5EF]">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-end pb-6 border-b-2 border-[#18211C]">
        <div className="md:col-span-7">
          <p className="eyebrow mb-2">Pokračujte podle své situace</p>
          <h2 className="font-serif-editorial text-[34px] sm:text-[44px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#18211C]">
            Jeden srozumitelný krok je lepší než deset náhodných rad
          </h2>
        </div>
        <p className="md:col-span-5 text-[15px] leading-relaxed text-[#66736A]">
          Vyberte si cestu podle problému, který právě řešíte. Všechny návody jsou dostupné bez registrace.
        </p>
      </div>

      <div className="divide-y divide-[#DDE5DD]">
        {NEXT_STEPS.map((item, index) => (
          <a key={item.href} href={item.href} className="group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_10rem_1fr_auto] items-center gap-3 sm:gap-6 py-5 text-[#18211C] hover:text-[#2F5941]">
            <span className="font-serif-editorial text-[#66736A]">0{index + 1}</span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.12em] font-bold text-[#66736A]">{item.meta}</span>
            <span className="font-serif-editorial text-[20px] sm:text-[23px] font-semibold leading-tight">{item.title}</span>
            <span className="text-lg text-[#66736A] group-hover:text-[#F2644B]" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
