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

const GA_MEASUREMENT_ID = 'G-BWE4ZXDJ6Q';
const CONSENT_KEY = 'pitw-analytics-consent-v1';
let analyticsLoaded = false;
let analyticsEventsBound = false;

const safeStorage = {
  get() { try { return window.localStorage.getItem(CONSENT_KEY); } catch { return null; } },
  set(value) { try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* no-op */ } }
};

function loadAnalytics() {
  if (analyticsLoaded || !GA_MEASUREMENT_ID) return;
  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
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
  if (analyticsEventsBound) return;
  analyticsEventsBound = true;
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => link.addEventListener('click', () => trackEvent('generate_lead', { method: 'email', link_text: link.textContent.trim(), page_location: window.location.href })));
  document.querySelectorAll('a[href="#method"]').forEach((link) => link.addEventListener('click', () => trackEvent('wall_method_interest', { content_type: 'method', item_id: 'wall_method' })));
  document.querySelectorAll('a[href="#fit"]').forEach((link) => link.addEventListener('click', () => trackEvent('fit_check', { content_type: 'qualification', item_id: 'challenge_fit' })));
  document.querySelectorAll('a[href="#buying"]').forEach((link) => link.addEventListener('click', () => trackEvent('buying_process_interest', { content_type: 'buying_journey', item_id: 'how_buying_works' })));
  document.querySelectorAll('a[href="fit.html"]').forEach((link) => link.addEventListener('click', () => trackEvent('begin_fit_request', { link_text: link.textContent.trim(), page_location: window.location.href })));
  document.querySelectorAll('details').forEach((item, index) => item.addEventListener('toggle', () => {
    if (!item.open) return;
    trackEvent('faq_open', { item_id: `faq_${index + 1}`, item_name: item.querySelector('summary')?.textContent.trim() || `FAQ ${index + 1}` });
  }));
}

function injectConsentStyles() {
  if (document.getElementById('pitw-consent-styles')) return;
  const style = document.createElement('style');
  style.id = 'pitw-consent-styles';
  style.textContent = `.pitw-consent{position:fixed;z-index:1000;left:1rem;right:1rem;bottom:1rem;max-width:780px;margin:auto;padding:1.25rem;border:2px solid #151510;background:#fff;color:#151510;box-shadow:10px 10px 0 #151510;font-family:Archivo,Arial,sans-serif}.pitw-consent[hidden]{display:none}.pitw-consent strong{display:block;margin-bottom:.35rem;font-size:1.15rem;text-transform:uppercase}.pitw-consent p{margin:0 0 1rem;max-width:680px;font-size:.93rem}.pitw-consent-actions{display:flex;flex-wrap:wrap;gap:.65rem}.pitw-consent button,.pitw-cookie-settings{min-height:44px;padding:.7rem 1rem;border:2px solid #151510;background:#e8ff3f;color:#151510;cursor:pointer;font:600 .75rem/1 'IBM Plex Mono',monospace;text-transform:uppercase}.pitw-consent button[data-decline]{background:transparent}.pitw-consent a{font-family:'IBM Plex Mono',monospace;font-size:.72rem;text-transform:uppercase;text-underline-offset:.25rem}.pitw-cookie-settings{background:transparent;padding:0;border:0;min-height:auto;text-decoration:underline;text-underline-offset:.25rem}@media(max-width:520px){.pitw-consent{left:.65rem;right:.65rem;bottom:.65rem}.pitw-consent-actions{flex-direction:column}.pitw-consent button{width:100%}}`;
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
    banner.innerHTML = `<strong>Useful evidence, not surveillance.</strong><p>With your permission, Google Analytics helps us understand which pages and calls to action are useful. It is off until you accept.</p><div class="pitw-consent-actions"><button type="button" data-accept>Accept analytics</button><button type="button" data-decline>Decline</button><a href="privacy.html">Read the privacy information</a></div>`;
    document.body.appendChild(banner);
    banner.querySelector('[data-accept]').addEventListener('click', () => { safeStorage.set('accepted'); banner.hidden = true; loadAnalytics(); addAnalyticsEventTracking(); });
    banner.querySelector('[data-decline]').addEventListener('click', () => { safeStorage.set('declined'); banner.hidden = true; });
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

function setFitRequestForm() {
  const form = document.querySelector('[data-fit-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const organisation = String(data.get('organisation') || '').trim();
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const decision = String(data.get('decision') || '').trim();
    const urgency = String(data.get('urgency') || '').trim();
    const sponsor = String(data.get('sponsor') || '').trim();
    const attempted = String(data.get('attempted') || '').trim();
    const subject = `AI Opportunity Wall fit conversation — ${organisation || 'enquiry'}`;
    const body = ['Hi Rose,','','I would like to request a 30-minute AI Opportunity Wall fit conversation.','',`Name: ${name}`,`Email: ${email}`,`Organisation: ${organisation}`,'','What we are trying to decide:',decision,'','Why it matters now:',urgency,'','Who carries the decision risk:',sponsor,'','What we have already tried:',attempted || 'Not provided','','Thank you.'].join('\n');
    trackEvent('fit_request_submit', { method: 'email', organisation_provided: Boolean(organisation), page_location: window.location.href });
    window.location.href = `mailto:rose@roseattridge.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

addCookieSettingsControl();
setFitRequestForm();
const consent = safeStorage.get();
if (consent === 'accepted') { loadAnalytics(); addAnalyticsEventTracking(); }
else if (consent !== 'declined') { showConsentBanner(); }
