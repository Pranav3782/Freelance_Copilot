import { FreelancerProfile, ProjectAnalysis } from '../types';

export const initialProfile: FreelancerProfile = {
  name: 'Alex Chen',
  title: 'Senior Full-Stack & AI Systems Engineer',
  bio: '6+ years designing and engineering high-impact web applications, AI copilots, and reactive data platforms. Specialist in React, Next.js, TypeScript, Node.js, and GenAI integration.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  experienceYears: 6,
  hourlyRate: 95,
  minProjectBudget: 2000,
  weeklyAvailability: 32,
  skills: [
    { name: 'React / Next.js', level: 'Expert', verified: true },
    { name: 'TypeScript', level: 'Expert', verified: true },
    { name: 'Tailwind CSS', level: 'Expert', verified: true },
    { name: 'Node.js & Express', level: 'Advanced', verified: true },
    { name: 'Python & FastAPI', level: 'Advanced', verified: true },
    { name: 'PostgreSQL & Supabase', level: 'Advanced', verified: true },
    { name: 'AI & LLM Integration (Gemini, OpenAI)', level: 'Advanced', verified: true },
    { name: 'REST & GraphQL Architecture', level: 'Advanced', verified: true },
    { name: 'Stripe & Billing Workflows', level: 'Intermediate', verified: true },
    { name: 'Docker & Cloud Deployment', level: 'Intermediate', verified: true },
  ],
  technologies: [
    'React 19',
    'Next.js 14/15',
    'TypeScript',
    'Node.js',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Tailwind CSS',
    'Prisma',
    'Supabase',
    'Redis',
    'Docker',
    'Vercel',
    'Google Cloud',
  ],
  certifications: [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Cloud Developer',
    'Meta Certified Front-End Developer',
  ],
  portfolio: [
    {
      id: 'p1',
      title: 'FinPulse — High-Frequency Financial Intelligence Platform',
      client: 'Apex Quantitative Labs',
      description:
        'Architected an ultra-low-latency financial dashboard streaming real-time order books, portfolio risk calculations, and SVG heatmaps for 450+ quantitative traders.',
      tags: ['React', 'TypeScript', 'WebSockets', 'Tailwind', 'D3.js'],
      metric: 'Zero-lag sub-50ms render, $16,000 project delivered on time',
      url: 'https://github.com/alexchen/finpulse-demo',
    },
    {
      id: 'p2',
      title: 'DocuMind — Enterprise RAG Knowledge Base & Search Copilot',
      client: 'Hyperion Legal Technologies',
      description:
        'Built full-stack AI document search parsing 100k+ PDFs with hybrid vector/lexical retrieval, automated citation grounding, and role-based access control.',
      tags: ['Next.js', 'Python', 'FastAPI', 'Gemini API', 'PostgreSQL'],
      metric: 'Processed 2.4M pages, 4.9/5 client satisfaction rating',
      url: 'https://documind-sample.dev',
    },
    {
      id: 'p3',
      title: 'Aura Commerce — Headless Luxury Retail Experience',
      client: 'Maison Lumière NY',
      description:
        'Designed and developed a blazing fast headless eCommerce storefront with predictive search, custom cart drawer, and automated ERP inventory synchronization.',
      tags: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS', 'Stripe'],
      metric: '+41% mobile checkout completion rate',
      url: 'https://aura-storefront.demo',
    },
    {
      id: 'p4',
      title: 'CareSync — HIPAA-Compliant Telehealth Scheduling Engine',
      client: 'Vanguard Health Group',
      description:
        'Delivered responsive multi-timezone calendar scheduling, SMS appointment reminders, and automated doctor patient intake portals.',
      tags: ['React', 'Node.js', 'Twilio', 'PostgreSQL'],
      metric: 'Reduced patient intake drop-off by 27%',
    },
  ],
  preferredProjectTypes: ['Fixed-Price Sprint', 'Milestone-Based MVP', 'Retainer Advisory', 'Dedicated 4-8 Week Sprint'],
  preferredIndustries: ['B2B SaaS', 'FinTech & Wealth', 'AI & Automation', 'E-Commerce', 'HealthTech'],
  languages: ['English (Native)', 'Mandarin (Fluent)', 'German (Conversational)'],
  profileCompletionScore: 88,
};

