(function () {
  const measurementId = window.GA_MEASUREMENT_ID;

  if (!measurementId || measurementId === 'G-XXXXXXXXXX') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true
  });

  document.addEventListener('click', event => {
    if (!event.target || !event.target.closest) return;

    const link = event.target.closest('a[href]');
    if (!link || !window.gtag) return;

    const href = link.getAttribute('href');
    if (!href) return;

    const isOutbound = link.hostname && link.hostname !== window.location.hostname;
    const isEmail = href.startsWith('mailto:');

    if (isOutbound || isEmail) {
      window.gtag('event', isEmail ? 'email_click' : 'outbound_click', {
        link_url: link.href,
        link_text: link.textContent.trim()
      });
    }
  });
})();
