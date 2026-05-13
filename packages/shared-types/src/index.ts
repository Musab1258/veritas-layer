export const SUPPORTED_JURISDICTIONS = ['US', 'NG', 'UK', 'SG', 'EU'] as const;

export type Jurisdiction = (typeof SUPPORTED_JURISDICTIONS)[number];

export type WalletRole = 'issuer' | 'investor';
export type ConnectionStatus = 'available' | 'connected';
export type CredentialStatus = 'issued' | 'verified' | 'revoked' | 'expired';
export type ProofStatus = 'generated' | 'submitted' | 'rejected';
export type TransferStatus = 'approved' | 'rejected';
export type EventCategory =
  | 'wallet'
  | 'policy'
  | 'kyc'
  | 'credential'
  | 'proof'
  | 'transfer';
export type EventStatus = 'info' | 'approved' | 'rejected';

export interface DemoWallet {
  address: string;
  label: string;
  role: WalletRole;
  connectionStatus: ConnectionStatus;
  connectedAt: number | null;
}

export interface CompliancePolicy {
  id: string;
  label: string;
  kycRequired: boolean;
  accreditedOnly: boolean;
  allowedJurisdictions: Jurisdiction[];
}

export interface AssetConfiguration {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  circulatingSupply: number;
  issuerWallet: string;
  policyId: string;
}

export interface CredentialClaims {
  kycVerified: boolean;
  accredited: boolean;
  jurisdiction: Jurisdiction;
  credentialExpiry: number;
  issuedAt: number;
}

export interface CredentialRecord {
  id: string;
  walletAddress: string;
  status: CredentialStatus;
  merkleRoot: string;
  leafHash: string;
  claims: CredentialClaims;
}

export interface ProofRecord {
  id: string;
  credentialId: string;
  walletAddress: string;
  statement: string;
  proofHash: string;
  merkleRoot: string;
  generatedAt: number;
  expiresAt: number;
  publicInputs: {
    kycVerified: boolean;
    accredited: boolean;
    jurisdiction: Jurisdiction;
    policyId: string;
  };
  status: ProofStatus;
}

export interface EligibilityRecord {
  walletAddress: string;
  credentialId: string;
  proofId: string;
  policyId: string;
  verifiedAt: number;
}

export interface TransferRecord {
  id: string;
  assetId: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  submittedAt: number;
  status: TransferStatus;
  reasonCode: string;
  ledgerTxId: string | null;
}

export interface AuditEvent {
  id: string;
  category: EventCategory;
  action: string;
  actor: string;
  status: EventStatus;
  message: string;
  timestamp: number;
  metadata: Record<string, string | number | boolean | null>;
}

export interface MvpRuntimeState {
  phase: 'phase-3';
  policy: CompliancePolicy;
  asset: AssetConfiguration;
  wallets: DemoWallet[];
  selectedWalletAddress: string | null;
  credentials: CredentialRecord[];
  proofs: ProofRecord[];
  eligibility: EligibilityRecord[];
  transfers: TransferRecord[];
  auditLog: AuditEvent[];
  balances: Record<string, number>;
  lastLedgerSequence: number;
}

export interface InvestorRegistryRow {
  walletAddress: string;
  label: string;
  role: WalletRole;
  connectionStatus: ConnectionStatus;
  jurisdiction: Jurisdiction | null;
  accredited: boolean | null;
  credentialStatus: CredentialStatus | 'none';
  eligible: boolean;
  balance: number;
}

export interface MvpMetrics {
  connectedWallets: number;
  issuedCredentials: number;
  verifiedWallets: number;
  approvedTransfers: number;
  rejectedTransfers: number;
}

export interface MvpSnapshot extends MvpRuntimeState {
  investorRegistry: InvestorRegistryRow[];
  metrics: MvpMetrics;
}

export interface ConnectWalletInput {
  walletAddress: string;
}

export interface ConfigureAssetInput {
  name: string;
  symbol: string;
  totalSupply: number;
  kycRequired: boolean;
  accreditedOnly: boolean;
  allowedJurisdictions: Jurisdiction[];
}

export interface MockKycInput {
  walletAddress: string;
  jurisdiction: Jurisdiction;
  accredited: boolean;
}

export interface GenerateProofInput {
  walletAddress: string;
}

export interface SubmitProofInput {
  proofId: string;
}

export interface ExecuteTransferInput {
  fromWallet: string;
  toWallet: string;
  amount: number;
}
