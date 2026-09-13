import React, {useEffect, useMemo, useState} from 'react';
import {assets} from './assets';
import './styles.css';

const nav = [
  ['services','Usługi'],
  ['portfolio','Nasze realizacje'],
  ['pricing','Cennik'],
  ['contact','Napisz do nas']
];

function Logo({go}) {
  return (
    <button className="logo" onClick={()=>go('services')} aria-label="ProjektKreator.pl">
      <span className="logoLeaf"><i/><i/></span>
      <span className="logoCopy">
        <b>ProjektKreator.pl</b>
        <small>STRONY • SKLEPY • APLIKACJE</small>
      </span>
    </button>
  );
}

function Header({page,go}) {
  const [open,setOpen]=useState(false);
  return (
    <header>
      <div className="wrap nav">
        <Logo go={go}/>
        <button className="hamb" onClick={()=>setOpen(v=>!v)} aria-label="Otwórz menu">☰</button>
        <nav className={open ? 'open' : ''}>
          {nav.map(([key,label])=>(
            <button key={key} className={page===key?'active':''} onClick={()=>{go(key);setOpen(false)}}>
              {label}
            </button>
          ))}
        </nav>
        <button className="pill headerCta" onClick={()=>go('contact')}>Rozpocznij projekt →</button>
      </div>
    </header>
  );
}

function Footer({go}) {
  return (
    <footer>
      <div className="wrap footer">
        <Logo go={go}/>
        <div className="footerNav">
          {nav.map(([key,label])=><button key={key} onClick={()=>go(key)}>{label}</button>)}
        </div>
        <div className="social">● ◎ in ▶</div>
      </div>
    </footer>
  );
}

function Hero({eyebrow,title,text,image,imageClass='',children}) {
  return (
    <section className="hero">
      <div className="wrap heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">{eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{__html:title}}/>
          <p>{text}</p>
          {children}
        </div>
        <div className={'heroImage '+imageClass}>
          <img src={image} alt=""/>
        </div>
      </div>
    </section>
  );
}

function Stats({items}) {
  return <div className="stats">
    {items.map(([icon,value,label])=>(
      <div className="stat" key={value}>
        <span>{icon}</span>
        <div><b>{value}</b><small>{label}</small></div>
      </div>
    ))}
  </div>;
}

function CTA({go,eyebrow,title,text,button='Rozpocznij projekt →'}) {
  return (
    <section className="cta">
      <div className="wrap ctaGrid">
        <div>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <button className="pill" onClick={()=>go('contact')}>{button}</button>
      </div>
    </section>
  );
}

const services = [
  ['web','service_web','Strony internetowe','Nowoczesne strony www, które budują zaufanie i przyciągają klientów. Dopasowane do Twojej branży i urządzeń mobilnych.','Już od 1 499 PLN'],
  ['web','service_shop','Sklepy online','Skuteczne sklepy internetowe, które sprzedają. Integracje z płatnościami, wysyłkami i systemami magazynowymi.','Już od 2 499 PLN'],
  ['apps','service_app','Aplikacje webowe','Dedykowane rozwiązania webowe dopasowane do Twoich procesów. Większe możliwości dla Twojego biznesu.','Już od 3 999 PLN'],
  ['support','service_debug','Debug i poprawki','Szybka pomoc w rozwiązywaniu problemów, poprawki błędów i rozwój istniejących projektów.','Już od 199 PLN'],
  ['support','service_qa','Testowanie QA','Kompleksowe testy funkcjonalne, wydajnościowe i UX. Zadbamy o to, aby wszystko działało bez zarzutu.','Już od 699 PLN'],
  ['design','service_brand','Logo i identyfikacja','Unikalna identyfikacja wizualna, która wyróżni Twoją markę. Logo, kolorystyka, materiały i spójny wizerunek.','Już od 1 199 PLN'],
  ['ai','service_ai','AI i automatyzacje','Nowoczesne technologie AI i automatyzacje, które oszczędzają czas i zwiększają efektywność Twojej firmy.','Już od 1 499 PLN']
];

const filters = [
  ['all','Wszystkie usługi'],
  ['web','Strony i sklepy'],
  ['apps','Aplikacje i systemy'],
  ['support','Wsparcie techniczne'],
  ['design','Projektowanie'],
  ['ai','Automatyzacje']
];

