/* ============================
   SANDAL ASHFAQ — AI PORTFOLIO
   External JavaScript (script.js)
   ============================ */

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger based on sibling index
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      const delay = parseFloat(entry.target.style.animationDelay) || index * 0.08;

      setTimeout(() => {
        entry.target.classList.add('active');
      }, delay * 1000);

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

// Trigger hero elements immediately
document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach((el, i) => {
  setTimeout(() => el.classList.add('active'), 200 + i * 150);
});

// --- HEADER SCROLL EFFECT ---
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- SMOOTH SCROLL FOR NAV ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- ACTIVE NAV HIGHLIGHT ---
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent1)';
      link.style.background = 'rgba(200,191,168,0.08)';
    }
  });
});

// --- CONTACT FORM SUBMIT ---
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const original = btn.innerHTML;
    btn.innerHTML = 'Sent! ✓';
    btn.style.background = 'linear-gradient(90deg, #4a7c59, #6aad7a)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// --- CURSOR GLOW (subtle) ---
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200,191,168,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.4s ease, top 0.4s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});
