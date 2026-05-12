'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Building2,
  Code2,
  Landmark,
  LockKeyhole,
  Radar,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  'zkKYC verification',
  'policy-aware transfers',
  'Soroban-native settlement',
  'modular off-chain proving',
] as const;

const modules = [
  {
    title: 'zk identity layer',
    description:
      'Issue privacy-preserving eligibility proofs for KYC, accreditation, and jurisdiction checks without exposing raw investor data.',
    icon: ShieldCheck,
  },
  {
    title: 'compliance rules engine',
    description:
      'Enforce wallet-level allowlists, transfer restrictions, holding periods, and investor qualification logic through programmable policies.',
    icon: ScrollText,
  },
  {
    title: 'asset issuance engine',
    description:
      'Coordinate issuance policies, mint and burn workflows, and metadata structures for treasury products, private credit, and tokenized real estate.',
    icon: Building2,
  },
  {
    title: 'settlement and transfer layer',
    description:
      'Support institutional delivery logic, controlled settlement windows, and compliance-aware asset routing on Stellar rails.',
    icon: Radar,
  },
];

const useCases = [
  {
    title: 'Treasury bill products',
    description:
      'Launch institutionally familiar debt instruments with programmable transfer controls and privacy-preserving investor verification.',
  },
  {
    title: 'Private credit and invoices',
    description:
      'Represent financing instruments with issuer permissions, policy-gated transfers, and operational reporting hooks.',
  },
  {
    title: 'Tokenized real estate shares',
    description:
      'Enable fractional ownership flows with compliance-aware trustline access, controlled transfers, and selective audit visibility.',
  },
] as const;

