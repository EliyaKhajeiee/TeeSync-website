/* =============================================
   TeeSync — main.js
   ============================================= */

// ---- Nav scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Active nav link ----
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- Enhanced scroll reveal (blur + slide) ----
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => {
  const parent = el.parentElement;
  if (parent && (
    parent.classList.contains('features-grid') ||
    parent.classList.contains('courses-grid') ||
    parent.classList.contains('steps-grid') ||
    parent.classList.contains('how-more-grid') ||
    parent.classList.contains('founders-grid') ||
    parent.classList.contains('testimonials-list')
  )) {
    const siblings = Array.from(parent.querySelectorAll('.fade-in'));
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 0.11}s`;
  }
  fadeObserver.observe(el);
});

// ---- Cursor spotlight on dark sections ----
document.querySelectorAll('.hero, .features-dark, .cta-band').forEach(section => {
  const glow = document.createElement('div');
  glow.className = 'cursor-spotlight';
  section.prepend(glow);

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    glow.style.left    = (e.clientX - rect.left) + 'px';
    glow.style.top     = (e.clientY - rect.top)  + 'px';
    glow.style.opacity = '1';
  }, { passive: true });

  section.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
});

// ---- Magnetic buttons ----
document.querySelectorAll('.btn-hero, .nav-waitlist').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.1s linear, background 0.22s, box-shadow 0.22s';
  });

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), background 0.22s, box-shadow 0.22s';
    btn.style.transform  = '';
    setTimeout(() => { btn.style.transition = ''; }, 600);
  });
});

// ---- 3D card tilt ----
document.querySelectorAll('.feature-card, .course-card, .step-card, .founder-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transition = 'transform 0.08s linear, background 0.25s, box-shadow 0.25s';
    card.style.transform  = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(8px)`;
    card.style.boxShadow  = `${-x * 12}px ${-y * 12}px 32px rgba(0,0,0,0.12)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), background 0.25s, box-shadow 0.5s';
    card.style.transform  = '';
    card.style.boxShadow  = '';
  });
});

// ---- Hero parallax (phones shift on scroll) ----
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (s < window.innerHeight * 1.2) {
      heroVisual.style.transform = `translateY(${s * 0.1}px)`;
    }
  }, { passive: true });
}

// ---- Testimonial item hover highlight ----
document.querySelectorAll('.testimonial-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'padding-left 0.3s var(--ease)';
    item.style.paddingLeft = '16px';
  });
  item.addEventListener('mouseleave', () => {
    item.style.paddingLeft = '';
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Contact form → mailto ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = contactForm.querySelector('[name="name"]').value.trim();
    const subject = contactForm.querySelector('[name="subject"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();
    const body    = `Name: ${name}\n\n${message}`;
    window.location.href = `mailto:info@tee-sync.com?subject=${encodeURIComponent(subject || 'TeeSync Inquiry')}&body=${encodeURIComponent(body)}`;
  });
}
