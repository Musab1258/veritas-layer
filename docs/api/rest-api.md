# REST API

## Status

This API is architectural documentation for the Phase 3 implementation target. The endpoints below are not live yet.

## Conventions

- base path: `/v1`
- JSON request and response bodies
- explicit error codes for compliance denials
- idempotency for mutation endpoints that may be retried

## Authentication

- wallet signatures for end-user actions
- issuer sessions for operational workflows
- API keys for approved server-to-server integrations

## Endpoint groups

### Identity

| Method | Path                  | Purpose                                         |
| ------ | --------------------- | ----------------------------------------------- |
| `POST` | `/v1/identity/verify` | start or confirm identity verification workflow |
| `POST` | `/v1/identity/proof`  | submit or request a proof package for an action |
| `POST` | `/v1/identity/revoke` | revoke an attestation or mark it invalid        |

### Compliance

| Method | Path                               | Purpose                                    |
| ------ | ---------------------------------- | ------------------------------------------ |
| `POST` | `/v1/compliance/validate-transfer` | preflight a transfer against active policy |
| `GET`  | `/v1/compliance/policies`          | list active policy definitions             |

### Assets

| Method | Path                   | Purpose                                    |
| ------ | ---------------------- | ------------------------------------------ |
| `POST` | `/v1/assets/create`    | register a regulated asset definition      |
| `GET`  | `/v1/assets/{id}`      | fetch asset metadata and policy references |
| `POST` | `/v1/assets/{id}/mint` | request issuer-authorized minting          |

### Settlement

| Method | Path                     | Purpose                                   |
| ------ | ------------------------ | ----------------------------------------- |
| `POST` | `/v1/settlement/execute` | submit a settlement request               |
| `GET`  | `/v1/settlement/{id}`    | read settlement status and audit metadata |

## Error model

Responses should distinguish clearly between:

- malformed input
- authentication failure
- authorization failure
- proof verification failure
- policy denial
- temporary service unavailability

See [OpenAPI spec](./openapi.yaml) for the structured shape.
