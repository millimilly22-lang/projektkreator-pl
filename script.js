async function loadPages(){
  const names=['services','portfolio','pricing','contact'];
  const html=await Promise.all(names.map(n=>fetch(`pages/${n}.html`).then(r=>{if(!r.ok)throw new Error(`Failed ${n}`);return r.text()})));
  document.getElementById('app').innerHTML=html.join('\n');
}
function bindUI(){
  const t=document.querySelector('.mobile-toggle');
  const m=document.querySelector('.menu');
  if(t&&m)t.addEventListener('click',()=>m.classList.toggle('open'));
  document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>{
    const parent=btn.closest('.faq'); parent.classList.toggle('open');
    btn.querySelector('span:last-child').textContent=parent.classList.contains('open')?'−':'+';
  }));
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const cat=btn.dataset.filter;
    document.querySelectorAll('#page-services [data-category]').forEach(card=>card.style.display=(cat==='all'||card.dataset.category===cat)?'block':'none');
  }));
  const form=document.querySelector('#contactForm');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const out=document.querySelector('#formStatus');out.textContent='Dziękujemy! Formularz jest gotowy do podłączenia do wysyłki wiadomości.';form.reset()});
}
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const page=document.getElementById('page-'+name); if(page)page.classList.add('active');
  document.querySelectorAll('.menu a').forEach(a=>a.classList.toggle('active',a.dataset.page===name));
  if(location.hash!=='#'+name)history.replaceState(null,'','#'+name);
  window.scrollTo({top:0,behavior:'instant'}); const m=document.querySelector('.menu'); if(m)m.classList.remove('open');
}
window.showPage=showPage;
document.addEventListener('DOMContentLoaded',async()=>{
  try{await loadPages(); bindUI(); const name=(location.hash||'#services').slice(1); showPage(['services','portfolio','pricing','contact'].includes(name)?name:'services')}
  catch(e){document.getElementById('app').innerHTML='<section class="section"><div class="container"><h2>Nie udało się załadować strony.</h2></div></section>'}
});
window.addEventListener('hashchange',()=>{const n=(location.hash||'#services').slice(1);if(['services','portfolio','pricing','contact'].includes(n))showPage(n)});
