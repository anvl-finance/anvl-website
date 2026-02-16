'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = { label: string; href: string };

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const nav: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'For Investors', href: '/investors' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Team', href: '/team' },
    { label: 'FAQ', href: '/faq' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const linkClass = (active: boolean) =>
    active
      ? 'text-sm text-white'
      : 'text-sm text-[#AAB1B9] hover:text-white transition-colors';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-white/10">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
                src="/anvl-logo.svg"
                alt="ANVL Logo"
                width={140}
                height={40}
                priority
            />
          </Link>
          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={linkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href="/contact">
              <Button
                size="sm"
                className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white"
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D1B2A]">
          <div className="px-6 py-4 space-y-3">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    active
                      ? 'block text-sm font-medium text-white'
                      : 'block text-sm font-medium text-[#AAB1B9]'
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white"
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}