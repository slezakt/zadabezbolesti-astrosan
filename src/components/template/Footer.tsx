import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#173326] border-t border-[#2F5941] py-14 text-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2F5941]">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#F7F5EF] mb-3">
              ZádaBezBolesti<span className="text-[#F2644B]">.cz</span>
            </span>
            <p className="text-[14px] leading-relaxed text-[#C9DCCF] max-w-sm mb-4">
              Praktický zdravotní magazín pro lidi se sedavým zaměstnáním. Pomáhá s orientací, prevencí a bezpečnými prvními kroky při bolesti zad.
            </p>
            <div className="text-xs text-[#C9DCCF]/70">
              Informace mají edukativní charakter a nenahrazují individuální vyšetření ani fyzioterapii.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9DCCF] mb-4">
              Hlavní témata
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#C9DCCF]">
              <li>
                <a 
                  href="/typy-bolesti/"
                  className="hover:text-white transition-colors link-underline"
                >
                  Bolesti zad a příčiny
                </a>
              </li>
              <li>
                <a 
                  href="/cviky-na-zada/"
                  className="hover:text-white transition-colors link-underline"
                >
                  Cviky a mobilita u stolu
                </a>
              </li>
              <li>
                <a 
                  href="/ergonomie-pracoviste/"
                  className="hover:text-white transition-colors link-underline"
                >
                  Ergonomie stolu a židle
                </a>
              </li>
              <li>
                <a 
                  href="/zdravy-spanek/"
                  className="hover:text-white transition-colors link-underline"
                >
                  Zdravý spánek a regenerace
                </a>
              </li>
              <li>
                <a 
                  href="/blog/"
                  className="hover:text-white transition-colors link-underline"
                >
                  Magazín a všechny články
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Disclaimer */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9DCCF] mb-4">
              Nástroje a bezpečí
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#C9DCCF] mb-6">
              <li>
                <a 
                  href="/nastroje/kalkulacka/"
                  className="hover:text-white transition-colors link-underline font-medium"
                >
                  Ergonomická kalkulačka
                </a>
              </li>
              <li>
                <a 
                  href="/rizikove-faktory/"
                  className="text-[#F2644B] hover:text-white transition-colors link-underline font-medium"
                >
                  Varovné signály a kdy volat lékaře
                </a>
              </li>
            </ul>

            <div className="bg-[#2F5941]/50 p-3.5 rounded-xl border border-[#2F5941] text-xs text-[#C9DCCF]/80 leading-relaxed">
              <strong className="text-[#C9DCCF]">Upozornění:</strong> Informace na tomto webu mají výhradně edukativní charakter a v žádném případě nenahrazují odborné lékařské vyšetření ani individuální fyzioterapii.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C9DCCF]/60 gap-4">
          <div>
            © {new Date().getFullYear()} ZádaBezBolesti.cz. Všechna práva vyhrazena.
          </div>
          <div className="flex items-center gap-3">
            <a href="/llms.txt" target="_blank" className="hover:text-[#C9DCCF] transition-colors hover:underline">AEO (llms.txt)</a> •
            <a href="/rss.xml" target="_blank" className="hover:text-[#C9DCCF] transition-colors hover:underline">RSS Feed</a> •
            <a href="/sitemap-index.xml" target="_blank" className="hover:text-[#C9DCCF] transition-colors hover:underline">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
