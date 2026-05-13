# Trust Assumptions

## Purpose

This document makes the intended trust boundaries explicit so contributors do not design components around hidden assumptions.

## Trusted or semi-trusted parties

### Identity providers

Assumed to perform KYC, accreditation, or jurisdiction checks correctly at the time of credential issuance. They are not assumed to be perfect forever, which is why revocation and expiry are required.

### Issuers

Assumed to define policies and operate within their legal obligations. They are not trusted to bypass protocol enforcement or silently alter immutable historical records.

### Veritas Layer maintainers and operators

Assumed to maintain service availability and deploy reviewed code. They are not trusted as a substitute for on-chain policy enforcement.

## Minimal trust goals

- trust off-chain actors for attestations, not for final enforcement
- trust wallets to hold user secrets, not to self-attest compliance
- trust indexers for convenience reads, not as an authoritative settlement source

## Explicit non-assumptions

- the frontend is not trusted
- integrators are not trusted to preserve policy semantics
- private services are not trusted to override on-chain rejections
- public chain observers are expected to exist

## Operational consequence

Whenever a design depends on an off-chain service, the docs and code should answer two questions:

1. What fact is this service allowed to assert?
2. What independent check prevents that assertion from becoming a silent bypass?
