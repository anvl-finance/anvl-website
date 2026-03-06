'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Table of Contents Data ─── */
const tocSections = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'current-state', label: '1. Current State' },
  { id: 'production-requirements', label: '2. Production Requirements' },
  { id: 'gap-analysis', label: '3. Gap Analysis' },
  { id: 'target-architecture', label: '4. Target Architecture' },
  { id: 'development-pipeline', label: '5. Development Pipeline' },
  { id: 'compliance-roadmap', label: '6. Compliance Roadmap' },
  { id: 'integrations', label: '7. Integration Roadmap' },
  { id: 'roles', label: '8. Roles & Responsibilities' },
  { id: 'migration-plan', label: '9. Migration Plan' },
  { id: 'ongoing-process', label: '10. Ongoing Process' },
];

/* ─── Reusable styles ─── */
const S = {
  heading: { color: '#F5F5F5' },
  body: { color: '#C9CDD3', lineHeight: '1.8' },
  muted: { color: '#AAB1B9' },
  dim: { color: '#6B7A8D' },
  accent: { color: '#E4312D' },
  codeBlock: {
    backgroundColor: '#0A1628',
    border: '1px solid #1E3154',
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#C9CDD3',
    overflowX: 'auto' as const,
  },
  callout: {
    backgroundColor: 'rgba(228, 49, 45, 0.06)',
    border: '1px solid rgba(228, 49, 45, 0.15)',
    borderRadius: '8px',
    padding: '20px',
  },
  card: {
    backgroundColor: '#0D1B2A',
    border: '1px solid #1E3154',
    borderRadius: '8px',
    padding: '24px',
  },
};