function Services({go}) {
  const [filter,setFilter]=useState('all');
  const visible = useMemo(()=>services.filter(s=>filter==='all'||s[0]===filter),[filter]);
  return <>
    <Hero
      eyebrow="Nasze usługi"
      title={'Usługi dopasowane<br/>do Twojego biznesu.'}
      text="Tworzymy nowoczesne rozwiązania, które wspierają rozwój Twojej marki w internecie. Od pomysłu, przez projekt, po wdrożenie i wsparcie — wszystko w jednym miejscu."
      image={assets.hero_services}
      imageClass="servicesHeroImage"
    >
      <Stats items={[
        ['▣','100+','zrealizowanych projektów'],
        ['♧','98%','zadowolonych klientów'],
        ['▢','3+ lata','doświadczenia']
      ]}/>
    </Hero>

    <div className="wrap filters">
      {filters.map(([key,label])=>(
        <button key={key} className={filter===key?'active':''} onClick={()=>setFilter(key)}>{label}</button>
      ))}
    </div>

    <section className="section servicesSection">
      <div className="wrap cards4">
        {visible.map(s=>(
          <article className="card serviceCard" key={s[2]}>
            <img src={assets[s[1]]} alt=""/>
            <div>
              <h3>{s[2]}</h3>
              <p>{s[3]}</p>
              <strong>{s[4]}</strong><span className="arrow">→</span>
            </div>
          </article>
        ))}
        <article className="card special">
          <div>
            <h2>Nie wiesz,<br/>która usługa będzie najlepsza?</h2>
            <p>Skontaktuj się z nami, a doradzimy najlepsze rozwiązanie dla Twojego biznesu.</p>
            <button className="pill" onClick={()=>go('contact')}>Napisz do nas →</button>
          </div>
        </article>
      </div>
    </section>

    <section className="section tint">
      <div className="wrap steps">
        <div><div className="eyebrow">Jak to działa?</div><h2>Od pomysłu<br/>do efektu w 4 krokach.</h2></div>
        {[
          ['01','Rozmowa i analiza','Poznajemy Twoje potrzeby i cele biznesowe.'],
          ['02','Projekt i wycena','Przygotowujemy propozycję i plan działania.'],
          ['03','Realizacja','Tworzymy, testujemy i wdrażamy rozwiązanie.'],
          ['04','Wsparcie','Zapewniamy opiekę i rozwój projektu.']
        ].map(x=>(
          <div className="step" key={x[0]}>
            <span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div>
          </div>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="wrap benefits">
        <div>
          <div className="eyebrow">Dlaczego warto?</div>
          <h2>Więcej niż tylko<br/>wykonanie projektu.</h2>
          <p>Stawiamy na jakość, partnerską współpracę i realne efekty dla Twojego biznesu.</p>
        </div>
        {[
          ['◇','Indywidualne podejście','Każdy projekt dopasowujemy do Twoich celów.'],
          ['↗','Doświadczenie i wiedza','Ponad 3 lata na rynku i setki zrealizowanych zadań.'],
          ['◈','Terminowość i rzetelność','Działamy zgodnie z ustalonym harmonogramem.'],
          ['♡','Wsparcie po wdrożeniu','Zapewniamy pomoc i rozwój.']
        ].map(x=>(
          <div className="benefit" key={x[1]}>
            <span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div>
          </div>
        ))}
      </div>
    </section>

    <CTA go={go} eyebrow="Porozmawiajmy o Twoim projekcie" title="Masz pomysł? Zmieńmy go w rzeczywistość." text="Skontaktuj się z nami i otrzymaj bezpłatną wycenę. Odpowiemy na wszystkie pytania i pomożemy dobrać najlepsze rozwiązanie."/>
  </>;
}

const demoData = {
  modea: {
    name:'MODÉA',
    type:'Sklep internetowy',
    tagline:'Styl w Twojej codzienności',
    sub:'Moda, która podkreśla Ciebie.',
    image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=88',
    accent:'#9a5a92',
    light:'#f5eef2'
  },
  novabud: {
    name:'NovaBud',
    type:'Strona firmy budowlanej',
    tagline:'Budujemy lepsze jutro',
    sub:'Nowoczesne domy. Solidne wykonanie.',
    image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=88',
    accent:'#b47d48',
    light:'#f6f0e8'
  },
  greenlife: {
    name:'GreenLife',
    type:'Sklep internetowy',
    tagline:'Naturalne piękno na co dzień',
    sub:'Kosmetyki inspirowane naturą.',
    image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1100&q=88',
    accent:'#6d8b65',
    light:'#eef4eb'
  },
  fitzone: {
    name:'FitZone',
    type:'Aplikacja webowa',
    tagline:'Lepsza wersja Ciebie zaczyna się dziś',
    sub:'Treningi, plany i postęp w jednym miejscu.',
    image:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1100&q=88',
    accent:'#4167b1',
    light:'#eef2fb'
  }
};

function DemoWebsite({id,large=false}) {
  const d=demoData[id];
  return (
    <div className={'demoWebsite '+(large?'large':'')} style={{'--demoAccent':d.accent,'--demoLight':d.light}}>
      <div className="browserBar"><span/><span/><span/><i>www.{id}.pl</i></div>
      <div className="demoNav"><b>{d.name}</b><span>Start&nbsp;&nbsp; Oferta&nbsp;&nbsp; O nas&nbsp;&nbsp; Kontakt</span></div>
      <div className="demoHero">
        <div className="demoHeroText">
          <small>{d.type}</small>
          <h4>{d.tagline}</h4>
          <p>{d.sub}</p>
          <button>Dowiedz się więcej →</button>
        </div>
        <img src={d.image} alt=""/>
      </div>
      <div className="demoTiles">
        <div><b>01</b><span>{id==='modea'?'Nowa kolekcja':id==='novabud'?'Realizacje':id==='greenlife'?'Bestsellery':'Treningi'}</span></div>
        <div><b>02</b><span>{id==='modea'?'Lookbook':id==='novabud'?'Technologia':id==='greenlife'?'Składniki':'Plany'}</span></div>
        <div><b>03</b><span>{id==='modea'?'Dla Ciebie':id==='novabud'?'Kontakt':id==='greenlife'?'Poradnik':'Postęp'}</span></div>
      </div>
      <div className="demoBottom">
        <h5>{id==='modea'?'Wybrane produkty':id==='novabud'?'Ostatnie realizacje':id==='greenlife'?'Naturalna pielęgnacja':'Twój plan treningowy'}</h5>
        <div className="demoBottomGrid"><i/><i/><i/></div>
      </div>
    </div>
  );
}

function DemoModal({id,onClose}) {
  useEffect(()=>{
    const onKey=e=>e.key==='Escape'&&onClose();
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[onClose]);
  if(!id) return null;
  const d=demoData[id];
  return (
    <div className="demoModal" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
      <div className="demoDialog">
        <div className="demoDialogHead">
          <div><small>Podgląd realizacji</small><h3>{d.name}</h3></div>
          <button onClick={onClose}>×</button>
        </div>
        <DemoWebsite id={id} large/>
      </div>
    </div>
  );
}

const projects = [
  ['modea','MODÉA','Sklep internetowy','Elegancki sklep modowy z kobiecą fotografią, kolekcjami i przejrzystą ścieżką zakupową.'],
  ['novabud','NovaBud','Strona firmy budowlanej','Profesjonalna witryna z realizacjami, ofertą i formularzem wyceny.'],
  ['greenlife','GreenLife','Sklep internetowy','Naturalna marka kosmetyczna z katalogiem produktów i poradami.'],
  ['fitzone','FitZone','Aplikacja webowa','Platforma treningowa z planami, postępem i panelem użytkownika.']
];

function Portfolio({go}) {
  const [demo,setDemo]=useState(null);
  return <>
    <div className="category wrap"><div className="eyebrow">Kategoria</div><h2>Nasze realizacje</h2></div>
    <Hero
      eyebrow="Nasze realizacje"
      title={'Zobacz projekty,<br/>które już działają.'}
      text="Realne firmy, prawdziwe efekty. Poznaj nasze realizacje i przekonaj się, jak pomagamy markom rosnąć w świecie online."
      image={assets.hero_portfolio}
      imageClass="portfolioHeroImage"
    >
      <Stats items={[
        ['▣','100+','zrealizowanych projektów'],
        ['♙','98%','zadowolonych klientów'],
        ['↗','Różne branże','od lokalnych firm po ogólnopolskie marki']
      ]}/>
    </Hero>

    <section className="section tint">
      <div className="wrap">
        <div className="eyebrow">Wyróżniona realizacja</div>
        <div className="featured">
          <div className="featuredVisual">
            <img src={assets.portfolio_featured} alt="MODÉA — pełny podgląd sklepu"/>
          </div>
          <div>
            <h2>MODÉA</h2>
            <h4>Sklep internetowy z odzieżą damską</h4>
            <p>Nowoczesny sklep internetowy, który łączy elegancki design z wygodnymi zakupami. W podglądzie widać całą kompozycję strony, kobiecą fotografię i wersję mobilną.</p>
            <div className="featurePoints">
              <div><b>◎ Cel biznesowy</b><small>Sprzedaż online i budowa rozpoznawalnej marki.</small></div>
              <div><b>⚙ Zakres prac</b><small>Projekt, sklep, płatności, wersja mobilna.</small></div>
              <div><b>↗ Efekt</b><small>Spójna strona gotowa do sprzedaży.</small></div>
            </div>
            <div className="buttonRow">
              <button className="pill" onClick={()=>setDemo('modea')}>Zobacz demo strony →</button>
              <button className="textButton" onClick={()=>go('contact')}>Zamów podobny projekt</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section projectsSection">
      <div className="wrap">
        <div className="sectionHead">
          <div><div className="eyebrow">Nasze projekty</div><h2>Różne branże. Wspólny cel — rozwój.</h2></div>
          <p>Każda karta pokazuje miniaturową, prawdziwą strukturę strony HTML — nie przypadkowe zdjęcie.</p>
        </div>
        <div className="projectGrid">
          {projects.map(([id,name,type,desc])=>(
            <article className="projectDemoCard" key={id}>
              <button className="demoClick" onClick={()=>setDemo(id)} aria-label={`Otwórz demo ${name}`}>
                <DemoWebsite id={id}/>
              </button>
              <div className="projectMeta">
                <h3>{name}</h3>
                <b>{type}</b>
                <p>{desc}</p>
                <button onClick={()=>setDemo(id)}>Zobacz pełne demo →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section tint">
      <div className="wrap">
        <div className="eyebrow">Wybrane marki</div>
        <div className="logos"><span>MODÉA</span><span>NovaBud</span><span>GreenLife</span><span>FitZone</span></div>
      </div>
    </section>

    <CTA go={go} title="Twój projekt może być następny." text="Porozmawiajmy o tym, jak możemy pomóc rozwinąć Twoją markę."/>
    <DemoModal id={demo} onClose={()=>setDemo(null)}/>
  </>;
}

const packs = [
  ['Strona Start','od 599 PLN',['Responsywny wygląd','Do 5 podstron','Formularz kontaktowy','Podstawowe SEO','Szkolenie z obsługi']],
  ['Strona Biznes','od 1 499 PLN',['Do 15 podstron','Indywidualny projekt','Formularze i integracje','Rozszerzone SEO','Wsparcie 3 miesiące']],
  ['Strona Premium','od 2 499 PLN',['Nielimitowane podstrony','Identyfikacja wizualna','Zaawansowane integracje','Pełne SEO','Wsparcie 6 miesięcy']],
  ['Sklep internetowy','od 2 499 PLN',['System płatności','Zarządzanie produktami','Integracje wysyłkowe','Szkolenie','Wsparcie 6 miesięcy']],
  ['Aplikacja webowa','od 3 999 PLN',['Indywidualna wycena','Zaawansowane funkcje','Integracje','Testy i wdrożenie','Opieka powdrożeniowa']]
];

function FAQ({items}) {
  const [open,setOpen]=useState(-1);
  return <div className="faq">
    {items.map((x,i)=>(
      <div key={x[0]}>
        <button onClick={()=>setOpen(open===i?-1:i)}>{x[0]}<span>{open===i?'−':'+'}</span></button>
        {open===i && <p>{x[1]}</p>}
      </div>
    ))}
  </div>;
}

function Pricing({go}) {
  const faq=[
    ['Czy podane ceny są cenami netto czy brutto?','Szczegóły podatkowe i końcowe rozliczenie ustalamy przed rozpoczęciem projektu.'],
    ['Co jeśli potrzebuję niestandardowych funkcji?','Przygotujemy indywidualną wycenę po analizie zakresu.'],
    ['Czy mogę rozłożyć płatność na etapy?','Tak, płatności mogą odpowiadać kolejnym etapom realizacji.'],
    ['Jak wygląda wycena indywidualna?','Zbieramy wymagania i przedstawiamy zakres, harmonogram i koszt.'],
    ['Czy zapewniacie wsparcie po projekcie?','Tak, oferujemy opiekę i dalszy rozwój.']
  ];
  return <>
    <Hero eyebrow="Cennik" title={'Przejrzysty<br/>cennik usług.'} text="Wybierz rozwiązanie dopasowane do Twoich potrzeb. Transparentne zasady, brak ukrytych kosztów i pełne wsparcie na każdym etapie współpracy." image={assets.hero_pricing} imageClass="pricingHeroImage">
      <div className="scribble">Dobre pomysły mają swoją wartość ♡</div>
    </Hero>

    <section className="section tint">
      <div className="wrap">
        <div className="sectionHead">
          <div><div className="eyebrow">Nasze pakiety</div><h2>Wybierz pakiet dla siebie.</h2></div>
          <p>Elastyczne pakiety, które możesz dopasować do swoich celów.</p>
        </div>
        <div className="pricing">
          {packs.map((p,i)=>(
            <article className={'price '+(i===2?'popular':'')} key={p[0]}>
              {i===2&&<em>NAJCZĘŚCIEJ WYBIERANY</em>}
              <h3>{p[0]}</h3>
              <div className="bigPrice">{p[1]}</div>
              <ul>{p[2].map(x=><li key={x}>✓ {x}</li>)}</ul>
              <button className="pill" onClick={()=>go('contact')}>{i===4?'Porozmawiajmy →':'Wybieram ten pakiet →'}</button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap addons">
        <div><div className="eyebrow">Dodatkowe usługi</div><h2>Rozszerz swój<br/>projekt.</h2><p>Potrzebujesz tylko wybranych elementów? Skorzystaj z usług dodatkowych.</p></div>
        {[
          ['⌁','Debug i poprawki','od 199 PLN'],
          ['⌕','Testowanie QA','od 399 PLN'],
          ['➤','Logo i identyfikacja','od 799 PLN'],
          ['◉','AI i automatyzacje','od 999 PLN']
        ].map(x=><article key={x[1]}><span>{x[0]}</span><h3>{x[1]}</h3><b>{x[2]}</b></article>)}
      </div>
    </section>

    <section className="section tint">
      <div className="wrap faqGrid">
        <div><div className="eyebrow">Najczęściej zadawane pytania</div><h2>Masz pytania<br/>o ceny?</h2><p>Zebraliśmy odpowiedzi dotyczące wycen i współpracy.</p></div>
        <FAQ items={faq}/>
        <div className="faqDecor">Wspólnie tworzymy przestrzeń dla Twoich pomysłów ♡</div>
      </div>
    </section>

    <CTA go={go} title="Nie znalazłeś odpowiedniego pakietu?" text="Opowiedz nam o swoim projekcie, a przygotujemy indywidualną wycenę dopasowaną do Twoich potrzeb." button="Napisz do nas →"/>
  </>;
}

function Contact() {
  const [sent,setSent]=useState(false);
  return <>
    <div className="category wrap"><div className="eyebrow">Kategoria</div><h2>Napisz do nas</h2></div>
    <Hero eyebrow="Kontakt z ProjektKreator.pl" title={'Porozmawiajmy<br/>o Twoim projekcie.'} text="Masz pomysł na stronę, sklep lub aplikację? Napisz do nas — chętnie poznamy Twoje potrzeby i doradzimy najlepsze rozwiązania." image={assets.hero_contact} imageClass="contactHeroImage">
      <div className="qualities"><b>☵ Szybka odpowiedź</b><b>♙ Indywidualne podejście</b><b>♡ Wspólnie do celu</b></div>
    </Hero>

    <section className="section tint">
      <div className="wrap contactIntro">
        <div><div className="eyebrow">Napisz do nas</div><h2>Opowiedz nam o swoim projekcie.</h2></div>
        <p>Wypełnij formularz. Na stronie nie publikujemy numeru telefonu, adresu ani bezpośrednich danych kontaktowych.</p>
      </div>
      <div className="wrap contact">
        <form onSubmit={e=>{e.preventDefault();setSent(true)}}>
          <h2>Wyślij nam wiadomość</h2>
          <div className="formGrid">
            <label>Imię i nazwisko *<input required placeholder="np. Anna Kowalska"/></label>
            <label>Adres e-mail *<input required type="email" placeholder="np. anna@twojafirma.pl"/></label>
            <label>Numer telefonu<input placeholder="opcjonalnie"/></label>
            <label>Rodzaj projektu *<select required defaultValue=""><option value="" disabled>Wybierz z listy</option><option>Strona internetowa</option><option>Sklep online</option><option>Aplikacja webowa</option><option>AI i automatyzacje</option><option>Inny projekt</option></select></label>
            <label className="full">Wiadomość *<textarea required maxLength="1000" placeholder="Opisz krótko swój pomysł, cele i wymagania..."/></label>
            <label className="check full"><input type="checkbox" required/> Wyrażam zgodę na przetwarzanie danych w celu odpowiedzi na wiadomość.</label>
          </div>
          <button className="pill" type="submit">Wyślij wiadomość →</button>
          {sent&&<div className="success">Dziękujemy. Formularz został przygotowany po stronie interfejsu. Po podłączeniu backendu wiadomości będą wysyłane automatycznie.</div>}
        </form>
        <aside>
          <h2>Co dzieje się po wysłaniu?</h2>
          {[
            ['✉','Potwierdzamy otrzymanie','Wiadomość trafia do obsługi projektu.'],
            ['☵','Analizujemy potrzeby','Sprawdzamy zakres i przygotowujemy pytania.'],
            ['▤','Przedstawiamy propozycję','Otrzymasz jasny plan i wycenę.'],
            ['♡','Zaczynamy działać','Po akceptacji przechodzimy do realizacji.']
          ].map(x=><div className="after" key={x[1]}><span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div></div>)}
        </aside>
      </div>
    </section>

    <section className="section">
      <div className="wrap faqGrid contactFaq">
        <div><div className="eyebrow">Najczęściej zadawane pytania</div><h2>Masz pytania?<br/>Mamy odpowiedzi.</h2></div>
        <FAQ items={[
          ['W jakim czasie odpowiadacie na wiadomości?','Najczęściej odpowiadamy w ciągu jednego dnia roboczego.'],
          ['Czy wycena projektu jest darmowa?','Tak, wstępna konsultacja i wycena mogą być bezpłatne.'],
          ['Czy mogę najpierw porozmawiać o pomyśle?','Tak, rozmowa wstępna pozwala doprecyzować kierunek projektu.'],
          ['Czy realizujecie projekty zdalnie?','Tak, cały proces może być prowadzony zdalnie.']
        ]}/>
        <img className="note" src={assets.contact_note} alt=""/>
      </div>
    </section>
  </>;
}

export default function App() {
  const valid=['services','portfolio','pricing','contact'];
  const fromHash=()=>valid.includes(location.hash.slice(1))?location.hash.slice(1):'services';
  const [page,setPage]=useState(fromHash);

  useEffect(()=>{
    const onHash=()=>setPage(fromHash());
    addEventListener('hashchange',onHash);
    return ()=>removeEventListener('hashchange',onHash);
  },[]);

  function go(name){
    if(!valid.includes(name)) return;
    history.pushState(null,'','#'+name);
    setPage(name);
    scrollTo({top:0,behavior:'smooth'});
  }

  return <>
    <Header page={page} go={go}/>
    <main>
      {page==='services'&&<Services go={go}/>}
      {page==='portfolio'&&<Portfolio go={go}/>}
      {page==='pricing'&&<Pricing go={go}/>}
      {page==='contact'&&<Contact/>}
    </main>
    <Footer go={go}/>
  </>;
}
