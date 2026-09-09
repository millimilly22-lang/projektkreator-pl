# ProjektKreator.pl

Polski serwis sprzedażowy dla usług tworzenia stron internetowych, sklepów, aplikacji, logo, debugowania i testów QA.

## Co działa
- polska strona firmowa i responsywny layout,
- tylko 3 realizacje: **DocumentFlow**, **Informator Polska** i **FactSphere**,
- ruchome podglądy realizacji,
- cennik i usługa **Logo i identyfikacja od 249 PLN**,
- formularz projektu z orientacyjną wyceną i załącznikami,
- osobny formularz pytań,
- automatyczne numery zgłoszeń `PK-2026-001`, `PK-2026-002` itd.,
- numer klienta w kolejce,
- wiadomość o projekcie lub pytaniu wysyłana na e-mail właściciela,
- automatyczne potwierdzenie e-mail do klienta,
- odpowiedź z poczty może trafić bezpośrednio do klienta dzięki `Reply-To`,
- Regulamin, Polityka prywatności i Cookies,
- konfiguracja pod Render oraz przyszłą aplikację Android/Capacitor.

## Start lokalny

```bash
npm install
cp .env.example .env
npm run dev
```

Na Windows możesz zamiast `cp` użyć:

```bat
copy .env.example .env
```

Frontend: `http://localhost:5174`  
API: `http://localhost:5175`

## Podłączenie Gmaila

**Nie wpisuj hasła poczty do GitHub.** W pliku `.env` lokalnie albo w zmiennych środowiskowych hostingu ustaw:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=twoj@gmail.com
SMTP_PASS=HASLO_APLIKACJI_GOOGLE
SMTP_FROM="ProjektKreator.pl <twoj@gmail.com>"
OWNER_EMAIL=twoj@gmail.com
CONTACT_EMAIL=twoj@gmail.com
```

Do `SMTP_PASS` używa się **Google App Password**, nie zwykłego hasła do Gmaila.

## Jak działa kontakt

1. Klient wysyła pytanie lub formularz projektu.
2. System tworzy numer, np. `PK-2026-001`.
3. Zgłoszenie wraz z załącznikami trafia na e-mail właściciela.
4. Klient otrzymuje automatyczną wiadomość z numerem zgłoszenia i numerem w kolejce.
5. Właściciel może odpowiedzieć klientowi bezpośrednio z poczty.

## Publikacja

GitHub przechowuje kod. Backend e-mail wymaga hostingu Node, np. Render. Plik `render.yaml` jest już w repozytorium.

## Ważne przed publikacją

Uzupełnij pełne dane firmy, NIP, adres oraz sprawdź treść Regulaminu i Polityki prywatności pod kątem swojej działalności.
