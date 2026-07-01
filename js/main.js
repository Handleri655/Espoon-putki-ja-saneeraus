(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const contactForm = document.getElementById('contactForm');
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('testimonialDots');

  // Header scroll
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('nav--open');
      menuToggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form
  if (contactForm) {
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
  }

  // Testimonial slider
  if (track && dotsContainer) {
    const slides = track.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoplay;

    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' testimonial-dot--active' : '');
      dot.setAttribute('aria-label', 'Arvostelu ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('testimonial-dot--active', i === current);
      });
      resetAutoplay();
    }

    function resetAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(function () { goTo(current + 1); }, 6000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    resetAutoplay();
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
