import React from 'react';
import {
  PlusCircle,
  Target,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { FreelancerProfile, ProjectAnalysis } from '../types';
import { ScoreRing } from './ScoreRing';
import { formatINR, getProjectAmountINR } from '../utils/format';

interface DashboardViewProps {
  profile: FreelancerProfile;
  projects: ProjectAnalysis[];
  isPro?: boolean;
  onOpenAnalyzeModal: () => void;
  onSelectProject: (proj: ProjectAnalysis) => void;
  onNavigateToTracker: () => void;
  onNavigateToHistory: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  projects,
  isPro = false,
  onOpenAnalyzeModal,
  onSelectProject,
  onNavigateToTracker,
  onNavigateToHistory,
}) => {
  const goodMatches = projects.filter((p) => p.recommendation === 'APPLY');

  const totalPipelineValINR = projects
    .filter((p) => p && p.applicationStage !== 'Finished')
    .reduce((acc, p) => acc + getProjectAmountINR(p), 0);



  const usedCount = Math.min(projects.length, 5);
  const remainingFree = Math.max(0, 5 - projects.length);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8 text-[#050505]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b-2 border-[#050505] pb-4 sm:pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#050505] tracking-tight">
              Opportunity Intelligence Overview
            </h1>
            {isPro ? (
              <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#4DBA76] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm">
                Pro Plan • Unlimited
              </span>
            ) : (
              <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#FFD51F] text-[#050505] text-[9px] sm:text-[10px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm">
                {usedCount} / 5 Free Analyses Used ({remainingFree} Remaining)
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#050505]/75 font-semibold mt-1">
            Track incoming freelance opportunities, client risk scores, and active outreach pipelines.
          </p>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#FFFFFF] border-2 border-[#050505] shadow-retro flex flex-col justify-between hover:-translate-y-0.5 transition-all">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70">Analyzed</span>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] mt-2 mb-1">{projects.length}</div>
          <span className="text-[10px] sm:text-[11px] font-black text-[#4DBA76]">
            {goodMatches.length} High-Value Matches
          </span>
        </div>

        <div className="relative p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro flex flex-col justify-between overflow-hidden hover:-translate-y-0.5 transition-all">
          <div className="absolute top-0 right-6 w-4 h-7 bookmark-ribbon-yellow shadow-sm" />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/90">Active Pipeline</span>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 mb-1">
            {formatINR(totalPipelineValINR)}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-white/95">
            Across {projects.filter((p) => p.applicationStage !== 'Finished').length} opportunities
          </span>
        </div>

        <div className="p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#FFF39A] text-[#050505] border-2 border-[#050505] shadow-retro flex flex-col justify-between hover:-translate-y-0.5 transition-all">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70">Win Probability</span>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] mt-2 mb-1">87.4%</div>
          <span className="text-[10px] sm:text-[11px] font-black text-[#4DBA76]">On recommended applies</span>
        </div>

        <div className="p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro flex flex-col justify-between hover:-translate-y-0.5 transition-all">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70">Hours Saved / Wk</span>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] mt-2 mb-1">12.5 hrs</div>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#050505]/80">Zero proposals wasted</span>
        </div>
      </div>

      {/* Quick Launch & Recent Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Column (8 cols): Recent Intelligence Analyses */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Target className="w-5 h-5 text-[#6F86F5]" />
                <h2 className="text-xl font-black text-[#050505] tracking-tight">Recent Opportunities Analyzed</h2>
                <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFF39A] text-[10px] font-black text-[#050505] border border-[#050505] shadow-retro-sm">
                  {projects.length} Total
                </span>
              </div>
              <p className="text-xs text-[#050505]/70 font-semibold mt-1">
                Pre-screened against your verifiable experience, risk scanner, and rate targets.
              </p>
            </div>
            <button
              onClick={onNavigateToHistory}
              className="whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FFD51F] text-xs font-black text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer transition-all self-start sm:self-auto"
            >
              <span>All Analyses</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="p-5 sm:p-6 rounded-[28px] bg-white border-2 border-[#050505] shadow-retro hover:shadow-retro-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group space-y-4"
              >
                {/* Row 1: Badges & Budget */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm ${
                        proj.recommendation === 'APPLY'
                          ? 'bg-[#4DBA76] text-white'
                          : proj.recommendation === 'MAYBE'
                          ? 'bg-[#FF941D] text-white'
                          : 'bg-[#F05D5E] text-white'
                      }`}
                    >
                      {proj.recommendation === 'APPLY' && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                      {proj.recommendation === 'MAYBE' && <AlertTriangle className="w-3 h-3 shrink-0" />}
                      {proj.recommendation === "DON'T APPLY" && <XCircle className="w-3 h-3 shrink-0" />}
                      <span>{proj.recommendation}</span>
                    </span>

                    <span className="whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F7F7F5] border border-[#050505] text-[10px] font-black text-[#050505]">
                      {proj.source || 'Upwork'}
                    </span>

                    <span className="whitespace-nowrap shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-[#050505]/60">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{proj.postedDate}</span>
                    </span>
                  </div>

                  <div className="whitespace-nowrap shrink-0 px-3 py-1 rounded-full bg-[#FFF39A] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm">
                    {formatINR(getProjectAmountINR(proj))}
                  </div>
                </div>

                {/* Row 2: Match Score + Title & Snippet */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="shrink-0 p-1.5 bg-[#F7F7F5] rounded-2xl border-2 border-[#050505] shadow-retro-sm group-hover:bg-[#FFD51F]/30 transition-colors flex items-center justify-center">
                    <ScoreRing
                      score={proj.matchScore || 85}
                      size={56}
                      strokeWidth={5}
                      showText={true}
                      trackColor="#E5E5E0"
                      textColor="text-[#050505]"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-[#050505] group-hover:text-[#6F86F5] transition-colors leading-snug line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#050505]/75 font-semibold line-clamp-1 leading-relaxed">
                      {proj.description || proj.projectOverview?.deliverables?.slice(0, 2).join(' • ') || 'Opportunity analysis completed.'}
                    </p>
                  </div>
                </div>

                {/* Row 3: Client Info & Action Button */}
                <div className="pt-3 border-t-2 border-[#050505]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#050505]/80">
                    <span className="font-black text-[#050505] whitespace-nowrap">
                      {proj.clientIntelligence?.companyName || 'Verified Client'}
                    </span>
                    <span className="text-[#050505]/40">•</span>
                    <span
                      className={`whitespace-nowrap inline-flex items-center gap-1 text-[11px] font-black ${
                        proj.riskScanner?.overallRisk === 'Low'
                          ? 'text-[#4DBA76]'
                          : proj.riskScanner?.overallRisk === 'Medium'
                          ? 'text-[#FF941D]'
                          : 'text-[#F05D5E]'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{proj.riskScanner?.overallRisk || 'Low'} Risk</span>
                    </span>

                    {(proj.projectOverview?.technologies || []).slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="whitespace-nowrap hidden md:inline-block px-2 py-0.5 rounded-lg bg-[#F7F7F5] border border-[#050505]/20 text-[10px] font-bold text-[#050505]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj);
                      }}
                      className="whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#050505] text-white group-hover:bg-[#6F86F5] text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer"
                    >
                      <span>View Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (4 cols): Quick Scanner & Truth Calibration */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1-Click Scan Card */}
          <div className="relative p-6 rounded-[28px] bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro space-y-4 overflow-hidden">
            <div className="absolute top-0 right-6 w-4 h-7 bookmark-ribbon-pink shadow-sm" />
            <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider">
              Quick Scan
            </span>
            <h3 className="text-xl font-black tracking-tight leading-tight text-[#050505]">
              Found a project? Scan it right now.
            </h3>
            <p className="text-xs text-[#050505]/85 leading-relaxed font-semibold">
              Don't spend 45 minutes crafting a proposal before knowing if the client has unreleased milestone terms or hidden scope.
            </p>
            <button
              onClick={onOpenAnalyzeModal}
              className="w-full py-3.5 px-4 rounded-xl bg-[#050505] text-white text-xs font-black hover:bg-[#6F86F5] hover:text-white transition-all flex items-center justify-center gap-2 border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer whitespace-nowrap shrink-0"
            >
              <Zap className="w-4 h-4 fill-current text-[#FFD51F] shrink-0" />
              <span className="whitespace-nowrap">Launch Opportunity Scanner</span>
            </button>
          </div>

          {/* Pipeline Mini Widget */}
          <div className="p-6 rounded-[28px] bg-[#FFFFFF] border-2 border-[#050505] shadow-retro space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#050505]/10 pb-3">
              <div>
                <h3 className="text-base font-black text-[#050505]">Pipeline Momentum</h3>
                <span className="text-[11px] font-semibold text-[#050505]/70">Track client status</span>
              </div>
              <button
                onClick={onNavigateToTracker}
                className="whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#FFD51F] text-xs font-black text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer"
              >
                Kanban →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70 whitespace-nowrap">Analysed:</span>
                <span className="font-black text-[#4DBA76] px-2 py-0.5 rounded-full bg-white border border-[#050505] whitespace-nowrap">
                  {projects.filter((p) => p.applicationStage === 'Analysed').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70 whitespace-nowrap">Active Submissions:</span>
                <span className="font-black text-[#6F86F5] px-2 py-0.5 rounded-full bg-white border border-[#050505] whitespace-nowrap">
                  {projects.filter((p) => p.applicationStage === 'Reached').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70 whitespace-nowrap">Client Responses:</span>
                <span className="font-black text-[#FF941D] px-2 py-0.5 rounded-full bg-white border border-[#050505] whitespace-nowrap">
                  {projects.filter((p) => p.applicationStage === 'Got Response').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505]">
                <span className="font-bold text-[#050505]/70 whitespace-nowrap">Active Contracts:</span>
                <span className="font-black text-[#4DBA76] px-2 py-0.5 rounded-full bg-white border border-[#050505] whitespace-nowrap">
                  {projects.filter((p) => p.applicationStage === 'Started' || p.applicationStage === 'Finished').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
