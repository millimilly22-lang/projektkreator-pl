import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from 'lucide-react';
import { projects } from '../portfolio.js';
import './portfolio.css';

export function LiveWebsitePreview({ project, variant = 'large' }) {
  const viewport = useRef(null);
  const [dimensions, setDimensions] = useState({ width:1280, scale:1 });
  useEffect(() => {
    const element = viewport.current;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      const width = variant === 'hero' ? 1100 : available < 700 ? Math.max(320, available) : 1280;
      setDimensions({ width, scale:Math.min(1, available / width) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [variant]);
  return <a className={`live-website live-${variant}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Otwórz pełną stronę ${project.name}`}>
    <div className="preview-chrome"><span className="preview-dots" aria-hidden="true">● ● ●</span><span>projektkreator.pl{project.url}</span><ExternalLink size={15}/></div>
    <div className="live-viewport" ref={viewport}>
      <iframe key={project.id} src={project.url} title={`Działająca strona ${project.name}`} loading={variant === 'hero' ? 'eager' : 'lazy'} tabIndex={-1} aria-hidden="true" style={{ width:dimensions.width, height:`${100 / (dimensions.scale || 1)}%`, transform:`scale(${dimensions.scale})` }}/>
      <span className="preview-open">Otwórz działającą stronę <ExternalLink size={16}/></span>
    </div>
  </a>;
}

export function MovingPortfolio() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const project = projects[index];
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % projects.length), 9000);
    return () => clearInterval(timer);
  }, [autoplay]);
  function move(delta) { setIndex(i => (i + delta + projects.length) % projects.length); }
  return <div className="live-portfolio" role="region" aria-label="Działające realizacje ProjektKreator.pl" aria-roledescription="karuzela">
    <div className="portfolio-controls"><div className="portfolio-tabs" aria-label="Wybierz realizację">{projects.map((p,i) => <button key={p.id} aria-pressed={i === index} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}><span>0{i + 1}</span>{p.name}</button>)}</div><div className="portfolio-arrows"><button onClick={() => move(-1)} aria-label="Poprzednia realizacja"><ChevronLeft size={20}/></button><button onClick={() => setAutoplay(value => !value)} aria-label={autoplay ? 'Zatrzymaj automatyczne przewijanie' : 'Włącz automatyczne przewijanie'}>{autoplay ? <Pause size={16}/> : <Play size={16}/>}</button><button onClick={() => move(1)} aria-label="Następna realizacja"><ChevronRight size={20}/></button></div></div>
    <LiveWebsitePreview project={project}/>
    <div className="portfolio-description" aria-live={autoplay ? 'off' : 'polite'}><div><span>{project.type} · {index + 1} / {projects.length}</span><h3>{project.name}</h3><p>{project.desc}</p></div><a href={project.url} target="_blank" rel="noreferrer">Otwórz pełne demo <ExternalLink size={18}/></a></div>
  </div>;
}
