'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSection = {
  id: string;
  title: string;
  items: FAQItem[];
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [contactEmail, setContactEmail] = useState('');

  const sections: FAQSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      items: [
        {
          question: 'What is ANVL?',
          answer:
            'ANVL is a risk-tech and verification infrastructure layer for floorplan lenders. We provide cryptographic proof-of-presence for collateral, immutable audit trails, and continuous monitoring signals—without replacing your existing LMS, DMS, title workflows, or banking partners.',
        },
        {
          question: 'Who is this for?',
          answer:
            'ANVL is built for institutional floorplan lenders, credit platforms, and capital partners who need better collateral visibility, tighter controls, and audit-grade reporting. We focus on reducing out-of-trust risk, operational drag, and information asymmetry in dealer inventory finance.',
        },
        {
          question: 'Does this replace my LMS?',
          answer:
            'No. ANVL is designed to integrate with your current loan management and audit workflows. We act as a verification and evidence layer—delivering events, exceptions, and reporting via APIs and dashboards, while your LMS remains the system of record for lending operations.',
        },
      ],
    },
    {
      id: 'investors',
      title: 'Investors',
      items: [
        {
          question: 'What do investors get exposure to?',
          answer:
            'Where applicable, investor participation relates to structured credit exposures tied to floorplan activity and collateral verification signals. ANVL’s role is to provide lender-grade monitoring, controls, and reporting that can support diligence and ongoing oversight.',
        },
        {
          question: 'Is this an offer of securities?',
          answer:
            'No. This site is informational only and does not constitute an offer to sell or a solicitation to buy any security. Any offering, if and when it occurs, would be made only through definitive documentation and only to eligible parties under applicable exemptions and compliance requirements.',
        },
      ],
    },
    {
      id: 'risk',
      title: 'Risk & Compliance',
      items: [
        {
          question: 'How is fraud mitigated?',
          answer:
            'ANVL uses layered controls including cryptographic challenge-response verification, replay protection, anomaly detection, and policy-driven exception workflows. These measures are designed to make falsified collateral attestations materially harder and easier to detect within lender operations.',
        },
        {
          question: 'What data is collected?',
          answer:
            'ANVL collects the minimum data required to operate verification and reporting workflows: collateral identifiers (e.g., VIN or internal unit ID), verification event metadata (time, integrity proof, counter), and operational context needed for exceptions and audit artifacts. Access is permissioned and logged; sensitive data is minimized and protected through standard security controls.',
        },
      ],
    },
  ];

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sections;

    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [searchQuery, sections]);

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim()) {
      toast.error('Please enter your email.');
      return;
    }
    toast.success("Thanks — we'll follow up shortly.");
    setContactEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 leading-[1.1]">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#C9CDD3] leading-relaxed">
              A concise set of institutional FAQs about ANVL’s verification layer, investor posture, and risk & compliance approach.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#AAB1B9]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-[#AAB1B9] h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 px-6">
        <div className="max-w-[900px] mx-auto">
          {filteredSections.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[#AAB1B9]">No results found for “{searchQuery}”.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {filteredSections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{section.title}</h2>
                  <div className="space-y-4">
                    {section.items.map((item, idx) => {
                      const key = `${section.id}-${idx}`;
                      const isOpen = expanded.has(key);

                      return (
                        <div key={key} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="text-base sm:text-lg font-medium text-white leading-tight">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 text-[#AAB1B9] mt-1 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-6">
                              <p className="text-[#C9CDD3] leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-[#C9CDD3] mb-6">Send us your email and we’ll respond with the right materials.</p>

            <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Your work email"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-[#AAB1B9]"
                required
              />
              <Button type="submit" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                Contact
              </Button>
            </form>

            <p className="text-sm text-[#AAB1B9] mt-4">
              Or go to{' '}
              <Link href="/contact" className="text-[#E4312D] hover:underline">
                Contact
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="pb-12 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <p className="text-sm text-[#AAB1B9] leading-relaxed">
              <span className="text-white font-semibold">Legal Notice:</span> This page is for informational purposes only and does not
              constitute an offer to sell or a solicitation to buy any security. Any offering, if applicable, is made solely through
              definitive documentation under applicable exemptions and compliance requirements.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}