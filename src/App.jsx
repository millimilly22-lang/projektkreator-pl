import React, { useEffect, useState } from 'react';
import './styles.css';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=90',
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=88',
  shop: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=88',
  app: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=88',
  modea: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90',
  modea2: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=88',
  house: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90',
  build1: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88',
  green: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=90',
  green2: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1100&q=88',
  fit: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=90',
  trainer: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=90',
};

const mainNav = [
  ['/uslugi','Usługi'],
  ['/realizacje','Nasze realizacje'],
  ['/cennik','Cennik'],
  ['/kontakt','Kontakt'],
];

function useRoute(){
  const [path,setPath] = useState(window.location.pathname || '/');
  useEffect(()=>{
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  },[]);
  const go = (to) => {
    if (window.location.pathname !== to) window.history.pushState({},'',to);
    setPath(to);
    window.scrollTo({top:0,behavior:'instant'});
  };
  return [path,go];
}

function Logo({go}){
  return <button className="logo" onClick={()=>go('/')}>
    <span className="logoIcon">⌂</span>
    <span><b>ProjektKreator.pl</b><small>STRONY • SKLEPY • APLIKACJE</small></span>
  </button>
}

function Header({path,go}){
  const [open,setOpen] = useState(false);
  return <header className="siteHeader">
    <div className="wrap headerInner">
      <Logo go={go}/>
      <button className="menuButton" onClick={()=>setOpen(v=>!v)} aria-label="Menu">☰</button>
      <nav className={open ? 'nav open' : 'nav'}>
        {mainNav.map(([to,label])=><button key={to} className={path===to?'active':''} onClick={()=>{go(to);setOpen(false)}}>{label}</button>)}
      </nav>
      <button className="btn primary headerBtn" onClick={()=>go('/kontakt')}>Zacznij projekt</button>
    </div>
  </header>
}

function Footer({go}){
  return <footer className="footer"><div className="wrap footerInner">
    <Logo go={go}/>
    <p>ProjektKreator.pl — strony internetowe, sklepy online i aplikacje webowe.</p>
    <button className="textLink" onClick={()=>go('/kontakt')}>Rozpocznij projekt →</button>
  </div></footer>
}

function Eyebrow({children}){return <div className="eyebrow">{children}</div>}
function Button({children,onClick,secondary=false}){return <button className={secondary?'btn secondary':'btn primary'} onClick={onClick}>{children}</button>}

const services = [
  {icon:'⌂',title:'Strony internetowe',text:'Nowoczesne, szybkie i responsywne strony dopasowane do Twojej marki.',image:IMG.web},
  {icon:'🛒',title:'Sklepy online',text:'Skuteczne sklepy, które pomagają sprzedawać i łatwo zarządzać ofertą.',image:IMG.shop},
  {icon:'▣',title:'Aplikacje webowe',text:'Indywidualne narzędzia, panele użytkownika i systemy dla Twojego biznesu.',image:IMG.app},
];

const projects = {
  modea:{name:'MODÉA',type:'Sklep online — moda',kind:'modea'},
  novabud:{name:'NovaBud',type:'Strona firmowa — budownictwo',kind:'novabud'},
  greenlife:{name:'GreenLife',type:'Sklep online — kosmetyki',kind:'greenlife'},
  fitzone:{name:'FitZone',type:'Aplikacja webowa — fitness',kind:'fitzone'},
};

