/* ═══════════════════════════════════════════
   B-LINE DESIGN — Hero + Navigation
   ═══════════════════════════════════════════ */

const { useState, useEffect, useRef } = React;

/* ─── SVG Icons ─── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

/* ─── NAVIGATION ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="assets/logo.png" alt="B-Line Design" />
        </a>
        <ul className="nav-links">
          <li><a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')}>Servicios</a></li>
          <li><a href="#portafolio" onClick={(e) => handleNavClick(e, 'portafolio')}>Portafolio</a></li>
          <li><a href="#proceso" onClick={(e) => handleNavClick(e, 'proceso')}>Proceso</a></li>
          <li><a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>Contacto</a></li>
          <li><a href="#reserva" onClick={(e) => handleNavClick(e, 'reserva')} className="nav-cta">Reservar Cita</a></li>
        </ul>
        <div className={`nav-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')}>Servicios</a>
        <a href="#portafolio" onClick={(e) => handleNavClick(e, 'portafolio')}>Portafolio</a>
        <a href="#proceso" onClick={(e) => handleNavClick(e, 'proceso')}>Proceso</a>
        <a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>Contacto</a>
        <a href="#reserva" onClick={(e) => handleNavClick(e, 'reserva')}>Reservar Cita</a>
      </div>
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener('canplay', () => setVideoLoaded(true), { once: true });
  }, []);

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg">
        {/* Fallback image while video loads */}
        <img 
          src="assets/ducati.png" 
          alt="Ducati Panigale V4 - B-Line Design wrap" 
          style={{ opacity: videoLoaded ? 0 : 1, transition: 'opacity 1.2s ease' }}
        />
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        >
          <source src="assets/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-gradient"></div>
      <div className="neon-line"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          Bogotá, Colombia
        </div>
        <h1 className="hero-title">
          TU MÁQUINA.<br/><span className="outline">NUESTRO ARTE.</span>
        </h1>
        <p className="hero-sub">
          Wrap, PPF, polarizado y diseño premium para quienes exigen perfección. En B-Line Design cada proyecto refleja disciplina, técnica y respeto por tu vehículo.
        </p>
        <div className="hero-actions">
          <a 
            href="https://wa.me/573013940718?text=Hola%2C%20quiero%20cotizar%20un%20servicio" 
            className="btn-primary"
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon /> Cotizar Ahora
          </a>
          <a href="#portafolio" className="btn-ghost" onClick={(e) => { 
            e.preventDefault(); 
            document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth' }); 
          }}>
            Ver Trabajos <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = ['WRAP VINILO', 'PPF', 'POLARIZADO', 'CERAMIC COATING', 'DISEÑO DE CASCOS', 'DETAILING PREMIUM', 'FIBRA DE CARBONO'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// Export
Object.assign(window, { Navigation, Hero, Marquee, WhatsAppIcon, ArrowRight });
