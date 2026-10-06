// Header: shrink after scrolling, hide when scrolling down, show when scrolling up.
const header = document.querySelector('.header');
let lastY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 50);
  header.classList.toggle('hide', y > lastY && y > 100 && !document.body.classList.contains('menu-open'));
  lastY = y;
}, { passive: true });

// Light/dark toggle (choice is remembered in localStorage).
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

function setMenu(open) {
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 768) setMenu(false); });

// Tabs (experience, education): click or arrow keys switch panels.
document.querySelectorAll('.tabs').forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll('[role="tab"]')];

  const select = (index) => {
    buttons.forEach((button, i) => {
      const active = i === index;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    });
    tabs.style.setProperty('--active', index);
  };

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => select(i));
    button.addEventListener('keydown', (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = (i + step + buttons.length) % buttons.length;
      select(next);
      buttons[next].focus();
    });
  });
});

// Fade sections in as they scroll into view.
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));
