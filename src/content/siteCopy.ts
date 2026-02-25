export const modules = [
  {
    name: "RMS",
    fullName: "Risk Management System",
    tagline: "Continuous collateral verification for floorplan lenders.",
    positioning: "RMS is the entry point into the ANVL platform.",
    description:
      "The Risk Management System (RMS) provides continuous, real-time verification of financed vehicles across dealer lots. Instead of periodic audits and manual inventory checks, RMS delivers automated visibility and exception detection.",
    bullets: [
      "Continuous BLE-based vehicle presence verification",
      "Real-time exception alerts when inventory behavior changes",
      "Centralized lender dashboard with lot-level visibility",
      "Designed to integrate with existing loan systems"
    ],
    wedgeNarrative:
      "RMS can be deployed without replacing a lender’s existing LMS. It improves audit reliability immediately, creating a foundation for workflow automation and origination expansion."
  },

  {
    name: "LMS",
    fullName: "Loan Management System",
    tagline: "A floorplan-native loan management platform.",
    positioning: "Built on top of RMS-verified collateral data.",
    description:
      "The Loan Management System (LMS) extends RMS by integrating verified collateral data directly into loan lifecycle management. LMS is designed specifically for asset-backed floorplan portfolios.",
    bullets: [
      "Collateral-linked loan records",
      "Automated curtailment and maturity tracking",
      "Exception-driven workflow management",
      "Multi-tenant architecture for institutional lenders"
    ]
  },

  {
    name: "LOS",
    fullName: "Loan Origination System",
    tagline: "Verified inventory, accelerated underwriting.",
    positioning: "Origination built on live, trusted asset data.",
    description:
      "The Loan Origination System (LOS) enables lenders to originate new floorplan facilities using RMS-verified inventory data. By grounding underwriting decisions in continuously verified collateral, LOS streamlines the approval process.",
    bullets: [
      "Inventory-informed underwriting",
      "Digital onboarding workflows",
      "Structured credit approval framework",
      "Designed for multi-location dealer portfolios"
    ]
  }
];

export const faqGroups = [
  {
    category: "Product",
    questions: [
      {
        question: "What is the difference between RMS, LMS, and LOS?",
        answer:
          "RMS verifies collateral in real time. LMS manages the lifecycle of floorplan loans using verified asset data. LOS supports new loan origination based on continuously verified inventory."
      },
      {
        question: "Can RMS work with our existing loan system?",
        answer:
          "Yes. RMS is designed to integrate with existing loan management systems, allowing lenders to deploy verification capabilities without replacing their core infrastructure."
      },
      {
        question: "Why start with RMS?",
        answer:
          "RMS delivers immediate improvement in collateral visibility and audit reliability. It serves as the foundation for workflow automation and future origination expansion."
      },
      {
        question: "How does vehicle verification work?",
        answer:
          "RMS uses secure Bluetooth-based presence verification combined with lot-level hardware to confirm vehicle location and status continuously."
      }
    ]
  },
  {
    category: "Security & Compliance",
    questions: [
      {
        question: "Is ANVL designed for institutional lenders?",
        answer:
          "Yes. The platform is built with multi-tenant architecture, audit logging, and operational controls designed for regulated lending environments."
      },
      {
        question: "Where is data stored?",
        answer:
          "Operational data is stored securely within the ANVL platform. The system architecture supports enterprise-grade security practices."
      }
    ]
  },
  {
    category: "Commercial",
    questions: [
      {
        question: "Do we need to deploy all modules at once?",
        answer:
          "No. Lenders can begin with RMS and expand into LMS and LOS as operational needs evolve."
      },
      {
        question: "What type of lenders is ANVL built for?",
        answer:
          "ANVL is designed for floorplan lenders managing asset-backed portfolios across multiple dealer locations."
      }
    ]
  }
];

export const roadmap = [
  {
    quarter: "Q2 2026",
    title: "RMS Live",
    bullets: [
      "Dealer lot deployment of verification hardware",
      "Real-time lender dashboard release",
      "Exception monitoring and alert workflows",
      "Initial institutional pilot"
    ]
  },
  {
    quarter: "Q3 2026",
    title: "LMS Launch",
    bullets: [
      "Collateral-linked loan management",
      "Automated curtailment and maturity workflows",
      "Expanded lender integrations",
      "Production multi-tenant deployment"
    ]
  },
  {
    quarter: "Q1 2027",
    title: "LOS + Series A Readiness",
    bullets: [
      "Inventory-backed origination workflows",
      "Digital underwriting framework",
      "Integrated credit decisioning tools",
      "Platform expansion across lender base"
    ]
  }
];