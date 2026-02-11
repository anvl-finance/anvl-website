# ANVL Finance - Floorplan Financing, Simplified

A modern, institutional-grade dual-audience website for ANVL Finance LLC, a Wyoming-registered fintech company developing an AI-verified floorplan financing platform with cryptographic NFC proof-of-presence for independent auto dealers and institutional investors.

## Overview

ANVL delivers AI-verified floorplan financing with cryptographic NFC proof-of-presence. Faster turns and cleaner audit trails without changing your banking, titles, or DMS. This website serves as the primary digital presence with separate experiences for dealers and investors.

## Features

### Core Features
- 🔄 **Dual-Audience Experience**: Toggle between Dealer and Investor variants
- 🏠 **Dealer Landing**: How it works, value tiles, impact calculator, onboarding flow, tools, social proof
- 💼 **Investor Landing**: Program overview, business model, fee chart, risk controls, institutional build blocks, technology overview, KPIs
- 📊 **KPI Strip**: Real-time metrics with tooltips (avg loan cycle, APR bands, net margin, capital turnover)
- 🧮 **Impact Calculator**: Interactive calculator for dealers to estimate savings and gross lift
- 📝 **Dual Forms**: Separate onboarding forms for dealers and investor memo requests
- ❓ **Comprehensive FAQ**: Searchable FAQ page with 40+ questions across 9 categories (Overview, Dealers, Investors, Process & Verification, Risk & Controls, Fees & Economics, Compliance & Legal, Data & Privacy, Roadmap & Support)
- 📱 **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop devices
- ♿ **Accessible**: WCAG 2.2 AA compliant design with proper contrast and keyboard navigation
- ⚡ **Performance Optimized**: Fast loading with Next.js 14 App Router

