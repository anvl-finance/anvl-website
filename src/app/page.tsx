'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Info } from 'lucide-react';
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
import Link from 'next/link';
import { toast } from 'sonner';

type Variant = 'dealers' | 'investors';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>('dealers');
  const [calcOpen, setCalcOpen] = useState(false);
  
  // Calculator state
  const [exposure, setExposure] = useState(2580000);
  const [aprReductionBps, setAprReductionBps] = useState(120);
  const [vehiclesOnFloor, setVehiclesOnFloor] = useState(120);
  const [deltaTurns, setDeltaTurns] = useState(0.2);
  const [avgGrossPerVehicle, setAvgGrossPerVehicle] = useState(1800);

  // Form state
  const [dealerForm, setDealerForm] = useState({
    company: '',
    dba: '',
    contactName: '',
    email: '',
    phone: '',
    storeCount: '',
    avgMonthlySales: '',
    dmsName: '',
    bankName: '',
    consent: false
  });

  const [investorForm, setInvestorForm] = useState({
    firmName: '',
    role: '',
    email: '',
    aumBracket: '',
    jurisdiction: '',
    accredited: false,
    message: ''
  });

  // Check URL for variant
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'investors') {
      setVariant('investors');
    }
  }, []);

  const toggleVariant = (newVariant: Variant) => {
    setVariant(newVariant);
    const url = new URL(window.location.href);
    if (newVariant === 'investors') {
      url.searchParams.set('view', 'investors');
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', url);
  };

  const calculateImpact = () => {
    const interestSavings = (exposure * (aprReductionBps / 10000)) / 12;
    const grossLift = deltaTurns * vehiclesOnFloor * avgGrossPerVehicle;
    return {
      interestSavings: Math.round(interestSavings),
      grossLift: Math.round(grossLift)
    };
  };

  const handleDealerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerForm.consent) {
      toast.error('Please acknowledge the privacy policy');
      return;
    }
    toast.success('Demo request submitted! We\'ll contact you within 24 hours.');
    setDealerForm({
      company: '',
      dba: '',
      contactName: '',
      email: '',
      phone: '',
      storeCount: '',
      avgMonthlySales: '',
      dmsName: '',
      bankName: '',
      consent: false
    });
  };

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorForm.accredited) {
      toast.error('Please confirm accredited investor status');
      return;
    }
    toast.success('Request submitted! We\'ll send the underwriting memo within 48 hours.');
    setInvestorForm({
      firmName: '',
      role: '',
      email: '',
      aumBracket: '',
      jurisdiction: '',
      accredited: false,
      message: ''
    });
  };

  const impact = calculateImpact();

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A] border-b border-white/10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-white">
              ANVL<span className="text-[#E4312D]">.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => toggleVariant('dealers')}
                className={`text-sm font-medium transition-colors ${
                  variant === 'dealers' ? 'text-white' : 'text-[#AAB1B9] hover:text-white'
                }`}
              >
                For Dealers
              </button>
              <button
                onClick={() => toggleVariant('investors')}
                className={`text-sm font-medium transition-colors ${
                  variant === 'investors' ? 'text-white' : 'text-[#AAB1B9] hover:text-white'
                }`}
              >
                For Investors
              </button>
              <Link href="#" className="text-sm font-medium text-[#AAB1B9] hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium text-[#AAB1B9] hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/contact">
                <Button size="sm" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                  Contact
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0D1B2A]">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => {
                  toggleVariant('dealers');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium ${
                  variant === 'dealers' ? 'text-white' : 'text-[#AAB1B9]'
                }`}
              >
                For Dealers
              </button>
              <button
                onClick={() => {
                  toggleVariant('investors');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium ${
                  variant === 'investors' ? 'text-white' : 'text-[#AAB1B9]'
                }`}
              >
                For Investors
              </button>
              <Link href="#" className="block text-sm font-medium text-[#AAB1B9]" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="#" className="block text-sm font-medium text-[#AAB1B9]" onClick={() => setMobileMenuOpen(false)}>
                Docs
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[1.1]">
              Floorplan Financing, Simplified.
            </h1>
            <p className="text-lg sm:text-xl text-[#C9CDD3] mb-12 leading-relaxed max-w-3xl mx-auto">
              AI-verified collateral with cryptographic NFC proof-of-presence. Faster turns and cleaner audit trails without changing your banking, titles, or DMS.
            </p>

            {/* KPI Strip */}
            <TooltipProvider>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 cursor-help">
                      <div className="text-2xl font-semibold text-white mb-1">35–40 days</div>
                      <div className="text-sm text-[#AAB1B9] flex items-center justify-center gap-1">
                        Avg loan cycle
                        <Info className="h-3 w-3" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Short tenor lowers liquidity risk and speeds cash cycles.</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 cursor-help">
                      <div className="text-2xl font-semibold text-white mb-1">16–18%</div>
                      <div className="text-sm text-[#AAB1B9] flex items-center justify-center gap-1">
                        Dealer APR bands
                        <Info className="h-3 w-3" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Illustrative program ranges; subject to credit box and cohort.</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 cursor-help">
                      <div className="text-2xl font-semibold text-white mb-1">8–10%</div>
                      <div className="text-sm text-[#AAB1B9] flex items-center justify-center gap-1">
                        Program net margin
                        <Info className="h-3 w-3" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Post cost-of-funds and ops; cohort-level variance applies.</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 cursor-help">
                      <div className="text-2xl font-semibold text-white mb-1">≈ 9.7× / year</div>
                      <div className="text-sm text-[#AAB1B9] flex items-center justify-center gap-1">
                        Capital turnover
                        <Info className="h-3 w-3" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Based on short-cycle draws and continuous repayments.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <a href="#dealer-form">
                <Button size="lg" className="bg-[#0D1B2A] hover:bg-[#1a2b3f] text-white px-8">
                  Start financing inventory
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button
                size="lg"
                className="bg-[#0D1B2A] hover:bg-[#1a2b3f] text-white px-8"
                onClick={() => toggleVariant('investors')}
              >
                View investor program
              </Button>
            </div>

            <p className="text-xs text-[#AAB1B9] mt-4">
              Illustrative program metrics; actual results vary by dealer cohort, pool performance, and market conditions. Not an offer of credit or securities.
            </p>
          </div>
        </div>
      </section>

      {/* Variant-Specific Content */}
      {variant === 'dealers' ? (
        <>
          {/* How It Works - Dealers */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-[#C9CDD3] max-w-3xl mx-auto">
                  Acquire inventory as usual. Tap the NFC tag once to prove the car is on your lot. Finance, sell, and pay down on a clean monthly schedule—while ANVL handles verification and exception routing in the background.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <div className="w-12 h-12 bg-[#E4312D] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Vehicle Financing/Acquisition</h3>
                  <p className="text-[#C9CDD3] mb-4">
                    Acquire units as usual via auction, trade, or wholesale. Add the vehicle in ANVL: VIN decode, mileage, photos, title status. ANVL assigns a cryptographic NFC tag unique to the unit.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <div className="w-12 h-12 bg-[#E4312D] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Tap-to-Verify</h3>
                  <p className="text-[#C9CDD3] mb-4">
                    Apply the tag to the windshield. Tap once in the ANVL app. The tag signs a one-time challenge; ANVL verifies signature, counter, and location sanity; the collateral record is updated.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <div className="w-12 h-12 bg-[#E4312D] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Finance, Sell, Pay Down</h3>
                  <p className="text-[#C9CDD3] mb-4">
                    Draw on your line, retail or wholesale the unit, and pay down. Titles and exceptions reconcile faster because taps generate machine-readable evidence.
                  </p>
                </div>
              </div>

              {/* Micro FAQ */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-sm font-semibold text-white mb-2">How often do we scan?</p>
                  <p className="text-sm text-[#AAB1B9]">Weekly recommended; missed scans trigger reminders and exception review.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-sm font-semibold text-white mb-2">What if a tag is damaged?</p>
                  <p className="text-sm text-[#AAB1B9]">Replace in minutes; the proof history remains intact.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-sm font-semibold text-white mb-2">Does this change our auction process?</p>
                  <p className="text-sm text-[#AAB1B9]">No. Add the unit and tag it after transport.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Value Tiles - Dealers */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Lower hassle</h3>
                  <p className="text-[#C9CDD3]">
                    Fewer surprise curtailments. Exception queues shrink because proofs are self-evident.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Faster turns</h3>
                  <p className="text-[#C9CDD3]">
                    Less audit staging; more time for recon and retail.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Bigger usable line</h3>
                  <p className="text-[#C9CDD3]">
                    Verified collateral supports higher credit availability without extra paperwork.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Zero rip-and-replace</h3>
                  <p className="text-[#C9CDD3]">
                    Keep your DMS, banks, title agents; ANVL is a thin verification layer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Math - Dealers */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Impact on Your Bottom Line
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Interest savings</h3>
                  <p className="text-[#C9CDD3] mb-4">
                    Example: exposure $2.58M × 1.2% ÷ 12 ≈ <span className="text-white font-semibold">${impact.interestSavings.toLocaleString()}/month</span>
                  </p>
                  <p className="text-sm text-[#AAB1B9]">
                    Formula: exposure × rate_reduction_apr ÷ 12
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Gross lift from speed</h3>
                  <p className="text-[#C9CDD3] mb-4">
                    Example: 0.2 × 120 × $1,800 = <span className="text-white font-semibold">${impact.grossLift.toLocaleString()}/month</span>
                  </p>
                  <p className="text-sm text-[#AAB1B9]">
                    Formula: Δturns × vehicles_on_floor × dealer_gross_per_vehicle
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#1a2f4a] hover:bg-[#0D1B2A] text-white border-0">
                      Calculate Your Impact
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0D1B2A] border-white/20 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Impact Calculator</DialogTitle>
                      <DialogDescription className="text-[#AAB1B9]">
                        Adjust the values to see your potential savings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="exposure" className="text-white">Exposure ($)</Label>
                        <Input
                          id="exposure"
                          type="number"
                          value={exposure}
                          onChange={(e) => setExposure(Number(e.target.value))}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="aprReduction" className="text-white">APR Reduction (bps)</Label>
                        <Input
                          id="aprReduction"
                          type="number"
                          value={aprReductionBps}
                          onChange={(e) => setAprReductionBps(Number(e.target.value))}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicles" className="text-white">Vehicles on Floor</Label>
                        <Input
                          id="vehicles"
                          type="number"
                          value={vehiclesOnFloor}
                          onChange={(e) => setVehiclesOnFloor(Number(e.target.value))}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="deltaTurns" className="text-white">Delta Turns</Label>
                        <Input
                          id="deltaTurns"
                          type="number"
                          step="0.1"
                          value={deltaTurns}
                          onChange={(e) => setDeltaTurns(Number(e.target.value))}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="avgGross" className="text-white">Avg Gross per Vehicle ($)</Label>
                        <Input
                          id="avgGross"
                          type="number"
                          value={avgGrossPerVehicle}
                          onChange={(e) => setAvgGrossPerVehicle(Number(e.target.value))}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-[#AAB1B9] mb-1">Interest Savings</p>
                            <p className="text-2xl font-semibold text-white">${impact.interestSavings.toLocaleString()}/mo</p>
                          </div>
                          <div>
                            <p className="text-sm text-[#AAB1B9] mb-1">Gross Lift</p>
                            <p className="text-2xl font-semibold text-white">${impact.grossLift.toLocaleString()}/mo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>

          {/* Dealer Onboarding */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Simple Onboarding
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {[
                  'Create account',
                  'Connect bank (ACH)',
                  'Add users',
                  'Receive NFC tags',
                  'Tag active units',
                  'First scan',
                  'Go live'
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="text-lg font-semibold text-white mb-2">{i + 1}</div>
                    <div className="text-sm text-[#C9CDD3]">{step}</div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-[#AAB1B9] mt-6">
                Note: No crypto wallet required. Entire workflow is fiat-native.
              </p>
            </div>
          </section>

          {/* Dealer Tools */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Dealer Tools
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Lot view with verified status and tag counters',
                  'Consolidated monthly payoff',
                  'Compliance timeline with C/NC status',
                  'Exception center with one-tap rescan requests',
                  'Rewards summary where applicable'
                ].map((tool, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <p className="text-[#C9CDD3]">{tool}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <p className="text-lg text-[#C9CDD3] mb-4">
                    "Scanning beats staging. My team spends less time on audits and more on retail."
                  </p>
                  <p className="text-sm text-[#AAB1B9]">— Regional Dealer Principal</p>
                </div>
                <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                  <p className="text-lg text-[#C9CDD3] mb-4">
                    "We raised our line after 90 days of clean verifications."
                  </p>
                  <p className="text-sm text-[#AAB1B9]">— Multi-store Operator</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dealer Form */}
          <section id="dealer-form" className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Ready to move inventory faster?
                </h2>
              </div>

              <form onSubmit={handleDealerSubmit} className="bg-white/5 rounded-lg p-8 border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-white">Company *</Label>
                    <Input
                      id="company"
                      required
                      value={dealerForm.company}
                      onChange={(e) => setDealerForm({...dealerForm, company: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dba" className="text-white">DBA</Label>
                    <Input
                      id="dba"
                      value={dealerForm.dba}
                      onChange={(e) => setDealerForm({...dealerForm, dba: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-white">Contact Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={dealerForm.contactName}
                      onChange={(e) => setDealerForm({...dealerForm, contactName: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={dealerForm.email}
                      onChange={(e) => setDealerForm({...dealerForm, email: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={dealerForm.phone}
                      onChange={(e) => setDealerForm({...dealerForm, phone: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeCount" className="text-white">Store Count *</Label>
                    <Input
                      id="storeCount"
                      type="number"
                      required
                      value={dealerForm.storeCount}
                      onChange={(e) => setDealerForm({...dealerForm, storeCount: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="avgMonthlySales" className="text-white">Avg Monthly Sales *</Label>
                    <Input
                      id="avgMonthlySales"
                      type="number"
                      required
                      value={dealerForm.avgMonthlySales}
                      onChange={(e) => setDealerForm({...dealerForm, avgMonthlySales: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dmsName" className="text-white">DMS Name</Label>
                    <Input
                      id="dmsName"
                      value={dealerForm.dmsName}
                      onChange={(e) => setDealerForm({...dealerForm, dmsName: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bankName" className="text-white">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={dealerForm.bankName}
                    onChange={(e) => setDealerForm({...dealerForm, bankName: e.target.value})}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={dealerForm.consent}
                    onCheckedChange={(checked) => setDealerForm({...dealerForm, consent: checked as boolean})}
                    className="border-white/20"
                  />
                  <label htmlFor="consent" className="text-sm text-[#C9CDD3] leading-tight">
                    I acknowledge the privacy policy and consent to be contacted by ANVL Finance.
                  </label>
                </div>

                <Button type="submit" className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                  Start financing inventory
                </Button>
              </form>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Investor Program Overview */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Program Overview
                </h2>
                <p className="text-lg text-[#C9CDD3] max-w-3xl mx-auto">
                  Short-tenor, over-collateralized, AI-verified dealer credit secured by real vehicles with cryptographic proof-of-presence and permissioned liquidity.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-8 border border-white/10">
                <p className="text-lg text-[#C9CDD3] mb-6">
                  ANVL originates and services short-tenor dealer credit secured by real vehicles. Each unit carries a cryptographic NFC tag; a single tap produces a signed, counter-verified proof that updates the on-chain collateral record. The result is continuously verified collateral, faster exception clearing, and measurable loss-tail compression. Cash flows are fiat-native; auditability and policy controls live on chain (VARA/GEAR). Program revenue is a small number of basis points on financed throughput, distributed via a documented waterfall to dividends, buybacks, and treasury.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E4312D] mt-1">•</span>
                    <span className="text-[#C9CDD3]">Average tenor: 35–40 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E4312D] mt-1">•</span>
                    <span className="text-[#C9CDD3]">Capital turnover target: ≈ 9.7× per year</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E4312D] mt-1">•</span>
                    <span className="text-[#C9CDD3]">Program net margin target: 8–10%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E4312D] mt-1">•</span>
                    <span className="text-[#C9CDD3]">Settlement: fiat (ACH in/out); token rails for auditability and governance</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Business Model */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Business Model and Cash Flows
                </h2>
                <p className="text-lg text-[#C9CDD3] max-w-3xl mx-auto">
                  ANVL earns small bps on financed throughput via origination, servicing, and risk-tech fees. Net revenue flows through a documented waterfall to Dividends, Buybacks/Burns, and Treasury with staged payout increases as operations mature.
                </p>
              </div>
            </div>
          </section>

          {/* Fee Chart - Investors Only */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Revenue Model
                </h2>
              </div>

              <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Revenue</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Stream</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Allocation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="px-6 py-4 text-sm text-white">Loan Origination</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">0.5–1.0% of principal</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Underwriting/onboarding</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Treasury + Dividends</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-white">Servicing</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">0.25–0.5% annualized</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Monitoring/reporting</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Treasury</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-white">Risk-Tech</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">0.10–0.25%</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">AI scoring / verification</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Insurance/Risk Fund</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-white">Dealer Incentives</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">&lt;1.0%</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Scan and payoff discipline</td>
                        <td className="px-6 py-4 text-sm text-[#C9CDD3]">Rewards Pool</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-sm text-[#AAB1B9] mt-6 text-center">
                Policy note: Illustrative; subject to definitive docs. Waterfall target 40% Dividends, 10% Buybacks/Burns, 50% Treasury (adjustable by policy guardrails).
              </p>
            </div>
          </section>

          {/* Risk Controls */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Risk Controls
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Loss assumptions</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    Base case reflects verified collateral and short tenors; show sensitivity bands and confidence intervals in the pool dashboard.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Delinquency/default handling</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    Missed scans escalate to exception workflow; status can force pay-down, unit pull, or repo per credit box.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Recovery mechanics</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    NFC tag + chain-of-evidence links physical unit to lien/NFT record; custody procedures define evidence continuity.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">AI-verification accuracy</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    NTAG424 DNA with AES-128 challenge-response; gateway enforces signature validity, monotone counters, GPS sanity.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Concentration limits</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    Per dealer, region, vehicle segment; dynamic throttles tied to scan health and exception history.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Liquidity management</h3>
                  <p className="text-sm text-[#C9CDD3]">
                    Rolling short maturities, cash buffers, side pockets, redemption gates if needed, and T-bill sweep for idle cash.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Institutional Build Blocks */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Institutional Build Blocks
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Underwriting memo set', desc: 'Credit box, verification workflow, exception policy, repo triggers' },
                  { title: 'AI model governance', desc: 'Versioning, feature logs, challenger/champion, backtests, 3rd-party audits' },
                  { title: 'NFC custody & chain-of-evidence', desc: 'Per-tag keys, SAM/KMS, tamper-evident labels, event hashing' },
                  { title: 'Cash management controls', desc: 'ACH in/out, daily recs, dual-control approvals, exception ledger' },
                  { title: 'Pool statistics', desc: 'Historical and pro-forma with CI bands; stress paths on loss and liquidity' },
                  { title: 'Capital stack & waterfall', desc: 'Senior/Mezz/Equity options; triggers, caps, and guardrails' },
                  { title: 'Offering docs', desc: 'Reg D/S PPM, subscription docs, risk factors, reporting cadence' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-[#C9CDD3]">{item.desc}</p>
                    <Button variant="link" className="text-[#E4312D] p-0 h-auto mt-2">
                      Download →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology at a Glance */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Technology at a Glance
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-[#C9CDD3]">
                    Hybrid architecture: enforcement/auditability on chain; identity, KYB/KYC, and fiat settlement off chain.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-[#C9CDD3]">
                    NFC proof-of-presence: per-tag AES-128, monotone counters, signed URLs.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-[#C9CDD3]">
                    AI risk layer: telemetry from scan cadence, geo-sanity, time-of-day patterns.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-[#C9CDD3]">
                    Observability: on-chain events + off-chain BI; exportable audit packs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Program KPIs */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-[1160px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Program KPIs
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Scan compliance rate', desc: 'Verified scans / expected scans per period' },
                  { label: 'Exception cycle time', desc: 'Open → resolved' },
                  { label: 'Pool loss rate (12-mo)', desc: 'Net losses / average outstanding' },
                  { label: 'Liquidity coverage ratio (LCR)', desc: 'Liquid assets / 30-day net outflows' },
                  { label: 'Turn velocity', desc: 'Completed cycles per year (actual vs target)' }
                ].map((kpi, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">{kpi.label}</h3>
                    <p className="text-sm text-[#C9CDD3]">{kpi.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Investor Form */}
          <section className="py-20 px-6 bg-[#0D1B2A]">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                  Bridge capital into verified, short-tenor, asset-backed credit
                </h2>
              </div>

              <form onSubmit={handleInvestorSubmit} className="bg-white/5 rounded-lg p-8 border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firmName" className="text-white">Firm Name *</Label>
                    <Input
                      id="firmName"
                      required
                      value={investorForm.firmName}
                      onChange={(e) => setInvestorForm({...investorForm, firmName: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-white">Role *</Label>
                    <Input
                      id="role"
                      required
                      value={investorForm.role}
                      onChange={(e) => setInvestorForm({...investorForm, role: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="investorEmail" className="text-white">Email *</Label>
                    <Input
                      id="investorEmail"
                      type="email"
                      required
                      value={investorForm.email}
                      onChange={(e) => setInvestorForm({...investorForm, email: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aumBracket" className="text-white">AUM Bracket *</Label>
                    <Input
                      id="aumBracket"
                      required
                      placeholder="e.g., $10M-$50M"
                      value={investorForm.aumBracket}
                      onChange={(e) => setInvestorForm({...investorForm, aumBracket: e.target.value})}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="jurisdiction" className="text-white">Jurisdiction *</Label>
                  <Input
                    id="jurisdiction"
                    required
                    placeholder="e.g., Delaware, Cayman Islands"
                    value={investorForm.jurisdiction}
                    onChange={(e) => setInvestorForm({...investorForm, jurisdiction: e.target.value})}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="investorMessage" className="text-white">Message</Label>
                  <textarea
                    id="investorMessage"
                    rows={4}
                    value={investorForm.message}
                    onChange={(e) => setInvestorForm({...investorForm, message: e.target.value})}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="accredited"
                    checked={investorForm.accredited}
                    onCheckedChange={(checked) => setInvestorForm({...investorForm, accredited: checked as boolean})}
                    className="border-white/20"
                  />
                  <label htmlFor="accredited" className="text-sm text-[#C9CDD3] leading-tight">
                    I confirm accredited investor status and acknowledge this is not an offer of securities.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1 bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                    Request underwriting memo
                  </Button>
                  <Button type="button" className="flex-1 bg-[#1a2f4a] hover:bg-[#0D1B2A] text-white">
                    View tokenomics
                  </Button>
                </div>
              </form>

              <p className="text-xs text-[#AAB1B9] mt-6 text-center">
                This page is informational and not an offer to sell or the solicitation of an offer to buy any security. Offers are made only through definitive documents under applicable exemptions (e.g., Reg D/S). Targets are illustrative and not guarantees.
              </p>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#0D1B2A] border-t border-white/10 py-12 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/" className="hover:text-white transition-colors">Overview</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Dealer Onboarding</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Investor Access</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Disclosures</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-[#AAB1B9]">
            <p className="mb-2">Copyright © ANVL Finance LLC. All rights reserved.</p>
            <p>
              Information is illustrative and not a commitment to lend. Investor content is not an offer of securities; any offer is made solely through definitive documents under applicable exemptions (e.g., Reg D/S).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}