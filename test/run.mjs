// Dependency-free tests for the AI2Web Chrome extension. Run with: node test/run.mjs
// A static MV3 extension has no build step, so CI validates the bundle is well-formed:
// manifest is valid MV3, every referenced file/icon exists, and popup.js parses. It also
// exercises the pure render() logic against a minimal DOM stub so scoring bands and the
// "not AI-ready" path can't silently break.
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
function check(cond, label, detail) {
  console.log((cond ? "PASS" : "FAIL") + "  " + label);
  if (!cond) {
    failures++;
    if (detail !== undefined) console.log("      got:", JSON.stringify(detail));
  }
}

// --- manifest.json is valid MV3 ---
const man = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));
check(man.manifest_version === 3, "manifest is MV3");
check(typeof man.name === "string" && man.name.length > 0, "manifest has a name");
check(/^\d+\.\d+\.\d+$/.test(man.version), "manifest version is x.y.z", man.version);
check(man.action?.default_popup === "popup.html", "action points at popup.html");
check(Array.isArray(man.host_permissions) && man.host_permissions.some((h) => h.includes("validator.ai2web.dev")), "host_permissions include the validator", man.host_permissions);
check(Array.isArray(man.permissions) && man.permissions.includes("activeTab"), "requests activeTab only", man.permissions);

// --- every referenced file exists ---
const referenced = [
  man.action?.default_popup,
  ...Object.values(man.icons ?? {}),
  ...Object.values(man.action?.default_icon ?? {}),
];
for (const f of referenced) check(existsSync(join(root, f)), `referenced file exists: ${f}`);
for (const f of ["popup.js", "popup.css"]) check(existsSync(join(root, f)), `bundle file exists: ${f}`);

// popup.html must reference the script + styles
const html = readFileSync(join(root, "popup.html"), "utf8");
check(html.includes("popup.js"), "popup.html loads popup.js");
check(html.includes("popup.css"), "popup.html loads popup.css");

// --- popup.js parses (no syntax errors) ---
try {
  execFileSync(process.execPath, ["--check", join(root, "popup.js")]);
  check(true, "popup.js parses without syntax errors");
} catch (e) {
  check(false, "popup.js parses without syntax errors", String(e.message).split("\n")[0]);
}

// --- render() logic against a minimal DOM stub ---
// popup.js is a classic <script> with no exports, so evaluate its source with the trailing
// main() call swapped for a return that hands back the pure functions to test.
function makeEl() {
  return { innerHTML: "", href: "", textContent: "" };
}
const src = readFileSync(join(root, "popup.js"), "utf8");
check(src.includes("main();"), "popup.js invokes main() on load");
const exposed = new Function(src.replace("main();", "return { render, esc };"));
const { render, esc } = exposed();

check(esc('<b>&"x"') === "&lt;b&gt;&amp;\"x\"", "esc escapes angle brackets + ampersand", esc('<b>&"x"'));

const good = makeEl(), goodFull = makeEl();
render(good, goodFull, { found: true, score: 92, tier: "Enterprise", checks: [{ ok: true, label: "MCP transport" }, { ok: false, label: "Consent declared" }], source: "https://x.example/ai2w" });
check(good.innerHTML.includes("92") && good.innerHTML.includes("good"), "render: high score gets 'good' band", good.innerHTML.slice(0, 60));
check(good.innerHTML.includes("Enterprise"), "render: shows tier");
check(goodFull.href === "https://x.example/ai2w", "render: links to the manifest source");

const low = makeEl(), lowFull = makeEl();
render(low, lowFull, { found: true, score: 30, tier: "Basic", checks: [] });
check(low.innerHTML.includes("low"), "render: low score gets 'low' band");

const none = makeEl(), noneFull = makeEl();
render(none, noneFull, { found: false });
check(none.innerHTML.includes("n/a") && /not AI-ready/i.test(none.innerHTML), "render: no manifest shows n/a + guidance");

console.log("\n" + (failures === 0 ? "ALL PASS" : `${failures} FAILED`));
process.exit(failures === 0 ? 0 : 1);
