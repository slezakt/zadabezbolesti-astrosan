import { DiagnosticItem, GuidePillar, Article, ChecklistItem, ErgonomicValues } from '../types';

export const DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  {
    id: 'scapula',
    title: 'Bolest mezi lopatkami',
    shortDesc: 'Pálivá nebo bodavá bolest vznikající často z dlouhého předklonu a mělkého dýchání.',
    iconName: 'Activity',
    safeFirstSteps: [
      'Uvolněte ramena směrem dolů a dozadu – nepoužívejte sílu, jen gravitaci.',
      'Aktivujte brániční dýchání: položte dlaně na spodní žebra a nadechněte se do stran.',
      'Vyhněte se okamžitému agresivnímu „praskání“ zad přes opěradlo.'
    ],
    exercises: [
      {
        name: 'Protažení prsních svalů ve dveřích',
        description: 'Předloktí opřete o zárubeň ve výšce ramen, vykročte mírně vpřed a vnímejte jemný tah na hrudníku.',
        reps: '3× 20 sekund na každou stranu'
      },
      {
        name: 'Rotace hrudní páteře v sedě',
        description: 'Ruce překřižte na hrudníku. S výdechem plynule otočte trup vpravo, s nádechem zpět na střed.',
        reps: '6 pomalých rotací na každou stranu'
      }
    ],
    whatToAvoid: [
      'Záklony s trhnutím a rotací naráz.',
      'Sledování displeje mobilu s hlavou v hlubokém předklonu.',
      'Dlouhé sezení bez opory nohou o podlahu.'
    ],
    redFlags: [
      'Bolest vystřelující do levé paže, čelisti nebo spojená s dušností a tlakem na hrudi (volejte 155).',
      'Pocit pálení doprovázený horečkou.',
      'Necitlivost v prstech rukou přetrvávající déle než hodinu.'
    ],
    recommendedArticleId: 'scapula-guide'
  },
  {
    id: 'lumbar',
    title: 'Bedra',
    shortDesc: 'Tupý tlak nebo ztuhlost ve spodní části zad po delším sezení či stání.',
    iconName: 'Shield',
    safeFirstSteps: [
      'Změňte polohu: vstaňte a projděte se 2 minuty po místnosti.',
      'Zkuste úlevovou polohu v lehu na zádech s nohama položenýma na židli (90° v kolenou a kyčlích).',
      'Nepředklánějte se s napnutýma nohama pro sebrání předmětů ze země.'
    ],
    exercises: [
      {
        name: 'Podsadzování pánve v lehu',
        description: 'V lehu na zádech s pokrčenými koleny jemně přitiskněte bedra k podložce výdechem a poté uvolněte.',
        reps: '8 až 10 opakování v klidném rytmu'
      },
      {
        name: 'Protažení flexorů kyčlí',
        description: 'V kleku na jednom koleni posuňte pánev jemně vpřed, dokud neucítíte tah na přední straně stehna.',
        reps: '3× 30 sekund na nohu'
      }
    ],
    whatToAvoid: [
      'Hluboké předklony hned po probuzení, kdy jsou meziobratlové ploténky plně hydratované a zranitelnější.',
      'Dlouhé sezení s překříženýma nohama.'
    ],
    redFlags: [
      'Vystřelování ostré bolesti do hýždě, stehna nebo chodidla (ischias).',
      'Ztráta kontroly nad močením či stolicí (akutní syndrom cauda equina – okamžitá pohotovost!).',
      'Oslabení nohy (propadávání špičky při chůzi).'
    ],
    recommendedArticleId: 'lumbar-exercises'
  },
  {
    id: 'neck',
    title: 'Krk a ramena',
    shortDesc: 'Napětí šíjových svalů, tuhnutí krku a tenzní bolesti hlavy vystřelující do spánků.',
    iconName: 'Zap',
    safeFirstSteps: [
      'Zkontrolujte výšku monitoru: horní třetina obrazovky má být v rovině očí.',
      'Vyzkoušejte jemné zatažení brady vzad (retrakce hlavy – vytvoření mírného podbradku).',
      'Povolte sevřené zuby a nechte jazyk volně opřený o horní patro.'
    ],
    exercises: [
      {
        name: 'Úklon hlavy s uvolněným ramenem',
        description: 'Položte pravé ucho k pravému rameni, levé rameno táhněte vědomě dolů k zemi.',
        reps: '25 sekund, poté plynule na druhou stranu'
      },
      {
        name: 'Retrakce hlavy (dvojitá brada)',
        description: 'Zasuňte hlavu horizontálně dozadu, jako byste ji chtěli položit na opěrku. Držte 3 sekundy a povolte.',
        reps: '8 opakování'
      }
    ],
    whatToAvoid: [
      'Kroužení hlavou v plném záklonu dozadu.',
      'Přidržování telefonu mezi ramenem a uchem při hovoru.'
    ],
    redFlags: [
      'Náhlá závrať, dvojité vidění nebo porucha řeči při pohybu krkem.',
      'Brnění šířící se do celých paží až do konečků prstů.',
      'Ztuhlost krku s vysokou horečkou a světloplachostí.'
    ],
    recommendedArticleId: 'monitor-height'
  },
  {
    id: 'sleep',
    title: 'Bolest po spánku',
    shortDesc: 'Ranní pocit "rozlámaného" těla a obtížné rozhýbávání v prvních minutách dne.',
    iconName: 'Moon',
    safeFirstSteps: [
      'Před vstáváním z postele se přetočte na bok a zvedejte se přes oporu rukou.',
      'Vypijte sklenici vlažné vody pro hydrataci meziobratlových plotének a fascií.',
      'Zkontrolujte anatomickou výšku polštáře – páteř by měla být v jedné přímce.'
    ],
    exercises: [
      {
        name: 'Ranní kočičí hřbet v kleku',
        description: 'Na všech čtyřech plynule střídejte vyhrbení s nádechem a jemné uvolnění s výdechem.',
        reps: '6 pomalých cyklů'
      },
      {
        name: 'Kroužky kotníky a protažení v lehu',
        description: 'Ještě v posteli probuďte krevní oběh kroužením v kotnících a vytahováním za patami.',
        reps: '1 minuta'
      }
    ],
    whatToAvoid: [
      'Spaní na břiše s hlavou otočenou na stranu na vysokém polštáři.',
      'Zvedání těžkých břemen v prvních 30 minutách po probuzení.'
    ],
    redFlags: [
      'Bolest, která vás systematicky budí ve druhé polovině noci a nezmírní se ani změnou polohy.',
      'Ranní ztuhlost přetrvávající déle než 60 minut provázená otoky kloubů.'
    ],
    recommendedArticleId: 'night-pain'
  },
  {
    id: 'computer',
    title: 'Bolest u počítače',
    shortDesc: 'Statické přetížení, tuhnutí trapézů a nepříjemný tlak v kříži po 2+ hodinách sezení.',
    iconName: 'Laptop',
    safeFirstSteps: [
      'Pravidlo 20/20/20: každých 20 minut se podívejte na 20 sekund na bod vzdálený aspoň 6 metrů.',
      'Přisuňte židli tak, aby se lokty při psaní opíraly o područky či stůl v úhlu cca 90°.',
      'Položte obě chodidla celou plochou na podlahu.'
    ],
    exercises: [
      {
        name: 'Uvolnění trapézů v sedě',
        description: 'Vytáhněte ramena vysoko k uším, vydržte 3 sekundy a s hlasitým výdechem je nechte volně spadnout.',
        reps: '5 opakování'
      },
      {
        name: 'Protažení předloktí a prstů',
        description: 'Natáhněte paži před sebe, dlaní vzhůru a druhou rukou jemně táhněte prsty k tělu.',
        reps: '20 sekund na ruku'
      }
    ],
    whatToAvoid: [
      'Práce na notebooku položeném na klíně nebo na nízkém konferenčním stolku bez externí klávesnice.',
      'Sezení na kraji židle bez kontaktu beder s opěradlem.'
    ],
    redFlags: [
      'Trvalé brnění nebo ztráta citlivosti v palci, ukazováku a prostředníku (karpální tunel).',
      'Silná pálivá bolest znemožňující sezení.'
    ],
    recommendedArticleId: 'monitor-height'
  },
  {
    id: 'stress',
    title: 'Stres a napětí',
    shortDesc: 'Psychosomatické stažení svalů v oblasti šíje, hrudníku a bránice vedoucí k chronickému napětí.',
    iconName: 'Smile',
    safeFirstSteps: [
      'Zpomalte dech: nadechujte se na 4 doby, vydechujte na 6 dob.',
      'Vědomě uvolněte čelist a spánkové svaly.',
      'Udělejte si krátkou 5minutovou procházku na čerstvém vzduchu bez telefonu v ruce.'
    ],
    exercises: [
      {
        name: 'Prodloužený výdech 4-7-8',
        description: 'Nádech nosem na 4 sekundy, zadržení dechu na 7 sekund, pomalý plynulý výdech ústy na 8 sekund.',
        reps: '4 dechové cykly'
      },
      {
        name: 'Progresivní svalová relaxace šíje',
        description: 'Vědomě napněte ramena na 5 sekund na 70 % a poté je s dlouhým výdechem zcela uvolněte.',
        reps: '3 opakování'
      }
    ],
    whatToAvoid: [
      'Mělké hrudní dýchání se zvedáním ramen nahoru.',
      'Nadměrná konzumace kofeinu při pocitu fyzického napětí.'
    ],
    redFlags: [
      'Pocit tísně a tlaku na hrudi šířící se do levé paže.',
      'Panické ataky s neschopností popadnout dech.'
    ],
    recommendedArticleId: 'stress-back-pain'
  }
];

