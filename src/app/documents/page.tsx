'use client';

import Image from 'next/image';
import Link from 'next/link';

const documents = [
  {
    title: 'Cryptographic Collateral Attestation',
    subtitle: 'A Protocol for Verifiable Physical Asset Presence in On-Chain Lending',
    href: '/documents/whitepaper',
    date: 'March 2026',
    version: '1.0',
    readTime: '25 min',
    status: 'current' as const,
    description:
      'Technical architecture for ANVL\'s transition from centralized verification to end-to-end cryptographic attestation. Covers disposable tag economics, gateway-level Ed25519 signing, HMAC-SHA256 ephemeral identity resolution, Merkle root device registry, and the complete independent verification path for RWA lending protocols.',
    tags: ['Protocol Design', 'Cryptography', 'RWA'],
  },
  {
    title: 'From Prototype to Production',
    subtitle: 'ANVL\'s Engineering and Compliance Roadmap for Financial-Grade Infrastructure',
    href: '/documents/production-readiness',
    date: 'March 2026',
    version: '1.0',
    readTime: '20 min',
    status: 'current' as const,
    description:
      'A technical architecture document covering the transition from ANVL\'s Replit prototype to a production-grade, SOC 2-compliant system. Includes full stack documentation, gap analysis, AWS infrastructure design, the Scout/Smith/Anvil AI development pipeline, GLBA compliance roadmap, integration plan for Blackbook, KYB, and Vara, and a phased migration timeline.',
    tags: ['Engineering', 'Compliance', 'SOC 2', 'GLBA'],
  },
  // Future documents go here:
  // {
  //   title: 'ANVL Token Economics',
  //   subtitle: 'Fee Structures and Revenue Distribution',
  //   href: '/documents/tokenomics',
  //   date: 'Coming Q2 2026',
  //   version: 'Draft',
  //   readTime: '—',
  //   status: 'upcoming' as const,
  //   description: 'Detailed breakdown of ANVL\'s fee model, revenue waterfall, and institutional yield mechanics.',
  //   tags: ['Economics', 'Institutional'],
  // },
];

export default function DocumentsPage() {
  const handleLogout = async () => {
    await fetch('/api/auth/documents', { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#13213E' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#1E3154' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/anvl-logo.svg"
                alt="ANVL Logo"
                width={140}
                height={40}
                priority
              />
            </Link>
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6B7A8D' }}>
              Documents
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs transition-colors"
              style={{ color: '#AAB1B9' }}
            >
              ← Back to site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded transition-colors"
              style={{ color: '#6B7A8D', border: '1px solid #1E3154' }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#F5F5F5' }}>
            Technical Documentation
          </h1>
          <p className="text-base" style={{ color: '#AAB1B9' }}>
            Architecture specifications, protocol design, and technical white papers for ANVL Finance.
          </p>
        </div>
      </section>

      {/* Document cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-4">
          {documents.map((doc) => (
            <Link
              key={doc.href}
              href={doc.status === 'current' ? doc.href : '#'}
              className="block rounded-lg p-6 sm:p-8 transition-all duration-200 group"
              style={{
                backgroundColor: '#0D1B2A',
                border: '1px solid #1E3154',
              }}
              onMouseEnter={(e) => {
                if (doc.status === 'current') {
                  e.currentTarget.style.borderColor = '#E4312D';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E3154';
              }}
            >
              {/* Status & metadata row */}
              <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: '#6B7A8D' }}>
                {doc.status === 'current' ? (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}
                  >
                    Current
                  </span>
                ) : (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(107, 122, 141, 0.15)', color: '#6B7A8D' }}
                  >
                    Upcoming
                  </span>
                )}
                <span>{doc.date}</span>
                <span>·</span>
                <span>v{doc.version}</span>
                <span>·</span>
                <span>{doc.readTime} read</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-1" style={{ color: '#F5F5F5' }}>
                {doc.title}
              </h2>
              <p className="text-sm mb-4" style={{ color: '#C9CDD3' }}>
                {doc.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#AAB1B9' }}>
                {doc.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded"
                    style={{ backgroundColor: '#13213E', color: '#6B7A8D' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read arrow */}
              {doc.status === 'current' && (
                <div
                  className="mt-5 text-xs font-medium flex items-center gap-1 transition-all group-hover:gap-2"
                  style={{ color: '#E4312D' }}
                >
                  Read document
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-xs" style={{ borderColor: '#1E3154', color: '#6B7A8D' }}>
        <p>© 2026 ANVL Finance LLC. All Rights Reserved.</p>
        <p className="mt-1">These documents are confidential and intended for authorized recipients only.</p>
      </footer>
    </div>
  );
}
