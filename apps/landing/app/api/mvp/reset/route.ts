import { buildMvpSnapshot } from '@veritas-layer/indexer';

import { resetMvpState } from '../_lib/state';

export async function POST() {
  return Response.json(buildMvpSnapshot(resetMvpState()));
}
