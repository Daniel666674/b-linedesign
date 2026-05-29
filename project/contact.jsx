/* ═══════════════════════════════════════════
   B-LINE DESIGN — Booking, Contact, Footer, WhatsApp
   ═══════════════════════════════════════════ */

/* ─── BOOKING FORM ─── */
function BookingForm() {
  const [form, setForm] = React.useState({
    nombre: '',
    telefono: '',
    vehiculo: '',
    servicio: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola, quiero agendar una cita:%0A%0A` +
      `*Nombre:* ${form.nombre}%0A` +
      `*Teléfono:* ${form.telefono}%0A` +
      `*Vehículo:* ${form.vehiculo}%0A` +
      `*Servicio:* ${form.servicio}%0A` +
      `*Detalles:* ${form.mensaje}`;
    window.open(`https://wa.me/573013940718?text=${text}`, '_blank');
  };

  return (
    <section className="section booking-section" id="reserva">
      <Reveal><span className="section-label">Reserva tu Cita</span></Reveal>
      <Reveal delay={1}><h2 className="section-title">AGENDA TU<br/>TRANSFORMACIÓN</h2></Reveal>
      <div className="booking-grid">
        <div>
          <Reveal delay={2}>
            <p className="section-desc" style={{ marginBottom: '40px' }}>
              Completa el formulario y te contactaremos por WhatsApp para confirmar tu cita. También puedes escribirnos directamente.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre completo</label>
                <input className="form-input" type="text" name="nombre" placeholder="Tu nombre" required value={form.nombre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input className="form-input" type="tel" name="telefono" placeholder="+57 300 000 0000" required value={form.telefono} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Vehículo</label>
                <input className="form-input" type="text" name="vehiculo" placeholder="Marca, modelo y año" required value={form.vehiculo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Servicio</label>
                <select className="form-select" name="servicio" required value={form.servicio} onChange={handleChange}>
                  <option value="">Selecciona un servicio</option>
                  <option value="Wrap / Vinilo Completo">Wrap / Vinilo Completo</option>
                  <option value="PPF (Paint Protection Film)">PPF (Paint Protection Film)</option>
                  <option value="Polarizado">Polarizado</option>
                  <option value="Ceramic Coating">Ceramic Coating</option>
                  <option value="Diseño de Casco">Diseño de Casco</option>
                  <option value="Detailing Premium">Detailing Premium</option>
                  <option value="Varios Servicios">Varios Servicios</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Detalles adicionales</label>
                <textarea className="form-textarea" name="mensaje" placeholder="Cuéntanos sobre tu proyecto..." value={form.mensaje} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '16px', border: 'none' }}>
                Enviar por WhatsApp <ArrowRight />
              </button>
            </form>
          </Reveal>
        </div>
        <div>
          <Reveal delay={2}>
            <div style={{ padding: '48px', background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '1px', marginBottom: '20px' }}>HORARIO DE ATENCIÓN</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'var(--gray-light)', fontSize: '14px' }}>Lunes — Viernes</span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>8:00 AM — 6:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'var(--gray-light)', fontSize: '14px' }}>Sábado</span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>8:00 AM — 2:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-light)', fontSize: '14px' }}>Domingo</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-mid)' }}>Cerrado</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div style={{ padding: '48px', background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '1px', marginBottom: '20px' }}>CONTACTO DIRECTO</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a href="https://wa.me/573013940718" target="_blank" rel="noopener"
                   style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--off-white)', textDecoration: 'none', fontSize: '15px' }}>
                  <WhatsAppIcon /> +57 301 394 0718
                </a>
                <a href="https://instagram.com/b.linedesigncol" target="_blank" rel="noopener"
                   style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--off-white)', textDecoration: 'none', fontSize: '15px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  @b.linedesigncol
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT + MAP ─── */
function Contact() {
  return (
    <section className="section" id="contacto">
      <Reveal><span className="section-label">Ubicación</span></Reveal>
      <Reveal delay={1}><h2 className="section-title">ENCUÉNTRANOS<br/>EN BOGOTÁ</h2></Reveal>
      <div className="contact-grid">
        <div>
          <Reveal delay={2}>
            <div className="contact-item">
              <div className="contact-item-label">Dirección</div>
              <div className="contact-item-value">Carrera 111 #22J-29, Bogotá, Colombia</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">WhatsApp</div>
              <div className="contact-item-value">
                <a href="https://wa.me/573013940718" target="_blank" rel="noopener">+57 301 394 0718</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">Instagram</div>
              <div className="contact-item-value">
                <a href="https://instagram.com/b.linedesigncol" target="_blank" rel="noopener">@b.linedesigncol</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-label">Horario</div>
              <div className="contact-item-value">Lun — Vie: 8AM — 6PM · Sáb: 8AM — 2PM</div>
            </div>
          </Reveal>
        </div>
        <div>
          <Reveal delay={3}>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8!2d-74.15!3d4.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzknMDAuMCJOIDc0wrAwOScwMC4wIlc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="B-Line Design ubicación en Bogotá"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-copy">
        © {new Date().getFullYear()} B-Line Design · Bogotá, Colombia · Todos los derechos reservados
      </div>
      <div className="footer-social">
        <a href="https://instagram.com/b.linedesigncol" target="_blank" rel="noopener">Instagram</a>
        <a href="https://wa.me/573013940718" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP FLOATING BUTTON ─── */
function WhatsAppFloat() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href="https://wa.me/573013940718?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios" 
      target="_blank" 
      rel="noopener"
      className="whatsapp-float"
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

Object.assign(window, { BookingForm, Contact, Footer, WhatsAppFloat });
