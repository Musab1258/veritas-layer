#![no_std]

use soroban_sdk::{contracterror, contracttype, String, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CredentialClaims {
    pub kyc_verified: bool,
    pub accredited: bool,
    pub jurisdiction: String,
    pub credential_expiry: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CredentialStatus {
    Issued,
    Verified,
    Revoked,
    Expired,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CredentialRecord {
    pub id: String,
    pub wallet_address: String,
    pub status: CredentialStatus,
    pub merkle_root: String,
    pub leaf_hash: String,
    pub claims: CredentialClaims,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CompliancePolicy {
    pub id: String,
    pub kyc_required: bool,
    pub accredited_only: bool,
    pub allowed_jurisdictions: Vec<String>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ProofAttestation {
    pub id: String,
    pub credential_id: String,
    pub wallet_address: String,
    pub proof_hash: String,
    pub generated_at: u64,
    pub expires_at: u64,
    pub kyc_verified: bool,
    pub accredited: bool,
    pub jurisdiction: String,
    pub policy_id: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct EligibilityRecord {
    pub wallet_address: String,
    pub credential_id: String,
    pub proof_id: String,
    pub policy_id: String,
    pub verified_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct EligibilityEvaluation {
    pub ok: bool,
    pub error_code: u32,
    pub record: Option<EligibilityRecord>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AssetDefinition {
    pub id: String,
    pub symbol: String,
    pub issuer_wallet: String,
    pub total_supply: u64,
    pub policy_id: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct TransferRequest {
    pub asset_id: String,
    pub from_wallet: String,
    pub to_wallet: String,
    pub amount: u64,
    pub timestamp: u64,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    CredentialNotFound = 1,
    CredentialRevoked = 2,
    CredentialExpired = 3,
    ProofExpired = 4,
    InvalidProof = 5,
    WalletMismatch = 6,
    KycRequired = 7,
    AccreditedRequired = 8,
    JurisdictionBlocked = 9,
    UnauthorizedTransfer = 10,
    InsufficientBalance = 11,
    AssetMismatch = 12,
    InvalidTransferAmount = 13,
    AlreadyInitialized = 14,
    AssetNotInitialized = 15,
}

pub fn contract_error_from_code(code: u32) -> ContractError {
    match code {
        1 => ContractError::CredentialNotFound,
        2 => ContractError::CredentialRevoked,
        3 => ContractError::CredentialExpired,
        4 => ContractError::ProofExpired,
        5 => ContractError::InvalidProof,
        6 => ContractError::WalletMismatch,
        7 => ContractError::KycRequired,
        8 => ContractError::AccreditedRequired,
        9 => ContractError::JurisdictionBlocked,
        10 => ContractError::UnauthorizedTransfer,
        11 => ContractError::InsufficientBalance,
        12 => ContractError::AssetMismatch,
        13 => ContractError::InvalidTransferAmount,
        14 => ContractError::AlreadyInitialized,
        _ => ContractError::AssetNotInitialized,
    }
}
