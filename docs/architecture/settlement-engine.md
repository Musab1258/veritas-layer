# Settlement Engine

## Goal

The settlement engine coordinates asset state transitions after compliance has approved an action. It should support simple transfers first and expand toward more institutional settlement workflows over time.

## Scope by phase

### MVP scope

- compliance-aware transfer execution
- issuer-approved mint and burn orchestration
- deterministic settlement result reporting

### Later scope

- escrowed transfers
- delivery-versus-payment flows
- batched settlement windows
- counterparty approval workflows

## Settlement lifecycle

1. A client proposes a settlement action.
2. The compliance engine evaluates policy and proof requirements.
3. The settlement engine records or processes the approved action.
4. Stellar-native asset behavior finalizes the movement or authorization change.
5. Events are emitted for downstream indexing and reporting.

## Design constraints

- settlement must never bypass compliance outcomes
- issuer authority must be explicit for privileged actions
- later workflows should be additive, not rewrite the MVP path
- contracts should model state transitions clearly enough for audits

## Interaction with Stellar

Veritas Layer should use Stellar as the settlement foundation rather than replacing it. Relevant primitives include:

- issuer accounts
- trustlines
- authorization-required and revocable authorization flags
- clawback-enabled asset controls where legally appropriate

## Related docs

- [system overview](./system-overview.md)
- [settlement flow diagram](../diagrams/settlement-flow.md)
