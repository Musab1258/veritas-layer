# zk Development

The current Veritas Layer MVP demonstrates proof-shaped workflows, not production zk proving.

## What exists today

- credential claims are modeled as typed data
- proof statements and previews are derived in `packages/sdk/src/proofs.ts`
- MVP API routes simulate proof generation and verification outcomes
- transfer eligibility depends on policy-aware proof submission

This is enough to test product flow, type contracts, and contributor ergonomics without pretending that the proving backend is already complete.

## What does not exist yet

- Noir, Circom, Halo2, or other real circuits
- a proving service with witness generation
- contract-level verification of production proof artifacts
- persistent revocation or Merkle tree infrastructure

## Contribution guidance

Good Phase 4 zk contributions:

- make proof inputs and outputs easier to reason about
- improve type safety around credential and proof records
- refine the proof preview and verifier handoff surfaces
- document how current mock flows map to future real-proof architecture

Poor Phase 4 zk contributions:

- adding fake cryptography that looks production-ready but is not
- mixing UI presentation logic with verifier assumptions
- introducing opaque helper layers that hide the proof model

## Required discipline

If you extend zk-related code:

- describe whether the change affects the current mock flow or the future real system
- preserve the boundary between off-chain proof generation and on-chain policy enforcement
- update `docs/architecture/zk-architecture.md` if the target design changes
