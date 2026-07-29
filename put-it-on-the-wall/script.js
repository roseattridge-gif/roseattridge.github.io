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

function foundingTeamEmailHref() {
  return 'mailto:rose@roseattridge.com?subject=AI%20Opportunity%20Wall%20fit%20conversation&body=Hi%20Rose%2C%0A%0AI%27d%20like%20to%20explore%20whether%20our%20challenge%20fits%20AI%20Opportunity%20Wall.%0A%0AOrganisation%3A%0AWhat%20we%20are%20trying%20to%20decide%3A%0AWhy%20it%20matters%20now%3A%0AWho%20carries%20the%20decision%20risk%3A%0A';
}

function injectBuyerJourneyStyles() {
  if (document.getElementById('pitw-buyer-styles')) return;
  const style = document.createElement('style');
  style.id = 'pitw-buyer-styles';
  style.textContent = `
    .buying-section{background:#fffdf7}
    .buying-intro{max-width:980px;margin:0 0 clamp(3rem,6vw,6rem)}
    .buying-intro h2{margin-bottom:1.4rem;font-size:clamp(2.7rem,5.3vw,6.1rem);font-weight:850;letter-spacing:-.065em;line-height:.92;text-transform:uppercase}
    .buying-intro>p:last-child{max-width:790px;font-size:clamp(1.08rem,1.6vw,1.35rem)}
    .buying-grid{display:grid;grid-template-columns:repeat(4,1fr);border:2px solid #151510}
    .buying-step{min-height:330px;padding:clamp(1.4rem,2.6vw,2.5rem);border-right:1px solid #151510}
    .buying-step:last-child{border-right:0}
    .buying-step>span{display:inline-flex;margin-bottom:4rem;padding:.3rem .45rem;background:#ef3b2d;color:#fffdf7;font-family:'IBM Plex Mono',monospace;font-size:.72rem}
    .buying-step h3{margin-bottom:1rem;font-size:clamp(1.55rem,2.3vw,2.7rem);line-height:1;text-transform:uppercase}
    .buying-step p{font-size:1rem}
    .buying-assurance{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2rem;align-items:center;margin-top:2rem;padding:clamp(1.4rem,3vw,2.6rem);background:#151510;color:#fffdf7}
    .buying-assurance strong{display:block;margin-bottom:.45rem;font-size:clamp(1.35rem,2.2vw,2.3rem);line-height:1;text-transform:uppercase}
    .buying-assurance p{max-width:820px;margin:0;color:rgba(255,255,255,.78)}
    .buying-assurance .button{white-space:nowrap;background:#e8ff3f;color:#151510}
    .decision-microcopy{display:block;margin-top:.75rem;font-family:'IBM Plex Mono',monospace;font-size:.69rem;text-transform:uppercase}
    @media(max-width:1050px){.buying-grid{grid-template-columns:repeat(2,1fr)}.buying-step:nth-child(2){border-right:0}.buying-step:nth-child(-n+2){border-bottom:1px solid #151510}.buying-assurance{grid-template-columns:1fr}.buying-assurance .button{width:max-content}}
    @media(max-width:620px){.buying-grid{grid-template-columns:1fr}.buying-step{min-height:auto;border-right:0;border-bottom:1px solid #151510!important}.buying-step:last-child{border-bottom:0!important}.buying-step>span{margin-bottom:2rem}.buying-assurance .button{width:100%}}
  `;
  document.head.appendChild(style);
}

