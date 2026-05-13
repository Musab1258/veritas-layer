# System Overview

## Purpose

Veritas Layer is designed as a compliance and privacy middleware layer for regulated asset issuance and settlement on Stellar. It does not replace Stellar's native asset primitives. It orchestrates identity proofs, policy decisions, and service workflows around them.

## Current implementation status

Implemented now:

- landing page application
- monorepo tooling
- design tokens and brand guidance
- documentation and architecture definition

Planned next:

- Soroban contracts
- zk proof orchestration services
- indexer and API surfaces
- issuer-facing product interfaces

## Design principles

- keep settlement anchored to Stellar primitives
- keep heavy proof generation off-chain
- verify compliance outcomes on-chain
- separate issuer operations from investor identity data
- expose deterministic APIs and event surfaces for integrators

## Target system layers

### Client layer

- issuer operators
- investor wallets
- internal compliance operators
- dashboards, SDKs, and partner integrations

### Service layer

- identity service
- zk engine
- API gateway
- indexer
- operational monitoring and audit services

### Execution layer

- Soroban contracts for policy validation, issuance orchestration, and settlement controls
- Stellar accounts, trustlines, and asset authorization flags for final asset behavior

### Data layer

- event index database
- issuer and policy configuration storage
- audit logs
- revocation and attestation state

## System flow

1. An issuer configures an asset and an associated compliance policy.
2. An investor obtains an off-chain credential from an approved identity source.
3. The investor wallet or delegated client generates a proof for a specific action.
4. A service or client submits the proof and action request.
5. Soroban contracts verify the action against policy rules and proof outputs.
6. If approved, the settlement path executes using Stellar-native asset controls.
7. The indexer records events for dashboards, reporting, and audit workflows.

## Key boundaries

- raw identity documents and KYC records remain off-chain
- proof outputs reveal only the minimum policy-relevant facts
- no frontend may bypass policy enforcement
- settlement is authoritative only when protocol-level checks pass

## Related docs

- [smart contract architecture](./smart-contracts.md)
- [zk architecture](./zk-architecture.md)
- [compliance engine](./compliance-engine.md)
- [settlement engine](./settlement-engine.md)
- [system architecture diagram](../diagrams/system-architecture.md)
