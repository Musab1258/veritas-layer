#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, String};
use veritas_contract_shared::{
    ContractError, CredentialRecord, CredentialStatus, EligibilityRecord,
};

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Credential(String),
    Eligibility(String),
}

#[contract]
pub struct IdentityRegistryContract;

#[contractimpl]
impl IdentityRegistryContract {
    pub fn issue_credential(env: Env, credential: CredentialRecord) {
        let key = DataKey::Credential(credential.wallet_address.clone());
        env.storage().persistent().set(&key, &credential);

        env.events().publish(
            (symbol_short!("issuecred"), credential.wallet_address),
            credential.id,
        );
    }

    pub fn has_credential(env: Env, wallet_address: String) -> bool {
        let key = DataKey::Credential(wallet_address);
        env.storage().persistent().has(&key)
    }

    pub fn get_credential(
        env: Env,
        wallet_address: String,
    ) -> CredentialRecord {
        let key = DataKey::Credential(wallet_address);
        env.storage()
            .persistent()
            .get(&key)
            .unwrap()
    }

    pub fn revoke_credential(
        env: Env,
        wallet_address: String,
    ) -> u32 {
        let key = DataKey::Credential(wallet_address.clone());
        let Some(mut credential) = env.storage().persistent().get::<_, CredentialRecord>(&key)
        else {
            return ContractError::CredentialNotFound as u32;
        };

        credential.status = CredentialStatus::Revoked;
        env.storage().persistent().set(&key, &credential);
        env.storage()
            .persistent()
            .remove(&DataKey::Eligibility(wallet_address.clone()));

        env.events().publish(
            (symbol_short!("revokcred"), wallet_address),
            credential.id,
        );

        0
    }

    pub fn mark_eligible(env: Env, record: EligibilityRecord) -> u32 {
        let credential_key = DataKey::Credential(record.wallet_address.clone());
        let Some(mut credential) =
            env.storage()
                .persistent()
                .get::<_, CredentialRecord>(&credential_key)
        else {
            return ContractError::CredentialNotFound as u32;
        };

        credential.status = CredentialStatus::Verified;
        env.storage().persistent().set(&credential_key, &credential);
        env.storage().persistent().set(
            &DataKey::Eligibility(record.wallet_address.clone()),
            &record,
        );

        env.events().publish(
            (symbol_short!("credvrfy"), record.wallet_address),
            record.credential_id,
        );

        0
    }

    pub fn is_wallet_eligible(
        env: Env,
        wallet_address: String,
        now: u64,
    ) -> bool {
        let eligibility_key = DataKey::Eligibility(wallet_address.clone());
        let credential_key = DataKey::Credential(wallet_address);

        let Some(record) = env
            .storage()
            .persistent()
            .get::<_, EligibilityRecord>(&eligibility_key)
        else {
            return false;
        };

        let Some(credential) = env
            .storage()
            .persistent()
            .get::<_, CredentialRecord>(&credential_key)
        else {
            return false;
        };

        credential.status == CredentialStatus::Verified
            && credential.claims.credential_expiry > now
            && record.wallet_address == credential.wallet_address
    }
}
