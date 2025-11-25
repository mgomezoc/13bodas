// Año dinámico en footer (opcional)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========================
// GSAP + ScrollTrigger
// ========================
if (typeof gsap === 'undefined') {
  console.warn('GSAP no está cargado. Revisa el CDN.');
} else {
  gsap.registerPlugin(ScrollTrigger);

  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    markers: false,
  });

  // ========================
  // NAV RESPONSIVE
  // ========================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header con clase .scrolled
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
  }

  // Scroll suave con offset por header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector('header')?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Helper
  const animateElement = (element, animationProps, triggerProps = {}) => {
    gsap.set(element, { opacity: 1, visibility: 'visible' });

    return gsap.from(element, {
      ...animationProps,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none none',
        once: true,
        ...triggerProps,
      },
    });
  };

  // HERO simple (titulo, subtitulo, botón, etc)
  const heroElements = [
    { selector: '.gsap-fade-in', delay: 0 },
    { selector: '.gsap-fade-up-delay-1', delay: 0.2 },
    { selector: '.gsap-fade-up-delay-2', delay: 0.4 },
    { selector: '.gsap-fade-up-delay-3', delay: 0.6 },
  ];

  heroElements.forEach(({ selector, delay }) => {
    const element = document.querySelector(selector);
    if (element) {
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }
  });

  const heroVisual = document.querySelector('.gsap-scale-in');
  if (heroVisual) {
    gsap.from(heroVisual, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'back.out(1.3)',
      clearProps: 'all',
    });
  }

  // Secciones genéricas
  gsap.utils.toArray('.section-header').forEach((hdr) => {
    animateElement(hdr, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.gsap-card').forEach((card) => {
    animateElement(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Parallax simple para hero (opcional)
  ScrollTrigger.matchMedia({
    '(min-width: 769px)': function () {
      const heroGlow1 = document.querySelector('.hero-glow-orb');
      if (heroGlow1) {
        gsap.to(heroGlow1, {
          y: -20,
          x: 10,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    },
  });

  // Refrescar ScrollTrigger al cargar
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
