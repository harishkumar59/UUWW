// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.style.display === 'flex';
  mobileNav.style.display = isOpen ? 'none' : 'flex';
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
  });
});

// FAQ Accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const span = btn.querySelector('span');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');

  if (!isOpen) {
    answer.classList.add('open');
    span.textContent = '−';
  }
}

// Notify Form
function handleNotify(e) {
  e.preventDefault();
  const form = document.getElementById('notifyForm');
  const successMsg = document.getElementById('successMsg');
  form.style.display = 'none';
  successMsg.style.display = 'block';
}

// Animated stat counter
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count.toLocaleString() + suffix;
    if (count >= target) clearInterval(interval);
  }, 20);
}

// Intersection Observer for stats animation
const statNums = document.querySelectorAll('.stat-num');
const targets = [1200000, 4200, 38, 180];
const suffixes = ['+', '+', '', '+'];
const labels = ['12L+', '4,200+', '38', '180+'];
let statsAnimated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNums.forEach((el, i) => {
        el.textContent = labels[i]; // keep label-style display
        el.style.transform = 'scale(1.1)';
        setTimeout(() => { el.style.transform = 'scale(1)'; el.style.transition = 'transform 0.3s ease'; }, 300);
      });
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) observer.observe(statsBar);

// Scroll-in animation for cards
const cards = document.querySelectorAll('.elig-card, .info-card, .subject-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});
