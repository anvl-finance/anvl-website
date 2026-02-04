'use client';

import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function WhitepaperPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownload = () => {
    toast.success('Whitepaper download will be available soon');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                ANVL
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/whitepaper" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                Whitepaper
              </Link>
              <Link href="/team" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                Team
              </Link>
              <Link href="/roadmap" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                Roadmap
              </Link>
              <Link href="/contact">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Contact
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/whitepaper" className="block text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                Whitepaper
              </Link>
              <Link href="/team" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Team
              </Link>
              <Link href="/roadmap" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Roadmap
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            ANVL Whitepaper
          </h1>
          <p className="text-lg text-white/90">
            Technical and economic documentation for tokenized floorplan financing
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Button size="lg" onClick={handleDownload} className="bg-accent hover:bg-accent/90">
              <Download className="mr-2 h-5 w-5" />
              Download Full Whitepaper
            </Button>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The ANVL whitepaper provides comprehensive technical and economic documentation detailing the transformation of the floorplan financing process into verifiable digital form. This document integrates physical asset verification, continuous auditing, and real-time reporting for lenders and investors.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-primary mb-6">Document Structure</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">1. Introduction</h4>
                <p className="text-gray-600">Overview of the floorplan financing market and the need for modernization through tokenization.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">2. Market Context</h4>
                <p className="text-gray-600">Analysis of the $14.5 billion market opportunity and the challenges facing independent dealers.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">3. Verification Methodology</h4>
                <p className="text-gray-600">Technical details of NFC tagging, cryptographic verification, and real-time asset tracking.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">4. Business Model</h4>
                <p className="text-gray-600">Revenue streams, fee structures, and the complete financing lifecycle from onboarding to repayment.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">5. Cash Flow Policy</h4>
                <p className="text-gray-600">Detailed explanation of revenue waterfall allocation and dividend distribution mechanisms.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">6. Risk Framework</h4>
                <p className="text-gray-600">Comprehensive risk assessment including credit risk, operational risk, and mitigation strategies.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">7. Compliance & Regulatory</h4>
                <p className="text-gray-600">Legal framework, regulatory compliance, and audit trail mechanisms.</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">8. Roadmap</h4>
                <p className="text-gray-600">Quarterly milestones and strategic timeline for platform development and scaling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Real-Time Verification</h3>
              <p className="text-gray-600">Continuous asset monitoring replaces traditional 30-day audit cycles, reducing fraud risk and improving capital efficiency.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Transparent Economics</h3>
              <p className="text-gray-600">Clear fee structures and revenue allocation ensure predictable returns for investors and competitive rates for dealers.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Regulatory Compliance</h3>
              <p className="text-gray-600">Built-in compliance frameworks and immutable audit trails meet institutional and regulatory requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Download the full whitepaper or contact us to discuss how ANVL can transform your financing operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleDownload} className="bg-accent hover:bg-accent/90">
              <Download className="mr-2 h-5 w-5" />
              Download Whitepaper
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Overview</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Dealer Onboarding</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Investor Access</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Disclosures</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 ANVL Finance LLC. All Rights Reserved.</p>
            <p className="mt-2">Company registered in Wyoming, USA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}