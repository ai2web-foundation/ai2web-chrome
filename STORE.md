# Chrome Web Store submission kit

Everything needed to publish the AI2Web AI Readiness Checker. Copy the fields below
into the Developer Dashboard. The upload package is built by `npm run pack`
(`ai2web-chrome-<version>.zip`, runtime files only).

## Before you upload (one-time)

1. **Developer account** — register at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) (one-time 5 USD fee).
2. **Deploy the privacy policy** — the store requires a working privacy-policy URL because the extension sends the active tab's origin to the Validator. The page is ready at `ai2web.dev/privacy.html`; deploy ai2web.dev so **https://ai2web.dev/privacy** resolves, then paste that URL in the dashboard.
3. **Confirm the contact email** — `hello@ai2web.dev` is used in the privacy policy; make sure that inbox exists (or change it to one that does).

## Package

- File to upload: `ai2web-chrome-0.1.0.zip` (rebuild with `npm run pack` after any version bump).
- Contents: `manifest.json`, `popup.html`, `popup.css`, `popup.js`, `icons/` only. No source, tests, or CI.

## Listing fields

**Item name**
```
AI2Web - AI Readiness Checker
```

**Summary** (short description, max 132 chars)
```
Check any website's AI2Web readiness. See its AI Readiness Score and how well AI agents can discover and use it.
```

**Category:** Developer Tools

**Language:** English

**Detailed description**
```
See at a glance how ready any website is for AI agents.

Click the AI2Web icon on any site and get its AI Readiness Score out of 100, its
compliance tier (Basic, Standard or Enterprise) and a per-capability breakdown -
whether the site exposes a discovery manifest, content, search, actions, events,
an MCP endpoint, OAuth with consent, identity and contact.

AI2Web is an open interoperability layer that makes a website understandable and
actionable to AI agents across protocols (MCP, ACP, REST, GraphQL and more). This
extension is the quickest way to check whether a site supports it and what it is
missing.

How it works
- Click the toolbar icon on any website.
- The extension looks up that site's public AI2Web readiness via the AI2Web Validator.
- You see the score, tier and checks in a single popup.

Private by design
- Runs only when you click. Nothing runs in the background.
- Does not read page content, track your browsing, or store anything on your device.
- No cookies, no analytics, no advertising, no third-party trackers.
- The only data sent is the current tab's origin, and only to the AI2Web Validator,
  solely to fetch that site's public readiness score.

Open source. Learn more at https://ai2web.dev - build with the protocol, spec and SDKs
at https://github.com/ai2web-foundation.
```

**Privacy policy URL**
```
https://ai2web.dev/privacy
```

**Homepage / support URL**
```
https://ai2web.dev
```

## Single purpose (dashboard field)

```
Show the AI2Web AI Readiness score of the website in the currently active tab when the
user clicks the extension icon.
```

## Permission justifications (dashboard fields)

**`activeTab`**
```
When the user clicks the toolbar icon, the extension reads the origin (scheme and
hostname) of the active tab so it can look up that site's public AI Readiness score.
activeTab grants access to the current tab only, and only on the user's click - nothing
runs in the background and no other tabs are accessed.
```

**Host permission `https://validator.ai2web.dev/*`**
```
The extension sends the active tab's origin to the AI2Web Validator API
(validator.ai2web.dev) to fetch that site's public AI Readiness score. This is the only
host the extension contacts.
```

**Remote code:** No. All code is in the package; the extension only makes data requests
(fetch) to the Validator API and does not load or execute remote scripts.

## Privacy practices / data disclosures (dashboard form)

The Data usage section is only checkboxes, the three certification statements, and the
privacy-policy URL. There is no free-text data-handling box (the only free-text boxes are
the permission justifications above).

**What user data do you collect?** Check **Web history** only. Leave every other box
unchecked (no personally identifiable info, health, financial, authentication, personal
communications, location, user activity, or website content). Rationale: on click the
extension transmits the active tab's URL (origin) to the Validator, and "Web history"
("web pages that a user has visited") is the closest category. It does not read page
text/images, so "Website content" would be inaccurate and over-broad.

**Certify all three compliance statements** (all true here - the Validator is the
publisher's own service, not a third party):
- Not sold or transferred to third parties outside the approved use cases.
- Not used or transferred for purposes unrelated to the single purpose.
- Not used or transferred to determine creditworthiness or for lending.

**Privacy policy URL:** `https://ai2web.dev/privacy`

## Screenshots and images (you provide)

The store needs **at least one screenshot**. Recommended: load the extension unpacked
(chrome://extensions -> Developer mode -> Load unpacked -> select this folder), open a
few sites and capture the popup.

- **Screenshots:** 1280x800 (recommended) or 640x400, PNG or JPEG, 1-5 images.
  Good pair: (1) a high-scoring site like `ai2web.dev` showing the checks; (2) a site
  with no manifest showing the "not AI-ready yet" state.
- **Store icon:** 128x128 - already provided (`icons/icon-128.png`).
- **Small promo tile (optional, for featuring):** 440x280 PNG/JPEG.
- **Marquee promo tile (optional):** 1400x560.

## Publish steps

1. `npm test` (all checks pass), then `npm run pack`.
2. Dashboard -> New item -> upload `ai2web-chrome-<version>.zip`.
3. Fill the fields above, add screenshots, set the privacy policy URL.
4. Complete the privacy practices form and certify the compliance statements.
5. Submit for review.
