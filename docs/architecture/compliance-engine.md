# Compliance Engine

## Goal

The compliance engine is the policy decision layer for Veritas Layer. It determines whether an asset action is permitted before the action reaches settlement finalization.

## Policy model

Policies should be explicit, composable, and attached to asset definitions. A policy can include:

- jurisdiction restrictions
- KYC status requirements
- accreditation requirements
- ownership concentration limits
- issuer-only or institution-only actions
- holding periods and lockups

## Validation flow

1. Receive a transfer or issuance-related action request.
2. Resolve the asset's active policy set.
3. Bind the request to the acting wallet and transaction context.
4. Verify proof outputs or issuer permissions.
5. Evaluate policy rules in deterministic order.
6. Return approval or a precise rejection reason.

## Enforcement rules

- protocol enforcement is mandatory
- UI-only allowlists are insufficient
- missing proof data must fail closed
- policy upgrades must be auditable

## Data dependencies

- asset metadata from the asset engine
- policy definitions from issuer configuration
- proof outputs from the zk subsystem
- revocation and attestation state
- chain context for balances, trustlines, and settlement constraints

## Example MVP decisions

- can this wallet hold the asset
- can this transfer occur between these two parties
- has the required holding period elapsed
- does the wallet satisfy an issuer-defined investor class

## Operational concerns

- deterministic error codes for SDKs and dashboards
- replay protection for proof-backed actions
- event emission for approvals and denials
- versioned policy definitions for safe migration

## Related docs

- [settlement engine](./settlement-engine.md)
- [threat model](../security/threat-model.md)
- [compliance execution diagram](../diagrams/compliance-execution-flow.md)
