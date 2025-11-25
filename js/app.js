/**
 * 13BODAS - MAIN JAVASCRIPT
 * Dark Luxury Tech Experience
 */

(function() {
  'use strict';

  // ===========================================
  // UTILS & HELPERS
  // ===========================================

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ===========================================
  // NAVIGATION
  // ===========================================

  class Navigation {
    constructor() {
      this.header = $('#header');
      this.navToggle = $('#navToggle');
      this.navMenu = $('#navMenu');
      this.navLinks = $$('.nav-link, .nav-cta');
      this.lastScroll = 0;

      this.init();
    }

    init() {
      this.setupScrollHeader();
      this.setupMobileMenu();
      this.setupSmoothScroll();
      this.setupActiveLink();
    }

    setupScrollHeader() {
      window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
      }, 10));
    }

    setupMobileMenu() {
      if (!this.navToggle) return;

      this.navToggle.addEventListener('click', () => {
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';

        this.navToggle.setAttribute('aria-expanded', !isExpanded);
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
      });

      // Close menu when clicking on a link
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.navToggle.classList.remove('active');
          this.navMenu.classList.remove('active');
          this.navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
          this.navToggle.classList.remove('active');
          this.navMenu.classList.remove('active');
          this.navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    setupSmoothScroll() {
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');

          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);

            if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }

    setupActiveLink() {
      const sections = $$('section[id]');

      window.addEventListener('scroll', debounce(() => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 100;
          const sectionId = section.getAttribute('id');
          const navLink = $(`.nav-link[href="#${sectionId}"]`);

          if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            $$('.nav-link').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
          }
        });
      }, 100));
    }
  }

  // ===========================================
  // GSAP ANIMATIONS
  // ===========================================

  class Animations {
    constructor() {
      this.init();
    }

    init() {
      // Check if GSAP is loaded
      if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, animations disabled');
        this.fallbackAnimations();
        return;
      }

      // Register ScrollTrigger plugin
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      this.setupHeroAnimations();
      this.setupScrollAnimations();
      this.setupParallaxEffects();
    }

    setupHeroAnimations() {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.6
      })
      .from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-stats', {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.3')
      .from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.3')
      .from('.hero-visual', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8
      }, '-=0.6')
      .from('.scroll-indicator', {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.4');
    }

    setupScrollAnimations() {
      // Fade up animations
      gsap.utils.toArray('[data-aos="fade-up"]').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Fade right animations
      gsap.utils.toArray('[data-aos="fade-right"]').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Fade left animations
      gsap.utils.toArray('[data-aos="fade-left"]').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Zoom in animations
      gsap.utils.toArray('[data-aos="zoom-in"]').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Service cards stagger
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Package cards stagger
      gsap.from('.package-card', {
        scrollTrigger: {
          trigger: '.packages-grid',
          start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Testimonial cards stagger
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    setupParallaxEffects() {
      // Phone mockup parallax
      gsap.to('.phone-mockup', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 100,
        ease: 'none'
      });

      // Hero glow parallax
      gsap.to('.hero-glow', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 150,
        scale: 1.3,
        ease: 'none'
      });
    }

    fallbackAnimations() {
      // Simple CSS class-based animations for browsers without GSAP
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      }, {
        threshold: 0.1
      });

      $$('[data-aos]').forEach(el => observer.observe(el));
    }
  }

  // ===========================================
  // FORM HANDLING
  // ===========================================

  class FormHandler {
    constructor() {
      this.form = $('#contactForm');
      this.init();
    }

    init() {
      if (!this.form) return;

      this.setupFormValidation();
      this.setupFormSubmit();
    }

    setupFormValidation() {
      const inputs = this.form.querySelectorAll('input, select, textarea');

      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearError(input));
      });
    }

    validateField(field) {
      if (field.hasAttribute('required') && !field.value.trim()) {
        this.showError(field, 'Este campo es obligatorio');
        return false;
      }

      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          this.showError(field, 'Por favor ingresa un email válido');
          return false;
        }
      }

      if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(field.value)) {
          this.showError(field, 'Por favor ingresa un teléfono válido');
          return false;
        }
      }

      this.clearError(field);
      return true;
    }

    showError(field, message) {
      this.clearError(field);

      field.classList.add('error');
      const errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.style.color = '#ff4444';
      errorEl.style.fontSize = '0.875rem';
      errorEl.style.marginTop = '0.25rem';
      errorEl.textContent = message;

      field.parentElement.appendChild(errorEl);
    }

    clearError(field) {
      field.classList.remove('error');
      const errorEl = field.parentElement.querySelector('.field-error');
      if (errorEl) {
        errorEl.remove();
      }
    }

    setupFormSubmit() {
      this.form.addEventListener('submit', (e) => {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
          if (!this.validateField(input)) {
            isValid = false;
          }
        });

        if (!isValid) {
          e.preventDefault();

          // Scroll to first error
          const firstError = this.form.querySelector('.error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          return false;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('.btn-submit');
        if (submitBtn) {
          submitBtn.textContent = 'Enviando...';
          submitBtn.disabled = true;
        }
      });
    }
  }

  // ===========================================
  // PERFORMANCE OPTIMIZATIONS
  // ===========================================

  class PerformanceOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.lazyLoadImages();
      this.prefetchLinks();
    }

    lazyLoadImages() {
      const images = $$('img[loading="lazy"]');

      if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading natively
        return;
      }

      // Fallback for browsers that don't support lazy loading
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    prefetchLinks() {
      // Prefetch important links on hover
      const links = $$('a[href^="http"]');

      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = link.href;
          document.head.appendChild(prefetchLink);
        }, { once: true });
      });
    }
  }

  // ===========================================
  // UTILITY FEATURES
  // ===========================================

  class UtilityFeatures {
    constructor() {
      this.init();
    }

    init() {
      this.setupYearUpdate();
      this.setupPhoneLinks();
      this.setupExternalLinks();
    }

    setupYearUpdate() {
      const yearEl = $('#year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
    }

    setupPhoneLinks() {
      // Ensure phone links work properly
      const phoneLinks = $$('a[href^="tel:"]');
      phoneLinks.forEach(link => {
        link.setAttribute('rel', 'nofollow');
      });
    }

    setupExternalLinks() {
      // Add security attributes to external links
      const externalLinks = $$('a[target="_blank"]');
      externalLinks.forEach(link => {
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  }

  // ===========================================
  // ANALYTICS & TRACKING
  // ===========================================

  class Analytics {
    constructor() {
      this.init();
    }

    init() {
      this.trackCTAClicks();
      this.trackFormInteractions();
      this.trackScrollDepth();
    }

    trackCTAClicks() {
      const ctaButtons = $$('.btn-primary, .btn-secondary, .nav-cta');

      ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const text = btn.textContent.trim();
          this.sendEvent('CTA Click', text);
        });
      });
    }

    trackFormInteractions() {
      const form = $('#contactForm');
      if (!form) return;

      form.addEventListener('submit', () => {
        this.sendEvent('Form', 'Submit');
      });
    }

    trackScrollDepth() {
      let maxScroll = 0;
      const milestones = [25, 50, 75, 100];

      window.addEventListener('scroll', debounce(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        milestones.forEach(milestone => {
          if (scrollPercentage >= milestone && maxScroll < milestone) {
            maxScroll = milestone;
            this.sendEvent('Scroll Depth', `${milestone}%`);
          }
        });
      }, 500));
    }

    sendEvent(category, action) {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          'event_category': category
        });
      }

      // Console log for debugging
      console.log('Event:', category, action);
    }
  }

  // ===========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ===========================================

  class AccessibilityEnhancer {
    constructor() {
      this.init();
    }

    init() {
      this.setupKeyboardNavigation();
      this.setupFocusManagement();
      this.setupARIALabels();
    }

    setupKeyboardNavigation() {
      // Escape key closes mobile menu
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const navToggle = $('#navToggle');
          const navMenu = $('#navMenu');

          if (navToggle && navToggle.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            navToggle.focus();
          }
        }
      });
    }

    setupFocusManagement() {
      // Skip to main content functionality
      const skipLink = $('.skip-link');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const mainContent = $('#main-content');
          if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
          }
        });
      }
    }

    setupARIALabels() {
      // Ensure all interactive elements have proper labels
      const buttons = $$('button:not([aria-label])');
      buttons.forEach(btn => {
        if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
          console.warn('Button without accessible label:', btn);
        }
      });
    }
  }

  // ===========================================
  // INITIALIZATION
  // ===========================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  }

  function initApp() {
    // Initialize all modules
    new Navigation();
    new Animations();
    new FormHandler();
    new PerformanceOptimizer();
    new UtilityFeatures();
    new Analytics();
    new AccessibilityEnhancer();

    // Remove loading class if exists
    document.body.classList.remove('loading');

    console.log('13Bodas initialized successfully ✨');
  }

  // Start the app
  init();

})();
