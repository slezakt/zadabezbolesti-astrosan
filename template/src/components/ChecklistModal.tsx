import React, { useState } from 'react';
import { X, CheckSquare, Square, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/healthData';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  const [checkedIds, setCheckedIds] = useState<string[]>(['chair-height', 'monitor-top']);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const progress = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  const resetChecklist = () => {
    setCheckedIds([]);
  };

  const checkAll = () => {
    setCheckedIds(CHECKLIST_ITEMS.map((item) => item.id));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18211C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAF4EE] text-[#66736A] hover:text-[#18211C] transition-colors cursor-pointer"
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#2F5941]"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941]">
            Ergonomický nástroj
          </span>
        </div>

        <h2 className="font-serif-editorial text-[28px] sm:text-[32px] leading-tight font-semibold text-[#18211C] mb-2 pr-8">
          8bodový checklist pracovního místa
        </h2>

        <p className="text-[14.5px] text-[#66736A] mb-6">
          Zkontrolujte bod po bodu nastavení svého stolu, židle, obrazovky a pracovních návyků.
        </p>

        {/* Progress Bar */}
        <div className="bg-[#EAF4EE] rounded-xl p-4 border border-[#DDE5DD] mb-6">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-[#173326]">
              Splněno {checkedIds.length} z {CHECKLIST_ITEMS.length} bodů
            </span>
            <span className="text-[#2F5941] font-mono">{progress} %</span>
          </div>
          <div className="w-full h-2.5 bg-[#DDE5DD] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2F5941] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {progress === 100 && (
            <div className="mt-2 text-xs text-[#2F5941] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Skvělá práce! Vaše pracoviště splňuje klíčové ergonomické normy.
            </div>
          )}
        </div>

        {/* Checklist items list */}
        <div className="space-y-3 mb-6">
          {CHECKLIST_ITEMS.map((item, index) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-[#EAF4EE] border-[#C9DCCF]'
                    : 'bg-white border-[#DDE5DD] hover:border-[#2F5941]/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#2F5941]">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 fill-[#2F5941] text-white" />
                    ) : (
                      <Square className="w-5 h-5 text-[#66736A]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#66736A]">
                        0{index + 1}
                      </span>
                      <h4 className={`text-[15px] font-semibold ${isChecked ? 'text-[#173326] line-through decoration-[#66736A]/50' : 'text-[#18211C]'}`}>
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#66736A] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 text-xs text-[#2F5941] bg-[#F7F5EF] px-2.5 py-1 rounded inline-block">
                      💡 {item.tip}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#DDE5DD]">
          <button
            onClick={resetChecklist}
            className="text-xs text-[#66736A] hover:text-[#18211C] flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Resetovat checklist
          </button>

          <button
            onClick={onClose}
            className="btn-press px-6 py-2.5 rounded-xl bg-[#173326] text-[#F7F5EF] text-sm font-medium hover:bg-[#2F5941] transition-colors cursor-pointer"
          >
            Uložit a zavřít
          </button>
        </div>

      </div>
    </div>
  );
};
