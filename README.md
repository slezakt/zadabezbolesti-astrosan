# Astro + Sanity starter

Praktický produkční základ pro malé a střední klientské weby. Starter upřednostňuje rychlost výroby, spolehlivost, SEO, jednoduchou správu obsahu, měřitelné výsledky a nízké provozní náklady.

## Co obsahuje

- Astro 7 v režimu statického SSG, TypeScript strict a Tailwind CSS v4.
- Vložené Sanity Studio na `/admin/` s TypeGenem a validovanou content boundary.
- Režimy zdroje obsahu `fallback`, `auto` a striktní produkční `sanity`.
- Typovanou business analytiku pro Plausible, Umami, GA4 nebo `none`.
- Centrální tlačítko **Nasadit web**, které seskupí obsahové změny do jednoho buildu.
- GitHub Actions release gate, Cloudflare Workers deployment, smoke testy a minimální health check.

## Rychlý start

```bash
cp .env.example .env
npm ci
npm run typegen
CONTENT_SOURCE=fallback npm run verify
```

Potom nahraďte demo identitu, obsah, fallback data, Sanity projekt, Cloudflare Worker, analytiku, formulář a smoke-test očekávání podle konkrétního klienta.

## Závazná dokumentace

1. [ARCHITECTURE.md](./ARCHITECTURE.md) — cíl, hranice a architektonická rozhodnutí.
2. [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — Sanity schémata, GROQ, TypeGen, Portable Text a obrázky.
3. [STARTER_SETUP.md](./STARTER_SETUP.md) — založení nového klientského projektu.
4. [DEPLOYMENT_COOKBOOK.md](./DEPLOYMENT_COOKBOOK.md) — produkční release, webhook, analytika a rollback.
5. [AGENTS.md](./AGENTS.md) — pravidla pro vývojáře a kódovací agenty.

Pokud si dokumenty odporují, platí architektonická rozhodnutí v `ARCHITECTURE.md` a konkrétní provozní postupy v `DEPLOYMENT_COOKBOOK.md`.

## Produkční tok

Publikování jednotlivého dokumentu v Sanity samo o sobě build nespouští. Editor nejprve dokončí a publikuje související změny a potom použije nástroj **Nasadit web**. Sanity webhook spustí jeden GitHub Actions workflow, který ověří typy, obsah, build i výstup a nasadí jej přes Wrangler.

## Ověření změn

```bash
npm run typegen
npm run test:unit
npm run typecheck
CONTENT_SOURCE=fallback npm run build
npm run test:predeploy
```

Před produkčním releasem musí navíc projít striktní `CONTENT_SOURCE=sanity` build, postdeploy test a deployment fingerprint.

## Záměrné hranice

Starter není obecný enterprise framework. Neobsahuje multi-tenant runtime, vlastní monitoring platformu, automatické publikování draftů, SSR Visual Editing ani A/B testing. Tyto funkce přidávejte pouze tehdy, když mají doloženou potřebu konkrétního klienta.
