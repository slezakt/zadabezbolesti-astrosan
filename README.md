# Univerzální produkční šablona & Kuchařka pro AI agenty
### Stack: Astro 7 | Sanity CMS | Tailwind CSS v4 | Alpine.js | AEO & Multi-provider Analytika

Tento repozitář slouží jako **výchozí produkční šablona (starter boilerplate)** pro moderní komerční webové projekty. Repozitář zároveň funguje jako **závazná příručka a kuchařka (Cookbook) pro AI kódovací agenty**, kteří budou na tento základ navazovat a stavět specifické projektové nástavby.

---

## 🔄 SPRÁVA A AKTUALIZACE PROJEKTŮ (GIT UPSTREAM WORKFLOW)

Aby bylo možné tento základ průběžně vylepšovat a **zpětně promítat aktualizace jádra (bugfixy, nové balíčky a funkce) do všech komerčních projektů**, doporučujeme následující osvědčený Git pracovní postup:

### 1. Založení nového klientského projektu z šablony

Když začínáte nový komerční projekt (např. `klient-masaze`):

```bash
# 1. Vytvořte nový adresář pro klientský projekt a inicializujte Git
mkdir klient-masaze
cd klient-masaze
git init

# 2. Přidejte tuto šablonu jako vzdálený zdroj "upstream"
git remote add upstream git@github.com:vase-firma/astrosan-template.git

# 3. Stáhněte nejnovější stav šablony do hlavní větve
git fetch upstream
git checkout -b main
git merge upstream/main

# 4. Propojte projekt s novým samostatným repozitářem klienta
git remote add origin git@github.com:vase-firma/klient-masaze.git
git push -u origin main
```

### 2. Jak aktualizovat klientský projekt v budoucnu

Když v šabloně opravíte chybu nebo přidáte novou funkci (např. vylepšíte `CookieConsent.astro`, `SchemaOrg.astro` nebo `src/utils/sanity.ts`):

```bash
# V adresáři klientského projektu stáhněte aktualizace ze šablony
git fetch upstream
git merge upstream/main
```

> **Výhoda:** Git automaticky sloučí nové funkce jádra, aniž by přepsal specifický obsah a stránky vytvořené pro konkrétního klienta.

---

## 🤖 PŘÍSNÁ PRAVIDLA A STANDARDY PRO AI AGENTY

Při jakékoliv úpravě nebo rozšiřování tohoto repozitáře **MUSÍ AI AGENTI BEZPODMÍNEČNĚ DODRŽOVAT NÁSLEDUJÍCÍ PRAVIDLA**:

### 1. Stylikace a Design Systém -> VÝHRADNĚ Tailwind CSS v4
- **Veškeré UI komponenty a stránky SE STYLUJÍ VÝHRADNĚ POMOCÍ TAILWIND CSS V4 UTILITY TŘÍD.**
- Používá se CSS-first konfigurace v `src/styles/global.css` přes `@import "tailwindcss";` a `@theme`.
- **ZÁKAZ** psaní dlouhých manuálních `<style>` bloků uvnitř Astro komponent.
- Všechny barvy (`bg-[#090d16]`, `bg-slate-900`, `text-indigo-400`), zaoblení (`rounded-2xl`), stíny (`shadow-glow`) a fonty (`font-heading`, `font-sans`) musí dodržovat předdefinovaný design systém.

### 2. Klientská interaktivita -> VÝHRADNĚ CSP-Friendly Alpine.js
- **Veškeré klientské reaktivní prvky (dropdowny, modální okna, mobilní navigace, akordeony, ceníky, formuláře atd.) SE PÍŠÍ VÝHRADNĚ POMOCÍ ALPINE.JS.**
- Používá se **CSP-friendly build** Alpine.js (bez `eval()`), což zaručuje 100% průchodnost bezpečnostními audity.
- **NEPÍŠÍ SE** žádné pasivní inline `<script>` tagy s manuálním `document.querySelector` ani nepotřebné React komponenty (Astro Islands).

