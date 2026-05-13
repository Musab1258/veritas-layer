import type {
  ConfigureAssetInput,
  ConnectWalletInput,
  ExecuteTransferInput,
  GenerateProofInput,
  MockKycInput,
  MvpRuntimeState,
  SubmitProofInput,
  TransferRecord,
} from '../../../packages/shared-types/src/index';
import { appendAuditEvent } from '../../audit-logger/src/index';
import { issueMockCredential } from '../../identity-service/src/index';
import { buildMvpSnapshot } from '../../indexer/src/index';
import { verifyProofAndMarkEligible } from '../../proof-relay/src/index';
import { createProofRecord } from '../../zk-engine/src/index';

function assertInvestorWallet(state: MvpRuntimeState, walletAddress: string) {
  const wallet = state.wallets.find((item) => item.address === walletAddress);

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  if (wallet.role !== 'investor') {
    throw new Error('Select an investor wallet for the demo flow');
  }

  return wallet;
}

export function connectWallet(
  state: MvpRuntimeState,
  input: ConnectWalletInput,
) {
  const wallet = assertInvestorWallet(state, input.walletAddress);

  wallet.connectionStatus = 'connected';
  wallet.connectedAt = Date.now();
  state.selectedWalletAddress = wallet.address;

  appendAuditEvent(state, {
    category: 'wallet',
    action: 'wallet.connected',
    actor: wallet.address,
    status: 'approved',
    message: `${wallet.label} connected to the Veritas MVP environment.`,
    metadata: {
      role: wallet.role,
    },
  });

  return buildMvpSnapshot(state);
}

export function configureAssetAndPolicy(
  state: MvpRuntimeState,
  input: ConfigureAssetInput,
) {
  state.policy = {
    ...state.policy,
    label: `${input.symbol} compliance policy`,
    kycRequired: input.kycRequired,
    accreditedOnly: input.accreditedOnly,
    allowedJurisdictions: input.allowedJurisdictions,
  };

  state.asset = {
    ...state.asset,
    name: input.name,
    symbol: input.symbol.toUpperCase(),
    totalSupply: input.totalSupply,
    circulatingSupply: input.totalSupply,
    policyId: state.policy.id,
  };

  state.balances[state.asset.issuerWallet] = input.totalSupply;

  appendAuditEvent(state, {
    category: 'policy',
    action: 'policy.updated',
    actor: state.asset.issuerWallet,
    status: 'info',
    message: `Policy updated: KYC ${input.kycRequired ? 'required' : 'optional'}, accredited-only ${input.accreditedOnly ? 'enabled' : 'disabled'}.`,
    metadata: {
      symbol: state.asset.symbol,
      jurisdictions: input.allowedJurisdictions.join(','),
    },
  });

  return buildMvpSnapshot(state);
}

export function completeMockKyc(state: MvpRuntimeState, input: MockKycInput) {
  const wallet = assertInvestorWallet(state, input.walletAddress);
  const credential = issueMockCredential({
    state,
    walletAddress: wallet.address,
    jurisdiction: input.jurisdiction,
    accredited: input.accredited,
  });

  appendAuditEvent(state, {
    category: 'credential',
    action: 'credential.issued',
    actor: wallet.address,
    status: 'approved',
    message: `Mock KYC completed for ${wallet.label}. Credential issued with ${input.jurisdiction} jurisdiction claims.`,
    metadata: {
      credentialId: credential.id,
      accredited: input.accredited,
      merkleRoot: credential.merkleRoot,
    },
  });

  return buildMvpSnapshot(state);
}

