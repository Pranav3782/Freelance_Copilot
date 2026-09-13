import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  IndianRupee,
  HelpCircle,
  Layers,
  Award,
  FileEdit,
  Share2,
  Info,
} from 'lucide-react';
import { ProjectAnalysis } from '../types';
import { ScoreRing } from './ScoreRing';
import { ClientFollowUpSection } from './ClientFollowUpSection';

interface AnalysisResultsViewProps {
  analysis: ProjectAnalysis;
  onBack: () => void;
  onOpenProposal: () => void;
  onUpdateStage: (stage: ProjectAnalysis['applicationStage']) => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  analysis,
  onBack,
  onOpenProposal,
}) => {
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const isApply = analysis.recommendation === 'APPLY';
  const isMaybe = analysis.recommendation === 'MAYBE';
  const isDanger = analysis.recommendation === "DON'T APPLY";

  const handleCopyQuestions = () => {
    const text = analysis.missingInformation
      .map((q, i) => `${i + 1}. ${q.question} (Reason: ${q.reason})`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const handleCopySummary = () => {
    const summary = `PROJECT INTELLIGENCE REPORT
Title: ${analysis.title}
Recommendation: ${analysis.recommendation} (${analysis.matchScore}% Match)
Budget: ${analysis.projectOverview?.budget || 'N/A'}
Client Risk: ${analysis.riskScanner?.overallRisk || 'N/A'} (${analysis.riskScanner?.riskScore || 0}/100)
Suggested Bid: ₹${analysis.pricingIntelligence?.suggestedMin || 0} - ₹${analysis.pricingIntelligence?.suggestedMax || 0}
Timeline: ${analysis.projectOverview?.timeline || 'N/A'}
Key Strategy: ${analysis.approachStrategy?.recommendedAngle || 'N/A'}`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#050505]">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 rounded-2xl bg-white border-2 border-[#050505] hover:bg-[#FFD51F] text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
            title="Back to Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#050505]/70">
              <span className="px-2 py-0.5 rounded-full bg-white border border-[#050505] text-[#050505] font-black uppercase text-[10px]">
                {analysis.source || 'Opportunity Analysis'}
              </span>
              <span>•</span>
              <span>{analysis.postedDate || 'Analyzed recently'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#050505] tracking-tight mt-1">
              {analysis.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm hover:bg-[#FFF39A] btn-tactile cursor-pointer"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-[#4DBA76]" /> : <Share2 className="w-4 h-4" />}
            {copiedSummary ? 'Copied Report' : 'Copy Summary'}
          </button>

          <button
            onClick={onOpenProposal}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD51F]" />
            Proposal & Strategy Suite
          </button>
        </div>
      </div>

      {/* Hero Decision Matrix Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Score & Verdict */}
          <div className="lg:col-span-5 flex items-center gap-6">
            <div className="p-3 bg-[#F7F7F5] rounded-3xl border-2 border-[#050505] shadow-retro-sm">
              <ScoreRing score={analysis.matchScore} size={130} strokeWidth={12} label="Fit Score" trackColor="#E5E5E0" textColor="#050505" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-2 border-[#050505] shadow-retro-sm ${
                    isApply
                      ? 'bg-[#4DBA76] text-white'
                      : isMaybe
                      ? 'bg-[#FF941D] text-white'
                      : 'bg-[#F05D5E] text-white'
                  }`}
                >
                  {isApply && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isMaybe && <AlertTriangle className="w-3.5 h-3.5" />}
                  {isDanger && <XCircle className="w-3.5 h-3.5" />}
                  {analysis.recommendation}
                </span>
                <span className="text-xs font-black text-[#050505]/70">
                  {analysis.subScores.difficulty} Difficulty
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#050505] tracking-tight">
                {isApply
                  ? 'Strong Match — Worth Pursuing'
                  : isMaybe
                  ? 'Proceed with Caution'
                  : 'High Risk — Skip Opportunity'}
              </h2>
              <p className="text-xs text-[#050505]/75 font-semibold leading-relaxed">
                {isApply
                  ? 'High alignment with your technical stack and past client outcomes. High probability of winning.'
                  : isMaybe
                  ? 'Viable project, but scope dependencies or secondary tech stack require clear boundary setting.'
                  : 'Critical risks detected. Severe budget deficit or predatory terms threaten freelancer rating.'}
              </p>
            </div>
          </div>

          {/* Sub-Score Bars */}
          <div className="lg:col-span-7 bg-[#F7F7F5] p-6 rounded-2xl border-2 border-[#050505] shadow-retro-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-[#050505]/70">Skill Match</span>
              <div className="text-base font-black text-[#050505]">{analysis.subScores.skillMatch}%</div>
              <div className="w-full bg-white border border-[#050505] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#4DBA76] h-full rounded-full"
                  style={{ width: `${analysis.subScores.skillMatch}%` }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-[#050505]/70">Experience Fit</span>
              <div className="text-base font-black text-[#050505]">{analysis.subScores.experienceMatch}%</div>
              <div className="w-full bg-white border border-[#050505] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#4DBA76] h-full rounded-full"
                  style={{ width: `${analysis.subScores.experienceMatch}%` }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-[#050505]/70">Portfolio Match</span>
              <div className="text-base font-black text-[#050505]">{analysis.subScores.portfolioMatch}%</div>
              <div className="w-full bg-white border border-[#050505] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#6F86F5] h-full rounded-full"
                  style={{ width: `${analysis.subScores.portfolioMatch}%` }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-[#050505]/70">Budget Fit</span>
              <div className="text-base font-black text-[#050505]">{analysis.subScores.budgetFit}%</div>
              <div className="w-full bg-white border border-[#050505] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    analysis.subScores.budgetFit >= 70 ? 'bg-[#4DBA76]' : 'bg-[#F05D5E]'
                  }`}
                  style={{ width: `${analysis.subScores.budgetFit}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Deep Intelligence Modules */}
        <div className="lg:col-span-8 space-y-8">
          {/* Module 1: Client Risk Scanner */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black border-2 border-[#050505] shadow-retro-sm ${
                    analysis.riskScanner.overallRisk === 'Low'
                      ? 'bg-[#4DBA76] text-white'
                      : analysis.riskScanner.overallRisk === 'Medium'
                      ? 'bg-[#FF941D] text-white'
                      : 'bg-[#F05D5E] text-white'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#050505]">Client & Project Risk Scanner</h3>
                  <p className="text-xs text-[#050505]/75 font-semibold">
                    Evaluates scope traps, unrealistic deadlines, payment security, and communication.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm ${
                    analysis.riskScanner.overallRisk === 'Low'
                      ? 'bg-[#4DBA76] text-white'
                      : analysis.riskScanner.overallRisk === 'Medium'
                      ? 'bg-[#FF941D] text-white'
                      : 'bg-[#F05D5E] text-white'
                  }`}
                >
                  {analysis.riskScanner.overallRisk} Risk ({analysis.riskScanner.riskScore}/100)
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              {analysis.riskScanner.checklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm flex items-start gap-3 transition-all"
                >
                  <div className="mt-0.5 shrink-0">
                    {item.status === 'pass' && <CheckCircle2 className="w-5 h-5 text-[#4DBA76]" />}
                    {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FF941D]" />}
                    {item.status === 'alert' && <XCircle className="w-5 h-5 text-[#F05D5E]" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#050505]/70">
                        {item.category} • {item.item}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-[#050505] ${
                          item.status === 'pass'
                            ? 'bg-[#4DBA76] text-white'
                            : item.status === 'warning'
                            ? 'bg-[#FF941D] text-white'
                            : 'bg-[#F05D5E] text-white'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-[#050505]">{item.title}</h4>
                    <p className="text-xs text-[#050505]/75 font-semibold leading-relaxed">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Hidden Requirements Detector */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F2A4DE] text-[#050505] flex items-center justify-center border-2 border-[#050505] shadow-retro-sm">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#050505]">Hidden Requirements Detector</h3>
                <p className="text-xs text-[#050505]/75 font-semibold">
                  AI uncovers implicit architectural dependencies that clients frequently forget to specify.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.hiddenRequirements.map((hr) => (
                <div
                  key={hr.id}
                  className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#6F86F5]">
                        {hr.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFD51F] text-[#050505] border border-[#050505] font-black text-[10px]">
                        Inferred Scope
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-[#050505]">{hr.name}</h4>
                    <p className="text-xs text-[#050505]/75 font-semibold mt-1.5 leading-relaxed">{hr.description}</p>
                  </div>

                  {hr.commonTrap && (
                    <div className="p-3 rounded-xl bg-[#FFF39A] border border-[#050505] text-[11px] text-[#050505] font-bold flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FF941D]" />
                      <span>{hr.commonTrap}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Module 3: Missing Information & High-Impact Questions */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#CDB3F4] text-[#050505] flex items-center justify-center border-2 border-[#050505] shadow-retro-sm">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#050505]">Clarification Questions for Client</h3>
                  <p className="text-xs text-[#050505]/75 font-semibold">
                    Asking these upfront demonstrates deep domain expertise and prevents uncompensated scope churn.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyQuestions}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#FFD51F] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              >
                {copiedQuestions ? <Check className="w-3.5 h-3.5 text-[#4DBA76]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedQuestions ? 'Copied' : 'Copy All'}
              </button>
            </div>

            <div className="space-y-3">
              {analysis.missingInformation.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-black text-[#050505]">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFD51F] text-[#050505] flex items-center justify-center text-xs font-black border border-[#050505]">
                        {idx + 1}
                      </span>
                      {q.question}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#050505] ${
                        q.impact === 'High' ? 'bg-[#F05D5E] text-white' : 'bg-[#6F86F5] text-white'
                      }`}
                    >
                      {q.impact} Impact
                    </span>
                  </div>
                  <p className="text-[#050505]/75 font-semibold pl-8 leading-relaxed">{q.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Client Intel, Pricing & Competitive Position */}
        <div className="lg:col-span-4 space-y-8">
          {/* Client Intelligence Card */}
          <div className="p-6 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#050505]/70">
                Client Intelligence
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4DBA76] text-white text-[10px] font-black flex items-center gap-1 border border-[#050505]">
                <ShieldCheck className="w-3 h-3" />
                {analysis.clientIntelligence.confidence} Confidence
              </span>
            </div>

            <div>
              <h4 className="text-xl font-black text-[#050505]">
                {analysis.clientIntelligence.companyName || 'Anonymous Employer'}
              </h4>
              <p className="text-xs font-semibold text-[#050505]/70 mt-0.5">
                {analysis.clientIntelligence.industry} • {analysis.clientIntelligence.location}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70">Marketplace Spend:</span>
                <span className="font-black text-[#050505]">{analysis.clientIntelligence.totalSpent}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70">Hire Rate:</span>
                <span className="font-black text-[#4DBA76]">{analysis.clientIntelligence.hireRate}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70">Average Rate Paid:</span>
                <span className="font-black text-[#050505]">{analysis.clientIntelligence.avgHourlyPaid}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70">Payment Status:</span>
                <span className="font-black text-[#4DBA76]">
                  {analysis.clientIntelligence.paymentVerified ? 'Verified Method' : 'Unverified'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm text-xs text-[#050505] space-y-1">
              <span className="font-black block text-[#050505]">Public Business Context:</span>
              <p className="text-[#050505]/85 font-semibold leading-relaxed">
                {analysis.clientIntelligence.publicBusinessInfo}
              </p>
            </div>

            <div className="text-[10px] font-bold text-[#050505]/60 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Publicly verifiable data. No personal data scraping.</span>
            </div>
          </div>

          {/* Pricing Intelligence Card (Yellow Accent in Reference Theme) */}
          <div className="relative p-6 rounded-[32px] bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro space-y-5 overflow-hidden">
            <div className="absolute top-0 right-6 w-4 h-7 bookmark-ribbon-pink shadow-sm" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#050505] text-white flex items-center justify-center font-bold">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-base text-[#050505]">Pricing Intelligence</h4>
                <span className="text-[10px] font-bold text-[#050505]/70">Fair value & milestone strategy</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#050505]/70">Client Stated:</span>
                <span className="font-black text-[#050505]">{analysis.pricingIntelligence?.clientStatedBudget || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#050505]/70">Estimated Effort:</span>
                <span className="font-black text-[#050505]">{analysis.pricingIntelligence?.estimatedEffortHours || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#050505]/70">Your Rate Floor:</span>
                <span className="font-black text-[#4DBA76]">₹{analysis.pricingIntelligence?.freelancerFloor || 0}</span>
              </div>
              <div className="pt-2 border-t-2 border-[#050505] flex justify-between items-center text-sm font-black">
                <span className="text-[#050505]">Suggested Quote:</span>
                <span className="text-[#6F86F5]">
                  ₹{analysis.pricingIntelligence?.suggestedMin || 0} – ₹{analysis.pricingIntelligence?.suggestedMax || 0}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#050505]/85 font-semibold leading-relaxed">
              {analysis.pricingIntelligence?.rationale || ''}
            </p>

            <div className="p-3.5 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm text-xs text-[#050505] space-y-1">
              <span className="font-black block text-[#050505]">Recommended Bidding Tactic:</span>
              <p className="text-[#050505]/80 font-semibold leading-relaxed">
                {analysis.pricingIntelligence?.biddingStrategy || ''}
              </p>
            </div>
          </div>

          {/* Competitive Positioning & Highlighted Portfolio (Lavender Accent) */}
          <div className="p-6 rounded-[32px] bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#050505] text-white flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-base text-[#050505]">Competitive Edge</h4>
                <span className="text-[10px] font-bold text-[#050505]/70">Your unfair advantages</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-black text-[#050505] block">Top Match Strengths:</span>
              {analysis.competitivePosition.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2 font-bold text-[#050505]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t-2 border-[#050505]/20 space-y-2 text-xs">
              <span className="font-black text-[#050505] block">Portfolio to Highlight:</span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.competitivePosition.portfolioToHighlight.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-white border-2 border-[#050505] font-black text-[#050505] text-xs shadow-retro-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Jump to Proposal CTA */}
            <button
              onClick={onOpenProposal}
              className="w-full py-3.5 rounded-2xl bg-[#050505] text-white font-black text-xs hover:bg-[#6F86F5] transition-all flex items-center justify-center gap-2 border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <FileEdit className="w-4 h-4" />
              Open Proposal & Strategy Suite
            </button>
          </div>
        </div>
      </div>

      {/* Client Follow-up & Outreach Section */}
      <ClientFollowUpSection project={analysis} />
    </div>
  );
};
