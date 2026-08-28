import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MAIN_GUIDES } from '../data/healthData';

interface MainGuidesProps {
  onOpenArticle: (articleId: string) => void;
}

export const MainGuides: React.FC<MainGuidesProps> = ({ onOpenArticle }) => {
  return (
    <section id="guides" className="w-full py-16 sm:py-24 bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941] block mb-2">
            Znalostní báze & Pilíře zdraví
          </span>
          <h2 className="font-serif-editorial text-[32px] sm:text-[42px] leading-[1.15] font-semibold text-[#18211C] mb-4">
            Projděte si hlavní průvodce
          </h2>
          <p className="text-[17px] leading-relaxed text-[#66736A]">
            Čtyři ucelené tematické okruhy. Od pochopení původu bolesti přes konkrétní cviky 
            až po správné spánkové návyky pro plnou regeneraci těla.
          </p>
        </div>

        {/* 4 Thematic Pillars (2x2 Grid, No Card Borders/Shadows, Pure Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {MAIN_GUIDES.map((guide) => (
            <div key={guide.number} className="flex flex-col">
              
              {/* Visual Anchor: Typographic Number + Sage Accent Bar */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#2F5941]/60 select-none">
                  {guide.number}
                </span>
                <div className="h-[2px] flex-1 bg-[#C9DCCF]"></div>
              </div>

              {/* Title */}
              <h3 className="font-serif-editorial text-2xl sm:text-[26px] font-semibold text-[#18211C] mb-3">
                {guide.title}
              </h3>

              {/* Perex */}
              <p className="text-[15px] leading-relaxed text-[#66736A] mb-6">
                {guide.description}
              </p>

              {/* 3 Clickable Text Links */}
              <div className="flex flex-col divide-y divide-[#DDE5DD] border-t border-b border-[#DDE5DD]">
                {guide.links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onOpenArticle(link.id)}
                    className="editorial-row group py-3.5 flex items-center justify-between text-left hover:bg-[#EAF4EE] px-2 -mx-2 rounded transition-colors cursor-pointer focus:outline-none"
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
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
