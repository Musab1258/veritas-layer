#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, String,
};
use veritas_compliance_engine::ComplianceEngineContractClient;
use veritas_contract_shared::{
    contract_error_from_code, AssetDefinition, CompliancePolicy, ContractError,
    ProofAttestation, TransferRequest,
};
use veritas_identity_registry::IdentityRegistryContractClient;

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Asset,
    Balance(String),
}

#[contract]
pub struct AssetEngineContract;

#[contractimpl]
impl AssetEngineContract {
    pub fn init(env: Env, asset: AssetDefinition) -> Result<(), ContractError> {
        if env.storage().persistent().has(&DataKey::Asset) {
            return Err(ContractError::AlreadyInitialized);
        }

        env.storage().persistent().set(&DataKey::Asset, &asset);
        env.storage().persistent().set(
            &DataKey::Balance(asset.issuer_wallet.clone()),
            &asset.total_supply,
        );

        env.events()
            .publish((symbol_short!("assetinit"), asset.id), asset.symbol);

        Ok(())
    }

    pub fn get_asset(env: Env) -> Result<AssetDefinition, ContractError> {
        env.storage()
            .persistent()
            .get(&DataKey::Asset)
            .ok_or(ContractError::AssetNotInitialized)
    }

    pub fn balance_of(env: Env, wallet_address: String) -> u64 {
        env.storage()
            .persistent()
            .get(&DataKey::Balance(wallet_address))
            .unwrap_or(0_u64)
    }

    pub fn execute_transfer(
        env: Env,
        registry_contract: Address,
        compliance_contract: Address,
        policy_contract: Address,
        policy: CompliancePolicy,
        proof: ProofAttestation,
        request: TransferRequest,
        now: u64,
    ) -> Result<(), ContractError> {
        let asset = Self::get_asset(env.clone())?;

        if request.asset_id != asset.id {
            return Err(ContractError::AssetMismatch);
        }

        if request.amount == 0 {
            return Err(ContractError::InvalidTransferAmount);
        }

        let compliance = ComplianceEngineContractClient::new(&env, &compliance_contract);
        let evaluation = compliance.evaluate_eligibility(
            &registry_contract,
            &policy_contract,
            &policy,
            &proof,
            &now,
        );

        if !evaluation.ok {
            return Err(contract_error_from_code(evaluation.error_code));
        }

        let Some(record) = evaluation.record else {
            return Err(ContractError::InvalidProof);
        };

        let registry = IdentityRegistryContractClient::new(&env, &registry_contract);
        let mark_result = registry.mark_eligible(&record);
        if mark_result != 0 {
            return Err(contract_error_from_code(mark_result));
        }

        if request.to_wallet != record.wallet_address {
            return Err(ContractError::UnauthorizedTransfer);
        }

        if request.from_wallet != asset.issuer_wallet
            && !registry.is_wallet_eligible(&request.from_wallet, &now)
        {
            return Err(ContractError::UnauthorizedTransfer);
        }

        let source_key = DataKey::Balance(request.from_wallet.clone());
        let target_key = DataKey::Balance(request.to_wallet.clone());
        let source_balance = Self::balance_of(env.clone(), request.from_wallet.clone());

        if source_balance < request.amount {
            return Err(ContractError::InsufficientBalance);
        }

        let target_balance = Self::balance_of(env.clone(), request.to_wallet.clone());

        env.storage()
            .persistent()
            .set(&source_key, &(source_balance - request.amount));
        env.storage()
            .persistent()
            .set(&target_key, &(target_balance + request.amount));

        env.events().publish(
            (
                symbol_short!("transfer"),
                request.asset_id,
                request.from_wallet,
            ),
            request.amount,
        );

        Ok(())
    }
}
