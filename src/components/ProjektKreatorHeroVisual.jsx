import './hero-visual.css';

export default function ProjektKreatorHeroVisual() {
  return <div className="hero-visual" role="img" aria-label="ProjektKreator.pl — nowoczesna strona internetowa dla Twojej firmy">
    <div className="visual-browser"><span className="visual-dots">● ● ●</span><span>projektkreator.pl</span><span className="visual-browser-secure">● ONLINE</span></div>
    <div className="visual-nav"><img src="/projektkreator-logo.webp" alt="ProjektKreator.pl"/><div className="visual-nav-links"><span>Usługi</span><span>Realizacje</span><span>Cennik</span><span>Kontakt</span></div><b>START PROJEKTU ↗</b></div>
    <div className="visual-main"><div className="visual-copy"><span className="visual-kicker">STRONY · SKLEPY · APLIKACJE</span><h3>Twój pomysł.<br/><em>Nasza technologia.</em></h3><p>Tworzymy nowoczesne strony, sklepy i aplikacje, które pomagają firmom wyglądać profesjonalnie i zdobywać klientów.</p><button>Rozpocznij projekt <span>→</span></button><small>Jasna wycena · Formularz online</small></div><div className="visual-feature"><div className="visual-image-main"><img src="/portfolio/novabud/images/house.webp" alt="Projekt strony dla firmy budowlanej"/></div><div className="visual-image-small"><img src="/portfolio/modea/images/editorial.webp" alt="Projekt sklepu internetowego"/></div><div className="visual-image-small visual-image-third"><img src="/portfolio/latavola/images/interior.webp" alt="Projekt strony restauracji"/></div><div className="visual-feature-card"><b>PROJEKTKREATOR.PL</b><span>Od pomysłu do gotowej strony.</span></div></div></div>
    <div className="visual-bottom"><span><b>01</b> Strategia</span><span><b>02</b> Design</span><span><b>03</b> Wdrożenie</span><span className="visual-bottom-note">Gotowe do działania ↗</span></div>
  </div>;
}
