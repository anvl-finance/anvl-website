'use client';

import SiteHeader from '@/components/custom/SiteHeader';
import { useState } from 'react';
import Link from 'next/link';

export default function DocumentsAuth({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingCookie, setCheckingCookie] = useState(true);

  // On mount, try to access a protected resource to check if cookie exists
  // We do this by checking if the layout passed auth=true via a hidden element
  // Actually, simpler: just try to render and let the layout handle it

  // If server-side auth check passed, this component won't even render
  // This is the fallback client-side gate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        // Reload to let server-side cookie check take over
        window.location.reload();
      } else {
        const data = await res.json();
        setError(data.error || 'Access denied');
        setPassword('');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#13213E' }}>
      <SiteHeader />
      {/* Auth gate */}
      <div className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md">
          {/* Lock icon */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(228, 49, 45, 0.1)', border: '1px solid rgba(228, 49, 45, 0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E4312D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2" style={{ color: '#F5F5F5' }}>
              Protected Documents
            </h1>
            <p className="text-sm" style={{ color: '#AAB1B9' }}>
              Enter the access code to view ANVL technical documentation.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Access code"
                autoFocus
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: '#0D1B2A',
                  border: error ? '1px solid #E4312D' : '1px solid #1E3154',
                  color: '#F5F5F5',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = '#E4312D';
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = '#1E3154';
                }}
              />
              {error && (
                <p className="mt-2 text-xs" style={{ color: '#E4312D' }}>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: loading || !password ? 'rgba(228, 49, 45, 0.4)' : '#E4312D',
                color: '#FFFFFF',
                cursor: loading || !password ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Verifying...' : 'Access Documents'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: '#6B7A8D' }}>
              Need access?{' '}
              <Link href="/contact" className="underline transition-colors" style={{ color: '#AAB1B9' }}>
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="py-6 text-center text-xs" style={{ color: '#6B7A8D' }}>
        © 2026 ANVL Finance LLC. All Rights Reserved.
      </footer>
    </div>
  );
}
