// app.js

document.addEventListener('DOMContentLoaded', () => {
  const page = new MagicCamPage();
  page.init();
});

class MagicCamPage {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('[data-nav-toggle]');
    this.navMenu = document.querySelector('[data-nav-menu]');
    this.scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    this.heroSection = document.querySelector('.hero');
    this.heroBadge = document.querySelector('.hero-badge');
    this.heroTitle = document.querySelector('.hero-title');
    this.heroDescription = document.querySelector('.hero-description');
    this.heroPrimaryCta = document.querySelector('.hero-cta-primary');
    this.heroSecondaryCta = document.querySelector('.hero-cta-secondary');
    this.heroMedia = document.querySelector('.hero-media');

    this.faqItems = document.querySelectorAll('[data-faq-item]');
  }

  init() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP no está cargado, se usará el fallback simple de animaciones.');
      this.fallbackAnimations();
      this.initNavbar();
      this.initSmoothScroll();
      this.initFAQAccordion();
      return;
    }

    // Si GSAP está disponible, lo marcamos en el body
    document.body.classList.add('gsap-loaded');

    // Registrar ScrollTrigger si existe
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    this.initNavbar();
    this.initSmoothScroll();
    this.initFAQAccordion();
    this.initHeroAnimations();
    this.initSectionRevealAnimations();
    this.initCardsAnimations();
  }

  // ==========================
  // NAVBAR & SCROLL
  // ==========================

  initNavbar() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => {
        const expanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', String(!expanded));
        this.navMenu.classList.toggle('is-open');
      });
    }

    // Cambiar estilo de navbar al hacer scroll
    window.addEventListener('scroll', () => {
      if (!this.navbar) return;
      if (window.scrollY > 10) {
        this.navbar.classList.add('navbar-scrolled');
      } else {
        this.navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  initSmoothScroll() {
    if (!this.scrollLinks || this.scrollLinks.length === 0) return;

    this.scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;

        const targetEl = document.querySelector(href);
        if (!targetEl) return;

        e.preventDefault();

        const headerOffset = this.navbar ? this.navbar.offsetHeight : 0;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset - 16;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (this.navMenu && this.navMenu.classList.contains('is-open')) {
          this.navMenu.classList.remove('is-open');
          if (this.navToggle) {
            this.navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // ==========================
  // HERO ANIMATIONS
  // ==========================

  initHeroAnimations() {
    if (!this.heroSection || typeof gsap === 'undefined') return;

    // Aseguramos que el estado inicial coincida con el CSS:
    // opacity: 0 y algo de translate para los elementos que entran.
    gsap.set(
      [
        this.heroBadge,
        this.heroTitle,
        this.heroDescription,
        this.heroPrimaryCta,
        this.heroSecondaryCta,
        this.heroMedia
      ].filter(Boolean),
      { opacity: 0, y: 20 }
    );

    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: 'power3.out' }
    });

    if (this.heroBadge) {
      tl.to(this.heroBadge, { opacity: 1, y: 0 });
    }

    if (this.heroTitle) {
      tl.to(this.heroTitle, { opacity: 1, y: 0 }, '-=0.4');
    }

    if (this.heroDescription) {
      tl.to(this.heroDescription, { opacity: 1, y: 0 }, '-=0.4');
    }

    const ctas = [this.heroPrimaryCta, this.heroSecondaryCta].filter(Boolean);
    if (ctas.length) {
      tl.to(ctas, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.4');
    }

    if (this.heroMedia) {
      tl.to(this.heroMedia, { opacity: 1, y: 0 }, '-=0.5');
    }
  }

  // ==========================
  // SCROLL REVEAL SECTIONS
  // ==========================

  initSectionRevealAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sections = document.querySelectorAll('[data-section]');
    if (!sections.length) return;

    sections.forEach(section => {
      const elements = section.querySelectorAll('[data-aos]');
      if (!elements.length) return;

      // Estado inicial para que gsap.to tenga de dónde partir
      gsap.set(elements, { opacity: 0, y: 30 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true
        }
      });
    });
  }

  // ==========================
  // CARDS (SERVICIOS, PASOS, TESTIMONIOS, ETC.)
  // ==========================

  initCardsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Ejemplo: tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card[data-aos]');
    if (serviceCards.length) {
      gsap.set(serviceCards, { opacity: 0, y: 40 });

      gsap.to(serviceCards, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    // Ejemplo: pasos
    const stepCards = document.querySelectorAll('.step-card[data-aos]');
    if (stepCards.length) {
      gsap.set(stepCards, { opacity: 0, y: 40 });

      gsap.to(stepCards, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.steps-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    // Ejemplo: eventos
    const eventCards = document.querySelectorAll('.event-card[data-aos]');
    if (eventCards.length) {
      gsap.set(eventCards, { opacity: 0, y: 40 });

      gsap.to(eventCards, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.events-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    // Ejemplo: testimonios
    const testimonialCards = document.querySelectorAll('.testimonial-card[data-aos]');
    if (testimonialCards.length) {
      gsap.set(testimonialCards, { opacity: 0, y: 40 });

      gsap.to(testimonialCards, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-section, .testimonials-grid',
          start: 'top 75%',
          once: true
        }
      });
    }
  }

  // ==========================
  // FAQ
  // ==========================

  initFAQAccordion() {
    if (!this.faqItems || this.faqItems.length === 0) return;

    this.faqItems.forEach(item => {
      const button = item.querySelector('[data-faq-trigger]');
      const content = item.querySelector('[data-faq-content]');

      if (!button || !content) return;

      button.addEventListener('click', () => {
        const isExpanded = item.classList.contains('is-open');

        // Cerrar todos
        this.faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherButton = other.querySelector('[data-faq-trigger]');
            const otherContent = other.querySelector('[data-faq-content]');
            if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
            if (otherContent) {
              otherContent.style.maxHeight = null;
            }
          }
        });

        // Toggle actual
        item.classList.toggle('is-open', !isExpanded);
        button.setAttribute('aria-expanded', String(!isExpanded));

        if (!isExpanded) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }

  // ==========================
  // FALLBACK SIN GSAP
  // ==========================

  fallbackAnimations() {
    // Si no hay JS avanzado, al menos mostramos los elementos con data-aos
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
      el.classList.add('aos-animate');
    });
  }
}
