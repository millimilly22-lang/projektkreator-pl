import React,{useMemo,useState}from'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,Mail,Check,Menu,X,ExternalLink,Paperclip}from'lucide-react';
import'./styles.css';

const CONTACT_EMAIL='liashany4@gmail.com';
const services=[
{id:'landing',name:'Strona Start',price:599,icon:'🌐',desc:'Nowoczesna strona one-page dla firmy.'},
{id:'business',name:'Strona Biznes',price:899,icon:'💻',desc:'Kompletna strona firmowa do 5 podstron.'},
{id:'pro',name:'Strona Pro',price:1299,icon:'✨',desc:'Rozbudowana strona z mocniejszą prezentacją marki.'},
{id:'shop',name:'Sklep internetowy',price:1799,icon:'🛍️',desc:'Produkty, koszyk i przygotowanie pod płatności.'},
{id:'webapp',name:'Aplikacja webowa',price:1999,icon:'⚙️',desc:'Panel, portal, dashboard lub narzędzie online.'},
{id:'debug',name:'Debug i poprawki',price:149,icon:'🐞',desc:'Naprawa błędów i niedziałających elementów.'},
{id:'testing',name:'Testowanie QA',price:199,icon:'🧪',desc:'Testy funkcjonalne, mobile i UX.'},
{id:'logo',name:'Logo i identyfikacja',price:249,icon:'🎨',desc:'Koncepcja logo i podstawowa identyfikacja marki.'},
{id:'automation',name:'AI i automatyzacje',price:499,icon:'🤖',desc:'Integracje, formularze AI i automatyczne procesy.'}
];
const extras=[['booking','System rezerwacji',200],['language','Dodatkowy język',150],['whatsapp','WhatsApp / szybki kontakt',50],['blog','Blog / aktualności',150],['ai','Funkcja AI',350],['copy','Pomoc z treścią',250],['analytics','Analityka + Search Console',120],['payments','Płatności online',250]];
const projects=[
{name:'DocumentFlow',type:'Dokumenty i finanse firmy',url:'/portfolio/dokumentflow.html',desc:'Panel do dokumentów, faktur, paragonów, wydatków i danych biznesowych.'},
{name:'Informator Polska',type:'Polski portal informacyjny',url:'/portfolio/informator-polska.html',desc:'Poradniki o świadczeniach, firmie, ZUS, podatkach i dokumentach.'},
{name:'FactSphere',type:'Fakty i wiedza',url:'/portfolio/factsphere.html',desc:'Interaktywna strona z faktami, kategoriami i wyszukiwarką.'}
];
const money=n=>`${Number(n).toLocaleString('pl-PL')} PLN`;

async function sendRequest(body,files=[]){
  const fd=new FormData();
  Object.entries(body).forEach(([k,v])=>fd.append(k,v??''));
  files.forEach(file=>fd.append('files',file));
  const response=await fetch('/api/requests',{method:'POST',body:fd});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||'Nie udało się wysłać wiadomości.');
  return data;
}

