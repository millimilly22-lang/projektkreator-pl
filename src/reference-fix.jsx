import React,{useEffect}from'react';
import EditorialApp from'./editorial-app.jsx';
import'./reference-fix.css';

const IMG={
  services:'https://images.pexels.com/photos/4058060/pexels-photo-4058060.jpeg?auto=compress&cs=tinysrgb&w=1800',
  portfolio:'https://images.pexels.com/photos/4258192/pexels-photo-4258192.jpeg?auto=compress&cs=tinysrgb&w=1800',
  pricing:'https://images.pexels.com/photos/27951997/pexels-photo-27951997.jpeg?auto=compress&cs=tinysrgb&w=1800',
  contact:'https://images.pexels.com/photos/8534455/pexels-photo-8534455.jpeg?auto=compress&cs=tinysrgb&w=1800',
  contactFaq:'https://images.pexels.com/photos/7224953/pexels-photo-7224953.jpeg?auto=compress&cs=tinysrgb&w=1400',
  modea:'/portfolio/modea/images/jacket.webp'
};

function applyReferenceVisuals(){
  const set=(selector,src)=>document.querySelectorAll(selector).forEach(el=>{if(el.tagName==='IMG'&&el.getAttribute('src')!==src)el.setAttribute('src',src)});
  set('img[alt="Kreatywne studio"]',IMG.services);
  set('img[alt="Studio projektowe"]',IMG.portfolio);
  set('img[alt="Jasne biuro"]',IMG.pricing);
  set('img[alt="Biurko do rozmowy o projekcie"]',IMG.contact);
  set('.pkContactPhotoNote img',IMG.contactFaq);
  set('.pkMonitorMock img',IMG.modea);
  set('.pkFeaturedVisual>img',IMG.modea);
  set('.pkPhoneMock img',IMG.modea);
  document.querySelectorAll('img[alt="MODÉA"],img[alt="MODÉA mobile"],img[alt="Projekt MODÉA"]').forEach(el=>el.setAttribute('src',IMG.modea));
}

export default function ReferenceFixedApp(){
  useEffect(()=>{
    let raf=0;
    const run=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(applyReferenceVisuals)};
    run();
    const obs=new MutationObserver(run);
    obs.observe(document.getElementById('root'),{subtree:true,childList:true});
    addEventListener('hashchange',run);
    return()=>{obs.disconnect();removeEventListener('hashchange',run);cancelAnimationFrame(raf)};
  },[]);
  return <EditorialApp/>;
}
