# ProjektKreator.pl

Polski serwis sprzedażowy dla usług tworzenia stron internetowych, sklepów, aplikacji, logo, debugowania i testów QA.

## Co działa
- polska strona firmowa i responsywny layout,
- tylko 3 realizacje: **DocumentFlow**, **Informator Polska** i **FactSphere**,
- ruchome podglądy realizacji,
- cennik i usługa **Logo i identyfikacja od 249 PLN**,
- formularz projektu z orientacyjną wyceną,
- osobny formularz pytań,
- lokalnie generowany numer zgłoszenia `PK-2026-...`,
- po zatwierdzeniu formularza otwiera się gotowa wiadomość e-mail do ProjektKreator.pl,
- klient sam naciska **Wyślij** w swojej aplikacji pocztowej,
- brak logowania, panelu admina, SMTP i automatycznego wysyłania wiadomości,
- Regulamin, Polityka prywatności i Cookies,
- konfiguracja pod Render Static Site oraz przyszłą aplikację Android/Capacitor.

## Kontakt

Aktualny adres używany przez stronę:

`liashany4@gmail.com`

## Start lokalny

```bash
npm install
npm run dev
```

Frontend: adres pokazany przez Vite, zwykle `http://localhost:5174`.

## Jak działa kontakt

1. Klient wypełnia formularz projektu albo pytania.
2. Strona tworzy lokalny numer zgłoszenia.
3. Klient widzi ekran **Wiadomość gotowa**.
4. Po kliknięciu **Otwórz e-mail** uruchamia się jego aplikacja pocztowa z gotowym odbiorcą, tematem i treścią.
5. Klient sprawdza wiadomość, ręcznie dołącza pliki jeśli są potrzebne i naciska **Wyślij**.
6. Odpowiadasz normalnie ze swojej skrzynki Gmail.

> Ważne: zwykły `mailto:` nie potrafi automatycznie dołączyć plików i strona nie może potwierdzić, że klient rzeczywiście nacisnął „Wyślij”.

## Render

Projekt nie potrzebuje już backendu ani zmiennych SMTP. Publikuj go jako **Static Site**:

- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Nie potrzebujesz `SMTP_USER`, `SMTP_PASS`, `OWNER_EMAIL` ani innych danych pocztowych na Render.

## Ważne przed publikacją

Uzupełnij pełne dane firmy, NIP, adres oraz sprawdź treść Regulaminu i Polityki prywatności pod kątem swojej działalności.
