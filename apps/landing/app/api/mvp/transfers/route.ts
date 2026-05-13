import type { ExecuteTransferInput } from '@veritas-layer/shared-types';
import { executeTransfer } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ExecuteTransferInput;
    return Response.json(executeTransfer(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to execute transfer',
      },
      { status: 400 },
    );
  }
}
