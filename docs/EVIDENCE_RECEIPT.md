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

## Claim Boundaries

| Area | Class | Evidence | Limit |
| --- | --- | --- | --- |
| Concise public profile | `PASS_WITH_LIMITATIONS` | README and maintainer handoff | Keep profile scoped to current public work. |
| Portfolio routing | `PASS_WITH_LIMITATIONS` | README link to portfolio | Portfolio repo owns detailed app routing. |
| Private planning exclusion | `PASS_WITH_LIMITATIONS` | maintainer handoff | Recheck no private docs, future-project names, PII, keys, exports, or backups are added. |

## Required Before Public-Facing Change

- `git status --short --ignored`
- `git rev-list --left-right --count HEAD..."@{u}"`
- `git diff --check`
- protected-path scan
- profile README review for public-safe claims
