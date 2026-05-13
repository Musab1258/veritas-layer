import type { ConnectWalletInput } from '@veritas-layer/shared-types';
import { connectWallet } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ConnectWalletInput;
    return Response.json(connectWallet(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to connect wallet',
      },
      { status: 400 },
    );
  }
}
