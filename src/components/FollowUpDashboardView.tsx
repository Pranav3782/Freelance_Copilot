import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Plus,
  Send,
  MessageSquare,
  User,
  ArrowRight,
  RefreshCw,
  Search,
  Filter,
  Check,
  Copy,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ProjectAnalysis,
  OpportunityOutreachSummary,
  OutreachMetrics,
  OutreachChannel,
  OutreachEventType,
  OutreachOutcome,
} from '../types';
import { fetchOutreachSummary, logContactInteraction, generateAIFollowUpMessage } from '../lib/api';
import { toast } from 'sonner';

interface FollowUpDashboardViewProps {
  onSelectProject: (project: ProjectAnalysis) => void;
  onNavigateToProposal: (project: ProjectAnalysis) => void;
  onOpenAnalyzeModal: () => void;
}

export const FollowUpDashboardView: React.FC<FollowUpDashboardViewProps> = ({
  onSelectProject,
  onNavigateToProposal,
  onOpenAnalyzeModal,
}) => {
  const [summaries, setSummaries] = useState<OpportunityOutreachSummary[]>([]);
  const [metrics, setMetrics] = useState<OutreachMetrics>({
    totalContacted: 0,
    dueTodayCount: 0,
    overdueCount: 0,
    waitingForReplyCount: 0,
    wonCount: 0,
    lostCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'today' | 'overdue' | 'upcoming' | 'waiting' | 'completed'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Opportunity for Modal Action
  const [activeOpportunitySummary, setActiveOpportunitySummary] = useState<OpportunityOutreachSummary | null>(null);

  // Log Contact Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logType, setLogType] = useState<OutreachEventType>('Follow-up');
  const [logChannel, setLogChannel] = useState<OutreachChannel>('Email');
  const [logOutcome, setLogOutcome] = useState<OutreachOutcome>('No Response');
  const [logNotes, setLogNotes] = useState('');
  const [logNextDate, setLogNextDate] = useState('');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // AI Message Generator State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiChannel, setAiChannel] = useState<OutreachChannel>('Email');
  const [aiInstructions, setAiInstructions] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [logOccurredAt, setLogOccurredAt] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchOutreachSummary();
      setSummaries(res.summaries || []);
      setMetrics(
        res.metrics || {
          totalContacted: 0,
          dueTodayCount: 0,
          overdueCount: 0,
          waitingForReplyCount: 0,
          wonCount: 0,
          lostCount: 0,
        }
      );
    } catch {
      toast.error("Couldn't load your follow-ups. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  // Categorize Opportunities
  const filteredSummaries = summaries.filter((s) => {
    const titleMatch = s.project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.client.company || '').toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch;
  });

  const dueTodayItems = filteredSummaries.filter((s) => {
    if (!s.pendingFollowUp || s.pendingFollowUp.status !== 'pending') return false;
    const dueStr = s.pendingFollowUp.dueAt ? s.pendingFollowUp.dueAt.split('T')[0] : '';
    return dueStr === todayStr;
  });

  const overdueItems = filteredSummaries.filter((s) => {
    if (!s.pendingFollowUp || s.pendingFollowUp.status !== 'pending') return false;
    const dueStr = s.pendingFollowUp.dueAt ? s.pendingFollowUp.dueAt.split('T')[0] : '';
    return dueStr && dueStr < todayStr;
  });

  const upcomingItems = filteredSummaries.filter((s) => {
    if (!s.pendingFollowUp || s.pendingFollowUp.status !== 'pending') return false;
    const dueStr = s.pendingFollowUp.dueAt ? s.pendingFollowUp.dueAt.split('T')[0] : '';
    return dueStr && dueStr > todayStr;
  });

  const waitingForReplyItems = filteredSummaries.filter((s) => {
    return s.opportunity.currentFollowUpStatus === 'Waiting for Reply' || s.opportunity.currentFollowUpStatus === 'Needs Follow-up';
  });

  const completedItems = filteredSummaries.filter((s) => {
    return s.events && s.events.length > 0;
  });

  const getTabList = () => {
    switch (activeTab) {
      case 'today':
        return dueTodayItems;
      case 'overdue':
        return overdueItems;
      case 'upcoming':
        return upcomingItems;
      case 'waiting':
        return waitingForReplyItems;
      case 'completed':
        return completedItems;
      default:
        return dueTodayItems;
    }
  };

  const currentTabItems = getTabList();

  const handleOpenLogModal = (summary?: OpportunityOutreachSummary) => {
    setActiveOpportunitySummary(summary || (summaries.length > 0 ? summaries[0] : null));
    setLogNotes('');
    setLogNextDate('');
    setLogOccurredAt(new Date().toISOString().slice(0, 16));
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOpportunitySummary) {
      toast.error('Please select an opportunity or project first.');
      return;
    }

    setIsSubmittingLog(true);

    try {
      const res = await logContactInteraction({
        projectId: activeOpportunitySummary.project.id,
        type: logType,
        channel: logChannel,
        occurredAt: logOccurredAt ? new Date(logOccurredAt).toISOString() : new Date().toISOString(),
        outcome: logOutcome,
        notes: logNotes.trim(),
        nextFollowUpDate: logNextDate ? new Date(logNextDate).toISOString() : null,
      });

      if (res.success) {
        toast.success(`Interaction Event Saved ✓`, {
          description: `Logged outreach for ${activeOpportunitySummary.client.name || activeOpportunitySummary.project.title}.`,
        });
        setIsLogModalOpen(false);
        await loadData();
      } else {
        toast.error(res.error || "Couldn't save this event. Please try again.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Couldn't save this event. Please try again.");
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const handleOpenAiModal = (summary: OpportunityOutreachSummary) => {
    setActiveOpportunitySummary(summary);
    setGeneratedMessage('');
    setAiRecommendation('');
    setIsAiModalOpen(true);
  };

  const handleGenerateAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeOpportunitySummary) return;

    setIsGeneratingAi(true);
    setGeneratedMessage('');
    setAiRecommendation('');

    try {
      const res = await generateAIFollowUpMessage(activeOpportunitySummary.project.id, aiChannel, aiInstructions.trim());
      if (res.error && (res.code === 'AI_CREDENTIAL_REQUIRED' || res.code === 'INVALID_CREDENTIAL')) {
        toast.error('AI API Key Required', { description: res.error });
        setIsGeneratingAi(false);
        return;
      }
      setGeneratedMessage(res.message || '');
      setAiRecommendation(res.recommendation || '');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to generate message.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopyMessage = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    setIsCopied(true);
    toast.success('Message Copied to Clipboard! 📋');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#050505]">
      {/* Top Banner / Hero */}
      <div className="p-6 sm:p-10 rounded-[36px] bg-[#6F86F5] border-2 border-[#050505] shadow-retro text-white relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD51F] text-[#050505] text-xs font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm">
            <Clock className="w-4 h-4" />
            <span>Client Relationship & Outreach Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Follow-up Command Center
          </h1>
          <p className="text-sm font-semibold text-white/90 leading-relaxed">
            Track client interactions, surface tasks due today, and generate grounded AI follow-up messages grounded in stored history.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => handleOpenLogModal()}
            className="px-5 py-3 rounded-2xl bg-[#FFD51F] hover:bg-[#E5BE10] text-[#050505] text-xs font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>

          <button
            onClick={onOpenAnalyzeModal}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FFF39A] text-[#050505] text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#6F86F5]" />
            <span>Analyze Opportunity</span>
          </button>
        </div>
      </div>

      {/* Actionable Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-[#050505]/60 tracking-wider">Total Contacted</span>
          <div className="text-2xl sm:text-3xl font-black text-[#050505]">{metrics.totalContacted}</div>
          <span className="text-[11px] font-bold text-[#050505]/70">Opportunities reached</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFD51F] border-2 border-[#050505] shadow-retro-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-[#050505]/80 tracking-wider">Due Today</span>
          <div className="text-2xl sm:text-3xl font-black text-[#050505]">{metrics.dueTodayCount}</div>
          <span className="text-[11px] font-bold text-[#050505]/80">Actions needed today</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#F05D5E] text-white border-2 border-[#050505] shadow-retro-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-white/80 tracking-wider">Overdue</span>
          <div className="text-2xl sm:text-3xl font-black">{metrics.overdueCount}</div>
          <span className="text-[11px] font-bold text-white/90">Past due follow-ups</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-[#050505]/60 tracking-wider">Awaiting Reply</span>
          <div className="text-2xl sm:text-3xl font-black text-[#6F86F5]">{metrics.waitingForReplyCount}</div>
          <span className="text-[11px] font-bold text-[#050505]/70">Pending client responses</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#4DCA85] text-[#050505] border-2 border-[#050505] shadow-retro-sm space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-black uppercase text-[#050505]/80 tracking-wider">Won Projects</span>
          <div className="text-2xl sm:text-3xl font-black">{metrics.wonCount}</div>
          <span className="text-[11px] font-bold text-[#050505]/80">Converted to contracts</span>
        </div>
      </div>

      {/* Main Tabs Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b-2 border-[#050505]/15 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'today'
                ? 'bg-[#FFD51F] text-[#050505] shadow-retro-sm'
                : 'bg-white text-[#050505] hover:bg-[#F7F7F5]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Due Today ({dueTodayItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overdue'
                ? 'bg-[#F05D5E] text-white shadow-retro-sm'
                : 'bg-white text-[#050505] hover:bg-[#F7F7F5]'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Overdue ({overdueItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-[#6F86F5] text-white shadow-retro-sm'
                : 'bg-white text-[#050505] hover:bg-[#F7F7F5]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming ({upcomingItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('waiting')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'waiting'
                ? 'bg-[#F2A4DE] text-[#050505] shadow-retro-sm'
                : 'bg-white text-[#050505] hover:bg-[#F7F7F5]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Awaiting Reply ({waitingForReplyItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-[#CDB3F4] text-[#050505] shadow-retro-sm'
                : 'bg-white text-[#050505] hover:bg-[#F7F7F5]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>All History ({completedItems.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#050505]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunity or client..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border-2 border-[#050505] text-xs font-bold text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
          />
        </div>
      </div>

      {/* Opportunity Action List */}
      {isLoading ? (
        <div className="p-12 text-center text-xs font-black text-[#050505]/60 animate-pulse">
          Loading outreach pipeline...
        </div>
      ) : currentTabItems.length === 0 ? (
        <div className="p-12 rounded-[32px] bg-white border-2 border-dashed border-[#050505]/20 text-center space-y-3">
          <Clock className="w-10 h-10 text-[#050505]/40 mx-auto" />
          <div>
            <h3 className="text-base font-black text-[#050505]">No opportunities in this view</h3>
            <p className="text-xs text-[#050505]/75 font-semibold mt-1">
              Analyze a freelance project or log outreach activity to populate your action list.
            </p>
          </div>
          <button
            onClick={onOpenAnalyzeModal}
            className="px-5 py-2.5 rounded-xl bg-[#050505] text-white text-xs font-black shadow-retro-sm btn-tactile cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Analyze Opportunity</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTabItems.map((item) => {
            const lastEvt = item.events.length > 0 ? item.events[item.events.length - 1] : null;

            return (
              <div
                key={item.opportunity.id}
                className="p-6 rounded-[28px] bg-white border-2 border-[#050505] shadow-retro hover:shadow-retro-lg transition-all space-y-4 text-[#050505] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#6F86F5]/15 text-[#6F86F5] border border-[#6F86F5]/30 text-[10px] font-black uppercase font-mono">
                      #{item.opportunity.totalContactAttempts} Contacts Logged
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border border-[#050505] ${
                        item.opportunity.currentFollowUpStatus === 'Overdue'
                          ? 'bg-[#F05D5E] text-white'
                          : item.opportunity.currentFollowUpStatus === 'Needs Follow-up'
                          ? 'bg-[#FFD51F] text-[#050505]'
                          : 'bg-[#4DCA85] text-[#050505]'
                      }`}
                    >
                      {item.opportunity.currentFollowUpStatus}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#050505] line-clamp-1">{item.project.title}</h3>
                    <p className="text-xs font-bold text-[#050505]/75 mt-0.5">
                      Client: <span className="text-[#050505] font-black">{item.client.company || item.client.name}</span>
                    </p>
                  </div>

                  {lastEvt && (
                    <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#050505]/15 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-black text-[#050505]/70">
                        <span>Last Event #{lastEvt.sequenceNumber} ({lastEvt.type})</span>
                        <span>{new Date(lastEvt.occurredAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {lastEvt.notes && <p className="text-xs font-semibold text-[#050505]/85 italic">"{lastEvt.notes}"</p>}
                    </div>
                  )}

                  {item.pendingFollowUp && (
                    <div className="p-3 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#050505]">
                        <Clock className="w-4 h-4 text-[#050505]" />
                        <span>Action Due:</span>
                      </span>
                      <span className="font-black text-[#050505]">
                        {new Date(item.pendingFollowUp.dueAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t-2 border-[#050505]/10 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAiModal(item)}
                    className="flex-1 py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Message</span>
                  </button>

                  <button
                    onClick={() => handleOpenLogModal(item)}
                    className="flex-1 py-2.5 rounded-xl bg-[#FFD51F] hover:bg-[#E5BE10] text-[#050505] text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Contact</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectProject(item.project);
                      onNavigateToProposal(item.project);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#F7F7F5] text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                    title="View Project Roadmap"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal 1: Log Contact */}
      {isLogModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsLogModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase text-[#050505] border border-[#050505] shadow-retro-sm mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Sequence Event #{activeOpportunitySummary ? activeOpportunitySummary.events.length + 1 : 1}</span>
              </div>
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">Log Client Interaction</h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-1">
                Record outreach activity and schedule upcoming follow-up tasks.
              </p>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              {/* Opportunity / Client Selector */}
              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Opportunity / Client</label>
                <select
                  value={activeOpportunitySummary ? activeOpportunitySummary.project.id : ''}
                  onChange={(e) => {
                    const sel = summaries.find((s) => s.project.id === e.target.value);
                    if (sel) setActiveOpportunitySummary(sel);
                  }}
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                >
                  {summaries.length === 0 ? (
                    <option value="" disabled>No analyzed projects yet.</option>
                  ) : (
                    summaries.map((s) => (
                      <option key={s.project.id} value={s.project.id}>
                        {s.project.title} — ({s.client.company || s.client.name})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Event Type</label>
                  <select
                    value={logType}
                    onChange={(e) => setLogType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Initial Contact">Initial Contact</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Client Reply">Client Reply</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Pricing Discussion">Pricing Discussion</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Portfolio Shared">Portfolio Shared</option>
                    <option value="Requirement Clarification">Requirement Clarification</option>
                    <option value="Final Follow-up">Final Follow-up</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Contact Method</label>
                  <select
                    value={logChannel}
                    onChange={(e) => setLogChannel(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Freelancer">Freelancer</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Date / Time of Event</label>
                  <input
                    type="datetime-local"
                    value={logOccurredAt}
                    onChange={(e) => setLogOccurredAt(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Outcome</label>
                  <select
                    value={logOutcome}
                    onChange={(e) => setLogOutcome(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="No response">No response</option>
                    <option value="Replied">Replied</option>
                    <option value="Interested">Interested</option>
                    <option value="Not interested">Not interested</option>
                    <option value="Asked for more information">Asked for more information</option>
                    <option value="Requested proposal">Requested proposal</option>
                    <option value="Requested call">Requested call</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Notes (Optional)</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Client asked for a revised estimate..."
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505] min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Schedule Next Follow-up (Optional)</label>
                <input
                  type="date"
                  value={logNextDate}
                  onChange={(e) => setLogNextDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-white text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLog}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-[#FFD51F] hover:bg-[#E5BE10] text-[#050505] text-xs font-black shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingLog ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Event...</span>
                    </>
                  ) : (
                    <span>Save Event #{activeOpportunitySummary.events.length + 1}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: AI Follow-up Message Generator */}
      {isAiModalOpen && activeOpportunitySummary && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsAiModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6F86F5] text-white text-xs font-black uppercase border border-[#050505] shadow-retro-sm mb-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Grounded AI Outreach Assistant</span>
              </div>
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">Generate AI Follow-up Message</h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-1">
                Reads actual stored contact history for <span className="font-black text-[#050505]">{activeOpportunitySummary.client.name}</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Target Channel</label>
                  <select
                    value={aiChannel}
                    onChange={(e) => setAiChannel(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Email">Email</option>
                    <option value="Freelancer">Freelancer Platform Chat</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Phone">Phone Script</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Custom Tone / Focus (Optional)</label>
                  <input
                    type="text"
                    value={aiInstructions}
                    onChange={(e) => setAiInstructions(e.target.value)}
                    placeholder="e.g. Keep short, warm, milestone focus..."
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505]"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateAiMessage}
                disabled={isGeneratingAi}
                className="w-full py-3 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Reading History & Generating Message...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Message</span>
                  </>
                )}
              </button>

              {aiRecommendation && (
                <div className="p-3.5 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black">AI Timing Suggestion: </span>
                    <span>{aiRecommendation}</span>
                  </div>
                </div>
              )}

              {generatedMessage ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-[#050505]">Generated Message</label>
                    <button
                      onClick={handleCopyMessage}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center gap-1.5"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#4DBA76]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>

                  <textarea
                    value={generatedMessage}
                    onChange={(e) => setGeneratedMessage(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] min-h-[160px] focus:outline-none"
                  />
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#F7F7F5] border-2 border-dashed border-[#050505]/20 text-center text-xs font-bold text-[#050505]/60">
                  Click "Generate Message" to produce a grounded follow-up message based on stored history.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
