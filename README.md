# AI2Web AI Readiness Checker (Chrome extension)

Click the toolbar icon on any website to see its [AI2Web](https://ai2web.dev) readiness: an AI Readiness Score out of 100, its compliance tier, and the per-capability checks. It tells you at a glance how well AI agents can discover and use that site.

It is a thin client: it reads the active tab's origin and asks the public [AI2Web Validator API](https://github.com/ai2web-foundation/ai2web-validator) (`validator.ai2web.dev`) to score it. No accounts, no tracking, no storage; one request per open.

## Install (unpacked, for now)

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Pin the icon, open any site, and click it.

A packaged Chrome Web Store listing will follow.

## Permissions

- `activeTab` - to read the current tab's URL when you click the icon (nothing runs in the background, nothing on other tabs).
- `host_permissions: validator.ai2web.dev` - to call the validation API.

## Privacy

The only network request is the current site's origin sent to `validator.ai2web.dev` to score it. Nothing is stored or shared.

MIT licensed. Part of [AI2Web](https://github.com/ai2web-foundation).