const roadmap = [
  'Phase 1: brand system, repo foundation, and landing page',
  'Phase 2: architecture docs, threat model, and contributor-ready documentation',
  'Phase 3: zk compliance MVP with proof verification, transfer validation, and issuer dashboard foundations',
  'Phase 4: public issues, SDK surface area, and contributor onboarding systems',
] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-body)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.24),_transparent_68%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[22rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.18),_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-10">
        <motion.header
          className="mb-14 flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-center md:justify-between"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-secondary-accent)]">
              Veritas Layer
            </p>
            <p className="mt-2 max-w-xl text-sm text-[var(--color-muted)]">
              Private, compliant infrastructure for tokenized real-world assets on
              Stellar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="button-secondary" href="#architecture">
              Architecture
            </Link>
            <Link className="button-primary" href="#developer-surface">
              Explore the stack
            </Link>
          </div>
        </motion.header>

        <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.65, delay: 0.05, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              <BadgeCheck className="h-3.5 w-3.5" />
              Phase 1 foundation deployed
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--color-heading)] sm:text-6xl lg:text-7xl">
              Privacy-preserving infrastructure for compliant asset issuance and
              settlement.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-body)] sm:text-lg">
              Veritas Layer gives institutions and developers a modular operating
              system for zk compliance, programmable transfer controls,
              confidential ownership primitives, and Soroban-native execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="button-primary" href="#developer-surface">
                Review the platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="button-secondary" href="#roadmap">
                View roadmap
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-[var(--color-body)] backdrop-blur"
                  key={metric}
                >
                  {metric}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="panel overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-accent)]">
                  System framing
                </p>
                <p className="mt-2 text-lg font-medium text-[var(--color-heading)]">
                  Institutional tokenization without the privacy tradeoff
                </p>
              </div>
              <div className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Soroban
              </div>
            </div>
            <div className="grid gap-4 p-6">
              <div className="rounded-2xl border border-white/8 bg-[linear-gradient(160deg,rgba(79,70,229,0.16),rgba(15,23,42,0.45))] p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-secondary-accent)]">
                  Why now
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">
                  Most RWA systems force a compromise between compliance,
                  transparency, and investor privacy. Veritas Layer is designed to
                  eliminate that compromise with modular proof systems and
                  programmable controls.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Primary MVP
                  </p>
                  <p className="mt-3 text-base font-medium text-[var(--color-heading)]">
                    zkKYC compliance verification
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Target assets
                  </p>
                  <p className="mt-3 text-base font-medium text-[var(--color-heading)]">
                    Treasury bills, private credit, tokenized real estate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="mt-24"
          id="developer-surface"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Platform modules</p>
              <h2 className="section-heading">
                Compliance, issuance, identity, and settlement in one developer
                surface.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              The initial repo is structured as a monorepo so each subsystem can
              mature independently without fragmenting the protocol surface.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {modules.map(({ title, description, icon: Icon }) => (
              <div className="panel p-6" key={title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[var(--color-secondary-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[var(--color-heading)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mt-24"
          id="architecture"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Architecture</p>
              <h2 className="section-heading">
                An orchestration layer above Stellar primitives and Soroban
                contracts.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              The research direction is explicit: use Stellar as the settlement
              foundation, keep heavy proving off-chain, and enforce deterministic
              compliance outcomes on-chain.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="panel p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <ArchitectureCard
                  description="Wallets, issuers, and institutional operators interact with permissioned asset flows."
                  icon={Landmark}
                  title="Participants"
                />
                <ArchitectureCard
                  description="Proof generation, identity, indexing, and policy orchestration run as modular services."
                  icon={Blocks}
                  title="Services"
                />
                <ArchitectureCard
                  description="Soroban contracts and Stellar asset controls verify eligibility and enforce transfer logic."
                  icon={LockKeyhole}
                  title="Execution"
                />
              </div>

              <div className="mt-6 grid gap-3 rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(6,8,22,0.92))] p-6">
                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                  <DiagramNode label="Wallet + issuer" />
                  <DiagramArrow />
                  <DiagramNode label="zk proof + identity services" />
                  <DiagramArrow />
                  <DiagramNode label="Compliance engine" />
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <DiagramNode label="Soroban policy contracts" />
                  <DiagramArrow />
                  <DiagramNode label="Stellar asset settlement" />
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-accent)]">
                Monorepo surface
              </p>
              <div className="mt-5 space-y-3 font-mono text-sm leading-7 text-[var(--color-body)]">
                <RepoLine path="apps/landing" summary="public project entry point" />
                <RepoLine
                  path="contracts/compliance-engine"
                  summary="policy execution and transfer validation"
                />
                <RepoLine
                  path="services/zk-engine"
                  summary="proof orchestration and verifier interfaces"
                />
                <RepoLine
                  path="packages/design-tokens"
                  summary="shared visual system primitives"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mt-24 grid gap-8 xl:grid-cols-[0.96fr_1.04fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="panel p-6">
            <p className="section-kicker">Institutional use cases</p>
            <h2 className="section-heading mt-4">
              Built for the asset classes that matter to regulated finance.
            </h2>
            <div className="mt-8 space-y-4">
              {useCases.map((item) => (
                <div
                  className="rounded-2xl border border-white/8 bg-white/4 p-5"
                  key={item.title}
                >
                  <p className="text-base font-medium text-[var(--color-heading)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-body)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <p className="section-kicker">Security and compliance</p>
            <h2 className="section-heading mt-4">
              Privacy by default, auditability where institutions need it.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <SecurityItem
                description="Raw KYC data never touches chain state. Contracts verify compliance outcomes, not sensitive credentials."
                icon={ShieldCheck}
                title="Selective disclosure"
              />
              <SecurityItem
                description="Wallet-level eligibility, jurisdiction gating, and transfer allowlists map directly to the MVP compliance model."
                icon={BadgeCheck}
                title="Deterministic controls"
              />
              <SecurityItem
                description="Proof generation remains modular and off-chain so proving systems can evolve without rewriting on-chain logic."
                icon={Blocks}
                title="Upgradeable zk architecture"
              />
              <SecurityItem
                description="Institutional settlement workflows can expand toward DvP, escrow, and batched execution in later phases."
                icon={Radar}
                title="Future-ready settlement"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
          id="roadmap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <p className="section-kicker">Roadmap snapshot</p>
            <h2 className="section-heading mt-4">
              The landing page is the entry point, not the product boundary.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              The roadmap is staged around credibility first, then documentation,
              then a working zk compliance subsystem with contributor-ready
              surfaces around it.
            </p>
          </div>

          <div className="panel p-6">
            <ol className="space-y-4">
              {roadmap.map((item, index) => (
                <li
                  className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4"
                  key={item}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 font-mono text-xs text-[var(--color-secondary-accent)]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[var(--color-body)]">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="panel grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker">Developer onboarding</p>
              <h2 className="section-heading mt-4">
                Ready for contributors, partners, and ecosystem reviewers.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-body)]">
                This foundation includes a production-oriented monorepo shape,
                design tokens, branding documentation, and a landing page that
                explains the protocol direction with the right institutional tone.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link className="button-primary" href="mailto:team@veritaslayer.xyz">
                Contact the team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="button-secondary" href="mailto:security@veritaslayer.xyz">
                Security contact
              </Link>
            </div>
          </div>
        </motion.section>

        <footer className="mt-16 border-t border-white/8 pt-6 text-sm text-[var(--color-muted)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>Veritas Layer is designed as compliance and privacy middleware for institutional tokenization on Stellar.</p>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
              <span>Next.js 15</span>
              <span className="text-white/20">/</span>
              <span>Tailwind</span>
              <span className="text-white/20">/</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ArchitectureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Landmark;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[var(--color-accent)]">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="mt-4 text-base font-medium text-[var(--color-heading)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--color-body)]">{description}</p>
    </div>
  );
}

function DiagramNode({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm text-[var(--color-heading)]">
      {label}
    </div>
  );
}

function DiagramArrow() {
  return (
    <div className="hidden items-center justify-center text-[var(--color-secondary-accent)] md:flex">
      <ArrowRight className="h-4 w-4" />
    </div>
  );
}

function RepoLine({ path, summary }: { path: string; summary: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
      <p className="text-[var(--color-heading)]">{path}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {summary}
      </p>
    </div>
  );
}

function SecurityItem({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Code2;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[var(--color-accent)]">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="mt-4 text-base font-medium text-[var(--color-heading)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--color-body)]">{description}</p>
    </div>
  );
}
