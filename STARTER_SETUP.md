# Založení a dlouhodobá správa klientských webů

Tento návod popisuje, jak správně zakládat klientské projekty vycházející ze starteru `astrosan` a jak zajistit, aby šly klientské weby v budoucnu snadno a spolehlivě aktualizovat při změnách v mateřském starteru.

---

## 1. Jak udržovat weby aktualizovatelné (Git Upstream Workflow)

Pro snadné přenášení vylepšení z `astrosan` (např. opravy chyb, aktualizace verzí Astro/Tailwind, vylepšení deployment pipeline, analytiky či smoke testů) používáme model **Upstream Git Remote**.

### Postup založení nového klientského projektu:

```bash
# 1. Klonujte mateřský starter do nové složky pro klientský projekt
git clone <URL_REPOSITARE_ASTROSAN> klientsky-web
cd klientsky-web

# 2. Přejmenujte stávající 'origin' remote na 'upstream'
git remote rename origin upstream

# 3. Přidejte nový prázdný klientský repozitář jako 'origin'
git remote add origin <URL_KLIENTSKEHO_GITHUB_REPOSITARE>

# 4. Nahrajte výchozí stav do klientského repozitáře
git push -u origin master
```

### Postup aktualizace klientského webu ze starteru:

Kdykoliv v budoucnu vydáte novou verzi nebo opravu v `astrosan`, v klientském repozitáři jednoduše spustíte:

```bash
# 1. Stáhněte nejnovější commity z mateřského starteru
git fetch upstream

# 2. Sloučte novinky do vaší pracovní větve (nebo master)
git merge upstream/master

# 3. Vyřešte případné konflikty a spusťte ověření
npm ci
npm run typegen
CONTENT_SOURCE=fallback npm run verify
```

---

## 2. Architektonická pravidla pro čisté aktualizace bez konfliktů

Aby `git merge upstream/master` probíhal hladce a bez zbytečných konfliktů, dodržujte oddělení jádra a klientského kódu:

| Vrstva | Co obsahuje | Doporučení pro úpravy |
|---|---|---|
| **Společné jádro (Core)** | `src/domain/`, `src/analytics/`, `scripts/`, `.github/workflows/`, `studio/tools/deploy/` | **Neupravujte klientskou logikou.** Změny v jádru patří do `astrosan`, odkud se mergují do klientských webů. |
| **Prezentační vrstva** | `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | Zde probíhá klientský vývoj designu a stránek. |
| **Obsahový model** | `studio/schemas/`, `src/data/fallback.ts`, `src/utils/queries.ts` | Zde rozšiřujete schémata a data specifická pro klienta. |
| **Konfigurace projektu** | `package.json` (`name`), `wrangler.jsonc` (`name`), `.env` | Specifické identifikátory daného webu. |

---

## 3. Prvotní konfigurace nového webu

1. **Změna technického identifikátoru:**
   - Upravte `name` v `package.json` (např. `"mojeklient-web"`).
   - Upravte `name` ve `wrangler.jsonc` na unikátní název Cloudflare Workeru.
2. **Příprava lokálního prostředí:**
   ```bash
   cp .env.example .env
   ```
3. **Instalace a ověření základu:**
   ```bash
   npm ci
   npm run typegen
   CONTENT_SOURCE=fallback npm run verify
   ```

---

## 4. Varianty správy obsahu

### Varianta A: Web s napojeným Sanity CMS
1. Založte samostatný Sanity projekt a `production` dataset.
2. Nastavte `PUBLIC_SANITY_PROJECT_ID` a `PUBLIC_SANITY_DATASET` v `.env` i v GitHub Variables.
3. Modely upravujte výhradně pomocí `defineType()`, `defineField()` s validací `required()`.
4. GROQ dotazy centralizujte v `src/utils/queries.ts` a deklarujte přes `defineQuery()`.
5. Po každé změně schématu spusťte `npm run typegen` a commitněte `schema.json` i `sanity.types.ts`.

### Varianta B: Web bez Sanity CMS (statický prezentační web)
1. Ponechte `PUBLIC_SANITY_PROJECT_ID="your-project-id"` nebo nastavte `CONTENT_SOURCE="fallback"` v `.env`.
2. Obsah spravujte přímo v Astro komponentách/stránkách nebo v `src/data/fallback.ts`.
3. Starter automaticky běží v lokálním statickém režimu bez chybových hlášek a bez nutnosti vytvářet Sanity účet.

---

## 5. Nastavení Cloudflare a GitHub CI/CD

### GitHub Secrets:
- `CLOUDFLARE_API_TOKEN` — token s oprávněním pro zápis Workeru.
- `CLOUDFLARE_ACCOUNT_ID` — ID Cloudflare účtu.
- `PUBLIC_WEB3FORMS_ACCESS_KEY` — klíč pro kontaktní formulář (volitelné).
- `SANITY_API_READ_TOKEN` — čtecí token Sanity (pokud se používá privátní dataset / draft preview).

### GitHub Variables:
- `PUBLIC_SITE_URL` — např. `https://www.klient.cz` (bez koncového lomítka).
- `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`.
- `PUBLIC_SANITY_STUDIO_TITLE`, `PUBLIC_GITHUB_ACTIONS_URL`.
- `PUBLIC_ANALYTICS_PROVIDER` (`none` | `plausible` | `umami` | `ga4`) a odpovídající proměnné.
- `PUBLIC_RUM_PROVIDER` (`none` | `cloudflare`) a token.
- `SMOKE_SITE_TITLE`, `SMOKE_CRITICAL_PATH`, `SMOKE_CRITICAL_TITLE`.

První nasazení proveďte ručně přes **GitHub Actions -> Deploy Production -> Run workflow (`workflow_dispatch`)**. Po úspěšném postdeploy smoke testu připojte vlastní doménu v Cloudflare Dashboardu.

---

## 6. Klientský obsah, UI a SEO Checklist

- [ ] Nahrazeny všechny výchozí texty, kontakty a sociální sítě.
- [ ] Zkontrolována a upravena `SchemaOrg.astro` (Structured Data) a `fallbackSiteSettings`.
- [ ] Nastaven funkční `PUBLIC_WEB3FORMS_ACCESS_KEY` pro formulář (nebo formulář upraven).
- [ ] Prověřeny analytické eventy (stabilní ID tlačítek, žádné PII v eventech).
- [ ] Nastavena kritická cesta (`SMOKE_CRITICAL_PATH`) pro automatizovaný monitoring.
- [ ] Pokud web nepoužívá blog, validujte, že RSS zůstává validním prázdným feedem nebo je vědomě odebráno.

---

## 7. Definition of Done (Release Gate)

Před každým nasazením do produkce musí projít kompletní kontrola:

```bash
npm run typegen
npm run test:unit
npm run typecheck
CONTENT_SOURCE=fallback npm run build
npm run test:predeploy
```

Pokud web používá Sanity CMS, ověřte navíc:
```bash
CONTENT_SOURCE=sanity npm run build
npm run test:predeploy
```
