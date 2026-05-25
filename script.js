/* ============================================
   LA ESTAMPERÍA – Script principal
   ============================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ---- Gallery filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter items
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 350);
      }
    });
  });
});

// ---- Contact form ----
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
      alert('Por favor rellena los campos obligatorios (*) para continuar.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor introduce un email válido.');
      return;
    }

    // Build the mailto link as a fallback (no backend needed)
    const subject = encodeURIComponent(`Consulta presupuesto – ${nombre}`);
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nProducto: ${producto || 'No especificado'}\nCantidad: ${cantidad || 'No especificada'}\n\nMensaje:\n${mensaje}`
    );

    // Open Instagram DM suggestion
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');

    // Optional: try to open Instagram DM
    setTimeout(() => {
      window.open('https://www.instagram.com/laestamperia_cz', '_blank', 'noopener');
    }, 1500);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Intersection Observer for fade-in animations ----
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in to cards and sections
document.querySelectorAll('.service-card, .gallery-item, .process-step, .testimonial-card, .dtf-feature').forEach((el, i) => {
  el.classList.add('fade-in');
  if (i % 3 === 1) el.classList.add('fade-in-delay-1');
  if (i % 3 === 2) el.classList.add('fade-in-delay-2');
  observer.observe(el);
});

// ---- Smooth active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = '#e53935';
        }
      });
    }
  });
});

// ---- Stats counter animation ----
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const interval = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// ---- Parallax subtle on hero ----
const heroBg = document.querySelector('.hero-bg-pattern');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}
