'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faqGroups } from '@/content/siteCopy';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [contactEmail, setContactEmail] = useState('');

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return faqGroups;

    return faqGroups
      .map((s) => ({
        ...s,
        questions: s.questions.filter(
          (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.questions.length > 0);
  }, [searchQuery]);

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
    <div className="min-h-screen text-white">
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
                <div key={section.category}>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{section.category}</h2>
                  <div className="space-y-4">
                    {section.questions.map((item, idx) => {
                      const key = `${section.category}-${idx}`;
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
