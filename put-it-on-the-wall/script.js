const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('[data-year]').textContent = String(new Date().getFullYear());

const GA_ID = 'G-EFJ4V8H3XH';
const CONSENT_KEY = 'pitw-analytics-consent-v1';
function loadAnalytics(){
  if(window.gtag)return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('config',GA_ID,{send_page_view:true,cookie_flags:'SameSite=None;Secure'});
  const tag=document.createElement('script');tag.async=true;tag.src=`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;document.head.appendChild(tag);
}
function showConsent(){
  const banner=document.createElement('section');
  banner.className='pitw-consent';banner.setAttribute('role','dialog');banner.setAttribute('aria-label','Analytics cookie choices');
  banner.innerHTML='<strong>Useful evidence, not surveillance.</strong><p>With your permission, Google Analytics helps us understand which pages and calls to action are useful. It is off until you accept.</p><div><button type="button" data-accept>Accept analytics</button><button type="button" data-decline>Decline</button><a href="privacy.html">Privacy information</a></div>';
  document.body.appendChild(banner);
  banner.querySelector('[data-accept]').addEventListener('click',()=>{localStorage.setItem(CONSENT_KEY,'accepted');banner.hidden=true;loadAnalytics()});
  banner.querySelector('[data-decline]').addEventListener('click',()=>{localStorage.setItem(CONSENT_KEY,'declined');banner.hidden=true});
}
let consent=null;try{consent=localStorage.getItem(CONSENT_KEY)}catch{}
if(consent==='accepted')loadAnalytics();else if(consent!=='declined')showConsent();
