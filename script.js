/* ============================================================
   Ho — Product Management Portfolio
   script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. NAV: scroll-shadow + mobile toggle ── */
  const navbar   = document.getElementById('navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.innerHTML = open ? '&#10005;' : '&#9776;';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      navToggle.innerHTML = '&#9776;';
    });
  });


  /* ── 2. ACTIVE NAV HIGHLIGHT via IntersectionObserver ── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            const match = a.getAttribute('href') === '#' + id ||
                          (id.startsWith('case') && a.getAttribute('href') === '#case1');
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });


  /* ── 3. SCROLL REVEAL via IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
  );

  revealEls.forEach(function (el, i) {
    // stagger children within same parent slightly
    el.style.transitionDelay = Math.min(i % 4 * 0.07, 0.21) + 's';
    revealObserver.observe(el);
  });


  /* ── 4. WHY-PM INTERACTIVE CARDS ── */
  const whyCards = document.querySelectorAll('.why-card');

  whyCards.forEach(function (card) {
    function toggle() {
      const isOpen = card.classList.contains('open');
      // close all
      whyCards.forEach(function (c) {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
      });
      // open this one if it was closed
      if (!isOpen) {
        card.classList.add('open');
        card.setAttribute('aria-expanded', 'true');
      }
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });


  /* ── 5. CASE NAV PILLS — highlight on scroll ── */
  const caseSections = document.querySelectorAll('.case-study');
  const casePills    = document.querySelectorAll('.case-nav-pill');

  if (caseSections.length && casePills.length) {
    const caseObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            casePills.forEach(function (pill) {
              pill.classList.toggle('active', pill.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    caseSections.forEach(function (s) { caseObserver.observe(s); });
  }


  /* ── 6. HERO TYPEWRITER effect for skill chips ── */
  const heroTags = document.querySelectorAll('.hero-tags .tag');
  heroTags.forEach(function (tag, i) {
    tag.style.opacity    = '0';
    tag.style.transform  = 'translateY(10px)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    tag.style.transitionDelay = (0.6 + i * 0.1) + 's';
    setTimeout(function () {
      tag.style.opacity   = '1';
      tag.style.transform = 'none';
    }, 100);
  });


  /* ── 7. SMOOTH OFFSET SCROLL (account for fixed nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
