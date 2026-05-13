import type { ConfigureAssetInput } from '@veritas-layer/shared-types';
import { configureAssetAndPolicy } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ConfigureAssetInput;
    return Response.json(configureAssetAndPolicy(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to configure asset policy',
      },
      { status: 400 },
    );
  }
}