### 3. Multi-provider Analytika a GDPR (`@arraypress/analytics-astro`)
- Využívá se balíček **`@arraypress/analytics-astro`** v komponentě `CookieConsent.astro`.
- **Přepínání poskytovatelů**: V souboru `.env` stačí nastavit proměnnou pro zvoleného poskytovatele:
  - Google Analytics 4: `PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXX"`
  - Plausible: `PUBLIC_PLAUSIBLE_DOMAIN="example.com"`
  - Umami: `PUBLIC_UMAMI_WEBSITE_ID="XXXXXXXX"`
- Měřicí skript se dynamicky spouští až po udělení souhlasu v Cookie liště a stav se uloží do `localStorage`.

### 4. AEO (Answer Engine Optimization) & SEO
- Šablona automaticky servíruje soubor `http://localhost:4321/llms.txt` ze `src/pages/llms.txt.ts` (čistý Markdown výtah pro AI agenty ChatGPT, Perplexity, Claude).
- Strukturovaná data se generují přes `<SchemaOrg type="LocalBusiness" ... />` ze `src/components/SchemaOrg.astro` s podporou pro GPS souřadnice, otevírací dobu a adresu pro výsledky v Google Mapách.

### 5. Bezpečný Kontaktní API Endpoint
- Kontaktní formuláře posílají data na `/api/contact.ts`.
- Endpoint obsahuje **Rate Limiting** per IP (max 3 zprávy/min), validaci přes **Zod**, neviditelný **Honeypot** pro spamboty a ověření **Cloudflare Turnstile**.

### 6. Načítání dat a GROQ
- Načítání obsahu probíhá **VÝHRADNĚ** přes centralizovanou funkci `fetchSanity()` ze `src/utils/sanity.ts`.
- Veškeré GROQ dotazy **MUSÍ** být definovány v `src/utils/queries.ts` s obalovou funkcí `defineQuery` z balíčku `groq` a s explicitním dereferencováním vazeb.

---

## 📖 KUCHAŘKA PRO AI AGENTY (COOKBOOK & WORKFLOW EXAMPLES)

### Příklad A: Přidání nového datového typu do CMS (např. "Služba")

1. Vytvořte schéma v `studio/schemas/documents/service.ts`:
```ts
import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Název služby', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL Identifikátor (Slug)', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Stručný popis', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Detailní obsah', type: 'blockContent' }),
  ],
});
```

2. Zaregistrujte schéma v `studio/schemas/index.ts`:
```ts
import { service } from './documents/service';
export const schemaTypes = [..., service];
```

3. Přidejte GROQ dotaz do `src/utils/queries.ts`:
```ts
export const allServicesQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)] {
    _id, title, "slug": slug.current, description
  }
`);
```

4. Vytvořte dynamickou stránku `src/pages/sluzby/[slug].astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import PortableText from '../../components/PortableText/PortableText.astro';
import { fetchSanity } from '../../utils/sanity';
import { serviceQuery } from '../../utils/queries';

export const prerender = false;
const { slug } = Astro.params;
const preview = Astro.cookies.has('sanity_draft_mode');
const service = await fetchSanity(serviceQuery, { slug }, { preview });
---

<Layout title={service.title}>
  <h1 class="font-heading text-4xl text-white font-bold">{service.title}</h1>
  <PortableText value={service.content} />
</Layout>
```

---

### Příklad B: Tvorba reaktivní Tailwind v4 + Alpine.js komponenty

```astro
<div class="bg-slate-900/60 border border-white/10 rounded-2xl p-6" x-data="{ open: false }">
  <button
    @click="open = !open"
    class="w-full text-left font-heading font-semibold text-white text-lg flex justify-between items-center cursor-pointer"
  >
    <span>Titul otázky</span>
    <span class="text-indigo-400 text-xl" x-text="open ? '−' : '+'"></span>
  </button>

  <div class="mt-4 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4" x-show="open" x-transition>
    Text odpovědi...
  </div>
</div>
```

---

### Příklad C: Přepnutí poskytovatele analytiky v CookieConsent.astro

V `.env` stačí nastavit proměnnou pro zvoleného poskytovatele:

```env
# Pro Plausible:
PUBLIC_PLAUSIBLE_DOMAIN="mojedomena.cz"

