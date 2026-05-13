use veritas_contract_shared::{CompliancePolicy, ContractError, CredentialClaims};

pub fn validate_policy(
    policy: &CompliancePolicy,
    claims: &CredentialClaims,
) -> Result<(), ContractError> {
    if policy.kyc_required && !claims.kyc_verified {
        return Err(ContractError::PolicyDenied("kyc_required".to_string()));
    }

    if policy.accredited_only && !claims.accredited {
        return Err(ContractError::PolicyDenied(
            "accredited_required".to_string(),
        ));
    }

    if !policy
        .allowed_jurisdictions
        .iter()
        .any(|value| value == &claims.jurisdiction)
    {
        return Err(ContractError::PolicyDenied(
            "jurisdiction_blocked".to_string(),
        ));
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::validate_policy;
    use veritas_contract_shared::{CompliancePolicy, CredentialClaims, ContractError};

    #[test]
    fn rejects_disallowed_jurisdiction() {
        let policy = CompliancePolicy {
            id: "policy".to_string(),
            kyc_required: true,
            accredited_only: true,
            allowed_jurisdictions: vec!["US".to_string()],
        };
        let claims = CredentialClaims {
            kyc_verified: true,
            accredited: true,
            jurisdiction: "NG".to_string(),
            credential_expiry: 100,
        };

        let result = validate_policy(&policy, &claims);

        assert_eq!(
            result,
            Err(ContractError::PolicyDenied(
                "jurisdiction_blocked".to_string()
            ))
        );
    }
}
