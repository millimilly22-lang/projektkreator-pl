import { useState } from 'react';
import { DemoBar, Icon, Modal, imagePath, pln, localDate } from '../../shared/ui.jsx';
import '../../shared/base.css';
import './styles.css';

const menu = {
  Antipasti: [
    ['Burrata e pomodori', 'Kremowa burrata, pomidory, bazylia, oliwa extra vergine', 39, 'Wegetariańskie · mleko'],
    ['Bruschetta classica', 'Chrupiące pieczywo, pomidory, czosnek, świeża bazylia', 25, 'Wegańskie · gluten'],
    ['Carpaccio di manzo', 'Cienkie plastry wołowiny, rukola, parmezan, kapary', 44, 'Mleko'],
  ],
  Pasta: [
    ['Tagliatelle ai funghi', 'Świeży makaron, leśne grzyby, śmietanka, parmezan', 49, 'Wegetariańskie · gluten, mleko, jajka'],
    ['Spaghetti carbonara', 'Guanciale, żółtko, pecorino romano, czarny pieprz', 46, 'Gluten, mleko, jajka'],
    ['Ravioli ricotta e spinaci', 'Domowe ravioli, ricotta, szpinak, masło szałwiowe', 52, 'Wegetariańskie · gluten, mleko, jajka'],
    ['Linguine ai gamberi', 'Krewetki, pomidorki, czosnek, białe wino, pietruszka', 59, 'Gluten, skorupiaki'],
  ],
  Pizza: [
    ['Margherita', 'Pomidory San Marzano, fior di latte, bazylia', 36, 'Wegetariańskie · gluten, mleko'],
    ['Diavola', 'Pomidory, mozzarella, pikantne salami, peperoncino', 44, 'Pikantne · gluten, mleko'],
    ['Prosciutto e rucola', 'Prosciutto crudo, rukola, parmezan, mozzarella', 49, 'Gluten, mleko'],
    ['Quattro formaggi', 'Mozzarella, gorgonzola, taleggio, parmezan', 46, 'Wegetariańskie · gluten, mleko'],
  ],
  Dolci: [
    ['Tiramisù della casa', 'Mascarpone, espresso, biszkopty, kakao', 28, 'Gluten, mleko, jajka'],
    ['Panna cotta', 'Waniliowa panna cotta, sezonowe owoce', 26, 'Mleko'],
    ['Affogato', 'Lody waniliowe zalane gorącym espresso', 22, 'Mleko'],
  ],
};
const menuImages = { Antipasti:'interior', Pasta:'pasta', Pizza:'pizza', Dolci:'tiramisu' };
const gallery = [
  { image:'pizza', title:'Neapolitański charakter. Pizza prosto z pieca.' },
  { image:'interior', title:'Dobry stół to początek dobrego wieczoru.' },
  { image:'pasta', title:'Świeży makaron, proste składniki, pełny smak.' },
  { image:'tiramisu', title:'Na koniec — tiramisù i jeszcze chwila rozmowy.' },
];

