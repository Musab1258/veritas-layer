# `@veritas-layer/sdk`

This package exposes the typed developer helpers that currently back the Veritas Layer MVP.

## Current surface

- `VeritasMvpClient` for interacting with the local MVP API
- proof preview helpers in `src/proofs.ts`
- wallet formatting helpers in `src/wallet.ts`
- shared exported domain types from `@veritas-layer/shared-types`

## Status

This is a Phase 4 contributor-facing SDK surface built on top of the Phase 3 MVP. It is useful for local development and integration experiments, but it is not yet a production network client.

## Example

```ts
import { VeritasMvpClient } from '@veritas-layer/sdk';

const client = new VeritasMvpClient('/api/mvp');

const state = await client.getState();
console.log(state.metrics.verifiedWallets);
```

## Contribution notes

- update `packages/shared-types` first when request or response shapes change
- keep exported helpers narrow and explicit
- do not present planned network integrations as already implemented
