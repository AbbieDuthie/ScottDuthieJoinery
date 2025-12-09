// ==============================
// Master JS for Site (All Pages)
// ==============================
document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------
  // Mobile nav toggle
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
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document.querySelectorAll('.section-title, .brief-text, .service-card, .photo-card, .project-card')
    .forEach((el, idx) => {
      el.dataset.index = idx;
      observer.observe(el);
    });

  // ------------------------------
  // Initialize Glightbox if available
  // ------------------------------
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  // ------------------------------
  // EmailJS initialization
  // ------------------------------
  if (typeof emailjs !== 'undefined') {
    emailjs.init("ezOKdoRyWrNPg-sEj"); // Public key
  }

  const form = document.getElementById('quote-form');
  if (form && typeof emailjs !== 'undefined') {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const templateParams = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        location: form.location.value,
        type: form.type.value,
        budget: form.budget.value,
        timeline: form.timeline.value,
        message: form.message.value
      };

      emailjs.send('service_95fadlh', 'template_3fc0gx6', templateParams)
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
          window.location.href = 'success.html';
        })
        .catch(error => {
          console.log('FAILED...', error);
          alert("Oops! Something went wrong. Please try again.");
        });
    });
  }

});
