# Založení nového klientského webu

## 1. Vytvoření projektu

1. Zkopírujte starter do nového repozitáře bez historie klientských dat.
2. Změňte `name` v `package.json` a `name` ve `wrangler.jsonc` na stabilní technický identifikátor projektu.
3. Zkopírujte `.env.example` do `.env` a vyplňte lokální hodnoty.
4. Spusťte `npm ci`, `npm run typegen` a `CONTENT_SOURCE=fallback npm run verify`.

## 2. Sanity

1. Založte samostatný Sanity projekt a production dataset.
2. Nastavte `PUBLIC_SANITY_PROJECT_ID` a `PUBLIC_SANITY_DATASET` lokálně i v GitHub Variables.
3. Upravujte model jen pomocí `defineType()` a `defineField()`; povinná pole musí mít validaci `required()`.
4. GROQ dotazy ponechte centralizované v TypeScriptu a obalte `defineQuery()`.
5. Po změně schématu nebo dotazu spusťte `npm run typegen` a commitněte `schema.json` i `sanity.types.ts`.
6. Fallback data musí projít stejnou doménovou validací jako data ze Sanity.

## 3. Cloudflare a GitHub

GitHub Secrets:

- `CLOUDFLARE_API_TOKEN` s nejmenším potřebným oprávněním pro zápis Worker scriptu;
- `CLOUDFLARE_ACCOUNT_ID`;
- `PUBLIC_WEB3FORMS_ACCESS_KEY`;
- případně Sanity hodnoty, pokud je nechcete uložit jako Variables.

GitHub Variables:

- `PUBLIC_SITE_URL`, `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`;
- `PUBLIC_SANITY_STUDIO_TITLE`, `PUBLIC_GITHUB_ACTIONS_URL`;
- `PUBLIC_ANALYTICS_PROVIDER` a proměnné zvoleného adaptéru;
- `PUBLIC_RUM_PROVIDER` a případný beacon token;
- `SMOKE_SITE_TITLE`, `SMOKE_CRITICAL_PATH`, `SMOKE_CRITICAL_TITLE`.

První nasazení proveďte přes `workflow_dispatch`. Teprve po úspěšném postdeploy testu připojte produkční doménu.

## 4. Klientský obsah a UI

- Nahraďte všechny demo texty, kontakty, Structured Data a fallback data.
- Zkontrolujte stabilní analytická ID; nikdy neposílejte hodnoty formulářových polí, e-mail, telefon ani zprávu.
- Kritickou stránku pro monitoring vybírejte podle business významu, ne podle technické pohodlnosti.
- U prázdného blogu buď RSS zachovejte jako validní prázdný feed, nebo blog/RSS z projektu vědomě odeberte.

## 5. Definition of Done

```bash
npm run typegen
npm run test:unit
npm run typecheck
CONTENT_SOURCE=fallback npm run build
npm run test:predeploy
CONTENT_SOURCE=sanity npm run build
npm run test:predeploy
```

V produkci navíc musí projít deploy workflow, fingerprint, reprezentativní URL a hodinový health check.
