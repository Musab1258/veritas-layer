# Veritas Layer

Private, compliant infrastructure for tokenized real-world assets on Stellar.

Veritas Layer is a modular middleware platform for institutions, fintechs, issuers, and developers building regulated asset systems on Stellar and Soroban. The project is designed around a simple thesis: compliance enforcement, investor privacy, and programmable settlement should coexist in the same infrastructure stack.

## Vision

Veritas Layer aims to become the compliance and privacy infrastructure layer for institutional finance on Stellar.

## Current status

This repository is now in Phase 5: application preparation and operational packaging on top of the Phase 4 contributor-ready MVP.

Implemented today:

- `apps/landing` Next.js 15 landing page
- `apps/landing/mvp` interactive zk compliance prototype
- monorepo workspace, TypeScript, ESLint, and Turborepo foundation
- brand guidance and shared design tokens
- Phase 2 contributor, security, API, architecture, and roadmap documentation
- Phase 4 onboarding, debugging, and contributor workflow documentation
- `.github` contributor scaffolding for issue templates, PR reviews, labels, CODEOWNERS, and CI
- shared types and SDK helpers for the MVP flow
- TypeScript service modules for identity, proof generation, relay, audit logging, and indexing
- Soroban-aligned Rust contract workspace for identity, policy, compliance, and asset transfer logic
- testnet deployments for the current identity, policy, compliance, and asset contracts
- Phase 5 application-preparation docs, reviewer demo flow, and roadmap assets for Phases 5 to 7

Still not implemented:

- real zk circuits and proving backends
- production wallet integrations and persistence
- PostgreSQL-backed indexing and observability infrastructure
- end-to-end production-grade on-chain integration beyond the current testnet reference deployments

## Core modules

| Module                       | Purpose                                                     | Status                    |
| ---------------------------- | ----------------------------------------------------------- | ------------------------- |
| zk Identity Layer            | Private KYC, accreditation, and jurisdiction verification   | MVP prototype implemented |
| Compliance Engine            | Deterministic transfer validation and policy enforcement    | MVP prototype implemented |
| Asset Issuance Engine        | Asset lifecycle orchestration for regulated issuers         | MVP prototype implemented |
| Settlement Engine            | Compliance-aware settlement workflows on Stellar rails      | MVP prototype implemented |
| Confidential Ownership Layer | Selective-disclosure ownership primitives and audit support | Research and architecture |

## Architecture summary

Veritas Layer is designed as an orchestration layer above Stellar asset primitives and Soroban contracts:

- wallets, issuers, and operators initiate regulated asset actions
- identity and zk services generate privacy-preserving eligibility proofs off-chain
- Soroban contracts verify compliance outcomes and enforce policy decisions on-chain
- Stellar asset controls remain the settlement foundation
- indexing and API services expose operational data to dashboards, SDKs, and institutional integrators

See the architecture docs for the target system design:

- [System overview](./docs/architecture/system-overview.md)
- [Smart contract architecture](./docs/architecture/smart-contracts.md)
- [zk architecture](./docs/architecture/zk-architecture.md)
- [Compliance engine](./docs/architecture/compliance-engine.md)
- [Settlement engine](./docs/architecture/settlement-engine.md)

## Monorepo structure

```text
apps/
  landing/
  mvp/                     # Phase 3 demo route inside landing app
  issuer-dashboard/        # planned
  investor-portal/         # planned
contracts/
  asset-engine/
  compliance-engine/
  identity-registry/
  transfer-policy/
  shared/
services/
  zk-engine/
  identity-service/
  proof-relay/
  audit-logger/
  indexer/
  api-gateway/
packages/
  sdk/
  ui/                      # planned
  shared-types/
  config/                  # planned
  design-tokens/
docs/
infrastructure/
scripts/
```

## Quick start

### Requirements

- Node.js 22+
- npm 11+

### Run the current workspace

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run docs:check
npm run lint
npm run typecheck
npm run build
npm run contracts:test
```

Primary demo route:

- `/mvp` for the full Phase 3 walkthrough

## Documentation map

- [Brand guidelines](./docs/brand-guidelines.md)
- [Architecture docs](./docs/architecture/system-overview.md)
- [Security docs](./docs/security/threat-model.md)
- [API docs](./docs/api/rest-api.md)
- [Contract deployments](./docs/contracts/deployments.md)
- [Contributor docs](./docs/contributors/setup.md)
- [Onboarding docs](./docs/onboarding/README.md)
- [Roadmap docs](./docs/roadmap/roadmap.md)
- [Diagrams](./docs/diagrams/system-architecture.md)

Repo policies:

- [Contributing](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)
- [Security policy](./SECURITY.md)
- [License](./LICENSE)

## Tech stack

| Layer             | Current / target stack                                         |
| ----------------- | -------------------------------------------------------------- |
| Landing app       | Next.js 15, React 19, Tailwind CSS 4, Framer Motion            |
| Workspace tooling | npm workspaces, Turborepo, TypeScript, ESLint, Prettier        |
| Smart contracts   | Rust contract-core workspace aligned to a Soroban upgrade path |
| zk systems        | Off-chain proof simulation with typed verifier inputs          |
| Services          | TypeScript services for identity, indexing, relay, and APIs    |
| Data plane        | PostgreSQL, queues, caching, and observability in later phases |

## Roadmap snapshot

- Phase 0: research, problem framing, and MVP scope
- Phase 1: branding, landing page, and repo foundation
- Phase 2: documentation, architecture, and contributor readiness
- Phase 3: zk compliance MVP and issuer workflow implementation
- Phase 4: contributor infrastructure, onboarding systems, CI maturity, and SDK shaping
- Phase 5: application preparation, reviewer assets, and operational packaging
- Phase 6: compliance, API, and integration expansion
- Phase 7: ecosystem scaling, plugin direction, and governance planning

Detailed planning lives in:

- [Roadmap](./docs/roadmap/roadmap.md)
- [Milestones](./docs/roadmap/milestones.md)
- [Ecosystem vision](./docs/roadmap/ecosystem-vision.md)
- [Application preparation](./docs/roadmap/application-preparation.md)
- [Post-application expansion](./docs/roadmap/post-application-expansion.md)
- [Ecosystem scaling](./docs/roadmap/ecosystem-scaling.md)

## Contributing

Contributors are expected to treat Veritas Layer as infrastructure software: precise, security-conscious, and modular by default.

Start here:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [Contributor setup](./docs/contributors/setup.md)
- [Contributor onboarding](./docs/onboarding/README.md)
- [Contract deployments](./docs/contracts/deployments.md)
- [Development workflow](./docs/contributors/development.md)
- [Testing guide](./docs/contributors/testing.md)
- [Coding standards](./docs/contributors/coding-standards.md)

## License

Veritas Layer is licensed under the [Apache License 2.0](./LICENSE).
