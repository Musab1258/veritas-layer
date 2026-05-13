# Contracts

The `contracts/` workspace now contains deployable Soroban contract artifacts for the first Veritas MVP slice:

- `identity-registry`
- `compliance-engine`
- `transfer-policy`
- `asset-engine`
- `shared`

These crates implement the current zk compliance MVP contract surface:

- credential issuance and revocation
- proof-backed eligibility validation
- policy enforcement for KYC, accreditation, and jurisdiction gates
- issuer-gated transfer execution

Current deployment record:

- `docs/contracts/deployments.md`

Technical status:

- the contracts build to WASM with `stellar contract build --manifest-path contracts/Cargo.toml`
- the current testnet aliases and contract IDs are documented in the deployment record
- the asset engine has been deployed to testnet but is not initialized with a live asset definition yet
- this remains a narrow MVP contract slice, not a full production tokenization protocol
