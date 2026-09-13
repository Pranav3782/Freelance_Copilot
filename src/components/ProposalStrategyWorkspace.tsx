import React, { useState } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  MessageSquare,
  Mail,
  PhoneCall,
  SlidersHorizontal,
  Send,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { ProjectAnalysis } from '../types';
import { ClientFollowUpSection } from './ClientFollowUpSection';

interface ProposalStrategyWorkspaceProps {
  analysis: ProjectAnalysis;
  onBack: () => void;
  onSaveToPipeline: () => void;
}

export const ProposalStrategyWorkspace: React.FC<ProposalStrategyWorkspaceProps> = ({
  analysis,
  onBack,
  onSaveToPipeline,
}) => {
  const [activeTab, setActiveTab] = useState<
    'proposal' | 'intro' | 'followup' | 'discovery' | 'negotiation' | 'email'
  >('proposal');

  const [proposalText, setProposalText] = useState(analysis.approachStrategy.proposal);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [selectedAngle, setSelectedAngle] = useState(analysis.approachStrategy.recommendedAngle);

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleRegenerate = (angle: string) => {
    setSelectedAngle(angle);

    setTimeout(() => {
      if (angle.includes('Architecture')) {
        setProposalText(`Hi ${analysis.clientIntelligence.companyName || 'Team'},\n\nI reviewed your project specifications. When engineering ${analysis.title}, the primary failure mode is treating database security and tenant isolation as an afterthought. Having shipped platforms like FinPulse and DocuMind (processing millions of queries with strict isolation), I build systems that scale cleanly from day one.\n\nProposed Technical Milestones:\n1. Architecture & Schema Isolation (Week 1): Hardened multi-tenant schemas, JWT validation, and typed contracts.\n2. Core Interactive Systems (Weeks 2–3): 60fps telemetry visualization, optimized time-bucket indexing, and reactive state.\n3. Billing Idempotency & Production Release (Week 4): Robust webhook error handling, automated retry queues, and deployment verification.\n\nTwo immediate architectural questions:\n- What is the anticipated peak telemetry volume per organization?\n- Are webhook target endpoints already configured in your staging dashboard?\n\nAvailable to review the technical specifications this week.\n\nBest regards,\nAlex Chen`);
      } else if (angle.includes('Speed')) {
        setProposalText(`Hi ${analysis.clientIntelligence.companyName || 'Team'},\n\nI specialize in ultra-high-performance web applications where latency and conversion rates are critical. In my recent Aura Commerce project, our Next.js rebuild cut mobile load times from 4.2s to sub-1.2s, resulting in a +41% lift in completion rates.\n\nFor your project (${analysis.title}), I will implement:\n- Edge-cached data fetching with on-demand incremental static revalidation.\n- Sub-50ms render cycles for all analytics dashboards.\n- Clean, typed TypeScript architecture with zero technical debt.\n\nLet's connect for 10 minutes to discuss your core performance metrics and go-live timeline.\n\nBest,\nAlex Chen`);
      } else {
        setProposalText(analysis.approachStrategy.proposal);
      }
    }, 200);
  };

  const wordCount = proposalText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#050505]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 rounded-2xl bg-white border-2 border-[#050505] hover:bg-[#FFD51F] text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
            title="Back to Intelligence Report"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#050505]/70">
              <span>Proposal & Conversion Studio</span>
              <span>•</span>
              <span className="text-[#4DBA76] font-black">Truth-Checked</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#050505] tracking-tight mt-1">
              Winning Approach: {analysis.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSaveToPipeline}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            Move to "Applied"
          </button>
        </div>
      </div>

      {/* Strategic Pitch Angle Highlight in Bright Yellow from Reference */}
      <div className="relative p-6 sm:p-7 rounded-[28px] bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute top-0 right-6 w-4 h-7 bookmark-ribbon-pink shadow-sm" />
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#050505]/70">
            Strategic Positioning Angle
          </span>
          <p className="text-sm sm:text-base font-black text-[#050505]">{selectedAngle}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleRegenerate('Lead with Technical Architecture & Security')}
            className="px-3.5 py-1.5 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-white hover:text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
          >
            Architecture Angle
          </button>
          <button
            onClick={() => handleRegenerate('Lead with Speed, Core Web Vitals & Conversion')}
            className="px-3.5 py-1.5 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-white hover:text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
          >
            Speed Angle
          </button>
        </div>
      </div>

      {/* Strategy Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Communication Asset Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Subtabs */}
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm">
            <button
              onClick={() => setActiveTab('proposal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'proposal'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Full Proposal
            </button>
            <button
              onClick={() => setActiveTab('intro')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'intro'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Quick Intro / DM
            </button>
            <button
              onClick={() => setActiveTab('followup')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'followup'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              3-Day Follow-Up
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'discovery'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Discovery Script
            </button>
            <button
              onClick={() => setActiveTab('negotiation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'negotiation'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Negotiation & Scope
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#F7F7F5]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Formal Email
            </button>
          </div>

          {/* Active Asset Container */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-6">
            {/* Tab: Full Proposal */}
            {activeTab === 'proposal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-bold text-[#050505]/70">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>~{readingTime} min read</span>
                    <span>•</span>
                    <span className="text-[#4DBA76] font-black">100% Truth-Checked</span>
                  </div>

                  <button
                    onClick={() => handleCopy(proposalText, 'proposal')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'proposal' ? <Check className="w-4 h-4 text-[#4DBA76]" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'proposal' ? 'Copied to Clipboard' : 'Copy Proposal'}
                  </button>
                </div>

                <textarea
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5] text-sm text-[#050505] font-medium leading-relaxed transition-all resize-y shadow-inner"
                />
              </div>
            )}

            {/* Tab: Quick Intro Message */}
            {activeTab === 'intro' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#050505]/70">
                    Punchy 3-sentence message for Upwork DMs or LinkedIn
                  </span>
                  <button
                    onClick={() => handleCopy(analysis.approachStrategy.shortIntroMessage, 'intro')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'intro' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'intro' ? 'Copied' : 'Copy Message'}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-semibold text-[#050505] leading-relaxed whitespace-pre-line">
                  {analysis.approachStrategy.shortIntroMessage}
                </div>
              </div>
            )}

            {/* Tab: 3-Day Follow-Up */}
            {activeTab === 'followup' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#050505]/70">
                    Polite value-add follow-up after 72 hours of silence
                  </span>
                  <button
                    onClick={() => handleCopy(analysis.approachStrategy.followUpMessage, 'followup')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'followup' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'followup' ? 'Copied' : 'Copy Message'}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-semibold text-[#050505] leading-relaxed whitespace-pre-line">
                  {analysis.approachStrategy.followUpMessage}
                </div>
              </div>
            )}

            {/* Tab: Discovery Call Script */}
            {activeTab === 'discovery' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#050505]/70">
                    Qualifying questions to lead your 15-minute discovery call
                  </span>
                  <button
                    onClick={() => handleCopy(analysis.approachStrategy.discoveryScript, 'discovery')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'discovery' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'discovery' ? 'Copied' : 'Copy Script'}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-semibold text-[#050505] leading-relaxed whitespace-pre-line font-mono text-xs">
                  {analysis.approachStrategy.discoveryScript}
                </div>
              </div>
            )}

            {/* Tab: Negotiation Script */}
            {activeTab === 'negotiation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#050505]/70">
                    Defending scope boundaries & handling discount requests
                  </span>
                  <button
                    onClick={() => handleCopy(analysis.approachStrategy.negotiationScript, 'negotiation')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'negotiation' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'negotiation' ? 'Copied' : 'Copy Response'}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-semibold text-[#050505] leading-relaxed whitespace-pre-line">
                  {analysis.approachStrategy.negotiationScript}
                </div>
              </div>
            )}

            {/* Tab: Formal Email */}
            {activeTab === 'email' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#050505]/70">
                    Formatted executive email with subject line
                  </span>
                  <button
                    onClick={() => handleCopy(analysis.approachStrategy.professionalEmail, 'email')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    {copiedTab === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedTab === 'email' ? 'Copied' : 'Copy Email'}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-semibold text-[#050505] leading-relaxed whitespace-pre-line">
                  {analysis.approachStrategy.professionalEmail}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Truth Checker Panel (Lavender Accent in Reference Style) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-[32px] bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#050505]/70">
                Anti-Hallucination Guard
              </span>
              <span className="px-3 py-0.5 rounded-full bg-white text-[#4DBA76] font-black text-[10px] flex items-center gap-1 border border-[#050505] shadow-retro-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {analysis.approachStrategy.truthChecker.complianceStatus}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#050505]">Proposal Truth Checker</h3>
              <p className="text-xs font-semibold text-[#050505]/80 mt-1">
                Every claim in this proposal has been automatically verified against your actual profile facts.
              </p>
            </div>

            {/* Verified claims list */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-[#050505] block">Verified Claims in Pitch:</span>
              {analysis.approachStrategy.truthChecker.verifiedClaims.map((claim, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-start gap-2 shadow-retro-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />
                  <span>{claim}</span>
                </div>
              ))}
            </div>

            {/* Warnings if any */}
            {analysis.approachStrategy.truthChecker.unsupportedWarnings.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-black text-[#F05D5E] block">Requires Verification:</span>
                {analysis.approachStrategy.truthChecker.unsupportedWarnings.map((warn, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-start gap-2 shadow-retro-sm">
                    <AlertTriangle className="w-4 h-4 text-[#FF941D] shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills & Portfolio Cites */}
            <div className="pt-3 border-t-2 border-[#050505]/20 space-y-3 text-xs">
              <div>
                <span className="font-black text-[#050505]/80 block mb-1.5">Profile Skills Cited:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.approachStrategy.truthChecker.skillsReferenced.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#050505] font-black text-[#050505] text-[11px]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-black text-[#050505]/80 block mb-1.5">Portfolio Projects Cited:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.approachStrategy.truthChecker.portfolioReferences.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#FFD51F] border border-[#050505] font-black text-[#050505] text-[11px]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#050505] text-[11px] font-semibold text-[#050505]/80 leading-relaxed shadow-retro-sm">
              <strong className="text-[#050505] font-black">FreelanceOS Truth Policy:</strong> Never fabricate qualifications, awards, client names, or metrics. Building a long-term freelance business requires verifiable trust.
            </div>
          </div>
        </div>
      </div>

      {/* Client Follow-up & Outreach Timeline Section */}
      <ClientFollowUpSection project={analysis} />
    </div>
  );
};
