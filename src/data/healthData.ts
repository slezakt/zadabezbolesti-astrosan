import type { DiagnosticItem, GuidePillar, Article, ChecklistItem, ErgonomicValues } from '../types/health';

export const DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  {
    id: 'scapula',
    title: 'Bolest mezi lopatkami',
    shortDesc: 'Pálivá nebo bodavá bolest vznikající často z dlouhého předklonu a mělkého dýchání.',
    href: '/blog/bolest-mezi-lopatkami/',
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
    href: '/blog/cviky-na-uvolneni-bederni-patere/',
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
      'Hluboké předklony bez pokrčení kolen.',
      'Dlouhé sezení s nohou přes nohu.',
      'Setrvávání v jedné statické pozici déle než 45 minut.'
    ],
    redFlags: [
      'Ztráta kontroly nad močením či stolicí (syndrom cauda equina – okamžitá pohotovost!).',
      'Náhlá slabost v noze (neschopnost postavit se na patu či špičku).',
      'Vystřelující ostrá bolest pod koleno provázená necitlivostí.'
    ],
    recommendedArticleId: 'lumbar-guide'
  },
  {
    id: 'neck',
    title: 'Krk a šíje',
    shortDesc: 'Napětí vystřelující k hlavě, tuhé trapézy a omezená rotace hlavy do stran.',
    href: '/bolest-krku-a-ramen/',
    iconName: 'Compass',
    safeFirstSteps: [
      'Zkontrolujte výšku monitoru: horní třetina obrazovky musí být v úrovni očí.',
      'Zasuňte bradu dozadu (tzv. dvojitá brada) pro srovnání krční lordózy.',
      'Aplikujte suché teplo (např. nahřátý polštářek) na oblast horních trapézů.'
    ],
    exercises: [
      {
        name: 'Zásuvka brady (chin tuck)',
        description: 'Vzpřímený sed, dívejte se před sebe a prstem jemně zasuňte bradu dozadu jako do zásuvky. Vydržte 3 s.',
        reps: '8 opakování každé 2 hodiny'
      },
      {
        name: 'Boční úklon hlavy s odtažením ramene',
        description: 'Ukloněte hlavu k pravému rameni, levé rameno aktivně tlačte k zemi. Dýchejte klidně.',
        reps: '3× 20 sekund na každou stranu'
      }
    ],
    whatToAvoid: [
      'Kroužení hlavou v plném rozsahu s prudkým záklonem.',
      'Čtení na notebooku položeném na klíně.',
      'Spaní na břiše s otočenou hlavou.'
    ],
    redFlags: [
      'Náhlé závratě, dvojité vidění nebo poruchy polykání spojené s pohybem krku.',
      'Vystřelující brnění do celé paže až do prstů.',
      'Bolest krku vzniklá bezprostředně po úrazu či prudkém zabrždění auta.'
    ],
    recommendedArticleId: 'neck-guide'
  },
  {
    id: 'sleep',
    title: 'Bolest po spánku',
    shortDesc: 'Ranní ztuhlost a bolest, která se objevuje ihned po probuzení a odeznívá během dopoledne.',
    href: '/zdravy-spanek/',
    iconName: 'Moon',
    safeFirstSteps: [
      'Vstávejte přes bok: pokrčte kolena, otočte se na bok a teprve pomocí rukou se posaďte.',
      'Zařaďte po probuzení 2 minuty jemného prodýchání v lehu na zádech.',
      'Zkontrolujte proležení matrace – pokud má proleženinu hlubší než 2 cm, neposkytuje oporu.'
    ],
    exercises: [
      {
        name: 'Přitahování kolen k hrudníku v lehu',
        description: 'V lehu na zádech obejměte rukama kolena a jemně jimi kružte pro masáž křížové oblasti.',
        reps: '5 kroužků na každou stranu'
      },
      {
        name: 'Kočka v kleku na čtyřech',
        description: 'S výdechem vyhrbte celou páteř od kostrče po krk, s nádechem jemně vraťte do roviny.',
        reps: '6 pomalých opakování'
      }
    ],
    whatToAvoid: [
      'Prudké vyskočení z postele hned po zazvonění budíku.',
      'Spaní na příliš vysokém nebo měkkém péřovém polštáři.',
      'Těžká a mastná jídla těsně před spaním, která vedou k neklidnému převalování.'
    ],
    redFlags: [
      'Ranní ztuhlost trvající déle než 60 minut bez zlepšení pohybem.',
      'Noční bolest, která vás pravidelně budí ve druhé polovině noci (podezření na Bechtěreva).',
      'Nevysvětlitelný úbytek na váze a noční pocení.'
    ],
    recommendedArticleId: 'sleep-guide'
  },
  {
    id: 'computer',
    title: 'Dlouhé sezení u PC',
    shortDesc: 'Celková únava zad, tuhnutí mezilopatkových svalů a tíha v bedrech po několika hodinách práce.',
    href: '/ergonomie-pracoviste/',
    iconName: 'Laptop',
    safeFirstSteps: [
      'Nastavte si výšku židle tak, aby kolena svírala 90–100° a chodidla spočívala celou plochou na zemi.',
      'Přisuňte se co nejblíže ke stolu, aby lokty ležely na desce a ramena nevisela v prostoru.',
      'Zaveďte pravidlo 45/15: každých 45 minut se na 2 minuty postavte a projděte.'
    ],
    exercises: [
      {
        name: 'Otevírání hrudníku u stolu',
        description: 'Sepněte ruce za hlavou, lokty roztáhněte do stran a s nádechem jemně otevřete hrudník ke stropu.',
        reps: '5 pomalých dechů'
      },
      {
        name: 'Postavení se na špičky a protažení paží',
        description: 'Postavte se, vytáhněte paže ke stropu a zhluboka se nadechněte do celých plic.',
        reps: '3× 10 sekund'
      }
    ],
    whatToAvoid: [
      'Sed s nohou přehozenou přes druhou.',
      'Sjíždění pánví dopředu (tzv. sed na kříži).',
      'Používání samotného notebooku bez externí klávesnice a stojánku déle než 1 hodinu denně.'
    ],
    redFlags: [
      'Brnění a necitlivost v dlani a prstech při psaní (karpální tunel).',
      'Pocit tuhnutí a slabosti v dolních končetinách.',
      'Bolest hlavy doprovázená rozostřeným viděním.'
    ],
    recommendedArticleId: 'computer-guide'
  },
  {
    id: 'stress',
    title: 'Stres a svalové napětí',
    shortDesc: 'Zatnuté čelisti, zvednutá ramena k uším a pocit krunýře na hrudníku a v šíji.',
    href: '/blog/bolest-zad-ze-stresu/',
    iconName: 'Smile',
    safeFirstSteps: [
      'Zkontrolujte polohu jazyka a čelistí: jazyk opřete o horní patro a mírně pootevřete rty.',
      'Vědomě spusťte ramena dolů s dlouhým pomalým výdechem.',
      'Dopřejte si 3 minuty ticha bez koukání do monitoru či telefonu.'
    ],
    exercises: [
      {
        name: 'Prodloužený výdech 4–7–8',
        description: 'Nádech nosem na 4 doby, zadržení na 7 dob, pomalý plynulý výdech ústy na 8 dob.',
        reps: '4 dechové cykly'
      },
      {
        name: 'Proklepání hrudníku a ramen',
        description: 'Jemně bříšky prstů proklepejte oblast klíčních kostí a hrudní kosti pro stimulaci nervu vagu.',
        reps: '1 minuta klidného proklepávání'
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
    description: 'Naučte se potíže popsat, vybrat bezpečný další krok a rozpoznat situace, kdy domácí tipy nestačí.',
    pillarHref: '/typy-bolesti',
    links: [
      { id: 'scapula-guide', title: 'Příčiny a úleva od bolesti mezi lopatkami', readTime: '5 min čtení', href: '/blog/bolest-mezi-lopatkami/' },
      { id: 'lumbar-exercises', title: 'Cviky na uvolnění bederní páteře', readTime: '6 min čtení', href: '/blog/cviky-na-uvolneni-bederni-patere/' },
      { id: 'night-pain', title: 'Noční bolesti zad: proč vznikají a jak spát', readTime: '4 min čtení', href: '/blog/bolest-zad-v-noci/' }
    ]
  },
  {
    number: '02',
    title: 'Cviky na záda',
    description: 'Šetrné pohybové tipy bez pomůcek pro pracovní stůl nebo domov. Vybírejte jen pohyb, který vám je příjemný.',
    pillarHref: '/cviky-na-zada',
    links: [
      { id: 'stretch-routine', title: '3minutová mobilizace pro lidi u počítače', readTime: '3 min praxe', href: '/blog/strecink-v-kancelari/' },
      { id: 'seven-exercises', title: '7 jednoduchých cviků pro úlevu od bolesti zad', readTime: '5 min praxe', href: '/blog/7-jednoduchych-cviku-pro-ulevu-od-bolesti-zad/' },
      { id: 'neck-exercises', title: 'Cviky na krční páteř pro kancelářské pracovníky', readTime: '4 min praxe', href: '/blog/cviky-na-krcni-pater-pro-kancelarske-pracovniky/' }
    ]
  },
  {
    number: '03',
    title: 'Ergonomie pracoviště',
    description: 'Orientační nastavení židle, monitoru a stolu a praktické tipy pro častější změnu polohy během práce.',
    pillarHref: '/ergonomie-pracoviste',
    links: [
      { id: 'monitor-height', title: 'Výška a vzdálenost monitoru: přesný návod', readTime: '5 min čtení', href: '/blog/idealni-nastaveni-monitoru-vyska-vzdalenost-sklon/' },
      { id: 'desk-setup', title: 'Jak správně sedět u počítače krok za krokem', readTime: '6 min čtení', href: '/blog/jak-spravne-sedet-u-pocitace/' },
      { id: 'standing-desk', title: 'Polohovací stoly: jak správně střídat sed a stoj', readTime: '4 min čtení', href: '/blog/vyskove-nastavitelny-stul-pruvodce/' }
    ]
  },
  {
    number: '04',
    title: 'Spánek a regenerace',
    description: 'Jak postupně zkoušet změny spánkové polohy, matrace a polštáře a jak sledovat ranní pohodlí.',
    pillarHref: '/zdravy-spanek',
    links: [
      { id: 'sleep-positions', title: 'Nejlepší poloha při spánku pro ploténky', readTime: '6 min čtení', href: '/blog/nejlepsi-poloha-pri-spanku/' },
      { id: 'pillow-guide', title: 'Jak vybrat správný polštář pro krční páteř', readTime: '4 min čtení', href: '/blog/spravny-polstar-pro-zdrava-zada/' },
      { id: 'mattress-guide', title: 'Jak vybrat matraci pro bolavá záda', readTime: '5 min čtení', href: '/blog/jak-vybrat-matraci/' }
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
    href: '/blog/bolest-mezi-lopatkami/',
    summary: 'Proč oblast mezi lopatkami tolik trpí při práci na notebooku? Odhalte mechanismus zkrácených prsních svalů, oslabených mezilopatkových fixátorů a blokád žeber.'
  },
  {
    id: 'monitor-height',
    title: 'Výška monitoru: ideální nastavení obrazovky',
    tag: 'Ergonomie',
    readTime: '4 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '20. srpna 2026',
    href: '/blog/idealni-nastaveni-monitoru-vyska-vzdalenost-sklon/',
    summary: 'Jak umístit horní hranu displeje vůči očím, jaká je optimální vzdálenost a proč práce na samotném notebooku ničí krční páteř.'
  },
  {
    id: 'night-pain',
    title: 'Bolest zad v noci: proč vzniká a co pomáhá',
    tag: 'Spánek',
    readTime: '5 min čtení',
    author: 'MUDr. Klára Dvořáková, Neurologie',
    date: '18. srpna 2026',
    href: '/blog/bolest-zad-v-noci/',
    summary: 'Proč se v noci meziobratlové ploténky rozpínají, jak vybrat správnou oporu pro spánek na boku a kdy je noční bolest důvodem k návštěvě lékaře.'
  },
  {
    id: 'stress-back-pain',
    title: 'Bolest mezi lopatkami ze stresu',
    tag: 'Psychosomatika',
    readTime: '5 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '15. srpna 2026',
    href: '/blog/bolest-zad-ze-stresu/',
    summary: 'Jak sympatický nervový systém stahuje bránici, zkracuje dech a vytváří chronický krunýř kolem hrudní páteře.'
  },
  {
    id: 'lumbar-exercises',
    title: 'Cviky na bederní páteř pro úlevu od ztuhlosti',
    tag: 'Cvičení',
    readTime: '7 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '12. srpna 2026',
    href: '/blog/cviky-na-uvolneni-bederni-patere/',
    summary: 'Sestava 5 bezpečných cviků pro aktivaci hlubokého stabilizačního systému (HSS) a uvolnění přetížených bederních vzpřimovačů.'
  },
  {
    id: 'desk-setup',
    title: 'Jak správně sedět u počítače krok za krokem',
    tag: 'Ergonomie',
    readTime: '5 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '10. srpna 2026',
    href: '/blog/jak-spravne-sedet-u-pocitace/',
    summary: 'Nastavení bederní opěrky, hloubky sedáku, područek a úhlu opěradla podle ergonomických standardů.'
  },
  {
    id: 'standing-desk',
    title: 'Polohovací stoly: jak správně střídat sed a stoj',
    tag: 'Ergonomie',
    readTime: '4 min čtení',
    author: 'Ergonomický tým ZádaBezBolesti',
    date: '8. srpna 2026',
    href: '/blog/vyskove-nastavitelny-stul-pruvodce/',
    summary: 'Stání u počítače není lék na všechno. Zjistěte ideální poměr času v sedě a ve stoje (pravidlo 45/15).'
  },
  {
    id: 'stretch-routine',
    title: '3minutová mobilizace pro lidi u počítače',
    tag: 'Cvičení',
    readTime: '3 min praxe',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '5. srpna 2026',
    href: '/blog/strecink-v-kancelari/',
    summary: 'Rychlý sestup tří cviků, které uvolní ztuhlý hrudník a probudí krevní oběh za pouhé 3 minuty.'
  },
  {
    id: 'pillow-guide',
    title: 'Jak vybrat anatomický polštář pro krční páteř',
    tag: 'Spánek',
    readTime: '4 min čtení',
    author: 'MUDr. Klára Dvořáková, Neurologie',
    date: '3. srpna 2026',
    href: '/blog/spravny-polstar-pro-zdrava-zada/',
    summary: 'Výška, tvar a materiál polštáře v závislosti na šířce vašich ramen a oblíbené spánkové poloze.'
  },
  {
    id: 'morning-routine',
    title: 'Ranní desatero: jak vstávat bez ztuhlosti',
    tag: 'Spánek & Pohyb',
    readTime: '3 min čtení',
    author: 'Mgr. Jan Novotný, Fyzioterapeut',
    date: '1. srpna 2026',
    href: '/blog/proc-me-boli-zada-po-spanku-idealni-poloha/',
    summary: 'Deset jednoduchých zvyků, které ochrání vaše ploténky v nejzranitelnější fázi dne.'
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
