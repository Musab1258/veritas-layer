# Contributing to Veritas Layer

Thank you for contributing to Veritas Layer.

We welcome contributions across architecture, documentation, frontend engineering, smart contracts, backend services, SDKs, and security research.

## Development philosophy

Veritas Layer is being built as institutional infrastructure, not a demo app. Contributions should reinforce:

- modular architecture
- deterministic behavior
- security-first engineering
- explicit trust boundaries
- contributor clarity

## Current repository state

The primary implemented application surface today is `apps/landing`. The repository also includes shared types, a small MVP SDK surface, Rust contract-core crates, and typed service scaffolding aligned to the documented architecture.

That matters for contributor expectations:

- documentation and architecture changes can be merged now
- landing page, SDK, shared-type, and workspace tooling changes can be tested locally now
- contract contributions can be validated with the current Rust workspace
- service contributions should stay aligned with the Phase 2 architecture until those modules move out of scaffolded form

## Prerequisites

Required for current work:

- Node.js 22+
- npm 11+

Expected for later contract and service work:

- Rust
- Cargo
- Soroban CLI
- Docker

## Local development

Install dependencies:

```bash
npm install
```

Run the landing app:

```bash
npm run dev
```

Validate the current workspace:

```bash
npm run docs:check
npm run lint
npm run typecheck
npm run build
```

## Branching strategy

Use the following branch naming conventions:

- `main`
- `develop`
- `feature/*`
- `fix/*`
- `docs/*`
- `research/*`

If `develop` is not active yet, branch from `main`.

## Commit conventions

Use Conventional Commits.

Examples:

```text
feat(identity): add credential revocation model
fix(landing): tighten architecture section spacing
docs(architecture): define settlement engine boundaries
```

## Pull request workflow

1. Confirm the issue or architecture gap you are addressing.
2. Create a focused branch with a clear scope.
3. Open a draft PR early if the work benefits from discussion.
4. Run relevant validation locally before requesting review.
5. Convert the PR from draft only when the change is ready for maintainership review.

PRs should include:

- the problem being solved
- the architectural or product impact
- the files or subsystems touched
- any open risks, assumptions, or follow-up work

## Issue assignment flow

1. A contributor comments on an open issue or proposes a new scoped task.
2. A maintainer confirms ownership or redirects scope.
3. The contributor opens a branch and, when useful, a draft PR.
4. Validation runs locally and in CI once configured.
5. Maintainers review, request revisions, and merge when ready.

## Testing requirements

For the current repository state:

- contributor documentation changes must pass `npm run docs:check`
- landing page changes must pass `npm run lint`
- landing page changes must pass `npm run typecheck`
- changes that affect bundling or imports should also pass `npm run build`
- documentation changes must keep links, commands, and status descriptions accurate

Detailed onboarding lives in:

- `docs/onboarding/README.md`
- `docs/onboarding/architecture-walkthrough.md`
- `docs/onboarding/debugging-guide.md`

For upcoming contract and backend modules:

- unit tests are required
- integration tests are required for cross-module behavior
- auth, policy, and settlement edge cases must be covered
- security-sensitive logic must not rely on frontend-only validation

## Coding standards

### TypeScript

- strict typing only
- no implicit `any`
- prefer explicit domain names over vague utility abstractions
- keep UI copy aligned with the repo phase and actual implementation status

### Rust and Soroban

- explicit error handling
- small contract modules with well-defined responsibilities
- reusable shared primitives for auth, events, and policy interfaces
- no assumptions that off-chain services are honest without verification

### Documentation

- write in a calm, technical, infrastructure-oriented tone
- distinguish clearly between implemented features and target architecture
- prefer operational clarity over marketing language

## Security expectations

- never commit secrets, API keys, or seed phrases
- never add bypass logic around compliance or authorization paths
- never trust frontend validation as a control boundary
- route security-sensitive findings through the private reporting path in [SECURITY.md](./SECURITY.md)

Security-sensitive discussions may be redirected to private channels by maintainers.
