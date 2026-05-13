use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub type Timestamp = u64;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CredentialClaims {
    pub kyc_verified: bool,
    pub accredited: bool,
    pub jurisdiction: String,
    pub credential_expiry: Timestamp,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum CredentialStatus {
    Issued,
    Verified,
    Revoked,
    Expired,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CredentialRecord {
    pub id: String,
    pub wallet_address: String,
    pub status: CredentialStatus,
    pub merkle_root: String,
    pub leaf_hash: String,
    pub claims: CredentialClaims,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CompliancePolicy {
    pub id: String,
    pub kyc_required: bool,
    pub accredited_only: bool,
    pub allowed_jurisdictions: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ProofAttestation {
    pub id: String,
    pub credential_id: String,
    pub wallet_address: String,
    pub proof_hash: String,
    pub generated_at: Timestamp,
    pub expires_at: Timestamp,
    pub kyc_verified: bool,
    pub accredited: bool,
    pub jurisdiction: String,
    pub policy_id: String,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct EligibilityRecord {
    pub wallet_address: String,
    pub credential_id: String,
    pub proof_id: String,
    pub policy_id: String,
    pub verified_at: Timestamp,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AssetDefinition {
    pub id: String,
    pub symbol: String,
    pub issuer_wallet: String,
    pub total_supply: u64,
    pub policy_id: String,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TransferRequest {
    pub asset_id: String,
    pub from_wallet: String,
    pub to_wallet: String,
    pub amount: u64,
    pub timestamp: Timestamp,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum ContractEvent {
    CredentialVerified {
        wallet_address: String,
        credential_id: String,
        policy_id: String,
    },
    CredentialRevoked {
        wallet_address: String,
        credential_id: String,
    },
    TransferValidated {
        asset_id: String,
        from_wallet: String,
        to_wallet: String,
        amount: u64,
        policy_id: String,
    },
    TransferRejected {
        asset_id: String,
        reason_code: String,
    },
    PolicyUpdated {
        policy_id: String,
    },
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum ContractError {
    CredentialNotFound,
    CredentialRevoked,
    CredentialExpired,
    ProofExpired,
    InvalidProof,
    WalletMismatch,
    PolicyDenied(String),
    UnauthorizedTransfer,
    InsufficientBalance,
    AssetMismatch,
    InvalidTransferAmount,
}

pub fn simple_hash(parts: &[&str]) -> String {
    let mut hasher = DefaultHasher::new();

    for part in parts {
        part.hash(&mut hasher);
    }

    format!("{:016x}", hasher.finish())
}

pub fn build_proof_hash(
    wallet_address: &str,
    credential_id: &str,
    leaf_hash: &str,
    policy_id: &str,
    generated_at: Timestamp,
) -> String {
    let generated = generated_at.to_string();

    simple_hash(&[
        wallet_address,
        credential_id,
        leaf_hash,
        policy_id,
        generated.as_str(),
    ])
}
