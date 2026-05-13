# API Architecture

## Goal

The API layer exposes Veritas Layer to integrators without weakening protocol guarantees. APIs should orchestrate workflows, not replace on-chain enforcement.

## Surfaces

### REST API

Used for:

- operational actions
- issuer workflows
- compliance preflight requests
- machine-to-machine integrations

### GraphQL API

Used for:

- dashboards
- indexed read models
- flexible internal and partner queries

### SDKs

Used for:

- typed client access
- wallet and proof submission helpers
- standardized error handling

## Auth model

- wallet-based signatures for user actions
- issuer and operator sessions for back-office workflows
- API keys for server-to-server integrations where appropriate
- role-based permissions for issuer administration

## API design rules

- versioned endpoints under `/v1`
- idempotent mutation paths where replay risk exists
- explicit error codes for policy denials
- separation of write APIs from analytics-heavy read APIs
- no API path may imply a successful on-chain action until settlement is confirmed

## Related docs

- [REST API](../api/rest-api.md)
- [GraphQL schema](../api/graphql-schema.md)
- [auth flow](../api/auth-flow.md)
- [API architecture diagram](../diagrams/api-architecture.md)
