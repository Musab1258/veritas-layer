import type { MockKycInput } from '@veritas-layer/shared-types';
import { completeMockKyc } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MockKycInput;
    return Response.json(completeMockKyc(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to complete mock KYC',
      },
      { status: 400 },
    );
  }
}
