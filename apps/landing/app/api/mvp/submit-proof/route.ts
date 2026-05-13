import type { SubmitProofInput } from '@veritas-layer/shared-types';
import { submitProof } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmitProofInput;
    return Response.json(submitProof(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to submit proof',
      },
      { status: 400 },
    );
  }
}
