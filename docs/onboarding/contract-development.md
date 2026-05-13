# Contract Development

Veritas Layer currently models its contract layer as Rust reference logic aligned to a future Soroban deployment path.

## Current state

The contract workspace lives in `contracts/` and includes:

- `identity-registry`
- `compliance-engine`
- `transfer-policy`
- `asset-engine`
- `shared`

These crates are not yet deployed Soroban artifacts. They exist to keep the policy and compliance logic modular, testable, and contributor-readable before network deployment concerns are added.

## Working rules

When contributing to contracts:

- keep authorization and validation paths explicit
- prefer deterministic inputs and outputs
- centralize shared primitives in `contracts/shared`
- document any new events, error cases, or trust assumptions
- avoid embedding off-chain proving behavior directly into contract logic

## Commands

Run the Rust workspace tests with:

```bash
cargo test --manifest-path contracts/Cargo.toml
```

## How contract changes should connect back to the MVP

Even though the MVP is mostly TypeScript today, contract work should still map to the documented system behavior:

- credential issuance and revocation
- proof-backed eligibility validation
- transfer authorization and rejection
- issuer-controlled asset policy execution

If you change any of those semantics, update the related architecture and contributor docs in the same pull request.

## What not to assume yet

Do not assume:

- Soroban deployment scripts exist
- testnet addresses are committed
- on-chain verifiers already accept real zk proofs
- service orchestration has moved out of the landing app runtime

Those are valid future tasks, but they are not current repo guarantees.
