# Veritas Layer

Private, compliant infrastructure for tokenized real-world assets on Stellar.

Veritas Layer is an institutional-grade middleware platform for privacy-preserving RWA issuance, zk compliance verification, programmable settlement, and confidential ownership systems on Stellar and Soroban.

## Monorepo structure

```text
apps/
  landing/
  issuer-dashboard/
  investor-portal/
contracts/
  asset-engine/
  compliance-engine/
  settlement-engine/
  shared/
services/
  zk-engine/
  identity-service/
  indexer/
  api-gateway/
packages/
  sdk/
  ui/
  shared-types/
  config/
  design-tokens/
docs/
infrastructure/
scripts/
```

## Current phase

This repository is set up for Phase 1: branding and foundation.

Implemented now:

- `apps/landing` Next.js 15 marketing site
- monorepo workspace and Turborepo configuration
- strict TypeScript and flat ESLint configuration
- initial brand guidance and design tokens
- placeholder module directories for contracts, services, and packages

## Quick start

```bash
npm install
npm run dev
```

For pnpm-based workflows later:

```bash
pnpm install
pnpm dev
```

## Product pillars

- zk identity and compliance verification
- compliant asset issuance orchestration
- programmable transfer restrictions
- confidential ownership primitives
- institutional settlement workflows

## MVP direction

The initial MVP prioritizes:

1. zkKYC compliance verification
2. compliant transfer validation
3. basic token issuance
4. issuer dashboard foundations

## Docs

- [Brand Guidelines](./docs/brand-guidelines.md)
