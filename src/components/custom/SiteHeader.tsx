'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Variant = 'lenders' | 'investors';
type NavItem = { label: string; href: string };

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Read ?view=... on the client only (avoids useSearchParams prerender bailout)
  const [view, setView] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setView(params.get('view'));
  }, [pathname]); // re-read when route changes

  const variant: Variant = view === 'investors' ? 'investors' : 'lenders';

  const nav: NavItem[] = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'For Lenders', href: '/?view=lenders' },
      { label: 'For Investors', href: '/?view=investors' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Team', href: '/team' },
      { label: 'FAQ', href: '/faq' },
    ],
    []
  );

  const isActive = (label: string) => {
    if (label === 'Home') return pathname === '/' && !view;
    if (label === 'For Lenders') return pathname === '/' && variant === 'lenders';
    if (label === 'For Investors') return pathname === '/' && variant === 'investors';
    if (label === 'Roadmap') return pathname === '/roadmap';
    if (label === 'Team') return pathname === '/team';
    if (label === 'FAQ') return pathname === '/faq';
    return false;
  };

  const linkClass = (active: boolean) =>
    active ? 'text-sm text-white' : 'text-sm text-[#AAB1B9] hover:text-white transition-colors';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A] border-b border-white/10">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-white">
            ANVL<span className="text-[#E4312D]">.</span>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {nav.map((item) => {
              const active = isActive(item.label);
              return (
                <Link key={item.label} href={item.href} className={linkClass(active)}>
                  {item.label}
                </Link>
              );
            })}

            <Link href="/contact">
              <Button size="sm" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
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
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D1B2A]">
          <div className="px-6 py-4 space-y-3">
            {nav.map((item) => {
              const active = isActive(item.label);
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
              <Button size="sm" className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}