# GraphQL Schema

## Status

This schema is a read-optimized target for indexer-backed applications and partner integrations. It is not implemented yet.

## Core entities

```graphql
type Asset {
  id: ID!
  symbol: String!
  name: String!
  policyId: ID!
  status: String!
}

type Credential {
  id: ID!
  wallet: String!
  issuer: String!
  status: String!
  expiresAt: String
}

type CompliancePolicy {
  id: ID!
  version: String!
  name: String!
  rules: [String!]!
}

type Settlement {
  id: ID!
  assetId: ID!
  status: String!
  createdAt: String!
}

type Transfer {
  id: ID!
  assetId: ID!
  fromWallet: String!
  toWallet: String!
  status: String!
}

type Investor {
  wallet: ID!
  eligibilityStatus: String!
}
```

## Query intent

GraphQL should serve:

- issuer dashboards
- investor activity views
- indexed audit lookups
- policy and settlement introspection

Mutations should stay narrow and defer security-critical enforcement to the underlying protocol surfaces.
