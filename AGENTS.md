# Pokyny pro práci v repozitáři

Tyto pokyny platí pro vývojáře i kódovací agenty. Před větší změnou si přečtěte `ARCHITECTURE.md`, při práci s obsahem také `CONTENT_GUIDE.md` a při nasazování `DEPLOYMENT_COOKBOOK.md`.

## Engineering princip

Než přidáte infrastrukturu nebo abstrakci, položte si otázku:

> Pomůže to realisticky stavět nebo provozovat malé a střední klientské weby?

Pokud ne, změnu odložte. Preferujte nudné, čitelné a opakovaně použitelné primitivy před frameworkem uvnitř frameworku.

## Architektonické mantinely

- Zachovejte statické SSG a Cloudflare Workers static assets, dokud konkrétní požadavek nevyžaduje serverový runtime.
- Nepřidávejte Visual Editing, draft cookies, automatické publikování draftů, multi-tenancy ani A/B framework bez doložené obchodní potřeby.
- Projektově specifický obsah, vzhled a obchodní logiku neumisťujte do obecného reusable jádra.
- Sanity publikování dokumentu nesmí automaticky spouštět deploy. Produkční release řídí singleton `deploymentRequest` a nástroj **Nasadit web**.
- Žádný GitHub nebo Cloudflare token nesmí být součástí veřejného Studio či Astro bundle.

## Sanity a obsah

- Používejte `defineType()`, `defineField()` a `defineArrayMember()`.
- GROQ dotazy centralizujte v `src/utils/queries.ts` a deklarujte pomocí `defineQuery()`.
- Po změně schématu nebo dotazu spusťte `npm run typegen` a commitněte změny `schema.json` a `sanity.types.ts`.
- Neobcházejte content boundary v `src/utils/content.ts` ani doménové validace v `src/domain/`.
- Fallback obsah musí splňovat stejný kontrakt jako Sanity data.
- Produkční `CONTENT_SOURCE=sanity` build musí skončit chybou při neplatných nebo nedostupných CMS datech.

## Frontend

- Tailwind CSS v4 je výchozí nástroj pro design systém a layout. Krátké scoped CSS je přijatelné, pokud zvyšuje čitelnost komponenty.
- Alpine.js CSP používejte pro jednoduchý deklarativní UI stav. Izolovaný TypeScript modul je vhodný pro analytiku, formulář nebo chování, které není přirozeným Alpine stavem.
- Nepřidávejte klientský framework ani závislost kvůli jedné drobné interakci.
- Zachovejte sémantické HTML, ovládání klávesnicí, viditelný focus a alternativní texty.
- SEO změny ověřte proti canonical URL, sitemapě, RSS a JSON-LD; nespoléhejte jen na vizuální kontrolu stránky.

## Analytika a soukromí

- Eventy definujte v typovaném kontraktu a používejte stabilní technická ID.
- Nikdy neposílejte e-mail, telefon, text zprávy, hodnoty inputů ani jiné PII.
- Respektujte consent state a DNT. Cloudflare RUM držte odděleně od business analytiky.
- Nový provider implementujte jako adaptér; nevkládejte jeho volání napřímo do komponent.

## Povinné ověření

Pro běžnou změnu spusťte kontroly přiměřené jejímu riziku. Před releasem musí projít minimálně:

```bash
npm run typegen
npm run test:unit
npm run typecheck
CONTENT_SOURCE=fallback npm run build
npm run test:predeploy
CONTENT_SOURCE=sanity npm run build
npm run test:predeploy
```

Změna deploymentu navíc vyžaduje postdeploy test a kontrolu deployment fingerprintu. Release gate neobcházejte ručním nahráváním jiného výstupu.

## Bezpečnost práce

- Necommitujte `.env`, API tokeny ani klientská tajemství.
- Neupravujte vygenerované typy ručně.
- Před odstraněním produkčního pole nebo obsahu připravte migraci a ověřte její dry run.
- Zachovejte nesouvisející změny v pracovním stromu a nepoužívejte destruktivní Git příkazy.
