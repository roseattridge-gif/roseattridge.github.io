# Production domain setup

Target domain: `putitonthewall.co.uk`

## GitHub Pages

The contents of this directory must sit at the root of a dedicated public repository owned by `roseattridge-gif`. Publish from the repository's `main` branch root and set the custom domain to `putitonthewall.co.uk`.

Keep the root `CNAME` file containing only:

```text
putitonthewall.co.uk
```

After DNS resolves, enable **Enforce HTTPS** in repository Settings → Pages.

## GoDaddy DNS

Remove any conflicting parking, forwarding, A or CNAME records for `@` and `www`, then add:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |
| CNAME | www | roseattridge-gif.github.io | 1 hour |

Do not add a wildcard CNAME. Keep existing MX and email-related TXT records unchanged.

## Verification

```bash
dig putitonthewall.co.uk A +short
dig www.putitonthewall.co.uk CNAME +short
```

The apex should return all four GitHub Pages IPv4 addresses and `www` should return `roseattridge-gif.github.io.`

## Search and analytics

- Google Analytics measurement ID currently used: `G-EFJ4V8H3XH`
- Analytics loads only after explicit consent.
- Submit `https://putitonthewall.co.uk/sitemap.xml` in Google Search Console after the domain is live.
- Verify the deployed tag in Google Analytics Realtime or Google Tag Assistant.
