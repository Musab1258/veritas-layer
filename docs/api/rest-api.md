# REST API

## Status

The repository currently implements a local MVP API under `/api/mvp` inside the landing app.

The institutional `/v1` API described later in this document is still a target surface for later phases.

## Current MVP API

Base path:

- `/api/mvp`

Implemented routes:

| Method | Path                   | Purpose                                           |
| ------ | ---------------------- | ------------------------------------------------- |
| `GET`  | `/api/mvp/state`       | read the current MVP snapshot                     |
| `POST` | `/api/mvp/reset`       | reset the in-memory MVP environment               |
| `POST` | `/api/mvp/connect-wallet` | mark an investor wallet as connected           |
| `POST` | `/api/mvp/configure-asset` | update the demo asset and compliance policy    |
| `POST` | `/api/mvp/kyc`         | issue a mock KYC credential                       |
| `POST` | `/api/mvp/proof`       | generate an off-chain proof record                |
| `POST` | `/api/mvp/submit-proof` | verify a proof and mark the wallet eligible      |
| `POST` | `/api/mvp/transfers`   | execute a compliance-gated transfer               |

Notes:

- the MVP state is in-memory and process-local
- the flow is designed for contributor and reviewer walkthroughs
- the routes mirror the current Next.js implementation in `apps/landing/app/api/mvp/`

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

The following endpoint groups describe the target institutional API after the MVP routes are extracted into dedicated services and versioned surfaces.

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
