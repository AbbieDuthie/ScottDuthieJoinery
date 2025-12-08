// ==============================
// Master JS for Site (All Pages)
// ==============================
document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------
  // Mobile nav toggle with slide-in panel
  // ------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const mobilePanel = document.querySelector('.mobile-menu-panel');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (navToggle && mobilePanel && overlay) {
    const openMenu = () => {
      navToggle.classList.add('open');
      mobilePanel.classList.add('open');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
    };

    const closeMenu = () => {
      navToggle.classList.remove('open');
      mobilePanel.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    navToggle.addEventListener('click', () => {
      mobilePanel.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  // ------------------------------
  // Set current year dynamically
  // ------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ------------------------------
  // Smooth scroll for anchor links
  // ------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ------------------------------
  // Intersection Observer for animations
  // ------------------------------
  const observerOptions = { threshold: 0.1 };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Animate section titles & brief text (About page)
        if (el.classList.contains('section-title') || el.classList.contains('brief-text')) {
          el.classList.add('animate');
        }

        // Animate service cards (About page)
        if (el.classList.contains('service-card')) {
          el.classList.add('visible');
        }

        // Animate photo cards with stagger (About page)
        if (el.classList.contains('photo-card')) {
          const delay = Number(el.dataset.index) * 150;
          setTimeout(() => el.classList.add('visible'), delay);
        }

        // Animate project cards with stagger (Projects page)
        if (el.classList.contains('project-card')) {
          const delay = Number(el.dataset.index) * 150;
          setTimeout(() => el.classList.add('visible'), delay);
        }

        observer.unobserve(el);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // ------------------------------
  // Observe About page elements
  // ------------------------------
  document.querySelectorAll('.section-title, .brief-text').forEach(el => observer.observe(el));
  document.querySelectorAll('.service-card').forEach(el => observer.observe(el));
  document.querySelectorAll('.photo-card').forEach((el, idx) => {
    el.dataset.index = idx;
    observer.observe(el);
  });

  // ------------------------------
  // Observe Projects page elements
  // ------------------------------
  document.querySelectorAll('.project-card').forEach((el, idx) => {
    el.dataset.index = idx;
    observer.observe(el);
  });

  // ------------------------------
  // Initialize Glightbox for projects
  // ------------------------------
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

});
