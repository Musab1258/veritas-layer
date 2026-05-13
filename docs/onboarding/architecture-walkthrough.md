# Architecture Walkthrough

This document is the fastest path from "I just cloned the repo" to "I understand where contributions fit."

## Current implementation boundary

What exists today:

- a production-quality landing page in `apps/landing`
- a Phase 3 MVP flow at `/mvp`
- typed API routes that simulate wallet connection, mock KYC, proof generation, proof submission, and transfer execution
- reusable shared types and a small SDK surface for the MVP
- Rust contract-core crates that model compliance, transfer, and issuance logic

What remains target architecture:

- deployed Soroban contracts
- persistent databases and indexing infrastructure
- real zk proving backends
- hosted staging and observability environments

Contributors should treat those missing layers as planned surfaces, not already-live systems.

## End-to-end flow

The current MVP expresses the project thesis through one narrow subsystem:

1. A wallet connects through the landing app.
2. An issuer or contributor completes mock KYC for that wallet.
3. The system issues a typed credential record.
4. A proof preview is generated from credential data and policy inputs.
5. The proof is submitted through the MVP API.
6. Eligibility is recorded after compliance validation.
7. A transfer request checks the active policy and wallet state.
8. Audit events capture each step for later review.

Primary implementation paths:

- `apps/landing/app/mvp/page.tsx`
- `apps/landing/components/mvp/mvp-dashboard.tsx`
- `apps/landing/app/api/mvp/`
- `packages/sdk/src/`
- `packages/shared-types/src/index.ts`

## Module responsibilities

### `apps/landing`

Public project surface and the current MVP runtime. Most immediately testable contributor work lives here.

### `packages/shared-types`

Canonical TypeScript contracts for wallets, credentials, policies, proofs, transfers, and audit events. If an API shape changes, update this package first.

### `packages/sdk`

Thin developer surface over the MVP API and proof preview helpers. This is the first layer future integrators should consume instead of re-implementing request wiring.

### `contracts/`

Rust contract-core logic for identity, compliance, transfer policy, and asset issuance. These crates are deterministic reference modules aligned to a later Soroban deployment path.

### `services/`

Target off-chain service surfaces for identity, proving, relay, indexing, and audit functionality. The repo documents these now, but most runtime behavior still lives inside the MVP route handlers.

### `docs/`

Architecture, security, API, roadmap, contributor, and onboarding documentation. Documentation is a first-class subsystem in this repository.

## Trust boundaries

Contributors should keep these boundaries explicit:

- raw KYC data should never be modeled as on-chain state
- compliance verification outputs can be shared more broadly than credentials
- frontend validation improves UX but does not enforce security
- proving remains off-chain unless a contract verifier interface explicitly requires otherwise
- policy execution must be deterministic wherever it crosses a contract boundary

## Event lifecycle

The current MVP is stateful enough to teach contributors how operational data should move:

- wallet events mark connection and session changes
- KYC and credential events describe eligibility preparation
- proof events describe generation and submission
- transfer events capture approval or rejection outcomes
- audit events provide the review surface for maintainers and operators

If you add new flows, keep those event categories coherent with `packages/shared-types/src/index.ts`.

## Where to contribute first

Good first areas:

- landing page sections and copy accuracy
- contributor docs and diagrams
- SDK ergonomics and typing improvements
- MVP flow polish and validation
- contract tests and deterministic rule handling

Use the [curated issue backlog](../contributors/curated-issues.md) when you want work that already fits the architecture map.
