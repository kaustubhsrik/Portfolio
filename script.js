/**
 * Portfolio — Scroll animations, smooth navigation, active link tracking
 * Vanilla JS, no dependencies.
 */

(function () {
  'use strict';

  // ============ SCROLL REVEAL ============

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  // ============ ACTIVE NAV LINK ============

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

    if (isAtBottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLinks.length > 0) {
        navLinks[navLinks.length - 1].classList.add('active');
      }
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  // ============ MOBILE MENU ============

  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }


  // ============ NAV BACKGROUND ON SCROLL ============

  const nav = document.getElementById('nav');

  function updateNavBackground() {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
      nav.style.borderBottomColor = 'transparent';
    }
  }

  window.addEventListener('scroll', updateNavBackground, { passive: true });
  updateNavBackground();


  // ============ SMOOTH SCROLL FOR NAV LINKS ============

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetEl.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
})();
