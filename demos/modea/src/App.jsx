import { useEffect, useRef, useState } from 'react';
import { DemoBar, Icon, Modal, imagePath, pln } from '../../shared/ui.jsx';
import { categories, products } from './products.js';
import '../../shared/base.css';
import './styles.css';

const cartKey = 'projektkreator.modea.cart.v1';
function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(cartKey) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.filter(item => products.some(p => p.id === item.id && p.sizes.includes(item.size)) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99);
  } catch { return []; }
}

function ProductCard({ product, onView, onAdd }) {
  const [size, setSize] = useState(product.sizes.includes('M') ? 'M' : product.sizes[0]);
  return <article className="product-card">
    <button className="product-photo" onClick={() => onView(product)} aria-label={`Szybki podgląd: ${product.name}`}>
      <img src={imagePath(product.image)} alt={product.name} loading="lazy" width="600" height="750" />
      {product.badge && <span className="product-badge">{product.badge}</span>}<span className="quick-label">Szybki podgląd</span>
    </button>
    <div className="product-meta"><div><span>{product.category}</span><h3><button onClick={() => onView(product)}>{product.name}</button></h3></div><b>{pln(product.price)}</b></div>
    <div className="product-buy"><select aria-label={`Rozmiar: ${product.name}`} value={size} onChange={e => setSize(e.target.value)}>{product.sizes.map(s => <option key={s}>{s}</option>)}</select><button onClick={() => onAdd(product, size)}>Do koszyka <Icon name="bag" size={16} /></button></div>
  </article>;
}

function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(product.sizes.includes('M') ? 'M' : product.sizes[0]);
  return <Modal title={product.name} onClose={onClose}><div className="quick-view">
    <img src={imagePath(product.image)} alt={product.name} width="600" height="750" />
    <div><span className="eyebrow">MODÉA · {product.category}</span><h2>{product.name}</h2><p className="product-price">{pln(product.price)}</p><p>{product.description}</p><p className="material">{product.material}</p><fieldset className="size-picker"><legend>Wybierz rozmiar</legend>{product.sizes.map(s => <button type="button" key={s} aria-pressed={size === s} className={size === s ? 'selected' : ''} onClick={() => setSize(s)}>{s}</button>)}</fieldset><button className="button button-dark full-width" onClick={() => { onAdd(product, size); onClose(); }}>Dodaj do koszyka <Icon name="bag" /></button><p className="form-note">Dostawa od 14,99 zł · bezpłatna od 399 zł.<br/>Katalog demonstracyjny. Produkty nie są dostępne w sprzedaży.</p></div>
  </div></Modal>;
}

function Cart({ items, onClose, onChange, onRemove }) {
  const [summary, setSummary] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0);
  const delivery = subtotal >= 399 || !items.length ? 0 : 14.99;
  return <Modal title="Twój koszyk" onClose={onClose} className="cart-modal"><span className="eyebrow">MODÉA</span><h2>Twój koszyk</h2>
    {!items.length ? <div className="empty-cart"><Icon name="bag" size={48}/><h3>Tu zaczyna się Twoja stylizacja.</h3><p>Dodaj coś z naszej kolekcji.</p><button className="button button-dark" onClick={onClose}>Wróć do zakupów</button></div> : <>
      <div className="cart-items">{items.map(item => { const p = products.find(p => p.id === item.id); return <div className="cart-item" key={`${item.id}:${item.size}`}><img src={imagePath(p.image)} alt={p.name} width="80" height="100"/><div><h3>{p.name}</h3><p>Rozmiar: {item.size}</p><div className="quantity"><button aria-label={`Zmniejsz ilość ${p.name}`} disabled={item.quantity === 1} onClick={() => { setSummary(false); onChange(item, -1); }}>−</button><span aria-label="Ilość">{item.quantity}</span><button aria-label={`Zwiększ ilość ${p.name}`} disabled={item.quantity === 99} onClick={() => { setSummary(false); onChange(item, 1); }}>+</button></div></div><div className="cart-item-end"><b>{pln(p.price * item.quantity)}</b><button onClick={() => { setSummary(false); onRemove(item); }} aria-label={`Usuń ${p.name}`}>Usuń</button></div></div>; })}</div>
      <div className="cart-totals"><p>Produkty <b>{pln(subtotal)}</b></p><p>Dostawa <b>{delivery ? '14,99 zł' : 'Bezpłatna'}</b></p><p className="grand-total">Razem <b>{new Intl.NumberFormat('pl-PL', { style:'currency', currency:'PLN' }).format(subtotal + delivery)}</b></p></div>
      {summary ? <div className="success-panel" role="status"><h3>Podsumowanie gotowe</h3><p>Możesz dalej zmieniać produkty i ilości. To sklep demonstracyjny — zamówienie nie zostało złożone i nie pobieramy płatności.</p></div> : <button className="button button-dark full-width" onClick={() => setSummary(true)}>Zobacz podsumowanie <Icon name="arrow"/></button>}
      <button className="text-button" onClick={onClose}>Kontynuuj zakupy</button>
    </>}
  </Modal>;
}

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return <section className="newsletter container" id="newsletter"><div><span className="eyebrow">LISTY OD MODÉA</span><h2>Dobry styl.<br/>Prosto do Twojej skrzynki.</h2><p>Nowe kolekcje, inspiracje i rzeczy, które warto poznać.</p></div><div>{subscribed ? <div className="success-panel" role="status"><Icon name="check"/><h3>Dziękujemy za przetestowanie zapisu!</h3><p>To demonstracja newslettera. Adres nie został wysłany ani dodany do listy mailingowej.</p></div> : <form onSubmit={e => { e.preventDefault(); if (e.currentTarget.reportValidity()) setSubscribed(true); }}><label htmlFor="newsletter-email">Twój adres e-mail</label><div className="newsletter-input"><input id="newsletter-email" type="email" autoComplete="email" placeholder="twoj@email.pl" required maxLength={254}/><button type="submit" aria-label="Zapisz się do newslettera"><Icon name="arrow"/></button></div><p className="form-note">Zapis pokazuje działanie formularza w wersji demonstracyjnej.</p></form>}</div></section>;
}

