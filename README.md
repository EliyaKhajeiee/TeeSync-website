# TeeSync Website

Official marketing site for TeeSync — the iMessage-native tee time booking app.

**App Store:** https://apps.apple.com/app/teesync-ios/id6763915366

Static site, hosted on GitHub Pages. No build step — edit the HTML/CSS/JS directly.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, in-app showcase, courses, download CTAs |
| `how-it-works.html` | Three-step booking walkthrough |
| `about.html` | Story and founders |
| `faq.html` | FAQ accordion (summaries of the legal pages live here too) |
| `contact.html` | Contact form (mailto) |
| `privacy.html` | Privacy Policy — the URL to give App Store Connect |
| `terms.html` | Terms & Conditions / EULA supplement |
| `style.css` | All styles |
| `main.js` | Nav, scroll reveals, accordion, sticky download bar |
| `logo.svg` | App icon mark (also the favicon) |

Canonical/OG tags and `sitemap.xml` assume the site is served from
`https://tee-sync.com/`. Update those if the domain differs.

Bump the `?v=` query on `style.css` / `main.js` when changing them so
GitHub Pages visitors don't get a stale cache.
