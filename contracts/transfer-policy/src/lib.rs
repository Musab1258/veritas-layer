#![no_std]

use soroban_sdk::{contract, contractimpl, Env};
use veritas_contract_shared::{CompliancePolicy, ContractError, CredentialClaims};

#[contract]
pub struct TransferPolicyContract;

#[contractimpl]
impl TransferPolicyContract {
    pub fn validate_policy(
        _env: Env,
        policy: CompliancePolicy,
        claims: CredentialClaims,
    ) -> u32 {
        if policy.kyc_required && !claims.kyc_verified {
            return ContractError::KycRequired as u32;
        }

        if policy.accredited_only && !claims.accredited {
            return ContractError::AccreditedRequired as u32;
        }

        let mut allowed = false;
        for jurisdiction in policy.allowed_jurisdictions.iter() {
            if jurisdiction == claims.jurisdiction {
                allowed = true;
                break;
            }
        }

        if !allowed {
            return ContractError::JurisdictionBlocked as u32;
        }

        0
    }
}
