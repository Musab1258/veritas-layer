import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Veritas Layer',
  description:
    'Private, compliant infrastructure for tokenized real-world assets on Stellar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
