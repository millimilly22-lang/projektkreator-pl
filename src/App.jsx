import React, { useEffect, useState } from 'react';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=90',
  serviceWeb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=88',
  serviceShop: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=88',
  serviceApp: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=88',
  modea: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90',
  modeaProduct1: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=800&q=88',
  modeaProduct2: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=88',
  modeaProduct3: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=88',
  modeaProduct4: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=88',
  house: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90',
  build1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=88',
  build2: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=88',
  green: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=90',
  green2: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=88',
  green3: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=88',
  fit: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=90',
  trainer: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=90',
};

const MAIN_NAV = [
  ['/uslugi', 'Usługi'],
  ['/realizacje', 'Nasze realizacje'],
  ['/cennik', 'Cennik'],
  ['/kontakt', 'Kontakt'],
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname || '/');
  useEffect(() => {
    const handler = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  const go = (to) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return [path, go];
}

function Logo({ go }) {
  return <button className="logo" onClick={() => go('/')} aria-label="ProjektKreator.pl">
    <span className="logoMark">✦</span>
    <span><b>ProjektKreator.pl</b><small>STRONY • SKLEPY • APLIKACJE</small></span>
  </button>;
}

function Header({ path, go }) {
  const [open, setOpen] = useState(false);
  return <header className="siteHeader">
    <div className="container navWrap">
      <Logo go={go}/>
      <button className="mobileToggle" onClick={() => setOpen(v => !v)} aria-label="Menu">☰</button>
      <nav className={open ? 'mainNav open' : 'mainNav'}>
        {MAIN_NAV.map(([to,label]) => <button key={to} className={path===to?'active':''} onClick={() => {go(to);setOpen(false)}}>{label}</button>)}
      </nav>
      <button className="btn btnPrimary headerCta" onClick={() => go('/kontakt')}>Zacznij projekt</button>
    </div>
  </header>;
}

function Footer({ go }) {
  return <footer className="footer">
    <div className="container footerInner">
      <Logo go={go}/>
      <div className="footerNav">{MAIN_NAV.map(([to,label]) => <button key={to} onClick={() => go(to)}>{label}</button>)}</div>
      <span>© 2026 ProjektKreator.pl</span>
    </div>
  </footer>;
}

function Eyebrow({children}) { return <div className="eyebrow">{children}</div> }
function CTA({children,onClick,secondary=false}) { return <button className={secondary?'btn btnSecondary':'btn btnPrimary'} onClick={onClick}>{children}</button> }

const services = [
  {n:'01', title:'Strony internetowe', text:'Nowoczesne strony firmowe, landing page i portfolio, które prowadzą klienta do działania.', image:IMG.serviceWeb},
  {n:'02', title:'Sklepy online', text:'Sklepy z katalogiem produktów, płatnościami, dostawą i wygodnym panelem obsługi.', image:IMG.serviceShop},
  {n:'03', title:'Aplikacje webowe', text:'Panele klienta, systemy rezerwacji, kalkulatory i dedykowane narzędzia dla firm.', image:IMG.serviceApp},
];

const projectDefs = {
  modea: {name:'MODÉA', type:'Sklep online', accent:'#7a2f73'},
  novabud: {name:'NovaBud', type:'Firma budowlana', accent:'#0b4e8b'},
  greenlife: {name:'GreenLife', type:'Sklep kosmetyczny', accent:'#2d6b3a'},
  fitzone: {name:'FitZone', type:'Aplikacja fitness', accent:'#7b4bd4'},
};

function MiniModea() {
  return <div className="miniSite miniModea">
    <div className="miniNav"><b>MODÉA</b><span>Nowości</span><span>Kobieta</span><span>Akcesoria</span></div>
    <div className="miniHeroGrid"><div><small>NOWA KOLEKCJA</small><h4>Styl, który podkreśla Ciebie.</h4><button>Zobacz kolekcję</button></div><img src={IMG.modea} alt=""/></div>
    <div className="miniProducts"><i/><i/><i/><i/></div>
  </div>
}
function MiniNovaBud() {
  return <div className="miniSite miniBuild">
    <div className="miniNav"><b>⌂ NovaBud</b><span>O nas</span><span>Usługi</span><span>Realizacje</span></div>
    <div className="miniCover" style={{backgroundImage:`linear-gradient(90deg,rgba(7,29,51,.78),rgba(7,29,51,.12)),url(${IMG.house})`}}><h4>Budujemy<br/>Twoją przyszłość</h4><button>Zobacz realizacje</button></div>
    <div className="miniIcons"><span>⌂<b>Budowa domów</b></span><span>⚒<b>Remonty</b></span><span>▣<b>Elewacje</b></span></div>
  </div>
}
function MiniGreenLife() {
  return <div className="miniSite miniGreen">
    <div className="miniNav"><b>◉ GreenLife</b><span>Produkty</span><span>O nas</span><span>Blog</span></div>
    <div className="miniHeroGrid"><div><small>NATURALNA PIELĘGNACJA</small><h4>Naturalne piękno każdego dnia</h4><button>Zobacz produkty</button></div><img src={IMG.green} alt=""/></div>
    <div className="miniProducts green"><i/><i/><i/><i/></div>
  </div>
}
function MiniFitZone() {
  return <div className="miniSite miniFit">
    <div className="miniNav"><b>FitZone</b><span>Treningi</span><span>Plany</span><span>Statystyki</span></div>
    <div className="fitMini"><div><small>TRENUJ MĄDRZEJ</small><h4>Lepsza wersja Ciebie zaczyna się dziś.</h4><button>Rozpocznij trening</button></div><div className="dash"><b>Twój postęp</b><span>✓ 12 treningów</span><span>✓ 4 tygodnie</span><div className="chart"><i/><i/><i/><i/><i/></div></div></div>
  </div>
}
function ProjectMini({kind}) {
  if(kind==='modea') return <MiniModea/>;
  if(kind==='novabud') return <MiniNovaBud/>;
  if(kind==='greenlife') return <MiniGreenLife/>;
  return <MiniFitZone/>;
}

function Home({go}) {
  return <>
    <section className="homeHero">
      <div className="container homeHeroGrid">
        <div className="heroCopy">
          <Eyebrow>ProjektKreator.pl</Eyebrow>
          <h1>Twój pomysł.<br/>Nasza technologia.</h1>
          <p>Tworzymy nowoczesne strony, sklepy i aplikacje, które pomagają Twojej firmie rosnąć i wyglądać profesjonalnie online.</p>
          <div className="heroActions"><CTA onClick={()=>go('/kontakt')}>Zacznij projekt</CTA><CTA secondary onClick={()=>go('/realizacje')}>Zobacz realizacje</CTA></div>
        </div>
        <div className="heroImage"><img src={IMG.hero} alt="Profesjonalna kobieta pracująca przy laptopie"/></div>
      </div>
    </section>

    <section className="homeServiceStrip">
      <div className="container">
        <div className="homeServiceGrid">
          {services.map(s => <article key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}
        </div>
        <div className="statsRow"><div><b>100+</b><span>zrealizowanych projektów</span></div><div><b>98%</b><span>zadowolonych klientów</span></div><div><b>3+ lata</b><span>doświadczenia</span></div></div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="sectionTitle"><Eyebrow>Wybrane realizacje</Eyebrow><h2>Nie pokazujemy obrazków.<br/>Pokazujemy działające strony.</h2><p>Każdy projekt poniżej otwiera prawdziwe demo HTML/React.</p></div>
        <div className="projectGrid">{Object.keys(projectDefs).map(kind => <article className="projectCard" key={kind}><div className="projectPreview"><ProjectMini kind={kind}/></div><div className="projectFoot"><div><small>{projectDefs[kind].type}</small><h3>{projectDefs[kind].name}</h3></div><button onClick={()=>go('/demo/'+kind)}>Otwórz demo →</button></div></article>)}</div>
      </div>
    </section>

    <section className="whySection"><div className="container"><div className="sectionTitle compact"><Eyebrow>Dlaczego my?</Eyebrow><h2>Profesjonalny proces od początku do publikacji.</h2></div><div className="whyGrid"><article><span>♡</span><b>Nowoczesny design</b></article><article><span>◷</span><b>Szybka realizacja</b></article><article><span>♧</span><b>Wsparcie techniczne</b></article><article><span>◎</span><b>Indywidualne podejście</b></article></div></div></section>
  </>;
}

function ServicesPage({go}) {
  return <>
    <section className="pageIntro"><div className="container"><Eyebrow>Usługi</Eyebrow><h1>Nasze usługi</h1><p>Kompleksowe rozwiązania dla Twojego biznesu.</p></div></section>
    <section className="section"><div className="container"><div className="serviceImageGrid">{services.map(s=><article key={s.n}><img src={s.image} alt=""/><div><h3>{s.title}</h3><p>{s.text}</p><button onClick={()=>go('/kontakt')}>Dowiedz się więcej</button></div></article>)}</div></div></section>
    <section className="whySection"><div className="container"><h2 className="center">Dlaczego my?</h2><div className="whyGrid"><article><span>♡</span><b>Nowoczesny design</b><p>Projekt dopasowany do branży i klienta.</p></article><article><span>◷</span><b>Szybka realizacja</b><p>Przejrzysty zakres i etapy pracy.</p></article><article><span>♧</span><b>Wsparcie techniczne</b><p>Pomoc również po publikacji.</p></article><article><span>◎</span><b>Indywidualne podejście</b><p>Bez wciskania zbędnych funkcji.</p></article></div></div></section>
  </>;
}

function PortfolioPage({go}) {
  return <>
    <section className="pageIntro"><div className="container"><Eyebrow>Realizacje</Eyebrow><h1>Nasze realizacje</h1><p>Sprawdź przykłady stron i aplikacji, które stworzyliśmy jako działające demo.</p></div></section>
    <section className="section"><div className="container"><div className="portfolioGrid">{Object.keys(projectDefs).map(kind=><article className="portfolioCard" key={kind}><div className="projectPreview"><ProjectMini kind={kind}/></div><div className="portfolioLabel"><div><h3>{projectDefs[kind].name}</h3><span>{projectDefs[kind].type}</span></div><button onClick={()=>go('/demo/'+kind)}>→</button></div></article>)}</div></div></section>
  </>;
}

const packages = [
  {name:'Strona Biznes',price:'od 349 PLN',features:['Nowoczesny design','Do 5 podstron','Responsywność','Formularz kontaktowy','Wsparcie 1 miesiąc']},
  {name:'Sklep online',price:'od 499 PLN',featured:true,features:['Pełny sklep','Integracje płatności','Panel administracyjny','Łatwe zarządzanie','Wsparcie 3 miesiące']},
  {name:'Aplikacja webowa',price:'od 699 PLN',features:['Indywidualne funkcje','Panel użytkownika','Baza danych','Integracje z API','Wsparcie 3 miesiące']},
];
function PricingPage({go}) {
  return <>
    <section className="pageIntro"><div className="container"><Eyebrow>Cennik</Eyebrow><h1>Proste i przejrzyste ceny</h1><p>Wybierz pakiet dopasowany do Twoich potrzeb.</p></div></section>
    <section className="section"><div className="container"><div className="pricingGrid">{packages.map(p=><article className={p.featured?'priceCard featured':'priceCard'} key={p.name}>{p.featured&&<em>NAJCZĘŚCIEJ WYBIERANY</em>}<h3>{p.name}</h3><strong>{p.price}</strong><ul>{p.features.map(f=><li key={f}>✓ {f}</li>)}</ul><CTA onClick={()=>go('/kontakt')}>Wybieram</CTA></article>)}</div><div className="priceCta"><div><h3>Potrzebujesz indywidualnej wyceny?</h3><p>Przygotujemy ofertę dopasowaną do Twojego projektu.</p></div><CTA onClick={()=>go('/kontakt')}>Napisz do nas</CTA></div></div></section>
  </>;
}

function ContactPage() {
  const [sent,setSent]=useState(false);
  return <>
    <section className="pageIntro left"><div className="container"><Eyebrow>Kontakt</Eyebrow><h1>Porozmawiajmy o Twoim projekcie</h1><p>Opowiedz nam, czego potrzebujesz, a przygotujemy dla Ciebie najlepsze rozwiązanie.</p></div></section>
    <section className="section"><div className="container contactGrid"><form onSubmit={(e)=>{e.preventDefault();setSent(true)}}><label>Imię i nazwisko<input required/></label><label>Adres e-mail<input type="email" required/></label><label>Rodzaj projektu<select><option>Strona internetowa</option><option>Sklep online</option><option>Aplikacja webowa</option><option>Inne</option></select></label><label>Wiadomość<textarea rows="6" required/></label><button className="btn btnPrimary" type="submit">Wyślij wiadomość</button>{sent&&<p className="formOk">Dziękujemy — formularz został zapisany w wersji demonstracyjnej.</p>}</form><aside><h2>Szybki kontakt</h2><div className="contactInfo"><p><b>01</b><span>Wypełnij formularz</span></p><p><b>02</b><span>Odpowiadamy na wiadomość</span></p><p><b>03</b><span>Ustalamy zakres i wycenę</span></p><p><b>04</b><span>Zaczynamy projekt</span></p></div></aside></div></section>
  </>;
}

function DemoTop({name,go,children}) {return <><div className="demoBar"><button onClick={()=>go('/realizacje')}>← Wróć do ProjektKreator.pl</button><span>DEMO • {name}</span></div>{children}</>}

function ModeaDemo({go}) {
  const products=[['Sukienka',IMG.modeaProduct1,'149 PLN'],['Torebka',IMG.modeaProduct2,'199 PLN'],['Marynarka',IMG.modeaProduct3,'299 PLN'],['Buty',IMG.modeaProduct4,'249 PLN']];
  return <div className="demoPage modeaDemo"><DemoTop name="MODÉA" go={go}/><nav className="demoNav fashion"><b>MODÉA</b><div>Nowości</div><div>Kobieta</div><div>Akcesoria</div><div>Kontakt</div><button>♡</button></nav><section className="fashionHero"><div><small>NOWA KOLEKCJA</small><h1>Styl, który<br/>podkreśla Ciebie.</h1><p>Nowa kolekcja już dostępna.</p><button>Zobacz kolekcję</button></div><img src={IMG.modea} alt="Modelka MODÉA"/></section><section className="demoSection"><h2>Bestsellery</h2><div className="productGrid">{products.map(([n,img,p])=><article key={n}><img src={img} alt=""/><h3>{n}</h3><p>{p}</p><button>Dodaj do koszyka</button></article>)}</div></section></div>;
}
function NovaBudDemo({go}) {
  return <div className="demoPage buildDemo"><DemoTop name="NovaBud" go={go}/><nav className="demoNav build"><b>⌂ NovaBud</b><div>O nas</div><div>Usługi</div><div>Realizacje</div><div>Kontakt</div><button>Wyceń projekt</button></nav><section className="buildHero" style={{backgroundImage:`linear-gradient(90deg,rgba(4,29,52,.86),rgba(4,29,52,.16)),url(${IMG.house})`}}><div><small>SOLIDNIE • TERMINOWO • PROFESJONALNIE</small><h1>Budujemy<br/>Twoją przyszłość</h1><p>Domy, remonty i realizacje dopracowane od pierwszego szkicu po ostatni detal.</p><button>Zobacz realizacje</button></div></section><section className="demoSection"><h2>Nasze usługi</h2><div className="buildServices"><article>⌂<h3>Budowa domów</h3></article><article>⚒<h3>Remonty</h3></article><article>▣<h3>Elewacje</h3></article><article>◎<h3>Konsultacje</h3></article></div></section><section className="demoSplit"><img src={IMG.build1} alt=""/><div><small>REALIZACJE</small><h2>Od projektu do gotowego miejsca.</h2><p>Każdy etap prowadzimy jasno i przewidywalnie.</p></div></section></div>;
}
function GreenLifeDemo({go}) {
  return <div className="demoPage greenDemo"><DemoTop name="GreenLife" go={go}/><nav className="demoNav green"><b>◉ GreenLife</b><div>Produkty</div><div>O nas</div><div>Blog</div><div>Kontakt</div><button>🛒</button></nav><section className="greenHero"><div><small>NATURALNA PIELĘGNACJA</small><h1>Naturalne piękno<br/>każdego dnia</h1><p>Odkryj moc natury w naszej codziennej pielęgnacji.</p><button>Zobacz produkty</button></div><img src={IMG.green} alt="Kosmetyki GreenLife"/></section><section className="demoSection"><h2>Nasze kategorie</h2><div className="greenCategories">{[['Pielęgnacja twarzy',IMG.green2],['Pielęgnacja ciała',IMG.green3],['Naturalne olejki',IMG.green],['Zestawy prezentowe',IMG.green2]].map(([n,img])=><article key={n}><img src={img} alt=""/><h3>{n}</h3><button>Zobacz</button></article>)}</div></section></div>;
}
function FitZoneDemo({go}) {
  return <div className="demoPage fitDemo"><DemoTop name="FitZone" go={go}/><nav className="demoNav fit"><b>FitZone</b><div>Treningi</div><div>Plany</div><div>Statystyki</div><div>Profil</div><button>Zacznij trening</button></nav><section className="fitHero"><div><small>TRENUJ MĄDRZEJ</small><h1>Lepsza wersja Ciebie<br/>zaczyna się dziś.</h1><p>Trenuj mądrze. Osiągaj więcej.</p><button>Rozpocznij trening</button></div><img src={IMG.trainer} alt="Trening FitZone"/><div className="fitStats"><h3>Twój postęp</h3><p>✓ 12 treningów</p><p>✓ 4 tygodnie</p><p>✓ -3 kg</p><p>✓ 85% celu</p><div className="bigChart"><i/><i/><i/><i/><i/><i/></div></div></section><section className="demoSection dark"><h2>Plan na dziś</h2><div className="workoutGrid"><article><b>01</b><h3>Rozgrzewka</h3><span>10 min</span></article><article><b>02</b><h3>Siła</h3><span>35 min</span></article><article><b>03</b><h3>Cardio</h3><span>20 min</span></article></div></section></div>;
}

function App(){
  const [path,go]=useRoute();
  if(path.startsWith('/demo/')){
    const kind=path.split('/')[2];
    if(kind==='modea') return <ModeaDemo go={go}/>;
    if(kind==='novabud') return <NovaBudDemo go={go}/>;
    if(kind==='greenlife') return <GreenLifeDemo go={go}/>;
    if(kind==='fitzone') return <FitZoneDemo go={go}/>;
  }
  let page=<Home go={go}/>;
  if(path==='/uslugi') page=<ServicesPage go={go}/>;
  else if(path==='/realizacje') page=<PortfolioPage go={go}/>;
  else if(path==='/cennik') page=<PricingPage go={go}/>;
  else if(path==='/kontakt') page=<ContactPage/>;
  return <><Header path={path} go={go}/><main>{page}</main><Footer go={go}/></>;
}

export default App;
