// app/investors/page.tsx
'use client';

import { useState } from 'react';
import { ChevronRight, Info } from 'lucide-react';
import { toast } from 'sonner';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function InvestorsPage() {
  const [investorForm, setInvestorForm] = useState({
    firmName: '',
    role: '',
    email: '',
    aumBracket: '',
    jurisdiction: '',
    accredited: false,
    message: '',
  });

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorForm.accredited) {
      toast.error('Please confirm accredited investor status.');
      return;
    }
    toast.success("Request submitted! We'll send materials within 48 hours.");
    setInvestorForm({
      firmName: '',
      role: '',
      email: '',
      aumBracket: '',
      jurisdiction: '',
      accredited: false,
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[1.1]">
              Lender-grade verification for capital partners.
            </h1>

            <p className="text-lg sm:text-xl text-[#C9CDD3] mb-10 leading-relaxed max-w-3xl mx-auto">
              ANVL provides cryptographic proof-of-presence, tamper-resistant audit trails, and
              monitoring-grade evidence packs designed to improve diligence, ongoing surveillance, and
              trust between lenders and institutional capital.
            </p>

            {/* KPI Strip */}
            <TooltipProvider>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  {
                    title: 'Diligence',
                    subtitle: 'Evidence packs',
                    tip: 'Structured artifacts for underwriting, disputes, and auditability.',
                  },
                  {
                    title: 'Monitoring',
                    subtitle: 'Continuous signals',
                    tip: 'Event-driven collateral verification replaces periodic blind spots.',
                  },
                  {
                    title: 'Controls',
                    subtitle: 'Exception-ready',
                    tip: 'Anomaly detection + immutable trails support faster escalation paths.',
                  },
                  {
                    title: 'Alignment',
                    subtitle: 'Capital unlock',
                    tip: 'Better verification can support lender risk appetite and cost-of-funds improvement.',
                  },
                ].map((x) => (
                  <Tooltip key={x.title}>
                    <TooltipTrigger asChild>
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 cursor-help">
                        <div className="text-2xl font-semibold text-white mb-1">
                          {x.title}
                        </div>
                        <div className="text-sm text-[#AAB1B9] flex items-center justify-center gap-1">
                          {x.subtitle}
                          <Info className="h-3 w-3" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{x.tip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            <div className="flex justify-center mb-2">
              <a href="#investor-form">
                <Button
                  size="lg"
                  className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white px-8"
                >
                  Request investor materials
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            <p className="text-xs text-[#AAB1B9] mt-6">
              Materials are provided for discussion purposes only and subject to eligibility and
              compliance considerations. Nothing on this site constitutes an offer to sell securities.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                What ANVL enables for capital partners
              </h2>
              <p className="text-lg text-[#C9CDD3] leading-relaxed mb-6">
                Institutional capital wants transparent, repeatable monitoring and clean evidence.
                ANVL is designed to help lenders produce lender-grade verification trails that can
                improve confidence for private credit partners and structured capital programs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Artifacts</p>
                  <p className="text-white font-semibold">Immutable event trails</p>
                </div>
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Coverage</p>
                  <p className="text-white font-semibold">Continuous monitoring</p>
                </div>
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Diligence</p>
                  <p className="text-white font-semibold">Structured evidence packs</p>
                </div>
              </div>

              <div className="mt-8 bg-white/5 rounded-lg p-8 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Typical diligence questions we support
                </h3>
                <ul className="space-y-3 text-[#C9CDD3]">
                  <li>• What is the collateral status right now — and what changed since last check?</li>
                  <li>• How quickly are exceptions detected, escalated, and resolved?</li>
                  <li>• What evidence exists for disputed units and out-of-trust scenarios?</li>
                  <li>• Can we monitor concentration risk by dealer, geography, and asset class?</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">What you’ll receive</h3>
              <ul className="space-y-3 text-[#C9CDD3]">
                <li>• Short memo on the ANVL verification model</li>
                <li>• Sample evidence pack (illustrative)</li>
                <li>• Diligence checklist and integration overview</li>
                <li>• Pilot structure and monitoring/reporting examples</li>
              </ul>

              <div className="mt-8">
                <p className="text-sm text-[#AAB1B9]">
                  We prioritize qualified institutional investors and accredited parties. If you’re a
                  lender looking for product access, visit the Home page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Form */}
      <section id="investor-form" className="py-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                Request investor materials
              </h2>
              <p className="text-lg text-[#C9CDD3]">
                Share a few details and we’ll send the memo and diligence pack.
              </p>
            </div>

            <form
              onSubmit={handleInvestorSubmit}
              className="bg-white/5 rounded-lg p-8 border border-white/10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-[#C9CDD3]">Firm name</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.firmName}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, firmName: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Role</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.role}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, role: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Email</Label>
                  <Input
                    required
                    type="email"
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.email}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">AUM bracket</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.aumBracket}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, aumBracket: e.target.value }))
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-[#C9CDD3]">Jurisdiction</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.jurisdiction}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, jurisdiction: e.target.value }))
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-[#C9CDD3]">Message (optional)</Label>
                  <Input
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={investorForm.message}
                    onChange={(e) =>
                      setInvestorForm((s) => ({ ...s, message: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={investorForm.accredited}
                  onCheckedChange={(v) =>
                    setInvestorForm((s) => ({ ...s, accredited: Boolean(v) }))
                  }
                  className="mt-1"
                />
                <p className="text-sm text-[#AAB1B9]">
                  I confirm I am an accredited investor (or representing an accredited institution)
                  and request diligence materials for discussion purposes.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white"
              >
                Request materials
              </Button>

              <p className="text-xs text-[#AAB1B9]">
                Investor materials are provided upon request and subject to eligibility and
                compliance considerations. Nothing on this site is an offer to sell securities.
              </p>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default InvestorsPage;