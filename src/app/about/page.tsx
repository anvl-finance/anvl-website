'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link href="/about" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/whitepaper" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">
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
              <Link href="/about" className="block text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/whitepaper" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
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
            About ANVL Finance
          </h1>
          <p className="text-lg text-white/90">
            Building the future of transparent, verifiable dealer financing
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ANVL Finance was founded to bring transparency and efficiency to one of the least digitized segments of credit: independent dealer floorplan financing. Our mission is to create real-time, verifiable financing infrastructure that aligns lenders, investors, and dealers on a single source of truth.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that every physical asset should be verifiable instantly and financed programmatically, creating a more efficient and transparent financial system for all stakeholders.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            A world where physical assets can be verified instantly and financed programmatically. We envision a future where the gap between traditional finance and digital innovation is bridged through transparent, compliant, and efficient infrastructure.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Integrity</h3>
              <p className="text-gray-600">We operate with the highest ethical standards, ensuring trust and reliability in every interaction.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Transparency</h3>
              <p className="text-gray-600">We believe in open, honest communication and verifiable data at every level of our platform.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Innovation</h3>
              <p className="text-gray-600">We continuously push the boundaries of what's possible in fintech and asset verification.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Compliance</h3>
              <p className="text-gray-600">We prioritize regulatory adherence and build systems that meet the highest compliance standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Approach</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ANVL blends financial expertise with advanced verification technology to deliver compliant digital credit solutions. We understand that the automotive financing industry requires both innovation and stability.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our approach combines cryptographic asset tagging, real-time verification, and institutional-grade reporting to create a financing ecosystem that serves dealers, investors, and regulators equally well.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">History and Context</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2025 and registered in Wyoming, USA, ANVL Finance emerged from a deep understanding of the challenges facing independent auto dealers and the institutional investors seeking transparent, asset-backed opportunities. Our founding team recognized that the $14.5 billion floorplan financing market was ripe for modernization through verifiable digital infrastructure.
          </p>
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