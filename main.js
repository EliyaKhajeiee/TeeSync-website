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

// ---- Scroll progress bar ----
const bar = document.createElement('div');
bar.id = 'progress-bar';
Object.assign(bar.style, {
  position:   'fixed',
  top:        '0',
  left:       '0',
  height:     '2px',
  width:      '0%',
  background: 'var(--green-light)',
  zIndex:     '999',
  pointerEvents: 'none',
  transition: 'width 0.08s linear',
});
document.body.appendChild(bar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  bar.style.width = Math.min(scrolled * 100, 100) + '%';
}, { passive: true });

// ---- Stagger delays on grids ----
document.querySelectorAll(
  '.features-grid, .courses-grid, .steps-grid, .how-more-grid, .founders-grid, .testimonials-list'
).forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.11}s`;
  });
});

// ---- Intersection observer: fade-in ----
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ---- Counter animation ----
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCount(el, target, duration) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const decimals = isFloat ? (String(target).split('.')[1] || '').length : 0;
  const numeric  = parseFloat(target);

  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const v = easeOutCubic(p) * numeric;
    el.textContent = isFloat ? v.toFixed(decimals) : Math.floor(v).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = isFloat ? numeric.toFixed(decimals) : numeric.toLocaleString();
  })(start);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, el.dataset.count, 1600);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ---- 3D card tilt on hover ----
const tiltCards = document.querySelectorAll('.feature-card, .course-card, .step-card, .founder-card, .how-more-card');

tiltCards.forEach(card => {
  card.style.willChange = 'transform';

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.12s ease, box-shadow 0.25s ease, border-color 0.25s';
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const rotY =  x * 10;
    const rotX = -y * 10;
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px) scale(1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s';
    card.style.transform = '';
  });
});

// ---- Magnetic buttons ----
function applyMagnetic(selector, strength = 0.28) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease, background 0.22s, box-shadow 0.22s';
    });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * strength;
      const y = (e.clientY - rect.top  - rect.height / 2) * strength;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.22s, box-shadow 0.22s';
      btn.style.transform = '';
    });
  });
}

applyMagnetic('.btn-hero', 0.3);
applyMagnetic('.nav-waitlist', 0.25);
applyMagnetic('.btn-primary', 0.22);
applyMagnetic('.btn-outline', 0.22);

// ---- Smooth text underline draw on nav links hover ----
// (handled via CSS ::after width transition — already in place)

// ---- Hero section: subtle parallax on scroll ----
const heroSection = document.querySelector('.hero');
const heroVisual  = document.querySelector('.hero-visual');

if (heroSection && heroVisual) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.18;
      heroVisual.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}

// ---- Smooth reveal: section divider line sweep ----
// Adds a thin green underline that expands under each section heading
document.querySelectorAll('.eyebrow').forEach(el => {
  el.style.position = 'relative';
  el.style.overflow = 'visible';
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
    });

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

// ---- Cursor glow (desktop only) ----
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position:      'fixed',
    width:         '340px',
    height:        '340px',
    borderRadius:  '50%',
    background:    'radial-gradient(circle, rgba(62,207,108,0.055) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex:        '1',
    transform:     'translate(-50%, -50%)',
    transition:    'left 0.18s ease, top 0.18s ease',
    willChange:    'left, top',
  });
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}
