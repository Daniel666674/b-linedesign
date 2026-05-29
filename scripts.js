/* B-LINE DESIGN — Main Scripts (Multi-Page) */

(function () {
  'use strict';

  /* ─── PAGE DETECTION ─── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = currentFile === 'index.html' || currentFile === '';

  /* ─── ACTIVE NAV ─── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentFile) link.classList.add('active');
  });

  /* ─── PRELOADER ─── */
  const preloader = document.getElementById('preloader');
  document.body.style.overflow = 'hidden';

  const delay = isHome ? 1600 : 900;

  function dismissPreloader() {
    preloader.classList.add('done');
    document.body.style.overflow = '';
    // Trigger hero animations only if hero section exists (index page)
    if (document.querySelector('.hero')) {
      setTimeout(() => {
        document.body.classList.add('hero-ready');
      }, 200);
    }
    setTimeout(() => preloader.remove(), 1200);
  }

  if (document.readyState === 'complete') {
    setTimeout(dismissPreloader, delay);
  } else {
    window.addEventListener('load', () => setTimeout(dismissPreloader, delay));
  }

  /* ─── CUSTOM CURSOR ─── */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && !('ontouchstart' in window)) {
    document.body.classList.add('has-cursor');

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px,${my}px)`;
    }, { passive: true });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      cursorRing.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  }

  /* ─── SCROLL PROGRESS ─── */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar) progressBar.style.width = ((scrolled / max) * 100) + '%';
  }, { passive: true });

  /* ─── NAV SCROLL ─── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ─── LOGO CLICK: scroll to top on home, navigate on other pages ─── */
  const navLogoLink = document.getElementById('nav-logo-link');
  if (navLogoLink) {
    navLogoLink.addEventListener('click', (e) => {
      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // On other pages: navigate normally (no preventDefault)
    });
  }

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
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ─── HERO VIDEO (only runs if hero elements exist) ─── */
  const heroVideo = document.getElementById('hero-video');
  const heroImg = document.getElementById('hero-img');

  if (heroVideo) {
    heroVideo.style.position = 'absolute';
    heroVideo.style.inset = '0';
    heroVideo.style.width = '100%';
    heroVideo.style.height = '100%';
    heroVideo.style.objectFit = 'cover';
    heroVideo.style.opacity = '0';
    heroVideo.style.transition = 'opacity 1.4s ease';

    heroVideo.addEventListener('canplay', () => {
      heroVideo.style.opacity = '1';
      if (heroImg) {
        heroImg.style.opacity = '0';
        heroImg.style.transition = 'opacity 1.4s ease';
      }
    }, { once: true });
  }

  /* ─── PARALLAX HERO (only runs if hero-bg exists) ─── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) return;
      heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }, { passive: true });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─── ANIMATED COUNTERS ─── */
  const statEls = document.querySelectorAll('.stat-number[data-count]');

  function animateCounter(el) {
    const end = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(eased * end) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => cObs.observe(el));
  } else {
    statEls.forEach(el => {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
  }

  /* ─── PORTFOLIO DRAG SCROLL ─── */
  const portfolioScroll = document.getElementById('portfolio-scroll');
  if (portfolioScroll) {
    let isDragging = false, startX = 0, startScrollLeft = 0;

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
      portfolioScroll.scrollLeft = startScrollLeft - (x - startX) * 1.5;
    });

    let touchStartX = 0, touchStartSL = 0;
    portfolioScroll.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchStartSL = portfolioScroll.scrollLeft;
    }, { passive: true });
    portfolioScroll.addEventListener('touchmove', (e) => {
      portfolioScroll.scrollLeft = touchStartSL + (touchStartX - e.touches[0].pageX);
    }, { passive: true });
  }

  /* ─── SERVICE CARD 3D TILT ─── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.remove('tilt-reset');
    });
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.classList.add('tilt-reset');
      card.style.transform = '';
    });
  });

  /* ─── MAGNETIC BUTTONS ─── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── BOOKING FORM → WHATSAPP ─── */
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = form.nombre.value.trim();
      const t = form.telefono.value.trim();
      const v = form.vehiculo.value.trim();
      const s = form.servicio.value;
      const m = form.mensaje.value.trim();
      if (!n || !t || !v || !s) return;
      const text = encodeURIComponent(
        `Hola, quiero agendar una cita:\n\n*Nombre:* ${n}\n*Teléfono:* ${t}\n*Vehículo:* ${v}\n*Servicio:* ${s}\n*Detalles:* ${m || '—'}`
      );
      if (typeof gtag !== 'undefined') gtag('event', 'form_submit', { service: s });
      window.open(`https://wa.me/573013940718?text=${text}`, '_blank');
    });
  }

  /* ─── WHATSAPP FLOAT ─── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.transform = 'scale(0.4)';
    waFloat.style.transition = 'all 0.6s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => {
      waFloat.style.opacity = '1';
      waFloat.style.transform = 'scale(1)';
    }, 3000);
  }

  /* ─── FOOTER YEAR ─── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
