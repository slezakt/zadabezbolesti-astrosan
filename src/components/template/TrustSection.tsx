import React from 'react';

export const TrustSection: React.FC = () => {
  const principles = [
    {
      title: 'Bezpečnost před rychlými sliby',
      text: 'Domácí postupy popisujeme jako první pomoc a prevenci, ne jako náhradu diagnózy nebo léčby.',
    },
    {
      title: 'Varovné příznaky na viditelném místě',
      text: 'U návodů oddělujeme běžné přetížení od situací, které patří lékaři nebo záchranné službě.',
    },
    {
      title: 'Dohledatelné podklady',
      text: 'U konkrétních ergonomických hodnot a zdravotních tvrzení má být zřejmé, z jakých doporučení vycházejí.',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-y border-[#DDE5DD] bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Redakční standard</p>
            <h2 className="font-serif-editorial text-[36px] sm:text-[48px] leading-[1.06] font-semibold tracking-[-0.03em] text-[#18211C] mb-6">
              Praktické rady nejsou náhradou lékaře
            </h2>
            <p className="text-[16px] leading-relaxed text-[#66736A] max-w-lg mb-7">
              Pomáháme s orientací, prevencí a bezpečnými prvními kroky. Náhlá, silná nebo dlouhodobá bolest patří vždy k odborníkovi.
            </p>
            <div className="border-l-2 border-[#C94734] pl-5 py-1 text-[14px] leading-relaxed text-[#18211C] max-w-lg">
              Akutní nesnesitelná bolest, porucha citlivosti, ztráta hybnosti, dušnost nebo tlak na hrudi vyžadují neodkladnou pomoc. Volejte <strong>155</strong>.
            </div>
          </div>

          <div className="lg:col-span-7 border-t-2 border-[#18211C]">
            {principles.map((principle, index) => (
              <div key={principle.title} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_12rem_1fr] gap-3 sm:gap-6 py-6 border-b border-[#DDE5DD]">
                <span className="font-serif-editorial text-xl text-[#2F5941]">0{index + 1}</span>
                <h3 className="font-serif-editorial text-[19px] leading-snug font-semibold text-[#18211C]">{principle.title}</h3>
                <p className="col-start-2 sm:col-start-auto text-[14px] leading-relaxed text-[#66736A]">{principle.text}</p>
              </div>
            ))}
            <a href="/rizikove-faktory/" className="inline-block mt-7 text-sm font-semibold text-[#2F5941] link-underline hover:text-[#F2644B]">
              Varovné příznaky a kdy vyhledat pomoc
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
