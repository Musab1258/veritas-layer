# Development Workflow

## Working model

Treat each change as one of three categories:

- implemented surface changes
- architecture and planning changes
- repo tooling changes

## Repo areas

- `apps/landing`: current user-facing application
- `packages/design-tokens`: shared visual tokens
- `packages/sdk`: typed MVP client and developer helpers
- `packages/shared-types`: canonical domain and API types
- `docs/`: architecture, security, API, roadmap, and contributor docs
- `contracts/`: current Rust contract-core reference logic
- `services/`: scaffolded service surfaces aligned to future extraction work

## Expected workflow

1. Confirm the scope you are changing.
2. Check whether the subsystem is implemented or architecture-only.
3. Keep the docs and visible phase messaging accurate.
4. Run the relevant validation commands.
5. Open a focused PR with explicit assumptions.

## Change discipline

- do not present planned features as already implemented
- keep architecture docs aligned with the Phase 0 research direction
- prefer narrow, reviewable changes over large mixed-scope patches
- run `npm run docs:check` whenever doc structure or links change

## Recommended deep dives

- `docs/onboarding/architecture-walkthrough.md`
- `docs/onboarding/contract-development.md`
- `docs/onboarding/zk-development.md`
- `docs/onboarding/contributor-workflows.md`
