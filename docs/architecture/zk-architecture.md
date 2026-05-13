# zk Architecture

## Objective

The zk subsystem allows Veritas Layer to prove compliance-relevant facts without publishing sensitive identity data on-chain.

## Boundary decisions

- credential issuance happens off-chain
- proof generation happens off-chain
- proof verification outputs are consumed on-chain
- raw KYC data never enters contract state

## Core actors

- identity provider or KYC partner
- issuer or compliance operator
- investor wallet
- zk engine
- Soroban verifier interface

## Proposed flow

1. A user completes KYC or accreditation checks with an approved provider.
2. The provider issues a credential or attestation.
3. The user stores the credential in a wallet or delegated secure client.
4. The user generates a proof for a specific action such as trustline activation or transfer.
5. The proof and public inputs are submitted to Veritas Layer.
6. Soroban verification accepts or rejects the compliance outcome.

## Verifier abstraction

The proving system should remain replaceable. Contracts should verify a normalized result shape, not hard-code themselves to a single proving stack unless there is a strong operational reason to do so.

Recommended abstraction points:

- circuit or proving system version
- policy identifier
- nonce or replay guard
- wallet binding
- attestation expiration

## Failure modes to handle

- revoked credentials
- expired attestations
- proof replay
- proof generated for the wrong wallet
- unsupported circuit version

## Implementation notes

The MVP should start with narrow proofs for binary eligibility decisions such as:

- KYC passed
- jurisdiction allowed
- accredited status confirmed

More expressive proofs can be layered in after the first policy engine is stable.

## Related docs

- [identity lifecycle](./identity-lifecycle.md)
- [privacy model](../security/privacy-model.md)
- [zk proof flow diagram](../diagrams/zk-proof-flow.md)
