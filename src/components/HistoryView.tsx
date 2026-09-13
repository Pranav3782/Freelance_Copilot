import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ProjectAnalysis } from '../types';

interface HistoryViewProps {
  projects: ProjectAnalysis[];
  onSelectProject: (proj: ProjectAnalysis) => void;
  onAnalyzeNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  projects,
  onSelectProject,
  onAnalyzeNew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRec, setFilterRec] = useState<'ALL' | 'APPLY' | 'MAYBE' | "DON'T APPLY">('ALL');

  const safeProjects = Array.isArray(projects) ? projects : [];

  const filtered = safeProjects.filter((p) => {
    if (!p) return false;
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.clientIntelligence?.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.projectOverview?.technologies || []).some((t) => (t || '').toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRec = filterRec === 'ALL' || p.recommendation === filterRec;

    return matchesSearch && matchesRec;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#050505]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#050505]/70">
            <span>Opportunity Intelligence Archive</span>
            <span>•</span>
            <span className="text-[#6F86F5] font-black">{projects.length} Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight mt-1">
            Analysis History & Insights
          </h1>
          <p className="text-sm text-[#050505]/75 font-semibold mt-1">
            Review past project breakdowns, client risk scans, pricing models, and proposal strategies.
          </p>
        </div>

        <button
          onClick={onAnalyzeNew}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#FFD51F]" />
          Analyze New Project
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#050505]/60" />
          <input
            type="text"
            placeholder="Search title, tech stack, or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/50 shadow-retro-sm focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setFilterRec('ALL')}
            className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs font-black border-2 border-[#050505] shadow-retro-sm transition-colors duration-150 cursor-pointer ${
              filterRec === 'ALL'
                ? 'bg-[#FFD51F] text-[#050505]'
                : 'bg-white text-[#050505] hover:bg-[#FFF39A]'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilterRec('APPLY')}
            className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs font-black border-2 border-[#050505] shadow-retro-sm transition-colors duration-150 cursor-pointer ${
              filterRec === 'APPLY'
                ? 'bg-[#4DBA76] text-white'
                : 'bg-white text-[#050505] hover:bg-[#4DBA76] hover:text-white'
            }`}
          >
            Apply ({projects.filter((p) => p.recommendation === 'APPLY').length})
          </button>
          <button
            onClick={() => setFilterRec('MAYBE')}
            className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs font-black border-2 border-[#050505] shadow-retro-sm transition-colors duration-150 cursor-pointer ${
              filterRec === 'MAYBE'
                ? 'bg-[#FF941D] text-white'
                : 'bg-white text-[#050505] hover:bg-[#FF941D] hover:text-white'
            }`}
          >
            Caution ({projects.filter((p) => p.recommendation === 'MAYBE').length})
          </button>
          <button
            onClick={() => setFilterRec("DON'T APPLY")}
            className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs font-black border-2 border-[#050505] shadow-retro-sm transition-colors duration-150 cursor-pointer ${
              filterRec === "DON'T APPLY"
                ? 'bg-[#F05D5E] text-white'
                : 'bg-white text-[#050505] hover:bg-[#F05D5E] hover:text-white'
            }`}
          >
            Skip ({projects.filter((p) => p.recommendation === "DON'T APPLY").length})
          </button>
        </div>
      </div>

      {/* Projects List / Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-3">
            <p className="text-base font-black text-[#050505]">No matching opportunities found</p>
            <p className="text-xs font-semibold text-[#050505]/70">Try adjusting your search keywords or filter settings.</p>
          </div>
        ) : (
          filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="p-6 rounded-[28px] bg-white border-2 border-[#050505] shadow-retro hover:shadow-retro-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider flex items-center gap-1 border-2 border-[#050505] shadow-retro-sm ${
                      proj.recommendation === 'APPLY'
                        ? 'bg-[#4DBA76] text-white'
                        : proj.recommendation === 'MAYBE'
                        ? 'bg-[#FF941D] text-white'
                        : 'bg-[#F05D5E] text-white'
                    }`}
                  >
                    {proj.recommendation === 'APPLY' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {proj.recommendation === 'MAYBE' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {proj.recommendation === "DON'T APPLY" && <XCircle className="w-3.5 h-3.5" />}
                    {proj.recommendation} ({proj.matchScore}% Match)
                  </span>

                  <span className="text-[#050505]/40">•</span>
                  <span className="text-[#050505]/70 font-bold">{proj.source || 'Upwork'}</span>
                  <span className="text-[#050505]/40">•</span>
                  <span className="font-black text-[#050505]">{proj.projectOverview?.budget || 'Fixed / Hourly'}</span>
                </div>

                <h3 className="text-lg font-black text-[#050505] group-hover:text-[#6F86F5] transition-colors leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#050505]/75 font-semibold line-clamp-1 max-w-3xl leading-relaxed">
                  {proj.description || 'Project analysis record'}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(proj.projectOverview?.technologies || []).slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-[#F7F7F5] border border-[#050505] text-[10px] font-black text-[#050505]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side Stats & Action */}
              <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] uppercase font-black text-[#050505]/70 block whitespace-nowrap">Client Risk</span>
                  <span
                    className={`text-xs font-black whitespace-nowrap ${
                      proj.riskScanner?.overallRisk === 'Low'
                        ? 'text-[#4DBA76]'
                        : proj.riskScanner?.overallRisk === 'Medium'
                        ? 'text-[#FF941D]'
                        : 'text-[#F05D5E]'
                    }`}
                  >
                    {proj.riskScanner?.overallRisk || 'Low'} ({proj.riskScanner?.riskScore || 0}/100)
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(proj);
                  }}
                  className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050505] group-hover:bg-[#6F86F5] text-white text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer"
                >
                  <span>View Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