export const sampleProjects: ProjectAnalysis[] = [
  {
    id: 'proj-001',
    title: 'Enterprise AI Analytics Dashboard with Supabase, Multi-Tenant Auth & Stripe Billing',
    source: 'Upwork — Verified Enterprise',
    postedDate: '2 hours ago',
    description: `We need an expert full-stack React/Next.js engineer to build our core customer-facing analytics dashboard for an AI observability platform.
Scope includes:
- Multi-tenant workspace management with role-based permissions (Admin, Editor, Viewer).
- Interactive SVG/Canvas charts tracking token usage, latency percentiles (p50, p95, p99), and error breakdown.
- Supabase integration with Row-Level Security (RLS) policies.
- Stripe Customer Portal with usage-metered tiered billing.
- Clean, responsive UI with light/dark theme matching our Figma file (already 90% finalized).
Timeline: 4 weeks. Budget is fixed at $4,500 with milestone payments. Must write typed, modular code with clean git history.`,
    recommendation: 'APPLY',
    matchScore: 89,
    subScores: {
      skillMatch: 95,
      experienceMatch: 90,
      portfolioMatch: 92,
      budgetFit: 84,
      difficulty: 'Medium',
    },
    projectOverview: {
      budget: '$4,500 (Fixed Price)',
      timeline: '4 Weeks',
      projectType: 'Milestone MVP',
      experienceRequested: 'Expert (5+ years)',
      technologies: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
      deliverables: [
        'Responsive analytics dashboard UI',
        'Supabase schema & RLS security rules',
        'Stripe webhooks & tiered subscription portal',
        'Storybook component documentation',
      ],
      urgency: 'Normal',
    },
    clientIntelligence: {
      companyName: 'Lumina Data Systems Inc.',
      industry: 'B2B SaaS / Developer Tools',
      location: 'San Francisco, CA (Remote friendly)',
      website: 'https://luminadata.io (Public domain)',
      publicBusinessInfo:
        'Series A funded developer infrastructure startup ($6.2M raised). Clean hiring track record on freelance marketplaces.',
      publicProfiles: [
        { platform: 'LinkedIn', handle: 'lumina-data', url: 'https://linkedin.com' },
        { platform: 'GitHub', handle: 'lumina-org', url: 'https://github.com' },
      ],
      availableContactChannels: ['Platform Chat', 'Scheduled Google Meet / Zoom'],
      sourceLabels: ['Upwork Enterprise Client', 'Crunchbase Public Filings', 'Verified Payment Method'],
      confidence: 'High',
      paymentVerified: true,
      hireRate: '88% hire rate (24 jobs posted, 21 hired)',
      totalSpent: '$118,000+ total spent',
      avgHourlyPaid: '$92.50/hr average rate paid',
      memberSince: 'March 2021',
    },
    riskScanner: {
      overallRisk: 'Low',
      riskScore: 18,
      checklist: [
        {
          id: 'r1',
          item: 'Figma & Design Readiness',
          category: 'Scope',
          status: 'pass',
          title: 'Design assets 90% completed',
          explanation: 'Client explicitly states Figma is ready, minimizing unexpected design iteration cycles.',
        },
        {
          id: 'r2',
          item: 'Scope & Deliverables Definition',
          category: 'Clarity',
          status: 'pass',
          title: 'Clearly articulated milestone boundaries',
          explanation: 'Deliverables specify frontend, Supabase RLS, and Stripe metering without vague open-ended asks.',
        },
        {
          id: 'r3',
          item: 'Budget-to-Effort Alignment',
          category: 'Budget',
          status: 'pass',
          title: 'Healthy compensation ($4,500 for ~40-50 hours)',
          explanation: 'Effective hourly rate calculates to ~$90–$110/hr, matching your minimum $95/hr standard.',
        },
        {
          id: 'r4',
          item: 'Payment & Client Credibility',
          category: 'Security',
          status: 'pass',
          title: 'High-reputation verified client',
          explanation: '$118k+ spent with 88% hire rate on platform. Zero payment disputes reported.',
        },
        {
          id: 'r5',
          item: 'Usage-Metered Billing Complexity',
          category: 'Scope',
          status: 'warning',
          title: 'Stripe usage-based meter sync requires precision',
          explanation: 'Requires automated idempotency keys on webhook handlers to avoid double-charging customers.',
        },
      ],
    },
    hiddenRequirements: [
      {
        id: 'h1',
        name: 'Stripe Webhook Idempotency & Error Handling',
        category: 'Backend & Billing',
        isInferred: true,
        description: 'Client asked for tiered usage billing, which inherently necessitates secure webhook event verification, dead-letter retries, and database sync.',
        effortImpact: 'Medium',
        commonTrap: 'Failing to handle duplicate Stripe webhook deliveries leads to corrupted billing records.',
      },
      {
        id: 'h2',
        name: 'Row-Level Security (RLS) Policy Architecture',
        category: 'Database & Security',
        isInferred: true,
        description: 'Multi-tenant workspaces require strict PostgreSQL RLS policies so Workspace A cannot accidentally query Workspace B analytics.',
        effortImpact: 'Medium',
        commonTrap: 'Building multi-tenancy in application code instead of database RLS leaves security vulnerabilities.',
      },
      {
        id: 'h3',
        name: 'Chart Aggregation & Time-Bucket Performance',
        category: 'Frontend & DB',
        isInferred: true,
        description: 'Plotting p95/p99 latencies over 30 days without database rollups will cause frontend browser lag.',
        effortImpact: 'Medium',
        commonTrap: 'Sending raw event logs directly to frontend charts instead of pre-aggregated time buckets.',
      },
      {
        id: 'h4',
        name: 'Session Token Refresh & Invalidation',
        category: 'Authentication',
        isInferred: true,
        description: 'Supabase JWT management when switching active team workspaces.',
        effortImpact: 'Low',
        commonTrap: 'Stale workspace context upon user switching organizations.',
      },
    ],
    missingInformation: [
      {
        id: 'q1',
        question: 'What is the anticipated volume of daily telemetry events per tenant for chart aggregation?',
        reason: 'Determines whether standard PostgreSQL queries suffice or if we should set up materialized rollups in Supabase.',
        impact: 'High',
      },
      {
        id: 'q2',
        question: 'Are there specific Stripe pricing tiers (e.g. Starter, Growth, Enterprise) already drafted in Stripe dashboard test mode?',
        reason: 'Prevents timeline delays waiting on product pricing sign-offs.',
        impact: 'Medium',
      },
      {
        id: 'q3',
        question: 'Who will supply the test API keys and Supabase staging environment credentials?',
        reason: 'Ensures immediate kickoff without infrastructure provisioning blockers.',
        impact: 'Low',
      },
    ],
    pricingIntelligence: {
      clientStatedBudget: '$4,500 fixed',
      estimatedEffortHours: '42–48 focused hours',
      suggestedMin: 4200,
      suggestedMax: 5000,
      freelancerFloor: 3800,
      rationale:
        'Client has a track record of paying $90–$95/hr. A quote of $4,500 aligns with their stated expectation while giving room for high-touch quality assurance and test coverage.',
      biddingStrategy:
        'Bid exact budget ($4,500) divided into 3 equal milestones: 1) Auth & Dashboard UI Shell ($1,500), 2) Analytics Charts & Supabase RLS ($1,500), 3) Stripe Billing & Production Launch ($1,500).',
    },
    competitivePosition: {
      advantages: [
        'Directly shipped FinPulse and DocuMind featuring live chart streaming and multi-tenant security.',
        '6 years of production TypeScript + Supabase database RLS architecture.',
        'Top 1% client satisfaction history with enterprise B2B tools.',
      ],
      weaknesses: [
        'Client has 15 other proposals submitted in the first 2 hours.',
      ],
      recommendedPositioning:
        'Position as a senior systems engineer who builds bulletproof billing idempotency and instant 60fps analytics, rather than a generic UI slicer.',
      portfolioToHighlight: ['FinPulse Dashboard', 'DocuMind Knowledge Base'],
    },
    approachStrategy: {
      recommendedAngle:
        'Lead with architectural confidence regarding Stripe idempotency and Supabase RLS. Highlight your FinPulse project to demonstrate you have already built low-latency analytics dashboards.',
      proposal: `Hi Lumina team,

I reviewed your project requirements for the multi-tenant analytics dashboard. Having architected similar production platforms—including FinPulse (a real-time analytics platform handling sub-50ms render cycles) and enterprise RAG systems with strict tenant isolation—I can take this from Figma to production in 4 weeks.

Here is how I recommend structuring the build:
1. Architecture & Tenant Isolation (Days 1–7): Configure Supabase schemas with database-enforced Row-Level Security (RLS) so tenant data is cryptographically separated, alongside modern Next.js 14 App Router layout.
2. High-Performance Telemetry Visualization (Days 8–18): Implement responsive token usage and p50/p95/p99 latency charts using time-bucket rollups to guarantee buttery 60fps rendering even across high event counts.
3. Stripe Metered Billing & Webhooks (Days 19–25): Integrate the Stripe Customer Portal with strict webhook idempotency, preventing double-billing or desynced customer tier states.
4. QA, End-to-End Walkthrough & Launch (Days 26–28): Polish light/dark theme tokens to match your Figma, conduct full security audits, and hand over clean typed documentation.

Two quick technical questions to confirm our plan:
- What is your expected daily event volume per tenant (to determine if we should introduce Supabase cron materialized rollups)?
- Are your Stripe products and webhook endpoints already configured in test mode?

I am available to start immediately and look forward to discussing the architecture.

Best regards,
Alex Chen`,
      shortIntroMessage:
        'Hi Lumina team — Saw your post for the Supabase + Next.js analytics dashboard. I recently delivered FinPulse (a low-latency financial analytics suite) and would love to build your multi-tenant dashboard with clean RLS policies and Stripe usage billing. Free for a brief call tomorrow?',
      followUpMessage:
        'Hi there! Following up on my proposal for the Lumina analytics dashboard. I put together a quick 3-bullet breakdown of how we can handle p95/p99 latency aggregation in Supabase without performance slowdowns. Let me know if you would like me to share it!',
      discoveryScript:
        '1. "What is your primary goal for launch day: customer beta or general availability?"\n2. "How will data be ingested into Supabase—via serverless edge functions or a backend queue?"\n3. "Are there specific audit log requirements for admin vs viewer roles?"',
      negotiationScript:
        'If the client asks for $3,500: "I understand budget constraints. If we scope Milestone 3 to standard flat-rate Stripe subscriptions rather than complex usage-metered billing for v1, we can comfortably hit $3,800. If metered billing is essential for launch, $4,500 ensures we build bulletproof idempotency and audit logs."',
      professionalEmail:
        'Subject: Lumina Systems — Analytics Dashboard & Supabase Architecture Proposal\n\nDear Lumina Team,\n\nThank you for sharing the opportunity to partner on your upcoming analytics platform. Attached is my breakdown of the technical milestones, Supabase RLS security specifications, and Stripe billing flow.\n\nLooking forward to speaking.\n\nWarmly,\nAlex Chen',
      truthChecker: {
        verifiedClaims: [
          '6+ years TypeScript and Next.js verified in profile',
          'FinPulse real-time dashboard verified in portfolio',
          'Supabase & PostgreSQL listed as verified skills',
        ],
        unsupportedWarnings: [],
        skillsReferenced: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
        portfolioReferences: ['FinPulse Dashboard', 'DocuMind Knowledge Base'],
        complianceStatus: 'Verified & Safe',
      },
    },
    applicationStage: 'Reached',
    analysisTimestamp: '2026-09-10T14:30:00Z',
    notes: 'Strong alignment with past FinPulse project. Client has high spend and verified payment method.',
  },
  {
    id: 'proj-002',
    title: 'Shopify Plus Headless Storefront Migration with Next.js & Klaviyo Sync',
    source: 'Freelancer.com — Verified Employer',
    postedDate: '5 hours ago',
    description: `We are a DTC luxury home accessories brand currently on standard Shopify Liquid. We are losing mobile conversions due to 4.2s load times.
We need a headless storefront developed using Next.js 14, Shopify Storefront GraphQL API, Tailwind CSS, and Klaviyo newsletter integration.
Requirements:
- Sub-1.2s Largest Contentful Paint (LCP) across mobile.
- Custom slide-out cart drawer with dynamic upsells and free-shipping progression bar.
- Algolia or Shopify Predictive search with instant visual product previews.
- Fully responsive editorial layout matching our brand guidelines.
Budget: $3,500. Timeline: 3 weeks.`,
    recommendation: 'APPLY',
    matchScore: 84,
    subScores: {
      skillMatch: 90,
      experienceMatch: 85,
      portfolioMatch: 88,
      budgetFit: 80,
      difficulty: 'Medium',
    },
    projectOverview: {
      budget: '$3,500 (Fixed Price)',
      timeline: '3 Weeks',
      projectType: 'Storefront Migration',
      experienceRequested: 'Senior Developer',
      technologies: ['Next.js', 'Shopify Storefront API', 'GraphQL', 'Tailwind CSS', 'Klaviyo'],
      deliverables: ['Headless Next.js storefront', 'Instant cart drawer with upsells', 'Klaviyo event sync', 'Lighthouse 90+ mobile audit report'],
      urgency: 'Normal',
    },
    clientIntelligence: {
      companyName: 'Nordic Craft Atelier LLC',
      industry: 'DTC E-Commerce & Home Goods',
      location: 'Stockholm / London',
      website: 'https://nordiccraft.sample (Public domain)',
      publicBusinessInfo: 'Established sustainable home design manufacturer with $2.4M annual eCommerce sales.',
      publicProfiles: [{ platform: 'Instagram', handle: '@nordiccraft', url: 'https://instagram.com' }],
      availableContactChannels: ['Platform Messages', 'Email'],
      sourceLabels: ['Verified Business', 'High Repeat Hire Rate'],
      confidence: 'High',
      paymentVerified: true,
      hireRate: '92% hire rate (12 projects posted)',
      totalSpent: '$44,000+ total spent',
      avgHourlyPaid: '$88.00/hr',
      memberSince: 'January 2022',
    },
    riskScanner: {
      overallRisk: 'Low',
      riskScore: 22,
      checklist: [
        {
          id: 'rk1',
          item: 'Clear Performance Metric (Sub-1.2s LCP)',
          category: 'Clarity',
          status: 'pass',
          title: 'Concrete measurable success criteria',
          explanation: 'Clear performance benchmarks avoid subjective disputes upon project completion.',
        },
        {
          id: 'rk2',
          item: 'Shopify Checkout Redirect Handling',
          category: 'Scope',
          status: 'warning',
          title: 'Checkout domain handover considerations',
          explanation: 'Standard Shopify headless requires passing cart tokens to checkout.myshopify.com without dropping customer cookies.',
        },
        {
          id: 'rk3',
          item: 'Client Track Record',
          category: 'Security',
          status: 'pass',
          title: 'Established ecommerce brand with verified funding',
          explanation: 'Active commerce brand with steady revenue and 92% hire rate.',
        },
      ],
    },
    hiddenRequirements: [
      {
        id: 'hr1',
        name: 'Shopify Webhook Cache Invalidation',
        category: 'Cache & Performance',
        isInferred: true,
        description: 'Automated revalidation (ISR) when inventory or prices update in the Shopify merchant admin.',
        effortImpact: 'Medium',
        commonTrap: 'Static pages serving out-of-stock items due to un-triggered Next.js cache.',
      },
      {
        id: 'hr2',
        name: 'SEO Redirection & Canonical Metadata Migration',
        category: 'SEO',
        isInferred: true,
        description: 'Preserving existing organic search ranking via 301 redirects and schema.org microdata.',
        effortImpact: 'Medium',
        commonTrap: 'Headless rebuilds crashing organic Google rankings if 301 mappings are omitted.',
      },
    ],
    missingInformation: [
      {
        id: 'mq1',
        question: 'Are there custom third-party Shopify apps currently installed that need headless SDK support (e.g. reviews, subscriptions)?',
        reason: 'Third-party Liquid apps do not automatically run on headless frontend without specialized APIs.',
        impact: 'High',
      },
    ],
    pricingIntelligence: {
      clientStatedBudget: '$3,500',
      estimatedEffortHours: '35–40 hours',
      suggestedMin: 3200,
      suggestedMax: 3800,
      freelancerFloor: 3000,
      rationale: 'Fair budget for a focused headless catalog and cart build given your Aura Commerce background.',
      biddingStrategy: 'Bid $3,500 with milestone splits for Design Translation, Storefront GraphQL API, and Cart + SEO launch.',
    },
    competitivePosition: {
      advantages: ['Aura Commerce portfolio project achieved +41% mobile checkout completion.'],
      weaknesses: ['Competitors might offer generic pre-made Shopify themes for lower cost.'],
      recommendedPositioning: 'Lead with Core Web Vitals optimization and sub-second page loads that directly lift checkout conversion.',
      portfolioToHighlight: ['Aura Commerce Luxury Storefront'],
    },
    approachStrategy: {
      recommendedAngle: 'Focus on how headless architecture elevates conversion rates from sub-1.2s speed.',
      proposal: `Hi Nordic Craft team,\n\nI saw your goal of cutting mobile load times from 4.2s to sub-1.2s. Having built headless commerce storefronts like Aura Commerce (which achieved a +41% mobile checkout lift with Next.js and Shopify Storefront GraphQL), I know exactly how to achieve your Core Web Vitals benchmarks.\n\nI will deliver a lightning-fast headless storefront with on-demand cache revalidation, instant slide-out cart with upsells, and zero SEO traffic loss.\n\nBest,\nAlex`,
      shortIntroMessage: 'Hi Nordic Craft team! I specialize in high-converting headless Next.js + Shopify storefronts. Happy to review your current Liquid bottlenecks and share my approach for sub-1.2s LCP.',
      followUpMessage: 'Following up to see if you have selected a developer for the headless storefront migration.',
      discoveryScript: '1. "Which third-party apps (e.g. Yotpo, Judge.me, Recharge) are mission-critical?"\n2. "What is your target go-live date relative to seasonal promotions?"',
      negotiationScript: 'For $3,500, we ensure total SEO preservation and on-demand cache revalidation alongside the custom cart drawer.',
      professionalEmail: 'Subject: Nordic Craft Storefront — Headless Next.js Migration\n\nDear Team,\n\nPlease find attached my roadmap for your sub-second storefront migration.',
      truthChecker: {
        verifiedClaims: ['Aura Commerce project verified', 'Next.js & Tailwind expertise verified'],
        unsupportedWarnings: [],
        skillsReferenced: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS'],
        portfolioReferences: ['Aura Commerce'],
        complianceStatus: 'Verified & Safe',
      },
    },
    applicationStage: 'Reached',
    analysisTimestamp: '2026-09-10T11:15:00Z',
  },
  {
    id: 'proj-003',
    title: 'URGENT: Full-Stack SaaS MVP with Unlimited Revisions in 48 Hours — Guaranteed',
    source: 'Upwork — Unverified Payment',
    postedDate: '30 mins ago',
    description: `Need an expert to build me a complete Uber-for-tutors app. Must have iOS app, Android app, web portal, payment processing, real-time video chat, background checks API, and admin dashboard.
Must be done in 48 hours. I will not release any milestones until 100% of my unlimited revisions are satisfied.
Budget: $350 total. Must work weekends and communicate 24/7 via WhatsApp.`,
    recommendation: "DON'T APPLY",
    matchScore: 28,
    subScores: {
      skillMatch: 45,
      experienceMatch: 30,
      portfolioMatch: 40,
      budgetFit: 10,
      difficulty: 'High',
    },
    projectOverview: {
      budget: '$350 (Fixed Price)',
      timeline: '48 Hours (Unrealistic)',
      projectType: 'High Risk Scope Trap',
      experienceRequested: 'Uncapped Requirements',
      technologies: ['React Native', 'WebRTC', 'Stripe', 'Video Streaming', 'Admin Portal'],
      deliverables: ['Full multi-platform system with unlimited revisions'],
      urgency: 'Immediate',
    },
    clientIntelligence: {
      companyName: 'Anonymous Private Individual',
      industry: 'Unverified / Unknown',
      location: 'Unspecified',
      publicBusinessInfo: 'No verifiable business registry or company history found.',
      publicProfiles: [],
      availableContactChannels: ['Demanded off-platform WhatsApp communication (Violation)'],
      sourceLabels: ['New Account (0 hires)', 'Unverified Payment Method', 'Off-Platform Solicitation'],
      confidence: 'Low',
      paymentVerified: false,
      hireRate: '0% (First job posted)',
      totalSpent: '$0.00 spent',
      avgHourlyPaid: 'N/A',
      memberSince: 'Today',
    },
    riskScanner: {
      overallRisk: 'High',
      riskScore: 94,
      checklist: [
        {
          id: 'danger-1',
          item: 'Severe Scope Trap & Budget Exploitation',
          category: 'Budget',
          status: 'alert',
          title: 'Extreme budget deficit ($350 for $20,000+ scope)',
          explanation: 'Building multi-platform native apps with live WebRTC and background check APIs for $350 is a severe economic mismatch.',
        },
        {
          id: 'danger-2',
          item: 'Coercive Milestone Terms ("Unlimited Revisions")',
          category: 'Scope',
          status: 'alert',
          title: 'Conditioned escrow holding clause',
          explanation: '"Will not release milestones until unlimited revisions are satisfied" is a hallmark predatory contract term.',
        },
        {
          id: 'danger-3',
          item: 'Off-Platform Communication Violation',
          category: 'Security',
          status: 'alert',
          title: 'Demanding off-platform WhatsApp contact',
          explanation: 'Violates platform Terms of Service and removes escrow dispute protections.',
        },
        {
          id: 'danger-4',
          item: 'Impossible 48-Hour Deadline',
          category: 'Deadline',
          status: 'alert',
          title: 'Physically impossible delivery expectations',
          explanation: 'Creates a guaranteed failure scenario leading to negative review retaliation.',
        },
      ],
    },
    hiddenRequirements: [
      {
        id: 'hr-bad-1',
        name: 'WebRTC Signaling & TURN/STUN Server Infrastructure',
        category: 'Real-Time Video',
        isInferred: true,
        description: 'Peer-to-peer video requires dedicated cloud infrastructure costs that exceed the entire project budget.',
        effortImpact: 'High',
        commonTrap: 'Paying cloud hosting bills out of freelancer pocket.',
      },
    ],
    missingInformation: [
      {
        id: 'nq-1',
        question: 'Do you have existing architectural specs, wireframes, and backend servers?',
        reason: 'Reveals whether client understands software development lifecycle.',
        impact: 'High',
      },
    ],
    pricingIntelligence: {
      clientStatedBudget: '$350',
      estimatedEffortHours: '200+ hours across 3 engineers',
      suggestedMin: 18000,
      suggestedMax: 28000,
      freelancerFloor: 15000,
      rationale: 'Project is a predatory posting. Do not submit a proposal.',
      biddingStrategy: 'Strongly advise skipping this opportunity entirely to protect rating and time.',
    },
    competitivePosition: {
      advantages: [],
      weaknesses: ['Any bid submitted will be an exercise in frustration and disputed escrow.'],
      recommendedPositioning: 'Do not position or bid.',
      portfolioToHighlight: [],
    },
    approachStrategy: {
      recommendedAngle: 'DO NOT APPLY. High risk of non-payment and dispute.',
      proposal: 'DO NOT APPLY: This job features predatory terms and extreme scope traps.',
      shortIntroMessage: 'Not recommended.',
      followUpMessage: 'N/A',
      discoveryScript: 'N/A',
      negotiationScript: 'N/A',
      professionalEmail: 'N/A',
      truthChecker: {
        verifiedClaims: [],
        unsupportedWarnings: ['Job flagged as High Risk predatory contract.'],
        skillsReferenced: [],
        portfolioReferences: [],
        complianceStatus: 'Caution Required',
      },
    },
    applicationStage: 'Analysed',
    analysisTimestamp: '2026-09-10T16:00:00Z',
    notes: 'Flagged by AI Scanner as red flag contract trap. Recommended to decline.',
  },
  {
    id: 'proj-004',
    title: 'Cross-Platform Flutter Health & Fitness Companion with Bluetooth Sensor Sync',
    source: 'Y Combinator Work at a Startup',
    postedDate: '1 day ago',
    description: `We are building a smart fitness companion app connecting to BLE heart rate monitors and smart scales.
Requirements:
- Flutter / Dart code base running smoothly on iOS and Android.
- Bluetooth Low Energy (BLE) background scanning and streaming telemetry parsing.
- Firebase Auth, Firestore sync, and offline-first SQLite cache.
- Clean MVVM architecture.
Budget: $5,000. Timeline: 5 weeks. Looking for experienced mobile developers.`,
    recommendation: 'MAYBE',
    matchScore: 72,
    subScores: {
      skillMatch: 70,
      experienceMatch: 75,
      portfolioMatch: 72,
      budgetFit: 82,
      difficulty: 'High',
    },
    projectOverview: {
      budget: '$5,000 (Milestones)',
      timeline: '5 Weeks',
      projectType: 'Mobile App',
      experienceRequested: 'Mid-Senior Flutter Developer',
      technologies: ['Flutter', 'Dart', 'Bluetooth Low Energy', 'Firebase', 'SQLite'],
      deliverables: ['iOS/Android build', 'BLE peripheral pairing flow', 'Offline sync database', 'App Store testflight release'],
      urgency: 'Normal',
    },
    clientIntelligence: {
      companyName: 'AeroPulse BioMetrics',
      industry: 'Health & Connected Hardware',
      location: 'Boston, MA (Remote)',
      website: 'https://aeropulse.sample',
      publicBusinessInfo: 'Seed stage medical tech startup backed by health accelerators.',
      publicProfiles: [{ platform: 'AngelList', handle: 'aeropulse', url: 'https://wellfound.com' }],
      availableContactChannels: ['Platform Portal', 'Video Call'],
      sourceLabels: ['YC Portfolio Startup', 'Verified Corporate Identity'],
      confidence: 'High',
      paymentVerified: true,
      hireRate: '80% hire rate',
      totalSpent: '$32,000+ total spent',
      avgHourlyPaid: '$85.00/hr',
      memberSince: 'August 2023',
    },
    riskScanner: {
      overallRisk: 'Medium',
      riskScore: 38,
      checklist: [
        {
          id: 'mb-1',
          item: 'Hardware & BLE Device Availability',
          category: 'Scope',
          status: 'warning',
          title: 'Physical hardware dependency for QA',
          explanation: 'Testing BLE protocols requires having physical test hardware shipped to your location, or virtual hardware simulators.',
        },
        {
          id: 'mb-2',
          item: 'OS Background Permissions (iOS vs Android)',
          category: 'Security',
          status: 'warning',
          title: 'Strict OS battery saver policies terminate background BLE',
          explanation: 'iOS background modes and Android 14 foreground service policies require custom native configuration.',
        },
      ],
    },
    hiddenRequirements: [
      {
        id: 'h-ble-1',
        name: 'Native Android 14 & iOS CoreBluetooth Permission Matrix',
        category: 'Mobile & Permissions',
        isInferred: true,
        description: 'Handling runtime location and nearby device permissions across OS versions.',
        effortImpact: 'Medium',
        commonTrap: 'App crashes on Android 14 if foreground service types are misconfigured in manifest.',
      },
    ],
    missingInformation: [
      {
        id: 'q-ble-1',
        question: 'Will physical hardware prototypes be shipped to the developer, or is there a simulated BLE protocol server?',
        reason: 'Directly dictates delivery timeline and testing feasibility.',
        impact: 'High',
      },
    ],
    pricingIntelligence: {
      clientStatedBudget: '$5,000',
      estimatedEffortHours: '55–65 hours',
      suggestedMin: 4800,
      suggestedMax: 5600,
      freelancerFloor: 4500,
      rationale: 'Reasonable budget, though BLE hardware quirks can add 15% testing overhead.',
      biddingStrategy: 'Bid $5,200 with milestone 1 dedicated to Bluetooth protocol handshakes and simulated data feeds.',
    },
    competitivePosition: {
      advantages: ['CareSync background in health workflows and telemetry.'],
      weaknesses: ['Primary stack is React/TypeScript rather than Flutter/Dart daily.'],
      recommendedPositioning: 'Emphasize your strong architectural foundation in reactive state and offline sync.',
      portfolioToHighlight: ['CareSync Telehealth Platform'],
    },
    approachStrategy: {
      recommendedAngle: 'Address the BLE hardware testing logistics upfront to demonstrate mature engineering judgment.',
      proposal: `Hi AeroPulse team,\n\nI reviewed your smart fitness companion requirements. While Flutter cross-platform logic is straightforward, the critical make-or-break aspect of this project is Bluetooth Low Energy connection resilience across iOS CoreBluetooth and Android foreground services.\n\nHaving architected CareSync with real-time health telemetry, I understand how to manage disconnected peripheral states and background SQLite synchronization cleanly.\n\nBest,\nAlex`,
      shortIntroMessage: 'Hi AeroPulse team! Experienced in reactive health telemetry. Happy to chat about BLE packet parsing and offline SQLite sync.',
      followUpMessage: 'Checking in on your Flutter companion app developer search.',
      discoveryScript: '1. "Which BLE GATT services/characteristics are currently documented?"',
      negotiationScript: 'For $5,200, we include simulated test suites so QA can run even without physical sensors.',
      professionalEmail: 'Subject: AeroPulse — Flutter & BLE Telemetry Companion Architecture',
      truthChecker: {
        verifiedClaims: ['CareSync health telemetry verified in profile'],
        unsupportedWarnings: ['Note: Flutter is secondary skill compared to React/TypeScript'],
        skillsReferenced: ['Flutter', 'Dart', 'Bluetooth Low Energy', 'SQLite'],
        portfolioReferences: ['CareSync'],
        complianceStatus: 'Caution Required',
      },
    },
    applicationStage: 'Analysed',
    analysisTimestamp: '2026-09-09T18:20:00Z',
  },
  {
    id: 'proj-005',
    title: 'Enterprise Customer Success AI Chatbot with Slack Bot & Knowledge Base RAG',
    source: 'Upwork — Enterprise Talent Cloud',
    postedDate: '3 days ago',
    description: `Seeking senior AI engineer to build a customer success copilot that ingests Zendesk tickets, Notion documentation, and product changelogs to answer client inquiries in Slack and web widget.
Must feature:
- Vector search with semantic grounding & hallucination guardrails.
- Slack Bolt API bot integration with interactive thread replies.
- Admin dashboard showing question-answer confidence and human-escalation metrics.
Budget: $6,500. Timeline: 4 weeks.`,
    recommendation: 'APPLY',
    matchScore: 94,
    subScores: {
      skillMatch: 98,
      experienceMatch: 92,
      portfolioMatch: 95,
      budgetFit: 90,
      difficulty: 'Medium',
    },
    projectOverview: {
      budget: '$6,500 (Fixed Price)',
      timeline: '4 Weeks',
      projectType: 'AI Copilot MVP',
      experienceRequested: 'Senior GenAI Engineer',
      technologies: ['React', 'TypeScript', 'FastAPI', 'Gemini API', 'PostgreSQL / pgvector', 'Slack API'],
      deliverables: ['Slack copilot bot', 'Embeddable web chat widget', 'Admin evaluation dashboard', 'Vector ingestion pipeline'],
      urgency: 'Normal',
    },
    clientIntelligence: {
      companyName: 'Nexus Operations Group',
      industry: 'Enterprise B2B Software',
      location: 'Austin, TX',
      website: 'https://nexusops.sample',
      publicBusinessInfo: 'Fast-growing B2B operations software with 180 employees and 12,000 daily active users.',
      publicProfiles: [{ platform: 'LinkedIn', handle: 'nexus-ops', url: 'https://linkedin.com' }],
      availableContactChannels: ['Platform Messages', 'Enterprise Interview Room'],
      sourceLabels: ['Enterprise Tier Client', '100% Payment Track Record'],
      confidence: 'High',
      paymentVerified: true,
      hireRate: '95% hire rate (35 jobs posted)',
      totalSpent: '$210,000+ total spent',
      avgHourlyPaid: '$105.00/hr',
      memberSince: 'September 2020',
    },
    riskScanner: {
      overallRisk: 'Low',
      riskScore: 12,
      checklist: [
        {
          id: 'rag-1',
          item: 'Hallucination Mitigation & Grounding',
          category: 'Scope',
          status: 'pass',
          title: 'Well-specified grounding requirements',
          explanation: 'Client explicitly asks for source citation links, preventing open-ended AI behavior.',
        },
        {
          id: 'rag-2',
          item: 'Budget & Client Quality',
          category: 'Budget',
          status: 'pass',
          title: 'Top-tier Enterprise client ($210k+ spent)',
          explanation: 'Client routinely hires senior developers at $100+/hr and respects architectural best practices.',
        },
      ],
    },
    hiddenRequirements: [
      {
        id: 'h-rag-1',
        name: 'Incremental Document Sync & De-Duplication',
        category: 'Data Pipeline',
        isInferred: true,
        description: 'Ingesting Notion and Zendesk requires webhook-driven incremental re-indexing rather than slow full crawls.',
        effortImpact: 'Medium',
        commonTrap: 'Re-indexing 10,000 documents every time a single page updates in Notion.',
      },
    ],
    missingInformation: [
      {
        id: 'q-rag-1',
        question: 'Are Zendesk and Notion API tokens already provisioned with read access?',
        reason: 'Validates API rate limits and permission scopes.',
        impact: 'Medium',
      },
    ],
    pricingIntelligence: {
      clientStatedBudget: '$6,500',
      estimatedEffortHours: '45–55 hours',
      suggestedMin: 6200,
      suggestedMax: 7000,
      freelancerFloor: 5500,
      rationale: 'Exceptional match with DocuMind project. High-probability win.',
      biddingStrategy: 'Bid $6,500 with detailed architectural diagram and 3-stage delivery roadmap.',
    },
    competitivePosition: {
      advantages: [
        'Shipped DocuMind (2.4M pages indexed with citation grounding).',
        'Direct experience with Gemini API, pgvector, and Slack Bolt SDK.',
      ],
      weaknesses: ['None of significance.'],
      recommendedPositioning: 'Position as a specialized AI Systems Architect with direct case studies in RAG hallucination control.',
      portfolioToHighlight: ['DocuMind Enterprise Knowledge Base'],
    },
    approachStrategy: {
      recommendedAngle: 'Demonstrate your DocuMind experience with citation grounding and Slack thread interaction.',
      proposal: `Hi Nexus team,\n\nI architected DocuMind, an enterprise knowledge search copilot that processed over 2.4M document pages with strict hallucination guardrails and sub-second retrieval.\n\nI can deliver your customer success copilot with Slack Bolt integration, automated document syncing, and human-in-the-loop escalation.\n\nBest,\nAlex`,
      shortIntroMessage: 'Hi Nexus team! Built enterprise knowledge copilots indexing 2.4M pages. Would love to show a live demo of citation grounding.',
      followUpMessage: 'Checking in on your customer success copilot build.',
      discoveryScript: '1. "What is your target hallucination tolerance threshold?"\n2. "What are the most common 5 questions your support team receives daily?"',
      negotiationScript: '$6,500 covers complete vector indexing, Slack bot, embeddable widget, and admin escalation analytics.',
      professionalEmail: 'Subject: Nexus Operations — Enterprise CS Copilot Architecture',
      truthChecker: {
        verifiedClaims: ['DocuMind RAG verified in portfolio', 'Gemini & Python verified in profile'],
        unsupportedWarnings: [],
        skillsReferenced: ['FastAPI', 'Gemini API', 'PostgreSQL', 'Slack API'],
        portfolioReferences: ['DocuMind'],
        complianceStatus: 'Verified & Safe',
      },
    },
    applicationStage: 'Started',
    analysisTimestamp: '2026-09-07T10:00:00Z',
    notes: 'Client responded in 4 hours. Technical discovery call scheduled for Thursday at 2pm EST.',
  },
];

