/* ═══════════════════════════════════════════
   B-LINE DESIGN — Services, Portfolio, Stats, Process
   ═══════════════════════════════════════════ */

const { useEffect, useRef, useState, useCallback } = React;

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── SERVICES ─── */
function Services() {
  const services = [
    { num: '01', name: 'Wrap / Vinilo', desc: 'Transformación total de color y textura. Vinilos premium Hexis y 3M con acabados mate, satinado, gloss y especiales.' },
    { num: '02', name: 'PPF', desc: 'Paint Protection Film transparente que protege la pintura de tu vehículo contra rayaduras, piedras e impactos.' },
    { num: '03', name: 'Polarizado', desc: 'Películas de seguridad y control solar con la mejor tecnología. Rechazo de calor, privacidad y protección UV.' },
    { num: '04', name: 'Ceramic Coating', desc: 'Recubrimiento cerámico de grado profesional. Protección duradera con brillo de showroom permanente.' },
    { num: '05', name: 'Diseño de Cascos', desc: 'Personalización y diseño único para cascos de moto. Vinilos, fibra de carbono forjada y acabados exclusivos.' },
    { num: '06', name: 'Detailing Premium', desc: 'Limpieza profunda y restauración completa. Corrección de pintura, descontaminación y tratamiento interior.' },
  ];

  return (
    <section className="section" id="servicios" style={{ background: 'var(--dark)' }}>
      <Reveal><span className="section-label">Nuestros Servicios</span></Reveal>
      <Reveal delay={1}><h2 className="section-title">EXCELENCIA EN<br/>CADA DETALLE</h2></Reveal>
      <Reveal delay={2}><p className="section-desc">Cada servicio es ejecutado con los más altos estándares de la industria. Solo usamos materiales premium de marcas reconocidas mundialmente.</p></Reveal>
      <div className="services-grid">
        {services.map((s, i) => (
          <Reveal key={i} delay={Math.min(i + 1, 5)}>
            <a 
              href={`https://wa.me/573013940718?text=Hola%2C%20quiero%20cotizar%20${encodeURIComponent(s.name)}`}
              target="_blank" 
              rel="noopener"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="service-card">
                <div className="service-number">{s.num}</div>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow">
                  Cotizar <ArrowRight />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ─── */
function Portfolio() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeftState] = useState(0);

  const items = [
    { img: 'assets/ducati.png', title: 'Ducati Panigale V4', tag: 'Wrap — Gris Elefante' },
    { img: 'assets/kawasaki.png', title: 'Kawasaki Z1000', tag: 'Wrap — Satin Green + Fibra Carbono' },
    { img: 'assets/silverado.png', title: 'Chevrolet Silverado', tag: 'PPF + Ceramic Coating' },
    { img: 'assets/helmet.png', title: 'X-Lite X-803', tag: 'Diseño Casco — Carbon + Red' },
    { img: 'assets/mustang.png', title: 'Ford Mustang Shelby', tag: 'Diseño Racing Stripes' },
    { img: 'assets/shop.png', title: 'BMW & Audi', tag: 'Detailing Premium' },
  ];

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <section className="portfolio-section" id="portafolio">
      <div className="portfolio-header">
        <Reveal><span className="section-label">Portafolio</span></Reveal>
        <Reveal delay={1}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>PROYECTOS<br/>RECIENTES</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>Arrastra para explorar nuestro trabajo. Cada proyecto es único — diseñado y ejecutado a medida.</p>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div 
          className="portfolio-scroll" 
          ref={scrollRef}
          onMouseDown={onMouseDown}
          style={{ marginTop: '48px' }}
        >
          {items.map((item, i) => (
            <div className="portfolio-item" key={i}>
              <img src={item.img} alt={item.title} draggable="false" />
              <div className="portfolio-item-overlay">
                <span className="portfolio-item-title">{item.title}</span>
                <span className="portfolio-item-tag">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── STATS ─── */
function Stats() {
  return (
    <div className="stats-section">
      <div className="stat-item">
        <div className="stat-number"><AnimatedCounter end={500} suffix="+" /></div>
        <div className="stat-label">Proyectos Completados</div>
      </div>
      <div className="stat-item">
        <div className="stat-number"><AnimatedCounter end={8} /></div>
        <div className="stat-label">Años de Experiencia</div>
      </div>
      <div className="stat-item">
        <div className="stat-number"><AnimatedCounter end={100} suffix="%" /></div>
        <div className="stat-label">Satisfacción Garantizada</div>
      </div>
      <div className="stat-item">
        <div className="stat-number"><AnimatedCounter end={30} suffix="+" /></div>
        <div className="stat-label">Marcas Atendidas</div>
      </div>
    </div>
  );
}

/* ─── PROCESS ─── */
function Process() {
  const steps = [
    { num: '01', title: 'Consulta', desc: 'Analizamos tu vehículo, escuchamos tu visión y definimos el proyecto ideal según tus necesidades.' },
    { num: '02', title: 'Diseño', desc: 'Creamos propuestas de diseño personalizadas con renders digitales para tu aprobación.' },
    { num: '03', title: 'Ejecución', desc: 'Instalación profesional en nuestro taller equipado con las mejores herramientas y tecnología.' },
    { num: '04', title: 'Entrega', desc: 'Inspección final de calidad, garantía incluida y seguimiento post-servicio para tu tranquilidad.' },
  ];

  return (
    <section className="section" id="proceso">
      <Reveal><span className="section-label">Nuestro Proceso</span></Reveal>
      <Reveal delay={1}><h2 className="section-title">DE LA VISIÓN<br/>A LA REALIDAD</h2></Reveal>
      <div className="process-grid">
        {steps.map((s, i) => (
          <Reveal key={i} delay={Math.min(i + 1, 5)}>
            <div className="process-step">
              <div className="process-step-num">{s.num}</div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── SPLIT CTA ─── */
function SplitCTA() {
  return (
    <div className="split-cta">
      <div className="split-cta-image">
        <img src="assets/kawasaki.png" alt="Kawasaki Z1000 wrap por B-Line Design" />
      </div>
      <div className="split-cta-content">
        <Reveal><span className="section-label">¿Listo para transformar tu vehículo?</span></Reveal>
        <Reveal delay={1}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>CADA PROYECTO<br/>ES ÚNICO</h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            No importa si es un auto, moto o casco — en B-Line Design le damos vida a tu visión con los materiales más exclusivos del mercado.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <a 
            href="https://wa.me/573013940718?text=Hola%2C%20quiero%20agendar%20una%20cita" 
            className="btn-primary"
            target="_blank"
            rel="noopener"
          >
            <span>Agenda tu Cita</span> <ArrowRight />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

Object.assign(window, { Services, Portfolio, Stats, Process, SplitCTA, Reveal, useReveal });
