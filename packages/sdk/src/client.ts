import type {
  ConfigureAssetInput,
  ConnectWalletInput,
  ExecuteTransferInput,
  GenerateProofInput,
  MockKycInput,
  MvpSnapshot,
  SubmitProofInput,
} from '../../shared-types/src/index';

export class VeritasMvpClient {
  constructor(private readonly baseUrl = '/api/mvp') {}

  async getState() {
    return this.request<MvpSnapshot>('/state', {
      method: 'GET',
    });
  }

  async reset() {
    return this.request<MvpSnapshot>('/reset', {
      method: 'POST',
    });
  }

  async connectWallet(input: ConnectWalletInput) {
    return this.request<MvpSnapshot>('/connect-wallet', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async configureAsset(input: ConfigureAssetInput) {
    return this.request<MvpSnapshot>('/configure-asset', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async completeMockKyc(input: MockKycInput) {
    return this.request<MvpSnapshot>('/kyc', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async generateProof(input: GenerateProofInput) {
    return this.request<MvpSnapshot>('/proof', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async submitProof(input: SubmitProofInput) {
    return this.request<MvpSnapshot>('/submit-proof', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async executeTransfer(input: ExecuteTransferInput) {
    return this.request<MvpSnapshot>('/transfers', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  private async request<T>(path: string, init: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(payload?.error ?? 'Request failed');
    }

    return (await response.json()) as T;
  }
}
