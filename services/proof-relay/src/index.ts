import type {
  CompliancePolicy,
  CredentialRecord,
  EligibilityRecord,
  MvpRuntimeState,
  ProofRecord,
} from '../../../packages/shared-types/src/index';
import { buildProofHash } from '../../zk-engine/src/index';

function validatePolicy(
  policy: CompliancePolicy,
  credential: CredentialRecord,
) {
  if (policy.kycRequired && !credential.claims.kycVerified) {
    return 'kyc_required';
  }

  if (policy.accreditedOnly && !credential.claims.accredited) {
    return 'accredited_required';
  }

  if (!policy.allowedJurisdictions.includes(credential.claims.jurisdiction)) {
    return 'jurisdiction_blocked';
  }

  return null;
}

export function verifyProofAndMarkEligible(input: {
  state: MvpRuntimeState;
  credential: CredentialRecord;
  proof: ProofRecord;
  policy: CompliancePolicy;
  now?: number;
}) {
  const now = input.now ?? Date.now();

  if (input.credential.status === 'revoked') {
    return {
      ok: false as const,
      reasonCode: 'credential_revoked',
    };
  }

  if (input.credential.claims.credentialExpiry <= now) {
    input.credential.status = 'expired';
    return {
      ok: false as const,
      reasonCode: 'credential_expired',
    };
  }

  if (input.proof.expiresAt <= now) {
    input.proof.status = 'rejected';
    return {
      ok: false as const,
      reasonCode: 'proof_expired',
    };
  }

  const expectedProofHash = buildProofHash({
    walletAddress: input.credential.walletAddress,
    credentialId: input.credential.id,
    leafHash: input.credential.leafHash,
    policyId: input.policy.id,
    generatedAt: input.proof.generatedAt,
  });

  if (expectedProofHash !== input.proof.proofHash) {
    input.proof.status = 'rejected';
    return {
      ok: false as const,
      reasonCode: 'invalid_proof',
    };
  }

  const policyFailure = validatePolicy(input.policy, input.credential);

  if (policyFailure) {
    input.proof.status = 'rejected';
    return {
      ok: false as const,
      reasonCode: policyFailure,
    };
  }

  const eligibility: EligibilityRecord = {
    walletAddress: input.credential.walletAddress,
    credentialId: input.credential.id,
    proofId: input.proof.id,
    policyId: input.policy.id,
    verifiedAt: now,
  };

  input.proof.status = 'submitted';
  input.credential.status = 'verified';

  input.state.eligibility = input.state.eligibility.filter(
    (item) => item.walletAddress !== eligibility.walletAddress,
  );
  input.state.eligibility.unshift(eligibility);

  return {
    ok: true as const,
    eligibility,
  };
}
