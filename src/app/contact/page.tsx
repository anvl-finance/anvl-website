'use client';

import SiteHeader from '@/components/custom/SiteHeader';
import SiteFooter from '@/components/custom/SiteFooter';
import { useState } from 'react';
import { Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function ContactPage() {
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

    setTimeout(() => {
      toast.success("Thank you. We'll be in touch shortly.");
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
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Request a Conversation</h1>
          <p className="text-lg text-[#C9CDD3]">
            For floorplan lenders, capital partners, and institutional investors.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-[#C9CDD3]">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#C9CDD3]">
                  Work Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-[#C9CDD3]">
                  Company
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-[#C9CDD3]">
                  Role
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="interest" className="text-[#C9CDD3]">
                  Primary Interest *
                </Label>
                <Select
                  value={formData.interest}
                  onValueChange={(value) => setFormData({ ...formData, interest: value })}
                  required
                >
                  <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lender">Floorplan Lender</SelectItem>
                    <SelectItem value="investor">Institutional Investor</SelectItem>
                    <SelectItem value="capital">Capital Partner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-[#C9CDD3]">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, privacyAccepted: checked as boolean })
                  }
                />
                <Label htmlFor="privacy" className="text-sm text-[#AAB1B9] cursor-pointer">
                  I consent to ANVL processing my information in accordance with its privacy policy.
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Alternate Contact */}
      <section className="pb-24 px-6">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
            <Mail className="h-6 w-6 text-[#E4312D] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email</h3>
            <a href="mailto:info@anvl.finance" className="text-[#C9CDD3] hover:text-white">
              info@anvl.finance
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
            <Globe className="h-6 w-6 text-[#E4312D] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Headquarters</h3>
            <p className="text-[#C9CDD3]">Wyoming, USA</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}