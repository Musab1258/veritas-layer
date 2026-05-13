# Testing Guide

Phase 4 adds contributor workflow checks on top of the Phase 3 MVP validation path.

## Current required checks

Run these for most pull requests:

- `npm run docs:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Run this when touching the Rust workspace:

- `npm run contracts:test`

## What each check protects

### `npm run docs:check`

Confirms relative Markdown links still resolve after doc edits, file moves, or onboarding changes.

### `npm run lint`

Protects the landing app and MVP code from common correctness and style issues.

### `npm run typecheck`

Protects shared types, SDK contracts, and app integrations from silent drift.

### `npm run build`

Confirms the current Next.js app still bundles successfully.

### `npm run contracts:test`

Confirms contract-core behavior and Rust workspace integrity.

## Suggested validation matrix

- docs-only change: `npm run docs:check`
- frontend or MVP change: docs check, lint, typecheck, build
- SDK or shared-types change: docs check, lint, typecheck, build
- contract change: contract tests and any related docs updates
- CI or contributor workflow change: docs check plus the commands the workflow invokes

## Future test layers

Planned expansions after the current contributor infrastructure phase:

- contract integration tests against a Soroban-aware harness
- proof compatibility tests for real zk backends
- indexer and API service integration tests
- deployment smoke tests for staging environments
