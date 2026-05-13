# Phase 5 Application Preparation

This document captures the repo-local assets that support the Drips Stellar Wave maintainer application.

## Positioning

Veritas Layer should be presented as institutional-grade compliance and privacy middleware for tokenized real-world assets on Stellar.

Avoid framing it as:

- a DeFi application
- a marketplace
- a startup landing page without protocol depth

## Current local checklist

Implemented in-repo today:

- landing page with architecture, security, roadmap, and contributor framing
- interactive `/mvp` walkthrough for wallet connect, mock KYC, proof generation, proof submission, transfer execution, and audit visibility
- Phase 2 and Phase 4 documentation set
- contributor scaffolding in `.github/`
- current Soroban testnet deployment references
- repo-local application narrative and roadmap assets

Still external to the repo:

- public GitHub org configuration
- connected production domain
- published project board and issues
- demo video recording
- community posts or technical articles

## Reusable short pitch

Veritas Layer is a modular compliance and privacy middleware platform for tokenized real-world assets on Stellar.

The project combines Soroban smart contracts, zk identity infrastructure, programmable compliance systems, and institutional settlement tooling to support compliant and privacy-preserving tokenization workflows.

## Technical summary

The current implementation is a monorepo with:

- a Next.js landing app and interactive MVP
- TypeScript service modules for identity, proof generation, relay, indexing, and audit logging
- shared SDK and domain types
- Soroban-oriented Rust contracts for identity, policy, compliance, and asset transfer logic

The MVP demonstrates:

- wallet selection
- mock KYC credential issuance
- off-chain proof generation
- proof verification and eligibility marking
- compliant transfer execution
- indexed audit activity

## Demo flow

Use this order for reviews or recordings:

1. Open the landing page.
2. Review the architecture section.
3. Launch the `/mvp` flow.
4. Connect an investor wallet.
5. Complete mock KYC.
6. Generate a proof.
7. Submit the proof for eligibility.
8. Execute a compliant transfer.
9. Review the audit log and registry state.
10. Close with contributor docs and issue scaffolding.

## Contributor workflow summary

Contributors can participate across:

- frontend UX and MVP ergonomics
- TypeScript service boundaries
- Soroban contract logic
- documentation and architecture
- SDK evolution
- testing and CI improvements

The repo already includes onboarding guides, curated issue seeds, templates, labels, CODEOWNERS, and CI validation to support that workflow.

## Supporting links strategy

Prioritize:

- landing page
- main repository
- roadmap
- architecture docs
- contributor docs
- deployments documentation
- MVP demo route
- API documentation
