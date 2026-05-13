# Contributor Workflows

Phase 4 is about reducing contributor uncertainty. This document defines the expected flow from issue selection to merge.

## 1. Pick or propose scoped work

Use one of these entry points:

- an existing GitHub issue
- the local [curated issue backlog](../contributors/curated-issues.md)
- a docs or architecture gap you can justify clearly

If the work changes system boundaries, open the discussion before writing a large patch.

## 2. Create a focused branch

Recommended naming:

- `feature/<scope>`
- `fix/<scope>`
- `docs/<scope>`
- `research/<scope>`

## 3. Keep changes architecture-aware

Every pull request should make clear:

- which subsystem changed
- whether the subsystem is implemented or planned
- what contributor or product behavior changed
- whether any docs or diagrams need to move with it

## 4. Run validation before review

Minimum validation:

- `npm run docs:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Add `npm run contracts:test` when contracts changed.

## 5. Open the pull request with full context

Use the PR template and explain:

- the problem being solved
- architecture impact
- validation performed
- security or trust-boundary implications
- screenshots for UI changes

## 6. Review expectations

Maintainers should be able to answer these questions quickly from the PR:

- Is the scope coherent?
- Does the implementation match the documented phase?
- Are validation steps sufficient?
- Does the change introduce new trust assumptions?

If the answer to any of those is unclear, the PR is not ready yet.
