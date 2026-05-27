const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { if (window.scrollY > 50) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); } });
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('open'); });
navMenu.querySelectorAll('.nav-link').forEach(link => { link.addEventListener('click', () => { hamburger.classList.remove('active'); navMenu.classList.remove('open'); }); });
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => { btn.addEventListener('click', () => { const filter = btn.dataset.filter; filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); galleryItems.forEach(item => { if (filter === 'all' || item.dataset.category === filter) { item.style.display = ''; setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; item.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; }, 50); } else { item.style.opacity = '0'; setTimeout(() => { item.style.display = 'none'; }, 350); } }); }); });
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) { contactForm.addEventListener('submit', (e) => { e.preventDefault(); const nombre = document.getElementById('nombre').value.trim(); const email = document.getElementById('email').value.trim(); const mensaje = document.getElementById('mensaje').value.trim(); if (!nombre || !email || !mensaje) { alert('Por favor rellena los campos obligatorios (*) para continuar.'); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Por favor introduce un email válido.'); return; } contactForm.classList.add('hidden'); formSuccess.classList.remove('hidden'); setTimeout(() => { window.open('https://www.instagram.com/laestamperia_cz', '_blank', 'noopener'); }, 1500); }); }
const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
document.querySelectorAll('.service-card, .gallery-item, .process-step, .testimonial-card, .dtf-feature').forEach((el, i) => { el.classList.add('fade-in'); if (i % 3 === 1) el.classList.add('fade-in-delay-1'); if (i % 3 === 2) el.classList.add('fade-in-delay-2'); observer.observe(el); });
const heroBg = document.querySelector('.hero-bg-pattern');
if (heroBg) { window.addEventListener('scroll', () => { const scrolled = window.scrollY; if (scrolled < window.innerHeight) { heroBg.style.transform = `translateY(${scrolled * 0.3}px)`; } }, { passive: true }); }