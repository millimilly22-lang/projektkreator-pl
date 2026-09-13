import './hero-visual.css';

export default function ProjektKreatorHeroVisual() {
  return <div className="hero-visual" role="img" aria-label="ProjektKreator.pl — projekty stron internetowych, sklepów i aplikacji">
    <div className="visual-topbar"><div className="visual-brand"><img src="/projektkreator-logo.webp" alt="ProjektKreator.pl"/><span>WEB STUDIO</span></div><span className="visual-status"><i/> ONLINE</span></div>
    <div className="visual-grid">
      <div className="visual-copy"><span className="visual-kicker">PROJEKTKREATOR.PL</span><h3>Pomysł<br/><em>staje się stroną.</em></h3><p>Projektujemy sklepy, strony i aplikacje, które pomagają firmom wyglądać profesjonalnie online.</p><div className="visual-pills"><b>STRONY</b><b>SKLEPY</b><b>APLIKACJE</b></div></div>
      <div className="visual-collage" aria-hidden="true"><div className="visual-photo visual-photo-modea"><img src="/portfolio/modea/images/editorial.webp" alt=""/></div><div className="visual-photo visual-photo-tavola"><img src="/portfolio/latavola/images/pizza.webp" alt=""/></div><div className="visual-photo visual-photo-novabud"><img src="/portfolio/novabud/images/house.webp" alt=""/></div><span className="visual-orb orb-one"/><span className="visual-orb orb-two"/><span className="visual-label">DESIGN<br/><b>+ FUNKCJA</b></span></div>
    </div>
    <div className="visual-bottom"><span><b>01</b> Jasna wycena</span><span><b>02</b> Formularz online</span><span><b>03</b> Gotowe do działania</span></div>
  </div>;
}
