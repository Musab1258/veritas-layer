# Privacy Model

## Objective

Veritas Layer should verify compliance-relevant facts while minimizing exposure of personal and institution-sensitive data.

## Data classification

### Off-chain sensitive data

- KYC documents
- sanctions and AML review details
- raw accreditation records
- personally identifying information

### On-chain or protocol-visible data

- asset identifiers
- policy identifiers
- settlement events
- proof verification outcomes
- issuer actions and authorizations

## Privacy posture

- raw identity data stays off-chain
- proofs disclose only what a policy needs to know
- credentials are scoped to wallet and action context where possible
- indexing layers must separate public operational data from restricted compliance metadata

## Selective disclosure goals

Examples of acceptable disclosed facts:

- user passed KYC
- wallet belongs to an accredited investor
- residency is within an allowed jurisdiction set
- attestation is valid and not revoked

Examples of facts that should remain private:

- full legal name
- passport or national ID values
- full address history
- underlying provider dossier

## Residual visibility

Even with zero-knowledge proofs, some metadata may remain observable:

- timing of actions
- issuer activity patterns
- asset transfer frequency
- public settlement events

The privacy model therefore aims to reduce disclosure, not claim full anonymity.
