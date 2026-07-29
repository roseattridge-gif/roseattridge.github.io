# Put It On The Wall — MVP website

Static, dependency-free marketing site for the Put It On The Wall master brand and its first offer, AI Opportunity Wall.

## Files

- `index.html` — one-page MVP website
- `styles.css` — responsive visual system
- `script.js` — accessible mobile navigation and reveal behaviour
- `privacy.html` — lightweight privacy information
- `favicon.svg` — brand favicon
- `social-card.svg` — social sharing artwork
- `site.webmanifest` — install and theme metadata
- `BRAND.md` — MVP positioning, voice and visual identity

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Deployment

The site is intentionally static and can be deployed on GitHub Pages, Cloudflare Pages, Netlify or another static host. The production custom domain is `putitonthewall.co.uk`.

Before the production domain is connected:

1. Put these files at the root of a dedicated repository.
2. Enable the chosen static deployment.
3. Point `putitonthewall.co.uk` and `www.putitonthewall.co.uk` to the host.
4. Verify HTTPS and redirect one hostname to the other.
5. Replace the SVG Open Graph image with a PNG export if the chosen social platforms do not render SVG previews.
6. Add a dedicated analytics property after the final domain is live.
