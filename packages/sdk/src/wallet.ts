import type { DemoWallet } from '../../shared-types/src/index';

export function shortWalletAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export function resolveWallet(
  wallets: DemoWallet[],
  walletAddress: string | null,
) {
  if (!walletAddress) {
    return null;
  }

  return wallets.find((wallet) => wallet.address === walletAddress) ?? null;
}
