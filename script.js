const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.06, rootMargin: '0px 0px -8% 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const enhancementStyles = document.createElement('link');
enhancementStyles.rel = 'stylesheet';
enhancementStyles.href = 'enhancements.css';
document.head.appendChild(enhancementStyles);

document.querySelectorAll('a[href="http://thedatanarrator.com"]').forEach(link => {
  link.href = 'https://thedatanarrator.com';
});

const heroActions = document.querySelector('.hero-actions');
if (heroActions && !heroActions.querySelector('[href="brief.html"]')) {
  const briefLink = document.createElement('a');
  briefLink.className = 'button secondary';
  briefLink.href = 'brief.html';
  briefLink.textContent = 'Brief the challenge';
  heroActions.appendChild(briefLink);
}

const servicesNote = document.querySelector('.services-note');
if (servicesNote) {
  const panel = document.createElement('aside');
  panel.className = 'brief-panel';
  panel.innerHTML = `
    <strong>Start without writing a polished consultancy brief.</strong>
    <p>Describe what is happening, what is at stake, who sees it differently and why the picture has become difficult to hold.</p>
    <a href="brief.html">Use the structured problem brief</a>`;
  servicesNote.appendChild(panel);
}

const evidenceCopy = document.querySelector('.evidence-copy');
if (evidenceCopy) {
  const panel = document.createElement('aside');
  panel.className = 'brief-panel';
  panel.innerHTML = `
    <strong>A bounded first purchase—not an open-ended transformation programme.</strong>
    <p>Put It on the Wall is designed to create a shared diagnosis, agreed priorities and a credible basis for action before anyone commits to a larger intervention.</p>
    <a href="brief.html">See whether the problem fits</a>`;
  evidenceCopy.appendChild(panel);
}

const contactLinks = document.querySelector('.contact-links');
if (contactLinks && !contactLinks.querySelector('[href="brief.html"]')) {
  const briefCard = document.createElement('a');
  briefCard.href = 'brief.html';
  briefCard.innerHTML = '<span>Structured brief</span><strong>Put the situation into words</strong><b>↗</b>';
  contactLinks.prepend(briefCard);
}
