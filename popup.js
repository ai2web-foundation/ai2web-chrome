// AI2Web AI Readiness Checker - popup. Reads the active tab's origin and asks the AI2Web
// Validator API to score it, then shows the result. No tracking, no storage; one request
// to validator.ai2web.dev per open.

const API = "https://validator.ai2web.dev";
const SITE = "https://ai2web.dev";

function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function render(body, full, d) {
  if (!d.found) {
    body.innerHTML =
      '<div class="score"><span class="num na">n/a</span></div>' +
      '<div class="msg">No AI2Web manifest found. This site is not AI-ready yet.</div>';
    full.href = SITE + "/docs";
    full.textContent = "How to make a site AI-ready →";
    return;
  }
  const band = d.score >= 80 ? "good" : d.score >= 50 ? "mid" : "low";
  const checks = (d.checks || [])
    .map((c) => `<li class="${c.ok ? "ok" : "no"}"><span>${c.ok ? "✓" : "⚠"}</span> ${esc(c.label)}</li>`)
    .join("");
  body.innerHTML =
    `<div class="score ${band}"><span class="num">${d.score}</span><span class="of">/100</span>` +
    `<span class="tier">${esc(d.tier)}</span></div>` +
    `<ul class="checks">${checks}</ul>`;
  full.href = d.source || SITE;
  full.textContent = "View the AI2Web manifest →";
}

async function main() {
  const body = document.getElementById("body");
  const host = document.getElementById("host");
  const full = document.getElementById("full");
  let tab;
  try {
    [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  } catch {
    /* ignore */
  }
  if (!tab || !tab.url || !/^https?:\/\//i.test(tab.url)) {
    body.innerHTML = '<div class="msg">Open a website tab, then click the icon to check its AI readiness.</div>';
    return;
  }
  const origin = new URL(tab.url).origin;
  host.textContent = new URL(tab.url).hostname;
  try {
    const res = await fetch(`${API}/validate?url=${encodeURIComponent(origin)}`);
    render(body, full, await res.json());
  } catch {
    body.innerHTML = '<div class="msg">Could not reach the validator. Check your connection and try again.</div>';
    full.href = SITE;
    full.textContent = "ai2web.dev →";
  }
}

main();
