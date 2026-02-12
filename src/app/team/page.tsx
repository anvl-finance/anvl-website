'use client';

import { Linkedin } from 'lucide-react';
import Link from 'next/link';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';

export default function TeamPage() {
  const founders = [
    {
      name: 'Ben Schwarz',
      title: 'Co-Founder',
      credentials:
        'Fintech and credit-market operator focused on institutional distribution, capital markets, and structured finance strategy across private credit.',
      linkedin: 'https://www.linkedin.com/in/ben-schwarz-029b40a1/',
    },
    {
      name: 'David Nichamoff',
      title: 'Co-Founder',
      credentials:
        'CTO and systems architect focused on verification infrastructure, data pipelines, and scalable fintech platforms bridging traditional workflows with cryptographic auditability.',
      linkedin: 'https://www.linkedin.com/in/dnichamoff/',
    },
    {
      name: 'Jeremiah Johnson',
      title: 'Co-Founder',
      credentials:
        'Go-to-market and operations leader with deep experience in dealer workflows and partner execution. Focused on rollout, onboarding, and operational scalability.',
      linkedin: 'https://www.linkedin.com/in/jeremiah-johnson-84010985/',
    },
    {
      name: 'Garrett Jorewicz',
      title: 'Co-Founder',
      credentials:
        'Founder and operator focused on strategy, partnerships, and execution across floorplan finance, risk management, and product commercialization.',
      linkedin: 'https://www.linkedin.com/in/gjorewicz/',
    },
  ];

  const advisors = [
    {
      name: 'Randall Campbell',
      title: 'Strategic Advisor',
      credentials:
        'Head of Product – Digital Assets at AcquireX. Advisor on compliant digital asset infrastructure, crypto market structure, and institutional blockchain integration.',
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
            ANVL is built by operators with experience across floorplan finance,
            structured credit, fintech infrastructure, and institutional digital assets.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="pb-16 px-6">
        <div className="max-w-[1160px] mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Founders</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founders.map((member) => (
              <div
                key={member.name}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-[#AAB1B9]">{member.title}</p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AAB1B9] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
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

      {/* Advisors */}
      <section className="pb-16 px-6 border-t border-white/10">
        <div className="max-w-[1160px] mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Advisors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisors.map((member) => (
              <div
                key={member.name}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-[#AAB1B9]">{member.title}</p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AAB1B9] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
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

  {/* Backed By */}
  <section className="pb-20 px-6 border-t border-white/10">
    <div className="max-w-[1160px] mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-8">Backed By</h2>

      <div className="flex flex-col items-center justify-center gap-6">
        <a
          href="https://gear-tech.io/gear-foundation"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.08] transition-all">
            <img
              src="/gear-logo.jpg"
              alt="Gear Foundation"
              className="h-16 w-auto mx-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </a>

        <p className="text-[#C9CDD3] max-w-2xl">
          ANVL is supported by the Gear Foundation, which has provided
          development resources and ecosystem backing to accelerate
          infrastructure buildout.
        </p>
      </div>
    </div>
  </section>

      <SiteFooter />
    </div>
  );
}