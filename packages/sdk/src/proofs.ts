import type {
  CompliancePolicy,
  CredentialRecord,
} from '../../shared-types/src/index';

export function buildProofStatement(
  credential: CredentialRecord,
  policy: CompliancePolicy,
) {
  const segments = [
    credential.claims.kycVerified ? 'KYC complete' : 'KYC incomplete',
    credential.claims.accredited ? 'accredited investor' : 'non-accredited',
    `jurisdiction ${credential.claims.jurisdiction}`,
    `policy ${policy.label}`,
  ];

  return segments.join(' • ');
}

export function buildProofPreview(
  credential: CredentialRecord,
  policy: CompliancePolicy,
) {
  return {
    walletAddress: credential.walletAddress,
    credentialId: credential.id,
    statement: buildProofStatement(credential, policy),
    merkleRoot: credential.merkleRoot,
    publicInputs: {
      kycVerified: credential.claims.kycVerified,
      accredited: credential.claims.accredited,
      jurisdiction: credential.claims.jurisdiction,
      policyId: policy.id,
    },
  };
}
