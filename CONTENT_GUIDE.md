# Práce s obsahem v Sanity

Tento dokument určuje výchozí pravidla pro rozšiřování obsahové vrstvy starteru. Projektové schéma vždy přizpůsobte reálnému obsahu klienta; nevytvářejte obecný page-builder bez konkrétní potřeby.

## Modelování obsahu

- Modelujte význam obsahu, ne jeho aktuální vzhled. Preferujte `features` před `threeColumnLayout` a `callToAction` před `redButton`.
- Schémata definujte pomocí `defineType()`, pole pomocí `defineField()` a položky polí pomocí `defineArrayMember()`.
- Povinná business a routovací pole musí mít odpovídající validaci. Samotný TypeScript nenahrazuje validaci dat v CMS.
- Reference používejte pro samostatný a znovupoužitelný obsah, například autora nebo kategorii. Vnořený objekt používejte pro data patřící pouze rodičovskému dokumentu, například SEO metadata.
- Běžným dokumentům nechte `_id` vytvořit Sanity. Explicitní ID používejte jen pro řízené singletony, například `siteSettings` a `deploymentRequest`.
- Slug je veřejný technický identifikátor URL. Musí být validovaný a nesmí sloužit jako náhrada vztahů mezi dokumenty.

## Bezpečné změny schématu

Pole s produkčními daty nemažte bez migrace. Nejprve jej označte jako zastaralé a pouze pro čtení, upravte frontend s dočasným fallbackem, proveďte a ověřte migraci a teprve potom definici odstraňte.

Po každé změně schématu nebo GROQ dotazu spusťte:

```bash
npm run typegen
git diff -- schema.json sanity.types.ts
npm run typecheck
```

`schema.json` a `sanity.types.ts` jsou verzované release artefakty. Needitujte je ručně.

## GROQ a content boundary

- Produkční dotazy držte centralizované v `src/utils/queries.ts` a obalujte je pomocí `defineQuery()`.
- Projekce mají načítat jen používaná pole. Reference dereferencujte vědomě a u položek vlastních polí zachovejte `_key`.
- Routy a komponenty nemají zavádět vlastní skryté Sanity klienty ani obcházet `src/utils/content.ts`.
- Data ze Sanity i `src/data/fallback.ts` musí projít stejnými doménovými validacemi v `src/domain/`.
- Chybějící dokument je platná 404. Neplatná CMS data jsou chyba buildu a nesmí se maskovat fallbackem.

## Portable Text

Portable Text používejte pro bohatý redakční obsah, nikoli jako univerzální systém rozložení stránky.

- Každý nový vlastní blok nebo mark musí mít společně doplněné schéma, GROQ projekci, TypeGen výstup a mapování v `src/components/PortableText/PortableText.astro`.
- Interní odkazy ukládejte jako Sanity reference, nikoli jako ručně zapsané relativní URL. Dotaz musí vrátit cílový `_type` a slug.
- Externí odkazy validujte na povolené protokoly. Odkazy otevírané v novém okně musí používat bezpečné `rel` atributy.
- Interaktivní embed přidávejte jen s reálnou potřebou. Video pro produkční přehrávání ukládejte do specializované video služby; Sanity má držet embed URL nebo dedikovaný video asset.
- Při změně Portable Text modelu ověřte článek i běžnou stránku a spusťte predeploy kontrolu interních odkazů a kotev.

## Obrázky

- U redakčně ořezávaných obrázků zapněte `hotspot: true`.
- Obsahové obrázky musí mít smysluplný alternativní text; dekorativní obrázky musí být vědomě označené prázdným `alt`.
- URL generujte pouze přes `src/utils/image.ts` a renderujte přes `src/components/SanityImage.astro`.
- Požadujte skutečně potřebné rozměry, používejte responzivní `srcset` a zachovejte `width` a `height`, aby nedocházelo k posunům layoutu.
- Pokud komponenta používá LQIP nebo metadata rozměrů, musí je GROQ dotaz explicitně načíst. Nezakládejte implementaci na datech, která projekce nevrací.

## Projektová kontrola

Před předáním klientovi zkontrolujte, že schéma používá jeho terminologii, Studio neskrývá povinné informace, fallback odpovídá stejnému kontraktu a demo dokumenty ani technické názvy starteru nejsou součástí produkčního obsahu.
