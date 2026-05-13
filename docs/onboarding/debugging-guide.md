# Debugging Guide

The current repository is intentionally narrow, but contributors still hit a few predictable failure modes. Start here before assuming the architecture is wrong.

## `npm install` or workspace command failures

Check:

- Node.js is version 22 or newer
- npm is version 11 or newer
- you ran commands from the repository root

If the landing app fails to start after dependency changes, delete local caches only if you understand the impact. Avoid changing lockfiles casually.

## `npm run docs:check` failures

The docs checker only validates relative Markdown links. A failure usually means:

- a file was renamed without updating links
- a new onboarding doc points to the wrong directory
- a README references a planned file that does not exist yet

Fix the link target rather than removing the reference unless the documentation itself is wrong.

## `npm run build` or `npm run typecheck` failures

Common causes:

- shared types changed without updating all consumers
- imports moved across workspace paths
- UI copy or component props no longer match the current MVP state model

When debugging, start from `packages/shared-types/src/index.ts` and work outward. Most app-level type drift originates there.

## Cargo workspace failures

If contract tests fail:

- run `cargo test --manifest-path contracts/Cargo.toml`
- confirm the change respects deterministic state transitions
- check whether the failure belongs in `shared` primitives or an individual contract crate

Do not patch around a failing invariant in frontend code. Fix the contract-core logic or document why the expectation changed.

## MVP behavior looks stale or inconsistent

The MVP uses in-process state. Reset the local environment before deeper debugging:

- use the reset action in the UI
- retry the flow from wallet connection through proof submission

Because there is no database, unexpected behavior is usually state sequencing, not persistence corruption.

## Soroban CLI not found

That is not a blocker for most current repository work. The contract workspace is intentionally implemented as pure Rust reference logic until the deployment path becomes active.
