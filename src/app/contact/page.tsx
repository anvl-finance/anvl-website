'use client';

import { useState } from 'react';
import { Menu, X, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    interest: '',
    message: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast.error('Please accept the privacy policy');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you! We\'ll be in touch soon.');
      setFormData({
        fullName: '',
        email: '',
        company: '',
        role: '',
        interest: '',
        message: '',
        privacyAccepted: false
      });
      setIsSubmitting(false);
    }, 1000);
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
              <Link href="/about" className="block text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
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
            Get in Touch
          </h1>
          <p className="text-lg text-white/90">
            Request a demo or partnership discussion
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="interest">Interest *</Label>
                <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dealer">Dealer</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, privacyAccepted: checked as boolean })}
                />
                <Label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
                  I acknowledge the privacy policy and consent to the processing of my personal data.
                </Label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Alternate Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Mail className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <a href="mailto:investors@anvl.finance" className="text-accent hover:underline">
                investors@anvl.finance
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Globe className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Website</h3>
              <a href="https://www.anvl.finance" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                www.anvl.finance
              </a>
            </div>
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