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

- Mark this repo safe to publish only when the current pass proves a clean synced tree, no GitHub Releases, no protected tracked paths, no open security/dependabot alerts, passing required gates, and concise public-safe profile wording.
- If any proof is missing, stale, or contradicted by GitHub/repo/profile state, record the repo as `PASS_WITH_LIMITATIONS`, `NOT_RUN`, `BLOCKED`, or `NO_GO` instead of safe.
- The final status table must name remaining risks rather than implying safety from silence.

## Profile Routing Evidence

- The profile README is a front door, not the portfolio, release index, roadmap, or app archive.
- Active flagship and utility links must stay aligned with the live portfolio and current public repos before profile wording claims they are active, stable, maintained, or runnable.
- Stable utility apps belong under LocalFirstApps unless the current repo state and user approval prove a separate public surface should exist; private planning names and future-product ideas stay out.

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Concise public profile | `PASS_WITH_LIMITATIONS` | README and maintainer handoff | Keep profile scoped to current public work. |
| Portfolio routing | `PASS_WITH_LIMITATIONS` | README link to portfolio, profile routing evidence | Portfolio repo owns detailed app routing and current app ordering. |
| Private planning exclusion | `PASS_WITH_LIMITATIONS` | maintainer handoff | Recheck no private docs, future-project names, PII, keys, exports, or backups are added. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count HEAD..."@{u}"`
- `npm test`
- `git diff --check`
- protected-path scan
- profile README review for public-safe claims
