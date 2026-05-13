import type { MvpRuntimeState } from '@veritas-layer/shared-types';

const ISSUER_WALLET = 'GVERITASISSUER6T2ZXQJ3Q4PJQ4M7W2PSEU2ATREASURY001';
const INVESTOR_ALPHA = 'GALPHAINVESTOR7F4YBHT3M5S7KYCALLOWUS000000000001';
const INVESTOR_BETA = 'GBETAINVESTOR8M2PFLQ9A4N6UNVERIFIED0000000000002';
const INVESTOR_GAMMA = 'GGAMMAINVESTOR9L5ZKQW2N8SINGAPORE00000000000003';

function createInitialState(): MvpRuntimeState {
  return {
    phase: 'phase-3',
    policy: {
      id: 'policy_tbill_us',
      label: 'VTBILL compliance policy',
      kycRequired: true,
      accreditedOnly: true,
      allowedJurisdictions: ['US', 'SG'],
    },
    asset: {
      id: 'asset_vtbill',
      name: 'Veritas Treasury Access Note',
      symbol: 'VTBILL',
      totalSupply: 1000000,
      circulatingSupply: 1000000,
      issuerWallet: ISSUER_WALLET,
      policyId: 'policy_tbill_us',
    },
    wallets: [
      {
        address: ISSUER_WALLET,
        label: 'Issuer Treasury',
        role: 'issuer',
        connectionStatus: 'connected',
        connectedAt: Date.now(),
      },
      {
        address: INVESTOR_ALPHA,
        label: 'Investor Alpha',
        role: 'investor',
        connectionStatus: 'available',
        connectedAt: null,
      },
      {
        address: INVESTOR_BETA,
        label: 'Investor Beta',
        role: 'investor',
        connectionStatus: 'available',
        connectedAt: null,
      },
      {
        address: INVESTOR_GAMMA,
        label: 'Investor Gamma',
        role: 'investor',
        connectionStatus: 'available',
        connectedAt: null,
      },
    ],
    selectedWalletAddress: INVESTOR_ALPHA,
    credentials: [],
    proofs: [],
    eligibility: [],
    transfers: [],
    auditLog: [
      {
        id: 'evt_0',
        category: 'policy',
        action: 'mvp.initialized',
        actor: ISSUER_WALLET,
        status: 'info',
        message:
          'Phase 3 environment initialized with issuer treasury, investor wallets, and a regulated treasury-style asset.',
        timestamp: Date.now(),
        metadata: {
          asset: 'VTBILL',
        },
      },
    ],
    balances: {
      [ISSUER_WALLET]: 1000000,
      [INVESTOR_ALPHA]: 0,
      [INVESTOR_BETA]: 0,
      [INVESTOR_GAMMA]: 0,
    },
    lastLedgerSequence: 1000,
  };
}

declare global {
  var __veritasMvpState__: MvpRuntimeState | undefined;
}

export function getMvpState() {
  if (!globalThis.__veritasMvpState__) {
    globalThis.__veritasMvpState__ = createInitialState();
  }

  return globalThis.__veritasMvpState__;
}

export function resetMvpState() {
  globalThis.__veritasMvpState__ = createInitialState();
  return globalThis.__veritasMvpState__;
}
