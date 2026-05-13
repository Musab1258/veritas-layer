# Identity Lifecycle

## Objective

Identity handling in Veritas Layer must support compliance outcomes without centralizing raw user data inside the protocol.

## Lifecycle stages

### 1. Onboarding

An investor or institution completes checks with an approved identity or KYC provider.

### 2. Credential issuance

The provider issues an attestation covering facts such as:

- KYC completion
- jurisdiction or residency
- accreditation or investor class
- institutional eligibility

### 3. Wallet binding

The credential is bound to a wallet or delegated identity container so it cannot be replayed across unrelated holders.

### 4. Proof generation

The user generates a proof for a narrow action, such as requesting access to a regulated asset or submitting a transfer.

### 5. Verification

Veritas Layer validates the proof, expiry, policy context, and revocation state before accepting the action.

### 6. Revocation and revalidation

Credentials can be revoked or refreshed. Revalidation should be expected as regulatory and issuer policies evolve.

## Design requirements

- raw identity data remains off-chain
- proofs are purpose-bound and time-bound
- issuer decisions are based on policy outcomes, not direct document access
- revocation checks are part of the validation path

## Related docs

- [zk architecture](./zk-architecture.md)
- [identity lifecycle diagram](../diagrams/identity-lifecycle.md)