export const sampleTemplates = [
  {
    title: 'React SaaS Analytics Dashboard with Supabase',
    category: 'Full-Stack & Data',
    text: `Looking for a senior React & Next.js developer to build a modern analytics dashboard for our B2B SaaS platform.
Must include:
- Supabase authentication & Row-Level Security for multiple team organizations.
- Responsive charts tracking API response times, daily active users, and error spikes.
- Stripe subscription integration with 3 pricing tiers.
- Figma designs provided (clean modern aesthetic).
Budget: $4,000. Timeline: 3-4 weeks. Quality typed code required.`,
  },
  {
    title: 'Shopify Plus Headless Storefront Migration',
    category: 'E-Commerce',
    text: `DTC skincare brand seeking a headless eCommerce specialist to rebuild our storefront in Next.js 14 and Shopify Storefront GraphQL.
Goals:
- Mobile page speed sub-1.5 seconds.
- Interactive slide-out mini-cart with bundle upsells.
- Integration with Klaviyo and customer reviews.
- Clean Tailwind CSS components.
Budget: $3,500. Timeline: 3 weeks.`,
  },
  {
    title: 'Enterprise AI Customer Support Copilot',
    category: 'AI & Copilots',
    text: `We need an experienced AI engineer to build a customer support assistant connecting to our internal Zendesk and Notion articles.
Requirements:
- Vector search with semantic grounding and zero hallucinations.
- Slack integration bot that answers questions in team channels.
- Web chat widget for logged-in clients.
- Admin dashboard for monitoring answered questions.
Budget: $6,000. Timeline: 4 weeks.`,
  },
  {
    title: 'High-Risk Red Flag Project (Scope Trap Demo)',
    category: 'Risk Scanner Demo',
    text: `URGENT! Need full clone of Airbnb + Uber in 48 hours for $250.
Must include native iOS and Android apps, payment gateway, live GPS driver tracking, and admin dashboard.
Will only pay after unlimited revisions. Must communicate 24/7 on Telegram. No agencies.`,
  },
];
