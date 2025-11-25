// app.js
// Lógica básica de interacción para 13Bodas.com

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#site-nav');
  const navLinks = document.querySelectorAll('#site-nav a[href^="#"]');
  const yearSpan = document.querySelector('#year');
  const contactForm = document.querySelector('.contact-form');

  /* =========================================
   *  AÑO DEL FOOTER
   * ======================================= */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =========================================
   *  MENÚ MOBILE
   * ======================================= */
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar el menú al hacer click en un enlace del nav
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================
   *  SCROLL SUAVE EN ENLACES INTERNOS
   * ======================================= */
  const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  internalLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* =========================================
   *  VALIDACIÓN BÁSICA DEL FORMULARIO
   *  (solo UX; integra tu backend después)
   * ======================================= */
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const nombre = contactForm.querySelector('#nombre');
      const email = contactForm.querySelector('#email');
      const tipoEvento = contactForm.querySelector('#tipo-evento');
      const serviciosInteres = contactForm.querySelector('#servicios-interes');

      let isValid = true;

      // helper para marcar errores simples
      const markError = (field, hasError) => {
        if (!field) return;
        if (hasError) {
          field.classList.add('has-error');
        } else {
          field.classList.remove('has-error');
        }
      };

      markError(nombre, !nombre.value.trim());
      markError(email, !email.value.trim());
      markError(tipoEvento, !tipoEvento.value);
      markError(serviciosInteres, !serviciosInteres.value);

      if (!nombre.value.trim()
        || !email.value.trim()
        || !tipoEvento.value
        || !serviciosInteres.value) {
        isValid = false;
      }

      if (!isValid) {
        alert('Por favor, completa los campos obligatorios para poder enviarte una cotización.');
        return;
      }

      // Aquí más adelante puedes reemplazar esto con un fetch() a tu backend o servicio de correo.
      alert('¡Gracias! Hemos recibido tu solicitud de cotización. Te contactaremos muy pronto.');
      contactForm.reset();
    });
  }
});
