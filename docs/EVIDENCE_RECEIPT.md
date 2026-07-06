# Evidence Receipt

This public-safe receipt keeps profile claims tied to evidence instead of chat history.

## Evidence Classes

- `PASS`: directly covered by current files, tests, or checks.
- `PASS_WITH_LIMITATIONS`: true only within the stated scope.
- `NOT_RUN`: not checked in the current pass.
- `BLOCKED`: cannot be checked until an external condition changes.
- `NO_GO`: failed or unsafe; do not publish until fixed.

## Claim Firewall Invariant

- Every public profile, technical, security, privacy, routing, download, or support claim must map to a `Claim Boundaries` row or be added with evidence before publication.
- Public claims may not exceed `PASS` or `PASS_WITH_LIMITATIONS`; `NOT_RUN`, `BLOCKED`, and `NO_GO` items must stay unpublished or be labeled as unavailable.
- Volatile portfolio routing, repo status, GitHub settings, and public-project claims must be rechecked from current repo state before reliance.

## Currentness Watchdog

- Recheck claim evidence before public-facing changes, not on a fixed calendar.
- If current evidence is stale, missing, inaccessible, or contradicted by profile/portfolio/repo/GitHub state, downgrade the affected claim to `NOT_RUN`, `BLOCKED`, or `NO_GO`.
- Do not preserve old status snapshots as proof after profile positioning, public routing, repo status, sponsor links, or public profile wording changes.

## Safe-To-Publish Receipt

- Mark this repo safe to publish only when the current pass proves a clean synced tree, no GitHub Releases, no protected tracked paths, no open secret/dependabot/code-scanning alerts or a documented code-scanning not-applicable/no-analysis state, passing required gates, and concise public-safe profile wording.
- If any proof is missing, stale, or contradicted by GitHub/repo/profile state, record the repo as `PASS_WITH_LIMITATIONS`, `NOT_RUN`, `BLOCKED`, or `NO_GO` instead of safe.
- The final status table must name remaining risks rather than implying safety from silence.

## Profile Routing Evidence

- The profile README is a front door, not the portfolio, release index, roadmap, or app archive.
- Active flagship and utility links must stay aligned with the live portfolio and current public repos before profile wording claims they are active, stable, maintained, or runnable.
- Stable utility apps belong under LocalFirstApps unless the current repo state and user approval prove a separate public surface should exist; private planning names and future-product ideas stay out.

## Mission-Critical Reliability Evidence

- Profile wording must route users to apps that remain self-checking, crash-recoverable, state-explicit, maintainable, simple, one-input accessible, and backed by autonomous AI-assisted TDD/SDD gates.
- Public claims must not imply mission-critical guarantees unless the linked app repo has current evidence for recovery, state handling, accessibility, and test coverage.
- Remove or reject profile content that adds complexity, stale status, or unsupported promises without improving resilience, usability, or public maintainability.

## Single Input Directive Evidence

- Public links, profile navigation, and any future interactive profile surfaces must stay operable with one available input mode: keyboard only, mouse/pointer only, touch only, or platform-limited input only.
- No public surface may require a combined keyboard-plus-pointer, keyboard-plus-touch, hover-plus-keyboard, drag-plus-keyboard, or browser-popup path.
- Links and controls must expose visible focus, click/tap alternatives, platform text-entry support where text is unavoidable, and nonblocking status or recovery guidance for degraded HID conditions.
- If a public surface lacks direct input-mode coverage, label it `PASS_WITH_LIMITATIONS` or `NOT_RUN`.

## Design Language Evidence

- Public presentation must stay modern minimalist, utilitarian, professional, joyful, responsive, and concise with clear links, visible focus, no noisy decoration, and no component overlap.
- Signature Ecosystem Evidence: the profile must look and feel like the concise front door to the shared `shfqrkhn` ecosystem while staying lighter than app or portfolio surfaces.
- MIT UI libraries/resources are inspiration sources for app or portfolio repos only unless a source-backed, license-checked, tested need justifies a dependency.
- Reject browser JS popups, blocking surfaces, arbitrary component copy-paste, mixed visual systems, unbounded animation, external CDNs, or styling that makes the profile less scannable.

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Concise public profile | `PASS_WITH_LIMITATIONS` | README and maintainer handoff | Keep profile scoped to current public work. |
| Portfolio routing | `PASS_WITH_LIMITATIONS` | README link to portfolio, profile routing evidence | Portfolio repo owns detailed app routing and current app ordering. |
| Private planning exclusion | `PASS_WITH_LIMITATIONS` | maintainer handoff, `git archive` | Recheck no private docs, future-project names, PII, keys, exports, or backups are added. |
| Mission-critical reliability | `PASS_WITH_LIMITATIONS` | mission-critical reliability evidence, static tests, profile review | Profile can route to reliability evidence but does not certify app runtime behavior by itself. |
| Single input operation | `PASS_WITH_LIMITATIONS` | single input directive evidence, README review, no browser popup policy | Does not certify every GitHub rendering surface, OS assistive technology, or unusual HID/browser pairing. |
| Design language/UI safety | `PASS_WITH_LIMITATIONS` | handoff/evidence docs, static tests, manual profile review where run | Does not certify every GitHub rendering surface; profile should remain concise rather than app-like. |
| Signature ecosystem fit | `PASS_WITH_LIMITATIONS` | shared signature design system reference, handoff/evidence docs, static tests | Does not require app-like visuals; the profile remains a concise public entrypoint. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count 'HEAD...@{u}'`
- `gh release list --limit 5` returns no releases
- `npm run qa`
- `git diff --check`
- `git archive --format=tar HEAD`
- protected-path scan
- profile README review for public-safe claims
