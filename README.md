# ProjektKreator.pl

Polski serwis sprzedażowy usług tworzenia stron internetowych, sklepów, aplikacji, logo, debugowania i testów QA. Produkcyjny adres projektu to **https://projektkreator.pl**.

## Co działa

- responsywna strona ProjektKreator.pl z cennikiem, formularzem projektu i formularzem kontaktowym,
- wysyłka formularzy przez istniejący backend Resend,
- trzy osobne aplikacje React + Vite w `demos/`:
  - [MODÉA — sklep internetowy](https://projektkreator.pl/portfolio/modea/),
  - [La Tavola — restauracja](https://projektkreator.pl/portfolio/latavola/),
  - [NovaBud — firma budowlana](https://projektkreator.pl/portfolio/novabud/),
- działające podglądy portfolio osadzone w głównej stronie i linki do pełnych wersji demonstracyjnych,
- lokalne fotografie, responsywny CSS i interakcje JavaScript w każdej aplikacji,
- `canonical`, Open Graph, `robots.txt`, `sitemap.xml` i dane strukturalne dla domeny ProjektKreator.pl.

## Start lokalny

```bash
npm install
npm run dev
```

`npm run dev` najpierw buduje trzy dema, a następnie uruchamia Vite oraz backend Express. Główny frontend jest dostępny zwykle pod `http://localhost:5173`.

## Build produkcyjny

```bash
npm run build
```

Skrypt buduje każdą aplikację Vite z właściwym `base` (`/portfolio/modea/`, `/portfolio/latavola/`, `/portfolio/novabud/`), kopiuje jej wynik do `public/portfolio/`, a potem buduje główny frontend. Na końcu `scripts/check-build.mjs` sprawdza canonical URLs, assety, zdjęcia, sitemapę, robots i brak starych demonstracji.

Render używa:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`

Nie zmieniaj rekordów DNS w kodzie. Po podpięciu domeny w panelu Render aplikacja korzysta z `https://projektkreator.pl` jako adresu produkcyjnego.

## Kontakt

Aktualny adres używany przez formularze: `liashany4@gmail.com`.

Przed publikacją uzupełnij pełne dane firmy, NIP, adres oraz treść dokumentów prawnych.
