(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const contactForm = document.getElementById('contactForm');

  // Header scroll effect
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  menuToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('nav--open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav--open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    '.service-card, .trust-card, .pricing-card, .section__header, .about-grid__content, .contact-grid__info'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // Contact form – opens mailto
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service');
    const serviceLabel = service.options[service.selectedIndex].text;
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Yhteydenotto – ' + (serviceLabel !== 'Valitse palvelu' ? serviceLabel : 'Yleinen'));
    const body = encodeURIComponent(
      'Nimi: ' + name + '\n' +
      'Puhelin: ' + (phone || '–') + '\n' +
      'Sähköposti: ' + email + '\n' +
      'Palvelu: ' + (serviceLabel !== 'Valitse palvelu' ? serviceLabel : '–') + '\n\n' +
      message
    );

    window.location.href = 'mailto:asiakaspalvelu@espoonputki.fi?subject=' + subject + '&body=' + body;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
