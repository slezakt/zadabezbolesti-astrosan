import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MAIN_GUIDES } from '../../data/healthData';

export const MainGuides: React.FC = () => {
  return (
    <section id="guides" className="w-full py-16 sm:py-24 bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941] block mb-2">
            Tematické pilíře
          </span>
          <h2 className="font-serif-editorial text-[32px] sm:text-[42px] leading-[1.15] font-semibold text-[#18211C] mb-4">
            Projděte si hlavní průvodce
          </h2>
          <p className="text-[17px] leading-relaxed text-[#66736A]">
            Čtyři ucelené tematické okruhy pro ergonomii, šetrný pohyb, spánek a bezpečnou orientaci v potížích se zády.
          </p>
        </div>

        {/* 4 Thematic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
          {MAIN_GUIDES.map((guide) => (
            <div key={guide.number} className="flex flex-col">
              
              {/* Visual Anchor: Typographic Number + Sage Accent Bar */}
              <a href={guide.pillarHref} className="flex items-center gap-4 mb-4 group focus:outline-none">
                <span className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#2F5941]/35 select-none group-hover:text-[#2F5941]/70 transition-colors">
                  {guide.number}
                </span>
                <div className="h-px flex-1 bg-[#C9DCCF] group-hover:bg-[#2F5941] transition-colors"></div>
              </a>

              {/* Title as Link to Pillar Page */}
              <h3 className="font-serif-editorial text-2xl sm:text-[26px] font-semibold text-[#18211C] mb-3 hover:text-[#2F5941] transition-colors">
                <a href={guide.pillarHref}>{guide.title}</a>
              </h3>

              {/* Perex */}
              <p className="text-[15px] leading-relaxed text-[#66736A] mb-6">
                {guide.description}
              </p>

              {/* Clickable Text Links */}
              <div className="flex flex-col divide-y divide-[#DDE5DD] border-t border-b border-[#DDE5DD]">
                {guide.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="editorial-row group py-3.5 flex items-center justify-between text-left hover:bg-[#EAF4EE] px-2 -mx-2 rounded transition-colors"
                  >
                    <span className="text-[15px] font-medium text-[#18211C] group-hover:text-[#173326] link-underline">
                      {link.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#66736A] hidden sm:inline">
                        {link.readTime}
                      </span>
                      <div className="row-arrow text-[#66736A] group-hover:text-[#F2644B] transition-transform duration-150">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
