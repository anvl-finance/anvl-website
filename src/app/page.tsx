'use client';

import { useMemo, useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export default function HomePage() {
  // ROI Calculator (Lender-focused)
  const [calcOpen, setCalcOpen] = useState(false);
  const [avgUnitsOnBook, setAvgUnitsOnBook] = useState(15000);
  const [manualAuditCostPerYear, setManualAuditCostPerYear] = useState(5400000);
  const [anvlCostPerAssetPerMonth, setAnvlCostPerAssetPerMonth] = useState(10);
  const [expectedLossAvoidancePct, setExpectedLossAvoidancePct] = useState(25);
  const [baselineLossesPerYear, setBaselineLossesPerYear] = useState(2000000);

  // Lender Form
  const [lenderForm, setLenderForm] = useState({
    institution: '',
    contactName: '',
    role: '',
    email: '',
    phone: '',
    geography: '',
    portfolioSize: '',
    lms: '',
    message: '',
    consent: false,
  });

  const lenderRoi = useMemo(() => {
    const anvlAnnualCost = avgUnitsOnBook * anvlCostPerAssetPerMonth * 12;
    const auditSavings = Math.max(0, manualAuditCostPerYear - anvlAnnualCost);
    const lossAvoidance =
      (baselineLossesPerYear *
        Math.max(0, Math.min(100, expectedLossAvoidancePct))) /
      100;
    const totalBenefit = auditSavings + lossAvoidance;
    return {
      anvlAnnualCost: Math.round(anvlAnnualCost),
      auditSavings: Math.round(auditSavings),
      lossAvoidance: Math.round(lossAvoidance),
      totalBenefit: Math.round(totalBenefit),
    };
  }, [
    avgUnitsOnBook,
    anvlCostPerAssetPerMonth,
    manualAuditCostPerYear,
    baselineLossesPerYear,
    expectedLossAvoidancePct,
  ]);

  const handleLenderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lenderForm.consent) {
      toast.error("Please acknowledge the privacy policy.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lenderForm.contactName,
          email: lenderForm.email,
          message: lenderForm.message,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Request submitted! We'll reach out within 1 business day.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shared header */}
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[1.1]">
              Floorplan risk, verified.
            </h1>
            <p className="text-lg sm:text-xl text-[#C9CDD3] mb-10 leading-relaxed max-w-3xl mx-auto">
              ANVL is a SaaS risk-tech and blockchain infrastructure layer for floorplan lenders:
              cryptographic proof-of-presence, immutable audit trails, and agentic anomaly detection—without replacing
              your LMS, DMS, title workflows, or banking partners.
            </p>

            {/* KPI Strip */}
            <TooltipProvider>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  {
                    title: 'Real-time',
                    subtitle: 'Verification events',
                    tip: 'Continuous, machine-verifiable evidence replaces monthly blind spots.',
                  },
                  {
                    title: 'Lower OOT',
                    subtitle: 'Exposure risk',
                    tip: 'Smart triggers and anomaly detection shorten time-to-detection.',
                  },
                  {
                    title: 'Lender-grade',
                    subtitle: 'Evidence packs',
                    tip: 'Tamper-resistant event trails designed for audit, disputes, and diligence.',
                  },
                  {
                    title: 'Capital unlock',
                    subtitle: 'Cost of funds',
                    tip: 'Stronger verification can expand risk appetite and support new capital partners.',
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

            {/* Primary CTA */}
            <div className="flex justify-center mb-2">
              <a href="#lender-form">
                <Button
                  size="lg"
                  className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white px-8"
                >
                  Request lender demo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            <p className="text-xs text-[#AAB1B9] mt-6">
              Illustrative descriptions; availability and workflows vary by lender policy, jurisdiction, dealer operations, and partner integrations.
              Nothing on this site constitutes an offer of credit or securities.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem / Visibility Gap */}
      <section className="py-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                The visibility gap is a balance sheet problem.
              </h2>
              <p className="text-lg text-[#C9CDD3] leading-relaxed mb-6">
                Floorplan risk is still managed with periodic audits, fragmented dealer reporting, and manual exception handling.
                In the gaps between checks, assets can be double-pledged, moved, or sold out of trust—before controls can respond.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Blind spot</p>
                  <p className="text-white font-semibold">Weeks, not minutes</p>
                </div>
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Evidence</p>
                  <p className="text-white font-semibold">Human, not cryptographic</p>
                </div>
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="text-sm text-[#AAB1B9] mb-1">Controls</p>
                  <p className="text-white font-semibold">Reactive, not continuous</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">
                What lenders want
              </h3>
              <ul className="space-y-3 text-[#C9CDD3]">
                <li>• Real-time collateral status without increasing field overhead</li>
                <li>• Lower out-of-trust loss frequency and severity</li>
                <li>• Clean, auditable evidence for disputes, regulators, and capital partners</li>
                <li>• Integration into existing LMS / audit workflows</li>
              </ul>

              <div className="mt-6">
                <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10">
                      Estimate lender ROI
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0D1B2A] text-white border border-white/10">
                    <DialogHeader>
                      <DialogTitle>ROI Estimator (Illustrative)</DialogTitle>
                      <DialogDescription className="text-[#AAB1B9]">
                        Estimate potential audit savings and loss avoidance. Actual results vary by lender policy, dealer mix, and market conditions.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                      <div>
                        <Label className="text-[#C9CDD3]">Average units on book</Label>
                        <Input
                          className="mt-2 bg-white/5 border-white/10 text-white"
                          type="number"
                          value={avgUnitsOnBook}
                          onChange={(e) => setAvgUnitsOnBook(Number(e.target.value || 0))}
                        />
                      </div>

                      <div>
                        <Label className="text-[#C9CDD3]">Manual audit cost / year</Label>
                        <Input
                          className="mt-2 bg-white/5 border-white/10 text-white"
                          type="number"
                          value={manualAuditCostPerYear}
                          onChange={(e) =>
                            setManualAuditCostPerYear(Number(e.target.value || 0))
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-[#C9CDD3]">ANVL cost per asset / month</Label>
                        <Input
                          className="mt-2 bg-white/5 border-white/10 text-white"
                          type="number"
                          value={anvlCostPerAssetPerMonth}
                          onChange={(e) =>
                            setAnvlCostPerAssetPerMonth(Number(e.target.value || 0))
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-[#C9CDD3]">Baseline losses / year</Label>
                        <Input
                          className="mt-2 bg-white/5 border-white/10 text-white"
                          type="number"
                          value={baselineLossesPerYear}
                          onChange={(e) =>
                            setBaselineLossesPerYear(Number(e.target.value || 0))
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-[#C9CDD3]">Expected loss avoidance (%)</Label>
                        <Input
                          className="mt-2 bg-white/5 border-white/10 text-white"
                          type="number"
                          value={expectedLossAvoidancePct}
                          onChange={(e) =>
                            setExpectedLossAvoidancePct(Number(e.target.value || 0))
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-6 bg-white/5 rounded-lg p-5 border border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#AAB1B9]">Estimated ANVL annual cost</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(lenderRoi.anvlAnnualCost)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#AAB1B9]">Audit savings</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(lenderRoi.auditSavings)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#AAB1B9]">Loss avoidance</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(lenderRoi.lossAvoidance)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#AAB1B9]">Total estimated benefit</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(lenderRoi.totalBenefit)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[#AAB1B9] mt-4">
                        For planning only. This tool does not predict outcomes and should not be used for underwriting decisions.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lender Form */}
      <section id="lender-form" className="py-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                Request a lender demo
              </h2>
              <p className="text-lg text-[#C9CDD3]">
                Tell us a bit about your portfolio and operating model. We’ll follow up with a short walkthrough and pilot plan.
              </p>
            </div>

            <form
              onSubmit={handleLenderSubmit}
              className="bg-white/5 rounded-lg p-8 border border-white/10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-[#C9CDD3]">Institution</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.institution}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, institution: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Contact name</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.contactName}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, contactName: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Role</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.role}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, role: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Email</Label>
                  <Input
                    required
                    type="email"
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.email}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Phone</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.phone}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, phone: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Geography</Label>
                  <Input
                    required
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.geography}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, geography: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Portfolio size (optional)</Label>
                  <Input
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.portfolioSize}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, portfolioSize: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <Label className="text-[#C9CDD3]">Loan management system (optional)</Label>
                  <Input
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.lms}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, lms: e.target.value }))
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="text-[#C9CDD3]">Message (optional)</Label>
                  <Input
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    value={lenderForm.message}
                    onChange={(e) =>
                      setLenderForm((s) => ({ ...s, message: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={lenderForm.consent}
                  onCheckedChange={(v) =>
                    setLenderForm((s) => ({ ...s, consent: Boolean(v) }))
                  }
                  className="mt-1"
                />
                <p className="text-sm text-[#AAB1B9]">
                  I acknowledge the privacy policy and consent to ANVL contacting me about a demo and pilot planning.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white"
              >
                Submit request
              </Button>

              <p className="text-xs text-[#AAB1B9]">
                This form is for product and pilot inquiries only. ANVL does not offer consumer financial products.
              </p>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}