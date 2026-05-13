import { createHash } from 'node:crypto';

import type {
  CompliancePolicy,
  CredentialRecord,
  ProofRecord,
} from '../../../packages/shared-types/src/index';
import { buildProofStatement } from '../../../packages/sdk/src/proofs';

function digest(payload: string) {
  return createHash('sha256').update(payload).digest('hex');
}

export function buildCredentialLeafHash(credential: CredentialRecord) {
  return digest(
    [
      credential.walletAddress,
      credential.claims.jurisdiction,
      String(credential.claims.accredited),
      String(credential.claims.kycVerified),
      String(credential.claims.credentialExpiry),
    ].join(':'),
  );
}

export function buildMerkleRoot(leafHash: string) {
  return digest(`veritas-merkle:${leafHash}`);
}

export function buildProofHash(input: {
  walletAddress: string;
  credentialId: string;
  leafHash: string;
  policyId: string;
  generatedAt: number;
}) {
  return digest(
    [
      input.walletAddress,
      input.credentialId,
      input.leafHash,
      input.policyId,
      String(input.generatedAt),
    ].join(':'),
  );
}

export function createProofRecord(input: {
  credential: CredentialRecord;
  policy: CompliancePolicy;
  proofIndex: number;
  now?: number;
}) {
  const generatedAt = input.now ?? Date.now();
  const statement = buildProofStatement(input.credential, input.policy);

  const proof: ProofRecord = {
    id: `proof_${input.proofIndex}`,
    credentialId: input.credential.id,
    walletAddress: input.credential.walletAddress,
    statement,
    proofHash: buildProofHash({
      walletAddress: input.credential.walletAddress,
      credentialId: input.credential.id,
      leafHash: input.credential.leafHash,
      policyId: input.policy.id,
      generatedAt,
    }),
    merkleRoot: input.credential.merkleRoot,
    generatedAt,
    expiresAt: generatedAt + 1000 * 60 * 15,
    publicInputs: {
      kycVerified: input.credential.claims.kycVerified,
      accredited: input.credential.claims.accredited,
      jurisdiction: input.credential.claims.jurisdiction,
      policyId: input.policy.id,
    },
    status: 'generated',
  };

  return proof;
}
