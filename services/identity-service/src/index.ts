import type {
  CredentialClaims,
  CredentialRecord,
  Jurisdiction,
  MvpRuntimeState,
} from '../../../packages/shared-types/src/index';
import {
  buildCredentialLeafHash,
  buildMerkleRoot,
} from '../../zk-engine/src/index';

export function issueMockCredential(input: {
  state: MvpRuntimeState;
  walletAddress: string;
  jurisdiction: Jurisdiction;
  accredited: boolean;
  now?: number;
}) {
  const now = input.now ?? Date.now();
  const claims: CredentialClaims = {
    kycVerified: true,
    accredited: input.accredited,
    jurisdiction: input.jurisdiction,
    issuedAt: now,
    credentialExpiry: now + 1000 * 60 * 60 * 24 * 30,
  };

  const credential: CredentialRecord = {
    id: `cred_${input.state.credentials.length + 1}`,
    walletAddress: input.walletAddress,
    status: 'issued',
    merkleRoot: '',
    leafHash: '',
    claims,
  };

  credential.leafHash = buildCredentialLeafHash(credential);
  credential.merkleRoot = buildMerkleRoot(credential.leafHash);

  const existingIndex = input.state.credentials.findIndex(
    (item) => item.walletAddress === input.walletAddress,
  );

  if (existingIndex >= 0) {
    input.state.credentials.splice(existingIndex, 1, credential);
  } else {
    input.state.credentials.unshift(credential);
  }

  return credential;
}

export function revokeCredential(state: MvpRuntimeState, credentialId: string) {
  const credential = state.credentials.find((item) => item.id === credentialId);

  if (!credential) {
    return null;
  }

  credential.status = 'revoked';

  return credential;
}
