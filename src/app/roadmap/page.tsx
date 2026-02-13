'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';
import { Button } from '@/components/ui/button';

export default function RoadmapPage() {
  const milestones = [
    {
      year: '2026',
      quarter: 'Q1',
      title: 'Protocol MVP',
      deliverable: 'Vara-based verification MVP operational',
      description:
        'Core tagging + on-chain commitments + lender dashboard baseline (assets, alerts, audit trail) ready for controlled POC onboarding.',
      status: 'upcoming',
    },
    {
      year: '2026',
      quarter: 'Q2',
      title: 'Lender POC',
      deliverable: 'Controlled POC',
      description:
        'Onboard first lender with check-in, BLE monitoring, exceptions, and lender visibility. Establish KPI baseline and reporting.',
      status: 'upcoming',
    },
    {
      year: '2026',
      quarter: 'Q3',
      title: 'Controls Readiness',
      deliverable: 'Operational controls + auditability hardening',
      description:
        'Standardize evidence packs, exception workflows, reporting, and lender policy alignment. Optional third-party readiness review.',
      status: 'upcoming',
    },
    {
      year: '2026',
      quarter: 'Q4',
      title: 'Lender Pilot',
      deliverable: 'Operational pilot with lender workflows',
      description:
        'Run production pilot with lender(s): verification SLAs, exception handling, audit cadence, and portfolio reporting. Expand dealer coverage and harden reliability.',
      status: 'upcoming',
    },
    {
      year: '2027',
      quarter: 'Q1–Q4',
      title: 'Scaling Phase',
      deliverable: 'Expansion, integrations, regional rollout',
      description:
        'Scale dealer coverage, add integrations, and expand lender adoption as KPIs stabilize. Layer in advanced analytics and automation.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">Roadmap</h1>
            <p className="text-lg text-[#C9CDD3]">
              A measured path from pilots to scale—prioritizing verification, controls, and institutional readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={`${milestone.year}-${milestone.quarter}-${milestone.title}`} className="relative">
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-white/10 hidden md:block" />
                )}

                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Dot */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#E4312D] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-[#E4312D] mb-1">
                          {milestone.year} {milestone.quarter}
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{milestone.title}</h3>
                        <p className="text-sm font-medium text-[#AAB1B9]">{milestone.deliverable}</p>
                      </div>
                      <p className="text-[#C9CDD3] leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Measured growth, transparent execution</h2>
            <p className="text-lg text-[#C9CDD3] leading-relaxed mb-10 max-w-3xl mx-auto">
              The roadmap balances rollout velocity with operational rigor—validating workflows, strengthening controls,
              and expanding coverage as KPIs stabilize.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-semibold text-[#E4312D] mb-2">2026</div>
                <div className="text-sm font-semibold text-[#AAB1B9]">Foundation year</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-semibold text-[#E4312D] mb-2">2+</div>
                <div className="text-sm font-semibold text-[#AAB1B9]">Initial lenders</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-semibold text-[#E4312D] mb-2">2027</div>
                <div className="text-sm font-semibold text-[#AAB1B9]">Scaling phase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-lg p-10 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Request a walkthrough</h2>
            <p className="text-lg text-[#C9CDD3] mb-8 max-w-2xl mx-auto">
              If you’re a floorplan lender looking to strengthen verification and controls, we can outline a pilot plan and KPI
              framework.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white w-full sm:w-auto">
                  Contact
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 w-full sm:w-auto"
                >
                  Back to home
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[#AAB1B9] mt-6">Whitepaper: coming soon.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}