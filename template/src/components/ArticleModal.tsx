import React from 'react';
import { X, Clock, User, Calendar, ArrowLeft, BookmarkCheck, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenChecklist: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenChecklist
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18211C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] max-w-3xl w-full p-6 sm:p-10 max-h-[92vh] overflow-y-auto relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAF4EE] text-[#66736A] hover:text-[#18211C] transition-colors cursor-pointer"
          aria-label="Zavřít článek"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back Link */}
        <button
          onClick={onClose}
          className="text-xs font-semibold text-[#2F5941] hover:text-[#173326] inline-flex items-center gap-1.5 mb-6 link-underline cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zpět na přehled
        </button>

        {/* Category Tag & Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5941] bg-[#C9DCCF]/50 px-2.5 py-1 rounded">
            {article.tag}
          </span>
          <span className="text-xs text-[#66736A] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-xs text-[#66736A]">
            • {article.date}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="font-serif-editorial text-[28px] sm:text-[36px] leading-[1.18] font-bold text-[#18211C] mb-4 pr-6">
          {article.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 text-xs text-[#66736A] pb-6 mb-6 border-b border-[#DDE5DD]">
          <User className="w-3.5 h-3.5 text-[#2F5941]" />
          <span>{article.author}</span>
        </div>

        {/* Article Content */}
        <div className="prose prose-stone max-w-none text-[#18211C]">
          
          {/* Lead Paragraph */}
          <p className="font-serif-editorial text-[18px] sm:text-[20px] leading-relaxed text-[#18211C] italic mb-8 border-l-2 border-[#2F5941] pl-4">
            {article.fullContent.lead}
          </p>

          {/* Sections */}
          {article.fullContent.sections.map((sec, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="font-serif-editorial text-xl sm:text-2xl font-semibold text-[#18211C] mb-3">
                {sec.heading}
              </h2>
              <p className="text-[16px] leading-[1.65] text-[#18211C]/90 mb-4">
                {sec.body}
              </p>

              {sec.bulletPoints && (
                <ul className="space-y-2 mb-4 text-[15px] text-[#18211C]/90 pl-1">
                  {sec.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#2F5941] font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.tipBox && (
                <div className="bg-[#EAF4EE] p-4 rounded-xl border border-[#DDE5DD] text-[14px] text-[#173326] my-4">
                  {sec.tipBox}
                </div>
              )}
            </div>
          ))}

          {/* Key Takeaways */}
          {article.fullContent.takeaways && article.fullContent.takeaways.length > 0 && (
            <div className="bg-[#EAF4EE] rounded-2xl p-6 border border-[#C9DCCF] mt-8 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BookmarkCheck className="w-5 h-5 text-[#2F5941]" />
                <h3 className="font-serif-editorial text-lg font-bold text-[#173326]">
                  Klíčová doporučení do praxe
                </h3>
              </div>
              <ul className="space-y-2 text-[14.5px] text-[#18211C]">
                {article.fullContent.takeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-[#2F5941] font-bold">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#DDE5DD]">
          <button
            onClick={() => {
              onClose();
              onOpenChecklist();
            }}
            className="text-xs font-semibold text-[#2F5941] hover:text-[#173326] inline-flex items-center gap-1 link-underline cursor-pointer"
          >
            <span>Otevřít související ergonomický checklist</span>
          </button>

          <button
            onClick={onClose}
            className="btn-press w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#173326] text-[#F7F5EF] text-sm font-medium hover:bg-[#2F5941] transition-colors ml-auto cursor-pointer"
          >
            Zavřít článek
          </button>
        </div>

      </div>
    </div>
  );
};