export function generateProof(
  state: MvpRuntimeState,
  input: GenerateProofInput,
) {
  const wallet = assertInvestorWallet(state, input.walletAddress);
  const credential = state.credentials.find(
    (item) => item.walletAddress === wallet.address,
  );

  if (!credential) {
    throw new Error('Complete mock KYC before generating a proof');
  }

  const proof = createProofRecord({
    credential,
    policy: state.policy,
    proofIndex: state.proofs.length + 1,
  });

  state.proofs = state.proofs.filter(
    (item) => item.walletAddress !== wallet.address,
  );
  state.proofs.unshift(proof);

  appendAuditEvent(state, {
    category: 'proof',
    action: 'proof.generated',
    actor: wallet.address,
    status: 'approved',
    message: `Off-chain proof generated for ${wallet.label}. Ready for compliance submission.`,
    metadata: {
      proofId: proof.id,
      credentialId: credential.id,
    },
  });

  return buildMvpSnapshot(state);
}

export function submitProof(state: MvpRuntimeState, input: SubmitProofInput) {
  const proof = state.proofs.find((item) => item.id === input.proofId);

  if (!proof) {
    throw new Error('Proof not found');
  }

  const credential = state.credentials.find(
    (item) => item.id === proof.credentialId,
  );

  if (!credential) {
    throw new Error('Credential not found for proof');
  }

  const verification = verifyProofAndMarkEligible({
    state,
    credential,
    proof,
    policy: state.policy,
  });

  appendAuditEvent(state, {
    category: 'proof',
    action: verification.ok ? 'proof.verified' : 'proof.rejected',
    actor: proof.walletAddress,
    status: verification.ok ? 'approved' : 'rejected',
    message: verification.ok
      ? `Soroban contract core validated ${proof.id}. Wallet marked eligible for transfers.`
      : `Proof ${proof.id} rejected by compliance engine.`,
    metadata: verification.ok
      ? {
          proofId: proof.id,
          policyId: state.policy.id,
        }
      : {
          proofId: proof.id,
          reasonCode: verification.reasonCode,
        },
  });

  return buildMvpSnapshot(state);
}

export function executeTransfer(
  state: MvpRuntimeState,
  input: ExecuteTransferInput,
) {
  const recipient = assertInvestorWallet(state, input.toWallet);
  const recipientEligibility = state.eligibility.find(
    (item) => item.walletAddress === recipient.address,
  );

  let status: TransferRecord['status'] = 'approved';
  let reasonCode = 'transfer_approved';
  let ledgerTxId: string | null = null;

  if (input.amount <= 0) {
    status = 'rejected';
    reasonCode = 'invalid_amount';
  } else if (!recipientEligibility) {
    status = 'rejected';
    reasonCode = 'recipient_not_eligible';
  } else if ((state.balances[input.fromWallet] ?? 0) < input.amount) {
    status = 'rejected';
    reasonCode = 'insufficient_balance';
  } else if (input.fromWallet !== state.asset.issuerWallet) {
    status = 'rejected';
    reasonCode = 'unauthorized_sender';
  } else {
    state.balances[input.fromWallet] -= input.amount;
    state.balances[input.toWallet] =
      (state.balances[input.toWallet] ?? 0) + input.amount;
    state.lastLedgerSequence += 1;
    ledgerTxId = `VL-${String(state.lastLedgerSequence).padStart(6, '0')}`;
  }

  const transfer: TransferRecord = {
    id: `tx_${state.transfers.length + 1}`,
    assetId: state.asset.id,
    fromWallet: input.fromWallet,
    toWallet: input.toWallet,
    amount: input.amount,
    submittedAt: Date.now(),
    status,
    reasonCode,
    ledgerTxId,
  };

  state.transfers.unshift(transfer);

  appendAuditEvent(state, {
    category: 'transfer',
    action: status === 'approved' ? 'transfer.validated' : 'transfer.rejected',
    actor: input.fromWallet,
    status: status === 'approved' ? 'approved' : 'rejected',
    message:
      status === 'approved'
        ? `Compliant transfer executed from issuer treasury to ${recipient.label}.`
        : `Transfer rejected before settlement finalization.`,
    metadata: {
      amount: input.amount,
      reasonCode,
      ledgerTxId,
    },
  });

  return buildMvpSnapshot(state);
}
