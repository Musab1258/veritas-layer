'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  CircleAlert,
  Database,
  Landmark,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

import { VeritasMvpClient, shortWalletAddress } from '@veritas-layer/sdk';
import type {
  ConfigureAssetInput,
  Jurisdiction,
  MvpSnapshot,
} from '@veritas-layer/shared-types';

const client = new VeritasMvpClient();

function formatTimestamp(value: number) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value);
}

function findLatestProof(snapshot: MvpSnapshot, walletAddress: string | null) {
  if (!walletAddress) {
    return null;
  }

  return (
    snapshot.proofs.find((proof) => proof.walletAddress === walletAddress) ??
    null
  );
}

function findLatestCredential(
  snapshot: MvpSnapshot,
  walletAddress: string | null,
) {
  if (!walletAddress) {
    return null;
  }

  return (
    snapshot.credentials.find(
      (credential) => credential.walletAddress === walletAddress,
    ) ?? null
  );
}

export function MvpDashboard() {
  const [snapshot, setSnapshot] = useState<MvpSnapshot | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    'Loading MVP environment...',
  );
  const [selectedWalletAddress, setSelectedWalletAddress] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] =
    useState<Jurisdiction>('US');
  const [accredited, setAccredited] = useState(true);
  const [transferAmount, setTransferAmount] = useState(25000);
  const [policyForm, setPolicyForm] = useState<ConfigureAssetInput>({
    name: 'Veritas Treasury Access Note',
    symbol: 'VTBILL',
    totalSupply: 1000000,
    kycRequired: true,
    accreditedOnly: true,
    allowedJurisdictions: ['US', 'SG'],
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    void client.getState().then((nextSnapshot) => {
      setSnapshot(nextSnapshot);
      setSelectedWalletAddress(
        nextSnapshot.selectedWalletAddress ??
          nextSnapshot.wallets.find((wallet) => wallet.role === 'investor')
            ?.address ??
          '',
      );
      setStatusMessage(
        'Environment ready. Connect an investor wallet and walk through the compliance flow.',
      );
      setPolicyForm({
        name: nextSnapshot.asset.name,
        symbol: nextSnapshot.asset.symbol,
        totalSupply: nextSnapshot.asset.totalSupply,
        kycRequired: nextSnapshot.policy.kycRequired,
        accreditedOnly: nextSnapshot.policy.accreditedOnly,
        allowedJurisdictions: nextSnapshot.policy.allowedJurisdictions,
      });
    });
  }, []);

  function runAction(
    pendingMessage: string,
    action: () => Promise<MvpSnapshot>,
    successMessage: string,
  ) {
    setStatusMessage(pendingMessage);
    startTransition(() => {
      void action()
        .then((nextSnapshot) => {
          setSnapshot(nextSnapshot);
          setStatusMessage(successMessage);
        })
        .catch((error) => {
          setStatusMessage(
            error instanceof Error ? error.message : 'Action failed',
          );
        });
    });
  }

  if (!snapshot) {
    return (
      <main className="min-h-screen px-6 py-12 text-[var(--color-body)]">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/8 bg-white/4 p-8">
          Loading MVP environment...
        </div>
      </main>
    );
  }

  const investorWallets = snapshot.wallets.filter(
    (wallet) => wallet.role === 'investor',
  );
  const selectedWallet =
    investorWallets.find(
      (wallet) => wallet.address === selectedWalletAddress,
    ) ?? investorWallets[0];
  const credential = findLatestCredential(
    snapshot,
    selectedWallet?.address ?? null,
  );
  const proof = findLatestProof(snapshot, selectedWallet?.address ?? null);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-8 text-[var(--color-body)] sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="panel overflow-hidden p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Phase 3 MVP</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-heading)] sm:text-5xl">
                zk compliance verification from mock KYC to compliant transfer.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-body)] sm:text-base">
                This environment demonstrates the narrow Phase 3 slice the
                project needs right now: wallet onboarding, credential issuance,
                off-chain proof generation, contract-style eligibility
                validation, and transfer gating against a regulated asset
                policy.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className="button-secondary" href="/">
                Back to landing
              </Link>
              <button
                className="button-primary"
                disabled={isPending}
                onClick={() =>
                  runAction(
                    'Resetting the Phase 3 environment...',
                    () => client.reset(),
                    'Environment reset. Ready for another review pass.',
                  )
                }
                type="button"
              >
                Reset environment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-4">
            <MetricCard
              label="Connected wallets"
              value={snapshot.metrics.connectedWallets}
            />
            <MetricCard
              label="Issued credentials"
              value={snapshot.metrics.issuedCredentials}
            />
            <MetricCard
              label="Eligible wallets"
              value={snapshot.metrics.verifiedWallets}
            />
            <MetricCard
              label="Approved transfers"
              value={snapshot.metrics.approvedTransfers}
            />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            <FlowNode icon={Wallet} label="Wallet" />
            <FlowNode icon={ShieldCheck} label="Mock KYC" />
            <FlowNode icon={Blocks} label="Proof generation" />
            <FlowNode icon={Landmark} label="Compliance verdict" />
            <FlowNode icon={Database} label="Indexed audit log" />
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <div className="panel p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-kicker">1. Policy and asset</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--color-heading)]">
                    Configure the regulated asset surface.
                  </h2>
                </div>
                <span className="mono-badge">Issuer-controlled</span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="field">
                  <span className="label">Asset name</span>
                  <input
                    className="input"
                    onChange={(event) =>
                      setPolicyForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    value={policyForm.name}
                  />
                </label>
                <label className="field">
                  <span className="label">Symbol</span>
                  <input
                    className="input"
                    maxLength={12}
                    onChange={(event) =>
                      setPolicyForm((current) => ({
                        ...current,
                        symbol: event.target.value.toUpperCase(),
                      }))
                    }
                    value={policyForm.symbol}
                  />
                </label>
                <label className="field">
                  <span className="label">Supply</span>
                  <input
                    className="input"
                    min={1}
                    onChange={(event) =>
                      setPolicyForm((current) => ({
                        ...current,
                        totalSupply: Number(event.target.value),
                      }))
                    }
                    type="number"
                    value={policyForm.totalSupply}
                  />
                </label>
                <div className="field">
                  <span className="label">Jurisdiction allowlist</span>
                  <div className="flex flex-wrap gap-2">
                    {(['US', 'NG', 'UK', 'SG', 'EU'] as Jurisdiction[]).map(
                      (jurisdiction) => {
                        const active =
                          policyForm.allowedJurisdictions.includes(
                            jurisdiction,
                          );

                        return (
                          <button
                            className={`chip ${active ? 'chip-active' : ''}`}
                            key={jurisdiction}
                            onClick={() =>
                              setPolicyForm((current) => ({
                                ...current,
                                allowedJurisdictions: active
                                  ? current.allowedJurisdictions.filter(
                                      (item) => item !== jurisdiction,
                                    )
                                  : [
                                      ...current.allowedJurisdictions,
                                      jurisdiction,
                                    ],
                              }))
                            }
                            type="button"
                          >
                            {jurisdiction}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-6">
                <label className="toggle">
                  <input
                    checked={policyForm.kycRequired}
                    onChange={(event) =>
                      setPolicyForm((current) => ({
                        ...current,
                        kycRequired: event.target.checked,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>KYC required</span>
                </label>
                <label className="toggle">
                  <input
                    checked={policyForm.accreditedOnly}
                    onChange={(event) =>
                      setPolicyForm((current) => ({
                        ...current,
                        accreditedOnly: event.target.checked,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>Accredited investors only</span>
                </label>
              </div>

              <div className="mt-6">
                <button
                  className="button-primary"
                  disabled={isPending}
                  onClick={() =>
                    runAction(
                      'Updating policy and asset configuration...',
                      () => client.configureAsset(policyForm),
                      'Policy updated. The contract-core rules and treasury asset now reflect the issuer configuration.',
                    )
                  }
                  type="button"
                >
                  Apply policy
                </button>
              </div>
            </div>

            <div className="panel p-6">
              <p className="section-kicker">2. Wallet and KYC</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-heading)]">
                Connect an investor wallet and issue a mock credential.
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="field">
                  <span className="label">Investor wallet</span>
                  <select
                    className="input"
                    onChange={(event) =>
                      setSelectedWalletAddress(event.target.value)
                    }
                    value={selectedWalletAddress}
                  >
                    {investorWallets.map((wallet) => (
                      <option key={wallet.address} value={wallet.address}>
                        {wallet.label} · {shortWalletAddress(wallet.address)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="field">
                  <span className="label">Wallet status</span>
                  <div className="info-box">
                    {selectedWallet ? selectedWallet.connectionStatus : 'n/a'}
                  </div>
                </div>
                <label className="field">
                  <span className="label">Mock jurisdiction</span>
                  <select
                    className="input"
                    onChange={(event) =>
                      setSelectedJurisdiction(
                        event.target.value as Jurisdiction,
                      )
                    }
                    value={selectedJurisdiction}
                  >
                    {(['US', 'NG', 'UK', 'SG', 'EU'] as Jurisdiction[]).map(
                      (jurisdiction) => (
                        <option key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="toggle pt-8">
                  <input
                    checked={accredited}
                    onChange={(event) => setAccredited(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Accredited investor</span>
                </label>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="button-secondary"
                  disabled={isPending || !selectedWalletAddress}
                  onClick={() =>
                    runAction(
                      'Connecting wallet session...',
                      () =>
                        client.connectWallet({
                          walletAddress: selectedWalletAddress,
                        }),
                      'Wallet connected. You can now issue a credential and continue the compliance flow.',
                    )
                  }
                  type="button"
                >
                  Connect wallet
                </button>
                <button
                  className="button-primary"
                  disabled={isPending || !selectedWalletAddress}
                  onClick={() =>
                    runAction(
                      'Issuing mock credential...',
                      () =>
                        client.completeMockKyc({
                          walletAddress: selectedWalletAddress,
                          jurisdiction: selectedJurisdiction,
                          accredited,
                        }),
                      'Credential issued. The investor now has an attestation and Merkle commitment ready for proof generation.',
                    )
                  }
                  type="button"
                >
                  Complete mock KYC
                </button>
              </div>
            </div>

            <div className="panel p-6">
              <p className="section-kicker">3. Proof and transfer</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-heading)]">
                Generate an off-chain proof, validate it, and execute the gated
                transfer.
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="field">
                  <span className="label">Latest credential</span>
                  <div className="info-box">
                    {credential
                      ? `${credential.id} · ${credential.status} · ${credential.claims.jurisdiction}`
                      : 'No credential issued yet'}
                  </div>
                </div>
                <div className="field">
                  <span className="label">Latest proof</span>
                  <div className="info-box">
                    {proof
                      ? `${proof.id} · ${proof.status}`
                      : 'No proof generated yet'}
                  </div>
                </div>
                <label className="field">
                  <span className="label">Transfer amount</span>
                  <input
                    className="input"
                    min={1}
                    onChange={(event) =>
                      setTransferAmount(Number(event.target.value))
                    }
                    type="number"
                    value={transferAmount}
                  />
                </label>
                <div className="field">
                  <span className="label">Issuer treasury balance</span>
                  <div className="info-box">
                    {snapshot.balances[
                      snapshot.asset.issuerWallet
                    ].toLocaleString()}{' '}
                    {snapshot.asset.symbol}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="button-secondary"
                  disabled={isPending || !selectedWalletAddress || !credential}
                  onClick={() =>
                    runAction(
                      'Generating off-chain proof...',
                      () =>
                        client.generateProof({
                          walletAddress: selectedWalletAddress,
                        }),
                      'Proof generated. The package is ready for relay and contract-style compliance validation.',
                    )
                  }
                  type="button"
                >
                  Generate proof
                </button>
                <button
                  className="button-secondary"
                  disabled={isPending || !proof}
                  onClick={() =>
                    runAction(
                      'Submitting proof to the compliance engine...',
                      () =>
                        client.submitProof({
                          proofId: proof?.id ?? '',
                        }),
                      'Compliance verdict returned. If accepted, the wallet is now eligible for transfers.',
                    )
                  }
                  type="button"
                >
                  Submit proof
                </button>
                <button
                  className="button-primary"
                  disabled={isPending || !selectedWalletAddress}
                  onClick={() =>
                    runAction(
                      'Executing compliant transfer...',
                      () =>
                        client.executeTransfer({
                          fromWallet: snapshot.asset.issuerWallet,
                          toWallet: selectedWalletAddress,
                          amount: transferAmount,
                        }),
                      'Transfer flow completed. Review the ledger result and audit log for the final verdict.',
                    )
                  }
                  type="button"
                >
                  Execute transfer
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="panel p-6">
              <p className="section-kicker">MVP status</p>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 p-4">
                {statusMessage.toLowerCase().includes('failed') ||
                statusMessage.toLowerCase().includes('rejected') ||
                statusMessage.toLowerCase().includes('error') ? (
                  <CircleAlert className="mt-0.5 h-5 w-5 text-[#f59e0b]" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--color-accent)]" />
                )}
                <p className="text-sm leading-7 text-[var(--color-body)]">
                  {statusMessage}
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <StatusRow
                  label="Active policy"
                  value={`${snapshot.asset.symbol} · ${snapshot.policy.allowedJurisdictions.join(', ')}`}
                />
                <StatusRow
                  label="Selected investor"
                  value={
                    selectedWallet
                      ? `${selectedWallet.label} · ${shortWalletAddress(selectedWallet.address)}`
                      : 'None selected'
                  }
                />
                <StatusRow
                  label="Eligibility"
                  value={
                    snapshot.eligibility.find(
                      (item) => item.walletAddress === selectedWallet?.address,
                    )
                      ? 'Eligible for regulated transfer'
                      : 'Not eligible yet'
                  }
                />
              </div>
            </div>

            <div className="panel p-6">
              <p className="section-kicker">Investor registry</p>
              <div className="table-shell mt-5">
                <table className="w-full">
                  <thead className="table-head">
                    <tr>
                      <th>Wallet</th>
                      <th>Status</th>
                      <th>Jurisdiction</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshot.investorRegistry.map((row) => (
                      <tr className="table-row" key={row.walletAddress}>
                        <td>
                          <div className="font-medium text-[var(--color-heading)]">
                            {row.label}
                          </div>
                          <div className="text-xs text-[var(--color-muted)]">
                            {shortWalletAddress(row.walletAddress)}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-chip ${
                              row.eligible ? 'status-chip-success' : ''
                            }`}
                          >
                            {row.credentialStatus === 'none'
                              ? row.connectionStatus
                              : row.credentialStatus}
                          </span>
                        </td>
                        <td>{row.jurisdiction ?? 'n/a'}</td>
                        <td>{row.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel p-6">
              <p className="section-kicker">Transfer log</p>
              <div className="table-shell mt-5">
                <table className="w-full">
                  <thead className="table-head">
                    <tr>
                      <th>Transfer</th>
                      <th>Result</th>
                      <th>Ledger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapshot.transfers.length === 0 ? (
                      <tr className="table-row">
                        <td colSpan={3}>No transfers executed yet.</td>
                      </tr>
                    ) : (
                      snapshot.transfers.map((transfer) => (
                        <tr className="table-row" key={transfer.id}>
                          <td>
                            {transfer.amount.toLocaleString()}{' '}
                            {snapshot.asset.symbol}
                          </td>
                          <td>
                            <span
                              className={`status-chip ${
                                transfer.status === 'approved'
                                  ? 'status-chip-success'
                                  : 'status-chip-warning'
                              }`}
                            >
                              {transfer.reasonCode}
                            </span>
                          </td>
                          <td>{transfer.ledgerTxId ?? 'Not settled'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel p-6">
              <p className="section-kicker">Audit timeline</p>
              <div className="mt-5 space-y-3">
                {snapshot.auditLog.slice(0, 8).map((event) => (
                  <div
                    className="rounded-2xl border border-white/8 bg-white/4 p-4"
                    key={event.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="mono-badge">{event.action}</span>
                      <span className="text-xs text-[var(--color-muted)]">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">
                      {event.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-[var(--color-heading)]">
        {value}
      </p>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  label,
}: {
  icon: typeof Wallet;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[var(--color-secondary-accent)]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-medium text-[var(--color-heading)]">
        {label}
      </p>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className="text-right text-[var(--color-heading)]">{value}</span>
    </div>
  );
}
