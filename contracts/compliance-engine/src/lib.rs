#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env};
use veritas_contract_shared::{
    contract_error_from_code, CompliancePolicy, ContractError, CredentialStatus,
    EligibilityEvaluation, EligibilityRecord, ProofAttestation,
};
use veritas_identity_registry::IdentityRegistryContractClient;
use veritas_transfer_policy::TransferPolicyContractClient;

#[contract]
pub struct ComplianceEngineContract;

#[contractimpl]
impl ComplianceEngineContract {
    pub fn evaluate_eligibility(
        env: Env,
        registry_contract: Address,
        policy_contract: Address,
        policy: CompliancePolicy,
        proof: ProofAttestation,
        now: u64,
    ) -> EligibilityEvaluation {
        let registry = IdentityRegistryContractClient::new(&env, &registry_contract);

        if !registry.has_credential(&proof.wallet_address) {
            return EligibilityEvaluation {
                ok: false,
                error_code: ContractError::CredentialNotFound as u32,
                record: None,
            };
        }

        let credential = registry.get_credential(&proof.wallet_address);

        if credential.status == CredentialStatus::Revoked {
            return Self::error(ContractError::CredentialRevoked);
        }

        if credential.claims.credential_expiry <= now {
            return Self::error(ContractError::CredentialExpired);
        }

        if proof.wallet_address != credential.wallet_address {
            return Self::error(ContractError::WalletMismatch);
        }

        if proof.expires_at <= now {
            return Self::error(ContractError::ProofExpired);
        }

        if proof.credential_id != credential.id {
            return Self::error(ContractError::InvalidProof);
        }

        if proof.kyc_verified != credential.claims.kyc_verified
            || proof.accredited != credential.claims.accredited
            || proof.jurisdiction != credential.claims.jurisdiction
            || proof.policy_id != policy.id
        {
            return Self::error(ContractError::InvalidProof);
        }

        let policy_client = TransferPolicyContractClient::new(&env, &policy_contract);
        let policy_result = policy_client.validate_policy(&policy, &credential.claims);
        if policy_result != 0 {
            return Self::error(contract_error_from_code(policy_result));
        }

        EligibilityEvaluation {
            ok: true,
            error_code: 0,
            record: Some(EligibilityRecord {
                wallet_address: credential.wallet_address,
                credential_id: credential.id,
                proof_id: proof.id,
                policy_id: policy.id,
                verified_at: now,
            }),
        }
    }

    fn error(error: ContractError) -> EligibilityEvaluation {
        EligibilityEvaluation {
            ok: false,
            error_code: error as u32,
            record: None,
        }
    }
}
