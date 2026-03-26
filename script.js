/**
 * MDAHOMA IDRISSE — Portfolio JavaScript
 * Features:
 *  - Navbar scroll behavior
 *  - Mobile menu toggle
 *  - Typing animation (hero title)
 *  - Scroll-triggered reveal animations
 *  - Skill bar animations
 *  - Scroll-to-top button
 *  - Active nav link highlight
 */

'use strict';

/* ─── DOM References ─────────────────────────────────────── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const typingTarget = document.getElementById('typing-target');

/* ─── Navbar: scroll class ───────────────────────────────── */
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide scroll-to-top button
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  updateActiveNavLink();
}, { passive: true });

/* ─── Mobile menu toggle ─────────────────────────────────── */
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close mobile menu when a link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ─── Scroll to top ──────────────────────────────────────── */
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Typing animation ───────────────────────────────────── */
const phrases = [
  'Python Backend Developer',
  'Django & REST API Specialist',
  'AI-Driven App Builder',
  'LLM & Prompt Engineer',
];

let phraseIndex   = 0;
let charIndex     = 0;
let isDeleting    = false;
let typingTimeout = null;

/**
 * Core typing tick — types forward then deletes,
 * cycling through `phrases`.
 */
function typeTick() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Type forward
    charIndex++;
    typingTarget.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === currentPhrase.length) {
      // Pause at end before deleting
      isDeleting = true;
      typingTimeout = setTimeout(typeTick, 1800);
    } else {
      typingTimeout = setTimeout(typeTick, 60 + Math.random() * 30);
    }
  } else {
    // Delete backward
    charIndex--;
    typingTarget.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingTimeout = setTimeout(typeTick, 500);
    } else {
      typingTimeout = setTimeout(typeTick, 35);
    }
  }
}

// Start after a short delay for the hero entry animation to settle
setTimeout(typeTick, 1200);

/* ─── Scroll reveal (IntersectionObserver) ───────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        revealObserver.unobserve(el);
      }
    });
  },
  {
    threshold:  0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ─── Skill bar animations ───────────────────────────────── */
/**
 * When a skill card becomes visible, animate its bars
 * by reading `data-w` (target width percentage).
 */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach((fill, i) => {
          const targetWidth = fill.dataset.w || '0';
          // Stagger each bar slightly
          setTimeout(() => {
            fill.style.width = targetWidth + '%';
          }, 200 + i * 100);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-card').forEach(card => {
  barObserver.observe(card);
});

/* ─── Active nav link highlight ──────────────────────────── */
const sections     = document.querySelectorAll('section[id], header[id]');
const navLinks     = document.querySelectorAll('.nav-link');
const mobileLinks  = document.querySelectorAll('.mobile-link');

function updateActiveNavLink() {
  let currentSection = '';
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  mobileLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ─── Smooth anchor clicks (fallback for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

/* ─── Subtle parallax on hero orbs ──────────────────────── */
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;  // -1 to 1
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
}, { passive: true });

/* ─── Initial page-load setup ────────────────────────────── */
// Run once to catch any already-visible elements
updateActiveNavLink();
