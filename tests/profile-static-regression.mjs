import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const pkg = JSON.parse(read("package.json"));
const readme = read("README.md");
const handoff = read("docs/AI_MAINTAINER_HANDOFF.md");
const evidence = read("docs/EVIDENCE_RECEIPT.md");
const license = read("LICENSE");
const forbiddenTrackedPathPattern = /(^|\/)(node_modules|offline|linkedin-post-package|test-results|playwright-report|\.codex-remote-attachments)(\/|$)|^data\/(manual-overrides\.json|latest-simulation\.json|scoreboards)(\/|$)|(^|\/).*\.((env)|(pem)|(key)|(p12)|(pfx))$|(^|\/)(exports?|backups?|logs?|scratch)(\/|$)/i;
const trackedFiles = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .map((file) => file.replace(/\\/g, "/"));
const forbiddenTrackedFiles = trackedFiles.filter((file) => forbiddenTrackedPathPattern.test(file));
const forbiddenPublicTerms = [
  "/releases/latest",
  "AI-Studio-Cleaner",
  "C3Pedal",
  "CommonGround",
  "Flexx-Files",
  "LedgerSuite",
  "Noodle-Nudge",
  "PMQuiz",
  "TS-Dash",
  "AutoYT",
  "Prediction_Hub",
  "Civic_SourceGraph_Canada",
  "API key",
  ".env",
  "private roadmap"
];

function gitArchiveEntries() {
  const archive = execFileSync("git", ["archive", "--format=tar", "HEAD"], {
    cwd: root,
    maxBuffer: 128 * 1024 * 1024,
  });
  const entries = [];
  for (let offset = 0; offset + 512 <= archive.length;) {
    const header = archive.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const name = header.toString("utf8", 0, 100).replace(/\0.*$/, "");
    const prefix = header.toString("utf8", 345, 500).replace(/\0.*$/, "");
    const sizeRaw = header.toString("utf8", 124, 136).replace(/\0.*$/, "").trim();
    const size = sizeRaw ? parseInt(sizeRaw, 8) : 0;
    const fullName = [prefix, name].filter(Boolean).join("/");
    if (fullName) entries.push(fullName.replace(/\\/g, "/"));
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}

const archiveEntries = gitArchiveEntries();
const forbiddenArchiveFiles = archiveEntries.filter((file) => forbiddenTrackedPathPattern.test(file));
const requiredArchiveEntries = [
  "README.md",
  "LICENSE",
  "docs/AI_MAINTAINER_HANDOFF.md",
  "docs/EVIDENCE_RECEIPT.md",
  "package.json",
  "tests/profile-static-regression.mjs",
];

assert(pkg.name === "shfqrkhn-profile", "package name must identify the profile repo.");
assert(pkg.private === true, "profile package must stay private.");
assert(pkg.scripts?.test === "node tests/profile-static-regression.mjs", "npm test must run the profile static gate.");
assert(pkg.scripts?.qa === "npm test", "npm run qa must run the full profile gate.");
assert(forbiddenTrackedFiles.length === 0, `Forbidden tracked paths: ${forbiddenTrackedFiles.join(", ")}`);
assert(forbiddenArchiveFiles.length === 0, `Forbidden generated archive paths: ${forbiddenArchiveFiles.join(", ")}`);
for (const file of requiredArchiveEntries) {
  assert(archiveEntries.includes(file), `Generated profile archive must include public path: ${file}`);
}

for (const phrase of [
  "Project portfolio",
  "https://shfqrkhn.github.io/",
  "Sponsor this work",
  "https://github.com/sponsors/shfqrkhn?o=esb",
  "docs/AI_MAINTAINER_HANDOFF.md",
  "ModelTab",
  "nFIRE",
  "FIFA-WC-Sim",
  "LocalFirstApps",
  "Stable utility apps are maintained inside"
]) {
  assert(readme.includes(phrase), `README missing public routing term: ${phrase}`);
}

const ordered = ["ModelTab", "nFIRE", "FIFA-WC-Sim", "LocalFirstApps"].map((name) => readme.indexOf(name));
assert(ordered.every((index) => index >= 0), "README must list every active project.");
assert(ordered.every((index, i) => i === 0 || ordered[i - 1] < index), "README active project order must match portfolio priority.");

for (const forbidden of forbiddenPublicTerms) {
  assert(!readme.includes(forbidden), `README must not expose forbidden public-surface term: ${forbidden}`);
  assert(!archiveEntries.some((entry) => entry === forbidden || entry.startsWith(`${forbidden}/`)), `Generated archive must not include forbidden public-surface path: ${forbidden}`);
}

for (const phrase of [
  "Claim Firewall Invariant",
  "Currentness Watchdog",
  "Safe-To-Publish Receipt",
  "Profile Routing Evidence",
  "Design Language Evidence",
  "Design language/UI safety",
  "modern minimalist",
  "no GitHub Releases",
  "no protected tracked paths",
  "no open secret/dependabot/code-scanning alerts",
  "code-scanning not-applicable/no-analysis state"
]) {
  assert(evidence.includes(phrase), `Evidence receipt missing guardrail term: ${phrase}`);
}
assert(evidence.includes("git rev-list --left-right --count 'HEAD...@{u}'"), "Evidence receipt must preserve the PowerShell-safe upstream delta command.");
assert(evidence.includes("gh release list --limit 5"), "Evidence receipt must require a GitHub Releases absence check.");
assert(evidence.includes("git archive"), "Evidence receipt must tie profile archive safety to generated archive evidence.");

for (const phrase of [
  "OmniOS Transfer Contract",
  "Product truth",
  "Execution truth",
  "Evidence truth",
  "Operations truth",
  "Transfer truth",
  "Reliability truth",
  "Design truth",
  "Single input truth",
  "modern minimalist",
  "combined input-mode path",
  "Doctrine Delta Decision",
  "source-backed, reusable, non-secret"
]) {
  assert(handoff.includes(phrase), `Handoff missing transfer term: ${phrase}`);
}

for (const phrase of [
  "Mission-Critical Reliability Evidence",
  "self-checking",
  "crash-recoverable",
  "state-explicit",
  "autonomous AI-assisted TDD/SDD",
  "Remove or reject",
  "Mission-critical reliability"
]) {
  assert(evidence.includes(phrase), `Evidence receipt missing mission-critical reliability term: ${phrase}`);
}

for (const phrase of [
  "Single Input Directive Evidence",
  "keyboard only",
  "mouse/pointer only",
  "touch only",
  "platform-limited input only",
  "No public surface may require",
  "Single input operation"
]) {
  assert(evidence.includes(phrase), `Evidence receipt missing single input term: ${phrase}`);
}

assert(license.includes("MIT License"), "license must stay MIT.");
console.log("OK: profile static regression checks passed.");
