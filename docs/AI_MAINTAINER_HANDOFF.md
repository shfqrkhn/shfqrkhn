# AI Maintainer Handoff

Last updated: 2026-07-05.
Repo: `D:\VSCode\GH\shfqrkhn`.

Treat this as a public-safe continuation map. Re-read current files before editing.

## Mission

Maintain the GitHub profile README as a concise public entrypoint for the active project ecosystem.

## Product Contract

- Keep the profile focused and low-noise.
- Route visitors to the portfolio first.
- Keep active flagship links aligned with the portfolio and current repos.
- Keep Sponsor link visible.
- Do not list deleted/archived repos as active projects.
- Do not advertise private planning drafts or future projects until the user explicitly approves public release.

## OmniOS Transfer Contract

- Product truth: concise public profile README, not a portfolio replacement or private roadmap surface.
- Execution truth: preserve concise wording, current public routing, sponsor/profile checks, and public-safe review before publishing.
- Evidence truth: use `docs/EVIDENCE_RECEIPT.md`, README review, protected-path scans, and live portfolio checks; public claims must stay within `PASS` or `PASS_WITH_LIMITATIONS`.
- Operations truth: the profile README and current main repository ZIP are the only distribution surfaces; GitHub Releases stay absent.
- Transfer truth: update this handoff and the evidence receipt when profile positioning, routing, or public-surface guarantees change.

## Doctrine Delta Decision

- After incidents, rescue runs, maturity passes, or repeated failures, classify reusable lessons as `promote`, `reject`, `quarantine`, or `keep_local`.
- Promote only source-backed, reusable, non-secret lessons that strengthen a gate, checklist, source rule, or failure guard without weakening profile concision.
- Keep private, project-specific, speculative, or unverified lessons out of public repos unless the user explicitly approves publication.

## Current Public Order

1. Portfolio.
2. Sponsor link.
3. Active flagships: ModelTab, nFIRE, FIFA-WC-Sim, LocalFirstApps.
4. Stable utilities through LocalFirstApps only.
5. Project principles.

## Required Checks

```bash
npm run qa
git diff --check
```

Also check all public links manually or with a link checker before pushing.
