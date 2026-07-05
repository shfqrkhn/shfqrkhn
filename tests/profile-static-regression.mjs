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

assert(pkg.name === "shfqrkhn-profile", "package name must identify the profile repo.");
assert(pkg.private === true, "profile package must stay private.");
assert(pkg.scripts?.test === "node tests/profile-static-regression.mjs", "npm test must run the profile static gate.");

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

for (const forbidden of [
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
]) {
  assert(!readme.includes(forbidden), `README must not expose forbidden public-surface term: ${forbidden}`);
}

for (const phrase of [
  "Claim Firewall Invariant",
  "Currentness Watchdog",
  "Safe-To-Publish Receipt",
  "Profile Routing Evidence",
  "no GitHub Releases",
  "no protected tracked paths",
  "no open security/dependabot alerts"
]) {
  assert(evidence.includes(phrase), `Evidence receipt missing guardrail term: ${phrase}`);
}

for (const phrase of [
  "OmniOS Transfer Contract",
  "Product truth",
  "Execution truth",
  "Evidence truth",
  "Operations truth",
  "Transfer truth",
  "Doctrine Delta Decision",
  "source-backed, reusable, non-secret"
]) {
  assert(handoff.includes(phrase), `Handoff missing transfer term: ${phrase}`);
}

assert(license.includes("MIT License"), "license must stay MIT.");
console.log("OK: profile static regression checks passed.");
