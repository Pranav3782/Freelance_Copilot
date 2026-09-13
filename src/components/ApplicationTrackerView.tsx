import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  GripVertical,
  MoveHorizontal,
  ChevronDown,
  CheckCircle2,
  Send,
  MessageSquare,
  Play,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { ProjectAnalysis, ApplicationStage } from '../types';

export function formatINR(val: number | string): string {
  if (typeof val === 'number') {
    const rupees = val < 10000 ? Math.round(val * 85) : val;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rupees);
  }
  
  if (!val) return '₹0';
  const str = String(val).trim();
  const hasDollar = str.includes('$');
  const numMatch = str.match(/[\d,.]+/);
  if (!numMatch) return str;

  let num = parseFloat(numMatch[0].replace(/,/g, ''));
  if (isNaN(num)) return str;

  if (hasDollar || num < 10000) {
    num = Math.round(num * 85);
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

interface ApplicationTrackerViewProps {
  projects: ProjectAnalysis[];
  onSelectProject: (proj: ProjectAnalysis) => void;
  onUpdateStage: (projectId: string, stage: ApplicationStage) => void;
  onAnalyzeNew: () => void;
}

const STAGES: ApplicationStage[] = [
  'Analysed',
  'Reached',
  'Got Response',
  'Started',
  'Finished',
];

const STAGE_CONFIG: Record<
  ApplicationStage,
  { color: string; bg: string; border: string; headerBg: string; icon: React.ReactNode; pill: string }
> = {
  'Analysed': {
    color: 'text-[#050505]',
    bg: 'bg-[#F7F7F5]',
    border: 'border-[#050505]',
    headerBg: 'bg-[#FFF39A]',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    pill: 'bg-[#FFF39A] text-[#050505] border-[#050505]',
  },
  'Reached': {
    color: 'text-white',
    bg: 'bg-[#6F86F5]',
    border: 'border-[#050505]',
    headerBg: 'bg-[#6F86F5]',
    icon: <Send className="w-3.5 h-3.5" />,
    pill: 'bg-[#6F86F5] text-white border-[#050505]',
  },
  'Got Response': {
    color: 'text-[#050505]',
    bg: 'bg-[#F2A4DE]',
    border: 'border-[#050505]',
    headerBg: 'bg-[#F2A4DE]',
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    pill: 'bg-[#F2A4DE] text-[#050505] border-[#050505]',
  },
  'Started': {
    color: 'text-white',
    bg: 'bg-[#FF941D]',
    border: 'border-[#050505]',
    headerBg: 'bg-[#FF941D]',
    icon: <Play className="w-3.5 h-3.5" />,
    pill: 'bg-[#FF941D] text-white border-[#050505]',
  },
  'Finished': {
    color: 'text-[#050505]',
    bg: 'bg-[#4DBA76]',
    border: 'border-[#050505]',
    headerBg: 'bg-[#FFD51F]',
    icon: <Trophy className="w-3.5 h-3.5" />,
    pill: 'bg-[#FFD51F] text-[#050505] border-[#050505]',
  },
};

// ─── Beautiful custom dropdown ────────────────────────────────────────────────
interface StageDropdownProps {
  value: ApplicationStage;
  onChange: (stage: ApplicationStage) => void;
  compact?: boolean;
}

const StageDropdown: React.FC<StageDropdownProps> = ({ value, onChange, compact = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cfg = STAGE_CONFIG[value];

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 border-[#050505] font-black text-[10px] shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 transition-all cursor-pointer select-none ${cfg.pill}`}
      >
        {cfg.icon}
        {compact ? value : `Move → ${value}`}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 z-50 w-44 bg-white border-2 border-[#050505] rounded-2xl shadow-retro overflow-hidden animate-in slide-in-from-bottom duration-150">
          {STAGES.map((stage) => {
            const s = STAGE_CONFIG[stage];
            const isActive = stage === value;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => { onChange(stage); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-[11px] font-black transition-all cursor-pointer border-b border-[#050505]/10 last:border-0
                  ${isActive ? `${s.headerBg} ${s.color}` : 'hover:bg-[#F7F7F5] text-[#050505]'}
                `}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border border-[#050505] ${s.headerBg} ${s.color}`}>
                  {s.icon}
                </span>
                {stage}
                {isActive && <span className="ml-auto text-[8px] font-black uppercase tracking-wider opacity-60">Current</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  projects,
  onSelectProject,
  onUpdateStage,
  onAnalyzeNew,
}) => {
  const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ApplicationStage | null>(null);
  const [mobileActiveStage, setMobileActiveStage] = useState<ApplicationStage>('Analysed');
  const [mobileStagePanelOpen, setMobileStagePanelOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const handleStageChange = (projectId: string, newStage: ApplicationStage) => {
    onUpdateStage(projectId, newStage);
    if (newStage === 'Finished') triggerConfetti();
  };

  const handleDragStart = (e: React.DragEvent, projId: string) => {
    e.dataTransfer.setData('text/plain', projId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedProjectId(projId);
  };

  const handleDragEnd = () => { setDraggedProjectId(null); setDragOverStage(null); };

  const handleDragOver = (e: React.DragEvent, stage: ApplicationStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStage !== stage) setDragOverStage(stage);
  };

  const handleDragLeave = (e: React.DragEvent, stage: ApplicationStage) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      if (dragOverStage === stage) setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, stage: ApplicationStage) => {
    e.preventDefault();
    const projId = e.dataTransfer.getData('text/plain') || draggedProjectId;
    if (projId) handleStageChange(projId, stage);
    setDragOverStage(null);
    setDraggedProjectId(null);
  };

  // Metrics
  const finishedCount = projects.filter((p) => p.applicationStage === 'Finished').length;
  const respondedCount = projects.filter((p) =>
    ['Got Response', 'Started', 'Finished'].includes(p.applicationStage)
  ).length;
  const reachedCount = projects.filter((p) =>
    ['Reached', 'Got Response', 'Started', 'Finished'].includes(p.applicationStage)
  ).length;
  const responseRate = reachedCount > 0 ? Math.round((respondedCount / reachedCount) * 100) : 0;
  const totalPipelineValueINR = projects.reduce((acc, p) => acc + Math.round((p.pricingIntelligence?.suggestedMax || 3500) * 85), 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8 text-[#050505]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b-2 border-[#050505] pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#050505]/70">
            <span>Opportunity Intelligence</span>
            <span>•</span>
            <span className="text-[#6F86F5] font-black">Opportunity Pipeline</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#050505] tracking-tight mt-1">
            Application Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#050505]/75 font-semibold mt-1">
            Track every opportunity from analysis to completion.
          </p>
        </div>

        <button
          onClick={onAnalyzeNew}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-xs sm:text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4 text-[#FFD51F]" />
          Analyze New Project
        </button>
      </div>

      {/* Pipeline Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-[20px] bg-white border-2 border-[#050505] shadow-retro">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70 block">Total Projects</span>
          <div className="text-2xl sm:text-3xl font-black text-[#050505] mt-1">{projects.length}</div>
          <span className="text-[10px] sm:text-[11px] text-[#6F86F5] font-black mt-1 block">In Pipeline</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[20px] bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/80 block">Pipeline Value</span>
          <div className="text-2xl sm:text-3xl font-black mt-1">{formatINR(totalPipelineValueINR)}</div>
          <span className="text-[10px] sm:text-[11px] text-white/80 font-bold mt-1 block">Suggested Bid Sum</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[20px] bg-[#FFF39A] text-[#050505] border-2 border-[#050505] shadow-retro">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70 block">Response Rate</span>
          <div className="text-2xl sm:text-3xl font-black mt-1">{responseRate}%</div>
          <span className="text-[10px] sm:text-[11px] text-[#050505]/70 font-bold mt-1 block">Reached → Response</span>
        </div>

        <div className="p-4 sm:p-5 rounded-[20px] bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#050505]/70 block">Finished</span>
          <div className="text-2xl sm:text-3xl font-black mt-1">{finishedCount}</div>
          <span className="text-[10px] sm:text-[11px] text-[#4DBA76] font-black mt-1 block">Won Opportunities</span>
        </div>
      </div>

      {/* Drag & Drop Guidance — desktop only */}
      <div className="hidden md:flex items-center justify-between p-3.5 px-5 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm text-xs font-black text-[#050505]">
        <div className="flex items-center gap-2">
          <MoveHorizontal className="w-4 h-4" />
          <span>Drag cards between columns to update stage — or use the stage dropdown on each card.</span>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] uppercase tracking-wider font-bold">
          Drag & Drop
        </span>
      </div>

      {/* ── MOBILE: Stage selector + card list ── */}
      <div className="md:hidden space-y-4">
        {/* Beautiful mobile stage selector */}
        <div className="space-y-2">
          <label className="text-xs font-black text-[#050505]/70 uppercase tracking-wider">View Stage:</label>
          <div className="relative" onClick={() => setMobileStagePanelOpen((o) => !o)}>
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center border border-[#050505] ${STAGE_CONFIG[mobileActiveStage].headerBg} ${STAGE_CONFIG[mobileActiveStage].color}`}>
                  {STAGE_CONFIG[mobileActiveStage].icon}
                </span>
                <span className="text-sm font-black text-[#050505]">{mobileActiveStage}</span>
                <span className="text-xs font-bold text-[#050505]/50">
                  ({projects.filter((p) => p.applicationStage === mobileActiveStage).length})
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#050505] transition-transform duration-200 ${mobileStagePanelOpen ? 'rotate-180' : ''}`} />
            </div>

            {mobileStagePanelOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-white border-2 border-[#050505] rounded-2xl shadow-retro overflow-hidden animate-in slide-in-from-top duration-150">
                {STAGES.map((stage) => {
                  const s = STAGE_CONFIG[stage];
                  const count = projects.filter((p) => p.applicationStage === stage).length;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setMobileActiveStage(stage); setMobileStagePanelOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-[#050505]/10 last:border-0 cursor-pointer
                        ${mobileActiveStage === stage ? `${s.headerBg} ${s.color}` : 'hover:bg-[#F7F7F5] text-[#050505]'}
                      `}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center border border-[#050505] ${s.headerBg} ${s.color}`}>
                        {s.icon}
                      </span>
                      <span className="text-sm font-black">{stage}</span>
                      <span className="ml-auto text-xs font-black px-2 py-0.5 rounded-full bg-[#050505] text-white">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {projects.filter((p) => (p.applicationStage || 'Analysed') === mobileActiveStage).length === 0 ? (
            <div className="py-12 text-center text-xs font-bold text-[#050505]/50 border-2 border-dashed border-[#050505]/20 rounded-2xl">
              No projects in this stage yet.
            </div>
          ) : (
            projects.filter((p) => (p.applicationStage || 'Analysed') === mobileActiveStage).map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-3 cursor-pointer"
                onClick={() => onSelectProject(proj)}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                    proj.recommendation === 'APPLY' ? 'bg-[#4DBA76] text-white border-[#050505]'
                    : proj.recommendation === 'MAYBE' ? 'bg-[#FF941D] text-white border-[#050505]'
                    : 'bg-[#F05D5E] text-white border-[#050505]'
                  }`}>
                    {proj.matchScore}% Match
                  </span>
                  <span className="text-[10px] text-[#050505] font-black">{formatINR(proj.projectOverview.budget)}</span>
                </div>
                <h4 className="text-sm font-black text-[#050505] line-clamp-2 leading-snug">{proj.title}</h4>
                <div className="text-[11px] font-semibold text-[#050505]/70 flex items-center justify-between">
                  <span>{proj.clientIntelligence.companyName || 'Client Opportunity'}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(proj);
                    }}
                    className="text-[11px] font-black text-[#6F86F5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="pt-2 border-t-2 border-[#050505]/10">
                  <StageDropdown value={proj.applicationStage || 'Analysed'} onChange={(s) => handleStageChange(proj.id, s)} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── DESKTOP: Full Kanban board ── */}
      <div className="hidden md:flex gap-5 overflow-x-auto pb-8 snap-x">
        {STAGES.map((stage) => {
          const cfg = STAGE_CONFIG[stage];
          const stageProjects = projects.filter((p) => (p.applicationStage || 'Analysed') === stage);
          const isOver = dragOverStage === stage;

          return (
            <div
              key={stage}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={(e) => handleDragLeave(e, stage)}
              onDrop={(e) => handleDrop(e, stage)}
              className={`bg-white rounded-[28px] border-2 border-[#050505] shadow-retro flex flex-col w-[272px] shrink-0 snap-start transition-all overflow-hidden ${
                isOver ? 'ring-4 ring-[#6F86F5] -translate-y-1' : ''
              }`}
            >
              {/* Column header */}
              <div className={`px-5 py-3.5 flex items-center justify-between border-b-2 border-[#050505] ${cfg.headerBg}`}>
                <div className="flex items-center gap-2">
                  <span className={`${cfg.color} opacity-80`}>{cfg.icon}</span>
                  <span className={`text-xs font-black uppercase tracking-wider ${cfg.color}`}>{stage}</span>
                </div>
                <span className={`w-6 h-6 rounded-full bg-[#050505]/20 flex items-center justify-center text-[10px] font-black ${cfg.color}`}>
                  {stageProjects.length}
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 min-h-[220px]">
                {isOver && (
                  <div className="p-3 rounded-2xl border-2 border-dashed border-[#6F86F5] bg-[#6F86F5]/10 text-[#6F86F5] text-center text-xs font-black animate-pulse flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Drop here
                  </div>
                )}

                {stageProjects.length === 0 && !isOver ? (
                  <div className="py-10 text-center text-xs text-[#050505]/40 font-bold italic">
                    Drop projects here
                  </div>
                ) : (
                  stageProjects.map((proj) => {
                    const isBeingDragged = draggedProjectId === proj.id;
                    return (
                      <div
                        key={proj.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, proj.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onSelectProject(proj)}
                        className={`p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm hover:shadow-retro hover:-translate-y-1 transition-all space-y-2.5 group cursor-grab active:cursor-grabbing select-none ${
                          isBeingDragged ? 'opacity-40 scale-95 border-dashed border-[#6F86F5]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="w-3.5 h-3.5 text-[#050505]/30 group-hover:text-[#050505]/60 transition-colors" />
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-[#050505] ${
                              proj.recommendation === 'APPLY' ? 'bg-[#4DBA76] text-white'
                              : proj.recommendation === 'MAYBE' ? 'bg-[#FF941D] text-white'
                              : 'bg-[#F05D5E] text-white'
                            }`}>
                              {proj.matchScore}%
                            </span>
                          </div>
                          <span className="text-[10px] text-[#050505]/70 font-black">{formatINR(proj.projectOverview.budget)}</span>
                        </div>

                        <h4 className="text-xs font-black text-[#050505] line-clamp-2 leading-snug group-hover:text-[#6F86F5] transition-colors">
                          {proj.title}
                        </h4>

                        <div className="text-[10px] font-semibold text-[#050505]/60 flex items-center justify-between">
                          <span>{proj.clientIntelligence.companyName || 'Client Opportunity'}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(proj);
                            }}
                            className="text-[10px] font-black text-[#6F86F5] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>View Analysis</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="pt-2 border-t border-[#050505]/10" onClick={(e) => e.stopPropagation()}>
                          <StageDropdown value={proj.applicationStage || 'Analysed'} onChange={(s) => handleStageChange(proj.id, s)} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