export const MAIN_GUIDES: GuidePillar[] = [
  {
    number: '01',
    title: 'Bolesti zad',
    description: 'Pochopte biologii a mechaniku své bolesti. Zjistěte, kdy jde o běžné svalové přetížení a kdy je nutné navštívit fyzioterapeuta či lékaře.',
    links: [
      { id: 'scapula-guide', title: 'Příčiny a úleva od bolesti mezi lopatkami', readTime: '5 min čtení' },
      { id: 'lumbar-exercises', title: 'Akutní blokáda beder vs. dlouhodobá ztuhlost', readTime: '6 min čtení' },
      { id: 'night-pain', title: 'Noční bolesti zad: proč vznikají a jak spát', readTime: '4 min čtení' }
    ]
  },
  {
    number: '02',
    title: 'Cviky na záda',
    description: 'Cílené sestavy pohybů, které nevyžadují žádné pomůcky a zvládnete je přímo u pracovního stolu nebo ráno po probuzení.',
    links: [
      { id: 'stretch-routine', title: '3minutová mobilizace pro lidi u počítače', readTime: '3 min praxe' },
      { id: 'lumbar-exercises', title: '5 bezpečných cviků pro uvolnění bederní páteře', readTime: '5 min praxe' },
      { id: 'stress-back-pain', title: 'Dechové techniky pro uvolnění bránice a šíje', readTime: '4 min praxe' }
    ]
  },
  {
    number: '03',
    title: 'Ergonomie pracoviště',
    description: 'Matematicky přesné nastavení židle, monitoru a stolu. Eliminujte statické mikrotraumata páteře správnými úhly a vzdálenostmi.',
    links: [
      { id: 'monitor-height', title: 'Výška a vzdálenost monitoru: přesný návod', readTime: '5 min čtení' },
      { id: 'desk-setup', title: 'Jak nastavit kancelářskou židli pro 8hodinový sed', readTime: '6 min čtení' },
      { id: 'standing-desk', title: 'Polohovací stoly: jak správně střídat sed a stoj', readTime: '4 min čtení' }
    ]
  },
  {
    number: '04',
    title: 'Spánek a regenerace',
    description: 'Jak poloha při spánku, tuhost matrace a výška polštáře ovlivňují regeneraci meziobratlových plotének během noci.',
    links: [
      { id: 'night-pain', title: 'Bolest zad v noci: polohy, matrace a polštáře', readTime: '6 min čtení' },
      { id: 'pillow-guide', title: 'Jak vybrat anatomický polštář pro krční páteř', readTime: '4 min čtení' },
      { id: 'morning-routine', title: 'Ranní desatero: jak vstávat bez ztuhlosti', readTime: '3 min čtení' }
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'scapula-guide',
    title: 'Bolest mezi lopatkami: příčiny, úleva a kdy zpozornět',
    tag: 'Ergonomie & Akutní stav',
    readTime: '6 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '24. srpna 2026',
    isFeatured: true,
    summary: 'Proč oblast mezi lopatkami tolik trpí při práci na notebooku? Odhalte mechanismus zkrácených prsních svalů, oslabených mezilopatkových fixátorů a blokád žeber.',
    fullContent: {
      lead: 'Bolest mezi lopatkami patří k nejčastějším steskům lidí se sedavým zaměstnáním. Často se projevuje jako pálivý, tupý tlak, který se stupňuje v odpoledních hodinách, nebo jako ostré bodnutí při hlubokém nádechu.',
      sections: [
        {
          heading: '1. Hlavní mechanická příčina: syndrom horního zkřížení',
          body: 'Při dlouhém sledování obrazovky dochází k předsunu hlavy a stočení ramen dopředu. Tím se zkracují prsní svaly a horní trapézy, zatímco mezilopatkové svaly (rombické svaly a střední trapéz) jsou v trvalém přetažení a ztrácejí schopnost aktivní kontrakce.',
          bulletPoints: [
            'Předsunutí hlavy o pouhé 3 cm zvyšuje zátěž na krční páteř až na trojnásobek.',
            'Žebra jsou v oblasti hrudníku spojena s páteří drobnými klouby, které se při statickém sedu snadno zablokují.',
            'Mělké dýchání do horní části hrudníku zátěž ještě násobí.'
          ]
        },
        {
          heading: '2. První pomoc u pracovního stolu',
          body: 'Největší chybou je snaha záda násilně "propnout" nebo prudce rotovat přes opěradlo židle. Bezpečnější postup spočívá v otevření hrudníku a uvolnění dechu.',
          tipBox: 'Tip: Vyzkoušejte cvičení "Anděl u zdi". Postavte se zády ke zdi, přitiskněte bedra, lopatky i lokty a plynule posouvejte paže vzhůru v rozsahu, který nevyvolává bolest.'
        },
        {
          heading: '3. Kdy nejde o svaly, ale o varovný signál',
          body: 'Oblast hrudní páteře a lopatek může reflektovat i vnitřní orgány. Pokud je bolest doprovázena tlakem na hrudi, dušností, pocením nebo vyzařuje do levé paže, je nutné vyloučit kardiální příčinu.',
          bulletPoints: [
            'Pálení spojené s potížemi při polykání může signalizovat reflux jícnu.',
            'Ostrá bolest na pravé straně pod lopatkou může souviset se žlučníkem.',
            'Noční klidové bolesti, které neustupují ani změnou polohy, vyžadují lékařské vyšetření.'
          ]
        }
      ],
      takeaways: [
        'Upravte výšku monitoru tak, abyste nemuseli sklápět hlavu dolů.',
        'Každou hodinu zařaďte 1 minutu hlubokého dýchání do spodních žeber.',
        'Při akutní blokádě pomáhá suché teplo (např. nahřátý polštářek) a jemná mobilizace.'
      ]
    }
  },
  {
    id: 'monitor-height',
    title: 'Výška monitoru: ideální nastavení obrazovky',
    tag: 'Ergonomie',
    readTime: '4 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '20. srpna 2026',
    summary: 'Jak umístit horní hranu displeje vůči očím, jaká je optimální vzdálenost a proč práce na samotném notebooku ničí krční páteř.',
    fullContent: {
      lead: 'Umístění monitoru je jedním z nejjednodušších a přitom nejúčinnějších ergonomických kroků, které můžete pro svou šíji udělat.',
      sections: [
        {
          heading: 'Pravidlo horizontu očí',
          body: 'Horní třetina zobrazovací plochy monitoru by se měla nacházet přesně v horizontální rovině vašich očí při vzpřímeném sedu. Oči přirozeně hledí mírně dolů (pod úhlem 15–20°), což uvolňuje šíjové svaly.'
        },
        {
          heading: 'Vzdálenost a měřítko zobrazení',
          body: 'Doporučená vzdálenost je 50 až 75 cm (zhruba na délku natažené paže). Pokud musíte mžourat nebo se naklánět vpřed, nenastavujte monitor blíž, ale zvětšete velikost písma v systému na 125 %.'
        }
      ],
      takeaways: [
        'Nikdy nepracujte na samotném notebooku déle než 1 hodinu denně bez stojánku a externí klávesnice.',
        'Při použití dvou monitorů umístěte ten hlavní přímo před sebe, sekundární hned vedle pod mírným úhlem.'
      ]
    }
  },
  {
    id: 'night-pain',
    title: 'Bolest zad v noci: proč vzniká a co pomáhá',
    tag: 'Spánek',
    readTime: '5 min čtení',
    author: 'MUDr. Klára Dvořáková, Neurologie',
    date: '18. srpna 2026',
    summary: 'Proč se v noci meziobratlové ploténky rozpínají, jak vybrat správnou oporu pro spánek na boku a kdy je noční bolest důvodem k návštěvě lékaře.',
    fullContent: {
      lead: 'Spánek má být fází nejhlubší regenerace páteře. Během noci ploténky nasávají tekutinu a regenerují se po denním gravitačním stlačení. Pokud se však probouzíte s bolestí, něco je špatně.',
      sections: [
        {
          heading: 'Optimální spánková poloha pro bedra',
          body: 'Nejšetrnější polohou pro většinu lidí je poloha na boku s mírně pokrčenými koleny a polštářkem vloženým mezi kolena. Tento polštářek zabraňuje rotaci pánve a kroucení bederní páteře.'
        },
        {
          heading: 'Matrace: mýtus o tvrdé desce',
          body: 'Příliš tvrdá matrace vytváří tlakové body na bocích a ramenou a nutí páteř prohýbat se. Správná matrace by měla umožnit rameni a pánvi jemně se zanořit tak, aby páteř zůstala v přímce.'
        }
      ],
      takeaways: [
        'Při spaní na boku vložte mezi kolena malý polštář.',
        'Vyhněte se spaní na břiše s rotovaným krkem.',
        'Před vstáváním se vždy nejprve přetočte na bok.'
      ]
    }
  },
  {
    id: 'stress-back-pain',
    title: 'Bolest mezi lopatkami ze stresu',
    tag: 'Psychosomatika',
    readTime: '5 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '15. srpna 2026',
    summary: 'Jak sympatický nervový systém stahuje bránici, zkracuje dech a vytváří chronický krunýř kolem hrudní páteře.',
    fullContent: {
      lead: 'Když prožíváme stres, tělo podvědomě zaujímá obrannou pozici: ramena jdou nahoru, dech se přesouvá do horní části hrudníku a bránice zůstává v křeči.',
      sections: [
        {
          heading: 'Propojení bránice a hrudní páteře',
          body: 'Bránice není jen hlavní dýchací sval, ale také klíčový stabilizátor trupu. Je svými úpony přímo napojena na bederní a hrudní obratle. Když je v napětí, mění mechaniku celého hrudního koše.'
        },
        {
          heading: 'Jednoduché cvičení pro reset nervového systému',
          body: 'Zpomalení výdechu přímo stimuluje bloudivý nerv (nervus vagus), který přepíná tělo z režimu "boj nebo útěk" do režimu regenerace a uvolnění svalů.'
        }
      ],
      takeaways: [
        'Několikrát denně zkontrolujte, zda nemáte zatnuté čelisti a zvednutá ramena.',
        'Aplikujte dechové cvičení s prodlouženým výdechem (nádech 4 s, výdech 6–8 s).'
      ]
    }
  },
  {
    id: 'lumbar-exercises',
    title: 'Cviky na bederní páteř',
    tag: 'Cvičení',
    readTime: '7 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '12. srpna 2026',
    summary: 'Sestava 5 bezpečných cviků pro aktivaci hlubokého stabilizačního systému (HSS) a uvolnění přetížených bederních vzpřimovačů.',
    fullContent: {
      lead: 'Bederní páteř nepotřebuje agresivní protahování do krajních rozsahů, ale stabilitu v neutrální pozici a uvolnění okolních zkrácených svalů (zejména flexorů kyčlí).',
      sections: [
        {
          heading: 'Základní princip: Neutrální pánev',
          body: 'Většina lidí s bolestí v bedrech má pánev překlopenou dopředu (hyperlordóza) z důvodu zkrácených svalů na přední straně stehen a ochablého hlubokého břišního svalstva.'
        },
        {
          heading: 'Sestava bezpečných cviků',
          body: 'Všechny cviky provádějte plynule s dechem, nikdy ne přes ostrou bolest. Cílem je pocit stability a příjemného tepla.',
          bulletPoints: [
            '1. Glute Bridge (most) – posílení hýždí bez prohýbání v bedrech.',
            '2. Dead Bug (mrtvý brouk) – aktivace hlubokého břicha při zachování kontaktu beder s podložkou.',
            '3. Bird Dog (pes a pták) – křížová stabilizace na všech čtyřech.',
            '4. Protažení iliopsoasu v kleku s podsazenou pánví.',
            '5. Poloha dítěte pro jemné uvolnění na závěr.'
          ]
        }
      ],
      takeaways: [
        'Cvičte raději 5 minut každý den než 1 hodinu jednou týdně.',
        'Zaměřte se na aktivaci hýždí – silné hýždě chrání bedra při každém kroku.'
      ]
    }
  },
  {
    id: 'desk-setup',
    title: 'Jak nastavit kancelářskou židli pro 8hodinový sed',
    tag: 'Ergonomie',
    readTime: '5 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '10. srpna 2026',
    summary: 'Nastavení bederní opěrky, hloubky sedáku, područek a úhlu opěradla krok za krokem.',
    fullContent: {
      lead: 'Ani ta nejdražší ergonomická židle nepomůže, pokud je nastavena špatně na proporce vašeho těla.',
      sections: [
        {
          heading: 'Hloubka sedáku: pravidlo dvou prstů',
          body: 'Mezi přední hranou sedáku a podkolenní jamkou musí zůstat mezera na šířku 2–3 prstů. Pokud sedák tlačí do podkolení, omezuje žilní návrat krve z dolních končetin.'
        },
        {
          heading: 'Dynamický sed s odblokovanou mechanikou',
          body: 'Nezamykejte opěradlo v jedné tuhé poloze. Nastavte tuhost houpacího mechanismu podle své váhy tak, aby vás opěradlo plynule provázelo při každém pohybu těla.'
        }
      ],
      takeaways: [
        'Chodidla musí mít stabilní oporu o podlahu.',
        'Bederní opěrka patří přesně do prohlubně bederní lordózy, ne pod zadek.'
      ]
    }
  },
  {
    id: 'standing-desk',
    title: 'Polohovací stoly: jak správně střídat sed a stoj',
    tag: 'Ergonomie',
    readTime: '4 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '8. srpna 2026',
    summary: 'Stání u počítače není lék na všechno. Zjistěte ideální poměr času v sedě a ve stoje (pravidlo 45/15).',
    fullContent: {
      lead: 'Polohovací stoly jsou skvělým pomocníkem, ale celodenní stání přináší nová rizika – přetížení plosek nohou a beder.',
      sections: [
        {
          heading: 'Zlaté pravidlo: Poměr 45 / 15',
          body: 'Nejvhodnější rytmus pro tělo je 45 minut dynamického sedu následovaných 15 minutami práce ve stoje. Během stání nezamykejte kolena v propnutí a občas přešlápněte.'
        }
      ],
      takeaways: [
        'Při stání udržujte stejnou výšku loktů (90°) i monitoru jako v sedě.',
        'Používejte ergonomickou balanční podložku pro uvolnění chodidel.'
      ]
    }
  },
  {
    id: 'stretch-routine',
    title: '3minutová mobilizace pro lidi u počítače',
    tag: 'Cvičení',
    readTime: '3 min praxe',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '5. srpna 2026',
    summary: 'Rychlý sestup tří cviků, které uvolní ztuhlý hrudník a probudí krevní oběh za pouhé 3 minuty.',
    fullContent: {
      lead: 'Nepotřebujete převlékání do sportovního ani podložku. Tento 3minutový mikro-trénink provedete přímo na židli.',
      sections: [
        {
          heading: '3 kroky k okamžité úlevě',
          body: '1. Otevření hrudníku s výdechem (60 s), 2. Kroužky v ramenou s nádechem (60 s), 3. Protažení šíje do úklonu s volnou paží (60 s).'
        }
      ],
      takeaways: [
        'Nastavte si budík na každé 2 hodiny práce.',
        'Pravidelnost má větší efekt než nárazové hodinové cvičení o víkendu.'
      ]
    }
  },
  {
    id: 'pillow-guide',
    title: 'Jak vybrat anatomický polštář pro krční páteř',
    tag: 'Spánek',
    readTime: '4 min čtení',
    author: 'MUDr. Klára Dvořáková, Neurologie',
    date: '3. srpna 2026',
    summary: 'Výška, tvar a materiál polštáře v závislosti na šířce vašich ramen a oblíbené spánkové poloze.',
    fullContent: {
      lead: 'Polštář má jediný úkol: vyplnit prostor mezi matrací a krční páteří tak, aby hlava nebyla v předklonu, záklonu ani úklonu.',
      sections: [
        {
          heading: 'Měření výšky polštáře pro spánek na boku',
          body: 'Změřte vzdálenost od kořene krku k vnějšímu okraji ramene. To je přesná výška, kterou má mít zanořený polštář pod hlavou.'
        }
      ],
      takeaways: [
        'Paměťová pěna poskytuje stabilnější oporu než peří.',
        'Pokud spíte na zádech, volte nižší polštář s profilovanou vlnkou pod šíjí.'
      ]
    }
  },
  {
    id: 'morning-routine',
    title: 'Ranní desatero: jak vstávat bez ztuhlosti',
    tag: 'Spánek & Pohyb',
    readTime: '3 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '1. srpna 2026',
    summary: 'Deset jednoduchých zvyků, které ochrání vaše ploténky v nejzranitelnější fázi dne.',
    fullContent: {
      lead: 'Prvních 30 minut po probuzení je pro páteř nejkritičtějších. Ploténky jsou plné vody a mají vyšší vnitřní tlak.',
      sections: [
        {
          heading: 'Jak bezpečně vstát',
          body: '1. Přetočte se na bok. 2. Spusťte nohy z postele. 3. Odtlačte se rukama do sedu. 4. Zhluboka se nadechněte.'
        }
      ],
      takeaways: [
        'Nespěchejte na prudké ranní předklony.',
        'Dopřejte tělu sklenici vlažné vody a jemnou chůzi.'
      ]
    }
  }
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chair-height',
    title: 'Výška sedáku židle',
    description: 'Chodidla stojí celou plochou na zemi, v kolenou a kyčlích je úhel 90–100°.',
    category: 'chair',
    tip: 'Pokud vám nohy visí nebo nedosáhnou na zem, použijte podložku pod nohy.'
  },
  {
    id: 'chair-lumbar',
    title: 'Bederní opěrka',
    description: 'Opěrka vyplňuje přirozené prohnutí v bedrech a jemně vás podporuje ve vzpřímeném sedu.',
    category: 'chair',
    tip: 'Nemáte-li nastavitelnou opěrku, můžete použít srolovaný ručník za spodní záda.'
  },
  {
    id: 'chair-armrests',
    title: 'Područky a lokty',
    description: 'Ramena jsou uvolněná, lokty volně spočívají na područkách v úhlu 90° v úrovni stolu.',
    category: 'chair',
    tip: 'Ramena nesmí být vytlačená nahoru k uším ani viset bez opory dolů.'
  },
  {
    id: 'desk-height',
    title: 'Výška desky pracovního stolu',
    description: 'Předloktí leží vodorovně na stole, zápěstí jsou v neutrální poloze (nelámou se).',
    category: 'desk',
    tip: 'Při psaní na klávesnici nezvedejte zápěstí vzhůru – použijte gelovou nebo látkovou opěrku.'
  },
  {
    id: 'monitor-top',
    title: 'Horní hrana monitoru',
    description: 'Horní třetina obrazovky je přesně v úrovni vašich očí při rovném sedu.',
    category: 'monitor',
    tip: 'Pokud pracujete na notebooku, podložte ho stojánkem nebo knihami a připojte externí klávesnici.'
  },
  {
    id: 'monitor-distance',
    title: 'Vzdálenost a orientace monitoru',
    description: 'Monitor je přímo před vámi (ne z boku) ve vzdálenosti 50–70 cm (na délku paže).',
    category: 'monitor',
    tip: 'Vyhněte se odleskům od okna – monitor by měl být kolmo k oknu, nikoli proti němu či zády k němu.'
  },
  {
    id: 'habits-202020',
    title: 'Pravidlo 20/20/20 a mikro-pauzy',
    description: 'Každých 20 minut práce pohled na 20 sekund do dálky (cca 6 metrů) a každou hodinu 2 minuty pohybu.',
    category: 'habits',
    tip: 'I malé vstání pro sklenici vody zásadně snižuje statické přetížení meziobratlových plotének.'
  },
  {
    id: 'habits-dynamic',
    title: 'Dynamické sezení',
    description: 'Během dne měníte úhel opěradla židle a střídáte polohy – žádný sed není zdravý po 4 hodiny v kuse.',
    category: 'habits',
    tip: 'Pravidelně uvolňujte houpací mechaniku židle pro podporu výživy plotének.'
  }
];

