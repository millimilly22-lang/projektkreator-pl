import React,{useMemo,useState}from'react';
import{
  ArrowRight,Check,Menu,X,Paperclip,ExternalLink,Monitor,ShoppingBag,Code2,
  Bug,ClipboardCheck,Palette,Bot,Search,FileText,Send,ShieldCheck,Heart,
  Sparkles,Headphones,Diamond,Star,Mail,Phone,MapPin,Share2,ChevronDown,
  Instagram,Linkedin,Facebook,Youtube
}from'lucide-react';
import{projects}from'./portfolio.js';
import'./editorial.css';

const serviceGroups=[
  {id:'web',label:'Strony i sklepy'},
  {id:'apps',label:'Aplikacje i systemy'},
  {id:'support',label:'Wsparcie techniczne'},
  {id:'design',label:'Projektowanie'},
  {id:'automation',label:'Automatyzacje'}
];

const services=[
  {id:'landing',group:'web',name:'Strony internetowe',orderName:'Strona internetowa',price:1499,icon:'web',
   desc:'Nowoczesne strony www, które budują zaufanie i przyciągają klientów. Dopasowane do Twojej branży i urządzeń mobilnych.',
   image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=88'},
  {id:'shop',group:'web',name:'Sklepy online',orderName:'Sklep internetowy',price:2499,icon:'shop',
   desc:'Skuteczne sklepy internetowe, które zwiększają sprzedaż, z płatnościami, wysyłkami i systemami magazynowymi.',
   image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=88'},
  {id:'webapp',group:'apps',name:'Aplikacje webowe',orderName:'Aplikacja webowa',price:3999,icon:'code',
   desc:'Dedykowane rozwiązania webowe dopasowane do Twoich procesów. Większe możliwości dla Twojego biznesu.',
   image:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=88'},
  {id:'debug',group:'support',name:'Debug i poprawki',orderName:'Debug i poprawki',price:199,icon:'bug',
   desc:'Szybka pomoc w rozwiązywaniu problemów, poprawki błędów i rozwój istniejących projektów.',
   image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=88'},
  {id:'testing',group:'support',name:'Testowanie QA',orderName:'Testowanie QA',price:699,icon:'qa',
   desc:'Kompleksowe testy funkcjonalne, wydajnościowe i UX. Zadbamy o to, aby wszystko działało bez zarzutu.',
   image:'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=88'},
  {id:'logo',group:'design',name:'Logo i identyfikacja',orderName:'Logo i identyfikacja',price:1199,icon:'palette',
   desc:'Unikalna identyfikacja wizualna, która wyróżni Twoją markę. Logo, kolorystyka, materiały i spójny wizerunek.',
   image:'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=88'},
  {id:'automation',group:'automation',name:'AI i automatyzacje',orderName:'AI i automatyzacje',price:1499,icon:'bot',
   desc:'Nowoczesne technologie AI i automatyzacje, które oszczędzają czas i zwiększają efektywność Twojej firmy.',
   image:'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=88'}
];

const packages=[
  {id:'start',name:'Strona Start',subtitle:'Idealna na dobry początek',price:599,icon:'web',
   items:['Nowoczesny, responsywny wygląd','Do 5 podstron','Formularz kontaktowy','Podstawowe SEO','Szkolenie z obsługi']},
  {id:'business',name:'Strona Biznes',subtitle:'Dla rozwijających się firm',price:1499,icon:'chart',
   items:['Do 15 podstron','Indywidualny projekt graficzny','Formularze i integracje','Rozszerzone SEO','Wsparcie przez 3 miesiące']},
  {id:'premium',name:'Strona Premium',subtitle:'Dla wymagających marek',price:2499,icon:'crown',featured:true,
   items:['Rozbudowana liczba podstron','Indywidualna identyfikacja wizualna','Zaawansowane integracje','Pełna optymalizacja SEO','Wsparcie przez 6 miesięcy','Szkolenie i dokumentacja']},
  {id:'shop',name:'Sklep internetowy',subtitle:'Sprzedawaj bez ograniczeń',price:2499,icon:'shop',
   items:['Sklep z systemem płatności','Zarządzanie produktami','Integracje z kurierami i ERP','Szkolenie z obsługi sklepu','Wsparcie przez 6 miesięcy']},
  {id:'webapp',name:'Aplikacja webowa',subtitle:'Dedykowane rozwiązania',price:3999,icon:'code',
   items:['Indywidualna wycena','Zaawansowana funkcjonalność','Integracje z systemami','Testy i wdrożenie','Opieka powdrożeniowa']}
];

const extras=[
  {name:'Debug i poprawki',price:199,icon:'bug',desc:'Szybkie rozwiązywanie problemów'},
  {name:'Testowanie QA',price:399,icon:'qa',desc:'Pewność, że wszystko działa jak należy'},
  {name:'Logo i identyfikacja',price:799,icon:'palette',desc:'Unikalna identyfikacja Twojej marki'},
  {name:'AI i automatyzacje',price:999,icon:'bot',desc:'Nowoczesne technologie dla większych możliwości'}
];

const faqPricing=[
  ['Czy podane ceny są cenami netto czy brutto?','Końcowy sposób rozliczenia i pełne warunki są potwierdzane indywidualnie przed rozpoczęciem projektu.'],
  ['Co jeśli potrzebuję niestandardowych funkcji?','Przygotujemy indywidualny zakres i wycenę dopasowaną do funkcji, których naprawdę potrzebujesz.'],
  ['Czy mogę rozłożyć płatność na raty?','Warunki płatności ustalamy przed rozpoczęciem prac, zależnie od zakresu projektu.'],
  ['Jak wygląda proces wyceny indywidualnej?','Po otrzymaniu formularza analizujemy zakres i wracamy z propozycją realizacji oraz ceną.'],
  ['Czy zapewniacie wsparcie po zakończeniu projektu?','Tak, zakres wsparcia może zostać dobrany do projektu i ustalony przed startem prac.']
];

const faqContact=[
  ['W jakim czasie odpowiadacie na wiadomości?','Odpowiadamy tak szybko, jak to możliwe. Dokładny czas odpowiedzi zależy od liczby bieżących zapytań.'],
  ['Czy wycena projektu jest darmowa?','Wstępna rozmowa i poznanie zakresu projektu nie wymagają płatności.'],
  ['Czy mogę najpierw porozmawiać o pomyśle?','Tak. Opisz pomysł w formularzu, a wrócimy z pytaniami i propozycją dalszych kroków.'],
  ['Czy realizujecie projekty zdalnie?','Tak, cały proces może być prowadzony online.'],
  ['Jakie informacje warto przygotować przed kontaktem?','Najbardziej pomagają: cel projektu, zakres funkcji, przykładowe strony, termin i orientacyjny budżet.'],
  ['Czy podpisujecie umowę?','Sposób formalizacji współpracy ustalamy przed rozpoczęciem projektu.']
];

const conceptProjects=[
  {name:'GreenLife',type:'Koncepcja sklepu internetowego',desc:'Koncepcja sklepu z naturalnymi kosmetykami.',image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85'},
  {name:'Klinika Harmonia',type:'Koncepcja strony internetowej',desc:'Koncepcja spokojnej strony dla branży zdrowia i wellness.',image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85'},
  {name:'FitZone',type:'Koncepcja aplikacji webowej',desc:'Koncepcja panelu treningowego i platformy online.',image:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85'}
];

const money=n=>`${Number(n).toLocaleString('pl-PL')} PLN`;
const projectImage=id=>id==='modea'?'/portfolio/modea/images/editorial.webp':id==='latavola'?'/portfolio/latavola/images/interior.webp':'/portfolio/novabud/images/house.webp';

async function sendRequest(body,files=[]){
  const fd=new FormData();
  Object.entries(body).forEach(([k,v])=>fd.append(k,v??''));
  files.forEach(f=>fd.append('files',f));
  const r=await fetch('/api/requests',{method:'POST',body:fd});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(data.error||'Nie udało się wysłać wiadomości.');
  return data;
}

function SIcon({type,size=20}){
  const p={size,strokeWidth:1.7};
  if(type==='shop')return <ShoppingBag {...p}/>;
  if(type==='code')return <Code2 {...p}/>;
  if(type==='bug')return <Bug {...p}/>;
  if(type==='qa')return <ClipboardCheck {...p}/>;
  if(type==='palette')return <Palette {...p}/>;
  if(type==='bot')return <Bot {...p}/>;
  if(type==='search')return <Search {...p}/>;
  if(type==='file')return <FileText {...p}/>;
  if(type==='shield')return <ShieldCheck {...p}/>;
  if(type==='diamond')return <Diamond {...p}/>;
  if(type==='headphones')return <Headphones {...p}/>;
  if(type==='star')return <Star {...p}/>;
  if(type==='heart')return <Heart {...p}/>;
  if(type==='send')return <Send {...p}/>;
  if(type==='chart')return <Sparkles {...p}/>;
  if(type==='crown')return <Diamond {...p}/>;
  return <Monitor {...p}/>;
}
function Brand(){return <span className="pkBrand"><span className="pkLeaf">❧</span><span><b>ProjektKreator.pl</b><small>STRONY · SKLEPY · APLIKACJE</small></span></span>}

export default function EditorialApp(){
  const[page,setPage]=useState(location.hash.replace('#/','')||'home');
  const[menu,setMenu]=useState(false);
  React.useEffect(()=>{
    const h=()=>setPage(location.hash.replace('#/','')||'home');
    addEventListener('hashchange',h);
    return()=>removeEventListener('hashchange',h);
  },[]);
  const go=p=>{
    location.hash=p==='home'?'':`/${p}`;
    setMenu(false);
    scrollTo({top:0,behavior:'smooth'});
  };
  let view=<Home go={go}/>;
  if(page==='uslugi')view=<Services go={go}/>;
  else if(page==='realizacje')view=<Portfolio go={go}/>;
  else if(page==='cennik')view=<Pricing go={go}/>;
  else if(page==='kontakt')view=<Contact go={go}/>;
  else if(page==='zamow')view=<Order go={go}/>;
  else if(['regulamin','polityka-prywatnosci'].includes(page))view=<Legal type={page}/>;
  return <><Header go={go} page={page} menu={menu} setMenu={setMenu}/>{view}<Footer go={go}/></>;
}

function Header({go,page,menu,setMenu}){
  return <header className="pkTop">
    <button className="pkBrandBtn" onClick={()=>go('home')}><Brand/></button>
    <nav className={menu?'open':''}>
      {[
        ['uslugi','Usługi'],['realizacje','Nasze realizacje'],['cennik','Cennik'],['kontakt','Napisz do nas']
      ].map(x=><button key={x[0]} className={page===x[0]?'active':''} onClick={()=>go(x[0])}>{x[1]}</button>)}
    </nav>
    <button className="pkPill pkDesktopCta" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight size={16}/></button>
    <button className="pkMenu" aria-label="Menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </header>;
}

function Home({go}){
  return <main>
    <section className="pkHomeHero pkFloral">
      <div className="pkHeroCopy">
        <span className="pkEyebrow">TWÓJ PARTNER W CYFROWYM ROZWOJU</span>
        <h1>Tworzymy strony,<br/>sklepy i aplikacje<br/><em>dla Twojej firmy.</em></h1>
        <p>Od pomysłu do działającego projektu. Tworzymy nowoczesne rozwiązania, które pomagają firmom wyglądać profesjonalnie i zdobywać klientów.</p>
        <div className="pkActions">
          <button className="pkPill" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight size={17}/></button>
          <button className="pkGhost" onClick={()=>go('realizacje')}>Nasze realizacje</button>
        </div>
        <div className="pkTrust"><span><Check/> Mobile</span><span><Check/> SEO podstawowe</span><span><Check/> Jasna wycena</span><span><Check/> Formularz online</span></div>
      </div>
      <HeroCollage/>
    </section>
    <section className="pkPriceStrip">
      <div><b>599 PLN</b><span>strona od</span></div><div><b>199 PLN</b><span>debug od</span></div><div><b>799 PLN</b><span>logo od</span></div><div><b>3</b><span>działające realizacje</span></div>
    </section>
    <section className="pkSection">
      <SectionHead label="NASZE USŁUGI" title="Kompleksowe rozwiązania dla Twojego biznesu." text="Łączymy kreatywność z technologią, aby tworzyć strony, sklepy i aplikacje, które naprawdę działają." action="Zobacz wszystkie usługi" onAction={()=>go('uslugi')}/>
      <ServiceGrid items={services} go={go}/>
    </section>
    <PortfolioBand go={go}/>
    <Process/>
    <SoftCta go={go}/>
  </main>;
}
function HeroCollage(){
  return <div className="pkHeroVisual">
    <img className="pkHeroPhoto" src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=88" alt="Projektowanie strony internetowej"/>
    <FloatProject cls="a" id="modea" name="MODÉA"/>
    <FloatProject cls="b" id="latavola" name="La Tavola"/>
    <FloatProject cls="c" id="novabud" name="NovaBud"/>
  </div>;
}
function FloatProject({cls,id,name}){return <div className={`pkFloat ${cls}`}><img src={projectImage(id)} alt={name}/><span>{name}</span></div>}
function SectionHead({label,title,text,action,onAction}){
  return <div className="pkSectionHead">
    <div><span className="pkEyebrow">{label}</span><h2>{title}</h2></div>
    <div className="pkSectionIntro">{text&&<p>{text}</p>}{action&&<button className="pkTextLink" onClick={onAction}>{action}<ArrowRight size={16}/></button>}</div>
  </div>;
}
function ServiceGrid({items,go}){
  return <div className="pkServiceGrid">{items.map(s=><article className="pkServiceCard" key={s.id}>
    <img src={s.image} alt={s.name} loading="lazy"/>
    <div className="pkServiceBody">
      <h3>{s.name}</h3><p>{s.desc}</p>
      <div className="pkCardFoot"><b>Już od {money(s.price)}</b><button aria-label={`Wybierz ${s.name}`} onClick={()=>{sessionStorage.setItem('service',s.id);go('zamow')}}><ArrowRight size={16}/></button></div>
    </div>
  </article>)}</div>;
}
function PortfolioBand({go}){
  return <section className="pkPortfolioBand">
    <SectionHead label="NASZE REALIZACJE" title="Projekty, które mówią same za siebie." action="Zobacz wszystkie realizacje" onAction={()=>go('realizacje')}/>
    <div className="pkPortfolioThree">{projects.map(p=><a href={p.url} target="_blank" rel="noreferrer" key={p.id} className="pkProjectTile">
      <img src={projectImage(p.id)} alt={p.name}/><div><span>{p.type}</span><h3>{p.name}</h3><b>Zobacz projekt <ExternalLink size={14}/></b></div>
    </a>)}</div>
  </section>;
}
function Process(){
  const a=[['01','Rozmowa i analiza','Poznajemy Twoje potrzeby i cele biznesowe.'],['02','Projekt i wycena','Przygotowujemy propozycję i plan działania.'],['03','Realizacja','Tworzymy, testujemy i wdrażamy rozwiązanie.'],['04','Wsparcie','Zapewniamy opiekę i rozwój projektu.']];
  return <section className="pkProcess">
    <div><span className="pkEyebrow">JAK TO DZIAŁA?</span><h2>Od pomysłu<br/>do efektu w 4 krokach.</h2></div>
    <div className="pkSteps">{a.map((x,i)=><article key={x[0]}><span className="pkStepIcon"><SIcon type={i===0?'search':i===1?'file':i===2?'send':'heart'}/></span><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
  </section>;
}
function Benefits(){
  const items=[
    ['diamond','Indywidualne podejście','Każdy projekt dopasowujemy do Twoich celów.'],
    ['star','Doświadczenie i wiedza','Łączymy projektowanie, technologię i praktyczne podejście.'],
    ['shield','Terminowość i rzetelność','Działamy zgodnie z ustalonym zakresem i harmonogramem.'],
    ['heart','Wsparcie po wdrożeniu','Nie zostawiamy Cię samego — możemy dalej rozwijać projekt.']
  ];
  return <section className="pkBenefits">
    <div className="pkBenefitsIntro"><span className="pkEyebrow">DLACZEGO WARTO?</span><h2>Więcej niż tylko<br/>wykonanie projektu.</h2><p>Stawiamy na jakość, partnerską współpracę i realne efekty dla Twojego biznesu.</p></div>
    <div className="pkBenefitGrid">{items.map(x=><article key={x[1]}><span><SIcon type={x[0]}/></span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>
  </section>;
}
function SoftCta({go,title='Masz pomysł? Zmieńmy go w rzeczywistość.',label='POROZMAWIAJMY O TWOIM PROJEKCIE'}){
  return <section className="pkSoftCta pkFloral">
    <div><span className="pkEyebrow">{label}</span><h2>{title}</h2><p>Skontaktuj się z nami i opisz swój projekt. Pomożemy dobrać najlepsze rozwiązanie.</p></div>
    <div className="pkSoftCtaAction"><button className="pkPill" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight size={16}/></button><small>Szybka odpowiedź i indywidualne podejście do Twojego biznesu.</small></div>
  </section>;
}

function StudioHero({kind}){
  if(kind==='services')return <section className="pkInteriorHero pkFloral">
    <div className="pkInteriorCopy">
      <span className="pkEyebrow">NASZE USŁUGI</span>
      <h1>Usługi dopasowane<br/>do Twojego biznesu.</h1>
      <p>Tworzymy nowoczesne rozwiązania, które wspierają rozwój Twojej marki w internecie. Od pomysłu, przez projekt, po wdrożenie i wsparcie – wszystko w jednym miejscu.</p>
      <div className="pkTruthStats"><div><SIcon type="web"/><b>7</b><span>głównych usług</span></div><div><SIcon type="qa"/><b>3</b><span>działające realizacje</span></div><div><SIcon type="star"/><b>1</b><span>spójny proces</span></div></div>
    </div>
    <div className="pkInteriorPhoto">
      <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=88" alt="Kreatywne studio"/>
      <div className="pkFramedNote">Marki,<br/>które<br/>inspirują<br/>♡</div>
      <div className="pkBookStack"><span>STRATEGIA</span><span>PROJEKT</span><span>WDROŻENIE</span><span>ROZWÓJ</span></div>
      <div className="pkHandNote">Technologia<br/>dla Twojego<br/>rozwoju ♡</div>
    </div>
  </section>;
  if(kind==='portfolio')return <section className="pkInteriorHero pkFloral">
    <div className="pkInteriorCopy">
      <span className="pkEyebrow">NASZE REALIZACJE</span>
      <h1>Zobacz projekty,<br/>które już działają.</h1>
      <p>Realne, klikalne demonstracje. Poznaj nasze realizacje i zobacz, jak może wyglądać profesjonalna obecność marki online.</p>
      <div className="pkTruthStats"><div><SIcon type="web"/><b>3</b><span>działające demo</span></div><div><SIcon type="star"/><b>3</b><span>różne branże</span></div><div><SIcon type="chart"/><b>100%</b><span>interaktywne</span></div></div>
    </div>
    <div className="pkInteriorPhoto pkPortfolioHeroImage">
      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88" alt="Studio projektowe"/>
      <div className="pkMonitorMock"><img src={projectImage('modea')} alt="Projekt MODÉA"/></div>
      <div className="pkFramedNote">Strony,<br/>które robią<br/>różnicę ♡</div>
      <div className="pkBookStack"><span>STRATEGIA</span><span>DESIGN</span><span>TECHNOLOGIA</span><span>REALNE EFEKTY</span></div>
    </div>
  </section>;
  if(kind==='pricing')return <section className="pkInteriorHero pkFloral">
    <div className="pkInteriorCopy">
      <span className="pkEyebrow">CENNIK</span>
      <h1>Przejrzysty<br/>cennik usług.</h1>
      <p>Wybierz rozwiązanie dopasowane do Twoich potrzeb. Transparentne zasady, brak ukrytych kosztów i pełne wsparcie na każdym etapie współpracy.</p>
      <div className="pkHandInline">Dobre<br/>pomysły<br/>mają swoją<br/>wartość ♡</div>
    </div>
    <div className="pkInteriorPhoto">
      <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=88" alt="Jasne biuro"/>
      <div className="pkFramedNote">Twoje cele.<br/>Nasze<br/>rozwiązania.<br/>♡</div>
      <div className="pkBookStack"><span>STRATEGIA</span><span>PROJEKT</span><span>REALIZACJA</span><span>ROZWÓJ</span></div>
    </div>
  </section>;
  return <section className="pkInteriorHero pkFloral">
    <div className="pkInteriorCopy">
      <span className="pkEyebrow">KONTAKT Z PROJEKTKREATOR.PL</span>
      <h1>Porozmawiajmy<br/>o Twoim projekcie.</h1>
      <p>Masz pomysł na stronę, sklep lub aplikację? Napisz do nas — chętnie poznamy Twoje potrzeby i doradzimy najlepsze rozwiązania.</p>
      <div className="pkContactPromises"><span><Mail/> <b>Szybka odpowiedź</b><small>Wrócimy do Ciebie tak szybko, jak to możliwe.</small></span><span><Heart/> <b>Indywidualne podejście</b><small>Uważnie słuchamy i doradzamy.</small></span><span><Sparkles/> <b>Wspólnie do celu</b><small>Twój sukces jest dla nas ważny.</small></span></div>
    </div>
    <div className="pkInteriorPhoto">
      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88" alt="Biurko do rozmowy o projekcie"/>
      <div className="pkFramedNote">Dobre pomysły<br/>zaczynają się<br/>od rozmowy ♡</div>
      <div className="pkBookStack"><span>POMYSŁ</span><span>PLAN</span><span>REALIZACJA</span><span>ROZWÓJ</span></div>
    </div>
  </section>;
}

function Services({go}){
  const[filter,setFilter]=useState('all');
  const visible=filter==='all'?services:services.filter(s=>s.group===filter);
  return <main>
    <StudioHero kind="services"/>
    <section className="pkServiceContent">
      <div className="pkFilterRow">
        <button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>Wszystkie usługi</button>
        {serviceGroups.map(g=><button key={g.id} className={filter===g.id?'active':''} onClick={()=>setFilter(g.id)}>{g.label}</button>)}
      </div>
      <div className="pkServiceScreenshotGrid">
        {visible.map(s=><article className="pkShotServiceCard" key={s.id}>
          <img src={s.image} alt={s.name}/>
          <div><h2>{s.name}</h2><p>{s.desc}</p><footer><b>Już od {money(s.price)}</b><button onClick={()=>{sessionStorage.setItem('service',s.id);go('zamow')}} aria-label={`Wybierz ${s.name}`}><ArrowRight/></button></footer></div>
        </article>)}
        {filter==='all'&&<article className="pkServiceCtaCard pkFloral">
          <h2>Nie wiesz,<br/>która usługa będzie<br/>najlepsza?</h2>
          <p>Skontaktuj się z nami, a pomożemy dobrać rozwiązanie do Twojego biznesu.</p>
          <button className="pkPill" onClick={()=>go('kontakt')}>Napisz do nas <ArrowRight size={16}/></button>
        </article>}
      </div>
    </section>
    <Process/>
    <Benefits/>
    <SoftCta go={go}/>
  </main>;
}

function Portfolio({go}){
  const modea=projects.find(p=>p.id==='modea');
  return <main>
    <StudioHero kind="portfolio"/>
    <section className="pkFeaturedCase">
      <span className="pkEyebrow">WYRÓŻNIONA REALIZACJA</span>
      <div className="pkFeaturedCaseGrid">
        <a className="pkFeaturedVisual" href={modea.url} target="_blank" rel="noreferrer">
          <img src={projectImage('modea')} alt="MODÉA"/>
          <div className="pkPhoneMock"><img src={projectImage('modea')} alt="MODÉA mobile"/></div>
        </a>
        <div className="pkFeaturedCopy">
          <h2>MODÉA</h2><h3>Sklep internetowy z odzieżą damską</h3>
          <p>Nowoczesny sklep demonstracyjny, który łączy elegancki design z wygodnym przeglądaniem oferty. Projekt pokazuje kierunek wizualny, strukturę sklepu i sposób prezentacji produktów.</p>
          <div className="pkFeaturedFacts">
            <article><Search/><b>Cel projektu</b><span>Pokazać nowoczesny kierunek sklepu online.</span></article>
            <article><Palette/><b>Zakres prac</b><span>Projekt, układ, prezentacja produktów i interakcje.</span></article>
            <article><Monitor/><b>Efekt</b><span>Działające demo dostępne do otwarcia i testowania.</span></article>
          </div>
          <a className="pkPill" href={modea.url} target="_blank" rel="noreferrer">Zobacz całą realizację <ExternalLink size={15}/></a>
        </div>
      </div>
    </section>
    <section className="pkProjectSection">
      <div className="pkSectionHead">
        <div><span className="pkEyebrow">NASZE PROJEKTY</span><h2>Różne branże. Wspólny cel – rozwój.</h2></div>
        <div className="pkSectionIntro"><p>Trzy pierwsze projekty to działające demo. Dodatkowe karty poniżej są wyraźnie oznaczone jako koncepcje.</p></div>
      </div>
      <div className="pkProjectFive">
        {projects.map(p=><article key={p.id}><a href={p.url} target="_blank" rel="noreferrer"><img src={projectImage(p.id)} alt={p.name}/></a><h3>{p.name}</h3><b>{p.type}</b><p>{p.desc}</p><a href={p.url} target="_blank" rel="noreferrer">Zobacz projekt <ArrowRight size={15}/></a></article>)}
        {conceptProjects.slice(0,2).map(p=><article key={p.name} className="concept"><img src={p.image} alt={p.name}/><span className="pkConceptBadge">KONCEPCJA</span><h3>{p.name}</h3><b>{p.type}</b><p>{p.desc}</p><span className="pkMutedLink">Demo w przygotowaniu</span></article>)}
      </div>
      <div className="pkTrustBand"><span>MODÉA</span><span>La Tavola</span><span>NovaBud</span><span>KONCEPCJE: GreenLife</span><span>Klinika Harmonia</span><div><b>3</b><small>działające projekty demo</small></div></div>
    </section>
    <section className="pkTestimonialsPlaceholder">
      <div><span className="pkEyebrow">CO MÓWIĄ KLIENCI</span><h2>Zaufanie<br/>budujemy realnymi<br/>opiniami.</h2></div>
      <div className="pkPlaceholderReviews">
        {[1,2,3].map(n=><article key={n}><b>„</b><p>Miejsce na zweryfikowaną opinię klienta.</p><small>Opinia zostanie dodana po otrzymaniu prawdziwej rekomendacji.</small></article>)}
      </div>
    </section>
    <SoftCta go={go} label="TWÓJ PROJEKT MOŻE BYĆ NASTĘPNY" title="Twój projekt może być następny."/>
  </main>;
}

function Pricing({go}){
  return <main>
    <StudioHero kind="pricing"/>
    <section className="pkFourBenefits">
      <article><Diamond/><b>Uczciwe ceny</b><span>Bez ukrytych kosztów</span></article>
      <article><FileText/><b>Jasne warunki</b><span>Przejrzyste zasady współpracy</span></article>
      <article><Headphones/><b>Wsparcie ekspertów</b><span>Na każdym etapie projektu</span></article>
      <article><Star/><b>Najwyższa jakość</b><span>Rozwiązania dopasowane do potrzeb</span></article>
    </section>
    <section className="pkPricingSection">
      <div className="pkPricingLead"><span className="pkEyebrow">NASZE PAKIETY</span><h2>Wybierz pakiet dla siebie.</h2><p>Każdy projekt jest inny, dlatego pakiety są punktem wyjścia. Dokładny zakres i końcowa cena są potwierdzane przed rozpoczęciem prac.</p></div>
      <div className="pkPricingGrid">
        {packages.map(p=><article key={p.id} className={p.featured?'featured':''}>
          {p.featured&&<div className="pkRibbon">NAJCZĘŚCIEJ WYBIERANY</div>}
          <div className="pkPriceIcon"><SIcon type={p.icon}/></div><h3>{p.name}</h3><small>{p.subtitle}</small><strong><span>od</span> {money(p.price)}</strong>
          <ul>{p.items.map(i=><li key={i}><Check/>{i}</li>)}</ul>
          <button className="pkPill" onClick={()=>{sessionStorage.setItem('package',p.id);go('zamow')}}>{p.id==='webapp'?'Porozmawiajmy':'Wybieram ten pakiet'} <ArrowRight size={14}/></button>
        </article>)}
      </div>
    </section>
    <section className="pkExtrasSection">
      <div><span className="pkEyebrow">DODATKOWE USŁUGI</span><h2>Rozszerz swój<br/>projekt.</h2><p>Potrzebujesz tylko wybranych elementów? Dobierz dodatkową usługę.</p></div>
      <div className="pkExtrasGrid">{extras.map(e=><article key={e.name}><SIcon type={e.icon}/><h3>{e.name}</h3><p>{e.desc}</p><b>od {money(e.price)}</b><button className="pkTextLink" onClick={()=>go('zamow')}>Zobacz szczegóły <ArrowRight size={14}/></button></article>)}</div>
    </section>
    <FaqSection title="Masz pytania o ceny?" items={faqPricing}/>
    <section className="pkWideCta pkFloral">
      <div><h2>Nie znalazłeś odpowiedniego pakietu?</h2><p>Opowiedz nam o swoim projekcie, a przygotujemy indywidualną wycenę dopasowaną do Twoich potrzeb.</p></div>
      <button className="pkPill" onClick={()=>go('kontakt')}>Napisz do nas <ArrowRight size={15}/></button>
      <div className="pkDeskNote">Wielkie rzeczy<br/>zaczynają się<br/>od rozmowy ♡</div>
    </section>
  </main>;
}
function FaqSection({title,items}){
  const[open,setOpen]=useState(null);
  return <section className="pkFaq">
    <div><span className="pkEyebrow">NAJCZĘŚCIEJ ZADAWANE PYTANIA</span><h2>{title}</h2><p>Zebraliśmy odpowiedzi na najczęstsze pytania dotyczące współpracy.</p></div>
    <div className="pkAccordion">{items.map((x,i)=><article key={x[0]} className={open===i?'open':''}>
      <button onClick={()=>setOpen(open===i?null:i)}><span>{x[0]}</span><ChevronDown/></button>{open===i&&<p>{x[1]}</p>}
    </article>)}</div>
    <div className="pkFaqDecor">Wspólnie<br/>tworzymy przestrzeń<br/>dla Twoich pomysłów ♡</div>
  </section>;
}

function Contact({go}){
  const[f,setF]=useState({name:'',email:'',phone:'',type:'',message:'',privacy:false});
  const[busy,setBusy]=useState(false),[err,setErr]=useState(''),[ok,setOk]=useState(false);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  async function submit(e){
    e.preventDefault();
    if(!f.name||!f.email||!f.type||!f.message)return setErr('Uzupełnij wymagane pola.');
    if(!f.privacy)return setErr('Zaakceptuj Politykę prywatności.');
    setBusy(true);setErr('');
    try{await sendRequest({kind:'question',name:f.name,email:f.email,phone:f.phone,service:f.type,message:f.message});setOk(true)}
    catch(error){setErr(error.message)}
    finally{setBusy(false)}
  }
  return <main>
    <StudioHero kind="contact"/>
    <section className="pkContactMain">
      <aside className="pkContactCards">
        <h2>Nasze dane kontaktowe</h2>
        <article><Mail/><div><b>E-mail</b><span>Dane kontaktowe dodamy przed publikacją.</span></div></article>
        <article><Phone/><div><b>Telefon</b><span>Numer telefonu dodamy przed publikacją.</span></div></article>
        <article><MapPin/><div><b>Siedziba</b><span>Adres firmy dodamy przed publikacją.</span></div></article>
        <article><Share2/><div><b>Social media</b><span>Profile dodamy, gdy będą gotowe.</span><div className="pkSocialMuted"><Facebook/><Instagram/><Linkedin/><Youtube/></div></div></article>
      </aside>
      <section className="pkMessagePanel">
        <h2>Wyślij nam wiadomość</h2>
        {ok?<div className="pkSuccessInline"><Check/><h3>Wiadomość została wysłana.</h3><p>Wrócimy z odpowiedzią tak szybko, jak to możliwe.</p></div>:<form onSubmit={submit}>
          <div className="pkFields">
            <label>Imię i nazwisko *<input value={f.name} onChange={e=>set('name',e.target.value)} placeholder="np. Anna Kowalska"/></label>
            <label>Adres e-mail *<input type="email" value={f.email} onChange={e=>set('email',e.target.value)} placeholder="np. anna@twojafirma.pl"/></label>
            <label>Numer telefonu<input value={f.phone} onChange={e=>set('phone',e.target.value)} placeholder="opcjonalnie"/></label>
            <label>Rodzaj projektu *<select value={f.type} onChange={e=>set('type',e.target.value)}><option value="">Wybierz z listy</option>{services.map(s=><option key={s.id}>{s.name}</option>)}</select></label>
            <label className="wide">Wiadomość *<textarea value={f.message} onChange={e=>set('message',e.target.value)} placeholder="Opisz krótko swój pomysł, cele i ewentualne wymagania..."/></label>
          </div>
          <label className="pkPrivacy"><input type="checkbox" checked={f.privacy} onChange={e=>set('privacy',e.target.checked)}/> Wyrażam zgodę na przetwarzanie danych w celu odpowiedzi na wiadomość.</label>
          {err&&<p className="pkError">{err}</p>}
          <button className="pkPill" disabled={busy}>{busy?'Wysyłanie…':'Wyślij wiadomość'} <ArrowRight size={15}/></button>
        </form>}
      </section>
      <aside className="pkAfterSend">
        <h2>Co dzieje się po wysłaniu wiadomości?</h2>
        <article><Mail/><div><b>Potwierdzamy otrzymanie</b><span>Wiadomość trafia bezpośrednio do systemu ProjektKreator.pl.</span></div></article>
        <article><Search/><div><b>Analizujemy Twoje potrzeby</b><span>Zadajemy dodatkowe pytania i porządkujemy zakres.</span></div></article>
        <article><FileText/><div><b>Przedstawiamy propozycję</b><span>Otrzymujesz jasny kierunek dalszych kroków.</span></div></article>
        <article><Heart/><div><b>Zaczynamy działać</b><span>Po akceptacji warunków przechodzimy do realizacji.</span></div></article>
        <div className="pkHandNoteStatic">Dobry<br/>kontakt<br/>to podstawa ♡</div>
      </aside>
    </section>
    <section className="pkContactFaq">
      <div><span className="pkEyebrow">NAJCZĘŚCIEJ ZADAWANE PYTANIA</span><h2>Masz pytania?<br/>Mamy odpowiedzi.</h2><p>Jeśli nie znajdziesz tu odpowiedzi — napisz do nas.</p></div>
      <FaqAccordion items={faqContact}/>
      <div className="pkContactPhotoNote"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=86" alt="Notatnik i kwiaty"/><span>Dobre<br/>projekty<br/>tworzą<br/>lepsi ludzie ♡</span></div>
    </section>
    <section className="pkWideCta pkFloral"><div><span className="pkEyebrow">GOTOWY NA KOLEJNY KROK?</span><h2>Zacznijmy tworzyć coś wyjątkowego.</h2><p>Niezależnie od tego, czy masz gotowy pomysł, czy dopiero szukasz inspiracji — napisz do nas.</p></div><button className="pkPill" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight size={15}/></button></section>
  </main>;
}
function FaqAccordion({items}){
  const[open,setOpen]=useState(null);
  return <div className="pkAccordion">{items.map((x,i)=><article key={x[0]} className={open===i?'open':''}><button onClick={()=>setOpen(open===i?null:i)}><span>{x[0]}</span><b>{open===i?'−':'+'}</b></button>{open===i&&<p>{x[1]}</p>}</article>)}</div>;
}

function Order({go}){
  const packageId=sessionStorage.getItem('package');
  const serviceId=sessionStorage.getItem('service');
  const selectedPackage=packages.find(x=>x.id===packageId);
  const selectedService=services.find(x=>x.id===serviceId);
  const defaultName=selectedPackage?.name||selectedService?.orderName||'Strona internetowa';
  const defaultPrice=selectedPackage?.price||selectedService?.price||1499;
  const[f,setF]=useState({service:defaultName,business:'',industry:'',website:'',style:'Nowoczesny',message:'',name:'',email:'',phone:'',privacy:false});
  const[files,setFiles]=useState([]),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[receipt,setReceipt]=useState(false);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const allOptions=[...packages,...services];
  const currentOption=allOptions.find(x=>(x.orderName||x.name)===f.service);
  const currentPrice=currentOption?.price||defaultPrice;
  async function submit(e){
    e.preventDefault();
    if(!f.name||!f.email||!f.message)return setErr('Podaj imię, e-mail i opis projektu.');
    if(!f.privacy)return setErr('Zaakceptuj Politykę prywatności.');
    setBusy(true);setErr('');
    try{await sendRequest({kind:'project',name:f.name,email:f.email,phone:f.phone,service:f.service,price:`od ${money(currentPrice)}`,businessName:f.business,industry:f.industry,website:f.website,style:f.style,message:f.message},files);setReceipt(true)}
    catch(error){setErr(error.message)}
    finally{setBusy(false)}
  }
  if(receipt)return <main><section className="pkSuccess"><div>✓</div><span className="pkEyebrow">PROJEKT WYSŁANY</span><h1>Dziękujemy.</h1><p>Otrzymaliśmy opis projektu. Wrócimy z odpowiedzią i kolejnymi krokami.</p><button className="pkPill" onClick={()=>go('home')}>Strona główna</button></section></main>;
  return <main>
    <section className="pkOrderHead pkFloral"><span className="pkEyebrow">ROZPOCZNIJ PROJEKT</span><h1>Opowiedz nam o swoim pomyśle.</h1><p>Formularz jest prawdziwy — po wysłaniu wiadomość trafia do backendu ProjektKreator.pl.</p></section>
    <section className="pkOrderWrap">
      <form className="pkOrderForm" onSubmit={submit}>
        <div className="pkPanel"><h2>1. Wybierz usługę</h2><div className="pkChoiceGrid">{allOptions.map(x=><button key={x.id+x.name} type="button" className={f.service===(x.orderName||x.name)?'sel':''} onClick={()=>set('service',x.orderName||x.name)}><SIcon type={x.icon}/><b>{x.name}</b><small>od {money(x.price)}</small></button>)}</div></div>
        <div className="pkPanel"><h2>2. Opisz projekt</h2><div className="pkFields"><label>Nazwa firmy / projektu<input value={f.business} onChange={e=>set('business',e.target.value)}/></label><label>Branża<input value={f.industry} onChange={e=>set('industry',e.target.value)}/></label><label>Obecna strona<input value={f.website} onChange={e=>set('website',e.target.value)} placeholder="opcjonalnie"/></label><label>Styl<select value={f.style} onChange={e=>set('style',e.target.value)}><option>Nowoczesny</option><option>Minimalistyczny</option><option>Premium</option><option>Editorial</option><option>Profesjonalny</option></select></label><label className="wide">Co ma powstać?<textarea value={f.message} onChange={e=>set('message',e.target.value)} placeholder="Opisz cel, funkcje i efekt, którego oczekujesz."/></label></div></div>
        <div className="pkPanel"><h2>3. Dodaj pliki</h2><label className="pkUpload"><Paperclip/><b>Dodaj logo, zdjęcia, PDF lub screenshoty</b><small>Do 5 plików, maks. 8 MB każdy.</small><input type="file" multiple onChange={e=>setFiles([...e.target.files].slice(0,5))}/></label>{files.length>0&&<div className="pkFiles">{files.map(f=><span key={f.name}>{f.name}</span>)}</div>}</div>
        <div className="pkPanel"><h2>4. Dane do odpowiedzi</h2><div className="pkFields"><label>Imię i nazwisko *<input value={f.name} onChange={e=>set('name',e.target.value)}/></label><label>E-mail *<input type="email" value={f.email} onChange={e=>set('email',e.target.value)}/></label><label>Telefon<input value={f.phone} onChange={e=>set('phone',e.target.value)}/></label></div><label className="pkPrivacy"><input type="checkbox" checked={f.privacy} onChange={e=>set('privacy',e.target.checked)}/> Akceptuję Politykę prywatności.</label>{err&&<p className="pkError">{err}</p>}<button className="pkPill" disabled={busy}>{busy?'Wysyłanie…':'Wyślij projekt'} <ArrowRight size={15}/></button></div>
      </form>
      <aside className="pkSummary"><span className="pkEyebrow">PODSUMOWANIE</span><h2>{f.service}</h2><p>Wybrany punkt startowy projektu.</p><strong>od {money(currentPrice)}</strong><small>Końcowa cena zależy od rzeczywistego zakresu i jest potwierdzana przed rozpoczęciem prac.</small></aside>
    </section>
  </main>;
}

function Legal({type}){
  const privacy=type==='polityka-prywatnosci';
  return <main><section className="pkLegal"><span className="pkEyebrow">PROJEKTKREATOR.PL</span><h1>{privacy?'Polityka prywatności':'Regulamin'}</h1><p>Treść prawna pozostaje częścią strony i powinna zostać uzupełniona oraz zweryfikowana przed publikacją komercyjną.</p><h2>{privacy?'Dane z formularzy':'Zasady współpracy'}</h2><p>{privacy?'Formularze wykorzystują podane dane wyłącznie w celu obsługi zapytania i realizacji kontaktu.':'Zakres, cena i termin projektu są potwierdzane przed rozpoczęciem realizacji.'}</p></section></main>;
}

function Footer({go}){
  return <footer className="pkFooter">
    <button className="pkBrandBtn" onClick={()=>go('home')}><Brand/></button>
    <nav><button onClick={()=>go('uslugi')}>Usługi</button><button onClick={()=>go('realizacje')}>Nasze realizacje</button><button onClick={()=>go('cennik')}>Cennik</button><button onClick={()=>go('kontakt')}>Napisz do nas</button></nav>
    <div className="pkFooterSocial"><Facebook/><Instagram/><Linkedin/><Youtube/></div>
    <div className="pkFooterLegal"><button onClick={()=>go('polityka-prywatnosci')}>Polityka prywatności</button><button onClick={()=>go('regulamin')}>Regulamin</button></div>
    <small>© 2026 ProjektKreator.pl · Dane kontaktowe i profile społecznościowe uzupełnimy przed publikacją.</small>
  </footer>;
}
