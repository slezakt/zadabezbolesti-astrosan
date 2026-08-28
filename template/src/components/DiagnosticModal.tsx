import React from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Activity, Ban } from 'lucide-react';
import { DiagnosticItem } from '../types';

interface DiagnosticModalProps {
  item: DiagnosticItem | null;
  onClose: () => void;
  onOpenArticle: (articleId: string) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  item,
  onClose,
  onOpenArticle
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18211C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAF4EE] text-[#66736A] hover:text-[#18211C] transition-colors cursor-pointer"
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#F2644B]"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941]">
            Diagnostický protokol
          </span>
        </div>

        {/* Main Title */}
        <h2 className="font-serif-editorial text-[28px] sm:text-[32px] leading-tight font-semibold text-[#18211C] mb-2 pr-8">
          {item.title}
        </h2>

        <p className="text-[15px] text-[#66736A] leading-relaxed mb-6">
          {item.shortDesc}
        </p>

        {/* 1. Safe First Steps */}
        <div className="mb-6 bg-[#EAF4EE] rounded-xl p-5 border border-[#DDE5DD]">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-[#2F5941]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#173326]">
              Co udělat jako první (okamžitá úleva)
            </h3>
          </div>
          <ul className="space-y-2.5 text-[14px] text-[#18211C]">
            {item.safeFirstSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#173326] text-[#F7F5EF] text-[11px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Gentle Safe Exercises */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-[#2F5941]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#18211C]">
              Doporučené uvolňovací cviky
            </h3>
          </div>
          <div className="space-y-3">
            {item.exercises.map((exercise, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#DDE5DD]">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-[15px] text-[#18211C]">
                    {exercise.name}
                  </h4>
                  <span className="text-xs font-mono text-[#2F5941] bg-[#EAF4EE] px-2 py-0.5 rounded">
                    {exercise.reps}
                  </span>
                </div>
                <p className="text-[13.5px] text-[#66736A] leading-relaxed">
                  {exercise.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. What to Avoid (Do's & Don'ts) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Ban className="w-4 h-4 text-[#66736A]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#18211C]">
              Čeho se vyvarovat
            </h3>
          </div>
          <ul className="space-y-2 text-[13.5px] text-[#66736A]">
            {item.whatToAvoid.map((avoid, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#F2644B] font-bold">•</span>
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Red Flags Warning Box */}
        <div className="mb-8 p-4 rounded-xl bg-[#FFF1E8] border-l-4 border-[#F2644B]">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#F2644B]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F2644B]">
              Varovné příznaky (kdy jít k lékaři)
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-[#18211C]">
            {item.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#F2644B]">⚠</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DDE5DD]">
          {item.recommendedArticleId && (
            <button
              onClick={() => {
                onClose();
                onOpenArticle(item.recommendedArticleId!);
              }}
              className="text-sm font-semibold text-[#2F5941] hover:text-[#173326] inline-flex items-center gap-1 link-underline cursor-pointer"
            >
              <span>Přečíst celý článek k tomuto tématu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="btn-press w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#173326] text-[#F7F5EF] text-sm font-medium hover:bg-[#2F5941] transition-colors ml-auto cursor-pointer"
          >
            Rozumím, zavřít
          </button>
        </div>

      </div>
    </div>
  );
};
