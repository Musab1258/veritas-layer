# Contracts

Phase 3 adds a Rust contract-core workspace that models the first MVP slice:

- `identity-registry`
- `compliance-engine`
- `transfer-policy`
- `asset-engine`
- `shared`

These crates are deterministic reference logic for the zk compliance MVP:

- credential issuance and revocation
- proof-backed eligibility validation
- policy enforcement for KYC, accreditation, and jurisdiction gates
- issuer-gated transfer execution

The machine does not currently include the Soroban CLI, so this workspace is implemented as pure Rust contract-core logic and tests rather than deployed Soroban artifacts. The architecture and interfaces are aligned to the Soroban upgrade path documented in `docs/architecture/`.
