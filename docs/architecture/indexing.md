# Indexing Architecture

## Purpose

The indexer converts on-chain events and protocol state changes into queryable operational data for APIs, dashboards, and audits.

## Source inputs

- Soroban contract events
- Stellar asset and account events relevant to Veritas-managed assets
- issuer configuration changes
- revocation and credential lifecycle updates from trusted services

## Processing pipeline

1. Collect chain and protocol events.
2. Normalize them into domain events.
3. Persist them in query-optimized storage.
4. Expose them through REST, GraphQL, and internal reporting workflows.

## Stored views

- assets and issuance history
- transfer attempts and compliance outcomes
- settlement lifecycle states
- investor eligibility and revocation status metadata
- issuer policy versions and audit history

## Design requirements

- idempotent event handling
- replayable processors
- explicit chain finality handling
- stable event names and schemas
- separation between public operational data and restricted compliance data

## Operational outputs

- issuer dashboard queries
- investor portal activity feeds
- internal compliance monitoring
- exportable audit and regulator-ready reports

## Related docs

- [API architecture](./api-architecture.md)
- [indexing diagram](../diagrams/indexing-architecture.md)
