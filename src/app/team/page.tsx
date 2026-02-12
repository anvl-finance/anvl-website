'use client';

import { Linkedin } from 'lucide-react';
import Link from 'next/link';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';

export default function TeamPage() {
  const team = [
    {
      name: 'Ben Schwarz',
      title: 'Co-Founder',
      credentials:
        'Fintech and credit-market operator focused on institutional distribution, capital markets, and product strategy across private credit and structured finance.',
      linkedin: 'https://www.linkedin.com/in/ben-schwarz-029b40a1/',
    },
    {
      name: 'David Nichamoff',
      title: 'Co-Founder',
      credentials:
        'CTO / systems architect focused on verification infrastructure, data pipelines, and scalable fintech platforms bridging traditional workflows with cryptographic auditability.',
      linkedin: 'https://www.linkedin.com/in/dnichamoff/',
    },
    {
      name: 'Jeremiah Johnson',
      title: 'Co-Founder',
      credentials:
        'Go-to-market and operations leader with deep experience in dealer workflows and partner execution. Focused on onboarding, rollout, and field operations design.',
      linkedin: 'https://www.linkedin.com/in/jeremiah-johnson-84010985/',
    },
    {
      name: 'Garrett Jorewicz',
      title: 'Co-Founder',
      credentials:
        'Founder/operator focused on strategy, partnerships, and execution across floorplan finance, risk, and product commercialization.',
      linkedin: 'https://www.linkedin.com/in/gjorewicz/',
    },
  ];

  const partners = [
    {
      name: 'Randall Campbell',
      title: 'Head of Product – Crypto / Digital Assets, AcquireX',
      credentials:
        'Product leader focused on compliant digital asset infrastructure, crypto market structure, and institutional-grade blockchain systems. Background across fintech, enterprise software, and regulated financial technology.',
      linkedin: 'https://www.linkedin.com/in/randallcampbell/',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-14 px-6">
        <div className="max-w-[1160px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Team</h1>
          <p className="text-lg text-[#C9CDD3] max-w-3xl mx-auto">
            ANVL is built by a small team focused on institutional-grade verification,
            risk controls, and workflow-aligned infrastructure for floorplan lenders.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="pb-16 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#AAB1B9]">{member.title}</p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-[#AAB1B9] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>

                <p className="text-[#C9CDD3] leading-relaxed">
                  {member.credentials}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="pb-20 px-6 border-t border-white/10">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Strategic Partners
            </h2>
            <p className="text-lg text-[#C9CDD3] max-w-3xl mx-auto">
              ANVL collaborates with experienced operators and technology leaders
              across fintech and digital asset infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-[#AAB1B9]">{partner.title}</p>
                  </div>

                  <a
                    href={partner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.name} on LinkedIn`}
                    className="text-[#AAB1B9] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>

                <p className="text-[#C9CDD3] leading-relaxed">
                  {partner.credentials}
                </p>
              </div>
            ))}
          </div>

          {/* Optional CTA */}
          <div className="mt-14 text-center">
            <p className="text-sm text-[#AAB1B9] mb-4">
              For lender demos, partner conversations, or investor materials:
            </p>
            <Link href="/contact" className="text-[#E4312D] hover:underline">
              Contact ANVL →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}