function App(){
  const[page,setPage]=useState(location.hash.replace('#/','')||'home');
  const[menu,setMenu]=useState(false);
  React.useEffect(()=>{const h=()=>setPage(location.hash.replace('#/','')||'home');addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[]);
  const go=p=>{location.hash=p==='home'?'':`/${p}`;setMenu(false);scrollTo(0,0)};
  return <><header><button className="logo" onClick={()=>go('home')}><img src="/projektkreator-logo.webp" alt="ProjektKreator.pl"/></button><nav className={menu?'open':''}><button onClick={()=>go('uslugi')}>Usługi</button><button onClick={()=>go('realizacje')}>Nasze realizacje</button><button onClick={()=>go('cennik')}>Cennik</button><button onClick={()=>go('kontakt')}>Napisz do nas</button></nav><button className="ctaTop" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight size={16}/></button><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>{page==='home'?<Home go={go}/>:page==='uslugi'?<Services go={go}/>:page==='realizacje'?<Portfolio/>:page==='cennik'?<Pricing go={go}/>:page==='zamow'?<Order go={go}/>:page==='kontakt'?<Contact go={go}/>:<Legal type={page}/>}<Footer go={go}/></>
}

function Home({go}){return <main><section className="hero"><div><span className="pill">STRONY • SKLEPY • APLIKACJE • LOGO • QA</span><h1>Tworzymy strony, sklepy i aplikacje <em>dla Twojej firmy.</em></h1><p>Od pomysłu do działającego projektu. Wypełniasz formularz, klikasz „Wyślij”, a wiadomość trafia bezpośrednio do ProjektKreator.pl bez otwierania programu pocztowego.</p><div className="buttons"><button className="primary" onClick={()=>go('zamow')}>Rozpocznij projekt <ArrowRight/></button><button onClick={()=>go('realizacje')}>Nasze realizacje</button></div><div className="checks"><span><Check/> Mobile</span><span><Check/> SEO podstawowe</span><span><Check/> Jasna wycena</span><span><Check/> Formularz online</span></div></div><div className="heroLogo"><img src="/projektkreator-logo.webp"/><b>✨ Projekt dopasowany do marki</b><b>✉️ Wiadomość wysyłana ze strony</b></div></section><section className="stats"><div><b>599 PLN</b><span>strona od</span></div><div><b>149 PLN</b><span>debug od</span></div><div><b>249 PLN</b><span>logo od</span></div><div><b>3</b><span>realne realizacje</span></div></section><section className="section"><Title k="USŁUGI" h="Wybierz to, czego potrzebujesz." p="Możemy zbudować projekt od zera albo poprawić to, co już masz."/><Cards go={go}/></section><section className="section dark"><Title k="NASZE REALIZACJE" h="Prawdziwe strony, które możesz otworzyć." p="Tylko DocumentFlow, Informator Polska i FactSphere."/><Moving/></section><section className="section"><Title k="JAK TO DZIAŁA" h="Prosto i bez zakładania konta."/><div className="steps">{[['01','Wybierasz usługę','Opisujesz, czego potrzebujesz.'],['02','Wypełniasz formularz','Dodajesz kontakt i opcjonalne pliki.'],['03','Klikasz Wyślij','Wiadomość trafia bezpośrednio do nas.'],['04','Odpowiadamy','Potwierdzamy zakres, cenę i termin e-mailem.']].map(x=><article key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section></main>}
const Title=({k,h,p})=><div className="title"><span>{k}</span><h2>{h}</h2>{p&&<p>{p}</p>}</div>;
function Cards({go}){return <div className="cards">{services.map(s=><article key={s.id}><i>{s.icon}</i><h3>{s.name}</h3><p>{s.desc}</p><strong>od {money(s.price)}</strong><button onClick={()=>{sessionStorage.setItem('service',s.id);go('zamow')}}>Wybierz</button></article>)}</div>}
function Services({go}){return <main><section className="pageHead"><span>USŁUGI</span><h1>Projekt od zera albo konkretna poprawka.</h1><p>Strony, sklepy, aplikacje, logo, testy QA, debugowanie i automatyzacje.</p></section><section className="section"><Cards go={go}/></section></main>}
function Moving(){return <div className="rail"><div className="track">{[...projects,...projects].map((p,i)=><a href={p.url} target="_blank" rel="noreferrer" key={i}><div className="browser">••• <span>{p.name}</span></div><iframe src={p.url} title={p.name}/><div className="overlay"><span>{p.type}</span><h3>{p.name}</h3><p>{p.desc}</p><ExternalLink/></div></a>)}</div></div>}
function Portfolio(){return <main className="darkPage"><section className="pageHead"><span>NASZE REALIZACJE</span><h1>Otwórz działające projekty.</h1><p>Podglądy poruszają się i są celowo szersze niż ekran.</p></section><section className="section"><Moving/><div className="portfolioList">{projects.map(p=><a href={p.url} target="_blank" rel="noreferrer" key={p.name}><iframe src={p.url} title={p.name}/><div><span>{p.type}</span><h3>{p.name}</h3><p>{p.desc}</p><b>Zobacz projekt <ExternalLink size={15}/></b></div></a>)}</div></section></main>}
function Pricing({go}){return <main><section className="pageHead"><span>CENNIK</span><h1>Jasne ceny startowe.</h1><p>Ostateczną cenę potwierdzimy e-mailem przed rozpoczęciem.</p></section><section className="section"><div className="priceList">{services.map(s=><div key={s.id}><span>{s.name}</span><b>od {money(s.price)}</b><button onClick={()=>{sessionStorage.setItem('service',s.id);go('zamow')}}>Wybierz</button></div>)}</div><div className="note"><b>Na etapie formularza nic nie płacisz.</b><span>Najpierw potwierdzamy zakres, termin i cenę.</span></div></section></main>}

function Order({go}){
  const initial=sessionStorage.getItem('service')||'business';
  const[service,setService]=useState(initial),[selected,setSelected]=useState([]),[f,setF]=useState({businessName:'',industry:'',website:'',style:'Nowoczesny',color:'Granat + biel',message:'',name:'',email:'',phone:'',privacy:false}),[files,setFiles]=useState([]),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[receipt,setReceipt]=useState(null);
  const s=services.find(x=>x.id===service)||services[1];
  const total=useMemo(()=>s.price+extras.filter(x=>selected.includes(x[0])).reduce((a,x)=>a+x[2],0),[s,selected]);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  async function submit(e){
    e.preventDefault();
    if(!f.name||!f.email||!f.message)return setErr('Podaj imię, e-mail i opis projektu.');
    if(!f.privacy)return setErr('Zaakceptuj Politykę prywatności.');
    setBusy(true);setErr('');
    try{
      const result=await sendRequest({kind:'project',name:f.name,email:f.email,phone:f.phone,service:s.name,price:`od ${money(total)}`,businessName:f.businessName,industry:f.industry,website:f.website,style:f.style,color:f.color,extras:extras.filter(x=>selected.includes(x[0])).map(x=>x[1]).join(', '),message:f.message},files);
      setReceipt(result);
    }catch(error){setErr(error.message)}finally{setBusy(false)}
  }
  if(receipt)return <Success data={receipt} kind="project" go={go}/>;
  return <main><section className="pageHead"><span>ROZPOCZNIJ PROJEKT</span><h1>Powiedz nam, czego potrzebujesz.</h1><p>Po kliknięciu „Wyślij projekt” wiadomość zostanie wysłana bezpośrednio ze strony.</p></section><section className="section"><form className="order" onSubmit={submit}><div className="formPanels"><div className="panel"><h2>1. Wybierz usługę</h2><div className="choices">{services.map(x=><button key={x.id} type="button" className={service===x.id?'sel':''} onClick={()=>setService(x.id)}><i>{x.icon}</i><b>{x.name}</b><small>od {money(x.price)}</small></button>)}</div></div><div className="panel"><h2>2. Opisz projekt</h2><div className="fields"><Field l="Nazwa firmy / projektu" v={f.businessName} set={v=>set('businessName',v)}/><Field l="Branża" v={f.industry} set={v=>set('industry',v)}/><Field l="Obecna strona (opcjonalnie)" v={f.website} set={v=>set('website',v)} wide/><label>Styl<select value={f.style} onChange={e=>set('style',e.target.value)}><option>Nowoczesny</option><option>Minimalistyczny</option><option>Premium</option><option>Kolorowy</option><option>Profesjonalny</option></select></label><label>Kolory<select value={f.color} onChange={e=>set('color',e.target.value)}><option>Granat + biel</option><option>Fiolet + biel</option><option>Czerń + złoto</option><option>Jasne naturalne</option><option>Mam własne kolory</option></select></label><label className="wide">Co ma powstać?<textarea value={f.message} onChange={e=>set('message',e.target.value)} placeholder="Opisz cel, funkcje i efekt, którego oczekujesz."/></label></div></div><div className="panel"><h2>3. Dodatki</h2><div className="extra">{extras.map(x=><label key={x[0]} className={selected.includes(x[0])?'sel':''}><input type="checkbox" checked={selected.includes(x[0])} onChange={e=>setSelected(a=>e.target.checked?[...a,x[0]]:a.filter(i=>i!==x[0]))}/><span>{x[1]}</span><b>+{money(x[2])}</b></label>)}</div></div><div className="panel"><h2>4. Pliki</h2><label className="upload"><Paperclip/><b>Dodaj logo, zdjęcia, PDF lub screenshoty</b><small>Do 5 plików, maks. 8 MB każdy.</small><input type="file" multiple onChange={e=>setFiles([...e.target.files].slice(0,5))}/></label>{files.length>0&&<p className="files">{files.map(x=>x.name).join(' • ')}</p>}</div><div className="panel"><h2>5. Kontakt</h2><div className="fields"><Field l="Imię i nazwisko" v={f.name} set={v=>set('name',v)}/><Field l="E-mail" type="email" v={f.email} set={v=>set('email',v)}/><Field l="Telefon (opcjonalnie)" v={f.phone} set={v=>set('phone',v)} wide/></div><label className="privacy"><input type="checkbox" checked={f.privacy} onChange={e=>set('privacy',e.target.checked)}/> Zapoznałem/am się z Polityką prywatności.</label>{err&&<p className="error">{err}</p>}</div></div><aside><span>WSTĘPNA WYCENA</span><h3>{s.name}</h3><div>Usługa <b>{money(s.price)}</b></div>{extras.filter(x=>selected.includes(x[0])).map(x=><div key={x[0]}>{x[1]} <b>+{money(x[2])}</b></div>)}<strong>Orientacyjnie od {money(total)}</strong><button className="primary" disabled={busy}>{busy?'Wysyłanie...':'Wyślij projekt'} <Mail size={17}/></button><small>Wiadomość trafi bezpośrednio do ProjektKreator.pl. Nie otworzy się Gmail ani inna aplikacja pocztowa.</small></aside></form></section></main>
}

const Field=({l,v,set,type='text',wide})=><label className={wide?'wide':''}>{l}<input type={type} value={v} onChange={e=>set(e.target.value)}/></label>;
function Success({data,kind,go}){return <main><section className="receipt"><div>✓</div><span>WIADOMOŚĆ WYSŁANA</span><h1>{kind==='project'?'Twój projekt został wysłany.':'Twoje pytanie zostało wysłane.'}</h1><section><p>Numer zgłoszenia <b>{data.ticket}</b></p><p>Numer w kolejce <b>#{data.queueNumber}</b></p></section><p>Wiadomość dotarła do ProjektKreator.pl. Odpowiemy na podany przez Ciebie adres e-mail.</p><button className="primary" onClick={()=>go('home')}>Strona główna</button></section></main>}

function Contact({go}){
  const[f,setF]=useState({name:'',email:'',phone:'',message:'',privacy:false}),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[receipt,setReceipt]=useState(null);
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  async function submit(e){
    e.preventDefault();
    if(!f.name||!f.email||!f.message)return setErr('Podaj imię, e-mail i pytanie.');
    if(!f.privacy)return setErr('Zaakceptuj Politykę prywatności.');
    setBusy(true);setErr('');
    try{setReceipt(await sendRequest({kind:'question',name:f.name,email:f.email,phone:f.phone,message:f.message}))}catch(error){setErr(error.message)}finally{setBusy(false)}
  }
  if(receipt)return <Success data={receipt} kind="question" go={go}/>;
  return <main><section className="pageHead"><span>NAPISZ DO NAS</span><h1>Pytanie czy nowy projekt?</h1><p>Wiadomość wyślesz bezpośrednio ze strony, bez otwierania swojej poczty.</p></section><section className="section contact"><div className="contactBox"><Mail/><h3>E-mail</h3><p>{CONTACT_EMAIL}</p><small>Na ten adres trafiają wiadomości z formularza.</small></div><div className="contactBox"><h3>Chcesz zlecić projekt?</h3><p>Strona, sklep, aplikacja, logo, debug lub testy.</p><button className="primary" onClick={()=>go('zamow')}>Rozpocznij projekt</button></div><form className="panel" onSubmit={submit}><h2>Napisz do nas</h2><div className="fields"><Field l="Imię i nazwisko" v={f.name} set={v=>set('name',v)}/><Field l="E-mail" type="email" v={f.email} set={v=>set('email',v)}/><Field l="Telefon (opcjonalnie)" v={f.phone} set={v=>set('phone',v)} wide/><label className="wide">Twoje pytanie<textarea value={f.message} onChange={e=>set('message',e.target.value)}/></label></div><label className="privacy"><input type="checkbox" checked={f.privacy} onChange={e=>set('privacy',e.target.checked)}/> Zapoznałem/am się z Polityką prywatności.</label>{err&&<p className="error">{err}</p>}<button className="primary" disabled={busy}>{busy?'Wysyłanie...':'Wyślij pytanie'} <Mail size={17}/></button></form></section></main>
}

function Legal({type}){const isPrivacy=type==='polityka-prywatnosci',isCookies=type==='cookies';return <main><section className="pageHead"><span>DOKUMENTY</span><h1>{isPrivacy?'Polityka prywatności':isCookies?'Polityka cookies':'Regulamin serwisu'}</h1></section><section className="legal"><div className="warning"><b>Przed publikacją uzupełnij pełne dane firmy, NIP i adres.</b></div>{isPrivacy?<><h2>1. Administrator danych</h2><p>Administratorem danych będzie podmiot prowadzący ProjektKreator.pl. Kontakt: {CONTACT_EMAIL}.</p><h2>2. Formularze</h2><p>Dane wpisane do formularza są przesyłane do ProjektKreator.pl w celu obsługi zapytania, przygotowania wyceny i kontaktu zwrotnego.</p><h2>3. Cel</h2><p>Dane służą obsłudze zapytań, przygotowaniu wyceny, realizacji projektu i korespondencji.</p></>:isCookies?<><h2>1. Dane lokalne</h2><p>Serwis może zapisywać techniczne dane lokalne potrzebne do działania interfejsu.</p><h2>2. Analityka</h2><p>Jeżeli zostanie dodana analityka lub reklamy, konfiguracja zgód powinna zostać zaktualizowana.</p></>:<><h2>1. Usługi</h2><p>ProjektKreator.pl prezentuje usługi tworzenia stron, sklepów, aplikacji, logo, QA, debugowania i automatyzacji.</p><h2>2. Formularz</h2><p>Wysłanie formularza jest zapytaniem i nie oznacza zawarcia umowy. Zakres, cena i termin są potwierdzane przed rozpoczęciem prac.</p><h2>3. Ceny</h2><p>Ceny na stronie są cenami startowymi „od”.</p><h2>4. Kontakt</h2><p>Kontakt: {CONTACT_EMAIL}.</p></>}</section></main>}
function Footer({go}){return <footer><img src="/projektkreator-logo.webp"/><div><b>ProjektKreator.pl</b><span>Strony, sklepy, aplikacje, logo, debug i QA.</span></div><nav><button onClick={()=>go('realizacje')}>Realizacje</button><button onClick={()=>go('cennik')}>Cennik</button><button onClick={()=>go('kontakt')}>Kontakt</button><button onClick={()=>go('regulamin')}>Regulamin</button><button onClick={()=>go('polityka-prywatnosci')}>Prywatność</button></nav><small>© 2026 ProjektKreator.pl • Dane firmy / NIP do uzupełnienia przed publikacją</small></footer>}

createRoot(document.getElementById('root')).render(<App/>);
