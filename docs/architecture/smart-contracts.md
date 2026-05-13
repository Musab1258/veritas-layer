# Smart Contract Architecture

## Role of contracts

Soroban contracts are responsible for deterministic enforcement, not rich off-chain orchestration. Contracts should validate policy-relevant facts, maintain asset and settlement state, and emit events that the indexer and APIs can consume.

## Contract modules

### `contracts/asset-engine`

Responsibilities:

- register asset definitions
- manage issuance metadata
- coordinate mint, burn, and supply actions
- attach policy identifiers to regulated assets

### `contracts/compliance-engine`

Responsibilities:

- validate transfers against policy rules
- verify proof outputs through a verifier interface
- enforce jurisdiction, accreditation, and holding restrictions
- fail closed when data or permissions are incomplete

### `contracts/settlement-engine`

Responsibilities:

- orchestrate compliant settlement state transitions
- handle approvals, escrows, and finalization paths in later phases
- coordinate delivery-vs-payment style flows where needed

### `contracts/shared`

Responsibilities:

- common authorization patterns
- shared event types
- verifier and policy interfaces
- reusable error codes and domain primitives

## Contract interaction model

1. Asset actions enter through the asset or settlement surface.
2. The compliance engine resolves the policy attached to the asset.
3. The compliance engine verifies the submitted proof output and wallet context.
4. If validation succeeds, settlement or issuance logic proceeds.
5. Contracts emit normalized events for indexing and audits.

## Design requirements

- deterministic inputs and outputs
- no reliance on frontend checks
- explicit authorization for issuer-only actions
- event schemas stable enough for indexing and SDK consumption
- verifier abstraction so proof systems can evolve without rewriting business logic

## Current status

These contract modules are architectural targets. Their directories are reserved in the monorepo, but the implementations are not scaffolded yet.

## Related diagram

- [smart contract architecture diagram](../diagrams/smart-contract-architecture.md)
