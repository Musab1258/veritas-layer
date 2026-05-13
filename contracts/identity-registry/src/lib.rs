use std::collections::BTreeMap;

use veritas_contract_shared::{
    ContractEvent, CredentialRecord, CredentialStatus, EligibilityRecord, Timestamp,
};

#[derive(Default)]
pub struct IdentityRegistry {
    credentials: BTreeMap<String, CredentialRecord>,
    eligibility: BTreeMap<String, EligibilityRecord>,
    events: Vec<ContractEvent>,
}

impl IdentityRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn issue_credential(&mut self, credential: CredentialRecord) {
        self.credentials
            .insert(credential.wallet_address.clone(), credential);
    }

    pub fn credential(&self, wallet_address: &str) -> Option<&CredentialRecord> {
        self.credentials.get(wallet_address)
    }

    pub fn credential_mut(&mut self, wallet_address: &str) -> Option<&mut CredentialRecord> {
        self.credentials.get_mut(wallet_address)
    }

    pub fn revoke_credential(&mut self, wallet_address: &str) -> Option<ContractEvent> {
        let credential = self.credentials.get_mut(wallet_address)?;
        credential.status = CredentialStatus::Revoked;
        self.eligibility.remove(wallet_address);

        let event = ContractEvent::CredentialRevoked {
            wallet_address: wallet_address.to_string(),
            credential_id: credential.id.clone(),
        };
        self.events.push(event.clone());

        Some(event)
    }

    pub fn mark_eligible(&mut self, record: EligibilityRecord) -> ContractEvent {
        let wallet_address = record.wallet_address.clone();
        let credential_id = record.credential_id.clone();
        let policy_id = record.policy_id.clone();

        if let Some(credential) = self.credentials.get_mut(&wallet_address) {
            credential.status = CredentialStatus::Verified;
        }

        self.eligibility.insert(wallet_address.clone(), record);

        let event = ContractEvent::CredentialVerified {
            wallet_address,
            credential_id,
            policy_id,
        };
        self.events.push(event.clone());

        event
    }

    pub fn is_wallet_eligible(&self, wallet_address: &str, now: Timestamp) -> bool {
        let Some(record) = self.eligibility.get(wallet_address) else {
            return false;
        };

        let Some(credential) = self.credentials.get(wallet_address) else {
            return false;
        };

        credential.status == CredentialStatus::Verified
            && credential.claims.credential_expiry > now
            && record.wallet_address == wallet_address
    }

    pub fn events(&self) -> &[ContractEvent] {
        &self.events
    }
}

#[cfg(test)]
mod tests {
    use super::IdentityRegistry;
    use veritas_contract_shared::{
        CredentialClaims, CredentialRecord, CredentialStatus,
    };

    fn sample_credential() -> CredentialRecord {
        CredentialRecord {
            id: "cred_1".to_string(),
            wallet_address: "wallet_alpha".to_string(),
            status: CredentialStatus::Issued,
            merkle_root: "root".to_string(),
            leaf_hash: "leaf".to_string(),
            claims: CredentialClaims {
                kyc_verified: true,
                accredited: true,
                jurisdiction: "US".to_string(),
                credential_expiry: 10_000,
            },
        }
    }

    #[test]
    fn revoke_credential_updates_status() {
        let mut registry = IdentityRegistry::new();
        registry.issue_credential(sample_credential());

        let _ = registry.revoke_credential("wallet_alpha");

        assert_eq!(
            registry.credential("wallet_alpha").unwrap().status,
            CredentialStatus::Revoked
        );
    }
}
