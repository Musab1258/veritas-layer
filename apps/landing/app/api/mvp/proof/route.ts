import type { GenerateProofInput } from '@veritas-layer/shared-types';
import { generateProof } from '@veritas-layer/api-gateway';

import { getMvpState } from '../_lib/state';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GenerateProofInput;
    return Response.json(generateProof(getMvpState(), payload));
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to generate proof',
      },
      { status: 400 },
    );
  }
}
