# Testing Guide

## Current required checks

For changes in the current repository:

- `npm run docs:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Documentation changes

Documentation-only changes still require accuracy checks:

- commands must match the repo scripts
- architecture status must distinguish current implementation from target design
- links should resolve within the repository

## Future test layers

As contracts and services are added, the testing matrix should expand to include:

- unit tests
- integration tests
- contract tests
- proof verification compatibility tests
- policy and authorization edge-case tests

For the Phase 4 contributor workflow, use the detailed guide in `docs/onboarding/testing-guide.md`.