export function calculateErgonomics(heightCm: number, mode: 'sitting' | 'standing' = 'sitting'): ErgonomicValues {
  const h = Math.max(140, Math.min(215, heightCm));
  
  if (mode === 'sitting') {
    // Standard ISO 9241 / EN 527 ergonomics
    const seatHeight = Math.round(h * 0.255); // ~ 45 cm for 175cm
    const deskHeight = Math.round(h * 0.415); // ~ 72-73 cm for 175cm
    const eyeLevelSitting = Math.round(h * 0.68); // ~ 119 cm from floor
    const monitorTopHeight = eyeLevelSitting; // top edge at eye level
    const monitorDistance = Math.round(Math.max(50, Math.min(80, h * 0.38))); // ~ 65 cm
    
    return {
      heightCm: h,
      mode: 'sitting',
      seatHeight,
      deskHeight,
      monitorTopHeight,
      monitorDistance,
      elbowAngle: '90° – 100°',
      kneeAngle: '90° – 100°',
      eyeLevelOffset: 'V horizontální rovině očí'
    };
  } else {
    // Standing desk parameters
    const deskHeight = Math.round(h * 0.62); // elbow height standing ~ 108 cm
    const monitorTopHeight = Math.round(h * 0.92); // eye level standing ~ 161 cm
    const monitorDistance = Math.round(Math.max(55, Math.min(85, h * 0.40)));
    
    return {
      heightCm: h,
      mode: 'standing',
      seatHeight: 0,
      deskHeight,
      monitorTopHeight,
      monitorDistance,
      elbowAngle: '90° – 100°',
      kneeAngle: 'Mírně povolená (neuzamčená kolena)',
      eyeLevelOffset: 'V horizontální rovině očí'
    };
  }
}
