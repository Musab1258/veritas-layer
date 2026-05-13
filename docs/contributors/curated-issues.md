# Curated Issue Backlog

This file is the Phase 4 source material for the public GitHub issue backlog. It is intentionally repo-local so maintainers can publish and refine issues manually without losing the architecture mapping.

Each entry includes the same structure the public issue should use:

- context
- technical scope
- acceptance criteria
- references

## Frontend

### FE-01 Build architecture visualization section for the landing page

- Labels: `frontend`, `architecture`, `help wanted`
- Context: The landing page already explains the system, but the architecture section can become more contributor-legible with a stronger visual breakdown of wallets, services, contracts, and settlement.
- Technical scope: Refine `apps/landing/components/landing-page.tsx` and supporting styles to deepen the architecture visualization without misrepresenting unimplemented infrastructure.
- Acceptance criteria: the section is more legible on desktop and mobile, phase messaging stays accurate, and `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- References: `docs/architecture/system-overview.md`, `docs/diagrams/system-architecture.md`

### FE-02 Implement investor activity log table enhancements in the MVP

- Labels: `frontend`, `testing`, `help wanted`
- Context: The MVP demonstrates audit events, but the activity surface can better support reviewer understanding with stronger filtering or grouping.
- Technical scope: Extend `apps/landing/components/mvp/mvp-dashboard.tsx` and related types or state selectors as needed.
- Acceptance criteria: contributors can inspect audit activity more clearly, no state regressions are introduced, and the app validations pass.
- References: `apps/landing/app/api/mvp/_lib/state.ts`, `packages/shared-types/src/index.ts`

### FE-03 Add explicit contributor entry section to the landing page

- Labels: `frontend`, `docs`, `good first issue`
- Context: The landing page should point future contributors toward onboarding assets without pretending a full docs site exists inside the app.
- Technical scope: Add or refine a contributor-focused section in `apps/landing/components/landing-page.tsx`.
- Acceptance criteria: the section references current repo surfaces accurately and passes frontend validation.
- References: `docs/onboarding/README.md`, `CONTRIBUTING.md`

### FE-04 Improve MVP error-state messaging for rejected proofs and transfers

- Labels: `frontend`, `testing`, `good first issue`
- Context: Contributors exploring the MVP should understand why a proof or transfer failed without reading the source first.
- Technical scope: Tighten UI copy and presentation around rejection paths in the MVP dashboard.
- Acceptance criteria: rejection states expose actionable context, the UX remains consistent, and no new type errors are introduced.
- References: `apps/landing/components/mvp/mvp-dashboard.tsx`, `packages/shared-types/src/index.ts`

## Backend and services

### BE-01 Create typed API route helpers for MVP response handling

- Labels: `backend`, `api`, `sdk`, `help wanted`
- Context: The current MVP route handlers can evolve toward a cleaner service boundary with shared response utilities and error handling.
- Technical scope: Refactor the route handlers under `apps/landing/app/api/mvp/` into a more explicit typed request-response pattern.
- Acceptance criteria: route behavior stays the same, type safety improves, and the landing app validations pass.
- References: `docs/architecture/api-architecture.md`, `packages/shared-types/src/index.ts`

### BE-02 Extract audit log mapping helpers from the MVP state layer

- Labels: `backend`, `architecture`, `good first issue`
- Context: The audit trail is central to the product narrative and deserves clearer helper boundaries.
- Technical scope: Refactor `apps/landing/app/api/mvp/_lib/state.ts` into smaller utilities without changing the external behavior.
- Acceptance criteria: event creation is easier to read and maintain, and all current app validations pass.
- References: `docs/architecture/indexing.md`, `docs/security/trust-assumptions.md`

### BE-03 Define service interface contracts for the planned identity and zk engines

- Labels: `backend`, `architecture`, `research`
- Context: The repo documents service modules, but contributors need sharper interfaces before runtime extraction work begins.
- Technical scope: Produce or update typed interfaces and documentation for the boundary between `identity-service`, `zk-engine`, and the API surface.
- Acceptance criteria: the interface boundaries are documented, shared types remain consistent, and maintainers can use the result to break out service work later.
- References: `docs/architecture/system-overview.md`, `docs/architecture/zk-architecture.md`

## Smart contracts

### SC-01 Implement credential revocation validation in `compliance-engine`

- Labels: `smart-contract`, `testing`, `high priority`
- Context: Revocation logic is one of the most important compliance controls in the contract layer.
- Technical scope: Extend `contracts/compliance-engine` and any shared primitives required to reject revoked credentials deterministically.
- Acceptance criteria: revoked credentials return false, affected tests pass, and any new events or errors are documented.
- References: `docs/architecture/compliance-engine.md`, `contracts/compliance-engine/src/lib.rs`

### SC-02 Add jurisdiction restriction checks to `transfer-policy`

- Labels: `smart-contract`, `testing`, `high priority`
- Context: Jurisdiction-aware transfer gating is core to the Veritas Layer thesis.
- Technical scope: Extend the policy evaluation logic in `contracts/transfer-policy`.
- Acceptance criteria: disallowed jurisdictions reject transfers deterministically, tests cover edge cases, and docs remain aligned.
- References: `docs/architecture/smart-contracts.md`, `docs/security/privacy-model.md`

### SC-03 Add explicit error codes for issuer-gated asset operations

- Labels: `smart-contract`, `architecture`, `help wanted`
- Context: Contract contributors should not have to infer failure reasons from generic errors.
- Technical scope: Improve error modeling in `contracts/asset-engine` and any shared enums or helpers.
- Acceptance criteria: issuer-only failures are explicit and tests remain green.
- References: `contracts/asset-engine/src/lib.rs`, `contracts/shared/src/lib.rs`

## zk

### ZK-01 Document a future Noir circuit boundary for KYC eligibility proofs

- Labels: `zk`, `research`, `architecture`
- Context: The repo needs a sharper handoff between the current mock proof flow and a future real proving stack.
- Technical scope: Extend `docs/architecture/zk-architecture.md` with circuit boundary assumptions, public inputs, and verifier integration notes.
- Acceptance criteria: the document distinguishes current implementation from future proving work clearly.
- References: `docs/onboarding/zk-development.md`, `packages/sdk/src/proofs.ts`

### ZK-02 Build typed proof serialization helpers for future verifier inputs

- Labels: `zk`, `sdk`, `help wanted`
- Context: Proof-related data structures should be ready for future prover and verifier integration without large refactors.
- Technical scope: Extend `packages/sdk` and `packages/shared-types` with explicit serialization helpers or types.
- Acceptance criteria: types remain coherent across the app and SDK, and the workspace validations pass.
- References: `packages/sdk/src/proofs.ts`, `packages/shared-types/src/index.ts`

### ZK-03 Add credential Merkle tree utility design notes

- Labels: `zk`, `research`, `docs`
- Context: Credential revocation and selective disclosure will eventually depend on stronger membership update semantics.
- Technical scope: Write a design note that explains how a Merkle tree update utility would fit the current credential model.
- Acceptance criteria: the note covers tree ownership, update cadence, and revocation implications without overstating current implementation.
- References: `docs/architecture/identity-lifecycle.md`, `docs/security/privacy-model.md`

## API and SDK

### API-01 Back the MVP REST API docs with the implemented routes

- Labels: `api`, `docs`, `high priority`
- Context: The API docs should distinguish implemented MVP routes from target future surfaces more concretely.
- Technical scope: Update `docs/api/rest-api.md` and `docs/api/openapi.yaml` to mirror the current MVP route set where appropriate.
- Acceptance criteria: the documentation matches implemented route names and status accurately, and doc links remain valid.
- References: `apps/landing/app/api/mvp/`, `docs/api/openapi.yaml`

### SDK-01 Add a package README and usage examples for `@veritas-layer/sdk`

- Labels: `sdk`, `docs`, `good first issue`
- Context: Contributors should be able to discover the intended SDK surface quickly.
- Technical scope: Add or refine package documentation and examples in `packages/sdk/`.
- Acceptance criteria: the README explains current exports and usage accurately without presenting the SDK as production-ready.
- References: `packages/sdk/src/index.ts`, `packages/shared-types/src/index.ts`

### SDK-02 Add typed error handling helpers to `VeritasMvpClient`

- Labels: `sdk`, `backend`, `help wanted`
- Context: The current client throws generic `Error` objects, which is serviceable but weak for integrator ergonomics.
- Technical scope: Extend `packages/sdk/src/client.ts` with better typed error handling while preserving current behavior.
- Acceptance criteria: consuming code can distinguish API failures more clearly and the app still passes validation.
- References: `packages/sdk/src/client.ts`, `docs/architecture/api-architecture.md`

## Testing

### TEST-01 Add end-to-end coverage for compliant transfer approval and rejection

- Labels: `testing`, `high priority`, `architecture`
- Context: The MVP thesis depends on demonstrating both approval and rejection paths reliably.
- Technical scope: Add tests around the transfer flow and supporting state transitions in the MVP or contract-core logic.
- Acceptance criteria: at least one approval case and one rejection case are covered with clear assertions.
- References: `apps/landing/app/api/mvp/`, `contracts/transfer-policy/src/lib.rs`

### TEST-02 Add contract tests for revoked or expired credentials

- Labels: `testing`, `smart-contract`, `help wanted`
- Context: Credential lifecycle edge cases are central to compliance integrity.
- Technical scope: Expand Rust tests across `identity-registry` and `compliance-engine`.
- Acceptance criteria: revocation and expiry behavior is covered and deterministic.
- References: `contracts/identity-registry/src/lib.rs`, `contracts/compliance-engine/src/lib.rs`

### TEST-03 Extend docs validation to contributor workflow files

- Labels: `testing`, `infrastructure`, `good first issue`
- Context: Contributor docs grow quickly in Phase 4 and need guardrails.
- Technical scope: Improve the docs checker or its coverage so onboarding and contributor files remain easy to maintain.
- Acceptance criteria: documentation validation remains fast, deterministic, and useful in CI.
- References: `scripts/verify-doc-links.mjs`, `.github/workflows/ci.yml`

## Documentation

### DOC-01 Add contract interaction diagrams for contributor onboarding

- Labels: `docs`, `architecture`, `help wanted`
- Context: New contributors benefit from a simpler flow diagram than the full architecture set.
- Technical scope: Add a contributor-focused contract or compliance flow diagram and link it from onboarding docs.
- Acceptance criteria: the diagram is technically accurate and improves contributor orientation.
- References: `docs/onboarding/architecture-walkthrough.md`, `docs/diagrams/smart-contract-architecture.md`

### DOC-02 Expand the debugging guide with CI failure patterns

- Labels: `docs`, `infrastructure`, `good first issue`
- Context: Contributor docs should explain common CI failures before maintainers have to repeat the same feedback.
- Technical scope: Extend `docs/onboarding/debugging-guide.md` with CI-oriented examples and remediation.
- Acceptance criteria: the guide covers Node, docs, and contract workflow failures clearly.
- References: `.github/workflows/ci.yml`, `docs/onboarding/testing-guide.md`

## Infrastructure

### INF-01 Add path-aware CI jobs for docs-only and contract-only changes

- Labels: `infrastructure`, `testing`, `help wanted`
- Context: The new CI workflow is useful but can become more efficient by reducing unnecessary work.
- Technical scope: Refine `.github/workflows/ci.yml` with path filtering or job conditions that still preserve confidence.
- Acceptance criteria: CI remains easy to reason about, and docs-only or contract-only pull requests can avoid unrelated runtime work where appropriate.
- References: `.github/workflows/ci.yml`, `docs/onboarding/contributor-workflows.md`
