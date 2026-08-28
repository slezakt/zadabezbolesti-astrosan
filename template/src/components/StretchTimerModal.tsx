import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle, Clock, Volume2, VolumeX } from 'lucide-react';

interface StretchTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRETCH_STEPS = [
  {
    step: 1,
    title: 'Otevření hrudníku s výdechem',
    duration: 60,
    instruction: 'Posaďte se na přední část židle, propleťte prsty za zády a s hlubokým nádechem otevřete hrudník vzhůru. S výdechem uvolněte spodní žebra.',
    focusArea: 'Prsní svaly a mezižeberní fascie'
  },
  {
    step: 2,
    title: 'Kroužení rameny dozadu a dolů',
    duration: 60,
    instruction: 'Pomalým plynulým pohybem vytáhněte ramena k uším, stáhněte lopatky k sobě a spusťte je s výdechem co nejníže dolů. Žádný spěch.',
    focusArea: 'Trapézové a mezilopatkové svaly'
  },
  {
    step: 3,
    title: 'Jemný úklon šíje s volnou paží',
    duration: 60,
    instruction: 'Pravé ucho nakloňte k pravému rameni, levé rameno táhněte vědomě dolů. Po 30 sekundách plynule vyměňte strany.',
    focusArea: 'Boční šíjové svaly a úpony hlavy'
  }
];

export const StretchTimerModal: React.FC<StretchTimerModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STRETCH_STEPS[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (currentStepIndex < STRETCH_STEPS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
        setTimeLeft(STRETCH_STEPS[currentStepIndex + 1].duration);
      } else {
        setIsActive(false);
        setIsCompleted(true);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentStepIndex]);

  if (!isOpen) return null;

  const currentStep = STRETCH_STEPS[currentStepIndex];
  const totalSecondsRemaining = STRETCH_STEPS.slice(currentStepIndex + 1).reduce((acc, curr) => acc + curr.duration, 0) + timeLeft;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => {
    if (isCompleted) {
      handleReset();
    } else {
      setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setTimeLeft(STRETCH_STEPS[0].duration);
    setIsCompleted(false);
  };

  const selectStep = (index: number) => {
    setIsActive(false);
    setCurrentStepIndex(index);
    setTimeLeft(STRETCH_STEPS[index].duration);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18211C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative text-center"
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
          <span className="w-2 h-2 rounded-full bg-[#2F5941]"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#2F5941]">
            Asistent protažení u stolu
          </span>
        </div>

        <h2 className="font-serif-editorial text-[26px] sm:text-[30px] font-semibold text-[#18211C] mb-2">
          3minutová mobilizační sekvence
        </h2>

        <p className="text-xs text-[#66736A] mb-6">
          Zůstaňte sedět na židli, dýchejte klidně nosem a následujte pokyny na obrazovce.
        </p>

        {/* Step Indicators */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {STRETCH_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => selectStep(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentStepIndex === idx
                  ? 'bg-[#EAF4EE] border-[#2F5941] text-[#173326]'
                  : idx < currentStepIndex
                  ? 'bg-[#EAF4EE]/40 border-[#DDE5DD] text-[#66736A]'
                  : 'bg-white border-[#DDE5DD] text-[#66736A]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span>Krok {s.step}</span>
                {idx < currentStepIndex && <CheckCircle className="w-3.5 h-3.5 text-[#2F5941]" />}
              </div>
              <div className="text-xs font-semibold truncate">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Main Display Box */}
        <div className="bg-[#EAF4EE] rounded-2xl p-8 border border-[#DDE5DD] mb-6">
          
          {isCompleted ? (
            <div className="py-4">
              <CheckCircle className="w-12 h-12 text-[#2F5941] mx-auto mb-3" />
              <h3 className="font-serif-editorial text-2xl font-bold text-[#173326] mb-2">
                Skvěle! Protažení je hotové.
              </h3>
              <p className="text-sm text-[#66736A] max-w-sm mx-auto">
                Vaše hrudní páteř a šíje jsou prokrvené. Dopřejte si sklenici vody a vraťte se k práci se vzpřímeným sedem.
              </p>
            </div>
          ) : (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5941] block mb-1">
                Krok {currentStep.step} z 3 • {currentStep.focusArea}
              </span>
              
              <h3 className="font-serif-editorial text-2xl font-bold text-[#18211C] mb-3">
                {currentStep.title}
              </h3>

              {/* Timer Display */}
              <div className="font-mono text-5xl sm:text-6xl font-bold text-[#173326] my-4 select-none">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>

              <p className="text-[14.5px] leading-relaxed text-[#18211C]/90 max-w-md mx-auto">
                {currentStep.instruction}
              </p>
            </div>
          )}

        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="btn-press px-8 py-3.5 rounded-xl bg-[#F2644B] text-white font-semibold text-[15px] hover:bg-[#e05138] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4" />
                Cvičit znovu
              </>
            ) : isActive ? (
              <>
                <Pause className="w-4 h-4" />
                Pozastavit
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                {timeLeft === STRETCH_STEPS[currentStepIndex].duration ? 'Spustit' : 'Pokračovat'}
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-xl border border-[#DDE5DD] text-[#66736A] hover:bg-[#EAF4EE] hover:text-[#18211C] transition-colors cursor-pointer"
            title="Resetovat časovač"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
