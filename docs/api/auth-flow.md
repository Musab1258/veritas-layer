# Auth Flow

## Goal

Authentication in Veritas Layer should map cleanly to user actions, issuer operations, and machine integrations without confusing convenience with authority.

## End-user flow

1. A wallet signs a challenge.
2. The API exchanges the verified challenge for a short-lived session where appropriate.
3. The user submits proof-backed actions bound to that wallet.
4. On-chain validation remains the final enforcement boundary.

## Issuer and operator flow

1. An issuer operator authenticates through an approved administrative path.
2. The operator receives a scoped session tied to issuer roles.
3. Sensitive actions require explicit permissions and audit logging.

## Machine-to-machine flow

- API keys are limited to approved integration scopes
- privileged actions should still require issuer or wallet-level authorization where applicable
- keys must be rotatable and attributable

## Authorization principles

- authenticate the actor
- authorize the action separately
- log privileged changes
- fail closed on missing role or session context
