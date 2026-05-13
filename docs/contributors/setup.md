# Contributor Setup

## Current scope

Phase 4 expands contributor readiness around the existing Phase 3 MVP. Contributors can fully work on:

- documentation
- the landing page
- monorepo tooling
- architecture planning
- onboarding and workflow infrastructure
- SDK ergonomics and shared typing

The Rust contract-core workspace is implemented today. The backend service layer is still mostly scaffolded and documented rather than deployed.

## Requirements

- Node.js 22+
- npm 11+

Optional for future phases:

- Rust
- Cargo
- Soroban CLI
- Docker

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Validate your environment

```bash
npm run docs:check
npm run lint
npm run typecheck
npm run build
```

## Continue here

For the full onboarding path, continue to:

- `docs/onboarding/architecture-walkthrough.md`
- `docs/onboarding/environment-setup.md`
- `docs/onboarding/local-development.md`
