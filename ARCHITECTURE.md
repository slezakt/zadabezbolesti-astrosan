# Architektura Astro + Sanity starteru

## Cíl

Starter je praktický základ pro malé a střední klientské weby. Optimalizuje rychlost výroby, spolehlivost, SEO, jednoduchou správu obsahu, měřitelnost a nízké provozní náklady. Není to enterprise framework.

## Výchozí rozhodnutí

- Astro 7, TypeScript strict, Tailwind CSS v4 a Alpine.js CSP.
- Sanity Studio je vložené na `/admin/`.
- Produkce je statické SSG a běží jako Cloudflare Worker se static assets.
- Publikování dokumentu v Sanity nespouští build. Editor spustí jeden build nástrojem **Nasadit web**.
- Business analytika má typovaný kontrakt a adaptéry Plausible, Umami, GA4 nebo `none`.
- Cloudflare RUM je oddělené od business analytiky.
- A/B testing se neimplementuje, dokud pro něj není reálný provoz a obchodní potřeba.

## Hranice reusable a project-specific kódu

Reusable:

- `src/domain/`, `src/utils/content.ts` a `src/data/fallback.ts` — content boundary a zdrojová politika.
- `src/analytics/` — provider abstraction, souhlas, DNT, DOM validace a zákaz PII.
- `studio/tools/deploy/` a `deploymentRequest` — ruční požadavek na release.
- `scripts/` a `.github/workflows/` — release gate, smoke testy a health check.
- obecná schémata `page`, `post`, `author`, `category`, `siteSettings`, Portable Text a SEO.

Project-specific a povinné k úpravě:

- vizuální styl, komponenty, texty a fallback obsah;
- schémata konkrétních služeb a obchodního modelu;
- název Workeru ve `wrangler.jsonc`;
- doména, Sanity projekt/dataset, analytika, formulář a smoke-test očekávání;
- eventy přidávané nad minimální generický analytický kontrakt.

## Content source policy

- `CONTENT_SOURCE=fallback`: nikdy nevolá Sanity; deterministický lokální/PR build.
- `CONTENT_SOURCE=auto`: vývoj; fallback je povolen jen při síťovém nebo 5xx výpadku.
- `CONTENT_SOURCE=sanity`: produkce; chyba spojení i neplatná CMS data zastaví build.
- Neexistující slug je platná 404, nikoli důvod přepnout na fallback.

## Co záměrně chybí

- multi-tenant runtime, vlastní monitoring platforma a obecný page-builder;
- automatické publikování všech draftů;
- SSR draft cookies a Visual Editing overlay;
- experimentační/A-B framework;
- vlastní serverový formulář a databáze.

## Závislosti a bezpečnost

Při aktualizacích spouštějte `npm audit` a kontrolujte konkrétní dependency path. Nepoužívejte automaticky `npm audit fix --force`: může vynutit nekompatibilní downgrade hlavního Sanity balíku. Nálezy pouze v CLI/workbench toolchainu evidujte a odstraňte běžným upgradem, jakmile je oprava dostupná upstream; nález v klientském bundle nebo aplikačním runtime řešte před releasem.
