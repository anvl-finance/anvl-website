'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';

interface FAQItem {
  question: string;
  shortAnswer: string;
  learnMore?: string;
  relatedLinks?: { text: string; href: string }[];
}

interface FAQSection {
  id: string;
  title: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [contactEmail, setContactEmail] = useState('');

  const faqSections: FAQSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      items: [
        {
          question: 'What is ANVL?',
          shortAnswer: 'ANVL is a fintech platform that tokenizes dealer floorplan financing, turning verified vehicle collateral and credit exposures into transparent, digital assets.',
          learnMore: 'Traditional floorplan financing suffers from manual audits, information gaps, and fraud-driven costs. ANVL addresses these problems by combining cryptographic NFC proof-of-presence with AI-verified collateral records. Each financed vehicle carries a unique NFC tag that produces signed verification events, creating an immutable audit trail. This approach brings clarity to collateral status, compresses audit cycles, and enables institutional-grade liquidity for an asset class that has historically been opaque.',
          relatedLinks: [
            { text: 'How It Works', href: '/' },
            { text: 'Whitepaper', href: '/whitepaper' }
          ]
        },
        {
          question: 'What does "tokenized floorplan financing" mean in practice?',
          shortAnswer: 'Each financed vehicle is represented as a digital collateral record with verifiable events. Credit exposures linked to those records can be administered and reported on a shared ledger.',
          learnMore: 'Consider a dealer with 120 vehicles on the lot. In traditional floorplan financing, lenders rely on periodic physical audits to verify collateral. With ANVL, each vehicle receives a cryptographic NFC tag at acquisition. When the dealer taps the tag with their phone, it generates a signed verification event that updates the digital collateral record. These records live on a permissioned ledger, providing real-time visibility into collateral status. Credit exposures tied to these verified assets can be tracked, reported, and potentially traded with institutional-grade transparency—all while cash flows remain fiat-native through standard ACH rails.',
          relatedLinks: [
            { text: 'For Dealers', href: '/?view=dealers' },
            { text: 'Technology Overview', href: '/?view=investors' }
          ]
        },
        {
          question: 'Who is ANVL for?',
          shortAnswer: 'Independent auto dealers, institutional investors, and partners who need transparent, auditable credit workflows.',
          learnMore: 'ANVL serves three primary audiences. Independent auto dealers gain access to faster capital with reduced audit overhead and potentially better financing terms through verified collateral. Institutional investors access transparent, asset-backed credit exposures with real-time verification and measurable risk controls. Partners including banks, title agents, and DMS providers benefit from cleaner exception handling and faster reconciliation without changing existing workflows.',
          relatedLinks: [
            { text: 'Dealer Benefits', href: '/?view=dealers' },
            { text: 'Investor Program', href: '/?view=investors' }
          ]
        },
        {
          question: 'What problems does ANVL solve for the market?',
          shortAnswer: 'Reduces information gaps, compresses audit cycles, and improves access to capital.',
          learnMore: 'The floorplan financing market suffers from structural inefficiencies. Manual audits create lag between collateral status and lender visibility, leading to out-of-trust situations and elevated loss rates. This information asymmetry drives up costs for dealers and limits institutional participation. ANVL addresses these issues by providing continuous verification through cryptographic proof-of-presence. This reduces the time between verification events from weeks to days, lowers operational risk for lenders, and creates the transparency needed for institutional capital to enter the market at scale.',
          relatedLinks: [
            { text: 'Business Model', href: '/?view=investors' },
            { text: 'Risk Controls', href: '/?view=investors' }
          ]
        }
      ]
    },
    {
      id: 'dealers',
      title: 'Dealers',
      items: [
        {
          question: 'How do dealers onboard? What information is required?',
          shortAnswer: 'KYC/KYB, inventory basics (VIN, purchase details), and account verification.',
          learnMore: 'Dealer onboarding follows a structured seven-step process: (1) Create account with business information and principal details; (2) Complete KYC/KYB verification including business registration and tax documentation; (3) Connect bank account via ACH for draw and payoff processing; (4) Add authorized users with role-based permissions; (5) Receive NFC tag shipment with cryptographic credentials; (6) Tag active inventory units with VIN, mileage, photos, and title status; (7) Perform first verification scans to establish baseline. The entire process typically completes within 5-7 business days. No crypto wallet or blockchain knowledge is required—the entire workflow is fiat-native.',
          relatedLinks: [
            { text: 'Dealer Onboarding', href: '/?view=dealers' },
            { text: 'Contact Us', href: '/contact' }
          ]
        },
        {
          question: 'How are vehicles verified without slowing sales?',
          shortAnswer: 'Dealers attach a cryptographic NFC tag and perform quick presence scans during normal operations.',
          learnMore: 'The verification process is designed for lot flow efficiency: (1) Apply the NFC tag to the windshield during vehicle intake—takes under 30 seconds; (2) Open the ANVL mobile app and tap the tag with your phone; (3) The tag generates a signed challenge-response using its internal cryptographic key; (4) ANVL gateway verifies the signature, checks the monotone counter to prevent replay attacks, and validates location sanity; (5) The collateral record updates in real-time and appears in your dashboard. Each scan takes 5-10 seconds. Recommended cadence is weekly, but the system adapts based on your sales velocity and compliance history. Scanning integrates naturally into existing lot walks or recon processes.',
          relatedLinks: [
            { text: 'How It Works', href: '/?view=dealers' },
            { text: 'Dealer Tools', href: '/?view=dealers' }
          ]
        },
        {
          question: 'Does tokenization change how titles and payoffs work?',
          shortAnswer: 'No. Title and payoff workflows remain standard; ANVL adds verifiable records and reporting.',
          learnMore: 'ANVL operates as a thin verification layer on top of existing title and payoff processes. When you acquire a vehicle, you still work with your title agent as usual. When you sell a unit, you still process payoff through your lender and release the title through standard channels. What changes is the audit trail: each verification scan creates a timestamped, signed record that proves the vehicle was on your lot at a specific time. This evidence accelerates exception resolution and title reconciliation because lenders can see verification history without scheduling physical audits. Your DMS, banking relationships, and title workflows remain unchanged.',
          relatedLinks: [
            { text: 'Dealer FAQ', href: '/?view=dealers' },
            { text: 'Integration', href: '/contact' }
          ]
        },
        {
          question: 'What happens when a car sells?',
          shortAnswer: 'Sale triggers payoff and record updates; the vehicle\'s digital record closes out.',
          learnMore: 'The sale workflow follows a simple event chain: (1) Mark the unit as sold in ANVL (or sync from your DMS if integrated); (2) Process payoff through your existing lender relationship via ACH; (3) ANVL receives payoff confirmation and updates the collateral record to "closed"; (4) The verification history remains in the audit trail for compliance purposes; (5) The NFC tag can be removed and recycled or left on the vehicle (it becomes inert once the record closes). The entire process mirrors your current workflow with the addition of automatic record-keeping and faster reconciliation.',
          relatedLinks: [
            { text: 'Dealer Workflow', href: '/?view=dealers' }
          ]
        },
        {
          question: 'What if a scan is missed or a tag is damaged?',
          shortAnswer: 'The system flags exceptions; dealers can re-scan or replace tags quickly.',
          learnMore: 'Missed scans and damaged tags are handled through the exception workflow: If a scan is missed, ANVL sends a reminder notification and flags the unit in your dashboard. You can re-scan immediately to clear the exception. If multiple scans are missed, the system may escalate to manual review or request additional verification. For damaged tags, you can request a replacement through the app—new tags ship within 24 hours. The replacement process takes under 5 minutes: remove the old tag, apply the new one, and perform an initial scan. The verification history transfers to the new tag automatically, maintaining audit continuity. Support is available via in-app chat or email for any exception handling questions.',
          relatedLinks: [
            { text: 'Support', href: '/contact' }
          ]
        }
      ]
    },
    {
      id: 'investors',
      title: 'Investors',
      items: [
        {
          question: 'What do investors actually get exposure to?',
          shortAnswer: 'Credit exposures tied to verified vehicle collateral and associated cash flows.',
          learnMore: 'Investors gain exposure to short-tenor dealer credit secured by continuously verified vehicle collateral. Each credit exposure is backed by specific vehicles with cryptographic proof-of-presence, creating a transparent link between the financial instrument and the underlying asset. Cash flows come from dealer interest payments and principal repayments on a rolling basis, with average loan cycles of 35-40 days. All exposures are data-rich: investors can see verification history, exception rates, dealer performance metrics, and collateral status in real-time through the investor dashboard. Settlement occurs via fiat ACH rails, while auditability and policy controls live on a permissioned ledger. This structure provides institutional-grade transparency without requiring investors to hold crypto or interact with blockchain infrastructure directly.',
          relatedLinks: [
            { text: 'Investor Program', href: '/?view=investors' },
            { text: 'Business Model', href: '/?view=investors' }
          ]
        },
        {
          question: 'Is this a marketplace or a private placement workflow?',
          shortAnswer: 'The platform supports structured, compliant access to floorplan credit exposures.',
          learnMore: 'ANVL operates as a structured credit platform, not a public marketplace. Access to credit exposures occurs through compliant private placement workflows under applicable exemptions (e.g., Regulation D or Regulation S). Offerings are made solely through definitive documentation including private placement memoranda, subscription agreements, and risk disclosures. The platform provides the infrastructure for origination, verification, servicing, and reporting, while capital formation follows traditional institutional channels. This approach ensures regulatory compliance while leveraging technology for operational efficiency and transparency. Interested investors should contact us directly to discuss specific offering structures and documentation.',
          relatedLinks: [
            { text: 'Contact Investor Relations', href: '/contact' },
            { text: 'Disclosures', href: '/?view=investors' }
          ]
        },
        {
          question: 'How are returns generated and distributed?',
          shortAnswer: 'From underlying financing activity and fees within the floorplan lifecycle.',
          learnMore: 'Returns are generated through the floorplan financing lifecycle: ANVL earns revenue from loan origination fees (0.5-1.0% of principal), servicing fees (0.25-0.5% annualized), and risk-tech fees (0.10-0.25%) charged on financed throughput. Net revenue flows through a documented waterfall structure that allocates to operations, reserves, dividends, and potential buybacks or token burns. The waterfall targets approximately 40% to dividends, 10% to buybacks/burns, and 50% to treasury, though these allocations are subject to policy guardrails and may adjust based on operational needs and performance. Distributions occur on a defined schedule outlined in offering documents. All targets are illustrative and not guarantees—actual returns depend on pool performance, loss rates, and market conditions.',
          relatedLinks: [
            { text: 'Revenue Model', href: '/?view=investors' },
            { text: 'Request Memo', href: '/contact' }
          ]
        },
        {
          question: 'What risks should investors consider?',
          shortAnswer: 'Credit, operational, and market risks exist; verification lowers uncertainty but does not eliminate risk.',
          learnMore: 'Investors should consider multiple risk categories: Credit risk includes dealer defaults, vehicle depreciation, and recovery challenges. Operational risk encompasses verification system failures, fraud attempts, and exception handling. Market risk involves changes in used vehicle values, interest rates, and dealer industry conditions. Technology risk includes NFC tag failures, software bugs, and cybersecurity threats. Regulatory risk covers potential changes in securities laws, lending regulations, or data privacy requirements. Liquidity risk exists as these are private placements with limited secondary markets. While ANVL\'s verification system reduces information asymmetry and operational risk compared to traditional floorplan financing, it does not eliminate these risks. Detailed risk factors are outlined in offering documents and should be reviewed carefully before investing.',
          relatedLinks: [
            { text: 'Risk Controls', href: '/?view=investors' },
            { text: 'Legal Disclosures', href: '/?view=investors' }
          ]
        }
      ]
    },
    {
      id: 'process',
      title: 'Process & Verification',
      items: [
        {
          question: 'How does the verification process work?',
          shortAnswer: 'Vehicles carry cryptographic tags; dealer scans produce signed verification events recorded against the digital collateral record.',
          learnMore: 'The verification process uses NTAG424 DNA chips with AES-128 cryptographic capabilities: (1) Dealer taps the NFC tag with their phone through the ANVL app; (2) The tag receives a random challenge from the gateway and generates a signed response using its internal key; (3) The gateway validates the signature, checks that the counter has incremented (preventing replay attacks), and performs sanity checks on location and timing; (4) Upon successful validation, the verification event is recorded with timestamp, counter value, and context metadata; (5) The collateral record updates in real-time, visible to authorized parties through the dashboard; (6) Exception handling triggers if validation fails or patterns appear anomalous. The entire process takes 5-10 seconds and requires no specialized hardware beyond a standard NFC-enabled smartphone.',
          relatedLinks: [
            { text: 'Technology Overview', href: '/?view=investors' },
            { text: 'How It Works', href: '/?view=dealers' }
          ]
        },
        {
          question: 'What data is captured during a verification event?',
          shortAnswer: 'A signed bundle that may include time, context, and vehicle reference.',
          learnMore: 'Each verification event captures a minimal, integrity-checked data bundle: timestamp of the scan, cryptographic signature from the NFC tag, monotone counter value, vehicle identifier (VIN or internal reference), and optional context such as GPS coordinates (if permissions granted) and user identifier. Personally identifiable information is minimized—the system does not capture photos, detailed location history, or unnecessary dealer data. All captured data is hashed and recorded to create an immutable audit trail. The verification record proves that a specific tag was present at a specific time, without revealing sensitive operational details. Data retention follows documented policies and complies with applicable privacy regulations.',
          relatedLinks: [
            { text: 'Data & Privacy', href: '#data' },
            { text: 'Privacy Policy', href: '/privacy' }
          ]
        },
        {
          question: 'How often do dealers need to verify inventory?',
          shortAnswer: 'On a policy-driven schedule designed to balance assurance and workflow.',
          learnMore: 'Verification cadence is policy-driven and adapts to dealer performance. The recommended baseline is weekly scans for all active inventory. High-performing dealers with strong compliance history may qualify for reduced frequency (e.g., bi-weekly). Dealers with exception history or higher-risk profiles may require more frequent verification (e.g., twice weekly). The system sends automated reminders before scans are due and flags units that miss scheduled verifications. Cadence can be adjusted based on factors including dealer tenure, sales velocity, exception rates, and collateral concentration. The goal is to maintain continuous assurance without creating operational burden—most dealers find that weekly scans integrate naturally into existing lot management routines.',
          relatedLinks: [
            { text: 'Dealer Onboarding', href: '/?view=dealers' }
          ]
        },
        {
          question: 'How are fraudulent scans or tag cloning addressed?',
          shortAnswer: 'Multiple defenses including cryptographic challenge-response, context checks, and re-audit selection.',
          learnMore: 'ANVL employs layered anti-fraud controls: Cryptographic defense uses AES-128 challenge-response with unique per-tag keys stored in tamper-resistant hardware—cloning requires extracting keys from the secure element, which is extremely difficult. Counter validation ensures each scan increments a monotone counter; any counter regression or duplication triggers immediate exception. Context analysis examines patterns including scan timing, location consistency, and user behavior; anomalies flag for review. Random re-audits select a sample of units for physical verification to validate the verification system itself. Exception escalation routes suspicious patterns to manual review with potential consequences including line reduction, unit pull, or dealer suspension. These controls work together to make fraud economically irrational while maintaining operational efficiency for compliant dealers.',
          relatedLinks: [
            { text: 'Risk Controls', href: '/?view=investors' },
            { text: 'Technology', href: '/?view=investors' }
          ]
        }
      ]
    },
    {
      id: 'risk',
      title: 'Risk & Controls',
      items: [
        {
          question: 'How does ANVL reduce out-of-trust risk?',
          shortAnswer: 'By compressing audit intervals and providing real-time visibility into collateral status.',
          learnMore: 'Out-of-trust risk occurs when vehicles leave dealer lots without lender knowledge, creating undetected collateral shortfalls. Traditional floorplan financing relies on monthly or quarterly physical audits, leaving weeks of exposure. ANVL compresses this window to days through continuous verification. Weekly scans (or more frequent for higher-risk dealers) provide near-real-time collateral status. Exception alerts trigger immediately when scans are missed or patterns appear anomalous. Policy-based controls can automatically tighten requirements or reduce credit availability when exception rates rise. This continuous monitoring transforms out-of-trust from an undetected risk into a managed exception workflow, significantly reducing loss exposure for lenders and enabling better pricing for dealers.',
          relatedLinks: [
            { text: 'Risk Controls', href: '/?view=investors' },
            { text: 'How It Works', href: '/?view=dealers' }
          ]
        },
        {
          question: 'What happens when anomalies are detected?',
          shortAnswer: 'The system flags the unit, may tighten policy based on rules, and requests follow-up.',
          learnMore: 'Anomaly detection triggers a structured escalation workflow: Level 1 (minor) includes missed scans or timing irregularities—dealer receives notification and reminder to re-scan. Level 2 (moderate) includes multiple missed scans or pattern anomalies—unit is flagged in exception queue and may require manual verification or photo upload. Level 3 (severe) includes suspected fraud, counter anomalies, or repeated non-compliance—may trigger line reduction, unit pull request, or escalation to credit review. All exceptions are documented with timestamps and resolution paths. Dealers can view exception status in their dashboard and resolve issues through the app. Persistent exception patterns may result in increased verification frequency, reduced credit availability, or dealer suspension pending investigation.',
          relatedLinks: [
            { text: 'Exception Handling', href: '/?view=dealers' },
            { text: 'Support', href: '/contact' }
          ]
        },
        {
          question: 'How are models and policies governed?',
          shortAnswer: 'Policies are reviewable, versioned, and subject to risk oversight.',
          learnMore: 'Model and policy governance follows institutional standards: All risk models (credit scoring, exception detection, loss forecasting) are versioned with full lineage tracking. Model changes undergo challenger/champion testing with backtesting against historical data. Third-party audits validate model performance and bias detection. Policy changes (verification cadence, exception thresholds, concentration limits) are documented with effective dates and rationale. A risk committee reviews model performance quarterly and approves material changes. Investors receive transparency into model governance through regular reporting. This governance framework ensures that risk controls remain effective as the program scales while maintaining auditability for regulatory and investor diligence.',
          relatedLinks: [
            { text: 'Institutional Build Blocks', href: '/?view=investors' },
            { text: 'Request Documentation', href: '/contact' }
          ]
        }
      ]
    },
    {
      id: 'fees',
      title: 'Fees & Economics',
      items: [
        {
          question: 'What fees exist in the floorplan lifecycle?',
          shortAnswer: 'Standard categories include origination, servicing, and risk fees; dealer incentives may apply.',
          learnMore: 'The fee structure includes four primary categories: Loan Origination (0.5-1.0% of principal) covers underwriting, onboarding, and initial setup. Servicing (0.25-0.5% annualized) covers ongoing monitoring, reporting, and exception handling. Risk-Tech (0.10-0.25%) covers AI scoring, verification infrastructure, and fraud detection. Dealer Incentives (under 1.0%) may reward scan compliance, payoff discipline, and portfolio performance. All fees are charged on financed throughput and disclosed in dealer agreements. Fee levels may vary based on dealer credit profile, verification history, and program participation. Detailed fee schedules are provided during onboarding and outlined in definitive documentation.',
          relatedLinks: [
            { text: 'Revenue Model', href: '/?view=investors' },
            { text: 'Dealer Onboarding', href: '/contact' }
          ]
        },
        {
          question: 'How does the revenue waterfall work at a high level?',
          shortAnswer: 'Revenue funds operations and may allocate to distributions and reserves per policy.',
          learnMore: 'The revenue waterfall follows a structured allocation framework: Gross revenue from fees flows into the program. Operating expenses (personnel, technology, compliance) are paid first. Net revenue then allocates according to policy guardrails: approximately 40% to dividends or distributions, 10% to buybacks or token burns (if applicable), and 50% to treasury reserves for growth and risk buffers. These allocations are targets and may adjust based on operational needs, loss experience, and growth stage. Early-stage operations may retain more in treasury; mature operations may increase distribution percentages. All waterfall mechanics are documented in offering materials and subject to governance oversight. Investors receive regular reporting on revenue, expenses, and distributions.',
          relatedLinks: [
            { text: 'Business Model', href: '/?view=investors' },
            { text: 'Request Investor Memo', href: '/contact' }
          ]
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal',
      items: [
        {
          question: 'Is this an offer of securities?',
          shortAnswer: 'No. This page is informational only. Any offering, if applicable, occurs on compliant venues under valid exemptions.',
          learnMore: 'This website and FAQ page are for informational and educational purposes only. Nothing on this site constitutes an offer to sell or a solicitation to buy any security. Any offerings of securities, if and when they occur, are made solely through definitive documentation including private placement memoranda, subscription agreements, and risk disclosures, and only to qualified investors under applicable exemptions such as Regulation D (Rule 506) or Regulation S. Prospective investors must review all offering documents carefully and consult with legal, tax, and financial advisors before making any investment decision. ANVL Finance LLC is not a registered broker-dealer or investment advisor.',
          relatedLinks: [
            { text: 'Legal Disclosures', href: '/?view=investors' },
            { text: 'Contact Investor Relations', href: '/contact' }
          ]
        },
        {
          question: 'Which geographies are supported?',
          shortAnswer: 'Coverage is staged and policy-based.',
          learnMore: 'ANVL initially focuses on the United States market, with dealer onboarding prioritized in states with favorable regulatory frameworks and strong independent dealer populations. Geographic expansion follows a staged approach based on regulatory clarity, market opportunity, and operational readiness. International expansion may occur in jurisdictions with clear fintech and digital asset regulations. Specific state and country availability is subject to licensing requirements, compliance review, and partnership infrastructure. Contact us to inquire about availability in your jurisdiction.',
          relatedLinks: [
            { text: 'Contact Us', href: '/contact' }
          ]
        },
        {
          question: 'What disclosures are available?',
          shortAnswer: 'Privacy, terms, and platform disclosures are published on the site.',
          learnMore: 'ANVL maintains comprehensive disclosure documentation including Privacy Policy (data collection, usage, and protection practices), Terms of Service (platform usage terms and conditions), Platform Disclosures (operational risks, limitations, and disclaimers), Investor Disclosures (risk factors, offering terms, and performance disclaimers), and Dealer Agreements (financing terms, verification requirements, and fee schedules). All disclosures are available on the website and updated as needed to reflect operational changes or regulatory requirements. Users are encouraged to review all applicable disclosures before using the platform or participating in any offerings.',
          relatedLinks: [
            { text: 'Privacy Policy', href: '/privacy' },
            { text: 'Terms of Service', href: '/terms' },
            { text: 'Legal', href: '/?view=investors' }
          ]
        }
      ]
    },
    {
      id: 'data',
      title: 'Data & Privacy',
      items: [
        {
          question: 'What dealer data is collected?',
          shortAnswer: 'Business identity, inventory, and verification events necessary for financing.',
          learnMore: 'ANVL collects data necessary for floorplan financing operations: Business identity (company name, EIN, registration, principals), Inventory data (VIN, make, model, year, mileage, purchase details, photos), Verification events (scan timestamps, tag signatures, counters), Financial data (bank account for ACH, draw and payoff history), and User data (authorized users, roles, contact information). Data collection follows minimization principles—we collect only what is necessary for financing, verification, and compliance. Sensitive data is encrypted at rest and in transit. Access is role-based and logged. Data retention follows documented policies and regulatory requirements. Dealers can request data access or deletion subject to legal and operational constraints.',
          relatedLinks: [
            { text: 'Privacy Policy', href: '/privacy' },
            { text: 'Data Security', href: '/contact' }
          ]
        },
        {
          question: 'Who can access verification records?',
          shortAnswer: 'Access is role-based and policy-controlled.',
          learnMore: 'Verification record access follows strict role-based controls: Dealers can view their own inventory and verification history. Lenders can view verification records for units they finance. Investors can view aggregated pool statistics and anonymized verification metrics. Auditors and regulators can access records subject to proper authorization and legal process. ANVL personnel access records only as needed for operations, support, and compliance. All access is logged with timestamps and user identifiers. Verification records are stored on a permissioned ledger with cryptographic access controls. Unauthorized access attempts trigger security alerts. Data sharing with third parties occurs only with proper authorization and under documented agreements.',
          relatedLinks: [
            { text: 'Privacy Policy', href: '/privacy' },
            { text: 'Security', href: '/contact' }
          ]
        },
        {
          question: 'How is personal information handled?',
          shortAnswer: 'Data minimization and compliance with applicable privacy rules.',
          learnMore: 'ANVL handles personal information in compliance with applicable privacy regulations including CCPA, GDPR (where applicable), and financial privacy laws. Practices include data minimization (collecting only necessary information), purpose limitation (using data only for stated purposes), security safeguards (encryption, access controls, monitoring), retention limits (deleting data when no longer needed), and user rights (access, correction, deletion requests). Personal information is not sold or shared for marketing purposes. Third-party service providers are vetted and bound by data protection agreements. Privacy practices are documented in our Privacy Policy and subject to regular review and updates.',
          relatedLinks: [
            { text: 'Privacy Policy', href: '/privacy' },
            { text: 'Contact Privacy Team', href: '/contact' }
          ]
        }
      ]
    },
    {
      id: 'roadmap',
      title: 'Roadmap & Support',
      items: [
        {
          question: 'What is ANVL building next?',
          shortAnswer: 'Controlled scaling of dealer onboarding, verification features, and reporting.',
          learnMore: 'ANVL\'s roadmap focuses on controlled scaling and feature enhancement: Near-term priorities include expanding dealer onboarding capacity, enhancing mobile app features (offline scanning, batch operations), improving exception handling workflows, and building investor reporting dashboards. Medium-term goals include DMS integrations for automated inventory sync, advanced AI risk models, secondary market infrastructure for credit exposures, and geographic expansion. Long-term vision includes multi-asset class expansion beyond auto dealers, institutional-grade trading infrastructure, and regulatory engagement for broader market adoption. Detailed quarterly milestones are available on the Roadmap page.',
          relatedLinks: [
            { text: 'Roadmap', href: '/roadmap' },
            { text: 'Whitepaper', href: '/whitepaper' }
          ]
        },
        {
          question: 'How do I get support or a demo?',
          shortAnswer: 'Use the contact form or email investors@anvl.finance.',
          learnMore: 'Support and demo requests can be submitted through multiple channels: Contact form on the website (response within 24 hours for dealers, 48 hours for investors), Email at investors@anvl.finance for investor inquiries or dealers@anvl.finance for dealer questions, In-app support chat for existing users (available during business hours), and Scheduled demos for qualified prospects (request through contact form). Demo sessions typically last 30-45 minutes and cover platform overview, verification workflow, dashboard features, and onboarding process. For technical support, existing users can access help documentation and video tutorials through the app.',
          relatedLinks: [
            { text: 'Contact Us', href: '/contact' },
            { text: 'Request Demo', href: '/contact' }
          ]
        }
      ]
    }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return faqSections;

    const query = searchQuery.toLowerCase();
    return faqSections
      .map(section => ({
        ...section,
        items: section.items.filter(
          item =>
            item.question.toLowerCase().includes(query) ||
            item.shortAnswer.toLowerCase().includes(query) ||
            item.learnMore?.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.items.length > 0);
  }, [searchQuery, faqSections]);

  const toggleItem = (sectionId: string, itemIndex: number) => {
    const key = `${sectionId}-${itemIndex}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Thank you! We\'ll respond within 24 hours.');
    setContactEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A] border-b border-white/10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-white">
              ANVL<span className="text-[#E4312D]">.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/?view=dealers" className="text-sm font-medium text-[#AAB1B9] hover:text-white transition-colors">
                For Dealers
              </Link>
              <Link href="/?view=investors" className="text-sm font-medium text-[#AAB1B9] hover:text-white transition-colors">
                For Investors
              </Link>
              <Link href="/faq" className="text-sm font-medium text-white transition-colors">
                FAQ
              </Link>
              <Link href="/contact">
                <Button size="sm" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                  Contact
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0D1B2A]">
            <div className="px-6 py-4 space-y-3">
              <Link href="/?view=dealers" className="block text-sm font-medium text-[#AAB1B9]" onClick={() => setMobileMenuOpen(false)}>
                For Dealers
              </Link>
              <Link href="/?view=investors" className="block text-sm font-medium text-[#AAB1B9]" onClick={() => setMobileMenuOpen(false)}>
                For Investors
              </Link>
              <Link href="/faq" className="block text-sm font-medium text-white" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1]">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#C9CDD3] leading-relaxed">
              Comprehensive answers about ANVL\'s tokenized floorplan financing model, dealer onboarding, verification, controls, fees, compliance, and roadmap. This page complements our Home, How It Works, Dealers, Investors, Whitepaper, and Roadmap pages.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#AAB1B9]" />
              <Input
                type="text"
                placeholder="Search questions and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-[#AAB1B9] h-12"
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {faqSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-4 py-2 text-sm font-medium text-[#C9CDD3] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-20 px-6">
        <div className="max-w-[900px] mx-auto">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-[#AAB1B9]">No results found for "{searchQuery}". Try different keywords.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredSections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-3xl font-semibold text-white mb-8">{section.title}</h2>
                  <div className="space-y-4">
                    {section.items.map((item, index) => {
                      const key = `${section.id}-${index}`;
                      const isExpanded = expandedItems.has(key);
                      return (
                        <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                          <button
                            onClick={() => toggleItem(section.id, index)}
                            className="w-full px-6 py-5 text-left flex justify-between items-start gap-4 hover:bg-white/5 transition-colors"
                            aria-expanded={isExpanded}
                          >
                            <span className="text-lg font-medium text-white leading-tight">{item.question}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-[#AAB1B9] flex-shrink-0 mt-1 transition-transform ${
                                isExpanded ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="px-6 pb-6 space-y-4">
                              <p className="text-[#C9CDD3] leading-relaxed">{item.shortAnswer}</p>
                              {item.learnMore && (
                                <div className="pt-4 border-t border-white/10">
                                  <p className="text-sm font-semibold text-white mb-2">Learn more</p>
                                  <p className="text-sm text-[#C9CDD3] leading-relaxed">{item.learnMore}</p>
                                </div>
                              )}
                              {item.relatedLinks && item.relatedLinks.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {item.relatedLinks.map((link, linkIndex) => (
                                    <Link
                                      key={linkIndex}
                                      href={link.href}
                                      className="text-sm text-[#E4312D] hover:underline"
                                    >
                                      {link.text} →
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-[#0D1B2A]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Still have questions?</h2>
            <p className="text-[#C9CDD3] mb-6">
              Contact us directly and we\'ll respond within 24 hours.
            </p>
            <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your work email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-[#AAB1B9]"
                required
              />
              <Button type="submit" className="bg-[#E4312D] hover:bg-[#E4312D]/90 text-white">
                Contact Us
              </Button>
            </form>
            <p className="text-sm text-[#AAB1B9] mt-4">
              Or visit our <Link href="/contact" className="text-[#E4312D] hover:underline">contact page</Link> for more options.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Disclosure */}
      <section className="py-12 px-6 bg-[#0D1B2A] border-t border-white/10">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <p className="text-sm text-[#AAB1B9] leading-relaxed">
              <strong className="text-white">Legal Notice:</strong> This page is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any security. Any offerings, if applicable, occur on compliant venues under valid exemptions and documentation. All targets and projections are illustrative and not guarantees of future performance. Prospective investors should review all offering documents and consult with legal, tax, and financial advisors before making any investment decision.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] border-t border-white/10 py-12 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/" className="hover:text-white transition-colors">Overview</Link></li>
                <li><Link href="/?view=dealers" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Dealer Onboarding</Link></li>
                <li><Link href="/?view=investors" className="hover:text-white transition-colors">Investor Access</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-[#AAB1B9]">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/?view=investors" className="hover:text-white transition-colors">Disclosures</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-[#AAB1B9]">
            <p className="mb-2">Copyright © ANVL Finance LLC. All rights reserved.</p>
            <p>
              Information is illustrative and not a commitment to lend. Investor content is not an offer of securities; any offer is made solely through definitive documents under applicable exemptions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}