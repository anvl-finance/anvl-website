'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Table of Contents Data ─── */
const tocSections = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'problem', label: '1. The Problem' },
  { id: 'web2-architecture', label: '2. Current Architecture' },
  { id: 'web3-requirements', label: '3. Why Web 3 Demands More' },
  { id: 'disposable-tag-model', label: '4. Disposable Tag Model' },
  { id: 'gateway-signing', label: '5. Gateway Signing' },
  { id: 'eid-resolver', label: '6. The ANVL EID Resolver' },
  { id: 'on-chain-attestation', label: '7. On-Chain Attestation' },
  { id: 'merkle-registry', label: '8. Merkle Device Registry' },
  { id: 'verification-path', label: '9. Verification Path' },
  { id: 'migration-path', label: '10. Migration Path' },
  { id: 'post-quantum', label: '11. Post-Quantum Readiness' },
  { id: 'cost-model', label: '12. Cost Model' },
  { id: 'appendix-a', label: 'Appendix A: Hardware' },
  { id: 'appendix-b', label: 'Appendix B: Standards' },
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

export default function WhitepaperPage() {
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
              <Image
                src="/anvl-logo.svg"
                alt="ANVL Logo"
                width={140}
                height={40}
                priority
              />
            </Link>
            <span className="hidden sm:inline text-xs" style={{ color: '#6B7A8D' }}>
              / Documents / White Paper
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/documents" className="text-xs" style={{ color: '#AAB1B9' }}>
              ← All Documents
            </Link>
            {/* Mobile TOC toggle */}
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
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={S.heading}>
              Cryptographic Collateral Attestation
            </h1>
            <p className="text-lg sm:text-xl" style={S.muted}>
              A Protocol for Verifiable Physical Asset Presence in On-Chain Lending
            </p>
            <div className="mt-8 h-px" style={{ backgroundColor: '#1E3154' }} />
          </div>

          {/* ─── Abstract ─── */}
          <section id="abstract" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>Abstract</h2>
            <div style={S.callout}>
              <p className="text-sm leading-relaxed" style={S.body}>
                Floor plan lending — the primary financing mechanism for independent auto dealer inventory — relies on periodic physical verification of vehicle collateral. Existing audit methods depend on manual lot inspections, static GPS trackers, and institutional trust relationships that are incompatible with the programmatic verification demands of on-chain real-world asset (RWA) lending protocols. This paper presents ANVL&apos;s cryptographic collateral attestation protocol: an architecture that transforms physical vehicle presence into independently verifiable on-chain proof. The protocol employs disposable BLE beacon tags with HMAC-SHA256 rotating ephemeral identifiers, gateway-level Ed25519 digital signatures, a proprietary identity resolver, and a Merkle root device registry to create an end-to-end chain of trust from physical asset to on-chain record — without requiring any party to trust ANVL&apos;s servers. We describe the complete migration path from ANVL&apos;s current Web 2 infrastructure to a fully cryptographic verification stack, designed to be invisible to existing dealer customers while enabling institutional-grade RWA collateral attestation.
              </p>
            </div>
          </section>

          {/* ─── Section 1: The Problem ─── */}
          <section id="problem" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>1. The Problem</h2>
            <p className="text-sm mb-4" style={S.body}>
              Independent auto dealers in the United States rely on floor plan financing to stock their lots. A lender advances capital to purchase vehicles, and the vehicles themselves serve as collateral for the loan. The fundamental requirement of this arrangement is simple: the lender needs to know the cars are physically present on the lot. If a dealer sells a vehicle without repaying the associated advance — known as &quot;selling out of trust&quot; — the lender&apos;s collateral disappears.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              Today, verification is handled through periodic physical audits. A field representative visits the dealership, walks the lot, and checks VINs against the outstanding loan roster. This process typically occurs on a 30-day cycle, though high-risk accounts may be audited more frequently. The limitations are structural:
            </p>
            <div className="space-y-3 mb-4">
              {[
                ['Temporal gaps', 'Between audits, the lender has no visibility into collateral status. A vehicle can be sold, moved, or replaced with a different unit, and the lender will not discover this until the next site visit.'],
                ['Human error and fraud susceptibility', 'Manual VIN checks are tedious and error-prone. Audit fraud — where dealers stage vehicles or present falsified documentation — is a known and persistent problem in the industry.'],
                ['Cost at scale', 'Physical audits require personnel, travel, and scheduling coordination. For lenders with portfolios spanning hundreds of dealer locations, verification cost is a material line item.'],
                ['Incompatibility with programmatic finance', 'On-chain lending protocols, decentralized credit pools, and RWA tokenization platforms require real-time, machine-readable proof of collateral. A PDF audit report uploaded 30 days after the fact does not satisfy this requirement.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3" style={S.body}>
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm">
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm" style={S.body}>
              The gap between what traditional lenders accept and what on-chain protocols require is not incremental — it is structural. Closing it demands a new verification architecture that produces cryptographic proof at the physical layer and carries that proof, intact, to the chain.
            </p>
          </section>

          {/* ─── Section 2: Web 2 Architecture ─── */}
          <section id="web2-architecture" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>2. ANVL&apos;s Web 2 Architecture (Current State)</h2>
            <p className="text-sm mb-4" style={S.body}>
              ANVL&apos;s production system replaces manual lot audits with continuous, automated vehicle presence monitoring. The current architecture operates as follows:
            </p>
            <div className="mb-6" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`BLE Tag (on vehicle)
  │
  │  Bluetooth Low Energy broadcast
  ▼
Blecon Modem (gateway)
  │
  │  Cellular backhaul
  ▼
Blecon Cloud (third-party)
  │
  │  Data ingestion
  ▼
ANVL Database ──────► ANVL Dashboard (dealer/lender UX)
  │
  │  Audit records
  ▼
On-Chain Audit Layer (lender transparency)`}
              </pre>
            </div>
            <p className="text-sm mb-4" style={S.body}>
              Disposable BLE tags are affixed to each vehicle on the dealer&apos;s lot. These tags broadcast continuously. A Blecon-powered gateway on-site detects tag presence and relays observations to Blecon&apos;s cloud infrastructure over cellular. ANVL ingests the data from Blecon Cloud, stores it in its own database, and writes summary records to an on-chain audit layer visible to lenders.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              For ANVL&apos;s initial customer base — independent dealers and traditional lenders such as AFC and Kinetic Advantage — this architecture is effective. Dealers see a real-time dashboard showing which vehicles are on-lot, when they were last detected, and whether any have gone missing. Lenders get continuous visibility without dispatching field auditors. The value proposition is clear and the user experience is straightforward.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              However, this architecture contains structural limitations that become visible when subjected to the verification standards of on-chain lending:
            </p>
            <div className="space-y-3">
              {[
                ['Trust intermediary', 'Blecon Cloud sits between the physical observation and ANVL\'s systems. Data passes through Blecon\'s infrastructure before ANVL touches it, creating an unsigned hop where data could theoretically be altered or fabricated.'],
                ['Provenance gap', 'The on-chain audit record proves that ANVL wrote a record to the chain. It does not prove that the underlying observation is authentic or that it originated from an actual tag on an actual vehicle.'],
                ['Vendor dependency', 'If Blecon changes terms, sunsets a product, or suffers an outage, ANVL\'s data pipeline is disrupted without any technical recourse.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3" style={S.body}>
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm">
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 3: Why Web 3 Demands More ─── */}
          <section id="web3-requirements" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>3. Why Web 3 Demands More</h2>
            <p className="text-sm mb-4" style={S.body}>
              The emerging landscape of on-chain private credit — exemplified by protocols such as Centrifuge, Maple Finance, Goldfinch, and Credix — has created a new class of institutional lender that operates on a fundamentally different trust model than traditional floor plan financiers. Traditional lenders accept corporate reputation, auditor relationships, and legal recourse as sufficient assurance. On-chain lending protocols require something categorically different: cryptographic proof that can be verified by a smart contract without trusting any single party.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              For an RWA collateral pool to function, a verifier must be able to independently answer three questions:
            </p>
            <div className="space-y-3 mb-4">
              {[
                ['Does the collateral exist?', 'There must be a verifiable record that a specific physical asset has been registered and is associated with a specific loan obligation.'],
                ['Is the collateral where it should be?', 'There must be continuous, time-stamped proof that the asset is physically present at the declared location — not a single point-in-time check, but an ongoing stream of attestations.'],
                ['Can I verify this without trusting the originator?', 'The proof must be independently checkable. If the verification relies on trusting ANVL\'s API, database, or personnel, it fails the decentralization requirement.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3" style={S.body}>
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm">
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm" style={S.body}>
              ANVL&apos;s current architecture satisfies the first two questions for traditional counterparties but falls short on the third. The transition from Web 2 to Web 3 is, at its core, the engineering work required to close this gap — to transform &quot;ANVL says so&quot; into &quot;the math proves it.&quot;
            </p>
          </section>

          {/* ─── Section 4: Disposable Tag Model ─── */}
          <section id="disposable-tag-model" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>4. The Disposable Tag Model — Physical Security Through Economics</h2>
            <p className="text-sm mb-4" style={S.body}>
              A critical design constraint of the ANVL system is that tags must be inexpensive and physically disposable. This is not a cost optimization — it is a security architecture decision.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              An expensive, reusable smart tag creates a perverse incentive: if the tag has value, a dealer can detach it from a sold vehicle and re-attach it to a different one (or to nothing at all) to maintain the appearance of collateral presence. The tag becomes a transferable token of verification rather than a physical binding.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              ANVL&apos;s approach inverts this. Tags are priced in the $3–8 range at volume. They are affixed to the vehicle with tamper-evident adhesive. When a tag is physically removed, it stops broadcasting — this cessation of signal is itself an alert condition. The economics of the tag ensure that replacing, moving, or reusing tags is operationally impractical at scale.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Ephemeral Identity Protocol</h3>
            <p className="text-sm mb-4" style={S.body}>
              Each tag broadcasts a rotating ephemeral identifier (EID) derived using HMAC-SHA256. The tag holds an Identity Key provisioned at manufacture. Using this key and a clock value, the tag computes a new 8-byte identifier every configurable interval (typically 2–15 minutes). The computation follows the Eddystone-EID specification (Apache 2.0, open standard):
            </p>
            <div className="mb-4" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`EID = HMAC-SHA256(Identity_Key, timestamp_counter)[0:8]`}
              </pre>
            </div>
            <p className="text-sm mb-4" style={S.body}>
              An observer who intercepts the BLE broadcast sees only the current ephemeral identifier — an 8-byte value that appears random and changes within minutes. Without the Identity Key, the EID cannot be linked to any permanent identity. This provides protection against passive surveillance and replay attacks. A captured EID is useless after its rotation window expires.
            </p>
            <p className="text-sm" style={S.body}>
              Critically, the tag itself performs no signing and holds no private key material beyond the Identity Key used for EID generation. The tag&apos;s role is limited to two functions: proving physical presence through continuous broadcast, and providing identity through ephemeral rotation. All cryptographic attestation occurs at the gateway layer.
            </p>
          </section>

          {/* ─── Section 5: Gateway Signing ─── */}
          <section id="gateway-signing" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>5. Gateway-Level Cryptographic Signing</h2>
            <p className="text-sm mb-4" style={S.body}>
              The gateway is the trust anchor of the ANVL attestation protocol. Each gateway deployed on a dealer lot holds a unique Ed25519 key pair. The public key is registered on-chain at deployment time, creating an immutable binding between a physical device and a verifiable on-chain identity.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              When a gateway detects a tag broadcast, it constructs a signed attestation payload:
            </p>
            <div className="mb-4" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`Attestation Payload:
{
  eid:               <8-byte ephemeral identifier observed>
  timestamp:         <UTC observation time>
  gateway_id:        <unique gateway identifier>
  gateway_location:  <GPS coordinates>
  rssi:              <signal strength>
}

Signature:
  Ed25519_Sign(gateway_private_key, payload)`}
              </pre>
            </div>
            <p className="text-sm mb-4" style={S.body}>
              This signed payload constitutes a cryptographic attestation that says: &quot;I, gateway #{'{'}id{'}'} at location #{'{'}coords{'}'}, observed this ephemeral identifier at this time.&quot; The signature is verifiable by any party holding the gateway&apos;s public key, which is available on-chain.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Why Ed25519</h3>
            <p className="text-sm mb-4" style={S.body}>
              Ed25519 was selected over ECDSA (secp256k1) and ML-DSA (FIPS 204) for the gateway signing layer based on the following criteria:
            </p>
            <div style={S.card}>
              <table className="w-full text-xs" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Property</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>Ed25519</th>
                    <th className="text-left py-2 pr-4 font-semibold" style={S.heading}>secp256k1</th>
                    <th className="text-left py-2 font-semibold" style={S.heading}>ML-DSA</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Signature size', '64 bytes', '71 bytes', '~2,420 bytes'],
                    ['Signing speed', 'Fast', 'Moderate', 'Slower'],
                    ['Substrate-native', 'Yes', 'Supported', 'No'],
                    ['EVM-native', 'No', 'Yes', 'No'],
                    ['Post-quantum', 'No', 'No', 'Yes'],
                    ['W3C DID compatible', 'Yes', 'Yes', 'Emerging'],
                  ].map(([prop, ed, secp, ml]) => (
                    <tr key={prop} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-2 pr-4" style={S.muted}>{prop}</td>
                      <td className="py-2 pr-4">{ed}</td>
                      <td className="py-2 pr-4">{secp}</td>
                      <td className="py-2">{ml}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-4" style={S.body}>
              Ed25519 provides the optimal balance of compact signatures (critical for constrained gateway hardware and on-chain storage costs), fast signing performance, and native compatibility with Substrate-based chains. The architecture is designed for algorithm agility, enabling future migration to post-quantum primitives as described in Section 11.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Multi-Gateway Corroboration</h3>
            <p className="text-sm" style={S.body}>
              Dealer lots with multiple gateways produce independent, corroborating attestations for the same vehicle. A single tag observed by three gateways produces three independently signed records, each verifiable against a different on-chain public key. This redundancy strengthens the attestation — fabricating a presence observation would require compromising multiple gateway signing keys simultaneously.
            </p>
          </section>

          {/* ─── Section 6: EID Resolver ─── */}
          <section id="eid-resolver" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>6. The ANVL EID Resolver</h2>
            <p className="text-sm mb-4" style={S.body}>
              The EID resolver is the component that maps rotating ephemeral identifiers back to permanent asset identities. It is the only component in the architecture that operates off-chain by necessity, because it holds the Identity Keys that enable this mapping.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              When ANVL&apos;s cloud receives a signed gateway payload, the resolver performs a lookup:
            </p>
            <div className="mb-4" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`For each registered device:
  expected_eid = HMAC-SHA256(device.identity_key, 
                             payload.timestamp_counter)[0:8]
  if expected_eid == payload.eid:
    return { vin: device.vin, loan_id: device.loan_id }`}
              </pre>
            </div>
            <p className="text-sm mb-4" style={S.body}>
              Only ANVL can perform this resolution because only ANVL holds custody of the Identity Keys. This is a deliberate design choice: the Identity Keys are ANVL&apos;s core intellectual property and the foundation of its data pipeline. No third party — not the tag manufacturer, not the gateway vendor, not the connectivity provider — holds material that can decode ANVL&apos;s device identities.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Anti-Fraud Properties</h3>
            <div className="space-y-3">
              {[
                ['Ghost inventory', 'A dealer cannot fabricate vehicle presence because doing so would require generating valid EIDs — which requires the Identity Key held exclusively by ANVL.'],
                ['VIN spoofing', 'Remapping a tag from one vehicle to another requires modifying ANVL\'s resolver database. The Merkle root commitment (Section 8) makes retroactive remapping detectable.'],
                ['Replay attacks', 'EIDs expire within their rotation window (2–15 minutes). A captured identifier cannot be replayed after rotation.'],
                ['Passive surveillance', 'An observer intercepting BLE broadcasts sees only ephemeral identifiers that appear random and cannot be correlated to any vehicle identity without the Identity Key.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3" style={S.body}>
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm">
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Section 7: On-Chain Attestation ─── */}
          <section id="on-chain-attestation" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>7. On-Chain Attestation Model</h2>
            <p className="text-sm mb-4" style={S.body}>
              Resolved attestations are written to a Substrate-based chain (Vara Network). Each record contains the full provenance chain from physical observation to on-chain commitment:
            </p>
            <div className="mb-4" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`On-Chain Attestation Record:
{
  attestation_id:     <unique hash>
  vin_hash:           SHA-256(vin)
  loan_id:            <on-chain loan/collateral reference>
  timestamp:          <gateway observation time (UTC)>
  gateway_id:         <on-chain registered gateway identity>
  gateway_location:   <GPS coordinates>
  eid_snapshot:       <ephemeral identifier observed>
  gateway_signature:  <Ed25519 signature over all fields>
}`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Design Decisions</h3>
            <p className="text-sm mb-4" style={S.body}>
              <strong style={S.heading}>Hashed VINs:</strong> Vehicle Identification Numbers are hashed before on-chain storage. A verifier who knows the VIN (e.g., the originating lender) can confirm the hash matches. A passive observer cannot reverse the hash to determine which specific vehicles are on a dealer&apos;s lot, protecting dealer inventory from competitive intelligence.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              <strong style={S.heading}>EID inclusion:</strong> The ephemeral identifier is included in the on-chain record despite being expired by the time the record is written. This enables an additional verification path: an auditor with authorized resolver access can independently confirm that the EID, when processed through the resolver for the given timestamp, produces the claimed VIN-hash.
            </p>
            <p className="text-sm" style={S.body}>
              <strong style={S.heading}>Heartbeat model:</strong> Rather than writing every individual gateway scan to chain, ANVL aggregates observations into periodic heartbeat attestations — one per vehicle per time window (configurable, typically hourly). Each heartbeat summarizes: &quot;this vehicle was continuously observed during this period.&quot; This reduces on-chain storage costs while preserving the attestation guarantee. Individual scan records remain available in ANVL&apos;s off-chain database for detailed audit queries.
            </p>
          </section>

          {/* ─── Section 8: Merkle Registry ─── */}
          <section id="merkle-registry" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>8. Merkle Root Device Registry</h2>
            <p className="text-sm mb-4" style={S.body}>
              The gateway signature proves a legitimate observation occurred. The EID resolver maps the observation to a vehicle identity. But how does a verifier know the resolver itself is honest? What prevents ANVL from registering phantom devices, retroactively re-mapping tags between vehicles, or inflating the collateral count reported to lenders?
            </p>
            <p className="text-sm mb-4" style={S.body}>
              The Merkle root device registry solves this by anchoring the integrity of ANVL&apos;s off-chain device database on-chain, without exposing the database contents.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Registration Flow</h3>
            <p className="text-sm mb-4" style={S.body}>
              When a tag is provisioned and physically attached to a vehicle, ANVL creates a registry entry:
            </p>
            <div className="mb-4" style={S.codeBlock}>
              <pre style={{ margin: 0 }}>
{`Registry Entry:
{
  device_id:               <unique tag identifier>
  vin_hash:                SHA-256(vin)
  identity_key_commitment: SHA-256(identity_key)
  registration_timestamp:  <UTC time of provisioning>
  dealer_id:               <dealer account reference>
  loan_id:                 <associated loan/collateral ref>
}`}
              </pre>
            </div>
            <p className="text-sm mb-4" style={S.body}>
              Note that the Identity Key itself is never stored in the Merkle tree — only a cryptographic commitment (hash) of the key. This proves the key existed at registration time without revealing it.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>On-Chain Commitment</h3>
            <p className="text-sm mb-4" style={S.body}>
              Periodically (daily), ANVL computes a Merkle root over the entire device registry and publishes it to Vara. The on-chain footprint is minimal: a single 32-byte hash plus a timestamp.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              During an audit, ANVL provides Merkle proofs off-chain. A verifier checks the proof against the on-chain root: if the proof validates, the device-to-VIN mapping was committed before the attestation in question occurred. ANVL cannot retroactively alter which tag maps to which vehicle without causing the Merkle root to change — which would be visible on-chain.
            </p>
            <p className="text-sm" style={S.body}>
              This approach is standard practice in RWA protocols. Centrifuge, Goldfinch, and similar platforms all employ variations of Merkle commitments for off-chain data integrity anchoring.
            </p>
          </section>

          {/* ─── Section 9: Verification Path ─── */}
          <section id="verification-path" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>9. The Complete Verification Path</h2>
            <p className="text-sm mb-6" style={S.body}>
              The following describes how an independent RWA auditor or lending protocol verifier can confirm physical collateral presence without trusting any ANVL-operated system:
            </p>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Authenticate the observation',
                  desc: 'Retrieve the gateway\'s public key from the on-chain registry. Verify the Ed25519 signature on the attestation record. If valid, a registered ANVL gateway produced this observation.',
                  result: 'Proves: a legitimate, registered gateway made this attestation.',
                },
                {
                  step: '2',
                  title: 'Verify the identity mapping',
                  desc: 'Request resolver access from ANVL (formal auditor relationship). Submit the EID and timestamp from the on-chain record. Confirm the resolver returns the same VIN-hash that appears in the attestation.',
                  result: 'Proves: the ephemeral identifier maps to the claimed vehicle.',
                },
                {
                  step: '3',
                  title: 'Confirm the device registration',
                  desc: 'Request a Merkle proof from ANVL for the device in question. Verify the proof against the on-chain Merkle root committed before the attestation timestamp.',
                  result: 'Proves: the device-to-VIN binding was committed before the observation and has not been altered.',
                },
              ].map(({ step, title, desc, result }) => (
                <div key={step} style={S.card}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}
                    >
                      {step}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2" style={S.heading}>{title}</h4>
                      <p className="text-sm mb-3" style={S.body}>{desc}</p>
                      <p className="text-xs font-medium" style={S.accent}>{result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8" style={S.callout}>
              <p className="text-sm font-medium" style={S.heading}>
                End-to-end guarantee:
              </p>
              <p className="text-sm mt-2" style={S.body}>
                No step in this verification path requires trusting ANVL&apos;s servers, database, or personnel. Every claim — the observation, the identity mapping, and the device registration — is independently verifiable using on-chain data and cryptographic proofs. This is the fundamental difference between ANVL&apos;s Web 3 attestation protocol and conventional monitoring solutions.
              </p>
            </div>
          </section>

          {/* ─── Section 10: Migration Path ─── */}
          <section id="migration-path" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>10. Migration Path — Web 2 to Web 3</h2>
            <p className="text-sm mb-4" style={S.body}>
              The protocol upgrade is designed to be invisible to ANVL&apos;s existing dealer and traditional lender customers. Dealers continue to see the same dashboard, the same alerts, and the same operational experience. The cryptographic attestation layer is added underneath without disrupting the product surface.
            </p>
            <p className="text-sm mb-6" style={S.body}>
              Migration proceeds in three phases:
            </p>
            <div className="space-y-6">
              {[
                {
                  phase: 'Phase 1',
                  title: 'Gateway Signing',
                  items: [
                    'Deploy gateways with Ed25519 key pairs',
                    'Register gateway public keys on Vara',
                    'Begin signing all observation payloads at the gateway',
                    'Existing data pipeline continues to function — signed payloads carry additional metadata that the current system ignores',
                  ],
                },
                {
                  phase: 'Phase 2',
                  title: 'Merkle Device Registry',
                  items: [
                    'Implement device registration workflow with Merkle tree construction',
                    'Begin publishing daily Merkle roots to Vara',
                    'Backfill existing device inventory into the registry',
                    'Develop auditor-facing proof generation and verification tooling',
                  ],
                },
                {
                  phase: 'Phase 3',
                  title: 'RWA Protocol Integration',
                  items: [
                    'Publish attestation schema and verification documentation for lending protocol partners',
                    'Deploy on-chain verifier contracts / pallets on Vara',
                    'Establish formal auditor access programs for resolver verification',
                    'Enable first RWA collateral pools backed by cryptographic attestations',
                  ],
                },
              ].map(({ phase, title, items }) => (
                <div key={phase} style={S.card}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(228, 49, 45, 0.15)', color: '#E4312D' }}>
                      {phase}
                    </span>
                    <span className="text-sm font-semibold" style={S.heading}>{title}</span>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={S.body}>
                        <span className="flex-shrink-0" style={S.dim}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm mt-6" style={S.body}>
              Each phase is independently valuable. Phase 1 alone eliminates the unsigned hop in the data pipeline. Phase 2 adds registry integrity guarantees. Phase 3 opens the RWA market. A traditional lender benefits from Phase 1 without requiring any awareness of Phases 2 or 3.
            </p>
          </section>

          {/* ─── Section 11: Post-Quantum ─── */}
          <section id="post-quantum" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>11. Post-Quantum Readiness</h2>
            <p className="text-sm mb-4" style={S.body}>
              Ed25519, like all elliptic curve cryptography, is vulnerable to quantum computing attacks via Shor&apos;s algorithm. While practical quantum computers capable of breaking Ed25519 are not expected in the immediate term, floor plan loan durations and institutional planning horizons extend over years — and on-chain records are immutable once written.
            </p>
            <p className="text-sm mb-4" style={S.body}>
              ANVL&apos;s architecture is designed for algorithm agility. The signing and verification components are abstracted behind interfaces that are algorithm-independent. The planned migration path is:
            </p>
            <div className="space-y-3 mb-4">
              {[
                ['Current', 'Ed25519 gateway signing, HMAC-SHA256 ephemeral identifiers'],
                ['Planned', 'ML-DSA (NIST FIPS 204) gateway signing, with hybrid Ed25519+ML-DSA transition period'],
                ['Identity layer', 'HMAC-SHA256 remains quantum-resistant (symmetric primitive) and does not require migration'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3" style={S.body}>
                  <span className="text-sm mt-0.5 flex-shrink-0" style={S.accent}>▸</span>
                  <p className="text-sm">
                    <strong style={S.heading}>{title}:</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm" style={S.body}>
              ML-DSA (Module Lattice-Based Digital Signature Algorithm) was standardized by NIST in August 2024 as FIPS 204. It provides security against both classical and quantum adversaries. The primary trade-off is signature size (~2,420 bytes vs. 64 bytes for Ed25519), which increases on-chain storage costs. The transition will be executed when Substrate-based chains implement native ML-DSA verification support, minimizing the performance impact.
            </p>
          </section>

          {/* ─── Section 12: Cost Model ─── */}
          <section id="cost-model" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>12. Cost Model &amp; Hardware Economics</h2>
            <p className="text-sm mb-6" style={S.body}>
              The per-vehicle cost of cryptographic attestation is designed to be negligible relative to the value of the collateral being verified. The following estimates reflect component costs at a 100-dealer deployment scale:
            </p>
            <div style={S.card}>
              <table className="w-full text-sm" style={S.body}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E3154' }}>
                    <th className="text-left py-3 pr-4 font-semibold" style={S.heading}>Component</th>
                    <th className="text-left py-3 pr-4 font-semibold" style={S.heading}>Unit Cost</th>
                    <th className="text-left py-3 font-semibold" style={S.heading}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['BLE Beacon Tag', '$3–8', 'Disposable, tamper-on-removal, per vehicle'],
                    ['Gateway (w/ signing)', '$150–300', 'Solar-powered, cellular, Ed25519 capable, per lot'],
                    ['Cellular backhaul', '$5–10/mo', 'Per gateway, IoT data plan'],
                    ['On-chain attestation', '<$0.01', 'Per heartbeat record on Vara'],
                    ['Merkle root publication', '<$0.01', 'Daily, single 32-byte transaction'],
                  ].map(([comp, cost, notes]) => (
                    <tr key={comp} style={{ borderBottom: '1px solid #1E3154' }}>
                      <td className="py-3 pr-4" style={S.muted}>{comp}</td>
                      <td className="py-3 pr-4 font-medium" style={S.heading}>{cost}</td>
                      <td className="py-3 text-xs" style={S.dim}>{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-6" style={S.body}>
              At a typical independent dealer carrying 50–100 vehicles, the fully loaded per-vehicle attestation cost is under $8/month, inclusive of tag amortization, gateway infrastructure, connectivity, and on-chain transaction fees. For comparison, a single manual audit visit costs $200–500 per lot and provides only a point-in-time snapshot.
            </p>
          </section>

          {/* ─── Appendix A ─── */}
          <section id="appendix-a" className="mb-16 scroll-mt-20">
            <div className="h-px mb-12" style={{ backgroundColor: '#1E3154' }} />
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>Appendix A: Reference Hardware Implementation</h2>
            <p className="text-sm mb-6" style={S.body}>
              The following hardware selections represent the current reference implementation. These are subject to change as the vendor landscape evolves; the cryptographic protocol described in this paper is hardware-agnostic.
            </p>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Tag: BLE 5.0 Beacon</h3>
            <div className="space-y-2 mb-6">
              {[
                ['Protocol', 'Eddystone-EID compatible (HMAC-SHA256)'],
                ['Radio', 'Bluetooth Low Energy 5.0/5.1'],
                ['Power', 'CR2477 coin cell, 2–3 year lifespan at 1s broadcast interval'],
                ['Form factor', 'Adhesive-mount, tamper-evident housing'],
                ['Target unit cost', '$5–8 at 10K volume'],
              ].map(([k, v]) => (
                <div key={k} className="flex text-sm" style={S.body}>
                  <span className="w-36 flex-shrink-0 font-medium" style={S.muted}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Gateway: Solar BLE + Cellular</h3>
            <div className="space-y-2 mb-6">
              {[
                ['BLE scanning', 'Continuous, multi-channel (37, 38, 39)'],
                ['Backhaul', 'LTE-M / NB-IoT cellular'],
                ['Power', 'Solar panel + battery, designed for outdoor deployment'],
                ['Compute', 'ARM Cortex-M4 or equivalent, sufficient for Ed25519 signing'],
                ['Key storage', 'Secure element recommended (ATECC608B or equivalent)'],
                ['Coverage', '~50m radius outdoor (typical dealer lot)'],
                ['Target unit cost', '$150–300 at volume'],
              ].map(([k, v]) => (
                <div key={k} className="flex text-sm" style={S.body}>
                  <span className="w-36 flex-shrink-0 font-medium" style={S.muted}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4" style={S.heading}>Supply Chain Considerations</h3>
            <p className="text-sm" style={S.body}>
              Current reference hardware suppliers are primarily based in Shenzhen, China. At deployment scale, tariff exposure (Section 301 tariffs on Chinese electronics) must be evaluated. Alternative sourcing from Taiwan, South Korea, or domestic suppliers should be assessed during Phase 1 deployment planning. The protocol architecture is vendor-agnostic — any BLE 5.0 beacon and any gateway capable of Ed25519 signing can be substituted without protocol changes.
            </p>
          </section>

          {/* ─── Appendix B ─── */}
          <section id="appendix-b" className="mb-16 scroll-mt-20">
            <div className="h-px mb-12" style={{ backgroundColor: '#1E3154' }} />
            <h2 className="text-2xl font-semibold mb-6" style={S.heading}>Appendix B: Standards &amp; Specifications Reference</h2>
            <div style={S.card}>
              <div className="space-y-4 text-sm" style={S.body}>
                {[
                  ['Eddystone-EID', 'Google, Apache 2.0 License', 'Ephemeral identifier generation via HMAC-SHA256'],
                  ['Ed25519', 'RFC 8032', 'Gateway attestation signing'],
                  ['HMAC-SHA256', 'RFC 2104 / FIPS 198-1', 'Ephemeral ID rotation, Identity Key computation'],
                  ['SHA-256', 'FIPS 180-4', 'VIN hashing, Identity Key commitments, Merkle tree'],
                  ['ML-DSA', 'NIST FIPS 204 (August 2024)', 'Planned post-quantum gateway signing migration'],
                  ['BLE 5.0/5.1', 'Bluetooth SIG', 'Physical layer radio protocol'],
                  ['Merkle Trees', 'RFC 6962 (Certificate Transparency)', 'Device registry integrity anchoring'],
                  ['W3C DID', 'W3C Decentralized Identifiers v1.0', 'Gateway identity framework (planned)'],
                  ['Substrate', 'Parity Technologies', 'On-chain runtime environment (Vara Network)'],
                  ['CBOR', 'RFC 8949', 'Compact attestation payload encoding'],
                ].map(([name, spec, usage]) => (
                  <div key={name} className="flex items-start gap-4 py-2" style={{ borderBottom: '1px solid #1E3154' }}>
                    <span className="w-32 flex-shrink-0 font-medium" style={S.heading}>{name}</span>
                    <span className="w-48 flex-shrink-0 text-xs" style={S.dim}>{spec}</span>
                    <span className="text-xs" style={S.muted}>{usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Document Footer ─── */}
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid #1E3154' }}>
            <div className="text-xs space-y-2" style={S.dim}>
              <p>
                <strong style={S.muted}>ANVL Finance LLC</strong> · Wyoming, USA · anvllabs.io
              </p>
              <p>
                This document is confidential and intended for authorized recipients only.
                Distribution without written consent is prohibited.
              </p>
              <p>
                Version 1.0 · March 2026
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
