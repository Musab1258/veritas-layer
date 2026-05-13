use veritas_contract_shared::{
    build_proof_hash, CompliancePolicy, ContractError, CredentialStatus,
    EligibilityRecord, ProofAttestation, Timestamp,
};
use veritas_identity_registry::IdentityRegistry;
use veritas_transfer_policy::validate_policy;

pub fn evaluate_eligibility(
    registry: &IdentityRegistry,
    policy: &CompliancePolicy,
    proof: &ProofAttestation,
    now: Timestamp,
) -> Result<EligibilityRecord, ContractError> {
    let credential = registry
        .credential(&proof.wallet_address)
        .ok_or(ContractError::CredentialNotFound)?;

    if credential.status == CredentialStatus::Revoked {
        return Err(ContractError::CredentialRevoked);
    }

    if credential.claims.credential_expiry <= now {
        return Err(ContractError::CredentialExpired);
    }

    if proof.wallet_address != credential.wallet_address {
        return Err(ContractError::WalletMismatch);
    }

    if proof.expires_at <= now {
        return Err(ContractError::ProofExpired);
    }

    if proof.credential_id != credential.id {
        return Err(ContractError::InvalidProof);
    }

    let expected_hash = build_proof_hash(
        &proof.wallet_address,
        &proof.credential_id,
        &credential.leaf_hash,
        &policy.id,
        proof.generated_at,
    );

    if proof.proof_hash != expected_hash
        || proof.kyc_verified != credential.claims.kyc_verified
        || proof.accredited != credential.claims.accredited
        || proof.jurisdiction != credential.claims.jurisdiction
        || proof.policy_id != policy.id
    {
        return Err(ContractError::InvalidProof);
    }

    validate_policy(policy, &credential.claims)?;

    Ok(EligibilityRecord {
        wallet_address: credential.wallet_address.clone(),
        credential_id: credential.id.clone(),
        proof_id: proof.id.clone(),
        policy_id: policy.id.clone(),
        verified_at: now,
    })
}

#[cfg(test)]
mod tests {
    use super::evaluate_eligibility;
    use veritas_contract_shared::{
        build_proof_hash, CompliancePolicy, ContractError, CredentialClaims,
        CredentialRecord, CredentialStatus, ProofAttestation,
    };
    use veritas_identity_registry::IdentityRegistry;

    fn setup() -> (IdentityRegistry, CompliancePolicy, ProofAttestation) {
        let credential = CredentialRecord {
            id: "cred_1".to_string(),
            wallet_address: "wallet_alpha".to_string(),
            status: CredentialStatus::Issued,
            merkle_root: "root".to_string(),
            leaf_hash: "leaf_hash".to_string(),
            claims: CredentialClaims {
                kyc_verified: true,
                accredited: true,
                jurisdiction: "US".to_string(),
                credential_expiry: 10_000,
            },
        };

        let mut registry = IdentityRegistry::new();
        registry.issue_credential(credential);

        let policy = CompliancePolicy {
            id: "policy_us".to_string(),
            kyc_required: true,
            accredited_only: true,
            allowed_jurisdictions: vec!["US".to_string()],
        };

        let proof = ProofAttestation {
            id: "proof_1".to_string(),
            credential_id: "cred_1".to_string(),
            wallet_address: "wallet_alpha".to_string(),
            proof_hash: build_proof_hash(
                "wallet_alpha",
                "cred_1",
                "leaf_hash",
                "policy_us",
                100,
            ),
            generated_at: 100,
            expires_at: 1_000,
            kyc_verified: true,
            accredited: true,
            jurisdiction: "US".to_string(),
            policy_id: "policy_us".to_string(),
        };

        (registry, policy, proof)
    }

    #[test]
    fn rejects_invalid_proof_hash() {
        let (registry, policy, mut proof) = setup();
        proof.proof_hash = "bad_hash".to_string();

        let result = evaluate_eligibility(&registry, &policy, &proof, 200);

        assert_eq!(result, Err(ContractError::InvalidProof));
    }
}