function Reservation() {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone:'Europe/Warsaw', year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date());
  const limit = new Date(`${today}T12:00:00`); limit.setDate(limit.getDate() + 90);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const day = date ? new Date(`${date}T12:00:00`).getDay() : null;
  const closing = day === 0 ? 20 : day === 5 || day === 6 ? 23 : 22;
  const warsawTime = new Intl.DateTimeFormat('en-GB', { timeZone:'Europe/Warsaw', hour:'2-digit', minute:'2-digit', hourCycle:'h23' }).format(new Date());
  const slots = day === 1 ? [] : Array.from({ length:(closing - 13) * 2 + 1 }, (_, i) => `${String(12 + Math.floor(i / 2)).padStart(2,'0')}:${i % 2 ? '30' : '00'}`).filter(slot => date !== today || slot > warsawTime);
  function submit(e) {
    e.preventDefault(); setError('');
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (values.name.trim().length < 2) return setError('Podaj imię i nazwisko.');
    if (date < today || date > localDate(limit) || !slots.includes(time) || day === 1) return setError('Wybierz dostępny termin w ciągu najbliższych 90 dni. W poniedziałki odpoczywamy.');
    if (values.phone && !/^[+\d\s()-]{7,20}$/.test(values.phone)) return setError('Sprawdź numer telefonu lub pozostaw to pole puste.');
    setReceipt({ name:values.name.trim(), guests:values.guests, date, time, code:`LT-${date.replaceAll('-','')}-${crypto.randomUUID().slice(0,4).toUpperCase()}` });
  }
  return <section className="reservation-section" id="rezerwacja"><div className="container reservation-layout"><div className="reservation-copy"><span className="eyebrow">TWÓJ STOLIK CZEKA</span><h2>Zrób miejsce<br/>na dobry wieczór.</h2><p>Kolacja we dwoje, spotkanie z przyjaciółmi czy rodzinny obiad. Przy naszym stole każdy znajdzie swoje miejsce.</p><div className="reservation-facts"><span><Icon name="clock"/> Rezerwacje do 90 dni naprzód</span><span><Icon name="check"/> Stolik dla 1–8 osób</span><span><Icon name="pin"/> Stare Miasto, Kraków · lokalizacja przykładowa</span></div></div>
    <div className="reservation-card">{receipt ? <div className="success-panel" role="status"><Icon name="check" size={36}/><span className="eyebrow">POTWIERDZENIE DEMONSTRACYJNE</span><h3>{receipt.name}, Twój test rezerwacji jest gotowy.</h3><dl><div><dt>Termin</dt><dd>{new Intl.DateTimeFormat('pl-PL',{dateStyle:'long'}).format(new Date(`${receipt.date}T12:00:00`))}, {receipt.time}</dd></div><div><dt>Liczba osób</dt><dd>{receipt.guests}</dd></div><div><dt>Numer</dt><dd>{receipt.code}</dd></div></dl><p>To demonstracja formularza. Nie zarezerwowano prawdziwego stolika i nie wysłano wiadomości.</p><button className="button button-green" onClick={() => { setReceipt(null); setError(''); }}>Wybierz inny termin</button></div> : <form onSubmit={submit}><h3>Zarezerwuj stolik</h3><p className="form-note">Wersja demonstracyjna. Formularz pokaże podsumowanie; dane nie są wysyłane do restauracji.</p><div className="form-grid"><label>Data<input type="date" name="date" required min={today} max={localDate(limit)} value={date} onChange={e => { setDate(e.target.value); setTime(''); setError(''); }}/></label><label>Godzina<select name="time" required value={time} onChange={e => setTime(e.target.value)} disabled={!date || day === 1}><option value="">{day === 1 ? 'Poniedziałek — zamknięte' : 'Wybierz godzinę'}</option>{slots.map(t => <option key={t}>{t}</option>)}</select></label><label>Liczba osób<select name="guests" required defaultValue="2">{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób'}</option>)}</select></label><label>Imię i nazwisko<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Anna Kowalska"/></label><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="anna@email.pl"/></label><label>Telefon (opcjonalnie)<input name="phone" type="tel" autoComplete="tel" maxLength={20} placeholder="+48 …"/></label><label className="wide">Dodatkowe informacje<textarea name="message" maxLength={1000} placeholder="Krzesełko dla dziecka, szczególna okazja…"/></label></div><label className="consent"><input type="checkbox" required/>Rozumiem, że jest to rezerwacja demonstracyjna.</label>{error && <p className="form-error" role="alert">{error}</p>}{date && (!slots.length || day === 1) && <p className="form-error">Brak dostępnych godzin. Wybierz inny dzień.</p>}<button className="button button-green" type="submit" disabled={Boolean(date) && !slots.length}>Potwierdź rezerwację <Icon name="arrow"/></button><p className="form-note">Godziny podane w strefie Europe/Warsaw.</p></form>}</div>
    </div></section>;
}

export default function App() {
  const [category, setCategory] = useState('Pizza');
  const [menuOpen, setMenuOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  return <><a className="skip-link" href="#menu">Przejdź do menu</a><DemoBar name="La Tavola"/><header className="tavola-header"><a className="tavola-logo" href={import.meta.env.BASE_URL}>La Tavola<span>CUCINA ITALIANA</span></a><nav className={menuOpen ? 'nav-open' : ''} aria-label="Nawigacja główna">{[['Menu','#menu'],['Nasza historia','#historia'],['Galeria','#galeria'],['Kontakt','#kontakt']].map(([label,href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><a className="button reservation-link" href="#rezerwacja">Rezerwacja <Icon name="arrow" size={17}/></a><button className="icon-button mobile-menu-button" aria-label="Menu nawigacji" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu"/></button></header>
    <main><section className="tavola-hero"><img src={imagePath('pizza')} alt="Pizza neapolitańska wypiekana w rozgrzanym piecu" width="1600" height="1000" fetchPriority="high"/><div className="container hero-inner"><span className="eyebrow">DOBRY SMAK ZACZYNA SIĘ PRZY STOLE</span><h1>Trochę Włoch.<br/><em>Dużo serca.</em></h1><p>Świeży makaron. Pizza z pieca.<br/>Wieczory, które chce się przedłużać.</p><div className="hero-buttons"><a className="button button-cream" href="#rezerwacja">Zarezerwuj stolik <Icon name="arrow"/></a><a className="menu-link" href="#menu">Zobacz nasze menu</a></div><div className="hero-signature">Buon cibo. Buona compagnia.</div></div><div className="hero-bottom"><span>LA TAVOLA / KRAKÓW</span><a href="#historia">Poznaj naszą historię ↓</a></div></section>
    <section className="intro-strip"><span>Pasta fatta in casa</span><i>✦</i><span>Pizza napoletana</span><i>✦</i><span>La dolce vita</span></section>
    <section className="container story-section section" id="historia"><div className="story-image"><img src={imagePath('interior')} alt="Włoska kolacja przy starannie nakrytym stole" width="900" height="1100" loading="lazy"/><div className="story-stamp">A TAVOLA<br/><em>si sta bene</em></div></div><div><span className="eyebrow">NASZA HISTORIA</span><h2>Najlepsze rzeczy<br/>są <em>proste.</em></h2><p>Pomidor dojrzewający w słońcu. Oliwa, która pachnie wakacjami. Makaron, któremu dajemy czas. W La Tavola kochamy włoską kuchnię za to, że nie musi niczego udawać.</p><p>Chcemy, żebyś czuł się tu jak u przyjaciół — z dobrym jedzeniem, uważną obsługą i miejscem na jeszcze jeden deser.</p><a className="text-link" href="#menu">Poznaj smaki La Tavola <Icon name="arrow"/></a></div></section>
    <section className="menu-section section" id="menu"><div className="container"><div className="section-heading"><div><span className="eyebrow">PROSTO Z NASZEJ KUCHNI</span><h2>Menu pełne <em>charakteru.</em></h2></div><p>Włoskie klasyki. Dobre składniki.<br/>Przykładowe ceny w PLN.</p></div><div className="menu-tabs" aria-label="Kategorie menu">{Object.keys(menu).map(c => <button key={c} aria-pressed={category === c} className={c === category ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="menu-layout"><div className="menu-dishes" aria-live="polite">{menu[category].map(([name,description,price,allergens]) => <article key={name}><div className="dish-heading"><h3>{name}</h3><b>{pln(price)}</b></div><p>{description}</p><small>{allergens}</small></article>)}</div><div className="menu-photo"><img key={category} src={imagePath(menuImages[category])} alt={`Inspiracja z kategorii ${category}`} loading="lazy" width="700" height="850"/><span>FATTO CON AMORE</span></div></div><p className="menu-note">Informacje o składnikach i alergenach są przykładowe dla tej strony demonstracyjnej.</p></div></section>
    <section className="container section" id="galeria"><div className="section-heading"><div><span className="eyebrow">NASZ MAŁY KAWAŁEK WŁOCH</span><h2>Zostań na <em>chwilę.</em></h2></div><p>Kliknij zdjęcie i zajrzyj bliżej.</p></div><div className="tavola-gallery">{gallery.map(item => <button className="gallery-button" key={item.image} aria-label={`Powiększ zdjęcie: ${item.title}`} onClick={() => setPhoto(item)}><img src={imagePath(item.image)} alt={item.title} loading="lazy" width="600" height="760"/></button>)}</div></section>
    <Reservation/>
    <section className="container visit-section section" id="kontakt"><div><span className="eyebrow">WPADNIJ DO NAS</span><h2>Do zobaczenia<br/><em>przy stole.</em></h2><p>Stare Miasto, Kraków<br/><small>Przykładowa lokalizacja restauracji</small></p><a className="text-link" href="https://www.openstreetmap.org/#map=15/50.0614/19.9372" target="_blank" rel="noreferrer">Zobacz okolicę na mapie <Icon name="arrow"/></a></div><div className="opening-hours"><h3>Godziny otwarcia</h3><dl><div><dt>Poniedziałek</dt><dd>Zamknięte</dd></div><div><dt>Wtorek–czwartek</dt><dd>12:00–22:00</dd></div><div><dt>Piątek–sobota</dt><dd>12:00–23:00</dd></div><div><dt>Niedziela</dt><dd>12:00–20:00</dd></div></dl></div><div className="contact-detail"><h3>Porozmawiajmy</h3><p>ciao@latavola.example<br/>+48 000 000 000</p><small>Przykładowe dane kontaktowe.</small><p>Chcesz taką stronę dla swojej restauracji?</p><a className="text-link" href="/#/kontakt">Napisz do ProjektKreator.pl <Icon name="arrow"/></a></div></section></main>
    <footer className="site-footer tavola-footer"><div className="container"><div className="footer-grid"><div><a className="tavola-logo" href={import.meta.env.BASE_URL}>La Tavola<span>CUCINA ITALIANA</span></a><p>Przy dobrym stole zawsze jest miejsce.</p></div><div><h3>ODKRYJ</h3><a href="#menu">Menu</a><a href="#historia">Nasza historia</a><a href="#galeria">Galeria</a></div><div><h3>ZAPLANUJ WIECZÓR</h3><a href="#rezerwacja">Zarezerwuj stolik</a><a href="#kontakt">Kontakt i godziny</a><a href="/">ProjektKreator.pl</a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} La Tavola · Restauracja demonstracyjna, fikcyjne dane firmy.</p><p>Projekt i realizacja: ProjektKreator.pl</p></div></div></footer>
    {photo && <Modal title={photo.title} onClose={() => setPhoto(null)} className="lightbox"><img src={imagePath(photo.image)} alt={photo.title}/><p>{photo.title}</p></Modal>}
  </>;
}
