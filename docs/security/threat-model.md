# Threat Model

## Objective

Veritas Layer handles regulated asset workflows, privacy-preserving identity checks, and policy enforcement. The threat model must therefore cover both blockchain execution risks and off-chain coordination risks.

## High-value assets

- issuer authority and policy configuration
- proof verifier integrity
- wallet-bound compliance credentials
- settlement state and transfer approvals
- indexed operational and audit data

## Threat actors

| Threat actor                | Goal                                                       |
| --------------------------- | ---------------------------------------------------------- |
| Malicious user              | Bypass transfer restrictions or obtain unauthorized access |
| Credential forger           | Submit false compliance proofs                             |
| Compromised issuer operator | Change policy or asset state illegitimately                |
| Rogue integrator            | Misuse APIs or misrepresent settlement state               |
| External attacker           | Exfiltrate sensitive data or disrupt operations            |

## Primary attack categories

### Replay attacks

Risks:

- resubmitting a valid proof or signed request
- replaying transfer approvals across contexts

Mitigations:

- nonces
- expiry windows
- wallet binding
- idempotent API handling

### Proof forgery or verifier mismatch

Risks:

- forged proof payloads
- unsupported circuit versions
- mismatch between off-chain proving assumptions and on-chain verification logic

Mitigations:

- audited verifier interfaces
- explicit circuit versioning
- integration tests across prover and verifier boundaries

### Transfer bypass attempts

Risks:

- direct contract calls that skip frontend checks
- integrator misuse of API preflight responses

Mitigations:

- contract-level enforcement only
- no trust in frontend validation
- clear API semantics that preflight approval is not settlement finality

### Credential theft or misuse

Risks:

- stolen attestation artifacts
- delegated clients submitting proofs for the wrong wallet

Mitigations:

- wallet ownership validation
- short-lived credentials where possible
- revocation support

### Regulatory and policy drift

Risks:

- stale policy definitions
- untracked issuer overrides
- incorrect assumptions about jurisdiction rules

Mitigations:

- versioned policies
- audit trails
- formal change management for issuer-controlled rules

## Security principles

- compliance enforcement must occur at the protocol level, not the frontend layer
- privacy controls must survive hostile clients
- revocation is part of the happy path, not an afterthought
- operational convenience must not weaken deterministic enforcement