function Home({go}){
  return <>
    <section className="heroHome">
      <div className="wrap heroGrid">
        <div className="heroText">
          <Eyebrow>ProjektKreator.pl</Eyebrow>
          <h1>Twój pomysł.<br/>Nasza technologia.</h1>
          <p>Tworzymy nowoczesne strony, sklepy i aplikacje, które pomagają Twojej firmie wyglądać profesjonalnie i zdobywać klientów online.</p>
          <div className="actions"><Button onClick={()=>go('/kontakt')}>Zacznij projekt</Button><Button secondary onClick={()=>go('/realizacje')}>Zobacz realizacje</Button></div>
        </div>
        <div className="heroVisual"><img src={IMG.hero} alt="Profesjonalna kobieta"/><div className="heroCard"><strong>Projekt od pomysłu do publikacji</strong><span>Design • React • Wdrożenie</span></div></div>
      </div>
    </section>

    <section className="homeCards"><div className="wrap">
      <div className="serviceHomeGrid">{services.map((s,i)=><article key={s.title}><span className="roundIcon">{s.icon}</span><small>0{i+1}</small><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
      <div className="stats"><div><b>100+</b><span>zrealizowanych projektów</span></div><div><b>98%</b><span>zadowolonych klientów</span></div><div><b>3+ lata</b><span>doświadczenia</span></div></div>
    </div></section>

    <section className="section"><div className="wrap">
      <div className="sectionHead split"><div><Eyebrow>Nasze realizacje</Eyebrow><h2>Strony, które pokazują<br/>jak pracujemy.</h2></div><p>Każdy projekt poniżej jest prawdziwym interfejsem React/HTML. Kliknij i otwórz demo.</p></div>
      <div className="projectGrid">{Object.keys(projects).map(k=><ProjectCard key={k} kind={k} go={go}/>)}</div>
    </div></section>

    <section className="benefits"><div className="wrap"><Eyebrow>Dlaczego warto z nami?</Eyebrow><div className="benefitGrid">
      <article><span>◇</span><b>Nowoczesny design</b><p>Czysty, profesjonalny wygląd dopasowany do branży.</p></article>
      <article><span>◷</span><b>Szybka realizacja</b><p>Jasny zakres pracy i konkretne etapy projektu.</p></article>
      <article><span>◎</span><b>Wsparcie techniczne</b><p>Pomagamy również po uruchomieniu strony.</p></article>
      <article><span>♧</span><b>Indywidualne podejście</b><p>Projektujemy pod konkretny cel biznesowy.</p></article>
    </div></div></section>

    <section className="homeCta"><div className="wrap homeCtaInner"><div><Eyebrow>Masz pomysł?</Eyebrow><h2>Zrealizujmy go razem.</h2></div><Button onClick={()=>go('/kontakt')}>Napisz do nas</Button></div></section>
  </>
}

function ServicesPage({go}){
  return <>
    <PageIntro eyebrow="Usługi" title="Nasze usługi" text="Kompleksowe rozwiązania dla Twojego biznesu."/>
    <section className="section"><div className="wrap servicePageGrid">{services.map(s=><article className="serviceImageCard" key={s.title}><img src={s.image} alt=""/><div><h3>{s.title}</h3><p>{s.text}</p><button onClick={()=>go('/kontakt')}>Dowiedz się więcej</button></div></article>)}</div></section>
    <section className="extraServices"><div className="wrap"><h2>Dodatkowe usługi</h2><div className="extrasGrid"><article><span>◉</span><div><b>Projekt graficzny</b><p>Logotypy, bannery, materiały.</p></div></article><article><span>⌕</span><div><b>Optymalizacja SEO</b><p>Większa widoczność w Google.</p></div></article><article><span>⌁</span><div><b>Integracje i automatyzacje</b><p>Połączenia z systemami.</p></div></article><article><span>⚙</span><div><b>Wsparcie i rozwój</b><p>Stała opieka techniczna.</p></div></article></div></div></section>
    <section className="softCta"><div className="wrap softCtaInner"><div><h3>Masz inne potrzeby?</h3><p>Napisz do nas — przygotujemy indywidualną ofertę.</p></div><Button onClick={()=>go('/kontakt')}>Skontaktuj się</Button></div></section>
  </>
}

function PortfolioPage({go}){
  return <>
    <PageIntro eyebrow="Realizacje" title="Nasze realizacje" text="Sprawdź przykłady stron i aplikacji, które stworzyliśmy."/>
    <section className="section"><div className="wrap portfolioGrid">{Object.keys(projects).map(k=><ProjectCard key={k} kind={k} go={go} large/>)}</div></section>
    <section className="benefits"><div className="wrap"><div className="benefitGrid"><article><span>◇</span><b>Nowoczesny design</b></article><article><span>▣</span><b>Responsywność</b></article><article><span>⌁</span><b>Szybka realizacja</b></article><article><span>☺</span><b>Zadowoleni klienci</b></article></div></div></section>
    <section className="homeCta"><div className="wrap homeCtaInner"><div><h2>Twój projekt może być następny!</h2><p>Dołącz do grona zadowolonych klientów.</p></div><Button onClick={()=>go('/kontakt')}>Zacznij projekt</Button></div></section>
  </>
}

const plans=[
  {name:'Strona Biznes',price:'od 349 PLN',items:['Nowoczesny design','Do 5 podstron','Responsywność','Formularz kontaktowy','Wsparcie 1 miesiąc']},
  {name:'Sklep online',price:'od 499 PLN',featured:true,items:['Pełny sklep','Integracje płatności','Panel administracyjny','Łatwe zarządzanie','Wsparcie 3 miesiące']},
  {name:'Aplikacja webowa',price:'od 699 PLN',items:['Indywidualne funkcje','Panel użytkownika','Baza danych','Integracje z API','Wsparcie 3 miesiące']},
];

function PricingPage({go}){
  return <>
    <PageIntro eyebrow="Cennik" title="Proste i przejrzyste ceny" text="Wybierz pakiet dopasowany do Twoich potrzeb."/>
    <section className="section"><div className="wrap priceGrid">{plans.map(p=><article className={p.featured?'priceCard featured':'priceCard'} key={p.name}>{p.featured&&<div className="badge">Najczęściej wybierany</div>}<h3>{p.name}</h3><strong>{p.price}</strong><ul>{p.items.map(i=><li key={i}>✓ {i}</li>)}</ul><Button onClick={()=>go('/kontakt')}>Wybieram</Button></article>)}</div></section>
    <section className="softCta"><div className="wrap softCtaInner"><div><h3>Potrzebujesz indywidualnej wyceny?</h3><p>Opowiedz nam o swoim pomyśle — przygotujemy ofertę dopasowaną do projektu.</p></div><Button onClick={()=>go('/kontakt')}>Napisz do nas</Button></div></section>
  </>
}

function ContactPage(){
  const [sent,setSent]=useState(false);
  return <>
    <PageIntro eyebrow="Kontakt" title="Porozmawiajmy o Twoim projekcie" text="Wypełnij formularz — odezwiemy się z konkretną propozycją kolejnych kroków."/>
    <section className="section"><div className="wrap contactGrid">
      <form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Imię i nazwisko<input required/></label><label>Adres e-mail<input required type="email"/></label><label>Rodzaj projektu<select><option>Strona internetowa</option><option>Sklep online</option><option>Aplikacja webowa</option><option>Inne</option></select></label><label>Wiadomość<textarea rows="6" required/></label><button className="btn primary" type="submit">{sent?'Wiadomość zapisana ✓':'Wyślij wiadomość'}</button></form>
      <aside className="contactAside"><div className="contactMiniGrid"><article><span>☎</span><b>Szybka odpowiedź</b></article><article><span>▣</span><b>Indywidualna wycena</b></article><article><span>☺</span><b>Profesjonalne doradztwo</b></article></div><h3>Najczęściej zadawane pytania</h3><details><summary>Jak długo trwa realizacja projektu?</summary><p>Zależy od zakresu — prostą stronę możemy przygotować szybko, większy projekt planujemy etapami.</p></details><details><summary>Czy mogę zamówić indywidualne funkcje?</summary><p>Tak. Aplikacje i systemy budujemy według potrzeb projektu.</p></details><details><summary>Czy oferujecie wsparcie po zakończeniu?</summary><p>Tak, możemy dalej rozwijać i utrzymywać projekt.</p></details></aside>
    </div></section>
  </>
}

function PageIntro({eyebrow,title,text}){return <section className="pageIntro"><div className="wrap"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>}

function ProjectCard({kind,go,large=false}){
  const p=projects[kind];
  return <article className={large?'projectCard large':'projectCard'}><div className="projectPreview"><MiniSite kind={kind}/></div><div className="projectMeta"><div><h3>{p.name}</h3><p>{p.type}</p></div><button onClick={()=>go('/demo/'+kind)}>Zobacz demo →</button></div></article>
}

function MiniSite({kind}){
  if(kind==='modea') return <div className="mini miniModea"><div className="miniNav"><b>MODÉA</b><span>Nowości</span><span>Kobieta</span><span>Akcesoria</span></div><div className="miniHero"><div><small>NOWA KOLEKCJA</small><h4>Styl, który podkreśla Ciebie.</h4><button>Zobacz kolekcję</button></div><img src={IMG.modea} alt=""/></div><div className="miniTiles"><i/><i/><i/><i/></div></div>;
  if(kind==='novabud') return <div className="mini miniNova"><div className="miniNav"><b>⌂ NovaBud</b><span>O nas</span><span>Usługi</span><span>Realizacje</span></div><div className="miniCover" style={{backgroundImage:`linear-gradient(90deg,rgba(5,34,61,.82),rgba(5,34,61,.05)),url(${IMG.house})`}}><h4>Budujemy<br/>Twoją przyszłość</h4><button>Zobacz realizacje</button></div><div className="miniBottom"><span>⌂ Budowa domów</span><span>⚒ Remonty</span><span>▣ Elewacje</span></div></div>;
  if(kind==='greenlife') return <div className="mini miniGreen"><div className="miniNav"><b>GreenLife</b><span>Produkty</span><span>O nas</span><span>Blog</span></div><div className="miniHero"><div><small>NATURALNA PIELĘGNACJA</small><h4>Naturalne piękno każdego dnia</h4><button>Zobacz produkty</button></div><img src={IMG.green} alt=""/></div><div className="miniTiles green"><i/><i/><i/><i/></div></div>;
  return <div className="mini miniFit"><div className="miniNav"><b>FitZone</b><span>Treningi</span><span>Postępy</span><span>Plan</span></div><div className="fitMini"><div><small>TRENUJ MĄDRZEJ</small><h4>Lepsza wersja Ciebie.</h4><button>Rozpocznij trening</button></div><div className="miniDash"><b>Twój postęp</b><span>12 treningów</span><span>4 tygodnie</span><span>85% celu</span><div className="bars"><i/><i/><i/><i/><i/></div></div></div></div>
}

function DemoShell({go,children,label}){return <div className="demoPage"><div className="demoTop"><button onClick={()=>go('/realizacje')}>← Wróć do ProjektKreator.pl</button><span>{label} — LIVE DEMO</span></div>{children}</div>}

function ModeaDemo({go}){return <DemoShell go={go} label="MODÉA"><div className="modeaNav"><b>MODÉA</b><div>Nowości　 Kobieta　 Mężczyzna　 Akcesoria　 Wyprzedaż</div><span>⌕　♡　▢</span></div><section className="modeaHero"><div><small>NOWA KOLEKCJA</small><h1>Styl, który<br/>podkreśla Ciebie.</h1><p>Nowa kolekcja już dostępna.</p><button>Zobacz kolekcję</button></div><img src={IMG.modea} alt="Moda"/></section><section className="demoSection"><h2>Bestsellery</h2><div className="productGrid">{['Sukienki','Torebki','Marynarki','Buty'].map((x,i)=><article key={x}><div className={'productShape p'+i}></div><h3>{x}</h3><p>od {149+i*50} PLN</p><button>Dodaj do koszyka</button></article>)}</div></section></DemoShell>}

function NovaDemo({go}){return <DemoShell go={go} label="NovaBud"><div className="novaNav"><b>⌂ NovaBud</b><div>O nas　 Usługi　 Realizacje　 Kontakt</div><button>Wyceń projekt</button></div><section className="novaHero" style={{backgroundImage:`linear-gradient(90deg,rgba(4,36,68,.9),rgba(4,36,68,.12)),url(${IMG.house})`}}><div><small>SOLIDNOŚĆ • DOŚWIADCZENIE</small><h1>Budujemy<br/>Twoją przyszłość</h1><p>Nowoczesne rozwiązania. Terminowość. Profesjonalizm.</p><button>Zobacz realizacje</button></div></section><section className="demoSection"><div className="buildServices">{['⌂ Budowa domów','⚒ Remonty','▣ Elewacje','◎ Konsultacje'].map(x=><article key={x}>{x}</article>)}</div><h2>Nasze realizacje</h2><div className="buildGallery"><img src={IMG.build1}/><img src={IMG.house}/></div></section></DemoShell>}

function GreenDemo({go}){return <DemoShell go={go} label="GreenLife"><div className="greenNav"><b>◉ GreenLife</b><div>Produkty　 O nas　 Blog　 Kontakt</div><span>⌕　♡　▢</span></div><section className="greenHero"><div><small>NATURALNA PIELĘGNACJA</small><h1>Naturalne piękno<br/>każdego dnia</h1><p>Odkryj moc natury w naszej pielęgnacji.</p><button>Zobacz produkty</button></div><img src={IMG.green} alt="Kosmetyki"/></section><section className="demoSection"><h2>Nasze kategorie</h2><div className="greenCats">{['Pielęgnacja twarzy','Pielęgnacja ciała','Naturalne olejki','Zestawy prezentowe'].map(x=><article key={x}><div></div><h3>{x}</h3><button>Zobacz</button></article>)}</div></section></DemoShell>}

function FitDemo({go}){return <DemoShell go={go} label="FitZone"><div className="fitNav"><b>FitZone</b><div>Treningi　 Postępy　 Plan　 Premium</div><span>◎　☰</span></div><section className="fitHero"><div><small>TRENUJ MĄDRZEJ</small><h1>Lepsza wersja Ciebie<br/>zaczyna się dziś.</h1><p>Trenuj mądrze. Osiągaj więcej.</p><button>Rozpocznij trening</button></div><img src={IMG.trainer} alt="Fitness"/></section><section className="fitStats"><article><b>12</b><span>Treningów</span></article><article><b>4</b><span>Tygodnie</span></article><article><b>85%</b><span>Cel</span></article></section><section className="demoSection"><h2>Twoje postępy</h2><div className="bigChart">{[20,35,28,50,45,61,73,66,82,78,92,88].map((h,i)=><i key={i} style={{height:h+'%'}}></i>)}</div></section></DemoShell>}

export default function App(){
  const [path,go] = useRoute();
  if(path.startsWith('/demo/')){
    const kind=path.split('/')[2];
    if(kind==='modea') return <ModeaDemo go={go}/>;
    if(kind==='novabud') return <NovaDemo go={go}/>;
    if(kind==='greenlife') return <GreenDemo go={go}/>;
    if(kind==='fitzone') return <FitDemo go={go}/>;
  }
  let page=<Home go={go}/>;
  if(path==='/uslugi') page=<ServicesPage go={go}/>;
  else if(path==='/realizacje') page=<PortfolioPage go={go}/>;
  else if(path==='/cennik') page=<PricingPage go={go}/>;
  else if(path==='/kontakt') page=<ContactPage/>;
  return <><Header path={path} go={go}/><main>{page}</main><Footer go={go}/></>
}
