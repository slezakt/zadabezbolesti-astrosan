import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EAF4EE] border-t border-[#DDE5DD] py-14 text-[#18211C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DDE5DD]">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#18211C] mb-3">
              ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
            </span>
            <p className="text-[14px] leading-relaxed text-[#66736A] max-w-sm mb-4">
              Prémiový digitální zdravotní průvodce a ergonomický kalkulátor. 
              Pomáháme lidem se sedavým zaměstnáním udělat bezpečný první krok k úlevě od bolesti zad.
            </p>
            <div className="text-xs text-[#66736A]">
              Obsah je koncipován podle doporučení České fyzioterapeutické společnosti a standardů ISO 9241.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#173326] mb-4">
              Hlavní témata
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#18211C]">
              <li>
                <a 
                  href="/typy-bolesti/"
                  className="hover:text-[#2F5941] link-underline"
                >
                  Bolesti zad a příčiny
                </a>
              </li>
              <li>
                <a 
                  href="/cviky-na-zada/"
                  className="hover:text-[#2F5941] link-underline"
                >
                  Cviky a mobilita u stolu
                </a>
              </li>
              <li>
                <a 
                  href="/ergonomie-pracoviste/"
                  className="hover:text-[#2F5941] link-underline"
                >
                  Ergonomie stolu a židle
                </a>
              </li>
              <li>
                <a 
                  href="/zdravy-spanek/"
                  className="hover:text-[#2F5941] link-underline"
                >
                  Zdravý spánek a regenerace
                </a>
              </li>
              <li>
                <a 
                  href="/blog/"
                  className="hover:text-[#2F5941] link-underline"
                >
                  Magazín a všechny články
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Disclaimer */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#173326] mb-4">
              Nástroje a bezpečí
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#18211C] mb-6">
              <li>
                <a 
                  href="/nastroje/kalkulacka/"
                  className="hover:text-[#2F5941] link-underline font-medium"
                >
                  Ergonomická kalkulačka (ISO 9241)
                </a>
              </li>
              <li>
                <a 
                  href="/rizikove-faktory/"
                  className="text-[#F2644B] hover:text-[#173326] link-underline font-medium"
                >
                  Varovné signály a kdy volat lékaře
                </a>
              </li>
            </ul>

            <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#DDE5DD] text-xs text-[#66736A] leading-relaxed">
              <strong>Upozornění:</strong> Informace na tomto webu mají výhradně edukativní charakter a v žádném případě nenahrazují odborné lékařské vyšetření ani individuální fyzioterapii.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#66736A] gap-4">
          <div>
            © {new Date().getFullYear()} ZádaBezBolesti.cz. Všechna práva vyhrazena.
          </div>
          <div className="flex items-center gap-3">
            <a href="/llms.txt" target="_blank" className="hover:underline">AEO (llms.txt)</a> •
            <a href="/rss.xml" target="_blank" className="hover:underline">RSS Feed</a> •
            <a href="/sitemap-index.xml" target="_blank" className="hover:underline">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
