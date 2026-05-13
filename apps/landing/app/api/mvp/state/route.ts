import { buildMvpSnapshot } from '@veritas-layer/indexer';

import { getMvpState } from '../_lib/state';

export async function GET() {
  return Response.json(buildMvpSnapshot(getMvpState()));
}
