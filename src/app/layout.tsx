import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import ToasterProvider from '@/components/custom/ToasterProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ANVL Finance | Floorplan Financing, Simplified.',
  description: 'ANVL delivers AI-verified floorplan financing with cryptographic NFC proof-of-presence, simplified audits, and permissioned liquidity—built to fit dealer operations and institutional diligence.',
  keywords: 'floorplan financing, auto dealer financing, NFC verification, AI-verified collateral, institutional credit, dealer credit, tokenized assets',
  openGraph: {
    title: 'Floorplan Financing, Simplified.',
    description: 'ANVL delivers AI-verified floorplan financing with cryptographic NFC proof-of-presence, simplified audits, and permissioned liquidity—built to fit dealer operations and institutional diligence.',
    type: 'website',
    siteName: 'ANVL Finance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floorplan Financing, Simplified.',
    description: 'ANVL delivers AI-verified floorplan financing with cryptographic NFC proof-of-presence, simplified audits, and permissioned liquidity.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'ANVL Finance',
              url: 'https://www.anvl.finance',
              description: 'AI-verified floorplan financing with cryptographic NFC proof-of-presence.',
              areaServed: 'US',
              serviceType: 'Inventory (floorplan) financing'
            })
          }}
        />
        <link rel="canonical" href="https://www.anvl.finance" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToasterProvider />
        <Analytics />
      </body>
    </html>
  );
}