function enhanceBuyerJourney() {
  injectBuyerJourneyStyles();

  const fitSection = document.querySelector('.fit-section');
  if (fitSection) fitSection.id = 'fit';

  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.href = '#fit';
    navCta.textContent = 'Check fit';
  }

  const heroPrimary = document.querySelector('.hero-actions .button-primary');
  if (heroPrimary) {
    heroPrimary.href = '#fit';
    heroPrimary.textContent = 'See if your challenge fits';
  }

  const heroSecondary = document.querySelector('.hero-actions .button-secondary');
  if (heroSecondary) heroSecondary.textContent = 'Explore the WALL method';

  const programmeCta = document.querySelector('.programme-copy .button-black');
  if (programmeCta) {
    programmeCta.href = '#buying';
    programmeCta.textContent = 'See how buying works';
  }

  const faqSection = document.querySelector('.faq-section');
  if (faqSection && !document.getElementById('buying')) {
    const buyingSection = document.createElement('section');
    buyingSection.className = 'section buying-section';
    buyingSection.id = 'buying';
    buyingSection.innerHTML = `
      <div class="buying-intro">
        <p class="kicker">A clear route to yes — or no</p>
        <h2>Know exactly what happens next.</h2>
        <p>The buying journey is deliberately light. First we test fit. Only then do you receive a clear fixed-fee scope, dates and participant requirements. No open-ended discovery phase and no pressure to proceed.</p>
      </div>
      <div class="buying-grid">
        <article class="buying-step">
          <span>01</span>
          <h3>Check the fit</h3>
          <p>Use the criteria above to decide whether the challenge is significant, cross-functional and genuinely undecided.</p>
        </article>
        <article class="buying-step">
          <span>02</span>
          <h3>Talk for 30 minutes</h3>
          <p>Rose tests the decision, sponsor, evidence and urgency. You leave knowing whether the programme is the right next move.</p>
        </article>
        <article class="buying-step">
          <span>03</span>
          <h3>Receive a fixed scope</h3>
          <p>A concise proposal sets out the outcome, fee, six-week dates, internal roles, boundaries and definition of done.</p>
        </article>
        <article class="buying-step">
          <span>04</span>
          <h3>Launch the team</h3>
          <p>Once agreed, the sponsor and facilitator receive the launch pack, participant brief and first evidence request.</p>
        </article>
      </div>
      <div class="buying-assurance">
        <div>
          <strong>The first conversation is a fit test, not a sales performance.</strong>
          <p>Bring the decision you are carrying. Rose will tell you candidly whether AI Opportunity Wall fits, needs reframing or is unnecessary.</p>
          <span class="decision-microcopy">No commitment · No speculative workshop · No technology recommendation in advance</span>
        </div>
        <a class="button" href="${foundingTeamEmailHref()}">Request a 30-minute fit conversation</a>
      </div>
    `;
    faqSection.parentNode.insertBefore(buyingSection, faqSection);
  }

  const faqList = document.querySelector('.faq-list');
  if (faqList && !faqList.querySelector('[data-buying-faq]')) {
    const additions = [
      {
        question: 'Is this an AI strategy workshop?',
        answer: 'No. It is a six-week AI opportunity assessment and decision system. Live sessions are used only where people need to resolve different interpretations, make trade-offs or commit ownership.'
      },
      {
        question: 'How is this different from AI use-case prioritisation?',
        answer: 'Conventional use-case prioritisation often starts with a list of ideas. AI Opportunity Wall starts with evidence, validates the underlying business problem and compares AI with credible non-AI alternatives before anything is prioritised.'
      },
      {
        question: 'What does a founding-team programme cost?',
        answer: 'The fit conversation comes first. If the programme is appropriate, Rose sends a clear fixed-fee scope covering the six-week journey, support boundaries, dates and definition of done. There is no open-ended consulting meter.'
      },
      {
        question: 'Who needs to be involved?',
        answer: 'You need an accountable sponsor carrying the decision risk, one capable internal facilitator and a small cross-functional group with access to the relevant evidence and operating reality.'
      }
    ];

    additions.forEach(({ question, answer }, index) => {
      const item = document.createElement('details');
      item.dataset.buyingFaq = String(index + 1);
      item.innerHTML = `<summary>${question}</summary><p>${answer}</p>`;
      faqList.appendChild(item);
    });
  }

  const finalCta = document.querySelector('.final-cta .button-yellow');
  if (finalCta) {
    finalCta.href = foundingTeamEmailHref();
    finalCta.textContent = 'Request a 30-minute fit conversation';
  }

  const finalCopy = document.querySelector('.final-cta-copy > p:not(.kicker)');
  if (finalCopy) finalCopy.textContent = 'Tell Rose what the organisation is trying to decide, why it matters now and who carries the risk. She will reply personally to arrange the fit conversation.';
}

/*
 * Consent-led Google Analytics setup.
 * The existing Rose Attridge GA4 property is used for the MVP so activity can
 * be separated by hostname while a dedicated Put It On The Wall stream is created.
 */
const GA_MEASUREMENT_ID = 'G-EFJ4V8H3XH';
const CONSENT_KEY = 'pitw-analytics-consent-v1';
let analyticsLoaded = false;
let analyticsEventsBound = false;

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
  if (analyticsEventsBound) return;
  analyticsEventsBound = true;

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

  document.querySelectorAll('a[href="#fit"]').forEach((link) => {
    link.addEventListener('click', () => trackEvent('select_content', {
      content_type: 'qualification',
      item_id: 'challenge_fit'
    }));
  });

  document.querySelectorAll('a[href="#buying"]').forEach((link) => {
    link.addEventListener('click', () => trackEvent('select_content', {
      content_type: 'buying_journey',
      item_id: 'how_buying_works'
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

  const faqEntities = Array.from(document.querySelectorAll('.faq-list details')).map((item) => ({
    '@type': 'Question',
    name: item.querySelector('summary')?.textContent.trim() || '',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.querySelector('p')?.textContent.trim() || ''
    }
  })).filter((item) => item.name && item.acceptedAnswer.text);

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
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://putitonthewall.co.uk/#faq',
        mainEntity: faqEntities
      }
    ]
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.pitwSchema = 'true';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

enhanceBuyerJourney();
addCookieSettingsControl();
addStructuredData();

const consent = safeStorage.get();
if (consent === 'accepted') {
  loadAnalytics();
  addAnalyticsEventTracking();
} else if (consent !== 'declined') {
  showConsentBanner();
}
