import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { ARTICLES } from '../../data/healthData';

export const PopularArticles: React.FC = () => {
  const featuredArticle = ARTICLES.find((a) => a.isFeatured) || ARTICLES[0];
  const sideArticles = ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 4);

  return (
    <section id="articles" className="w-full py-16 sm:py-24 bg-[#F7F5EF] border-t border-[#DDE5DD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941] block mb-2">
              Knihovna znalostí
            </span>
            <h2 className="font-serif-editorial text-[32px] sm:text-[40px] leading-[1.15] font-semibold text-[#18211C]">
              Nejčtenější návody
            </h2>
          </div>
          <p className="text-[15px] text-[#66736A] max-w-sm mt-2 sm:mt-0">
            Hloubkové rozbory příčin a ověřené postupy pro každodenní prevenci.
          </p>
        </div>

        {/* Asymmetric Editorial Hub (60% / 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Dominant Featured Article (Left 60% -> 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <a
              href={featuredArticle.href}
              className="group text-left focus:outline-none block w-full"
            >
              {/* Photo with 24px radius */}
              <div className="w-full h-[300px] sm:h-[380px] rounded-[24px] overflow-hidden bg-[#EAF4EE] mb-6 border border-[#DDE5DD]">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80"
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Tag and Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5941] bg-[#C9DCCF]/50 px-2.5 py-1 rounded">
                  {featuredArticle.tag}
                </span>
                <span className="text-xs text-[#66736A] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              {/* Massive H3 */}
              <h3 className="font-serif-editorial text-[26px] sm:text-[34px] leading-[1.2] font-semibold text-[#18211C] group-hover:text-[#2F5941] transition-colors mb-3">
                {featuredArticle.title}
              </h3>

              {/* Perex */}
              <p className="text-[16px] leading-[1.6] text-[#66736A] mb-4">
                {featuredArticle.summary}
              </p>

              {/* Author and Action */}
              <div className="flex items-center justify-between pt-3 border-t border-[#DDE5DD]">
                <span className="text-xs text-[#66736A]">
                  Autor: {featuredArticle.author}
                </span>
                <span className="text-[14px] font-semibold text-[#2F5941] group-hover:text-[#F2644B] inline-flex items-center gap-1.5 link-underline">
                  Číst celý návod
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          </div>

          {/* Compact Vertical List (Right 40% -> 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#DDE5DD] border-t border-b lg:border-t-0 border-[#DDE5DD]">
            {sideArticles.map((article) => (
              <a
                key={article.id}
                href={article.href}
                className="editorial-row group py-5 px-3 -mx-3 flex items-start justify-between text-left hover:bg-[#EAF4EE] rounded-lg transition-colors w-full"
              >
                <div className="flex-1 pr-4">
                  {/* Category Tag */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2F5941]">
                      {article.tag}
                    </span>
                    <span className="text-[11px] text-[#66736A]">• {article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif-editorial text-[18px] sm:text-[19px] leading-snug font-semibold text-[#18211C] group-hover:text-[#2F5941] transition-colors mb-1.5">
                    {article.title}
                  </h4>

                  {/* Short summary snippet */}
                  <p className="text-[13.5px] leading-relaxed text-[#66736A] line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="row-arrow text-[#66736A] group-hover:text-[#F2644B] transition-transform duration-150 pt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
