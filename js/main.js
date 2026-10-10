'use strict';
// Vega & Román Travel · Nuve Works. Sin frameworks ni dependencias externas.
// WhatsApp principal corroborado en el sitio y en el directorio AMAV.
const WHATSAPP_NUMBER = '525579380890';

document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  navLinks.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
    navLinks.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (menuToggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('.nav')) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    const destination = document.querySelector('#trip-destination').value || 'un destino por definir';
    const kind = document.querySelector('#trip-kind').value || 'un viaje por definir';
    const text = `¡Hola! Vi la página de Vega & Román Travel y quiero una cotización.\n\nDestino: ${destination}\nTipo de viaje: ${kind}\n\n¿Me pueden compartir opciones y ayudarme a planear mi viaje?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    // Navegación directa: evita bloqueadores de ventanas emergentes en móvil.
    window.location.assign(url);
  });
}

// Entrada suave de secciones. Si el navegador no soporta IntersectionObserver,
// el contenido permanece visible.
const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px 48px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// El año se actualiza automáticamente.
const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
