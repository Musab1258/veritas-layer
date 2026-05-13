# Development Workflow

## Working model

Treat each change as one of three categories:

- implemented surface changes
- architecture and planning changes
- repo tooling changes

## Repo areas

- `apps/landing`: current user-facing application
- `packages/design-tokens`: shared visual tokens
- `docs/`: architecture, security, API, roadmap, and contributor docs
- `contracts/`, `services/`, `packages/`: reserved surfaces for upcoming phases

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
