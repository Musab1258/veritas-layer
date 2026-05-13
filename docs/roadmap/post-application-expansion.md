# Phase 6 Post-Application Expansion

Phase 6 is the first product-expansion phase after application packaging. It is documented locally here so contributors can see which subsystem work comes next.

## Primary objective

Scale the current MVP into a more institutionally credible protocol surface without collapsing the modular architecture.

## Expansion priorities

### Compliance engine

- jurisdiction-specific policy modules
- accreditation tiers
- investor cap and issuer restriction logic
- sanctions and revocation feed integration points
- transfer lockups and vesting-aware controls

### Asset support

Recommended order:

1. treasury products
2. private credit
3. bonds
4. tokenized real estate
5. invoices
6. commodities

### zk systems

- explicit proof serialization boundaries
- prover and verifier interface contracts
- stronger credential tree and revocation semantics
- future support for aggregation and recursive proof strategies

### Institutional APIs

- reporting exports
- compliance preflight endpoints
- eligibility status queries
- analytics and audit export surfaces

### Ecosystem integrations

- wallet integrations such as Freighter
- KYC provider adapters
- observability and analytics providers
- issuer and custody integration paths

## Local implementation boundary

This repository does not yet implement the full Phase 6 product surface. What exists locally today is:

- documented target architecture
- MVP route and service boundaries
- contract workspace that can absorb deeper policy logic
- SDK and shared types that can be extended without a monorepo reshape

The next local work should extend those existing boundaries rather than introduce a parallel stack.