export default function App() {
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [quick, setQuick] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Wszystko');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState('all');
  const [toast, setToast] = useState('');
  const toastTimer = useRef();
  useEffect(() => { try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* Cart remains usable without storage. */ } }, [cart]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  function add(product, size) {
    setCart(current => { const found = current.find(i => i.id === product.id && i.size === size); return found ? current.map(i => i === found ? { ...i, quantity:Math.min(99, i.quantity + 1) } : i) : [...current, { id:product.id, size, quantity:1 }]; });
    setToast(`${product.name} · ${size} — dodano do koszyka`);
    clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(''), 4500);
  }
  function chooseCategory(value) { setCategory(value); document.getElementById('kolekcja')?.scrollIntoView(); setMenuOpen(false); }
  const filtered = products.filter(p => (category === 'Wszystko' || p.category === category) && `${p.name} ${p.category}`.toLocaleLowerCase('pl').includes(query.trim().toLocaleLowerCase('pl')) && (maxPrice === 'all' || p.price <= Number(maxPrice)));
  const sorted = [...filtered].sort((a,b) => sort === 'asc' ? a.price - b.price : sort === 'desc' ? b.price - a.price : 0);
  const count = cart.reduce((sum,i) => sum + i.quantity, 0);
  return <><a className="skip-link" href="#kolekcja">Przejdź do kolekcji</a><DemoBar name="MODÉA"/><div className="shipping-bar">Małe wybory. Dobry styl. <span>Darmowa dostawa od 399 zł</span></div>
    <header className="modea-header"><a className="wordmark" href={import.meta.env.BASE_URL}>MODÉA<span>EVERYDAY, REDEFINED.</span></a><nav className={menuOpen ? 'nav-open' : ''} aria-label="Nawigacja główna"><a href="#kolekcja" onClick={() => chooseCategory('Wszystko')}>Nowości</a><a href="#kolekcje" onClick={() => setMenuOpen(false)}>Kolekcje</a><a href="#o-marce" onClick={() => setMenuOpen(false)}>O marce</a><a href="#dostawa" onClick={() => setMenuOpen(false)}>Dostawa i zwroty</a></nav><div className="header-actions"><button className="icon-button" aria-label="Szukaj produktów" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); document.getElementById('kolekcja')?.scrollIntoView(); }}><Icon name="search"/></button><button className="icon-button cart-trigger" aria-label={`Otwórz koszyk, produktów: ${count}`} onClick={() => setCartOpen(true)}><Icon name="bag"/><span>{count}</span></button><button className="icon-button mobile-menu-button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu"/></button></div></header>
    <main><section className="modea-hero"><div className="hero-copy"><span className="eyebrow">NOWA PERSPEKTYWA · KOLEKCJA 01</span><h1>Mniej znaczy<br/><em>więcej Ciebie.</em></h1><p>Rzeczy, do których wracasz.<br/>Styl, który zostaje z Tobą.</p><a className="button button-dark" href="#kolekcja">Odkryj kolekcję <Icon name="arrow"/></a><div className="hero-index"><span>01 / 03</span><span>Twoja codzienność. Twój rytm.</span></div></div><div className="hero-photo"><img src={imagePath('editorial')} alt="Stylizacja z kolekcji MODÉA na mieście" fetchPriority="high" width="900" height="1100"/><span className="photo-caption">THE EVERYDAY EDIT</span></div><span className="hero-side-label">KOMFORT JEST ZAWSZE W MODZIE</span></section>
    <section className="modea-benefits container"><span><Icon name="bag"/> Starannie wybrana kolekcja</span><span><Icon name="check"/> Wygodne zakupy online</span><span><Icon name="arrow"/> Dostawa na terenie Polski</span></section>
    <section className="container section" id="kolekcja"><div className="section-heading"><div><span className="eyebrow">WYBRANE DLA CIEBIE</span><h2>Twoje nowe ulubione.</h2></div><span className="collection-count">KOLEKCJA / 6 ELEMENTÓW</span></div>
      <div className={`catalog-tools ${searchOpen ? 'search-open' : ''}`}><label className="catalog-search"><Icon name="search" size={19}/><input type="search" aria-label="Szukaj w kolekcji" placeholder="Szukaj w kolekcji…" value={query} onChange={e => setQuery(e.target.value)}/></label><label><span className="sr-only">Maksymalna cena</span><select aria-label="Maksymalna cena" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}><option value="all">Wszystkie ceny</option><option value="200">Do 200 zł</option><option value="300">Do 300 zł</option></select></label><label><span className="sr-only">Sortowanie produktów</span><select aria-label="Sortowanie produktów" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Polecane</option><option value="asc">Cena: rosnąco</option><option value="desc">Cena: malejąco</option></select></label></div>
      <div className="category-tabs" aria-label="Kategorie produktów">{categories.map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><p className="results-count" role="status">Znaleziono: {sorted.length}</p>
      {sorted.length ? <div className="product-grid">{sorted.map(product => <ProductCard key={product.id} product={product} onView={setQuick} onAdd={add}/>)}</div> : <div className="no-results"><h3>Nie znaleźliśmy takich produktów.</h3><p>Wypróbuj inną nazwę lub zmień filtry.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('Wszystko'); setMaxPrice('all'); }}>Wyczyść filtry</button></div>}
    </section>
    <section className="collection-story" id="kolekcje"><img src={imagePath('collection')} alt="Inspiracje modowe i wspólne odkrywanie nowej kolekcji" loading="lazy" width="1100" height="900"/><div><span className="eyebrow">THE CITY EDIT</span><h2>W swoim tempie.<br/>Na własnych zasadach.</h2><p>Warstwy, które lubią się ze sobą. Dodatki, które robią różnicę. Zbuduj garderobę na swoje dni.</p><button className="button button-dark" onClick={() => chooseCategory('Dodatki')}>Zobacz dodatki <Icon name="arrow"/></button></div></section>
    <section className="brand-story container section" id="o-marce"><span className="eyebrow">POZNAJ MODÉA</span><h2>Nie kolejny trend.<br/>Twoja codzienna pewność.</h2><p>Wierzymy w proste formy, dobre proporcje i ubrania, w których czujesz się sobą. Nasza selekcja łączy codzienną wygodę z wyrazistym stylem.</p></section>
    <section className="delivery-section container" id="dostawa"><div><h3>Dostawa bez komplikacji</h3><p>Przykładowe warunki: kurier lub paczkomat 14,99 zł, bezpłatna dostawa od 399 zł. Wysyłka w ciągu 1–2 dni roboczych.</p></div><div><h3>Przestrzeń na decyzję</h3><p>Przykładowa polityka sklepu: 30 dni na zwrot nieużywanych produktów. Informacje prezentują sposób działania sklepu demonstracyjnego.</p></div><div><h3>Jesteśmy blisko</h3><p>Masz pomysł na własny sklep? <a href="/#/kontakt">Porozmawiaj z ProjektKreator.pl</a> o swojej kolekcji i potrzebnych funkcjach.</p></div></section>
    <Newsletter/></main>
    <footer className="site-footer modea-footer"><div className="container"><div className="footer-grid"><div><a className="footer-logo" href={import.meta.env.BASE_URL}>MODÉA</a><p>Twój styl. Każdego dnia.</p></div><div><h3>ODKRYWAJ</h3><a href="#kolekcja">Nowa kolekcja</a><a href="#kolekcje">The City Edit</a><a href="#o-marce">O MODÉA</a></div><div><h3>POMOC</h3><a href="#dostawa">Dostawa i zwroty</a><button className="footer-cart" onClick={() => setCartOpen(true)}>Twój koszyk</button><a href="/#/kontakt">Kontakt z twórcą strony</a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} MODÉA · Marka demonstracyjna. Przykładowe produkty i ceny.</p><a href="/">ProjektKreator.pl</a></div></div></footer>
    {toast && <div className="cart-toast" role="status"><Icon name="check"/><span>{toast}</span><button onClick={() => { setToast(''); setCartOpen(true); }}>Koszyk</button></div>}
    {quick && <QuickView key={quick.id} product={quick} onClose={() => setQuick(null)} onAdd={add}/>}
    {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onChange={(item,delta) => setCart(list => list.map(i => i.id === item.id && i.size === item.size ? { ...i, quantity:Math.max(1,Math.min(99,i.quantity + delta)) } : i))} onRemove={item => setCart(list => list.filter(i => i.id !== item.id || i.size !== item.size))}/>}
  </>;
}
