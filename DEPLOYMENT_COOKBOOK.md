# Deployment cookbook

## Produkční tok

1. Editor publikuje jednotlivé dokumenty v Sanity.
2. Po dokončení série změn otevře nástroj **Nasadit web**.
3. Nástroj aktualizuje singleton `deploymentRequest`; žádný GitHub token není ve Studiu.
4. Sanity webhook odešle `repository_dispatch` s typem `sanity-update`.
5. GitHub Actions provede TypeGen drift check, unit testy, typecheck, striktní Sanity build a predeploy test.
6. Wrangler nasadí `dist/` na Cloudflare Workers.
7. Postdeploy test ověří HTML, XML a `build-info.json` aktuálního commitu.

## Sanity webhook

- Filter: `_id == "deploymentRequest" && delta::changedAny(requestedAt)`
- Method: `POST`
- URL: `https://api.github.com/repos/OWNER/REPOSITORY/dispatches`
- Projection:

```json
{
  "event_type": "sanity-update",
  "client_payload": {
    "request_id": requestId,
    "requested_at": requestedAt
  }
}
```

Autorizaci držte pouze v konfiguraci webhooku. Pro produkci preferujte GitHub App nebo jemně omezený token; nikdy jej nedávejte do veřejného Studio bundle.

## Analytika

- `none`: žádná business analytika.
- `plausible`: vyžaduje doménu a aktuální site-specific `pa-*.js` URL.
- `umami`: vyžaduje website ID.
- `ga4`: Basic Consent Mode; skript se načte až po souhlasu a odmítnutí nastaví `analytics_storage=denied`.
- DNT blokuje všechny business providery.
- Cloudflare RUM se nastavuje samostatně a nesmí být vydáváno za business konverzní analytiku.

## Smoke testy a monitoring

Predeploy kontroluje interní odkazy, assety a `srcset`, kotvy, canonical, JSON-LD, RSS, sitemapu a zabudovanou analytickou konfiguraci. Postdeploy používá retry/timeout a deployment fingerprint. Hodinový workflow kontroluje pouze homepage, jednu kritickou stránku a sitemapu.

## Rollback

Cloudflare drží historii verzí Workeru. Při vadném releasu vraťte předchozí známou dobrou verzi v Cloudflare dashboardu a následně opravte zdroj; neobcházejte release gate ručním přepisováním assetů.
