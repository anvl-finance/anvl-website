'use client';

import { useState } from 'react';
import { Menu, X, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TeamPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const team = [
    {
      name: 'Randall Campbell',
      title: 'Founder & CEO',
      credentials: 'Experienced fintech and blockchain product leader specializing in compliant digital asset infrastructure. Former roles in enterprise software and financial technology.',
      linkedin: '#'
    },
    {
      name: 'Sarah Mitchell',
      title: 'Chief Compliance Officer',
      credentials: 'Former regulatory counsel with 15+ years in financial services compliance. Expert in securities law and digital asset regulation.',
      linkedin: '#'
    },
    {
      name: 'David Chen',
      title: 'Chief Technology Officer',
      credentials: 'Blockchain architect with expertise in cryptographic verification systems. Previously led engineering teams at major fintech companies.',
      linkedin: '#'
    },
    {
      name: 'Maria Rodriguez',
      title: 'Head of Dealer Relations',
      credentials: 'Automotive industry veteran with 20+ years in dealer financing and operations. Deep understanding of independent dealer challenges.',
      linkedin: '#'
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
              <Link href="/team" className="text-sm font-medium text-primary hover:text-accent transition-colors">
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
              <Link href="/whitepaper" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Whitepaper
              </Link>
              <Link href="/team" className="block text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
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
            Leadership & Expertise
          </h1>
          <p className="text-lg text-white/90">
            Meet the team building the future of floorplan financing
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-lg text-accent font-semibold">{member.title}</p>
                  </div>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
                <p className="text-gray-600 leading-relaxed">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Advisory Partners</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            ANVL works with a network of industry experts, regulatory advisors, and technology partners to ensure our platform meets the highest standards of compliance, security, and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">Regulatory Advisors</h3>
              <p className="text-gray-600">Former SEC and FINRA officials providing compliance guidance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">Technology Partners</h3>
              <p className="text-gray-600">Leading blockchain and security infrastructure providers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">Industry Experts</h3>
              <p className="text-gray-600">Automotive finance veterans with decades of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We're always looking for talented individuals who share our vision of transforming the floorplan financing industry.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Get in Touch
            </Button>
          </Link>
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