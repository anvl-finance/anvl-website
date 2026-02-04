'use client';

import { useState } from 'react';
import { Menu, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RoadmapPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const milestones = [
    {
      year: '2026',
      quarter: 'Q1',
      title: 'Protocol MVP',
      deliverable: 'Vara-based pilot system operational',
      description: 'Launch of pilot lending contracts and verified tagging system with initial dealer partners.',
      status: 'upcoming'
    },
    {
      year: '2026',
      quarter: 'Q2',
      title: 'Dealer Pilots',
      deliverable: 'Active verification with partner dealers',
      description: 'Onboard first 20+ independent dealers with live floorplans and real-time verification.',
      status: 'upcoming'
    },
    {
      year: '2026',
      quarter: 'Q3',
      title: 'Compliance Readiness',
      deliverable: 'Legal and audit certification',
      description: 'Complete third-party audit and readiness for digital securities framework.',
      status: 'upcoming'
    },
    {
      year: '2026',
      quarter: 'Q4',
      title: 'Platform Launch',
      deliverable: 'Marketplace for tokenized floorplan financing',
      description: 'Public rollout of ANVL\'s floorplan financing marketplace with full investor access.',
      status: 'upcoming'
    },
    {
      year: '2027',
      quarter: 'Q1-Q4',
      title: 'Scaling Phase',
      deliverable: 'Expansion, multi-region integrations, institutional partnerships',
      description: 'Regional scaling, strategic partnerships, and enhanced data integrations.',
      status: 'upcoming'
    }
  ];

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
              <Link href="/whitepaper" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                Whitepaper
              </Link>
              <Link href="/team" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
                Team
              </Link>
              <Link href="/roadmap" className="text-sm font-medium text-primary hover:text-accent transition-colors">
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
              <Link href="/whitepaper" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Whitepaper
              </Link>
              <Link href="/team" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Team
              </Link>
              <Link href="/roadmap" className="block text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
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
            Strategic Roadmap to Scale
          </h1>
          <p className="text-lg text-white/90">
            Our path from pilot to platform launch and beyond
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
                )}
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="text-sm font-semibold text-accent mb-1">
                            {milestone.year} {milestone.quarter}
                          </div>
                          <h3 className="text-2xl font-bold text-primary mb-2">{milestone.title}</h3>
                          <p className="text-sm font-medium text-gray-600">{milestone.deliverable}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Measured Growth, Transparent Execution
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            ANVL's roadmap balances regulatory readiness with measured growth, ensuring transparency and stability at every stage. Each milestone is designed to validate our technology, build trust with stakeholders, and scale responsibly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">2026</div>
              <div className="text-sm font-semibold text-gray-600">Foundation Year</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">20+</div>
              <div className="text-sm font-semibold text-gray-600">Initial Dealer Partners</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">2027</div>
              <div className="text-sm font-semibold text-gray-600">Scaling Phase</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're a dealer looking for better financing or an investor seeking transparent opportunities, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                Request a Demo
              </Button>
            </Link>
            <Link href="/whitepaper">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Download Whitepaper
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