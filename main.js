/* ============================================
   TaxHaus — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Industry card expand/collapse ---
  document.querySelectorAll('[data-industry]').forEach(function (card) {
    card.addEventListener('click', function () {
      const wasActive = card.classList.contains('active');

      // Close all cards
      document.querySelectorAll('[data-industry]').forEach(function (c) {
        c.classList.remove('active');
      });

      // Toggle clicked card
      if (!wasActive) {
        card.classList.add('active');
      }
    });
  });

  // --- Scroll reveal animations ---
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Contact form submission ---
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var required = contactForm.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#C53030';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Disable button, show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            contactForm.style.display = 'none';
            if (formSuccess) {
              formSuccess.classList.add('show');
            }
          } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Schedule a Quick Call <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            alert('Something went wrong. Please try again or email us directly at info@taxhaus.ca');
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Schedule a Quick Call <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
          alert('Something went wrong. Please try again or email us directly at info@taxhaus.ca');
        });
    });

    // Clear red border on input focus
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('focus', function () {
        field.style.borderColor = '';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