# Nebo pro GA4:
# PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXX"
```

---

### Příklad D: LocalBusiness Schema.org

```astro
<SchemaOrg
  type="LocalBusiness"
  title="Masážní Studio Relax"
  description="Masáže v centru Prahy."
  telephone="+420123456789"
  priceRange="$$"
  address={{ streetAddress: 'Václavské nám. 1', addressLocality: 'Praha 1', postalCode: '110 00', addressCountry: 'CZ' }}
  geo={{ latitude: 50.0813, longitude: 14.427 }}
/>
```

---

## 🛠️ Technologický stack & Integrace

- **Astro 7 (SSR)**: Server-Side Rendering (`output: 'server'`) s adaptérem `@astrojs/node`.
- **Tailwind CSS v4**: `@tailwindcss/vite` s CSS-first konfigurací v `src/styles/global.css`.
- **Alpine.js (CSP-Friendly)**: Klientská reaktivita skrze `@astrojs/alpinejs` a `alpinejs`.
- **Embedded Sanity Studio**: Administrace CMS integrovaná na adrese `/admin` přes `@sanity/astro` a `sanity-plugin-media`.
- **Multi-provider Analytika**: `@arraypress/analytics-astro` napojené na GDPR lištu.
- **AEO & SEO**: Generátor `/llms.txt`, `/sitemap-index.xml`, `/robots.txt`, `/rss.xml` a `<SchemaOrg />`.
- **Bezpečný API Endpoint**: `/api/contact.ts` s Zod validací, Rate Limitingem a Turnstile.

---

## 📁 Adresářová struktura

```text
├── astro.config.mjs          # Konfigurace Astro (SSR, Node, React, Alpine.js, Tailwind v4, Sitemap)
├── sanity.config.ts          # Konfigurace Sanity Studia (české rozhraní, media plugin, singletons)
├── tsconfig.json             # TypeScript konfigurace
├── .env                      # Environmentální proměnné (lokální)
├── .env.example              # Vzorový konfigurační soubor
├── studio/
│   └── schemas/              # Definice datových modelů Sanity CMS (documents, objects)
└── src/
    ├── styles/
    │   └── global.css        # Tailwind v4 import a @theme konfigurace
    ├── components/           # Astro komponenty stylované přes Tailwind v4
    │   ├── SanityImage.astro
    │   ├── SchemaOrg.astro
    │   ├── CookieConsent.astro
    │   ├── ContactForm.astro
    │   └── UI/               # Reaktivní Tailwind UI komponenty (FaqAccordion, Modal, PricingTable)
    ├── layouts/
    │   └── Layout.astro      # Hlavní rozvržení s global.css
    ├── pages/
    │   ├── index.astro       # Úvodní stránka
    │   ├── clanky/           # Přehled a detail článku
    │   ├── [...slug].astro   # Dynamická záchytná cesta pro stránky z CMS
    │   ├── llms.txt.ts       # AEO Endpoint pro AI agenty
    │   ├── robots.txt.ts     # Dynamické robots.txt
    │   ├── rss.xml.ts        # Generátor RSS feedu
    │   └── api/              # API endpointy (contact.ts, draft-mode)
    └── utils/
        ├── sanity.ts         # Inicializace Sanity klienta (CDN vs. Draft Mode)
        ├── queries.ts        # Centralizované GROQ dotazy
        └── image.ts          # Builder pro obrázky ze Sanity CDN
```

---

## ⚙️ Rychlý start, vývojové příkazy a produkce

### Spuštění vývojového prostředí
```bash
npm install
npm run dev
```

- **Webové rozhraní**: [http://localhost:4321](http://localhost:4321)
- **CMS Administrace**: [http://localhost:4321/admin](http://localhost:4321/admin)
- **AEO výtah pro AI**: [http://localhost:4321/llms.txt](http://localhost:4321/llms.txt)
- **Sitemap**: [http://localhost:4321/sitemap-index.xml](http://localhost:4321/sitemap-index.xml)

### Typová kontrola a Produkční Build
```bash
# Spuštění striktní typové kontroly (musí vyhodnotit 0 errors)
npx astro check

# Sestavení produkčního buildu pro Node.js SSR
npm run build
```
