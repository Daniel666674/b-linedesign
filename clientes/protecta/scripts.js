/* PROTECTA — interactions */
(function () {
  'use strict';
  var WA = '573112699903';

  /* year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* mobile nav */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* reveal on scroll */
  var reveals = document.querySelectorAll('.section, .service-card, .cover-card, .why-card, .hero-copy, .hero-visual, .video-card');
  if ('IntersectionObserver' in window) {
    reveals.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* cobertura tabs */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('is-active'); });
      t.classList.add('is-active');
      var v = t.getAttribute('data-vehicle');
      document.querySelectorAll('.cover-grid').forEach(function (g) {
        g.classList.toggle('hidden', g.getAttribute('data-group') !== v);
      });
    });
  });

  /* cookie consent */
  var cookie = document.getElementById('cookie');
  if (cookie && !localStorage.getItem('protecta_cookie')) { cookie.hidden = false; }
  function closeCookie(v) { localStorage.setItem('protecta_cookie', v); if (cookie) cookie.hidden = true; }
  var ca = document.getElementById('cookie-accept'), cr = document.getElementById('cookie-reject');
  if (ca) ca.addEventListener('click', function () { closeCookie('accepted'); });
  if (cr) cr.addEventListener('click', function () { closeCookie('rejected'); });

  /* ===== COTIZADOR ===== */
  var form = document.getElementById('quoter-form');
  if (!form) return;
  var state = { vehiculo: '', servicios: [], paquete: '', extras: [] };
  var step = 1, MAX = 5;
  var panels = form.querySelectorAll('.qpanel');
  var stepEls = document.querySelectorAll('#quoter-steps .qstep');
  var prevBtn = document.getElementById('q-prev');
  var nextBtn = document.getElementById('q-next');
  var sendBtn = document.getElementById('q-send');
  var summary = document.getElementById('quoter-summary');

  /* quick pick (vehicle) */
  form.querySelectorAll('.quick-pick .chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      form.querySelectorAll('.quick-pick .chip').forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      state.vehiculo = chip.getAttribute('data-value');
      var map = { 'Tesla Model Y': ['Tesla', 'Model Y'], 'BYD Yuan Up': ['BYD', 'Yuan Up'] };
      if (map[state.vehiculo]) {
        form.querySelector('[name=marca]').value = map[state.vehiculo][0];
        form.querySelector('[name=linea]').value = map[state.vehiculo][1];
      }
    });
  });

  /* option buttons (single + multi) */
  form.querySelectorAll('.opt-grid').forEach(function (grid) {
    var field = grid.getAttribute('data-field');
    var multi = grid.getAttribute('data-multi') === 'true';
    grid.querySelectorAll('.opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var val = opt.getAttribute('data-value');
        if (multi) {
          opt.classList.toggle('is-on');
          var i = state[field].indexOf(val);
          if (i > -1) state[field].splice(i, 1); else state[field].push(val);
        } else {
          var on = opt.classList.contains('is-on');
          grid.querySelectorAll('.opt').forEach(function (o) { o.classList.remove('is-on'); });
          if (on) { state[field] = ''; } else { opt.classList.add('is-on'); state[field] = val; }
        }
      });
    });
  });

  function show(n, scroll) {
    step = Math.max(1, Math.min(MAX, n));
    panels.forEach(function (p) { p.classList.toggle('is-active', +p.getAttribute('data-step') === step); });
    stepEls.forEach(function (el, i) {
      el.classList.toggle('is-active', i + 1 === step);
      el.classList.toggle('done', i + 1 < step);
    });
    prevBtn.hidden = step === 1;
    nextBtn.hidden = step === MAX;
    sendBtn.hidden = step !== MAX;
    if (step === MAX) buildSummary();
    if (scroll) document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function readInputs() {
    state.marca = (form.querySelector('[name=marca]').value || '').trim();
    state.linea = (form.querySelector('[name=linea]').value || '').trim();
    state.anio = (form.querySelector('[name=anio]').value || '').trim();
    state.nombre = (form.querySelector('[name=nombre]').value || '').trim();
    state.telefono = (form.querySelector('[name=telefono]').value || '').trim();
    state.comentario = (form.querySelector('[name=comentario]').value || '').trim();
  }

  function vehicleLabel() {
    var parts = [state.marca, state.linea, state.anio].filter(Boolean).join(' ');
    return parts || state.vehiculo || '—';
  }

  function buildSummary() {
    readInputs();
    var rows = [];
    rows.push('<li><b>Vehículo:</b>&nbsp;' + esc(vehicleLabel()) + '</li>');
    if (state.servicios.length) rows.push('<li><b>Servicios:</b>&nbsp;' + esc(state.servicios.join(', ')) + '</li>');
    if (state.paquete) rows.push('<li><b>Cobertura PPF:</b>&nbsp;' + esc(state.paquete) + '</li>');
    if (state.extras.length) rows.push('<li><b>Extras:</b>&nbsp;' + esc(state.extras.join(', ')) + '</li>');
    summary.innerHTML = '<b>Resumen de tu solicitud</b><ul>' + rows.join('') + '</ul>';
    summary.classList.add('show');
  }

  function esc(s) { return String(s).replace(/[<>&]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]; }); }

  prevBtn.addEventListener('click', function () { show(step - 1, true); });
  nextBtn.addEventListener('click', function () {
    if (step === 1) { readInputs(); if (!state.vehiculo && !state.marca) { alert('Cuéntanos qué vehículo es para continuar.'); return; } }
    if (step === 2 && state.servicios.length === 0) { alert('Elige al menos un servicio.'); return; }
    show(step + 1, true);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    readInputs();
    if (!state.nombre || !state.telefono) { alert('Por favor déjanos tu nombre y teléfono.'); return; }
    if (!document.getElementById('consent').checked) { alert('Para enviar, autoriza el tratamiento de datos.'); return; }

    var L = [];
    L.push('Hola Protecta 👋, quiero una cotización:');
    L.push('');
    L.push('🚗 Vehículo: ' + vehicleLabel());
    if (state.servicios.length) L.push('🛡️ Servicios: ' + state.servicios.join(', '));
    if (state.paquete) L.push('📦 Cobertura PPF: ' + state.paquete);
    if (state.extras.length) L.push('✨ Extras: ' + state.extras.join(', '));
    L.push('');
    L.push('👤 ' + state.nombre + ' — ' + state.telefono);
    if (state.comentario) L.push('💬 ' + state.comentario);

    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(L.join('\n'));
    window.open(url, '_blank');
  });

  show(1);
})();
