import React, { useState, useMemo } from 'react';
import { calculateErgonomics } from '../../data/healthData';
import { Sliders, ArrowRight } from 'lucide-react';

export const ErgonomicCalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [inputValue, setInputValue] = useState<string>('175');
  const [mode, setMode] = useState<'sitting' | 'standing'>('sitting');
  const [_isCalculated, setIsCalculated] = useState<boolean>(true);

  // Quick preset heights
  const presets = [160, 168, 175, 182, 190];

  const handleHeightChange = (val: number) => {
    const clamped = Math.max(140, Math.min(215, val));
    setHeight(clamped);
    setInputValue(clamped.toString());
    setIsCalculated(true);
  };

  const handleInputBlur = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      handleHeightChange(num);
    } else {
      setInputValue(height.toString());
    }
  };

  const results = useMemo(() => {
    return calculateErgonomics(height, mode);
  }, [height, mode]);

  return (
    <section id="calculator" className="w-full py-16 sm:py-24 bg-[#EAF4EE]/60 border-t border-b border-[#DDE5DD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#173326]"></span>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#173326]">
              Interaktivní kalkulačka • ISO 9241 Standard
            </span>
          </div>
          <h2 className="font-serif-editorial text-[32px] sm:text-[42px] leading-[1.15] font-semibold text-[#18211C] mb-4">
            Nastavte si pracovní místo podle své výšky
          </h2>
          <p className="text-[17px] leading-relaxed text-[#66736A]">
            Univerzální nábytek neexistuje. Zadejte svou tělesnou výšku a získejte přesné rozměry 
            pro židli, desku stolu i pozici monitoru.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#F7F5EF] rounded-[24px] border border-[#DDE5DD] p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Control Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                {/* Mode Selector (Sitting / Standing) */}
                <div className="mb-8">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#66736A] block mb-2.5">
                    Typ pracovní polohy
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-[#EAF4EE] rounded-xl border border-[#DDE5DD]">
                    <button
                      onClick={() => setMode('sitting')}
                      className={`py-2.5 px-4 rounded-lg text-[14px] font-semibold transition-all cursor-pointer ${
                        mode === 'sitting'
                          ? 'bg-[#173326] text-[#F7F5EF]'
                          : 'text-[#18211C] hover:text-[#173326]'
                      }`}
                    >
                      Práce vsedě
                    </button>
                    <button
                      onClick={() => setMode('standing')}
                      className={`py-2.5 px-4 rounded-lg text-[14px] font-semibold transition-all cursor-pointer ${
                        mode === 'standing'
                          ? 'bg-[#173326] text-[#F7F5EF]'
                          : 'text-[#18211C] hover:text-[#173326]'
                      }`}
                    >
                      Polohovací stůl (stoj)
                    </button>
                  </div>
                </div>

                {/* Big Height Input */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="height-input" className="text-sm font-semibold text-[#18211C]">
                      Vaše tělesná výška
                    </label>
                    <span className="text-xs text-[#66736A]">Doporučený rozsah: 140 – 215 cm</span>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      id="height-input"
                      type="number"
                      min={140}
                      max={215}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleInputBlur(); }}
                      className="w-full text-3xl sm:text-4xl font-bold font-serif-editorial text-[#18211C] bg-[#EAF4EE]/50 border-2 border-[#DDE5DD] focus:border-[#F2644B] rounded-2xl py-4 px-5 pr-16 focus:outline-none transition-colors"
                    />
                    <span className="absolute right-5 text-xl font-medium text-[#66736A]">
                      cm
                    </span>
                  </div>
                </div>

                {/* Range Slider for quick fluid change */}
                <div className="mb-6">
                  <input
                    type="range"
                    min={145}
                    max={210}
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#DDE5DD] rounded-lg appearance-none cursor-pointer accent-[#F2644B]"
                    aria-label="Nastavení výšky posuvníkem"
                  />
                  <div className="flex justify-between text-[11px] text-[#66736A] mt-1 font-mono">
                    <span>145 cm</span>
                    <span>175 cm</span>
                    <span>210 cm</span>
                  </div>
                </div>

                {/* Preset Buttons */}
                <div className="mb-8">
                  <span className="text-xs text-[#66736A] block mb-2">Rychlé volby:</span>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleHeightChange(preset)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          height === preset
                            ? 'bg-[#2F5941] text-[#F7F5EF]'
                            : 'bg-[#EAF4EE] text-[#18211C] hover:bg-[#C9DCCF]'
                        }`}
                      >
                        {preset} cm
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Checklist hint */}
              <div className="pt-4 border-t border-[#DDE5DD] flex flex-col gap-3">
                <button
                  onClick={() => handleHeightChange(parseInt(inputValue, 10) || height)}
                  className="btn-press w-full py-3.5 px-6 rounded-xl bg-[#F2644B] text-white font-semibold text-[16px] hover:bg-[#e05138] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  Přepočítat ergonomické hodnoty
                </button>

                <a
                  href="/ergonomie-pracoviste/"
                  className="text-xs text-[#2F5941] hover:text-[#173326] font-medium inline-flex items-center justify-center gap-1 link-underline py-1"
                >
                  <span>Chcete prověřit dalších 8 bodů pracovního místa? Průvodce ergonomií</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Right Column: Anatomical Workspace SVG Diagram with Guide Lines (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Desktop Dynamic Posture Diagram */}
              <div className="relative bg-[#EAF4EE] rounded-2xl border border-[#DDE5DD] p-6 sm:p-8">
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#173326]">
                      {mode === 'sitting' ? 'Diagram optimálního sedu' : 'Diagram práce ve stoje'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#66736A] bg-[#F7F5EF] px-2.5 py-1 rounded border border-[#DDE5DD]">
                    Výška postavy: {height} cm
                  </span>
                </div>

                {/* SVG Posture Illustration */}
                <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center">
                  
                  <svg 
                    viewBox="0 0 540 340" 
                    className="w-full h-full select-none"
                    aria-label="Anatomický ergonomický diagram pracoviště"
                  >
                    {/* Floor line */}
                    <line x1="40" y1="310" x2="500" y2="310" stroke="#DDE5DD" strokeWidth="3" strokeLinecap="round" />
                    
                    {mode === 'sitting' ? (
                      /* Sitting Posture Visual */
                      <g>
                        {/* Desk */}
                        <path d="M 320 180 L 490 180" stroke="#173326" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 450 180 L 450 310" stroke="#66736A" strokeWidth="4" />
                        <path d="M 340 180 L 340 310" stroke="#66736A" strokeWidth="4" />
                        
                        {/* Monitor & Stand */}
                        <path d="M 410 180 L 410 120" stroke="#18211C" strokeWidth="4" />
                        <rect x="400" y="80" width="16" height="75" rx="3" fill="#18211C" />
                        <rect x="380" y="176" width="60" height="4" rx="2" fill="#18211C" />

                        {/* Chair Base & Cylinder */}
                        <line x1="200" y1="310" x2="260" y2="310" stroke="#66736A" strokeWidth="5" strokeLinecap="round" />
                        <line x1="230" y1="310" x2="230" y2="230" stroke="#66736A" strokeWidth="6" />
                        {/* Chair Seat */}
                        <path d="M 180 230 L 260 230" stroke="#2F5941" strokeWidth="8" strokeLinecap="round" />
                        {/* Chair Backrest with lumbar curve */}
                        <path d="M 180 230 Q 170 180 185 140" stroke="#2F5941" strokeWidth="8" strokeLinecap="round" fill="none" />

                        {/* Person Silhouette */}
                        {/* Head */}
                        <circle cx="215" cy="85" r="22" fill="#18211C" />
                        {/* Eyes gaze line */}
                        <line x1="230" y1="85" x2="400" y2="85" stroke="#F2644B" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Torso */}
                        <path d="M 215 107 Q 210 150 215 220" stroke="#18211C" strokeWidth="16" strokeLinecap="round" fill="none" />
                        {/* Upper Leg (Thigh) */}
                        <path d="M 215 225 L 295 225" stroke="#18211C" strokeWidth="14" strokeLinecap="round" />
                        {/* Lower Leg (Calf) */}
                        <path d="M 295 225 L 295 305" stroke="#18211C" strokeWidth="12" strokeLinecap="round" />
                        {/* Foot */}
                        <path d="M 290 305 L 325 305" stroke="#18211C" strokeWidth="8" strokeLinecap="round" />

                        {/* Upper Arm */}
                        <path d="M 220 125 L 235 178" stroke="#18211C" strokeWidth="10" strokeLinecap="round" />
                        {/* Forearm on desk */}
                        <path d="M 235 178 L 335 178" stroke="#18211C" strokeWidth="9" strokeLinecap="round" />

                        {/* Angle Arc: Elbow 90° */}
                        <path d="M 235 165 A 15 15 0 0 1 250 178" fill="none" stroke="#2F5941" strokeWidth="2" />
                        
                        {/* Measurement Line 1: Eye to Screen Top */}
                        <line x1="400" y1="85" x2="470" y2="85" stroke="#66736A" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="400" cy="85" r="3" fill="#F2644B" />

                        {/* Measurement Line 2: Desk Height */}
                        <line x1="320" y1="180" x2="60" y2="180" stroke="#66736A" strokeWidth="1" strokeDasharray="2 2" />
                        
                        {/* Measurement Line 3: Seat Height */}
                        <line x1="180" y1="230" x2="60" y2="230" stroke="#66736A" strokeWidth="1" strokeDasharray="2 2" />

                        {/* Distance arrow */}
                        <line x1="230" y1="70" x2="400" y2="70" stroke="#2F5941" strokeWidth="1.5" />
                        <polygon points="230,70 238,66 238,74" fill="#2F5941" />
                        <polygon points="400,70 392,66 392,74" fill="#2F5941" />
                      </g>
                    ) : (
                      /* Standing Desk Visual */
                      <g>
                        {/* Standing Desk */}
                        <path d="M 300 150 L 480 150" stroke="#173326" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 440 150 L 440 310" stroke="#66736A" strokeWidth="4" />
                        <path d="M 320 150 L 320 310" stroke="#66736A" strokeWidth="4" />

                        {/* Monitor */}
                        <path d="M 390 150 L 390 90" stroke="#18211C" strokeWidth="4" />
                        <rect x="380" y="50" width="16" height="75" rx="3" fill="#18211C" />

                        {/* Standing Person Silhouette */}
                        <circle cx="210" cy="55" r="22" fill="#18211C" />
                        {/* Eye line */}
                        <line x1="225" y1="55" x2="380" y2="55" stroke="#F2644B" strokeWidth="1.5" strokeDasharray="4 4" />
                        {/* Torso */}
                        <path d="M 210 77 L 210 185" stroke="#18211C" strokeWidth="16" strokeLinecap="round" />
                        {/* Legs */}
                        <path d="M 210 185 L 210 305" stroke="#18211C" strokeWidth="14" strokeLinecap="round" />
                        {/* Foot */}
                        <path d="M 205 305 L 235 305" stroke="#18211C" strokeWidth="8" strokeLinecap="round" />

                        {/* Arm */}
                        <path d="M 215 95 L 225 148" stroke="#18211C" strokeWidth="10" strokeLinecap="round" />
                        <path d="M 225 148 L 315 148" stroke="#18211C" strokeWidth="9" strokeLinecap="round" />

                        {/* Distance arrow */}
                        <line x1="225" y1="40" x2="380" y2="40" stroke="#2F5941" strokeWidth="1.5" />
                      </g>
                    )}
                  </svg>

                </div>

                {/* Grid of Results Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#DDE5DD]">
                  
                  {/* Seat Height */}
                  <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66736A] block">
                      {mode === 'sitting' ? 'Výška sedáku' : 'Výška podnožky'}
                    </span>
                    <span className="text-xl font-bold font-serif-editorial text-[#18211C] block mt-0.5">
                      {mode === 'sitting' ? `${results.seatHeight} cm` : 'Volná (0 cm)'}
                    </span>
                    <span className="text-[10px] text-[#66736A] mt-0.5 block">Chodidla celou plochou</span>
                  </div>

                  {/* Desk Height */}
                  <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66736A] block">
                      Výška stolu
                    </span>
                    <span className="text-xl font-bold font-serif-editorial text-[#173326] block mt-0.5">
                      {results.deskHeight} cm
                    </span>
                    <span className="text-[10px] text-[#66736A] mt-0.5 block">Lokty v rovině desky</span>
                  </div>

                  {/* Monitor Top Edge */}
                  <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66736A] block">
                      Horní hrana monitoru
                    </span>
                    <span className="text-xl font-bold font-serif-editorial text-[#F2644B] block mt-0.5">
                      {results.monitorTopHeight} cm
                    </span>
                    <span className="text-[10px] text-[#66736A] mt-0.5 block">V rovině očí</span>
                  </div>

                  {/* Monitor Distance */}
                  <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66736A] block">
                      Vzdálenost monitoru
                    </span>
                    <span className="text-xl font-bold font-serif-editorial text-[#18211C] block mt-0.5">
                      {results.monitorDistance} cm
                    </span>
                    <span className="text-[10px] text-[#66736A] mt-0.5 block">Délka natažené paže</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
