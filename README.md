# AI2Web AI Readiness Checker (Chrome extension)

[![CI](https://github.com/ai2web-foundation/ai2web-chrome/actions/workflows/ci.yml/badge.svg)](https://github.com/ai2web-foundation/ai2web-chrome/actions/workflows/ci.yml)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dgfgbjlpmhahoafdcfandobbncfjhlle?label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/ai2web-ai-readiness-check/dgfgbjlpmhahoafdcfandobbncfjhlle)
[![Users](https://img.shields.io/chrome-web-store/users/dgfgbjlpmhahoafdcfandobbncfjhlle?label=users)](https://chromewebstore.google.com/detail/ai2web-ai-readiness-check/dgfgbjlpmhahoafdcfandobbncfjhlle)

Click the toolbar icon on any website to see its [AI2Web](https://ai2web.dev) readiness: an AI Readiness Score out of 100, its compliance tier, and the per-capability checks. It tells you at a glance how well AI agents can discover and use that site.

It is a thin client: it reads the active tab's origin and asks the public [AI2Web Validator API](https://github.com/ai2web-foundation/ai2web-validator) (`validator.ai2web.dev`) to score it. No accounts, no tracking, no storage; one request per open.

## Install

**[Get it on the Chrome Web Store &rarr;](https://chromewebstore.google.com/detail/ai2web-ai-readiness-check/dgfgbjlpmhahoafdcfandobbncfjhlle)**

Or run it from source (for development):

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Pin the icon, open any site, and click it.

## Test and package

- `npm test` - validates the manifest, referenced assets, and the popup render logic.
- `npm run pack` - builds `ai2web-chrome-<version>.zip` (runtime files only, spec-compliant) for upload.

See [STORE.md](STORE.md) for the full Chrome Web Store submission kit: listing copy, permission justifications, privacy disclosures and publish steps. Privacy policy: [ai2web.dev/privacy](https://ai2web.dev/privacy).

## Permissions

- `activeTab` - to read the current tab's URL when you click the icon (nothing runs in the background, nothing on other tabs).
- `host_permissions: validator.ai2web.dev` - to call the validation API.

## Privacy

The only network request is the current site's origin sent to `validator.ai2web.dev` to score it. Nothing is stored or shared.

MIT licensed. Part of [AI2Web](https://github.com/ai2web-foundation).