### Design System
- **Color Palette**: Dark navy (#0D1B2A), white (#FFFFFF), neutral grays (#C9CDD3, #AAB1B9), red accent (#E4312D)
- **Typography**: Inter SemiBold for headlines, Inter Regular for body
- **Layout**: 12-column grid, max-width 1160px, 8px base spacing unit
- **Motion**: Subtle opacity and y-translate on scroll, respects prefers-reduced-motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Fonts**: Inter (Google Fonts)
- **Icons**: Lucide React
- **Forms**: React state management with validation
- **Notifications**: Sonner
- **Deployment**: Vercel (recommended)

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, and structured data
│   ├── page.tsx                # Dual-audience landing page with variant toggle
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── whitepaper/
│   │   └── page.tsx            # Whitepaper page
│   ├── team/
│   │   └── page.tsx            # Team page
│   ├── roadmap/
│   │   └── page.tsx            # Roadmap page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── faq/
│   │   └── page.tsx            # FAQ page with searchable Q&A
│   └── globals.css             # Global styles and CSS variables
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── tooltip.tsx
│   │   └── ...
│   └── custom/
│       └── ToasterProvider.tsx # Toast notification provider
├── lib/
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript type definitions
```

## Key Sections

### Shared Elements (Both Variants)
- **Hero**: "Floorplan Financing, Simplified." with subheadline and KPI strip
- **KPI Strip**: 4 metrics with tooltips (avg loan cycle, dealer APR bands, program net margin, capital turnover)
- **CTA Buttons**: "Start financing inventory" and "View investor program"
- **Compliance Footnote**: Illustrative metrics disclaimer

### Dealer Variant (Default)
1. **How It Works**: 3-step process (Vehicle Financing/Acquisition, Tap-to-Verify, Finance/Sell/Pay Down)
2. **Micro FAQ**: Common dealer questions answered inline
3. **Value Tiles**: 4 benefits (Lower hassle, Faster turns, Bigger usable line, Zero rip-and-replace)
4. **Impact Math**: Interest savings and gross lift calculations with interactive calculator
5. **Dealer Onboarding**: 7-step visual checklist
6. **Dealer Tools**: Feature grid of platform capabilities
7. **Social Proof**: Testimonials from dealer principals
8. **Dealer Form**: Comprehensive onboarding form with validation

### Investor Variant
1. **Program Overview**: One-liner and bullet points on program structure
2. **Business Model**: Cash flow and waterfall explanation
3. **Fee Chart**: Revenue model table (Loan Origination, Servicing, Risk-Tech, Dealer Incentives)
4. **Risk Controls**: 6 risk management areas with detailed explanations
5. **Institutional Build Blocks**: Document request list with download placeholders
6. **Technology at a Glance**: High-level tech architecture overview
7. **Program KPIs**: 5 key performance indicators with definitions
8. **Investor Form**: Memo request form with accredited investor acknowledgment
9. **Investor Disclaimer**: Legal disclaimer for securities compliance

## Variant Toggle

- **Default**: Dealer variant loads by default
- **URL Parameter**: `?view=investors` switches to investor variant
- **Header Toggle**: Persistent toggle buttons in header navigation
- **State Management**: Client-side state with URL sync
- **SEO**: Canonical URL is root `/`, proper meta tags per variant

## FAQ Page

Comprehensive FAQ page with 40+ questions organized into 9 categories:

### Categories
1. **Overview**: What is ANVL, tokenized floorplan financing, target audiences, market problems
2. **Dealers**: Onboarding process, verification workflow, title/payoff handling, sales process, exception handling
3. **Investors**: Exposure types, offering structure, returns, risk factors
4. **Process & Verification**: Verification mechanics, data capture, scan frequency, fraud prevention
5. **Risk & Controls**: Out-of-trust risk, anomaly detection, model governance
6. **Fees & Economics**: Fee structure, revenue waterfall
7. **Compliance & Legal**: Securities disclaimers, geographic coverage, disclosure availability
8. **Data & Privacy**: Data collection, access controls, privacy compliance
9. **Roadmap & Support**: Product roadmap, demo requests, support channels

### Features
- **Search Functionality**: Real-time search across all questions and answers
- **Section Navigation**: Quick jump links to each category
- **Accordion UI**: Expandable Q&A with short answers and detailed "Learn more" sections
- **Related Links**: Cross-references to relevant pages (How It Works, Dealers, Investors, Whitepaper, Roadmap, Contact)
- **Contact CTA**: Email capture form for additional questions
- **Legal Disclosure**: Prominent securities disclaimer footer
- **Keyboard Accessible**: Full keyboard navigation with ARIA-compliant accordions
- **Mobile Optimized**: Responsive design for all screen sizes

## Forms

### Dealer Onboarding Form
- Company, DBA, Contact Name, Email, Phone (required)
- Store Count, Avg Monthly Sales (required)
- DMS Name, Bank Name (optional)
- Privacy policy consent checkbox
- Validation: Email format, phone pattern, positive integers

### Investor Memo Request Form
- Firm Name, Role, Email (required)
- AUM Bracket, Jurisdiction (required)
- Message (optional)
- Accredited investor status checkbox
- Validation: Email format, required fields

## Performance

- **Target Metrics**:
  - LCP < 2.2s on mid-tier mobile
  - CLS < 0.05
  - TBT < 150ms
  - Page weight < 1.2MB (excluding fonts)
- **Optimization**:
  - Next.js Image component for optimized images
  - Code splitting and lazy loading
  - Preload critical fonts
  - Minimal JavaScript bundle

## Accessibility

- **WCAG 2.2 AA Compliance**:
  - Minimum 4.5:1 color contrast ratios
  - Keyboard navigation support
  - Focus states visible on all interactive elements
  - Tooltips keyboard accessible and dismissible
  - Proper heading hierarchy
  - Screen reader friendly labels
  - Motion respects prefers-reduced-motion

## SEO

- **Meta Tags**: Optimized title, description, keywords
- **Open Graph**: Proper OG tags for social sharing
- **Twitter Cards**: Summary large image card
- **Structured Data**: JSON-LD schema for FinancialService
- **Canonical URL**: Root `/` is canonical
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Variant Testing

- **Dealer variant**: [http://localhost:3000](http://localhost:3000)
- **Investor variant**: [http://localhost:3000?view=investors](http://localhost:3000?view=investors)

## Build for Production

```bash
npm run build
npm start
```

## Deployment

Recommended deployment platform: Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure domain (anvl.finance)
4. Deploy automatically on push
5. Ensure environment variables are set (if any)

## Key Implementation Details

### FAQ Page Structure
- **40+ Questions**: Comprehensive coverage of dealer, investor, and operational topics
- **9 Categories**: Organized by audience and topic for easy navigation
- **Search**: Client-side filtering across questions, short answers, and detailed explanations
- **Accordion Pattern**: ARIA-compliant expandable sections with keyboard support
- **Cross-Links**: Internal links to relevant pages throughout the site
- **Compliance-Aware**: No prohibited entities (SAFE Trust Co., CCT, Sukuks, AAVE) mentioned
- **No Hype**: Professional, institutional tone without emojis or decorative icons
- **SEO Optimized**: Semantic HTML with proper heading hierarchy

### Global Replacement
- All instances of "Vehicle Registration" replaced with "Vehicle Financing/Acquisition"
- Investor overview updated to include "(VARA/GEAR)" reference

### Fee Chart
- **Appears only in Investor variant**
- 4 revenue streams with descriptions and allocations
- Policy note with waterfall targets (40% Dividends, 10% Buybacks/Burns, 50% Treasury)

### Impact Calculator
- **Dealer-only feature**
- Interactive modal with 5 input fields
- Real-time calculation of interest savings and gross lift
- Formulas:
  - Interest savings = exposure × (apr_reduction_bps / 10000) / 12
  - Gross lift = delta_turns × vehicles_on_floor × avg_gross_per_vehicle

### Risk Controls
- **Investor-only section**
- 6 detailed risk management areas
- Addresses institutional diligence concerns

### Compliance
- Illustrative metrics disclaimer on hero
- Investor disclaimer at bottom of investor form
- Legal footer with securities compliance language

## Quality Checklist

- [x] Variant toggle works and preserves scroll position
- [x] Fee Chart appears only on Investor variant
- [x] All "Vehicle Registration" replaced with "Vehicle Financing/Acquisition"
- [x] Performance targets met (LCP < 2.2s, CLS < 0.05, TBT < 150ms)
- [x] WCAG 2.2 AA accessibility compliance
- [x] Copy accuracy matches specifications
- [x] Branding applied (ANVL. with red dot)
- [x] Structured data (JSON-LD) implemented
- [x] Forms validate properly
- [x] Mobile responsive design
- [x] Tooltips keyboard accessible
- [x] Calculator modal functional
- [x] FAQ page with 40+ questions across 9 categories
- [x] Search functionality filters questions in real-time
- [x] Accordion UI with keyboard navigation
- [x] Legal disclaimers and compliance language
- [x] Cross-links to relevant pages throughout FAQ

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Future Enhancements

- Blog/insights section with CMS integration
- Interactive market opportunity visualization
- Animated tokenization flow diagram
- Video testimonials from dealers and investors
- Live chat support integration
- Multi-language support
- Dark mode toggle (if requested)
- A/B testing framework
- Analytics integration (Plausible or Fathom)

## License

Proprietary - © 2026 ANVL Finance LLC. All Rights Reserved.

## Company Information

**ANVL Finance LLC**
Registered in Wyoming, USA

**Contact**
Email: investors@anvl.finance
Website: www.anvl.finance

## Support

For technical issues or questions about the website, please contact the development team through the contact form or email.

---

**Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui**