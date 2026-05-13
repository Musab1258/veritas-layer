use std::collections::BTreeMap;

use veritas_compliance_engine::evaluate_eligibility;
use veritas_contract_shared::{
    AssetDefinition, CompliancePolicy, ContractError, ContractEvent, ProofAttestation,
    TransferRequest, Timestamp,
};
use veritas_identity_registry::IdentityRegistry;

pub struct AssetEngine {
    asset: AssetDefinition,
    balances: BTreeMap<String, u64>,
    events: Vec<ContractEvent>,
}

impl AssetEngine {
    pub fn new(asset: AssetDefinition) -> Self {
        let mut balances = BTreeMap::new();
        balances.insert(asset.issuer_wallet.clone(), asset.total_supply);

        Self {
            asset,
            balances,
            events: Vec::new(),
        }
    }

    pub fn balance_of(&self, wallet_address: &str) -> u64 {
        self.balances.get(wallet_address).copied().unwrap_or(0)
    }

    pub fn execute_transfer(
        &mut self,
        registry: &mut IdentityRegistry,
        policy: &CompliancePolicy,
        proof: &ProofAttestation,
        request: TransferRequest,
        now: Timestamp,
    ) -> Result<ContractEvent, ContractError> {
        if request.asset_id != self.asset.id {
            return Err(ContractError::AssetMismatch);
        }

        if request.amount == 0 {
            return Err(ContractError::InvalidTransferAmount);
        }

        let eligibility = evaluate_eligibility(registry, policy, proof, now)?;
        let _ = registry.mark_eligible(eligibility.clone());

        if request.to_wallet != eligibility.wallet_address {
            return Err(ContractError::UnauthorizedTransfer);
        }

        if request.from_wallet != self.asset.issuer_wallet
            && !registry.is_wallet_eligible(&request.from_wallet, now)
        {
            return Err(ContractError::UnauthorizedTransfer);
        }

        let Some(source_balance) = self.balances.get_mut(&request.from_wallet) else {
            return Err(ContractError::InsufficientBalance);
        };

        if *source_balance < request.amount {
            return Err(ContractError::InsufficientBalance);
        }

        *source_balance -= request.amount;
        *self.balances.entry(request.to_wallet.clone()).or_default() += request.amount;

        let event = ContractEvent::TransferValidated {
            asset_id: request.asset_id,
            from_wallet: request.from_wallet,
            to_wallet: request.to_wallet,
            amount: request.amount,
            policy_id: policy.id.clone(),
        };
        self.events.push(event.clone());

        Ok(event)
    }

    pub fn events(&self) -> &[ContractEvent] {
        &self.events
    }
}

#[cfg(test)]
mod tests {
    use super::AssetEngine;
    use veritas_contract_shared::{
        build_proof_hash, AssetDefinition, CompliancePolicy, ContractError,
        CredentialClaims, CredentialRecord, CredentialStatus, ProofAttestation,
        TransferRequest,
    };
    use veritas_identity_registry::IdentityRegistry;

    fn setup_environment(
        jurisdiction: &str,
        accredited: bool,
        expiry: u64,
    ) -> (IdentityRegistry, CompliancePolicy, ProofAttestation, AssetEngine) {
        let asset = AssetDefinition {
            id: "asset_vtbill".to_string(),
            symbol: "VTBILL".to_string(),
            issuer_wallet: "issuer_wallet".to_string(),
            total_supply: 1_000_000,
            policy_id: "policy_vtbill".to_string(),
        };
        let policy = CompliancePolicy {
            id: "policy_vtbill".to_string(),
            kyc_required: true,
            accredited_only: true,
            allowed_jurisdictions: vec!["US".to_string(), "SG".to_string()],
        };
        let credential = CredentialRecord {
            id: "cred_1".to_string(),
            wallet_address: "investor_wallet".to_string(),
            status: CredentialStatus::Issued,
            merkle_root: "root".to_string(),
            leaf_hash: "leaf_hash".to_string(),
            claims: CredentialClaims {
                kyc_verified: true,
                accredited,
                jurisdiction: jurisdiction.to_string(),
                credential_expiry: expiry,
            },
        };
        let proof = ProofAttestation {
            id: "proof_1".to_string(),
            credential_id: "cred_1".to_string(),
            wallet_address: "investor_wallet".to_string(),
            proof_hash: build_proof_hash(
                "investor_wallet",
                "cred_1",
                "leaf_hash",
                "policy_vtbill",
                100,
            ),
            generated_at: 100,
            expires_at: 1_000,
            kyc_verified: true,
            accredited,
            jurisdiction: jurisdiction.to_string(),
            policy_id: "policy_vtbill".to_string(),
        };

        let mut registry = IdentityRegistry::new();
        registry.issue_credential(credential);

        (registry, policy, proof, AssetEngine::new(asset))
    }

    #[test]
    fn executes_transfer_for_verified_investor() {
        let (mut registry, policy, proof, mut engine) =
            setup_environment("US", true, 10_000);

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "issuer_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert!(result.is_ok());
        assert_eq!(engine.balance_of("investor_wallet"), 25_000);
    }

    #[test]
    fn rejects_revoked_credential() {
        let (mut registry, policy, proof, mut engine) =
            setup_environment("US", true, 10_000);
        let _ = registry.revoke_credential("investor_wallet");

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "issuer_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert_eq!(result, Err(ContractError::CredentialRevoked));
    }

    #[test]
    fn rejects_expired_attestation() {
        let (mut registry, policy, proof, mut engine) =
            setup_environment("US", true, 150);

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "issuer_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert_eq!(result, Err(ContractError::CredentialExpired));
    }

    #[test]
    fn rejects_non_accredited_transfer() {
        let (mut registry, policy, proof, mut engine) =
            setup_environment("US", false, 10_000);

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "issuer_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert_eq!(
            result,
            Err(ContractError::PolicyDenied("accredited_required".to_string()))
        );
    }

    #[test]
    fn rejects_unauthorized_sender() {
        let (mut registry, policy, proof, mut engine) =
            setup_environment("US", true, 10_000);

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "random_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert_eq!(result, Err(ContractError::UnauthorizedTransfer));
    }

    #[test]
    fn rejects_invalid_proof() {
        let (mut registry, policy, mut proof, mut engine) =
            setup_environment("US", true, 10_000);
        proof.proof_hash = "tampered_hash".to_string();

        let result = engine.execute_transfer(
            &mut registry,
            &policy,
            &proof,
            TransferRequest {
                asset_id: "asset_vtbill".to_string(),
                from_wallet: "issuer_wallet".to_string(),
                to_wallet: "investor_wallet".to_string(),
                amount: 25_000,
                timestamp: 200,
            },
            200,
        );

        assert_eq!(result, Err(ContractError::InvalidProof));
    }
}
