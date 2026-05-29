/* B-LINE DESIGN — Main Scripts */

(function () {
  'use strict';

  /* ─── NAV SCROLL ─── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* scroll logo back to top */
  document.getElementById('nav-logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ─── MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* ─── HERO VIDEO ─── */
  const heroVideo = document.getElementById('hero-video');
  const heroImg = document.getElementById('hero-img');

  if (heroVideo) {
    heroVideo.style.position = 'absolute';
    heroVideo.style.inset = '0';
    heroVideo.style.width = '100%';
    heroVideo.style.height = '100%';
    heroVideo.style.objectFit = 'cover';
    heroVideo.style.opacity = '0';
    heroVideo.style.transition = 'opacity 1.2s ease';

    heroVideo.addEventListener('canplay', () => {
      heroVideo.style.opacity = '1';
      if (heroImg) heroImg.style.opacity = '0';
    }, { once: true });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ─── ANIMATED COUNTERS ─── */
  const statEls = document.querySelectorAll('.stat-number[data-count]');

  function animateCounter(el) {
    const end = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach((el) => counterObs.observe(el));
  } else {
    statEls.forEach((el) => {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
  }

  /* ─── PORTFOLIO DRAG SCROLL ─── */
  const portfolioScroll = document.getElementById('portfolio-scroll');
  if (portfolioScroll) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    portfolioScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - portfolioScroll.offsetLeft;
      startScrollLeft = portfolioScroll.scrollLeft;
      portfolioScroll.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      portfolioScroll.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - portfolioScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      portfolioScroll.scrollLeft = startScrollLeft - walk;
    });

    /* touch support */
    let touchStartX = 0;
    let touchStartScrollLeft = 0;

    portfolioScroll.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchStartScrollLeft = portfolioScroll.scrollLeft;
    }, { passive: true });

    portfolioScroll.addEventListener('touchmove', (e) => {
      const dx = touchStartX - e.touches[0].pageX;
      portfolioScroll.scrollLeft = touchStartScrollLeft + dx;
    }, { passive: true });
  }

  /* ─── BOOKING FORM → WHATSAPP ─── */
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const vehiculo = form.vehiculo.value.trim();
      const servicio = form.servicio.value;
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !telefono || !vehiculo || !servicio) return;

      const text = encodeURIComponent(
        `Hola, quiero agendar una cita:\n\n` +
        `*Nombre:* ${nombre}\n` +
        `*Teléfono:* ${telefono}\n` +
        `*Vehículo:* ${vehiculo}\n` +
        `*Servicio:* ${servicio}\n` +
        `*Detalles:* ${mensaje || '—'}`
      );

      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', { service: servicio });
      }

      window.open(`https://wa.me/573013940718?text=${text}`, '_blank');
    });
  }

  /* ─── WHATSAPP FLOAT DELAY ─── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'scale(0.5)';
    waFloat.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.transform = 'scale(1)';
    }, 2000);
  }

  /* ─── FOOTER YEAR ─── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
