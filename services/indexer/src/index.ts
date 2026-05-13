import type {
  CredentialRecord,
  InvestorRegistryRow,
  MvpMetrics,
  MvpRuntimeState,
  MvpSnapshot,
} from '../../../packages/shared-types/src/index';

function credentialForWallet(
  credentials: CredentialRecord[],
  walletAddress: string,
) {
  return (
    credentials.find(
      (credential) => credential.walletAddress === walletAddress,
    ) ?? null
  );
}

export function buildMvpSnapshot(state: MvpRuntimeState): MvpSnapshot {
  const investorRegistry: InvestorRegistryRow[] = state.wallets.map(
    (wallet) => {
      const credential = credentialForWallet(state.credentials, wallet.address);
      const eligibility = state.eligibility.find(
        (item) => item.walletAddress === wallet.address,
      );

      return {
        walletAddress: wallet.address,
        label: wallet.label,
        role: wallet.role,
        connectionStatus: wallet.connectionStatus,
        jurisdiction: credential?.claims.jurisdiction ?? null,
        accredited: credential?.claims.accredited ?? null,
        credentialStatus: credential?.status ?? 'none',
        eligible: Boolean(eligibility),
        balance: state.balances[wallet.address] ?? 0,
      };
    },
  );

  const metrics: MvpMetrics = {
    connectedWallets: state.wallets.filter(
      (wallet) => wallet.connectionStatus === 'connected',
    ).length,
    issuedCredentials: state.credentials.length,
    verifiedWallets: state.eligibility.length,
    approvedTransfers: state.transfers.filter(
      (transfer) => transfer.status === 'approved',
    ).length,
    rejectedTransfers: state.transfers.filter(
      (transfer) => transfer.status === 'rejected',
    ).length,
  };

  return {
    ...state,
    investorRegistry,
    metrics,
  };
}