export default function ProductionReadinessPage() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#13213E' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: '#1E3154', backgroundColor: 'rgba(19, 33, 62, 0.92)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image src="/anvl-logo.svg" alt="ANVL Logo" width={140} height={40} priority />
            </Link>
            <span className="hidden sm:inline text-xs" style={{ color: '#6B7A8D' }}>
              / Documents / Production Readiness
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/documents" className="text-xs" style={{ color: '#AAB1B9' }}>
              ← All Documents
            </Link>
            <button
              className="lg:hidden text-xs px-3 py-1.5 rounded"
              style={{ color: '#AAB1B9', border: '1px solid #1E3154' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 'Close' : 'Contents'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">

        {/* ─── Sidebar TOC (desktop) ─── */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-14 py-8 pl-6 pr-4 max-h-[calc(100vh-56px)] overflow-y-auto">
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#6B7A8D' }}>
              Contents
            </p>
            <ul className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="block w-full text-left text-xs py-1.5 px-3 rounded transition-all duration-150"
                    style={{
                      color: activeSection === id ? '#E4312D' : '#6B7A8D',
                      backgroundColor: activeSection === id ? 'rgba(228, 49, 45, 0.08)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ─── Mobile TOC ─── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" style={{ backgroundColor: 'rgba(13, 27, 42, 0.95)' }}>
            <div className="pt-20 px-6">
              <ul className="space-y-2">
                {tocSections.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="block w-full text-left text-sm py-2"
                      style={{ color: activeSection === id ? '#E4312D' : '#AAB1B9' }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ─── Main Content ─── */}
        <main className="flex-1 min-w-0 py-12 px-4 sm:px-8 lg:px-12 max-w-4xl">

          {/* ─── Title Block ─── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 text-xs" style={S.dim}>
              <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}>
                v1.0
              </span>
              <span>March 2026</span>
              <span>·</span>
              <span>ANVL Finance LLC</span>
              <span>·</span>
              <span>Confidential</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={S.heading}>
              From Prototype to Production
            </h1>
            <p className="text-lg sm:text-xl" style={S.muted}>
              ANVL&apos;s Engineering and Compliance Roadmap for Financial-Grade Infrastructure
            </p>
            <div className="mt-8 h-px" style={{ backgroundColor: '#1E3154' }} />
          </div>

          {/* ─── Abstract ─── */}
          <section id="abstract" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>Abstract</h2>
            <div style={S.callout}>
              <p className="text-sm leading-relaxed" style={S.body}>
                ANVL has built a functional Loan Management System (LMS) and Risk Management System (RMS) in a rapid prototyping environment. The prototype demonstrates core product value: floorplan lending management, vehicle collateral tracking, ACH payment processing, title management, and AI-assisted territory and risk operations. This document defines the structured path from that prototype to a production-grade system appropriate for financial institution customers, one that satisfies SOC 2 Type II audit requirements and the GLBA Safeguards Rule. It covers the current technology stack in detail, the specific gaps between prototype and production, the target infrastructure architecture, the AI-powered development pipeline that bridges the two environments on an ongoing basis, the compliance roadmap, the external integrations required, and the organizational roles needed to execute the transition.
              </p>
            </div>
          </section>

          {/* ─── Section 1: Current State ─── */}
          <section id="current-state" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>1. Current State: The Prototype</h2>

            <p className="text-sm mb-6" style={S.body}>
              ANVL&apos;s prototype is hosted on Replit, a cloud-based development environment designed for rapid iteration. Replit has served its purpose: it allowed the founding team to validate product hypotheses, build a feature-complete demonstration of the platform, and gather domain-expert feedback without requiring a dedicated engineering team. The prototype is not a toy, it is a sophisticated, multi-module application with a production-realistic schema and meaningful business logic. What it lacks is the surrounding infrastructure and controls that financial institution customers require.
            </p>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Technology Stack</h3>
            <div style={S.card} className="mb-6">
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-6 font-semibold" style={S.heading}>Layer</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>Technology</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Frontend', 'React 18, Vite, TypeScript, TailwindCSS, Radix UI, TanStack Query, Recharts, React Leaflet'],
                    ['Backend', 'Node.js, Express 5, TypeScript'],
                    ['ORM', 'Drizzle ORM'],
                    ['Database', 'PostgreSQL (Replit-managed)'],
                    ['Authentication', 'Passport.js (local strategy), express-session, bcrypt, OpenID Connect (Okta, Azure AD, Google, custom)'],
                    ['AI', 'OpenAI API — document classification, territory optimization, ticket triage, lead analysis'],
                    ['Real-time', 'WebSockets (ws)'],
                    ['Payments', 'ACH batch file generation, wire, USDC'],
                    ['Vehicle tracking', 'BLE, NFC, GPS tag schema (Blecon ecosystem)'],
                    ['Build tooling', 'esbuild, tsx, Vite'],
                    ['Client routing', 'Wouter'],
                  ].map(([layer, tech]) => (
                    <tr key={layer} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-6" style={S.muted}>{layer}</td>
                      <td className="py-2">{tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Product Modules</h3>
            <div className="space-y-3 mb-6">
              {[
                ['LMS — Loan Management System', 'Floorplan lending lifecycle: advance funding, interest accrual (simple and compound), fee management, curtailments, payoffs, ACH batch generation, title tracking, ledger entries, waiver management.'],
                ['RMS — Risk Management System', 'Vehicle collateral monitoring: BLE/NFC/GPS tag tracking, audit sessions, heartbeat events, out-of-trust detection, automated risk event generation and alerting.'],
                ['TMS — Title Management System', 'Full title lifecycle from absence through lien perfection, release, and duplicate processing across the full floorplan lifecycle.'],
                ['CRM — Customer Relationship Management', 'Dealer management, lead pipeline, territory management, seller and auction relationships, ownership groups, dealer contacts and principals.'],
                ['TERRITORY — AI Territory Engine', 'AI-powered territory design and optimization: geographic clustering, scenario modeling, lead assignment rules, capacity analysis, heat map generation.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm" style={S.body}>
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Multi-Tenant Architecture</h3>
            <p className="text-sm mb-6" style={S.body}>
              The prototype implements a multi-tenant data model supporting three tenant types: LENDER, LIQUIDITY, and ANVL_INTERNAL. Eleven user roles provide granular access control across the full organizational hierarchy, from ANVL_SUPER_ADMIN to DEALER_STAFF. The schema supports per-tenant module configuration, allowing individual modules to be enabled or disabled per customer. SSO support (Okta, Azure AD, Google, custom OIDC) is already built into the authentication layer.
            </p>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Data Sensitivity Classification</h3>
            <p className="text-sm mb-4" style={S.body}>
              The system handles data in three sensitivity categories, all of which fall under the GLBA Safeguards Rule:
            </p>
            <div className="space-y-3 mb-6">
              {[
                ['Personally Identifiable Information (PII)', 'Dealer owner names, contact information, user accounts, dealer principal records, employee data synchronized from SSO providers (Azure AD, Okta). Includes name, email, job title, department, office location.'],
                ['Financial Data', 'ACH routing numbers, bank account numbers, payment amounts, loan advance amounts, interest calculations, fee assessments, ledger balances. Banking fields have partial redaction in the prototype; full encryption is a production requirement.'],
                ['Credit and Collateral Data', 'Lines of credit, floorplan unit valuations, vehicle VINs, title status, audit findings, risk events, out-of-trust records.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm" style={S.body}>
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Replit-Specific Dependencies</h3>
            <p className="text-sm mb-4" style={S.body}>
              The following components are tied to the Replit platform and must be removed or replaced before production deployment:
            </p>
            <div style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`// Dev dependencies — Replit Vite plugins (remove entirely)
@replit/vite-plugin-cartographer
@replit/vite-plugin-dev-banner
@replit/vite-plugin-runtime-error-modal

// Server integrations — Replit-hosted AI/media services (replace with cloud-native)
server/replit_integrations/audio/
server/replit_integrations/batch/
server/replit_integrations/chat/
server/replit_integrations/image/
client/replit_integrations/audio/

// Session store — in-memory, not safe for production (replace with Redis)
memorystore`}
              </pre>
            </div>
          </section>

          {/* ─── Section 2: Production Requirements ─── */}
          <section id="production-requirements" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>2. Production Requirements for Financial-Grade Systems</h2>
            <p className="text-sm mb-6" style={S.body}>
              Financial institution customers, particularly large floor plan lending operations, impose requirements that go beyond application functionality. Before entering a commercial relationship, their IT security and vendor management teams conduct formal evaluations covering infrastructure, security controls, data governance, and compliance certifications. The following requirements are not aspirational; they are expected at the point of contract negotiation.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Infrastructure & Availability',
                  items: [
                    'Dedicated, isolated compute — not shared multi-tenant hosting infrastructure',
                    'US-only data residency — data must not leave US-based data centers',
                    'High availability with documented SLA (99.9% minimum)',
                    'Disaster recovery with defined Recovery Time Objective (RTO) and Recovery Point Objective (RPO)',
                    'Automated backups with documented and tested restoration procedures',
                  ],
                },
                {
                  title: 'Security Controls',
                  items: [
                    'Encryption at rest for all PII and financial data (AES-256)',
                    'Encryption in transit (TLS 1.2 minimum, TLS 1.3 preferred)',
                    'Centralized secrets management — no plaintext credentials in code or environment files',
                    'Multi-factor authentication (MFA) enforcement for all privileged users',
                    'Rate limiting and brute-force protection on all authentication routes',
                    'Annual third-party penetration testing',
                    'Vulnerability management program with defined remediation SLA',
                  ],
                },
                {
                  title: 'Compliance Certifications',
                  items: [
                    'SOC 2 Type II report (Trust Service Criteria: Security, Availability, Confidentiality)',
                    'GLBA Safeguards Rule compliance — written information security program',
                    'Data processing agreements with all sub-processors',
                    'Documented incident response plan and breach notification procedures (GLBA requires notification within 30 days)',
                  ],
                },
                {
                  title: 'Software Development Lifecycle',
                  items: [
                    'Separation of development, staging, and production environments with independent credentials',
                    'Required code review before any production merge',
                    'Change management process with documented approvals',
                    'Automated testing with defined coverage thresholds',
                    'Dependency vulnerability scanning (e.g., GitHub Dependabot, Snyk)',
                  ],
                },
                {
                  title: 'Data Governance',
                  items: [
                    'Data classification policy covering all data types handled',
                    'Data retention and deletion procedures',
                    'Comprehensive audit logging for all data access and modifications',
                    'Access provisioning and de-provisioning procedures with quarterly review',
                    'Documented data flow diagrams covering all sub-processors',
                  ],
                },
              ].map(({ title, items }) => (
                <div key={title} style={S.card}>
                  <h4 className="text-sm font-semibold mb-3" style={S.heading}>{title}</h4>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2 text-xs" style={S.body}>
                        <span className="mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 3: Gap Analysis ─── */}
          <section id="gap-analysis" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>3. Gap Analysis</h2>
            <p className="text-sm mb-6" style={S.body}>
              The following table maps specific prototype characteristics against production requirements. Priority ratings: Critical (blocks production deployment), High (required before customer security review), Medium (required for SOC 2 Type II).
            </p>
            <div style={S.card}>
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-3 font-semibold" style={S.heading}>Area</th>
                    <th className="text-left py-2 pr-3 font-semibold" style={S.heading}>Prototype State</th>
                    <th className="text-left py-2 pr-3 font-semibold" style={S.heading}>Production Requirement</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Hosting', 'Replit (shared, managed)', 'AWS (dedicated, US-only)', 'Critical'],
                    ['Database', 'Replit-managed Postgres', 'AWS RDS Multi-AZ, encrypted, PITR', 'Critical'],
                    ['Data residency', 'Replit-managed, unverified', 'Documented US-only guarantee', 'Critical'],
                    ['Secrets management', 'Environment variables', 'AWS Secrets Manager + KMS', 'Critical'],
                    ['Encryption at rest', 'Unverified', 'AES-256 via KMS for all PII and financial data', 'Critical'],
                    ['ACH banking fields', 'Partial redaction utility', 'Full KMS encryption for routing/account numbers', 'Critical'],
                    ['Session store', 'In-memory (memorystore)', 'Redis (ElastiCache) or RDS-backed session store', 'High'],
                    ['Rate limiting', 'None visible', 'All authentication and sensitive API routes', 'High'],
                    ['MFA enforcement', 'Not enforced', 'Required for all privileged roles', 'High'],
                    ['Monitoring & alerting', 'None', 'CloudWatch + on-call alerting', 'High'],
                    ['Test coverage', 'None', 'Unit, integration, E2E baseline', 'High'],
                    ['Replit dependencies', 'Present throughout codebase', 'Fully removed and replaced', 'High'],
                    ['Disaster recovery', 'Replit-managed, untested', 'Documented RTO/RPO, tested annually', 'High'],
                    ['Audit logging', 'Basic in-database logging', 'Comprehensive, tamper-evident, queryable', 'Medium'],
                    ['Penetration testing', 'None', 'Annual third-party pentest', 'Medium'],
                    ['SSO/MFA enforcement', 'Optional per tenant', 'Enforced for enterprise tenant configurations', 'Medium'],
                  ].map(([area, current, required, priority]) => (
                    <tr key={area} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-3" style={S.muted}>{area}</td>
                      <td className="py-2 pr-3">{current}</td>
                      <td className="py-2 pr-3">{required}</td>
                      <td className="py-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor:
                              priority === 'Critical'
                                ? 'rgba(228, 49, 45, 0.15)'
                                : priority === 'High'
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(107, 122, 141, 0.15)',
                            color:
                              priority === 'Critical'
                                ? '#E4312D'
                                : priority === 'High'
                                ? '#F59E0B'
                                : '#6B7A8D',
                          }}
                        >
                          {priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── Section 4: Target Architecture ─── */}
          <section id="target-architecture" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>4. Target Production Architecture</h2>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Two-Repository Model</h3>
            <p className="text-sm mb-4" style={S.body}>
              Production maintains strict separation between two repositories. This is not a preference, it is a SOC 2 access control requirement. Non-technical team members who work in the prototype environment must not have access to production secrets, credentials, or infrastructure. A single repository makes this separation difficult to enforce and audit.
            </p>
            <div style={S.codeBlock} className="mb-6">
              <pre style={{ margin: 0 }}>
{`anvl-lms (Replit)                    anvl-prod (AWS / GitHub)
─────────────────────                ──────────────────────────────
• Rapid prototyping                  • Production deployments
• Full team access                   • CTO + DevOps access only
• Mock / seed data                   • Real customer data
• No production secrets              • AWS Secrets Manager
• main branch → Scout trigger        • Feature branch per deployment
                    │
                    │  Scout / Smith / Anvil
                    │  AI pipeline (GitHub Actions + Claude API)
                    └─────────────────────────────►`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>AWS Infrastructure Stack</h3>
            <div className="space-y-3 mb-6">
              {[
                ['Compute — AWS App Runner', 'Containerized Node.js/Express application. App Runner provides auto-scaling, managed TLS, and zero EC2 instance management overhead. Appropriate for ANVL\'s B2B workload scale (thousands of concurrent users). Migration path to ECS Fargate is straightforward if requirements grow.'],
                ['Database — AWS RDS PostgreSQL', 'Multi-AZ deployment for high availability. Encryption at rest via AWS KMS. Point-in-time recovery with 7-day retention. Automated daily snapshots retained for 30 days. The existing Drizzle ORM schema requires no changes, RDS is a drop-in replacement for the current Postgres connection string.'],
                ['Secrets — AWS Secrets Manager', 'All credentials (database password, API keys, OAuth client secrets, ACH configuration) stored in Secrets Manager. Application retrieves secrets at runtime via IAM role, e.g. no plaintext secrets in environment variables, code, or git history.'],
                ['Encryption — AWS KMS', 'Customer-managed KMS key for RDS encryption, S3 encryption, and application-level envelope encryption of ACH banking fields (routing numbers, account numbers). KMS provides full audit trails of all key usage.'],
                ['Object storage — AWS S3', 'Document storage for loan documents, compliance documents, and file uploads (currently handled via Multer). Encrypted at rest via KMS. Versioning enabled. Lifecycle policies for retention compliance.'],
                ['CDN — AWS CloudFront', 'Static frontend assets (React/Vite build output) served via CloudFront. Reduces origin load, provides HTTPS enforcement, and global edge availability.'],
                ['Monitoring — AWS CloudWatch', 'Application logs, API error rates, latency metrics, database performance counters. CloudWatch Alarms trigger PagerDuty or SNS notifications for critical thresholds.'],
                ['Session store — AWS ElastiCache (Redis)', 'Replaces the prototype\'s in-memory memorystore. Redis provides distributed, persistent sessions compatible with multi-instance deployments. connect-pg-simple (already a dependency) is an acceptable fallback.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm" style={S.body}>
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>AI Platform</h3>
            <p className="text-sm mb-4" style={S.body}>
              The prototype uses the OpenAI API for in-product AI features. Production will migrate these to the Anthropic Claude API. Claude provides strong performance on ANVL&apos;s use cases (document classification, structured data extraction, territory reasoning, ticket triage), and Anthropic&apos;s enterprise data handling commitments, including no training on customer data by default, align with GLBA data governance requirements.
            </p>
            <p className="text-sm mb-6" style={S.body}>
              The migration is low-risk. The prototype already abstracts all AI calls through a centralized <code style={{ color: '#E4312D' }}>openai-client.ts</code> module and a configurable <code style={{ color: '#E4312D' }}>agent-service.ts</code> layer with system prompts stored in the database. Replacing the underlying SDK is a contained, non-breaking change.
            </p>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Environment Separation</h3>
            <div style={S.card}>
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Environment</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Purpose</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Data</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>Access</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Prototype (Replit)', 'Feature development and validation', 'Seeded mock data', 'Full team'],
                    ['Staging (anvl-prod)', 'Pre-production validation by pipeline + human review', 'Anonymized test data', 'CTO + DevOps'],
                    ['Production (anvl-prod)', 'Live customer deployments', 'Real customer data', 'CTO + DevOps (break-glass)'],
                  ].map(([env, purpose, data, access]) => (
                    <tr key={env} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-4" style={S.muted}>{env}</td>
                      <td className="py-2 pr-4">{purpose}</td>
                      <td className="py-2 pr-4">{data}</td>
                      <td className="py-2">{access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── Section 5: Development Pipeline ─── */}
          <section id="development-pipeline" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>5. The Development Pipeline: Scout, Smith, and Anvil</h2>
            <p className="text-sm mb-6" style={S.body}>
              The central challenge of a two-repository model is keeping the prototype&apos;s innovation velocity from being killed by the overhead of manual translation to production. ANVL solves this with an AI-powered agent pipeline: three Claude-powered agents that automate the translation of prototype changes into production-ready code, with mandatory human oversight at every critical gate.
            </p>

            <div style={S.codeBlock} className="mb-8">
              <pre style={{ margin: 0 }}>
{`anvl-lms push
    │
    │  GitHub Action trigger
    ▼
┌─────────────┐
│   SCOUT     │  Detects changes, classifies intent,
│             │  generates structured Change Artifact (JSON)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   SMITH     │  Reads artifact, transforms prototype code
│             │  to production patterns:
│             │  mock data → RDS queries
│             │  Replit deps → cloud-native equivalents
│             │  env vars → Secrets Manager references
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   ANVIL     │  Runs test suite, deploys to staging,
│             │  generates human-readable Deployment Report
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   HUMAN     │  Reviews staging environment.
│   REVIEW    │  Approves or rejects. Schema migrations
│             │  ALWAYS require human review.
└──────┬──────┘
       │  Approved
       ▼
  anvl-prod (production)`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Agent Responsibilities</h3>
            <div className="space-y-4 mb-6">
              {[
                {
                  name: 'Scout — Change Monitor',
                  desc: 'Triggered on every push to the anvl-lms main branch via GitHub Actions. Performs git diff analysis, classifies changes by type (feat, fix, ui, refactor, schema), infers product intent, identifies new dependencies and data model changes, and produces a structured JSON Change Artifact. Scout batches rapid successive commits within a 5-minute window to prevent pipeline flooding and respects wip: commit prefixes by ignoring them entirely.',
                },
                {
                  name: 'Smith — Code Transformer',
                  desc: 'Consumes the Change Artifact and produces production-ready code in anvl-prod. Key transformations: seed and mock data access patterns are rewritten as RDS queries; in-memory session store is replaced with Redis references; Replit integration calls are replaced with cloud-native equivalents; hardcoded test values become Secrets Manager references. Smith never deletes production-only code with no prototype equivalent. This protects production-specific logic from accidental removal. Schema changes are always flagged and never auto-applied.',
                },
                {
                  name: 'Anvil — Test & Deploy',
                  desc: 'Validates Smith\'s output against the full test suite, runs integration tests against the staging database, performs build verification, deploys to the staging environment, and executes smoke tests. Generates a Deployment Report containing test results, staging URL, risk assessment, schema migration details (if applicable), and a one-click approve/reject action for the designated reviewer.',
                },
              ].map(({ name, desc }) => (
                <div key={name} style={S.card}>
                  <h4 className="text-sm font-semibold mb-2" style={S.heading}>{name}</h4>
                  <p className="text-xs" style={S.body}>{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Mandatory Human Review Gates</h3>
            <p className="text-sm mb-4" style={S.body}>
              The pipeline is designed around a clear principle: automation provides velocity, human judgment provides safety. Three categories of change require mandatory human review regardless of test results:
            </p>
            <div className="space-y-2">
              {[
                'All database schema migrations — no schema changes are applied to production without explicit approval',
                'Changes to authentication or authorization logic',
                'Changes affecting ACH payment generation or banking field handling',
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm" style={S.body}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 6: Compliance Roadmap ─── */}
          <section id="compliance-roadmap" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>6. Compliance Roadmap</h2>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Regulatory Scope</h3>
            <div className="space-y-3 mb-6">
              {[
                ['GLBA Safeguards Rule (FTC, 16 CFR Part 314)', 'ANVL handles nonpublic personal financial information as defined under the Gramm-Leach-Bliley Act. The Safeguards Rule mandates a written information security program, a designated qualified individual responsible for the program, a risk assessment, implementation of technical and physical safeguards, vendor oversight requirements, and a 30-day breach notification obligation. This is a legal requirement, not optional, for any financial technology company processing consumer financial data.'],
                ['SOC 2 Type II', 'System and Organization Controls 2 (SOC 2) is the de facto vendor security certification required by enterprise financial institution procurement teams. Type I is a point-in-time assessment confirming controls are designed correctly. Type II is a 6–12 month audit confirming controls operated effectively over the observation period. Enterprise customers will require a Type II report. The observation period must begin before the audit report can be issued, it cannot be accelerated.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm" style={S.body}>
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Compliance Timeline</h3>
            <div style={S.card} className="mb-6">
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Milestone</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Target</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>Deliverable</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Engage fractional CISO', 'Month 1', 'Compliance program ownership, risk assessment initiation'],
                    ['Deploy Vanta', 'Month 1', 'Automated evidence collection and control monitoring active'],
                    ['GLBA information security program documented', 'Month 2', 'Written ISP, risk assessment, sub-processor inventory'],
                    ['Technical controls implemented', 'Month 2–3', 'Encryption, MFA, logging, access controls, DR tested'],
                    ['SOC 2 Type I audit', 'Month 3', 'Point-in-time confirmation of controls design'],
                    ['SOC 2 Type II observation begins', 'Month 3', 'Start of 6–12 month evidence collection window'],
                    ['Production launch', 'Month 3', 'AWS infrastructure live, pipeline operational, first customer'],
                    ['SOC 2 Type II report issued', 'Month 9–15', 'Full audit report available for customer review'],
                  ].map(([milestone, target, deliverable]) => (
                    <tr key={milestone} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-4" style={S.muted}>{milestone}</td>
                      <td className="py-2 pr-4" style={{ color: '#E4312D' }}>{target}</td>
                      <td className="py-2">{deliverable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Vanta for Automated Evidence Collection</h3>
            <p className="text-sm mb-6" style={S.body}>
              Vanta integrates directly with AWS, GitHub, and identity providers to automate the evidence collection required for SOC 2. Rather than manually assembling screenshots and access logs at audit time, Vanta continuously monitors controls and surfaces deficiencies in real time. For a small technical team, Vanta provides the infrastructure of a compliance program without the headcount. Estimated cost: $15,000–$25,000 per year depending on employee count and tier.
            </p>

            <div style={S.callout}>
              <p className="text-sm" style={S.body}>
                <strong style={S.heading}>Framing for enterprise customers:</strong> ANVL will have SOC 2 Type I within three months of production launch and will be in active Type II observation within the same window. A SOC 2 Type II report will be available within 9–15 months of initial deployment. This is the standard trajectory for a startup pursuing enterprise compliance. Customers should treat the Type I report as evidence of commitment and execution, and the Type II timeline as a contractual deliverable.
              </p>
            </div>
          </section>

          {/* ─── Section 7: Integration Roadmap ─── */}
          <section id="integrations" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>7. Integration Roadmap</h2>
            <p className="text-sm mb-6" style={S.body}>
              At least three external integrations are required for production readiness. Each introduces compliance scope and must be evaluated as a sub-processor under both GLBA and SOC 2 vendor management requirements. Here are three known integrations:
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Blackbook — Vehicle Valuation',
                  launch: 'Production launch',
                  detail: 'Blackbook provides wholesale vehicle valuations used to set and update credit limits against floorplan collateral. Integration model: nightly batch update of valuations for all active floorplan units. Real-time lookups at point of unit approval are technically possible but introduce API latency and cost; batch is the preferred operational model. Valuations are stored in the ANVL database alongside VIN records. Data handling agreement required as a GLBA sub-processor.',
                },
                {
                  name: 'KYB Provider — Know Your Business Verification',
                  launch: 'Month 2–3',
                  detail: 'Business identity verification for dealer onboarding. ANVL\'s B2B model requires KYB (Know Your Business), validating business entity legitimacy, ultimate beneficial owner (UBO) identity, OFAC and sanctions screening, and adverse media checks. Provider TBD; candidates include Alloy, Middesk, and Persona. Integration model: API call at dealer account creation, webhook for ongoing monitoring alerts. The existing dealer onboarding flow will be extended to include a KYB step that gates account activation. Sub-processor agreement required.',
                },
                {
                  name: 'Vara Network — Blockchain Audit Layer',
                  launch: 'Post-launch, Phase 2',
                  detail: 'Vara is a Substrate-based blockchain network. ANVL uses Vara as an immutable, independently verifiable audit layer. Key audit events, e.g. vehicle verification records, floorplan state changes, payment events, are written to the Vara chain in addition to the PostgreSQL database. This dual-write architecture means the audit trail can be verified by any party with chain access, without relying on ANVL\'s database. Integration model: asynchronous write to Vara after a successful PostgreSQL commit. Vara write failures are logged and queued for retry; they do not block primary database operations. USDC multi-network payment settlement will be evaluated in a subsequent phase as the blockchain feature set matures.',
                },
              ].map(({ name, launch, detail }) => (
                <div key={name} style={S.card}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold" style={S.heading}>{name}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}
                    >
                      {launch}
                    </span>
                  </div>
                  <p className="text-xs" style={S.body}>{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 8: Roles ─── */}
          <section id="roles" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>8. Roles and Responsibilities</h2>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Current Team</h3>
            <div style={S.card} className="mb-6">
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Role</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Environment Access</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>Responsibilities</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CTO', 'Prototype + Production', 'Production infrastructure, code review, pipeline oversight, security architecture, vendor technical evaluations, deployment approvals'],
                    ['CEO', 'Prototype only', 'Product direction, feature prototyping, customer demonstration preparation'],
                    ['COO', 'Prototype only', 'Operational workflow prototyping, process validation in prototype environment'],
                    ['CSO', 'Prototype only', 'Sales workflow validation, CRM and territory feature input, customer feedback loop'],
                  ].map(([role, access, resp]) => (
                    <tr key={role} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-4" style={S.muted}>{role}</td>
                      <td className="py-2 pr-4">{access}</td>
                      <td className="py-2">{resp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Required Additions</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Fractional CISO / Compliance Consultant',
                  timing: 'Month 1 — Immediate',
                  detail: 'Owns the information security program. Responsibilities include: GLBA risk assessment authorship, SOC 2 controls design and documentation, Vanta configuration and ongoing monitoring, sub-processor data processing agreements, incident response plan, and audit liaison. A fractional engagement (10–20 hours/month) is appropriate for ANVL\'s current stage. Typical cost: $5,000–$12,000/month depending on scope and background. This role can transition to a full-time Head of Compliance as the customer roster grows and compliance obligations become continuous.',
                },
                {
                  title: 'DevOps / Platform Engineer',
                  timing: 'Month 1 — Critical Path',
                  detail: 'Owns the AWS infrastructure build and ongoing operational reliability. Responsibilities include: provisioning and configuring the AWS environment (App Runner, RDS, Secrets Manager, KMS, ElastiCache, CloudWatch), implementing infrastructure as code (Terraform or AWS CDK), building the GitHub Actions pipeline for Scout, Smith, and Anvil, implementing Redis session store, and establishing CI/CD processes. This is on the critical path for the 3-month production timeline. Contractor for initial build transitioning to full-time as operational complexity grows is a reasonable approach.',
                },
              ].map(({ title, timing, detail }) => (
                <div key={title} style={S.card}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold" style={S.heading}>{title}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}
                    >
                      {timing}
                    </span>
                  </div>
                  <p className="text-xs" style={S.body}>{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 9: Migration Plan ─── */}
          <section id="migration-plan" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>9. Migration Plan</h2>
            <p className="text-sm mb-6" style={S.body}>
              The migration is structured as four phases over twelve months. Phases 1 through 3 target the three-month production launch. Phase 4 runs in parallel with early customer operations and targets SOC 2 Type II issuance.
            </p>

            <div className="space-y-4">
              {[
                {
                  phase: 'Phase 1 — Infrastructure Foundation',
                  timeline: 'Month 1',
                  tasks: [
                    'Provision AWS environment: App Runner, RDS PostgreSQL (Multi-AZ), Secrets Manager, KMS, S3, CloudFront, ElastiCache',
                    'Create anvl-prod GitHub repository with branch protection and required PR reviews',
                    'Implement infrastructure as code (Terraform or AWS CDK)',
                    'Remove all Replit-specific dependencies (vite plugins, replit_integrations/)',
                    'Migrate session store from memorystore to Redis (ElastiCache)',
                    'Implement AWS Secrets Manager integration — eliminate all plaintext credentials',
                    'Enable KMS encryption for RDS and S3',
                    'Implement application-level KMS encryption for ACH banking fields (routing numbers, account numbers)',
                    'Engage fractional CISO; initiate GLBA risk assessment',
                    'Deploy Vanta; connect AWS, GitHub, and identity provider integrations',
                  ],
                },
                {
                  phase: 'Phase 2 — Security Controls & Testing',
                  timeline: 'Month 2',
                  tasks: [
                    'Implement rate limiting on all authentication and sensitive API routes',
                    'Enforce MFA for ANVL_SUPER_ADMIN and LENDER_ADMIN roles',
                    'Implement comprehensive audit logging (tamper-evident, queryable, retained per GLBA)',
                    'Establish test coverage baseline: unit tests for financial calculation logic (interest accrual, fee assessment), integration tests for API routes, E2E tests for critical workflows',
                    'Configure CloudWatch dashboards, alarms, and on-call alerting',
                    'Document disaster recovery procedures; execute first DR restoration test',
                    'Complete GLBA information security program documentation',
                    'KYB provider integration — extend dealer onboarding to include business verification gate',
                    'Build and validate Scout agent against recent anvl-lms commits',
                  ],
                },
                {
                  phase: 'Phase 3 — Production Launch & Type I Audit',
                  timeline: 'Month 3',
                  tasks: [
                    'Complete Smith transformation logic for common change types (UI, API routes, schema)',
                    'Build and validate Anvil test/deploy pipeline against staging environment',
                    'Blackbook nightly batch integration complete and validated',
                    'Migrate in-product AI from OpenAI to Anthropic Claude API',
                    'Execute SOC 2 Type I audit (point-in-time controls assessment)',
                    'Production deployment — first customer environment provisioned',
                    'SOC 2 Type II observation period begins',
                    'First third-party penetration test commissioned',
                  ],
                },
                {
                  phase: 'Phase 4 — SOC 2 Type II & Integration Expansion',
                  timeline: 'Month 3–15',
                  tasks: [
                    'Maintain SOC 2 controls through Vanta continuous monitoring',
                    'Vara blockchain audit layer integration (asynchronous dual-write for audit events)',
                    'Quarterly access reviews and evidence collection for SOC 2',
                    'Implement drift detection: weekly automated comparison of anvl-lms and anvl-prod',
                    'SOC 2 Type II audit engagement; report issuance target Month 9–15',
                    'USDC multi-network payment settlement evaluation and scoping',
                    'LOS module planning and potential partner evaluation',
                  ],
                },
              ].map(({ phase, timeline, tasks }) => (
                <div key={phase} style={S.card}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold" style={S.heading}>{phase}</h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}
                    >
                      {timeline}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {tasks.map((task) => (
                      <li key={task} className="flex gap-2 text-xs" style={S.body}>
                        <span className="mt-0.5 flex-shrink-0" style={S.dim}>□</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 10: Ongoing Process ─── */}
          <section id="ongoing-process" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>10. Ongoing Prototype-to-Production Process</h2>
            <p className="text-sm mb-6" style={S.body}>
              After production launch, the Replit environment continues to serve as ANVL&apos;s innovation surface. The founding team retains the ability to prototype and validate features rapidly without the overhead of production change management. The Scout/Smith/Anvil pipeline handles translation. The following conventions govern the ongoing process.
            </p>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Commit Conventions for the Prototype</h3>
            <p className="text-sm mb-4" style={S.body}>
              Lightweight commit prefixes give Scout better classification signal and allow the team to explicitly mark work-in-progress commits that should not trigger the pipeline.
            </p>
            <div style={S.codeBlock} className="mb-6">
              <pre style={{ margin: 0 }}>
{`feat:     New feature or capability
fix:      Bug fix
ui:       UI/UX change only — no backend or schema impact
refactor: Code restructuring, no behavior change
schema:   Data model change — always requires human review in pipeline
wip:      Work in progress — Scout ignores this prefix entirely`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold mb-4" style={S.heading}>Drift Detection</h3>
            <p className="text-sm mb-4" style={S.body}>
              Over time, the two codebases will diverge in ways the pipeline does not automatically capture: hotfixes applied directly to production, features built outside of the prototype environment, or prototype experiments never promoted. A weekly drift detection job compares the structural shape of both repositories and produces a report flagging components that exist only in production (potentially orphaned), components only in the prototype (unprocessed work), and significant structural divergence in shared modules.
            </p>

            <div style={S.callout}>
              <p className="text-sm" style={S.body}>
                <strong style={S.heading}>Long-term optionality:</strong> If the Replit prototyping model is retired after initial product stabilization, the Scout/Smith/Anvil pipeline can be repurposed as a standard quality gate on a single repository — providing automated code review, test enforcement, and staged deployment regardless of source structure. The pipeline&apos;s value is architectural, not dependent on the two-repository model.
              </p>
            </div>
          </section>

          {/* ─── Closing ─── */}
          <div className="h-px mb-12" style={{ backgroundColor: '#1E3154' }} />
          <p className="text-xs text-center" style={S.dim}>
            ANVL Finance LLC · Confidential · Version 1.0 · March 2026
          </p>
          <p className="text-xs text-center mt-1" style={S.dim}>
            This document is intended for authorized recipients under NDA. Not for distribution.
          </p>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-xs mt-12" style={{ borderColor: '#1E3154', color: '#6B7A8D' }}>
        <p>© 2026 ANVL Finance LLC. All Rights Reserved.</p>
        <p className="mt-1">These documents are confidential and intended for authorized recipients only.</p>
      </footer>
    </div>
  );
}
