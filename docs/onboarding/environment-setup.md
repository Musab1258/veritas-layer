# Environment Setup

This guide defines the local toolchain expected for Phase 4 contributor work.

## Required now

- Node.js 22 or newer
- npm 11 or newer

These are enough for:

- landing page work
- MVP flow changes
- documentation updates
- SDK and shared-types changes
- contributor workflow and CI improvements

## Recommended for contract work

- Rust stable via `rustup`
- Cargo

These are required when working in `contracts/`.

## Optional for later phases

- Soroban CLI
- Docker
- PostgreSQL

Those tools matter for future staging, indexing, and deployment work, but the current repository does not require them for normal contributor onboarding.

## Install and verify

Install the JavaScript workspace dependencies:

```bash
npm install
```

Verify the contributor toolchain:

```bash
npm run docs:check
npm run lint
npm run typecheck
npm run build
```

Verify the Rust workspace when touching contracts:

```bash
cargo test --manifest-path contracts/Cargo.toml
```

## Recommended startup sequence

Use this sequence for a clean local session:

```bash
npm install
npm run docs:check
npm run dev
```

In a second terminal, run contract tests only when your changes touch `contracts/`.

## Environment notes

- the main contributor runtime is the Next.js app in `apps/landing`
- the MVP API is local to the app, so no extra backend process is required
- there is no committed Docker Compose stack yet, so do not assume containerized infrastructure exists locally
