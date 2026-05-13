import type { Metadata } from 'next';

import { MvpDashboard } from '@/components/mvp/mvp-dashboard';

export const metadata: Metadata = {
  title: 'Veritas Layer MVP',
  description:
    'Phase 3 zk compliance verification prototype for mock KYC, proof generation, and compliant transfers on Veritas Layer.',
};

export default function MvpPage() {
  return <MvpDashboard />;
}
