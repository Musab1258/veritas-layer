# Local Development

This document explains how contributors should work inside the repository without confusing current implementation with future architecture.

## Primary application surface

Run the landing app and MVP locally:

```bash
npm run dev
```

The main routes are:

- `/` for the project landing page
- `/mvp` for the Phase 3 zk compliance walkthrough that now sits inside the Phase 4 contributor-ready repo

## Validation workflow

Before opening a pull request, run the checks that match your changes:

```bash
npm run docs:check
npm run lint
npm run typecheck
npm run build
```

If you touched any Rust logic:

```bash
npm run contracts:test
```

## How to work by subsystem

### Landing page and MVP UI

- edit files under `apps/landing/`
- keep visible phase messaging accurate
- include screenshots in the PR for layout or interaction changes

### SDK and shared types

- update `packages/shared-types` before changing API or state shapes
- update `packages/sdk` when contributor-facing client ergonomics improve
- make sure UI code and API routes still align with the new types

### Contracts

- keep logic deterministic and small in scope
- prefer changes that improve rule clarity or test coverage
- document any mismatch between current Rust reference logic and target Soroban behavior

### Documentation

- update docs as part of the same change when behavior or scope shifts
- treat docs as product infrastructure, not an afterthought
- run `npm run docs:check` whenever links or file moves are involved

## Local state model

The MVP stores runtime state in-process. That means:

- refreshing and resets are expected parts of local testing
- there is no persistence layer to debug yet
- changes to API routes can affect the whole MVP interaction flow quickly

If behavior seems inconsistent, use the reset flow from the MVP UI before assuming a deeper bug.
