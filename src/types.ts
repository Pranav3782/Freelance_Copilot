export type RecommendationType = 'APPLY' | 'MAYBE' | "DON'T APPLY";

export type ApplicationStage =
  | 'Analysed'
  | 'Reached'
  | 'Got Response'
  | 'Started'
  | 'Finished';

export type AppView =
  | 'landing'
  | 'auth'
  | 'about'
  | 'how-it-works'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'dashboard'
  | 'analyze'
  | 'results'
  | 'proposal'
  | 'profile'
  | 'tracker'
  | 'history'
  | 'follow-ups';

export type PaymentState =
  | 'idle'
  | 'creating_order'
  | 'checkout_open'
  | 'payment_processing'
  | 'verification_pending'
  | 'success'
  | 'cancelled'
  | 'failed'
  | 'verification_failed';

export interface SubscriptionData {
  plan: 'free' | 'pro';
  activatedAt?: string;
  orderId?: string;
  paymentId?: string;
}


export interface FreelancerSkill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  verified: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  client: string;
  metric?: string;
  url?: string;
}

export interface FreelancerProfile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  experienceYears: number;
  hourlyRate: number;
  minProjectBudget: number;
  weeklyAvailability: number;
  skills: FreelancerSkill[];
  technologies: string[];
  certifications: string[];
  portfolio: PortfolioProject[];
  preferredProjectTypes: string[];
  preferredIndustries: string[];
  languages: string[];
  profileCompletionScore: number;
}

export interface RiskCheckItem {
  id: string;
  item: string;
  category: 'Scope' | 'Budget' | 'Deadline' | 'Security' | 'Communication' | 'Clarity';
  status: 'pass' | 'warning' | 'alert';
  title: string;
  explanation: string;
}

export interface HiddenRequirement {
  id: string;
  name: string;
  category: string;
  isInferred: boolean;
  description: string;
  effortImpact: 'Low' | 'Medium' | 'High';
  commonTrap: string;
}

export interface MissingInfoQuestion {
  id: string;
  question: string;
  reason: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface PublicProfileLink {
  platform: string;
  handle: string;
  url: string;
}

export interface ClientIntelligence {
  companyName: string;
  industry: string;
  location: string;
  website?: string;
  publicBusinessInfo: string;
  publicProfiles: PublicProfileLink[];
  availableContactChannels: string[];
  sourceLabels: string[];
  confidence: 'High' | 'Medium' | 'Low';
  paymentVerified: boolean;
  hireRate: string;
  totalSpent: string;
  avgHourlyPaid: string;
  memberSince: string;
}

export interface SubScores {
  skillMatch: number;
  experienceMatch: number;
  portfolioMatch: number;
  budgetFit: number;
  difficulty: 'Low' | 'Medium' | 'High' | 'Expert';
}

export interface PricingIntelligence {
  clientStatedBudget: string;
  estimatedEffortHours: string;
  suggestedMin: number;
  suggestedMax: number;
  freelancerFloor: number;
  rationale: string;
  biddingStrategy: string;
}

export interface CompetitivePosition {
  advantages: string[];
  weaknesses: string[];
  recommendedPositioning: string;
  portfolioToHighlight: string[];
}

export interface ProposalTruthChecker {
  verifiedClaims: string[];
  unsupportedWarnings: string[];
  skillsReferenced: string[];
  portfolioReferences: string[];
  complianceStatus: 'Verified & Safe' | 'Caution Required';
}

export interface ApproachStrategy {
  recommendedAngle: string;
  proposal: string;
  shortIntroMessage: string;
  followUpMessage: string;
  discoveryScript: string;
  negotiationScript: string;
  professionalEmail: string;
  truthChecker: ProposalTruthChecker;
}

export interface ProjectAnalysis {
  id: string;
  title: string;
  source: string;
  postedDate: string;
  description: string;
  rawText?: string;
  screenshotUrl?: string;
  recommendation: RecommendationType;
  matchScore: number;
  subScores: SubScores;
  projectOverview: {
    budget: string;
    timeline: string;
    projectType: string;
    experienceRequested: string;
    technologies: string[];
    deliverables: string[];
    urgency: 'Low' | 'Normal' | 'High' | 'Immediate';
  };
  clientIntelligence: ClientIntelligence;
  riskScanner: {
    overallRisk: 'Low' | 'Medium' | 'High';
    riskScore: number;
    checklist: RiskCheckItem[];
  };
  hiddenRequirements: HiddenRequirement[];
  missingInformation: MissingInfoQuestion[];
  pricingIntelligence: PricingIntelligence;
  competitivePosition: CompetitivePosition;
  approachStrategy: ApproachStrategy;
  applicationStage: ApplicationStage;
  analysisTimestamp: string;
  notes?: string;
}

export interface AICredentialStatus {
  connected: boolean;
  provider?: string;
  status?: 'active' | 'invalid' | 'revoked';
  keyLastFour?: string;
  validatedAt?: string;
  lastUsedAt?: string;
}

// ─── Outreach & Follow-up Tracking Data Models ────────────────────────────────
export type OutreachChannel =
  | 'Freelancer'
  | 'Email'
  | 'Phone'
  | 'WhatsApp'
  | 'LinkedIn'
  | 'Website Form'
  | 'Other';

export type OutreachEventType =
  | 'Initial Contact'
  | 'Follow-up'
  | 'Client Replied'
  | 'Phone Call'
  | 'Meeting'
  | 'Proposal Sent'
  | 'Pricing Discussion'
  | 'Negotiation'
  | 'Portfolio Shared'
  | 'Requirement Clarification'
  | 'Client Requested Changes'
  | 'Final Follow-up'
  | 'Won'
  | 'Lost'
  | 'No Response';

export type OutreachOutcome =
  | 'No Response'
  | 'Replied'
  | 'Interested'
  | 'Not Interested'
  | 'Asked Information'
  | 'Requested Proposal'
  | 'Requested Call'
  | 'Negotiating'
  | 'Won'
  | 'Lost';

export interface OutreachEvent {
  id: string;
  opportunityId: string;
  userId: string;
  sequenceNumber: number;
  type: OutreachEventType;
  channel: OutreachChannel;
  occurredAt: string;
  outcome?: OutreachOutcome;
  notes?: string;
  nextFollowUpDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FollowUpItem {
  id: string;
  opportunityId: string;
  projectId: string;
  projectTitle: string;
  clientName: string;
  clientCompany?: string;
  userId: string;
  outreachEventId?: string;
  dueAt: string;
  status: 'pending' | 'completed' | 'overdue';
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityClient {
  id: string;
  userId: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientOpportunity {
  id: string;
  userId: string;
  projectId: string;
  clientId: string;
  status: ApplicationStage;
  currentFollowUpStatus: 'Waiting for Reply' | 'Needs Follow-up' | 'Overdue' | 'Replied' | 'Closed';
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
  totalContactAttempts: number;
  lastContactMethod?: OutreachChannel;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityOutreachSummary {
  opportunity: ClientOpportunity;
  client: OpportunityClient;
  project: ProjectAnalysis;
  events: OutreachEvent[];
  pendingFollowUp?: FollowUpItem | null;
}

export interface OutreachMetrics {
  totalContacted: number;
  dueTodayCount: number;
  overdueCount: number;
  waitingForReplyCount: number;
  wonCount: number;
  lostCount: number;
}


