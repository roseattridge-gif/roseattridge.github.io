document.documentElement.classList.add('js');

const menuButton = document.querySelector('[data-menu]');
const navigation = document.querySelector('[data-nav]');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/*
 * Consent-led Google Analytics setup.
 * The existing Rose Attridge GA4 property is used for the MVP so activity can
 * be separated by hostname while a dedicated Put It On The Wall stream is created.
 */
const GA_MEASUREMENT_ID = 'G-EFJ4V8H3XH';
const CONSENT_KEY = 'pitw-analytics-consent-v1';
let analyticsLoaded = false;

const safeStorage = {
  get() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch { return null; }
  },
  set(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* no-op */ }
  }
};

function loadAnalytics() {
  if (analyticsLoaded || !GA_MEASUREMENT_ID) return;
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(tag);
}

function trackEvent(name, parameters = {}) {
  if (!analyticsLoaded || typeof window.gtag !== 'function') return;
  window.gtag('event', name, parameters);
}

function addAnalyticsEventTracking() {
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener('click', () => trackEvent('generate_lead', {
      method: 'email',
      link_text: link.textContent.trim(),
      page_location: window.location.href
    }));
  });

  document.querySelectorAll('a[href="#method"]').forEach((link) => {
    link.addEventListener('click', () => trackEvent('select_content', {
      content_type: 'method',
      item_id: 'wall_method'
    }));
  });

  document.querySelectorAll('details').forEach((item, index) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      trackEvent('faq_open', {
        item_id: `faq_${index + 1}`,
        item_name: item.querySelector('summary')?.textContent.trim() || `FAQ ${index + 1}`
      });
    });
  });
}

function injectConsentStyles() {
  if (document.getElementById('pitw-consent-styles')) return;
  const style = document.createElement('style');
  style.id = 'pitw-consent-styles';
  style.textContent = `
    .pitw-consent{position:fixed;z-index:1000;left:1rem;right:1rem;bottom:1rem;max-width:780px;margin:auto;padding:1.25rem;border:2px solid #151510;background:#fffdf7;color:#151510;box-shadow:10px 10px 0 #151510;font-family:Archivo,Arial,sans-serif}
    .pitw-consent[hidden]{display:none}
    .pitw-consent strong{display:block;margin-bottom:.35rem;font-size:1.15rem;text-transform:uppercase}
    .pitw-consent p{margin:0 0 1rem;max-width:680px;font-size:.93rem}
    .pitw-consent-actions{display:flex;flex-wrap:wrap;gap:.65rem}
    .pitw-consent button,.pitw-cookie-settings{min-height:44px;padding:.7rem 1rem;border:2px solid #151510;background:#e8ff3f;color:#151510;cursor:pointer;font:600 .75rem/1 'IBM Plex Mono',monospace;text-transform:uppercase}
    .pitw-consent button[data-decline]{background:transparent}
    .pitw-consent a{font-family:'IBM Plex Mono',monospace;font-size:.72rem;text-transform:uppercase;text-underline-offset:.25rem}
    .pitw-cookie-settings{background:transparent;padding:0;border:0;min-height:auto;text-decoration:underline;text-underline-offset:.25rem}
    @media(max-width:520px){.pitw-consent{left:.65rem;right:.65rem;bottom:.65rem}.pitw-consent-actions{flex-direction:column}.pitw-consent button{width:100%}}
  `;
  document.head.appendChild(style);
}

function showConsentBanner() {
  injectConsentStyles();
  let banner = document.querySelector('.pitw-consent');
  if (!banner) {
    banner = document.createElement('section');
    banner.className = 'pitw-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics cookie choices');
    banner.innerHTML = `
      <strong>Useful evidence, not surveillance.</strong>
      <p>With your permission, Google Analytics helps us understand which pages and calls to action are useful. It is off until you accept.</p>
      <div class="pitw-consent-actions">
        <button type="button" data-accept>Accept analytics</button>
        <button type="button" data-decline>Decline</button>
        <a href="privacy.html">Read the privacy information</a>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector('[data-accept]').addEventListener('click', () => {
      safeStorage.set('accepted');
      banner.hidden = true;
      loadAnalytics();
      addAnalyticsEventTracking();
    });

    banner.querySelector('[data-decline]').addEventListener('click', () => {
      safeStorage.set('declined');
      banner.hidden = true;
    });
  }
  banner.hidden = false;
}

function addCookieSettingsControl() {
  const footerLinks = document.querySelector('.footer-links');
  if (!footerLinks || footerLinks.querySelector('.pitw-cookie-settings')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pitw-cookie-settings';
  button.textContent = 'Analytics choices';
  button.addEventListener('click', showConsentBanner);
  footerLinks.appendChild(button);
}

function addStructuredData() {
  if (document.querySelector('script[data-pitw-schema]')) return;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://putitonthewall.co.uk/#website',
        url: 'https://putitonthewall.co.uk/',
        name: 'Put It On The Wall',
        alternateName: 'WALL',
        inLanguage: 'en-GB'
      },
      {
        '@type': 'Service',
        '@id': 'https://putitonthewall.co.uk/#ai-opportunity-wall',
        name: 'AI Opportunity Wall',
        serviceType: 'AI strategy and opportunity validation programme',
        description: 'A guided six-week decision system that helps leadership teams validate a significant business problem before choosing AI, technology or another intervention.',
        url: 'https://putitonthewall.co.uk/#programme',
        provider: {
          '@type': 'Organization',
          name: 'Put It On The Wall',
          url: 'https://putitonthewall.co.uk/'
        },
        areaServed: 'GB',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'COOs, data leaders, transformation directors, strategy leaders and business-unit managing directors'
        }
      }
    ]
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.pitwSchema = 'true';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

addCookieSettingsControl();
addStructuredData();

const consent = safeStorage.get();
if (consent === 'accepted') {
  loadAnalytics();
  addAnalyticsEventTracking();
} else if (consent !== 'declined') {
  showConsentBanner();
}
